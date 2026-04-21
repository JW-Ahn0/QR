"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");

  const item = (l: "ko" | "en", label: string) => (
    <Link
      href={pathname}
      locale={l}
      className={cn(
        "rounded-md px-2 py-1 text-xs font-medium transition-colors",
        locale === l
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground text-xs">{t("label")}</span>
      <div className="flex gap-1">
        {item("ko", t("ko"))}
        {item("en", t("en"))}
      </div>
    </div>
  );
}
