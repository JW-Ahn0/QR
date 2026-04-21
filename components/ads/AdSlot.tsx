"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Props = {
  /** 모바일 전용 / PC(lg 이상) 전용 슬롯 */
  device: "mobile" | "desktop";
  className?: string;
};

/**
 * 애드센스 등 삽입 전 레이아웃·CLS 대비용 자리.
 * 실제 스크립트는 이 컨테이너 안(또는 대체)으로 넣으면 됩니다.
 */
export function AdSlot({ device, className }: Props) {
  const t = useTranslations("AdSlot");
  const isMobile = device === "mobile";

  return (
    <div
      data-ad-slot={device}
      role="complementary"
      aria-label={isMobile ? t("ariaMobile") : t("ariaDesktop")}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 rounded-xl border border-dashed border-border bg-muted/50 px-3 py-3 text-center",
        isMobile
          ? "min-h-[100px] w-full lg:hidden"
          : "hidden min-h-[280px] w-full lg:flex lg:shrink-0",
        className,
      )}
    >
      <span className="text-muted-foreground text-[11px] font-medium tracking-wide">
        {t("badge")}
      </span>
      <span className="text-muted-foreground/90 text-xs">
        {isMobile ? t("hintMobile") : t("hintDesktop")}
      </span>
    </div>
  );
}
