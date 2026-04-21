import { InfoLayout } from "@/components/info/InfoLayout";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const t = await getTranslations({ locale, namespace: "Guide" });
  return {
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("description"),
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guide" });

  return (
    <InfoLayout title={t("title")} description={t("description")}>
      <h2>{t("sections.how.title")}</h2>
      <ol>
        <li>{t("sections.how.steps.0")}</li>
        <li>{t("sections.how.steps.1")}</li>
        <li>{t("sections.how.steps.2")}</li>
        <li>{t("sections.how.steps.3")}</li>
      </ol>

      <h2>{t("sections.format.title")}</h2>
      <ul>
        <li>{t("sections.format.items.0")}</li>
        <li>{t("sections.format.items.1")}</li>
        <li>{t("sections.format.items.2")}</li>
        <li>{t("sections.format.items.3")}</li>
      </ul>

      <h2>{t("sections.tips.title")}</h2>
      <ul>
        <li>{t("sections.tips.items.0")}</li>
        <li>{t("sections.tips.items.1")}</li>
        <li>{t("sections.tips.items.2")}</li>
      </ul>

      <h2>{t("sections.safe.title")}</h2>
      <p>{t("sections.safe.body")}</p>

      <h2>{t("sections.next.title")}</h2>
      <p>{t("sections.next.body")}</p>
    </InfoLayout>
  );
}

