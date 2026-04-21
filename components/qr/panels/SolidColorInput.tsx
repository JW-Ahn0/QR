"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  idPrefix: string;
  label: string;
  value: string;
  onChange: (solid: string) => void;
};

function hex6ForPicker(v: string) {
  return /^#[\dA-Fa-f]{6}$/.test(v) ? v : "#000000";
}

export function SolidColorInput({ idPrefix, label, value, onChange }: Props) {
  const safePicker = hex6ForPicker(value);

  return (
    <div className="grid gap-2">
      <Label htmlFor={`${idPrefix}-solid`}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={`${idPrefix}-solid`}
          type="color"
          className="h-10 w-14 shrink-0 p-1"
          value={safePicker}
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          className="font-mono text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
