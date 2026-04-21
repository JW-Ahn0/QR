"use client";

import { SolidColorInput } from "@/components/qr/panels/SolidColorInput";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QrFormState } from "@/lib/qr-code-styling-options";
import { DOT_TYPES } from "@/lib/qr-constants";
import { useTranslations } from "next-intl";

type Props = {
  state: QrFormState;
  setState: React.Dispatch<React.SetStateAction<QrFormState>>;
};

export function DotsPanel({ state, setState }: Props) {
  const d = state.dots;
  const t = useTranslations("DotsPanel");

  return (
    <div className="space-y-6">
      <div className="grid gap-2">
        <Label>{t("dotType")}</Label>
        <Select
          value={d.type}
          onValueChange={(v) =>
            setState((p) => ({
              ...p,
              dots: { ...p.dots, type: v as (typeof DOT_TYPES)[number] },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DOT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <SolidColorInput
        idPrefix="dots"
        label={t("dotColor")}
        value={d.solid}
        onChange={(solid) =>
          setState((p) => ({ ...p, dots: { ...p.dots, solid } }))
        }
      />
    </div>
  );
}
