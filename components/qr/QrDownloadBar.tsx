"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DownloadExtension } from "@/lib/qr-constants";
import { DOWNLOAD_EXTENSIONS, DOWNLOAD_FILE_BASENAME } from "@/lib/qr-constants";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  disabled: boolean;
  onDownload: (extension: DownloadExtension) => void;
};

export function QrDownloadBar({ disabled, onDownload }: Props) {
  const t = useTranslations("QrDownloadBar");
  const [ext, setExt] = useState<DownloadExtension>("png");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="grid w-full flex-1 gap-2 sm:max-w-xs">
        <Label>{t("format")}</Label>
        <Select
          value={ext}
          onValueChange={(v) => setExt(v as DownloadExtension)}
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DOWNLOAD_EXTENSIONS.map((e) => (
              <SelectItem key={e} value={e}>
                {`${DOWNLOAD_FILE_BASENAME}.${e}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        className="w-full shrink-0 sm:mb-0.5 sm:w-auto"
        disabled={disabled}
        onClick={() => onDownload(ext)}
      >
        <Download className="size-4" />
        {t("download")}
      </Button>
    </div>
  );
}
