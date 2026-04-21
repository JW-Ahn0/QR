import type { QrFormState } from "@/lib/qr-code-styling-options";

/** 페이로드 외 옵션의 초기값 (투명 배경 기본) */
export function defaultQrFormState(): QrFormState {
  return {
    layout: {
      width: 320,
      height: 320,
      margin: 12,
      type: "canvas",
    },
    dots: {
      type: "square",
      solid: "#111111",
    },
    cornersSquare: {
      type: "square",
      solid: "#111111",
    },
    cornersDot: {
      type: "square",
      solid: "#111111",
    },
    background: {
      transparent: true,
      solid: "#ffffff",
    },
    image: {
      src: "",
      hideBackgroundDots: true,
      imageSize: 0.35,
      margin: 4,
    },
  };
}
