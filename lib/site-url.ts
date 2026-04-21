/** 서비스 공식 도메인(OG·canonical 기본값). `NEXT_PUBLIC_SITE_URL`로 덮어쓸 수 있다. */
const DEFAULT_PRODUCTION_ORIGIN = "https://qr-make-free.site";

/**
 * OG·canonical용 절대 URL(base, 슬래시 없음).
 * 우선순위: `NEXT_PUBLIC_SITE_URL` → Vercel 프로덕션은 공식 도메인 → 그 외 `VERCEL_URL` →
 * 비-Vercel 프로덕션 빌드는 공식 도메인 → 로컬.
 *
 * 다른 도메인으로 배포할 때는 반드시 `NEXT_PUBLIC_SITE_URL`을 설정한다.
 */
export function getSiteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_ENV === "production") return DEFAULT_PRODUCTION_ORIGIN;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  if (process.env.NODE_ENV === "production") return DEFAULT_PRODUCTION_ORIGIN;
  return "http://localhost:3000";
}
