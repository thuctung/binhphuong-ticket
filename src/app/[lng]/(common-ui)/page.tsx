import HomeA from "@/app-controler/home";
import { getTranslation } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { Metadata } from "next";

export const dynamic = "force-static";

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

  return <HomeA lng={lng} />;
}
