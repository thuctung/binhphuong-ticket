"use client";

import { useState, FormEvent } from "react";
import { places } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

const field =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-lagoon focus:ring-2 focus:ring-lagoon/30";

export default function Consult() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError("");

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Có lỗi xảy ra");
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      setStatus("error");
    }
  }

  return (
    <section id="tu-van" className="scroll-mt-16 py-20 bg-[#cccccc3d]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="font-display text-3xl font-extrabold text-ocean sm:text-4xl">
            TƯ VẤN TOUR
          </h2>
          <p className="mt-3 text-ink/70">
            Để lại thông tin, đội ngũ tư vấn sẽ liên hệ lại trong thời gian sớm nhất để báo giá và
            thiết kế lịch trình phù hợp với bạn.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink/80">
            <li className="flex gap-3">
              <span className="text-sun">●</span> Tư vấn miễn phí, không ràng buộc
            </li>
            <li className="flex gap-3">
              <span className="text-sun">●</span> Lịch trình riêng cho gia đình, nhóm, công ty
            </li>
            <li className="flex gap-3">
              <span className="text-sun">●</span> Phản hồi trong vòng 24 giờ
            </li>
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8 lg:col-span-3"
        >
          {/* Honeypot chống spam bot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Họ và tên *
              <input
                name="name"
                required
                minLength={2}
                className={`${field} mt-1`}
                placeholder="Nguyễn Văn A"
              />
            </label>
            <label className="text-sm font-medium">
              Số điện thoại *
              <input
                name="phone"
                type="tel"
                required
                className={`${field} mt-1`}
                placeholder="09xx xxx xxx"
              />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Email
              <input
                name="email"
                type="email"
                className={`${field} mt-1`}
                placeholder="email@example.com"
              />
            </label>
            <label className="text-sm font-medium">
              Điểm đến quan tâm
              <select name="destination" className={`${field} mt-1`} defaultValue="">
                <option value="">Chưa chọn / cần tư vấn</option>
                {places.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.city})
                  </option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="text-sm font-medium">
                Số người
                <input
                  name="people"
                  type="number"
                  min={1}
                  max={500}
                  className={`${field} mt-1`}
                  placeholder="2"
                />
              </label>
              <label className="text-sm font-medium">
                Ngày đi
                <input name="date" type="date" className={`${field} mt-1`} />
              </label>
            </div>
            <label className="text-sm font-medium sm:col-span-2">
              Lời nhắn
              <textarea
                name="message"
                rows={4}
                maxLength={2000}
                className={`${field} mt-1 resize-none`}
                placeholder="Ngân sách, sở thích, số trẻ em, yêu cầu đặc biệt..."
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 w-full rounded-full bg-sun px-6 py-3 font-bold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
          </button>

          <div aria-live="polite" className="mt-4 text-sm">
            {status === "success" && (
              <p className="rounded-xl bg-green-50 px-4 py-3 text-green-700">
                Đã gửi thành công! Chúng tôi sẽ liên hệ bạn sớm.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-red-700">{error}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
