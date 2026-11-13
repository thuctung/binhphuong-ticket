import HomeA from "@/app-controler/home";
import FloatingContact from "@/components/site/FloatingContact";
import { getSitesHomePage } from "@/lib/api-server/get-site";
import { getTranslation } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getTranslation(lng);

  return {
    title: t("homepage.meta.title"),
    description: t("homepage.meta.description"),
    alternates: buildAlternates(lng),
  };
}

export default async function HomePage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const { data } = await getSitesHomePage();
  return (
    <>
      <HomeA lng={lng} sites={data} />
      <FloatingContact />
    </>
  );
}
