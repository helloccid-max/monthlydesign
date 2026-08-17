import { runpodFetch } from "@/lib/runpod/fetch";
import { normalizeImagesFromOutput } from "@/lib/runpod/normalizeImages";
import { recordSuccessfulRunPodGeneration } from "@/lib/runpod/warmupServer";

function json(res, status, data) {
  res.setHeader("cache-control", "no-store, max-age=0");
  res.status(status).json(data);
}

export default async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });

  const apiKey = process.env.RUNPOD_API_KEY;
  const endpointId = process.env.RUNPOD_ENDPOINT_ID;
  if (!apiKey) return json(res, 500, { error: "Missing RUNPOD_API_KEY" });
  if (!endpointId) return json(res, 500, { error: "Missing RUNPOD_ENDPOINT_ID" });

  const id = typeof req.query.id === "string" ? req.query.id : "";
  if (!id) return json(res, 400, { error: "id is required" });

  try {
    const statusUrl = `https://api.runpod.ai/v2/${encodeURIComponent(endpointId)}/status/${encodeURIComponent(id)}`;
    const st = await runpodFetch(statusUrl, apiKey, { method: "GET" });
    const output = st?.output ?? null;
    const error = st?.error ?? null;
    const images = normalizeImagesFromOutput(output);
    const delayTime = st?.delayTime ?? st?.delay_time ?? null;
    const executionTime = st?.executionTime ?? st?.execution_time ?? null;
    const workerId = st?.workerId ?? st?.worker_id ?? null;

    if (String(st?.status || "").toUpperCase() === "COMPLETED") {
      await recordSuccessfulRunPodGeneration({ endpointId, jobId: id, workerId });
    }

    return json(res, 200, {
      id,
      status: st?.status || "",
      delayTime,
      executionTime,
      workerId,
      output,
      error,
      images
    });
  } catch (e) {
    return json(res, 502, { error: "RunPod status failed", detail: String(e?.message || e) });
  }
}
