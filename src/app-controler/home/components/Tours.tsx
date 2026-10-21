import { tours } from "@/lib/data";
import { formatVND } from "@/lib/money";
import Image from "next/image";

export default function Tours() {
  return (
    <section id="tour" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20">
      <h2 className="font-display text-3xl font-extrabold text-ocean sm:text-4xl">
        Tour du lịch nổi bật
      </h2>
      <p className="mt-2 text-ink/70">Trọn gói vé, xe đưa đón và khách sạn.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tours.map((t) => (
          <article
            key={t.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white"
          >
            <div className={`relative h-44 w-full bg-gradient-to-br ${t.tone}`}>
              <Image
                src={t.img}
                alt={t.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-ink/70">
                Khởi hành từ {t.from} · {t.days}
              </p>
              <div className="mt-auto pt-4">
                <p className="text-sm text-ink/50 line-through">{formatVND(t.old)}</p>
                <p className="font-display text-xl font-extrabold text-ocean">
                  {formatVND(t.price)}
                </p>
                <button className="mt-4 w-full rounded-xl bg-ocean py-2.5 text-sm font-medium text-white hover:bg-ink">
                  Đặt tour
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
