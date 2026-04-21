import { InfoLayout } from "@/components/info/InfoLayout";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <InfoLayout title={t("title")} description={t("description")}>
      <h2>{t("sections.what.title")}</h2>
      <p>{t("sections.what.body")}</p>

      <h2>{t("sections.features.title")}</h2>
      <ul>
        <li>{t("sections.features.items.0")}</li>
        <li>{t("sections.features.items.1")}</li>
        <li>{t("sections.features.items.2")}</li>
      </ul>

      <h2>{t("sections.data.title")}</h2>
      <p>{t("sections.data.body")}</p>

      <h2>{t("sections.notice.title")}</h2>
      <p>{t("sections.notice.body")}</p>
    </InfoLayout>
  );
}

