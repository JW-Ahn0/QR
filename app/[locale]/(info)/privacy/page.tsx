import { InfoLayout } from "@/components/info/InfoLayout";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("description"),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <InfoLayout
      title={t("title")}
      description={t("description")}
      updatedAt={t("updatedAt")}
    >
      <h2>{t("sections.collect.title")}</h2>
      <ul>
        <li>{t("sections.collect.items.0")}</li>
        <li>{t("sections.collect.items.1")}</li>
        <li>{t("sections.collect.items.2")}</li>
      </ul>

      <h2>{t("sections.purpose.title")}</h2>
      <ul>
        <li>{t("sections.purpose.items.0")}</li>
        <li>{t("sections.purpose.items.1")}</li>
      </ul>

      <h2>{t("sections.storage.title")}</h2>
      <p>{t("sections.storage.body")}</p>

      <h2>{t("sections.thirdParty.title")}</h2>
      <p>{t("sections.thirdParty.body")}</p>

      <h2>{t("sections.cookies.title")}</h2>
      <p>{t("sections.cookies.body")}</p>

      <h2>{t("sections.rights.title")}</h2>
      <p>{t("sections.rights.body")}</p>

      <h2>{t("sections.contact.title")}</h2>
      <p>{t("sections.contact.body")}</p>
    </InfoLayout>
  );
}

