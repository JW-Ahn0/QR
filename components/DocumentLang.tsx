"use client";

import { useEffect } from "react";

/** 루트 `<html lang>`은 세그먼트 밖이라, 클라이언트 전환 시 여기서 동기화한다. */
export function DocumentLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
