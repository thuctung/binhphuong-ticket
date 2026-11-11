import Link from "next/link";
import BannerSlider from "./BannerSlide";
import { getTranslation } from "@/lib/i18n";

const SLIDES = [
  { src: "/banner.png", altKey: "cableCar" },
  { src: "/banner-2.jpg", altKey: "themePark" },
  { src: "/banner-3.jpg", altKey: "beachResort" },
  { src: "/banner-4.webp", altKey: "packageTour" },
] as const;

export default async function Banner({ lng }: { lng: string }) {
  const { t } = await getTranslation(lng);

  const slides = SLIDES.map((s) => ({
    src: s.src,
    alt: t(`slides.${s.altKey}`),
  }));

  return (
    <BannerSlider slides={slides}>
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            {t("homepage.hero.title")}
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/90">{t("homepage.hero.description")}</p>

          <div className="mt-8 flex max-w-md flex-col gap-2 rounded-2xl bg-white p-2 text-ink sm:flex-row">
            <label className="sr-only" htmlFor="q">
              {t("homepage.hero.search_location")}
            </label>
            <input
              id="q"
              placeholder={t("homepage.hero.search_placeholder")}
              className="flex-1 rounded-xl px-4 py-3 outline-none"
            />
            <Link
              href={`/${lng}/buy-ticket`}
              className="rounded-xl bg-sun px-6 py-3 font-bold text-ink hover:brightness-95"
            >
              {t("homepage.hero.search_button")}
            </Link>
          </div>
        </div>
      </div>
    </BannerSlider>
  );
}
