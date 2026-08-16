import OpenAI from "openai";
import { ensureChangeToPrefix } from "@/lib/refine/ensureChangeToPrefix";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM = {
  material:
    "You are a prompt engineer for ComfyUI img2img / material restyle (CLIP Text Encode positive prompt). " +
    "Translate Korean or natural language to English. " +
    "The output MUST start with exactly \"change to \" (lowercase, with a space after \"to\"), then a short phrase or comma-separated tags. " +
    "Example: change to 3d graphic, wood texture, soft lighting. " +
    "Describe material, surface, lighting, style of an existing cover graphic. Under 35 words. No quotes.",
  texture:
    "You are a prompt engineer for ComfyUI texture application onto an existing magazine cover image. " +
    "Translate Korean or natural language to English. " +
    "CRITICAL: Preserve any explicit user details (colors, fabric/metal type, weave, grain, finish, roughness, gloss, brushed/polished, patina, transparency). " +
    "If the user mentions a color or finish, include it and DO NOT override it. Do not invent new colors when the user already specified one. " +
    "Do NOT describe objects, shapes, layout, typography, or scenes — only surface material/texture tags to apply. " +
    "Output EXACTLY 3 lines (no extra text). Each line MUST start with exactly \"change to \" (lowercase). Each line under 35 words. No quotes. " +
    "Line 1: faithful translation (keep user details, minimal additions). " +
    "Line 2: add texture/finish detail consistent with the user (still faithful). " +
    "Line 3: subtle version (same material, softer/less intense finish). " +
    "Example lines: " +
    "change to brushed steel, cool blue tint, satin finish, subtle reflections\n" +
    "change to brushed steel, cool blue tint, satin finish, fine micro-scratches, soft specular highlights\n" +
    "change to brushed steel, cool blue tint, soft matte-satin finish, low reflections"
};

function parseTextureOptions(raw) {
  const text = String(raw || "").trim();
  if (!text) return [];
  const lines = text
    .split(/\r?\n/u)
    .map((l) => String(l).trim())
    .filter(Boolean)
    .map((l) => l.replace(/^(?:[-*]|\d+[\).\]]|\u2022)\s*/u, "").trim())
    .filter(Boolean);

  const candidates = [];
  for (const line of lines) {
    const idx = line.toLowerCase().indexOf("change to ");
    if (idx === -1) continue;
    const prompt = line.slice(idx).trim();
    if (!prompt) continue;
    candidates.push(ensureChangeToPrefix(prompt));
  }

  // De-dupe while keeping order
  const seen = new Set();
  const unique = [];
  for (const c of candidates) {
    if (seen.has(c)) continue;
    seen.add(c);
    unique.push(c);
  }
  return unique.slice(0, 3);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt, purpose = "texture" } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  const systemContent = SYSTEM[purpose] || SYSTEM.material;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: String(prompt) }
      ],
      temperature: purpose === "texture" ? 0.35 : 0.7
    });

    const raw = response.choices[0]?.message?.content?.trim();

    if (purpose === "texture") {
      const texts = parseTextureOptions(raw);
      const labels = ["충실", "디테일", "은은"];
      const options =
        texts.length > 0
          ? texts.map((t, i) => ({ id: ["faithful", "detailed", "subtle"][i] || `opt${i + 1}`, label: labels[i] || `옵션 ${i + 1}`, text: t }))
          : [];

      const fallback = ensureChangeToPrefix(raw);
      const refinedPrompt = options[0]?.text || fallback;

      return res.status(200).json({ refinedPrompt, options, purpose });
    }

    let refinedPrompt = raw;
    if (purpose === "material" || !SYSTEM[purpose]) {
      refinedPrompt = ensureChangeToPrefix(refinedPrompt);
    }
    return res.status(200).json({ refinedPrompt, purpose });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return res.status(500).json({ error: "Failed to refine prompt" });
  }
}
