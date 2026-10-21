"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Thêm ảnh thật: đặt file vào /public/banners/ rồi điền image: "/banners/ba-na.jpg"
// (ảnh ngang, tối thiểu 1600x700). Không có image thì hiển thị nền gradient + tranh minh họa.
const slides = [
  {
    title: "Bà Nà Hills",
    from: "#d62f3f",
    to: "#5c0f1b",
    image: "/banner/bana-captreo.png",
  },
  {
    title: "Vịnh Hạ Long, du thuyền 1 ngày từ 290.000đ",
    from: "#2f8a63",
    to: "#0b2a1f",
    image: "/banner/halong.png",
  },
  {
    title: "Combo Phú Quốc: VinWonders + Safari",
    from: "#e5575f",
    to: "#1d5c42",
    image: "/banner/banden.jpg",
  },
];

const categories = [
  ["🎢", "Khu vui chơi", "bg-brand/10"],
  ["🚡", "Cáp treo", "bg-mint"],
  ["⛵", "Tour vịnh, biển", "bg-brand/10"],
  ["🏛️", "Bảo tàng, di tích", "bg-mint"],
  ["🎭", "Show diễn", "bg-brand/10"],
  ["🎟️", "Combo tiết kiệm", "bg-mint"],
];

export default function Banner1() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section aria-roledescription="carousel" aria-label="Ưu đãi nổi bật">
      <div
        className="relative h-[420px] overflow-hidden md:h-[520px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((s, idx) => (
          <div
            key={s.title}
            aria-hidden={idx !== i}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
            style={{ background: `linear-gradient(120deg, ${s.from}, ${s.to})` }}
          >
            <Image
              src={s.image}
              alt=""
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
          </div>
        ))}

        <div className="absolute bottom-16 right-5 z-10 flex items-center gap-2 md:right-10">
          <button
            aria-label="Banner trước"
            onClick={() => setI((i - 1 + n) % n)}
            className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/35"
          >
            ‹
          </button>
          {slides.map((s, idx) => (
            <button
              key={s.title}
              aria-label={`Banner ${idx + 1}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
              className={`h-2.5 rounded-full bg-white transition-all ${idx === i ? "w-8" : "w-2.5 opacity-50"}`}
            />
          ))}
          <button
            aria-label="Banner sau"
            onClick={() => setI((i + 1) % n)}
            className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/35"
          >
            ›
          </button>
        </div>
      </div>

      {/* Dải danh mục nhanh nổi lên đè mép dưới banner */}
      <nav aria-label="Loại vé" className="relative z-10 mx-auto -mt-12 max-w-5xl px-5">
        <ul className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-3 shadow-xl md:grid-cols-6">
          {categories.map(([icon, label, tone]) => (
            <li key={label}>
              <a
                href="#dia-diem"
                className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center text-sm font-medium hover:bg-mint/50"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${tone}`}
                  aria-hidden
                >
                  {icon}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
