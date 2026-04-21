import { DocumentLang } from "@/components/DocumentLang";
import { DocumentTitle } from "@/components/DocumentTitle";
import { routing } from "@/i18n/routing";
import { getSiteOrigin } from "@/lib/site-url";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const OG_LOCALE: Record<string, string> = { ko: "ko_KR", en: "en_US" };

/** `public/OG2.png` — SNS·검색 미리보기용 (1200×630 권장). */
const OG_IMAGE_PATH = "/OG2.png";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const origin = getSiteOrigin();
  const metadataBase = new URL(`${origin}/`);

  const keywords = t("keywords")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${origin}/${loc}`;
  }
  languages["x-default"] = `${origin}/${routing.defaultLocale}`;

  const ogLocale = OG_LOCALE[locale] ?? locale;
  const alternateLocale = routing.locales
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l] ?? l);

  const pageUrl = `${origin}/${locale}`;
  /** 카카오·페이스북 등 스크래퍼는 `og:image`에 상대경로보다 절대 URL(HTTPS)을 권장. */
  const ogImageAbsolute = new URL(OG_IMAGE_PATH, metadataBase).href;
  const ogImageSecure =
    ogImageAbsolute.startsWith("https://") ? ogImageAbsolute : undefined;

  return {
    metadataBase,
    title: t("title"),
    description: t("description"),
    keywords,
    alternates: {
      canonical: pageUrl,
      languages,
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: alternateLocale.length ? alternateLocale : undefined,
      url: pageUrl,
      siteName: t("siteName"),
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: ogImageAbsolute,
          secureUrl: ogImageSecure,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: t("ogImageAlt"),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImageAbsolute],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const origin = getSiteOrigin();
  const pageUrl = `${origin}/${locale}`;
  const ogImageAbsolute = new URL(OG_IMAGE_PATH, new URL(`${origin}/`)).href;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: tMeta("siteName"),
    description: tMeta("description"),
    url: pageUrl,
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
    image: ogImageAbsolute,
  });

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <DocumentLang locale={locale} />
      <DocumentTitle />
      {children}
    </NextIntlClientProvider>
  );
}
