"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { SiteType } from "@/types/ticket";

type DialogState = { type: "found"; site: SiteType } | { type: "not_found" } | null;

const SEARCH_DELAY_MS = 700; // thời gian "đang tìm" để user có cảm giác tìm thật

/* ---------- Tìm site theo ngôn ngữ hiện tại ---------- */

// vi -> name, còn lại -> field cùng tên (en, ko, zh)
const getSiteName = (site: SiteType, lng: string): string => {
  if (lng === "vi") return site.name;
  const value = site[lng as "en" | "ko" | "zh"];
  return value || site.name; // thiếu bản dịch thì dùng tên tiếng Việt
};

// Bỏ dấu + chữ thường: "Bà Nà" khớp "ba na"
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .normalize("NFC")
    .trim();

function findSite(sites: SiteType[], text: string, lng: string): SiteType | null {
  const q = normalize(text);
  if (!q) return null;

  let best: SiteType | null = null;
  let bestIndex = Infinity;

  for (const site of sites) {
    const index = normalize(getSiteName(site, lng)).indexOf(q);
    if (index === -1) continue;
    // ưu tiên site có từ khóa xuất hiện sớm nhất trong tên
    if (index < bestIndex) {
      best = site;
      bestIndex = index;
    }
  }
  return best;
}

/* ---------- Component ---------- */

const FindTicket = ({ sites }: { sites: SiteType[] }) => {
  const router = useRouter();
  const { t, lng } = useTranslation();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<DialogState>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dọn timer khi component bị unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Đóng dialog bằng phím Esc
  useEffect(() => {
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDialog(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog]);

  const goToBuyTicket = (siteCode?: string) => {
    const query = siteCode ? `?site=${encodeURIComponent(siteCode)}` : "";
    router.push(`/${lng}/buy-ticket${query}`);
  };

  const handleFindTicket = () => {
    if (loading) return;

    const q = text.trim();
    if (!q) return goToBuyTicket();

    setLoading(true);
    timerRef.current = setTimeout(() => {
      const site = findSite(sites, q, lng);
      setDialog(site ? { type: "found", site } : { type: "not_found" });
      setLoading(false);
    }, SEARCH_DELAY_MS);
  };

  const isFound = dialog?.type === "found";

  return (
    <>
      <div className="mt-8 flex max-w-md flex-col gap-2 rounded-2xl bg-white p-2 text-ink sm:flex-row">
        <label className="sr-only" htmlFor="q">
          {t("homepage.hero.search_location")}
        </label>
        <input
          id="q"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFindTicket()}
          placeholder={t("homepage.hero.search_placeholder")}
          className="flex-1 rounded-xl px-4 py-3 outline-none"
          autoComplete="off"
          disabled={loading}
        />
        <button
          onClick={handleFindTicket}
          disabled={loading}
          aria-busy={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-sun px-6 py-3 font-bold text-ink hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
        >
          {loading && <Spinner />}
          {t("homepage.hero.search_button")}
        </button>
      </div>

      {dialog &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setDialog(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="find-ticket-title"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6 text-slate-900 shadow-xl"
            >
              {dialog.type === "found" ? (
                <>
                  <h2 id="find-ticket-title" className="text-lg font-semibold">
                    {getSiteName(dialog.site, lng)}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">{t("homepage.hero.location_found")}</p>
                </>
              ) : (
                <>
                  <h2 id="find-ticket-title" className="text-lg font-semibold">
                    {t("homepage.hero.location_not_found")}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {t("homepage.hero.location_not_found_description")}
                  </p>
                </>
              )}

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setDialog(null)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  {t("homepage.hero.stay")}
                </button>
                <button
                  autoFocus
                  onClick={() => goToBuyTicket(isFound ? dialog.site.code : undefined)}
                  className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300"
                >
                  {t("homepage.hero.go_to_ticket_page")}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

const Spinner = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
    <path
      d="M22 12a10 10 0 0 0-10-10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default FindTicket;
