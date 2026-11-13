import { tours } from "@/lib/data";
import { getTranslation } from "@/lib/i18n";
import { formatVND } from "@/lib/money";
import Image from "next/image";

export default async function ({ lng }: { lng: string }) {
  const { t } = await getTranslation(lng);

  return (
    <section id="tour" className="bg-ocean">
      <div className="mx-auto max-w-6xl scroll-mt-16  px-4 py-20">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-amber-300">
          {t("homepage.tours.title")}
        </h2>
        <p className="mt-2 text-[#fff] "> {t("homepage.tours.description")}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour, index) => (
            <article
              key={tour.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white hover:animate-wiggle motion-reduce:hover:animate-none"
            >
              <div className={`relative h-44 w-full bg-gradient-to-br ${tour.tone}`}>
                <Image
                  src={tour.img}
                  alt={tour.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-bold">
                  {t(`homepage.tours.items.${index}.name`)}
                </h3>
                <p className="mt-1 text-sm text-ink/70">
                  {t(`homepage.tours.items.${index}.departure`)}
                </p>
                <div className="mt-auto pt-4">
                  <p className="text-sm text-ink/50 line-through">
                    {t(`homepage.tours.items.${index}.original_price`)}
                  </p>
                  <p className="font-display text-xl font-extrabold text-ocean">
                    {t(`homepage.tours.items.${index}.price`)}
                  </p>
                  <button className="mt-4 w-full rounded-xl  bg-sun  py-2.5 text-sm font-medium text-ink hover:brightness-95 hover:bg-ocean hover:text-white ">
                    {t("homepage.tours.book")}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
