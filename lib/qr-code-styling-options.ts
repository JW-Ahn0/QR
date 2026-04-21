import type { DownloadExtension } from "@/lib/qr-constants";
import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  DrawType,
  Options,
  TypeNumber,
} from "qr-code-styling";

/** 라이브러리 기본과 동일: 도트 크기 정수 맞춤 */
export const FIXED_DOTS_ROUND_SIZE = true;

/** UI 비노출. 변경 시 `docs/requirements.md` REQ-F-07·부록 B와 맞출 것. */
export const FIXED_QR_OPTIONS = {
  typeNumber: 0 as TypeNumber,
  mode: "Byte" as const,
  errorCorrectionLevel: "M" as const,
};

export type QrFormState = {
  layout: {
    width: number;
    height: number;
    margin: number;
    type: DrawType;
  };
  dots: {
    type: DotType;
    solid: string;
  };
  cornersSquare: {
    type: CornerSquareType;
    solid: string;
  };
  cornersDot: {
    type: CornerDotType;
    solid: string;
  };
  background: {
    transparent: boolean;
    solid: string;
  };
  image: {
    src: string;
    hideBackgroundDots: boolean;
    imageSize: number;
    margin: number;
  };
};

/** JPEG은 알파가 없어 다운로드 시 항상 불투명 배경이 필요하다. */
export function formStateForDownload(
  state: QrFormState,
  extension: DownloadExtension,
): QrFormState {
  if (extension !== "jpeg") return state;
  return {
    ...state,
    background: {
      ...state.background,
      transparent: false,
    },
  };
}

export function buildOptions(state: QrFormState, data: string): Options {
  const bg = state.background;
  const backgroundOptions: Options["backgroundOptions"] = bg.transparent
    ? { color: "#00000000" }
    : { color: bg.solid };

  const opts: Options = {
    width: Math.round(state.layout.width),
    height: Math.round(state.layout.height),
    margin: Math.round(state.layout.margin),
    type: state.layout.type,
    shape: "square",
    data,
    qrOptions: { ...FIXED_QR_OPTIONS },
    dotsOptions: {
      type: state.dots.type,
      roundSize: FIXED_DOTS_ROUND_SIZE,
      color: state.dots.solid,
    },
    cornersSquareOptions: {
      type: state.cornersSquare.type,
      color: state.cornersSquare.solid,
    },
    cornersDotOptions: {
      type: state.cornersDot.type,
      color: state.cornersDot.solid,
    },
    backgroundOptions,
    imageOptions: {
      hideBackgroundDots: state.image.hideBackgroundDots,
      imageSize: state.image.imageSize,
      margin: state.image.margin,
      saveAsBlob: false,
    },
  };

  /** `update()`는 병합이라 `image` 키를 생략하면 이전 URL이 남음 → 빈 문자열로 명시 제거 */
  opts.image = state.image.src.trim() || "";

  return opts;
}
