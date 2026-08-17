/**
 * Wall(전시 벽) 화면 비활성화 스위치.
 *
 * 코드는 `components/wall/`에 그대로 두고 진입 경로만 끊는다. 이 값이 false면
 * `/wall` 페이지가 Socket.IO / Three.js / 이미지 API를 아예 마운트하지 않고,
 * 모바일 플로우에서도 아카이브 이동 버튼이 사라진다.
 *
 * 다시 켤 때는 이 값만 true로 되돌리면 된다.
 */
export const WALL_ENABLED = false;
