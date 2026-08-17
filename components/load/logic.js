import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export function useLoadLogic({ request, onDone, paused = false } = {}) {
  const router = useRouter();
  const hasStartedRef = useRef(false);

  const goDone = useCallback((generatedImageUrl) => {
    if (typeof onDone === 'function') return onDone(generatedImageUrl);
    router.push('/end');
  }, [onDone, router]);

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehaviorY;
    const prevBodyOverscroll = document.body.style.overscrollBehaviorY;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehaviorY = 'none';
    document.body.style.overscrollBehaviorY = 'none';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overscrollBehaviorY = prevHtmlOverscroll;
      document.body.style.overscrollBehaviorY = prevBodyOverscroll;
    };
  }, []);

  useEffect(() => {
    if (paused || !request || hasStartedRef.current) return;
    hasStartedRef.current = true;

    let isCancelled = false;

    async function runPipeline() {
      try {
        // Step 1: Get image as base64
        const imgRes = await fetch(request.coverImageUrl);
        const blob = await imgRes.blob();
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        if (isCancelled) return;

        // Step 2: Upload to R2
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataUrl: base64,
            filename: `cover-${request.issue}.jpg`,
            folder: 'covers'
          })
        });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const uploadData = await uploadRes.json();
        const imageUrl = uploadData.url;

        if (isCancelled) return;

        // Step 3: Refine prompt
        const refineRes = await fetch('/api/refine', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: request.prompt, purpose: 'texture' })
        });
        if (!refineRes.ok) throw new Error('Refine failed');
        const refineData = await refineRes.json();
        const texturePrompt = refineData.refinedPrompt;

        if (isCancelled) return;

        // Step 4: RunPod
        const runRes = await fetch('/api/runpod/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'texture',
            prompt: request.prompt,
            texturePrompt,
            imageUrl
          })
        });
        if (!runRes.ok) throw new Error('RunPod run failed');
        const runData = await runRes.json();
        const jobId = runData.id;

        if (isCancelled) return;

        // Step 5: Poll status
        const poll = async () => {
          if (isCancelled) return;
          const statusRes = await fetch(`/api/runpod/status/${jobId}`);
          if (!statusRes.ok) throw new Error('Status check failed');
          const statusData = await statusRes.json();

          if (statusData.status === 'COMPLETED') {
            // RunPod에서 결과 이미지가 배열로 올 수도 있고 단일 문자열일 수도 있으므로 안전하게 추출
            let outputUrl = null;
            if (statusData.images && statusData.images.length > 0) {
              outputUrl = statusData.images[0];
            } else if (Array.isArray(statusData.output)) {
              outputUrl = statusData.output[0]?.image_url || statusData.output[0];
            } else if (typeof statusData.output === 'string') {
              // output이 string이면 url인지 확인
              if (statusData.output.startsWith('http') || statusData.output.startsWith('data:')) {
                outputUrl = statusData.output;
              } else if (statusData.output.length > 100) { // base64로 추정
                outputUrl = statusData.output;
              } else {
                // string인데 url이 아니라면 에러로 간주하고 fallback
                console.error('RunPod returned text instead of image:', statusData.output);
              }
            } else if (statusData.output && typeof statusData.output === 'object') {
              outputUrl = statusData.output.image_url || statusData.output.message || statusData.output.image || statusData.output.url || statusData.output.imageBase64;
            } else if (statusData.imageBase64) {
              outputUrl = statusData.imageBase64;
            } else if (statusData.image_url) {
              outputUrl = statusData.image_url;
            }
            
            if (outputUrl && typeof outputUrl === 'string') {
              // base64 형식인 경우 data url로 변환
              if (!outputUrl.startsWith('http') && !outputUrl.startsWith('data:')) {
                 outputUrl = `data:image/png;base64,${outputUrl}`;
              }
              goDone(outputUrl);
            } else {
              console.error('No valid output URL from RunPod:', statusData);
              // Fallback to local SVG if RunPod fails to return a valid URL
              goDone(null);
            }
          } else if (statusData.status === 'FAILED') {
            console.error('RunPod job failed:', statusData);
            // Fallback to local SVG if RunPod fails
            goDone(null);
          } else {
            setTimeout(poll, 3000);
          }
        };

        poll();
      } catch (error) {
        console.error('Pipeline error:', error);
        // Fallback to goDone without URL, or handle error
        goDone(null);
      }
    }

    runPipeline();

    return () => {
      isCancelled = true;
    };
  }, [paused, request, goDone]);
}
