import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-ocean text-white">
      {/* Ảnh nền */}
      <Image
        src="/banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ocean/90 via-ocean/60 to-ocean/30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            Trọn vẹn từng chuyến đi
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/90">
            Vé tham quan, cáp treo, công viên giải trí và tour trọn gói ở hơn 60
            tỉnh thành. Nhận vé điện tử ngay sau khi thanh toán.
          </p>
          <form
            className="mt-8 flex max-w-md flex-col gap-2 rounded-2xl bg-white p-2 text-ink sm:flex-row"
            action="#diem-ban-ve"
          >
            <label className="sr-only" htmlFor="q">
              Tìm địa điểm
            </label>
            <input
              id="q"
              placeholder="Bạn muốn đi đâu?"
              className="flex-1 rounded-xl px-4 py-3 outline-none"
            />
            <button className="rounded-xl bg-sun px-6 py-3 font-bold text-ink hover:brightness-95">
              Tìm vé
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
