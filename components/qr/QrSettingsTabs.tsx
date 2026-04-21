"use client";

import { BackgroundPanel } from "@/components/qr/panels/BackgroundPanel";
import { CornersPanel } from "@/components/qr/panels/CornersPanel";
import { DotsPanel } from "@/components/qr/panels/DotsPanel";
import { ImagePanel } from "@/components/qr/panels/ImagePanel";
import { LayoutPanel } from "@/components/qr/panels/LayoutPanel";
import { Button } from "@/components/ui/button";
import type { QrFormState } from "@/lib/qr-code-styling-options";
import type { DownloadExtension } from "@/lib/qr-constants";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type Props = {
  state: QrFormState;
  setState: React.Dispatch<React.SetStateAction<QrFormState>>;
  downloadExtension: DownloadExtension;
};

type SectionId = "layout" | "dots" | "corners" | "bg" | "image";

export function QrSettingsTabs({ state, setState, downloadExtension }: Props) {
  const [section, setSection] = useState<SectionId>("layout");
  const t = useTranslations("Nav");

  const sections = useMemo(
    (): { id: SectionId; label: string }[] => [
      { id: "layout", label: t("layout") },
      { id: "dots", label: t("dots") },
      { id: "corners", label: t("corners") },
      { id: "bg", label: t("bg") },
      { id: "image", label: t("image") },
    ],
    [t],
  );

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <div
        className="flex flex-col gap-1.5"
        role="tablist"
        aria-label={t("styleRegion")}
      >
        {sections.map(({ id, label }) => (
          <Button
            key={id}
            type="button"
            role="tab"
            aria-selected={section === id}
            variant={section === id ? "default" : "outline"}
            size="sm"
            className="h-auto min-h-9 w-full shrink-0 justify-start whitespace-normal px-3 py-2 text-left text-xs leading-snug sm:text-sm"
            onClick={() => setSection(id)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div
        className="min-h-0 min-w-0 border-t border-border pt-3"
        role="tabpanel"
        aria-live="polite"
      >
        {section === "layout" ? (
          <LayoutPanel state={state} setState={setState} />
        ) : null}
        {section === "dots" ? (
          <DotsPanel state={state} setState={setState} />
        ) : null}
        {section === "corners" ? (
          <CornersPanel state={state} setState={setState} />
        ) : null}
        {section === "bg" ? (
          <BackgroundPanel
            state={state}
            setState={setState}
            downloadExtension={downloadExtension}
          />
        ) : null}
        {section === "image" ? (
          <ImagePanel state={state} setState={setState} />
        ) : null}
      </div>
    </div>
  );
}
