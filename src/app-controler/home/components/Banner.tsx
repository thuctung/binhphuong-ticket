"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  { src: "/banner.png", alt: "Cáp treo giữa núi rừng" },
  { src: "/banner-2.jpg", alt: "Công viên giải trí" },
  { src: "/banner-3.jpg", alt: "Bãi biển và resort" },
  { src: "/banner-4.webp", alt: "Tour tham quan trọn gói" },
];

const INTERVAL = 5000;

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = SLIDES.length;
  const goTo = useCallback((i: number) => setIndex((i + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, reduceMotion, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden bg-ocean text-white"
      aria-roledescription="carousel"
      aria-label="Banner nổi bật"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-transform ease-out ${
              i === index && !reduceMotion ? "scale-110 duration-[6000ms]" : "scale-100 duration-0"
            }`}
          />
        </div>
      ))}

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
            Vé tham quan, cáp treo, công viên giải trí và tour trọn gói ở hơn 60 tỉnh thành. Nhận vé
            điện tử ngay sau khi thanh toán.
          </p>
          <div className="mt-8 flex max-w-md flex-col gap-2 rounded-2xl bg-white p-2 text-ink sm:flex-row">
            <label className="sr-only" htmlFor="q">
              Tìm địa điểm
            </label>
            <input
              id="q"
              placeholder="Bạn muốn đi đâu?"
              className="flex-1 rounded-xl px-4 py-3 outline-none"
            />
            <Link
              href="/buy-ticket"
              className="rounded-xl bg-sun px-6 py-3 font-bold text-ink hover:brightness-95"
            >
              Tìm vé
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Slide trước"
        className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:block"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Slide sau"
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:block"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Đến slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
