# QR 스타일링 서비스 — 요구사항 명세

본 문서는 웹 클라이언트에서 `qr-code-styling`을 사용해 URL·텍스트 기반 QR을 생성·미리보기·다운로드하는 서비스의 요구사항을 정의한다. 구현 계획 및 추적은 [plan.md](./plan.md)를 따른다.

---

## 1. 목적·범위

- 사용자가 **페이로드**(URL 또는 임의 UTF-8 문자열)를 입력하면, **`qr-code-styling`이 제공하는 스타일·이미지·QR 옵션**을 UI로 조절할 수 있다.
- 변경 사항은 **실시간 미리보기**에 반영된다.
- 사용자는 라이브러리가 지원하는 **이미지 형식**으로 결과를 다운로드할 수 있다.
- 제품의 기본 검증 시나리오는 **투명 배경 PNG**이며, 배경 투명은 미리보기에서 **체크무늬** 등으로 확인 가능해야 한다.

**범위 밖**은 [5. 제외 범위](#5-제외-범위)를 따른다.

---

## 2. 용어

| 용어 | 설명 |
|------|------|
| 페이로드 | QR에 인코딩되는 원문 문자열(예: `https://example.com`). |
| 미리보기 | DOM에 렌더된 QR(캔버스 또는 SVG). |
| 옵션 | `qr-code-styling`의 `Options` 객체 및 하위 필드. |

---

## 3. 이해관계자·시나리오

- **일반 사용자**: 링크나 텍스트를 붙여넣거나 입력하고, 스타일을 조정한 뒤 PNG 등으로 저장한다.
- **디자이너/마케터**: 도트·모서리·배경·로고 이미지를 조합해 브랜드에 맞는 QR을 만든다.

주요 시나리오:

1. 페이로드 입력 → 디바운스 후 미리보기 갱신.
2. 스타일 패널에서 옵션 변경 → 즉시 미리보기 갱신.
3. 확장자 선택 후 다운로드 → 파일 저장.

---

## 4. 기능 요구사항

### REQ-F-01 — 페이로드 입력

- 단일 **페이로드** 입력 영역을 제공한다(여러 줄이 필요하면 `textarea` 사용 가능).
- 값이 비어 있으면 QR을 그리지 않거나, “내용을 입력하세요” 등 안내를 표시한다.

**수용 기준:** 빈 문자열일 때 잘못된 QR이 생성되지 않으며, UI가 명확히 안내한다.

### REQ-F-02 — 갱신 정책

- **페이로드** 변경 시 미리보기 갱신에는 **디바운스**를 적용한다(권장 150~300ms, 구현에서 상수로 고정).
- **스타일·레이아웃·이미지 등 페이로드 이외 옵션**만 변경된 경우에는 디바운스 없이 **즉시** `QRCodeStyling`에 반영한다.

**수용 기준:** 빠른 타이핑 시에도 매 키 입력마다가 아닌 디바운스 주기로 갱신되고, 색·슬라이더 조작은 즉시 반응한다.

### REQ-F-03 — 인코딩 일치

- 스캔 결과 디코딩 문자열은 사용자가 입력한 페이로드와 **동일**해야 한다(앞뒤 공백 정책은 구현에서 한 가지로 고정하고 문서화).

**수용 기준:** 표준 리더로 스캔 시 원문과 일치한다.

### REQ-F-04 — 다운로드 형식

- `qr-code-styling`의 `download` API가 지원하는 **모든 확장자**를 사용자가 선택해 다운로드할 수 있어야 한다.
- 본 명세가 기준으로 하는 라이브러리 버전은 **부록 A**의 버전과 동일하며, 해당 버전에서 지원하는 확장자는 **png, jpeg, webp, svg**이다(메이저 업 시 부록 갱신).
- 저장 파일명 규칙: **`QR-Image.<확장자>`** 고정(`png` / `jpeg` / `webp` / `svg`).

**수용 기준:** 네 가지 확장자 각각으로 다운로드가 성공하고 파일이 열린다.

### REQ-F-05 — 배경 투명

- `backgroundOptions` 등 라이브러리 옵션으로 **투명 배경**을 설정할 수 있어야 한다.
- 미리보기 컨테이너는 **체크무늬** 배경을 두어 투명 픽셀을 육안으로 구분할 수 있어야 한다.

**수용 기준:** 투명 모드에서 PNG를 뷰어로 열었을 때 배경이 투명으로 보이고, 미리보기에서 체크무늬가 비친다.

### REQ-F-06 — 레이아웃 (`width`, `height`, `margin`, `type`)

- **width**, **height**, **margin**을 UI에서 조절할 수 있어야 한다.
- 렌더 **type**은 `canvas` | `svg` 중 선택 가능해야 하며, 미리보기와 다운로드가 선택과 일치해야 한다.
- 루트 **`shape`**(`square` | `circle`)는 UI에서 노출하지 않으며, 생성 시 항상 **`square`**로 고정한다.

**수용 기준:** 값 변경 시 미리보기 크기·여백이 일치하고, canvas/svg 전환 후에도 다운로드가 동작한다.

### REQ-F-07 — `qrOptions`

- **`typeNumber`**, **`mode`**, **`errorCorrectionLevel`**는 UI에서 노출하지 않으며, 생성 시 다음으로 **고정**한다: **`typeNumber` = 0(자동)**, **`mode` = `Byte`**, **`errorCorrectionLevel` = `M`**.

**수용 기준:** 부록 B의 `qrOptions` 행이 위 고정값으로 충족된다.

### REQ-F-08 — `dotsOptions`

- **도트 타입**(`type`)과 **단색**(`color`)을 UI에서 설정할 수 있어야 한다.
- **`dotsOptions.roundSize`**는 UI에서 노출하지 않으며 **라이브러리 기본(`true`)**으로 고정한다.
- **`dotsOptions.gradient`**는 사용하지 않는다.

**수용 기준:** 부록 B의 `dotsOptions` 행이 위 정책으로 충족된다.

### REQ-F-09 — 모서리 옵션

- **`cornersSquareOptions`**, **`cornersDotOptions`** 각각에 대해 **타입**과 **단색**(`color`)을 UI에서 설정할 수 있어야 한다.
- **`gradient`**는 사용하지 않는다.

**수용 기준:** 부록 B의 모서리 관련 항목이 위 정책으로 충족된다.

### REQ-F-10 — `backgroundOptions`

- 배경 **단색**(`color`) 및 **투명**(알파 0)을 UI에서 설정할 수 있어야 한다. REQ-F-05와 모순되지 않게 동작해야 한다.
- **`backgroundOptions.gradient`**는 사용하지 않는다.
- **`backgroundOptions.round`**는 제품에서 노출하지 않으며, 라이브러리 기본 동작에 맡긴다.

**수용 기준:** 단색·투명 전환이 미리보기에 반영된다.

### REQ-F-11 — 중앙 이미지 (`image`, `imageOptions`)

- 중앙 이미지는 **로컬 파일 업로드**로만 지정할 수 있어야 한다(브라우저에서 `data:` URL로 변환해 `image`에 전달).
- **`imageOptions`**의 필드(**`hideBackgroundDots`**, **`imageSize`**, **`margin`** 등)를 라이브러리가 제공하는 범위에서 UI로 조절할 수 있어야 한다.
- **`imageOptions.crossOrigin`**은 UI에서 노출하지 않으며, 외부 URL 입력도 제공하지 않는다.
- **`imageOptions.saveAsBlob`**은 UI에서 노출하지 않으며 **`false`로 고정**한다.

**수용 기준:** 이미지 유무·크기·마진·배경 도트 숨김이 미리보기 및 다운로드에 반영된다.

---

## 5. 비기능 요구사항

### REQ-N-01 — 브라우저

- 최신 안정 **Chrome, Edge, Firefox, Safari**(데스크톱·모바일) 동작을 목표로 한다.

### REQ-N-02 — 개인정보·서버

- 페이로드·이미지 처리는 **클라이언트에서만** 수행한다(별도 서버 API 없음).
- 개인정보를 수집·전송하지 않는다.

### REQ-N-03 — 입력 한계

- 비정상적으로 긴 문자열에서도 UI가 깨지지 않도록, 페이로드 길이에 **합리적 상한**(구현 상수 **600자**)을 두고 초과 시 입력이 잘리도록 할 수 있다.

### REQ-N-04 — UI 프레임워크

- 주요 인터랙션은 **shadcn/ui** 컴포넌트로 구성한다.

### REQ-N-05 — 패키지 매니저

- 의존성 설치·스크립트는 **Yarn**으로 통일한다(`yarn.lock` 사용).

### REQ-N-06 — 스캔 가능성 경고(권장)

- 큰 중앙 이미지 등 스캔 실패 가능성이 있음을 **비차단** 방식(예: `Alert`)으로 알릴 수 있다.

---

## 6. 제외 범위

다음은 **본 릴리스 범위에서 제외**한다.

- 서버 측 저장·계정·팀 공유 DB
- 단축 URL 발급·리다이렉트 서비스
- 서버 기반 분석·로깅
- **프리셋**(옵션 조합의 `localStorage` 저장·불러오기)

**포함:** 중앙 로고/이미지는 REQ-F-11로 **포함**한다.

---

## 7. 수용 기준 요약

- 위 각 REQ의 개별 수용 기준을 만족한다.
- **부록 B**의 `Options` 필드가 UI 또는 문서화된 기본값으로 **전부** 대응되는가를 체크리스트로 검증한다.

---

## 부록 A — 라이브러리 버전·다운로드 확장자

| 항목 | 값 |
|------|-----|
| 패키지명 | `qr-code-styling` |
| 버전 | **1.9.2** (`package.json`의 `qr-code-styling`과 동일하게 유지). |
| `download` 확장자 | `png`, `jpeg`, `webp`, `svg` |

메이저 업그레이드 시 **부록 A·B를 반드시 갱신**한다.

---

## 부록 B — `Options` 필드 대응 체크리스트

구현 완료 후 각 행에 대해 “UI 제공” 또는 “코드 기본값 고정(값 명시)” 중 하나로 채운다.

| 구분 | 필드 | UI 또는 기본값 |
|------|------|-----------------|
| 루트 | `width` | |
| 루트 | `height` | |
| 루트 | `type` (`canvas` / `svg`) | |
| 루트 | `shape` | 코드 고정 `square` |
| 루트 | `data` | 페이로드 입력에 연동 |
| 루트 | `margin` | |
| 루트 | `qrOptions.typeNumber` | 코드 고정 `0`(자동) |
| 루트 | `qrOptions.mode` | 코드 고정 `Byte` |
| 루트 | `qrOptions.errorCorrectionLevel` | 코드 고정 `M` |
| 루트 | `image` | 로컬 파일 업로드(`data:` URL) |
| 이미지 | `imageOptions.hideBackgroundDots` | |
| 이미지 | `imageOptions.imageSize` | |
| 이미지 | `imageOptions.margin` | |
| 이미지 | `imageOptions.saveAsBlob` | 코드 고정 `false` |
| 이미지 | `imageOptions.crossOrigin` | UI 없음(옵션 미전달) |
| 도트 | `dotsOptions.type` | |
| 도트 | `dotsOptions.color` | |
| 도트 | `dotsOptions.roundSize` | 코드 고정 `true` |
| 도트 | `dotsOptions.gradient` | 미전달(단색만) |
| 모서리 | `cornersSquareOptions.type` | |
| 모서리 | `cornersSquareOptions.color` | |
| 모서리 | `cornersSquareOptions.gradient` | 미전달(단색만) |
| 모서리 | `cornersDotOptions.type` | |
| 모서리 | `cornersDotOptions.color` | |
| 모서리 | `cornersDotOptions.gradient` | 미전달(단색만) |
| 배경 | `backgroundOptions.color` | |
| 배경 | `backgroundOptions.gradient` | 미전달(단색·투명만) |
| 배경 | `backgroundOptions.round` | 라이브러리 기본(옵션 미전달) |

> 라이브러리 타입 정의에 추가 필드가 있으면 동일 표에 행을 추가한다.

---

## 문서 이력

| 일자 | 변경 |
|------|------|
| 2026-04-21 | 초안 작성 |
