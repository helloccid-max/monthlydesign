# Generation flow ownership

This directory is the handoff boundary for everything after `CoverSelect`.
Search the repository for `GENERATION_HANDOFF_START` to find both sides of the boundary.

## Input contract

`CoverSelectScreen` submits one request object through `onSubmit`:

```js
{
  coverId,
  coverImageUrl,
  issue,
  date,
  prompt,
}
```

`MobileScreen` keeps that request in memory and passes it to `GenerationFlow`.
Downstream screens must not read the selected cover or prompt from `localStorage`.

## Ownership

The generation owner may change:

- `components/generation/`
- `components/load/`
- `components/homage/`
- `pages/api/homage-cover.js`
- `lib/homageCover.js`

Coordinate changes to `components/mobile/` because it owns cross-scene transitions.
The intro and cover-selection teams should only rely on the request contract above.
