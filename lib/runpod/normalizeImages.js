function guessMimeFromBase64(s) {
  const v = String(s || "").trim();
  if (v.startsWith("iVBOR")) return "image/png";
  if (v.startsWith("/9j/")) return "image/jpeg";
  if (v.startsWith("UklGR")) return "image/webp";
  return "image/webp";
}

function pushImage(imgs, v) {
  const s = String(v || "").trim();
  if (!s) return;
  if (s.startsWith("data:") || s.startsWith("http://") || s.startsWith("https://")) {
    imgs.push(s);
    return;
  }
  const mime = guessMimeFromBase64(s);
  imgs.push(`data:${mime};base64,${s}`);
}

export function normalizeImagesFromOutput(output) {
  const imgs = [];

  const scan = (v) => {
    if (!v) return;
    if (typeof v === "string") {
      if (v.length > 24) pushImage(imgs, v);
      return;
    }
    if (Array.isArray(v)) {
      for (const it of v) scan(it);
      return;
    }
    if (typeof v === "object") {
      if (typeof v.base64 === "string") pushImage(imgs, v.base64);
      if (typeof v.b64 === "string") pushImage(imgs, v.b64);
      if (typeof v.imageBase64 === "string") pushImage(imgs, v.imageBase64);
      if ("127" in v) scan(v["127"]);
      for (const key of [
        "text_0",
        "text",
        "images",
        "image",
        "image_base64",
        "imageBase64",
        "image_url",
        "imageUrl",
        "output",
        "result",
        "data"
      ]) {
        if (key in v) scan(v[key]);
      }
      if ("url" in v) scan(v.url);
    }
  };

  scan(output);
  return imgs.filter(Boolean);
}
