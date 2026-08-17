# Legacy (비활성 보관소)

이전 엽서(postcard) 버전에서 남은 코드입니다. **현재 플로우에서 호출되지 않으며,
Next.js 빌드 대상도 아닙니다.** `pages/` 밖에 있으므로 여기 있는 API 파일은
라우트로 노출되지 않습니다. 실수로 다시 연결되는 것을 막으려고 옮겨 두었을 뿐,
삭제하지는 않았습니다.

## 옮겨진 것

| 경로 | 원래 위치 | 비고 |
| --- | --- | --- |
| `components/landing/` | `components/landing/` | 구 랜딩 화면. `/landing` 라우트는 존재한 적 없음 |
| `components/end/` | `components/end/` | 구 종료 화면. `/api/wall-send`·`/api/normalize-text`·`/api/proxy-image`의 유일한 호출자였음 |
| `components/text/` | `components/text/` | 구 텍스트 입력 화면 |
| `components/prompts/` | `components/prompts/` | `normalize-text` 전용 시스템 프롬프트 |
| `components/PageLayout.js` | `components/PageLayout.js` | 어디서도 import되지 않음 |
| `api/normalize-text.js` | `pages/api/normalize-text.js` | OpenAI 호출. 호출자가 없어진 채 공개돼 있어 라우트에서 내림 |
| `api/proxy-image.js` | `pages/api/proxy-image.js` | Google 도메인 이미지 프록시 |

## 되살리는 방법

1. 파일을 원래 위치로 되돌립니다 (`git mv`).
2. `legacy/api/normalize-text.js`의 `../components/prompts/...` import를
   `../../components/prompts/...`로 되돌립니다. (경로 깊이가 달라 한 줄만 수정)

## `covers-archive-png/` — 아카이브 표지 PNG 원본 (보관)

`public/covers/archive/`의 원본 PNG 578장(45MB)입니다. 서빙은 같은 자리의
WebP(q82, 7.1MB)로 전환했고, 원본은 여기 보관합니다. `legacy/`는
`.vercelignore`에 있어 배포에 포함되지 않습니다.

- 재변환: `cd legacy/covers-archive-png && ls *.png | xargs -P 8 -I {} sh -c
  'cwebp -q 82 -quiet "{}" -o "../../public/covers/archive/${1%.png}.webp"' _ {}`
- `scripts/analyze-monthly-design-covers.mjs`는 픽셀 분석 입력으로 이 폴더를
  기본 사용하며, 출력 `imageUrl`은 서빙용 `.webp`를 가리킵니다.
- 새 표지 추가 시: PNG 원본은 이 폴더에, `cwebp -q 82`로 만든 WebP는
  `public/covers/archive/`에 넣고 `lib/monthlyDesignCovers.js`의
  `MONTHLY_DESIGN_ARCHIVE_VERSION`을 올립니다.

## 여기 없지만 함께 멈춘 것

- `components/wall/` 전체 — 코드는 제자리에 있고 `lib/featureFlags.js`의
  `WALL_ENABLED = false`로 진입만 막았습니다.
- `pages/api/wall-send.js`, `pages/api/log-interaction.js`,
  `pages/api/random-public-image.js` — wall 전용이라 wall과 함께 두었습니다.
  wall이 꺼져 있는 동안에는 호출자가 없습니다.
- `components/wall/` 안의 미사용 파일: `p5Mosaic.js`, `ScatteredTiles.js`,
  `SynthTreeWall.js`, `synthTree/`. wall을 하나의 단위로 유지하려고 그대로 뒀습니다.
