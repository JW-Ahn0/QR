import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  DrawType,
} from "qr-code-styling";

export const DOT_TYPES: DotType[] = [
  "dots",
  "rounded",
  "classy",
  "classy-rounded",
  "square",
  "extra-rounded",
];

export const CORNER_SQUARE_TYPES: CornerSquareType[] = [
  "dot",
  "square",
  "extra-rounded",
  "dots",
  "rounded",
  "classy",
  "classy-rounded",
];

export const CORNER_DOT_TYPES: CornerDotType[] = [
  "dot",
  "square",
  "dots",
  "rounded",
  "classy",
  "classy-rounded",
  "extra-rounded",
];

export const DRAW_TYPES: DrawType[] = ["canvas", "svg"];

/** `download({ name })`에 쓰는 확장자 제외 파일명 (저장 시 `QR-Image.png` 형태) */
export const DOWNLOAD_FILE_BASENAME = "QR-Image";

export const DOWNLOAD_EXTENSIONS = ["png", "jpeg", "webp", "svg"] as const;

export type DownloadExtension = (typeof DOWNLOAD_EXTENSIONS)[number];

export const MAX_PAYLOAD_LENGTH = 600;

/** 페이로드 입력란 초기값 (미리보기·다운로드 기본 대상) */
export const DEFAULT_QR_PAYLOAD = "https://example.com";

export const PAYLOAD_DEBOUNCE_MS = 250;
