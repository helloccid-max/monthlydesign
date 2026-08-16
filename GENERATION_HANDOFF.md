# CoverSelect 이후 개발 인계

저장소에서 `GENERATION_HANDOFF_START`를 검색하면 CoverSelect의 제출 지점과
생성 플로우가 시작되는 연결 지점을 바로 찾을 수 있습니다.

## 시작 위치

- 진입 컴포넌트: `components/generation/index.js`
- 요청 규격: `components/generation/contract.js`
- 상세 소유 범위: `components/generation/README.md`

## 입력 데이터

```js
{
  coverId,
  coverImageUrl,
  issue,
  date,
  prompt,
}
```

`CoverSelectScreen`은 위 객체를 `onSubmit`으로 전달합니다. 이후 화면은 반드시
전달받은 `request`를 사용하고, 표지나 프롬프트를 `localStorage`에서 다시 읽지 않습니다.

## 동료 담당 범위

- `components/generation/`
- `components/load/`
- `components/homage/`
- `pages/api/homage-cover.js`
- `lib/homageCover.js`

화면 간 스와이프와 전체 단계 전환은 `components/mobile/`이 담당합니다.
이 파일을 수정해야 할 경우에는 인트로·CoverSelect 담당자와 먼저 조율합니다.
