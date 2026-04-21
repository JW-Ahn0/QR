import { InfoLayout } from "@/components/info/InfoLayout";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const t = await getTranslations({ locale, namespace: "Terms" });
  return {
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("description"),
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });

  return (
    <InfoLayout
      title={t("title")}
      description={t("description")}
      updatedAt={t("updatedAt")}
    >
      <h2>{t("sections.acceptance.title")}</h2>
      <p>{t("sections.acceptance.body")}</p>

      <h2>{t("sections.service.title")}</h2>
      <ul>
        <li>{t("sections.service.items.0")}</li>
        <li>{t("sections.service.items.1")}</li>
        <li>{t("sections.service.items.2")}</li>
      </ul>

      <h2>{t("sections.user.title")}</h2>
      <ul>
        <li>{t("sections.user.items.0")}</li>
        <li>{t("sections.user.items.1")}</li>
      </ul>

      <h2>{t("sections.ip.title")}</h2>
      <p>{t("sections.ip.body")}</p>

      <h2>{t("sections.disclaimer.title")}</h2>
      <p>{t("sections.disclaimer.body")}</p>

      <h2>{t("sections.changes.title")}</h2>
      <p>{t("sections.changes.body")}</p>
    </InfoLayout>
  );
}

