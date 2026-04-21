# QR 스타일링 서비스 — 구현 계획

요구사항 명세: [requirements.md](./requirements.md)  
요구사항 ID(`REQ-*`)와 본 문서의 매핑·실행 단계를 정의한다.

---

## 1. 요약

Next.js(App Router) + TypeScript + Tailwind + **shadcn/ui** + **Yarn**으로 단일 웹 앱을 구성하고, QR 생성·스타일링·다운로드는 **`qr-code-styling` 단일 엔진**으로 처리한다. 서버 API는 사용하지 않는다.

---

## 2. 요구사항 매핑표

| REQ ID | 구현 단락 |
|--------|-----------|
| REQ-F-01 | `components/qr/QrPayloadField.tsx` — 입력·빈 값 안내 |
| REQ-F-02 | `lib/debounce.ts` + `QrWorkspace`에서 페이로드만 디바운스, 옵션은 즉시 `update` |
| REQ-F-03 | `QRCodeStyling`에 `data`로 원문 전달(트림 정책은 한 곳에만) |
| REQ-F-04 | `components/qr/QrDownloadBar.tsx` — 확장자 `Select` + `download()` (저장명 `QR-Image.<ext>` 고정) |
| REQ-F-05 | 기본 `backgroundOptions` + 미리보기 래퍼에 체크무늬 CSS |
| REQ-F-06 | 레이아웃 패널: width/height/margin/type · `shape`은 `square` 고정 |
| REQ-F-07 | `lib/qr-code-styling-options.ts` — `qrOptions` 고정 (`0` / `Byte` / `M`) |
| REQ-F-08 | `components/qr/panels/DotsPanel.tsx` |
| REQ-F-09 | `components/qr/panels/CornersPanel.tsx` |
| REQ-F-10 | `components/qr/panels/BackgroundPanel.tsx` |
| REQ-F-11 | `components/qr/panels/ImagePanel.tsx` |
| REQ-N-01~03 | 반응형 레이아웃·길이 상한·클라이언트 전용 구조 |
| REQ-N-04 | shadcn 컴포넌트로 패널 구성 |
| REQ-N-05 | README·스크립트를 Yarn 기준으로 유지 |
| REQ-N-06 | `components/qr/QrScanHint.tsx` 또는 조건부 `Alert` |

---

## 3. 기술 선택

| 영역 | 선택 | 비고 |
|------|------|------|
| 프레임워크 | Next.js(App Router) | `yarn create next-app` |
| 언어 | TypeScript | |
| 스타일 | Tailwind CSS | create-next-app 옵션 |
| UI | shadcn/ui | `yarn dlx shadcn@latest init` / `add` |
| 패키지 매니저 | Yarn | `yarn.lock` |
| QR 엔진 | `qr-code-styling` **1.9.2** | [requirements.md 부록 A/B](./requirements.md#부록-a--라이브러리-버전다운로드-확장자)와 동기화 |

**투명 PNG**는 기본 시나리오 수동 테스트에 포함한다.

---

## 4. shadcn 컴포넌트(추가 예정)

최소·확장: `button`, `input`, `label`, `card`, `tabs`, `select`, `slider`, `switch`, `separator`, `alert`, `popover`, `textarea`(선택)

```bash
yarn dlx shadcn@latest add button input label card tabs select slider switch separator alert popover textarea
```

---

## 5. 디렉터리·파일

| 경로 | 역할 |
|------|------|
| [app/page.tsx](../app/page.tsx) | 페이지 조합 |
| [app/layout.tsx](../app/layout.tsx) | 메타·폰트 |
| [components/QrWorkspace.tsx](../components/QrWorkspace.tsx) | 클라이언트 루트; `QRCodeStyling` 인스턴스·ref·상태 |
| [components/qr/](../components/qr/) | 페이로드·패널·다운로드·경고 |
| [lib/qr-defaults.ts](../lib/qr-defaults.ts) | 기본 `Options` |
| [lib/qr-code-styling-options.ts](../lib/qr-code-styling-options.ts) | UI 상태 ↔ `Options` 빌드 |
| [lib/debounce.ts](../lib/debounce.ts) | 디바운스 유틸 |
| [components/ui/](../components/ui/) | shadcn 생성물 |

---

## 6. 단계별 작업(Phase)

### Phase 0 — 스캐폴딩

1. `yarn create next-app@latest .` (Tailwind, ESLint, App Router, TS, import alias `@/*`). 기존 `docs/`가 있으면 `--force` 등 CLI 안내에 따름.
2. `yarn add qr-code-styling`
3. `yarn dlx shadcn@latest init` 후 [4. shadcn 컴포넌트](#4-shadcn-컴포넌트추가-예정) `add`

### Phase 1 — REQ-F-01~03

- 페이로드 필드 + 디바운스 + 빈 상태 안내
- `QRCodeStyling` 미리보기 마운트

### Phase 2 — REQ-F-04~06

- 다운로드: png / jpeg / webp / svg
- 체크무늬 미리보기 배경
- width, height, margin, type UI

### Phase 3 — REQ-F-07~11

- `qrOptions` 고정값, dots, corners, background, image 패널

### Phase 4 — REQ-N-06, 마무리

- 중앙 이미지 크기 등에 대한 비차단 경고
- requirements 부록 B 체크리스트 수동 검증
- README에 Yarn 설치·실행 방법

---

## 7. 완료 정의(DoD)

- [requirements.md](./requirements.md)의 기능·비기능 REQ 및 수용 기준이 충족된다.
- 부록 B 체크리스트를 채울 수 있다(또는 이미 채워 반영).
- 주요 화면이 shadcn 컴포넌트 기반이며, `yarn build`가 성공한다.

---

## 8. 운영 규칙

- `qr-code-styling` **메이저 업그레이드** 시 `Options` 변경 가능 → [requirements.md](./requirements.md) 부록 A·B 및 본 문서 매핑을 갱신한다.

---

## 문서 이력

| 일자 | 변경 |
|------|------|
| 2026-04-21 | 초안 작성 |
