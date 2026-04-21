"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

/**
 * `generateMetadata`는 초기·전환 RSC에 맞춰 갱신되지만, 클라이언트 전환만으로
 * 탭 제목이 뒤처질 수 있어 `Meta` 번역과 동기화한다.
 */
export function DocumentTitle() {
  const t = useTranslations("Meta");
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");

  useEffect(() => {
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);
    const kw = document.querySelector('meta[name="keywords"]');
    if (kw) kw.setAttribute("content", keywords);
  }, [title, description, keywords]);

  return null;
}
