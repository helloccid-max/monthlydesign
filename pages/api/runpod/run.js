import { buildWorkflowPayload } from "@/lib/comfy/buildWorkflow";
import { buildRunPodInput } from "@/lib/comfy/pipeline";
import { runpodFetch } from "@/lib/runpod/fetch";

function json(res, status, data) {
  res.status(status).json(data);
}

function isPromptOnlyInput() {
  const v = process.env.RUNPOD_INPUT_PROMPT_ONLY;
  if (v === undefined || v === null || v === "") return true;
  return String(v).toLowerCase() === "true" || v === "1";
}

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const apiKey = process.env.RUNPOD_API_KEY;
  const endpointId = process.env.RUNPOD_ENDPOINT_ID;
  if (!apiKey) return json(res, 500, { error: "Missing RUNPOD_API_KEY" });
  if (!endpointId) return json(res, 500, { error: "Missing RUNPOD_ENDPOINT_ID" });

  const {
    prompt,
    texturePrompt,
    image,
    imageUrl,
    imageName,
    mode = "texture",
    input: extraInput
  } = req.body || {};

  try {
    const payloadInput = buildRunPodInput({
      mode,
      prompt,
      texturePrompt,
      image,
      imageUrl,
      imageName
    });

    if (extraInput && typeof extraInput === "object") {
      Object.assign(payloadInput, extraInput);
    }

    if (!isPromptOnlyInput()) {
      const rawImgUrl = String(imageUrl || "").trim();
      const isHttpUrl = /^https?:\/\//u.test(rawImgUrl);
      const workflow = await buildWorkflowPayload({
        mode: payloadInput.mode,
        prompt: payloadInput.prompt,
        texturePrompt: payloadInput.texture_prompt,
        imageUrl: isHttpUrl ? rawImgUrl : undefined,
        imageBase64: isHttpUrl ? undefined : payloadInput.image
      });
      if (workflow) payloadInput.workflow = workflow;
    }

    const runUrl = `https://api.runpod.ai/v2/${encodeURIComponent(endpointId)}/run`;
    const run = await runpodFetch(runUrl, apiKey, {
      method: "POST",
      body: JSON.stringify({ input: payloadInput })
    });

    const jobId = run?.id;
    if (!jobId) throw new Error(`RunPod did not return job id: ${JSON.stringify(run)}`);

    return json(res, 200, {
      id: jobId,
      status: run?.status || "SUBMITTED",
      meta: { mode: payloadInput.mode, hasWorkflow: Boolean(payloadInput.workflow) }
    });
  } catch (e) {
    const msg = String(e?.message || e);
    const status = /required/i.test(msg) ? 400 : 502;
    return json(res, status, { error: "RunPod run failed", detail: msg });
  }
}
