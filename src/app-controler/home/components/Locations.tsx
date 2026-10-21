import { places, vnd } from "@/lib/data";

export default function Locations() {
  return (
    <section id="diem-ban-ve" className="scroll-mt-16 bg-ink/[0.04] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl font-extrabold text-ocean sm:text-4xl">Các địa điểm bán vé</h2>
        <p className="mt-2 text-ink/70">Chọn điểm đến, nhận mã QR vào cổng.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((p) => (
            <article key={p.id} className="ticket rounded-2xl bg-white shadow-sm" style={{ ["--notch" as string]: "64%" }}>
              <div className="p-5 pb-8">
                <p className="text-sm font-medium text-lagoon">{p.city}</p>
                <h3 className="font-display mt-1 text-xl font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-ink/70">{p.tag}</p>
              </div>
              <div className="ticket-tear" />
              <div className="flex items-center justify-between p-5">
                <p className="font-display text-lg font-extrabold text-ocean">{vnd(p.price)}</p>
                <button className="rounded-full bg-sun px-5 py-2 text-sm font-bold hover:brightness-95">Mua vé</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
