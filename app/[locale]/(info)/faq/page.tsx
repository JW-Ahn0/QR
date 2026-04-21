import { InfoLayout } from "@/components/info/InfoLayout";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const t = await getTranslations({ locale, namespace: "Faq" });
  return {
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("description"),
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });

  return (
    <InfoLayout title={t("title")} description={t("description")}>
      <h2>{t("items.q1.title")}</h2>
      <p>{t("items.q1.body")}</p>

      <h2>{t("items.q2.title")}</h2>
      <p>{t("items.q2.body")}</p>

      <h2>{t("items.q3.title")}</h2>
      <p>{t("items.q3.body")}</p>

      <h2>{t("items.q4.title")}</h2>
      <p>{t("items.q4.body")}</p>

      <h2>{t("items.q5.title")}</h2>
      <p>{t("items.q5.body")}</p>
    </InfoLayout>
  );
}

