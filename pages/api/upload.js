import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function parseDataUrl(dataUrl) {
  const s = String(dataUrl || "").trim();
  const m = /^data:([^;]+);base64,(.+)$/u.exec(s);
  if (!m) return null;
  return { mime: m[1], base64: m[2] };
}

function safeName(name) {
  return String(name || "image")
    .trim()
    .replace(/[^\w.\-]+/gu, "_")
    .slice(0, 120);
}

function json(res, status, data) {
  res.setHeader("cache-control", "no-store, max-age=0");
  res.status(status).json(data);
}

export const config = {
  api: { bodyParser: { sizeLimit: "12mb" } }
};

export default async function handler(req, res) {
  console.log("Upload API called");
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const {
    dataUrl,
    filename = "",
    folder = "covers"
  } = req.body || {};

  console.log("dataUrl length:", dataUrl ? dataUrl.length : 0);

  const parsed = parseDataUrl(dataUrl);
  if (!parsed) {
    console.error("Failed to parse dataUrl");
    return json(res, 400, { error: "dataUrl must be a base64 data URL" });
  }

  const endpoint = process.env.S3_ENDPOINT;
  const region = process.env.S3_REGION || "auto";
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  const bucket = process.env.S3_BUCKET;
  const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL;

  const missing = [];
  if (!endpoint) missing.push("S3_ENDPOINT");
  if (!accessKeyId) missing.push("S3_ACCESS_KEY_ID");
  if (!secretAccessKey) missing.push("S3_SECRET_ACCESS_KEY");
  if (!bucket) missing.push("S3_BUCKET");
  if (!publicBaseUrl) missing.push("S3_PUBLIC_BASE_URL");
  if (missing.length) {
    console.error("Missing env vars:", missing);
    return json(res, 500, {
      error: `Missing ${missing[0]}`,
      missing
    });
  }

  const key = `${safeName(folder)}/${Date.now()}_${safeName(filename) || "image"}`;
  const body = Buffer.from(parsed.base64, "base64");

  try {
    const client = new S3Client({
      region,
      endpoint,
      forcePathStyle: true,
      credentials: { accessKeyId, secretAccessKey }
    });

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: parsed.mime,
        CacheControl: "public, max-age=31536000, immutable"
      })
    );

    const url = `${String(publicBaseUrl).replace(/\/+$/u, "")}/${key}`;
    return json(res, 200, { url, key, contentType: parsed.mime });
  } catch (e) {
    console.error("Upload failed with error:", e);
    return json(res, 502, { error: "Upload failed", detail: String(e?.message || e) });
  }
}

