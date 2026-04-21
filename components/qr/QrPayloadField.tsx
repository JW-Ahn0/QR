"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MAX_PAYLOAD_LENGTH } from "@/lib/qr-constants";
import { useTranslations } from "next-intl";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function QrPayloadField({ value, onChange }: Props) {
  const t = useTranslations("QrPayloadField");
  const len = value.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="qr-payload">{t("label")}</Label>
        <span className="text-muted-foreground text-xs tabular-nums">
          {len} / {MAX_PAYLOAD_LENGTH}
        </span>
      </div>
      <Textarea
        id="qr-payload"
        rows={3}
        value={value}
        onChange={(e) => {
          let v = e.target.value;
          if (v.length > MAX_PAYLOAD_LENGTH) v = v.slice(0, MAX_PAYLOAD_LENGTH);
          onChange(v);
        }}
        className="font-mono text-sm"
      />
    </div>
  );
}
