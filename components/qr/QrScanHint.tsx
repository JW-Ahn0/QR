"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { QrFormState } from "@/lib/qr-code-styling-options";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

type Props = {
  state: QrFormState;
};

export function QrScanHint({ state }: Props) {
  const t = useTranslations("QrScanHint");
  const bigLogo =
    Boolean(state.image.src.trim()) && state.image.imageSize >= 0.38;

  if (!bigLogo) return null;

  return (
    <Alert className="border-amber-500/50 bg-amber-500/5">
      <AlertTriangle className="size-4 text-amber-600" />
      <AlertTitle>{t("title")}</AlertTitle>
      <AlertDescription className="text-muted-foreground text-sm">
        {t("body")}
      </AlertDescription>
    </Alert>
  );
}
