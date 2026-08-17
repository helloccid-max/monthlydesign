# Conditional RunPod pre-warming

The first **Tap to Play** starts a best-effort pre-warm check. It never blocks
intro playback or a real cover-generation request.

## Timing

- RunPod idle timeout: `600s`
- Ready validity: `540s` (60-second safety margin)
- Atomic warm-up lock: `240s`
- Failure retry delay: `120s`

The shared state lives in Upstash Redis because Vercel server instances do not
share memory. A real `COMPLETED` generation refreshes `lastSuccessfulAt`, so a
new visitor does not start a redundant warm-up while the worker should still be
alive.

## Worker contract

This web repository does not contain the Python RunPod worker. Its handler
should support:

```json
{
  "input": {
    "mode": "warmup",
    "warmup": true
  }
}
```

That branch should load the same checkpoint, CLIP and VAE used by generation,
then return a small JSON response without saving an image. For example:

```python
def handler(job):
    payload = job.get("input", {})
    if payload.get("mode") == "warmup":
        load_generation_models()
        return {"warmed": True}
    return run_generation(payload)
```

Until the worker change is deployed, this request can still wake the
serverless container. If the old handler rejects it, the site records only
`container-ready`; normal image generation continues unchanged.

## Environment

The Vercel Upstash integration supplies `KV_REST_API_URL` and
`KV_REST_API_TOKEN`. Native `UPSTASH_REDIS_REST_URL` and
`UPSTASH_REDIS_REST_TOKEN` names are also accepted.

Set `RUNPOD_WARMUP_ENABLED=0` for an immediate kill switch. Use
`RUNPOD_WARMUP_INPUT_JSON` only when the worker expects different JSON.
