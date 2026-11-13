import { SitesDefault } from "@/lib/data";
import { getTranslation } from "@/lib/i18n";
import { SiteType } from "@/types/ticket";
import { get } from "lodash";
import Link from "next/link";
import LazyImage from "@/components/ui/lazy-image";
import { formatVND } from "@/lib/money";

export const getBgImg = (siteCode: string) => {
  switch (siteCode) {
    case "BNC": {
      return "/products/bana.webp";
    }
    case "SBD": {
      return "/products/baden1.jpg";
    }
    case "FSS": {
      return "/products/fansipan2.jpg";
    }
    case "SWV": {
      return "/products/vungtau1.jpg";
    }
    case "HTI": {
      return "/products/honthom1.jpg";
    }
    case "HLS": {
      return "/products/halong1.jpg";
    }
    default: {
      return "/products/bana.webp";
    }
  }
};

export default async function Locations({ lng, sites }: { lng: string; sites: SiteType[] }) {
  const { t } = await getTranslation(lng);
  const listSite = sites || [];

  return (
    <section id="diem-ban-ve" className="scroll-mt-16 bg-ink/[0.04] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl font-extrabold text-ocean sm:text-4xl">
          {t("homepage.tickets.title")}
        </h2>
        <p className="mt-2 text-ink/70"> {t("homepage.tickets.description")}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listSite.map((p, index) => (
            <article
              key={p.code}
              className="ticket group relative rounded-2xl bg-white shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ocean/10"
              style={{ ["--notch" as string]: "72%" }}
            >
              <div className="relative h-44 overflow-hidden rounded-t-2xl">
                <LazyImage
                  src={getBgImg(p.code)}
                  alt={t(`homepage.tickets.items.${index}.location`)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  wrapperClassName="h-[100%]"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ocean px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg shadow-black/30 ring-2 ring-white transition-all duration-300 group-hover:bg-sun group-hover:text-ink">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                  </svg>
                  {get(p, ["location", lng]) || get(p, ["location", "name"])}
                </span>
              </div>

              <div className="px-5 pb-3 pt-4">
                <h3 className="font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-ocean">
                  {get(p, lng, p.name)}
                </h3>
                <Link href="/" className="mt-1 text-sm text-ink/70">
                  {t("homepage.tickets.view_more")}
                </Link>
              </div>

              <div className="ticket-tear" />

              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="text-xs text-ink/50"> {t("homepage.tickets.price_from")}</p>
                  <p className="font-display text-lg font-extrabold text-ocean">
                    {formatVND(p.pre_price)}
                  </p>
                </div>
                <Link
                  href={`/buy-ticket?site=${p.code}`}
                  className="rounded-full bg-sun px-5 py-2 text-sm font-bold text-ink shadow-sm transition-all duration-300 hover:brightness-95 group-hover:bg-ocean group-hover:text-white group-hover:shadow-md"
                >
                  {t("homepage.tickets.buy")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
