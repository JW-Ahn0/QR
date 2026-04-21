import { InfoLayout } from "@/components/info/InfoLayout";
import { getSiteOrigin } from "@/lib/site-url";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("description"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const origin = getSiteOrigin();
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || t("email");

  return (
    <InfoLayout title={t("title")} description={t("description")}>
      <h2>{t("sections.email.title")}</h2>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>

      <h2>{t("sections.scope.title")}</h2>
      <ul>
        <li>{t("sections.scope.items.0")}</li>
        <li>{t("sections.scope.items.1")}</li>
        <li>{t("sections.scope.items.2")}</li>
      </ul>

      <h2>{t("sections.links.title")}</h2>
      <ul>
        <li>
          <a href={`${origin}/${locale}/privacy`}>{t("sections.links.items.0")}</a>
        </li>
        <li>
          <a href={`${origin}/${locale}/terms`}>{t("sections.links.items.1")}</a>
        </li>
        <li>
          <a href={`${origin}/${locale}/faq`}>{t("sections.links.items.2")}</a>
        </li>
      </ul>
    </InfoLayout>
  );
}

