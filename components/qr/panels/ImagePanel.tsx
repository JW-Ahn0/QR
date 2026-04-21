"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { QrFormState } from "@/lib/qr-code-styling-options";
import { sliderFirst } from "@/lib/slider-value";
import { useTranslations } from "next-intl";
import { useRef } from "react";

type Props = {
  state: QrFormState;
  setState: React.Dispatch<React.SetStateAction<QrFormState>>;
};

export function ImagePanel({ state, setState }: Props) {
  const img = state.image;
  const fileRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("ImagePanel");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => fileRef.current?.click()}
        >
          {t("upload")}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = () => {
              const r = String(reader.result ?? "");
              setState((p) => ({ ...p, image: { ...p.image, src: r } }));
            };
            reader.readAsDataURL(f);
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setState((p) => ({ ...p, image: { ...p.image, src: "" } }))
          }
        >
          {t("remove")}
        </Button>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="img-hide">{t("bringFront")}</Label>
        <Switch
          id="img-hide"
          checked={img.hideBackgroundDots}
          onCheckedChange={(c) =>
            setState((p) => ({
              ...p,
              image: { ...p.image, hideBackgroundDots: c },
            }))
          }
        />
      </div>
      <div className="grid gap-2">
        <Label>{t("size")}</Label>
        <Slider
          min={0.1}
          max={0.55}
          step={0.01}
          value={[img.imageSize]}
          onValueChange={(v) =>
            setState((p) => ({
              ...p,
              image: {
                ...p.image,
                imageSize: sliderFirst(v, p.image.imageSize),
              },
            }))
          }
        />
        <span className="text-muted-foreground text-xs tabular-nums">
          {img.imageSize.toFixed(2)}
        </span>
      </div>
      <div className="grid gap-2">
        <Label>{t("margin")}</Label>
        <Slider
          min={0}
          max={32}
          value={[img.margin]}
          onValueChange={(v) =>
            setState((p) => ({
              ...p,
              image: {
                ...p.image,
                margin: sliderFirst(v, p.image.margin),
              },
            }))
          }
        />
        <span className="text-muted-foreground text-xs tabular-nums">
          {Math.round(img.margin)}
        </span>
      </div>
    </div>
  );
}
