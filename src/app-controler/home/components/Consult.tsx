"use client";

import { useState, FormEvent } from "react";
import { places } from "@/lib/data";
import { getTranslation } from "@/lib/i18n";
import { useTranslation } from "@/lib/i18n/client";

type Status = "idle" | "loading" | "success" | "error";

const field =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-lagoon focus:ring-2 focus:ring-lagoon/30";

export default function Consult() {
  const { t } = useTranslation();

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
            {t("homepage.consultation.title")}
          </h2>
          <p className="mt-3 text-ink/70">{t("homepage.consultation.description")}</p>
          <ul className="mt-6 space-y-3 text-sm text-ink/80">
            <li className="flex gap-3">
              <span className="text-sun">●</span> {t("homepage.consultation.benefits.0")}
            </li>
            <li className="flex gap-3">
              <span className="text-sun">●</span> {t("homepage.consultation.benefits.1")}
            </li>
            <li className="flex gap-3">
              <span className="text-sun">●</span> {t("homepage.consultation.benefits.2")}
            </li>
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8 lg:col-span-3"
        >
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
              {t("homepage.consultation.name")}*
              <input
                name="name"
                required
                minLength={2}
                className={`${field} mt-1`}
                placeholder={t("homepage.consultation.name_placeholder")}
              />
            </label>
            <label className="text-sm font-medium">
              {t("homepage.consultation.phone")} *
              <input
                name="phone"
                type="tel"
                required
                className={`${field} mt-1`}
                placeholder={t("homepage.consultation.phone_placeholder")}
              />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              {t("homepage.consultation.email")} *
              <input
                name="email"
                type="email"
                className={`${field} mt-1`}
                placeholder={t("homepage.consultation.email_placeholder")}
              />
            </label>
            <label className="text-sm font-medium">
              {t("homepage.consultation.destination")}
              <select name="destination" className={`${field} mt-1`} defaultValue="">
                <option value="">{t("homepage.consultation.destination_placeholder")}</option>
                {places.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.city})
                  </option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="text-sm font-medium">
                {t("homepage.consultation.people")}
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
                {t("homepage.consultation.date")}
                <input name="date" type="date" className={`${field} mt-1`} />
              </label>
            </div>
            <label className="text-sm font-medium sm:col-span-2">
              <textarea
                name="message"
                rows={4}
                maxLength={2000}
                className={`${field} mt-1 resize-none`}
                placeholder={t("homepage.consultation.message_placeholder")}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 w-full rounded-full bg-sun px-6 py-3 font-bold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t("homepage.consultation.submit")}
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
