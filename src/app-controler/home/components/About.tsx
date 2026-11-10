"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const aboutStats = [
  { value: 8, suffix: "+", label: "Năm kinh nghiệm" },
  { value: 500000, suffix: "+", label: "Lượt khách phục vụ" },
  { value: 30, suffix: "+", label: "Đối tác điểm đến" },
  { value: 98, suffix: "%", label: "Khách hài lòng" },
];

export const aboutBadges = [
  "Đối tác chính thức của các khu du lịch",
  "Giấy phép kinh doanh lữ hành quốc tế",
  "Top đơn vị bán vé uy tín 2025",
  "Hỗ trợ khách hàng 24/7",
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(to);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(to * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {n.toLocaleString("vi-VN")}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="gioi-thieu" className="scroll-mt-16 bg-ocean py-20 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        {/* Trái: giới thiệu */}
        <div>
          <p className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-sun ring-1 ring-white/20">
            Về chúng tôi
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold sm:text-4xl">
            <span className="text-sun">Moon Price</span> - Đồng hành cùng mọi chuyến đi
          </h2>
          <p className="mt-4 max-w-lg text-white/80">
            Chúng tôi cung cấp vé tham quan, vui chơi và dịch vụ tour với mức giá minh bạch, thủ tục
            nhanh gọn và mã QR vào cổng ngay sau khi đặt. Hơn nhiều năm hoạt động, Moon Price đã trở
            thành địa chỉ quen thuộc của hàng trăm nghìn du khách và đối tác trên khắp cả nước.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {aboutBadges.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-white/90">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-5 w-5 shrink-0 text-sun"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" className="opacity-40" />
                  <path d="m8 12.5 2.8 2.8L16 9.5" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          <Link
            href="/gioi-thieu"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-bold text-ink shadow-lg shadow-black/20 transition hover:brightness-95"
          >
            Xem thêm về chúng tôi
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Phải: thành tựu */}
        <div className="grid grid-cols-2 gap-4">
          {aboutStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <p className="font-display text-3xl font-extrabold text-sun sm:text-4xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
