"use client";

import { SolidColorInput } from "@/components/qr/panels/SolidColorInput";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { QrFormState } from "@/lib/qr-code-styling-options";
import { useTranslations } from "next-intl";

type Props = {
  state: QrFormState;
  setState: React.Dispatch<React.SetStateAction<QrFormState>>;
};

export function BackgroundPanel({ state, setState }: Props) {
  const b = state.background;
  const t = useTranslations("BackgroundPanel");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <Label htmlFor="bg-transparent">{t("transparent")}</Label>
          <p className="text-muted-foreground text-xs">{t("transparentHint")}</p>
        </div>
        <Switch
          id="bg-transparent"
          checked={b.transparent}
          onCheckedChange={(c) =>
            setState((p) => ({
              ...p,
              background: { ...p.background, transparent: c },
            }))
          }
        />
      </div>
      {!b.transparent ? (
        <SolidColorInput
          idPrefix="bg"
          label={t("solidColor")}
          value={b.solid}
          onChange={(solid) =>
            setState((p) => ({
              ...p,
              background: { ...p.background, solid },
            }))
          }
        />
      ) : null}
    </div>
  );
}
