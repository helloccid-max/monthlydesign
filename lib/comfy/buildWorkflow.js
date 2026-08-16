import fs from "fs";
import path from "path";
import { NODE_MAP } from "./pipeline";

const WORKFLOW_FILE = process.env.COMFY_WORKFLOW_FILE || "workflows/cover-pipeline.json";

// Monthly Design workflow(146번)이 "월페이퍼 생성" 지시라 결과가 새로 그려지는 경향이 강함.
// 표지/레이아웃/텍스트는 유지하고 표면 재질만 바꾸도록 base prompt를 교체한다.
const COVER_PRESERVE_BASE_PROMPT =
  "Keep the original cover exactly the same: composition, layout, existing lettering, logos, and shapes. " +
  "Do not add or remove anything. Do not change perspective. " +
  "Apply the requested material/texture change primarily to the main product/subject in the foreground. " +
  "Do not restyle the background/negative space unless explicitly requested. " +
  "Keep colors unless the user explicitly specifies a color. " +
  "No new overlays or watermarks. No borders.";

// 텍스트가 "새로 생성"되는 케이스 방지용.
// (표지의 기존 타이포는 유지해야 하므로 "text" 자체를 강하게 금지하지 않고,
//  워터마크/캡션/랜덤 글자 같은 '추가 텍스트'에 초점을 맞춘다.)
const NEGATIVE_AVOID_WORDS =
  "watermark, caption, subtitle, overlay text, added words, random letters, gibberish letters, signature";

/**
 * workflow JSON 이 있으면 mode / prompt / image 를 노드 inputs 에 주입.
 * 파일이 없거나 invalid 이면 null (prompt-only input 만 사용).
 */
export async function buildWorkflowPayload({ mode, prompt, texturePrompt, imageUrl, imageBase64 }) {
  const abs = path.join(process.cwd(), WORKFLOW_FILE);
  if (!fs.existsSync(abs)) return null;

  let template;
  try {
    template = JSON.parse(fs.readFileSync(abs, "utf8"));
  } catch {
    return null;
  }

  const templateData = JSON.parse(JSON.stringify(template));
  
  // Monthly Design.json처럼 {"input": {"workflow": {...}}} 로 감싸져 있는 경우 알맹이 추출
  const wf = templateData.input?.workflow || templateData.workflow || templateData;

  const coverId = NODE_MAP.loadImageCover;
  const clipId = NODE_MAP.clipPositiveMaterial;
  const texId = NODE_MAP.textMultilineTexture;
  const noiseId = NODE_MAP.randomNoise;
  const basePromptId = "146";
  // Monthly Design.json (flux2 stage)
  const fluxSamplerId = "157";
  const cfgGuiderId = "156";
  const refLatentPosId = "177";
  const inputLatentId = "179"; // VAEEncode of input image
  const negativeEncodeId = "999";
  const refLatentVaeEncodeId = "176";
  const scaledInputImageId = "165";

  const img = imageUrl || imageBase64;
  if (wf[coverId]?.inputs && img) {
    if ("url_or_path" in wf[coverId].inputs) {
      wf[coverId].inputs.url_or_path = img;
    } else {
      wf[coverId].inputs.image = img;
    }
  }
  if (wf[clipId]?.inputs && prompt) {
    if ("text" in wf[clipId].inputs) {
      wf[clipId].inputs.text = prompt;
    }
  }
  if ((mode === "texture_map" || mode === "texture") && wf[texId]?.inputs) {
    const textToInject = texturePrompt || prompt;
    if ("value" in wf[texId].inputs) {
      wf[texId].inputs.value = textToInject;
    } else {
      wf[texId].inputs.text = textToInject;
    }
  }

  // Flux2 stage uses CLIPTextEncode(162) as the actual positive conditioning.
  // For texture mode, prompt may be empty; in that case use the texture prompt.
  const clipText = (mode === "texture" || mode === "texture_map" ? texturePrompt || prompt : prompt) || "";
  if (wf[clipId]?.inputs && clipText) {
    if ("text" in wf[clipId].inputs) {
      wf[clipId].inputs.text = clipText;
    }
  }

  // Replace the generation-oriented base prompt with a cover-preserving instruction.
  // (Monthly Design.json uses PrimitiveStringMultiline.value)
  if (wf[basePromptId]?.inputs) {
    if ("value" in wf[basePromptId].inputs) {
      wf[basePromptId].inputs.value = COVER_PRESERVE_BASE_PROMPT;
    } else if ("text" in wf[basePromptId].inputs) {
      wf[basePromptId].inputs.text = COVER_PRESERVE_BASE_PROMPT;
    }
  }

  // Make the flux2 stage true img2img by sampling from the input latent.
  // This dramatically reduces "new text" hallucinations because we keep the original cover as the base.
  if (wf[fluxSamplerId]?.inputs && wf[inputLatentId]) {
    wf[fluxSamplerId].inputs.latent_image = [inputLatentId, 0];
  }

  // ReferenceLatent for positive: point at the input latent instead of stage-1 generated latent.
  // This avoids a whole extra generation pass that can drift and introduce random typography.
  if (wf[refLatentPosId]?.inputs && wf[inputLatentId]) {
    wf[refLatentPosId].inputs.latent = [inputLatentId, 0];
  }

  // Also ensure the "reference latent" VAEEncode encodes the INPUT image,
  // not the stage-1 generated image. (Stage-1 can hallucinate text and cause drift.)
  if (wf[refLatentVaeEncodeId]?.inputs && wf[scaledInputImageId]) {
    if ("pixels" in wf[refLatentVaeEncodeId].inputs) {
      wf[refLatentVaeEncodeId].inputs.pixels = [scaledInputImageId, 0];
    }
  }

  // Add a negative prompt focused on "added text" artifacts and wire it into the guider.
  if (wf[cfgGuiderId]?.inputs?.negative && wf[clipId]?.inputs?.clip && !wf[negativeEncodeId]) {
    wf[negativeEncodeId] = {
      inputs: {
        clip: wf[clipId].inputs.clip,
        text: NEGATIVE_AVOID_WORDS
      },
      class_type: "CLIPTextEncode",
      _meta: { title: "CLIP Text Encode (Negative: avoid added text)" }
    };
    wf[cfgGuiderId].inputs.negative = [negativeEncodeId, 0];
  }
  if (wf[noiseId]?.inputs && "noise_seed" in wf[noiseId].inputs) {
    // 15자리 임의의 정수 시드 생성
    wf[noiseId].inputs.noise_seed = Math.floor(Math.random() * 900000000000000) + 100000000000000;
  }

  // Comfy API workflow는 "노드들만" 포함해야 합니다.
  // (_meta 같은 키가 섞이면 노드로 해석되어 missing_node_type 에러가 발생)
  const cleaned = {};
  for (const [id, node] of Object.entries(wf || {})) {
    if (node && typeof node === "object" && typeof node.class_type === "string") {
      cleaned[id] = node;
    }
  }
  return cleaned;
}
