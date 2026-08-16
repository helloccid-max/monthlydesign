/**
 * ComfyUI / RunPod Serverless
 *
 * [texture] 표지 Load Image + texture_prompt → Reference/텍스처 결합 → Save
 * [material] (레거시) CLIP 프롬프트 물성 변경
 */

export const PIPELINE_MODES = {
  texture: {
    id: "texture",
    label: "텍스처 결합",
    hint: "표지 + texture_prompt (나무·금속 등)"
  },
  material: {
    id: "material",
    label: "물성 변경",
    hint: "표지 + 영어 프롬프트 (단순 물성/스타일)"
  },
  texture_map: {
    id: "texture_map",
    label: "텍스처 결합 (legacy)",
    hint: "texture_prompt + material prompt"
  }
};

/** Comfy 노드 id — API export id 로 교체 */
export const NODE_MAP = {
  loadImageCover: "171",
  clipPositiveMaterial: "162",
  textMultilineTexture: "147",
  randomNoise: "159",
  saveImageFinal: "94"
};

export function buildRunPodInput({
  mode = "texture",
  prompt,
  texturePrompt,
  image,
  imageUrl,
  imageName = ""
}) {
  const img = imageUrl || image;
  if (!img) throw new Error("image is required");

  const m = PIPELINE_MODES[mode] ? mode : "texture";

  if (m === "texture") {
    const texture = String(texturePrompt || prompt || "").trim();
    if (!texture) throw new Error("texture_prompt is required");
    return {
      mode: "texture",
      texture_prompt: texture,
      image: String(img),
      image_name: String(imageName || "")
    };
  }

  if (!prompt) throw new Error("prompt is required");

  const input = {
    mode: m,
    prompt: String(prompt).trim(),
    image: String(img),
    image_name: String(imageName || "")
  };

  if (m === "texture_map") {
    input.texture_prompt = String(texturePrompt || prompt).trim();
  }

  return input;
}
