# Monthly Design Homage

월간디자인 과거 표지를 선택하고 프롬프트를 말해 오마주 표지를 생성하는
React + Next.js(Pages Router) 기반 웹 프로젝트입니다.

## 시작하기

### 의존성 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하세요.

### 빌드 및 프로덕션 실행

```bash
yarn build
yarn start
```

### 린트

```bash
yarn lint
```

## 프로젝트 구조

- `pages/` - 페이지 라우터 (파일 기반 라우팅)
- `styles/` - 전역 스타일
- `public/` - 정적 파일 (이미지, favicon 등)

## 협업 개발 경계

현재 플로우는 `Intro → CoverSelect → Generation/Load → Homage Result` 순서입니다.

- 인트로와 표지 선택: `components/intro/`, `components/coverSelect/`
- **CoverSelect 이후 담당:** `components/generation/`, `components/load/`, `components/homage/`
- 생성 API와 로직: `pages/api/homage-cover.js`, `lib/homageCover.js`
- 화면 간 전환: `components/mobile/` — 여러 담당자가 동시에 수정하지 않도록 조율 필요

CoverSelect는 아래 형태의 객체를 `onSubmit`으로 전달하며, 이후 화면은
`localStorage` 대신 전달받은 `request`를 사용합니다.

```js
{
  coverId,
  coverImageUrl,
  issue,
  date,
  prompt,
}
```

CoverSelect 이후 작업을 시작할 때 저장소에서 `GENERATION_HANDOFF_START`를
검색하세요. 자세한 내용은 [`GENERATION_HANDOFF.md`](./GENERATION_HANDOFF.md)와
[`components/generation/README.md`](./components/generation/README.md)에 있습니다.

## GitHub → Vercel 배포

- GitHub 저장소: `https://github.com/helloccid-max/monthlydesign`
- Vercel 프로젝트: `https://vercel.com/cci-d/monthlydesign`
- Production Branch: `main`
- Framework Preset: `Next.js`

Vercel 프로젝트와 GitHub 저장소를 한 번 연결하면 `main` 푸시는 Production,
다른 브랜치와 Pull Request는 Preview Deployment로 자동 배포됩니다.

모바일 플로우(`/mobile`)는 별도 환경 변수 없이 빌드됩니다. Google Sheets 기록과
OpenAI 텍스트 정규화 기능을 사용할 때만 해당 API 환경 변수를 Vercel Project
Settings에 추가합니다. `server.js`의 Socket.IO는 로컬/상시 실행 서버용이므로,
Vercel에서는 `/mobile`과 일반 Next.js API를 우선 배포 대상으로 봅니다.
