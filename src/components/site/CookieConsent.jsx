"use client";

import { useTranslation } from "@/lib/i18n/client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent-v1";

export function getCookieConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(choice) {
  const value = { ...choice, necessary: true, savedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {}
  window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
}

const CATEGORIES = [
  {
    key: "necessary",
    title: "common.cookie.necessary.title",
    desc: "common.cookie.necessary.description",
    locked: true,
  },
  {
    key: "analytics",
    title: "common.cookie.analytics.title",
    desc: "common.cookie.analytics.description",
  },
  {
    key: "marketing",
    title: "common.cookie.advertising.title",
    desc: "common.cookie.advertising.description",
  },
];

export default function CookieConsent({ privacyUrl = "/privacy" }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
  }, []);

  const close = (choice) => {
    saveConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{css}</style>
      <div
        className="cc-banner"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cc-title"
        aria-describedby="cc-desc"
      >
        <div className="cc-text">
          <h2 id="cc-title">{t("common.cookie.title")}</h2>
          <p id="cc-desc">
            {t("common.cookie.description")}
            <a href="/chinh-sach/bao-mat">{t("common.cookie.privacyPolicy")}</a>
          </p>

          {showSettings && (
            <ul className="cc-list">
              {CATEGORIES.map((c) => (
                <li key={c.key}>
                  <label className="cc-row">
                    <input
                      type="checkbox"
                      checked={c.locked ? true : prefs[c.key]}
                      disabled={c.locked}
                      onChange={(e) => setPrefs((p) => ({ ...p, [c.key]: e.target.checked }))}
                    />
                    <span>
                      <strong>{t(c.title)}</strong>
                      <small>{t(c.desc)}</small>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cc-actions">
          {showSettings ? (
            <button className="cc-btn cc-primary" onClick={() => close(prefs)}>
              Lưu lựa chọn
            </button>
          ) : (
            <button
              className="cc-btn cc-primary"
              onClick={() => close({ analytics: true, marketing: true })}
            >
              {t("common.cookie.acceptAll")}
            </button>
          )}
          <button className="cc-btn" onClick={() => close({ analytics: false, marketing: false })}>
            {t("common.cookie.necessaryOnly")}
          </button>
          {!showSettings && (
            <button
              className="cc-btn cc-link"
              onClick={() => setShowSettings(true)}
              aria-expanded={showSettings}
            >
              {t("common.cookie.customize")}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

const css = `
.cc-banner {
  position: fixed;
  left: 16px; right: 16px; bottom: 16px;
  max-width: 720px;
  margin-inline: auto;
  padding: 20px 22px;
  display: flex; flex-direction: column; gap: 16px;
  background: #fff; color: #1d2430;
  border: 1px solid #d9dee6; border-radius: 12px;
  box-shadow: 0 8px 30px rgba(20, 30, 50, .16);
  font: 14px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif;
  z-index: 9999;
  animation: cc-in .3s ease-out;
}
.cc-banner h2 { margin: 0 0 4px; font-size: 16px; }
.cc-banner p { margin: 0; color: #4a5568; }
.cc-banner a { color: #0b5fff; }
.cc-list { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 10px; }
.cc-row { display: flex; gap: 10px; align-items: flex-start; cursor: pointer; }
.cc-row input { margin-top: 4px; width: 16px; height: 16px; accent-color: #0b5fff; }
.cc-row small { display: block; color: #5b6676; }
.cc-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.cc-btn {
  padding: 9px 16px; border-radius: 8px; cursor: pointer;
  border: 1px solid #b8c0cc; background: #fff; color: #1d2430;
  font: inherit; font-weight: 600;
}
.cc-btn:hover { background: #f3f5f8; }
.cc-primary { background: #0b5fff; border-color: #0b5fff; color: #fff; }
.cc-primary:hover { background: #084ccc; }
.cc-link { border-color: transparent; text-decoration: underline; }
.cc-btn:focus-visible, .cc-banner a:focus-visible, .cc-row input:focus-visible {
  outline: 3px solid #7aa7ff; outline-offset: 2px;
}
@keyframes cc-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .cc-banner { animation: none; } }
@media (prefers-color-scheme: dark) {
  .cc-banner { background: #1b2130; color: #eef1f6; border-color: #2d3548; }
  .cc-banner p, .cc-row small { color: #aab3c2; }
  .cc-btn { background: #1b2130; color: #eef1f6; border-color: #3a4560; }
  .cc-btn:hover { background: #242c40; }
  .cc-primary { background: #4c8dff; border-color: #4c8dff; color: #0b1020; }
  .cc-primary:hover { background: #6aa0ff; }
  .cc-banner a { color: #7aa7ff; }
}
@media (min-width: 640px) {
  .cc-banner { flex-direction: row; align-items: flex-end; justify-content: space-between; }
  .cc-text { flex: 1; }
  .cc-actions { flex-direction: column; min-width: 190px; }
}
`;
