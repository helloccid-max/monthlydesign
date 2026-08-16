/** Comfy CLIP Text Encode (positive) — 항상 "change to …" 형식 */
const PREFIX = "change to ";

export function ensureChangeToPrefix(text) {
  let s = String(text || "")
    .trim()
    .replace(/^["']|["']$/g, "");
  if (!s) return PREFIX.trim();

  const lower = s.toLowerCase();
  if (lower.startsWith("change to ")) {
    const rest = s.slice(PREFIX.length).trim();
    return rest ? `${PREFIX}${rest}` : PREFIX.trim();
  }
  if (lower.startsWith("change to")) {
    const rest = s.slice("change to".length).replace(/^[\s-]+/, "").trim();
    return rest ? `${PREFIX}${rest}` : PREFIX.trim();
  }
  return `${PREFIX}${s}`;
}
