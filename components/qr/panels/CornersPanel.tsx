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
import { Separator } from "@/components/ui/separator";
import type { QrFormState } from "@/lib/qr-code-styling-options";
import { CORNER_DOT_TYPES, CORNER_SQUARE_TYPES } from "@/lib/qr-constants";
import { useTranslations } from "next-intl";

type Props = {
  state: QrFormState;
  setState: React.Dispatch<React.SetStateAction<QrFormState>>;
};

export function CornersPanel({ state, setState }: Props) {
  const sq = state.cornersSquare;
  const dot = state.cornersDot;
  const t = useTranslations("CornersPanel");

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="grid gap-2">
          <Label>{t("outerStyle")}</Label>
          <Select
            value={sq.type}
            onValueChange={(v) =>
              setState((p) => ({
                ...p,
                cornersSquare: {
                  ...p.cornersSquare,
                  type: v as (typeof CORNER_SQUARE_TYPES)[number],
                },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CORNER_SQUARE_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <SolidColorInput
          idPrefix="csq"
          label={t("outerColor")}
          value={sq.solid}
          onChange={(solid) =>
            setState((p) => ({
              ...p,
              cornersSquare: { ...p.cornersSquare, solid },
            }))
          }
        />
      </section>
      <Separator />
      <section className="space-y-4">
        <div className="grid gap-2">
          <Label>{t("innerStyle")}</Label>
          <Select
            value={dot.type}
            onValueChange={(v) =>
              setState((p) => ({
                ...p,
                cornersDot: {
                  ...p.cornersDot,
                  type: v as (typeof CORNER_DOT_TYPES)[number],
                },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CORNER_DOT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <SolidColorInput
          idPrefix="cdot"
          label={t("innerColor")}
          value={dot.solid}
          onChange={(solid) =>
            setState((p) => ({
              ...p,
              cornersDot: { ...p.cornersDot, solid },
            }))
          }
        />
      </section>
    </div>
  );
}
