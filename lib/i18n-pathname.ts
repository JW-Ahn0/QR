import { routing } from "@/i18n/routing";

/**
 * 브라우저 경로에서 로케일 접두사를 제거한 경로(`/`, `/foo`).
 * `useLocale()`과 URL이 한 프레임 어긋날 때 `next-intl` Link가 `/ko/ko`처럼
 * 접두사를 두 번 붙이는 것을 막기 위해 사용한다.
 */
export function toUnprefixedPathname(pathname: string): string {
  let p = pathname;
  while (true) {
    let stripped = false;
    for (const loc of routing.locales) {
      const prefix = `/${loc}`;
      if (p === prefix) {
        p = "/";
        stripped = true;
        break;
      }
      if (p.startsWith(`${prefix}/`)) {
        p = p.slice(prefix.length) || "/";
        stripped = true;
        break;
      }
    }
    if (!stripped) break;
  }
  return p;
}
