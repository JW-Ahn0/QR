"use client";

import { AdSlot } from "@/components/ads/AdSlot";
import { QrDownloadBar } from "@/components/qr/QrDownloadBar";
import { QrPayloadField } from "@/components/qr/QrPayloadField";
import { QrScanHint } from "@/components/qr/QrScanHint";
import { QrSettingsTabs } from "@/components/qr/QrSettingsTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { defaultQrFormState } from "@/lib/qr-defaults";
import { buildOptions } from "@/lib/qr-code-styling-options";
import type { DownloadExtension } from "@/lib/qr-constants";
import {
  DEFAULT_QR_PAYLOAD,
  DOWNLOAD_FILE_BASENAME,
  PAYLOAD_DEBOUNCE_MS,
} from "@/lib/qr-constants";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import QRCodeStyling from "qr-code-styling";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef, useState } from "react";

export function QrWorkspace() {
  const t = useTranslations("QrWorkspace");
  const [payload, setPayload] = useState(DEFAULT_QR_PAYLOAD);
  const debouncedPayload = useDebouncedValue(payload, PAYLOAD_DEBOUNCE_MS);
  const [form, setForm] = useState(defaultQrFormState);

  const mountRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useLayoutEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const trimmed = debouncedPayload.trim();
    if (!trimmed) {
      el.replaceChildren();
      qrRef.current = null;
      return;
    }

    const opts = buildOptions(form, trimmed);
    if (!qrRef.current) {
      const qr = new QRCodeStyling(opts);
      qr.append(el);
      qrRef.current = qr;
    } else {
      qrRef.current.update(opts);
    }
  }, [form, debouncedPayload]);

  const handleDownload = (extension: DownloadExtension) => {
    const trimmed = debouncedPayload.trim();
    if (!trimmed || !qrRef.current) return;
    qrRef.current.update(buildOptions(form, trimmed));
    void qrRef.current.download({
      extension,
      name: DOWNLOAD_FILE_BASENAME,
    });
  };

  const hasPayload = debouncedPayload.trim().length > 0;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10">
      <header className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="font-semibold text-2xl tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground text-sm">{t("description")}</p>
          </div>
          <LocaleSwitcher />
        </div>
      </header>

      <AdSlot device="mobile" />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("cardUrlTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QrPayloadField value={payload} onChange={setPayload} />
          {!hasPayload ? (
            <p className="text-muted-foreground text-sm">{t("emptyHint")}</p>
          ) : null}
          <div className="border-t border-border pt-4">
            <QrDownloadBar disabled={!hasPayload} onDownload={handleDownload} />
          </div>
        </CardContent>
      </Card>

      <AdSlot device="mobile" className="min-h-[90px]" />

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(260px,320px)] xl:grid-cols-[1fr_340px]">
        <Card className="h-fit min-w-0 lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle className="text-base">{t("previewTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QrScanHint state={form} />
            <div className="mx-auto w-full max-w-[640px]">
              <div className="flex aspect-square w-full min-h-0 items-center justify-center overflow-auto rounded-lg border border-dashed border-border bg-white p-4 lg:aspect-auto lg:min-h-[640px] lg:min-w-[640px] lg:overflow-visible">
                <div
                  ref={mountRef}
                  className="inline-flex max-w-full rounded-md bg-white/0 p-2 shadow-sm ring-1 ring-black/5"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex min-w-0 flex-col gap-6">
          <Card className="h-fit w-full min-w-0 lg:max-w-[320px] xl:max-w-[340px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t("styleTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="px-3 pt-0 sm:px-4">
              <QrSettingsTabs state={form} setState={setForm} />
            </CardContent>
          </Card>
          <AdSlot device="desktop" />
        </div>
      </div>

      <AdSlot device="mobile" className="min-h-[100px]" />
    </div>
  );
}
