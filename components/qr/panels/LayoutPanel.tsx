"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QrFormState } from "@/lib/qr-code-styling-options";
import { DRAW_TYPES } from "@/lib/qr-constants";
import { useTranslations } from "next-intl";
import { useState } from "react";

const WIDTH_MIN = 120;
const WIDTH_MAX = 640;
const MARGIN_MIN = 0;
const MARGIN_MAX = 48;

/** 입력 중 허용 (가로·세로는 1 이상만 있으면 미리보기 갱신, blur 시 하한 적용) */
const WIDTH_HEIGHT_LIVE_MIN = 1;

function clampInt(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function parseOr(raw: string, fallback: number) {
  const n = Number.parseInt(raw.trim(), 10);
  return Number.isNaN(n) ? fallback : n;
}

type LayoutNumberFieldProps = {
  id: string;
  label: string;
  field: "width" | "height" | "margin";
  value: number;
  /** 입력 즉시 적용할 범위 */
  liveMin: number;
  liveMax: number;
  /** blur 시 최종 클램프 범위 */
  strictMin: number;
  strictMax: number;
  helper: string;
  setState: React.Dispatch<React.SetStateAction<QrFormState>>;
};

function LayoutNumberField({
  id,
  label,
  field,
  value,
  liveMin,
  liveMax,
  strictMin,
  strictMax,
  helper,
  setState,
}: LayoutNumberFieldProps) {
  const [text, setText] = useState(() => String(value));

  const patchLayout = (n: number) => {
    setState((p) => ({
      ...p,
      layout: { ...p.layout, [field]: n },
    }));
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        className="font-mono tabular-nums"
        value={text}
        onChange={(e) => {
          const t = e.target.value;
          setText(t);
          const n = Number.parseInt(t.trim(), 10);
          if (Number.isNaN(n)) return;
          const relaxed = clampInt(n, liveMin, liveMax);
          patchLayout(relaxed);
        }}
        onBlur={() => {
          const v = clampInt(
            parseOr(text, value),
            strictMin,
            strictMax,
          );
          patchLayout(v);
          setText(String(v));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      <p className="text-muted-foreground text-xs">{helper}</p>
    </div>
  );
}

type Props = {
  state: QrFormState;
  setState: React.Dispatch<React.SetStateAction<QrFormState>>;
};

export function LayoutPanel({ state, setState }: Props) {
  const { layout } = state;
  const t = useTranslations("LayoutPanel");

  return (
    <div className="space-y-6">
      <LayoutNumberField
        id="layout-width"
        label={t("width")}
        field="width"
        value={layout.width}
        liveMin={WIDTH_HEIGHT_LIVE_MIN}
        liveMax={WIDTH_MAX}
        strictMin={WIDTH_MIN}
        strictMax={WIDTH_MAX}
        helper={t("widthHeightHelper", { min: WIDTH_MIN, max: WIDTH_MAX })}
        setState={setState}
      />
      <LayoutNumberField
        id="layout-height"
        label={t("height")}
        field="height"
        value={layout.height}
        liveMin={WIDTH_HEIGHT_LIVE_MIN}
        liveMax={WIDTH_MAX}
        strictMin={WIDTH_MIN}
        strictMax={WIDTH_MAX}
        helper={t("widthHeightHelper", { min: WIDTH_MIN, max: WIDTH_MAX })}
        setState={setState}
      />
      <LayoutNumberField
        id="layout-margin"
        label={t("margin")}
        field="margin"
        value={layout.margin}
        liveMin={MARGIN_MIN}
        liveMax={MARGIN_MAX}
        strictMin={MARGIN_MIN}
        strictMax={MARGIN_MAX}
        helper={t("marginHelper", { min: MARGIN_MIN, max: MARGIN_MAX })}
        setState={setState}
      />
      <div className="grid max-w-xs gap-2">
        <Label>{t("renderType")}</Label>
        <Select
          value={layout.type}
          onValueChange={(v) =>
            setState((p) => ({
              ...p,
              layout: { ...p.layout, type: v as (typeof DRAW_TYPES)[number] },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DRAW_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
