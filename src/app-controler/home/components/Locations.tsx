import { places } from "@/lib/data";
import { getTranslation } from "@/lib/i18n";
import { formatVND } from "@/lib/money";

export default async function Locations({ lng }: { lng: string }) {
  const { t } = await getTranslation(lng);

  return (
    <section id="diem-ban-ve" className="scroll-mt-16 bg-ink/[0.04] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl font-extrabold text-ocean sm:text-4xl">
          {t("homepage.tickets.title")}
        </h2>
        <p className="mt-2 text-ink/70"> {t("homepage.tickets.description")}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((p, index) => (
            <article
              key={p.id}
              className="ticket group relative rounded-2xl bg-white shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ocean/10"
              style={{ ["--notch" as string]: "72%" }}
            >
              <div className="relative h-44 overflow-hidden rounded-t-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${p.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ocean px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg shadow-black/30 ring-2 ring-white transition-all duration-300 group-hover:bg-sun group-hover:text-ink">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                  </svg>
                  {t(`homepage.tickets.items.${index}.location`)}
                </span>

                <span className="absolute bottom-3 right-4 translate-y-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {t("homepage.tickets.view_more")} →
                </span>
              </div>

              <div className="px-5 pb-3 pt-4">
                <h3 className="font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-ocean">
                  {t(`homepage.tickets.items.${index}.name`)}
                </h3>
                <p className="mt-1 text-sm text-ink/70">
                  {t(`homepage.tickets.items.${index}.description`)}
                </p>
              </div>

              <div className="ticket-tear" />

              {/* Giá + nút */}
              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="text-xs text-ink/50"> {t("homepage.tickets.price_from")}</p>
                  <p className="font-display text-lg font-extrabold text-ocean">
                    {t(`homepage.tickets.items.${index}.price`)}
                  </p>
                </div>
                <button className="rounded-full bg-sun px-5 py-2 text-sm font-bold text-ink shadow-sm transition-all duration-300 hover:brightness-95 group-hover:bg-ocean group-hover:text-white group-hover:shadow-md">
                  {t("homepage.tickets.buy")}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
