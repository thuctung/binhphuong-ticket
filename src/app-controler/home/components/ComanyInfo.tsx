import { COMPANY_INFO } from "@/commons/constant";
import { getTranslation } from "@/lib/i18n";
import React from "react";

const COMPANY = [
  { label: "Tên đơn vị", value: "ownership.sections.0.bullets.0" },
  { label: "Thương hiệu", value: "ownership.sections.0.bullets.1" },
  { label: "Thương hiệu", value: "ownership.sections.0.bullets.2" },
  { label: "Mã số thuế", value: "ownership.sections.2.bullets.2" },
  { label: "Người đại diện", value: "ownership.sections.0.bullets.4" },
];

const HOTLINE = COMPANY_INFO.hotline;
const EMAIL = COMPANY_INFO.email;
const OFFICE = "ownership.sections.2.bullets.2";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&display=swap');

.mp-info {
  --mp-bg: #eef4f6;
  --mp-ink: #12303b;
  --mp-muted: #4f6872;
  --mp-sea: #0b4a5a;
  --mp-sea-deep: #083642;
  --mp-moon: #f2c14e;
  --mp-line: #c9dade;
  font-family: 'Be Vietnam Pro', system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: var(--mp-bg);
  color: var(--mp-ink);
  padding: clamp(40px, 7vw, 88px) clamp(16px, 5vw, 48px);
}
.mp-info *, .mp-info *::before, .mp-info *::after { box-sizing: border-box; }
.mp-info__wrap {
  max-width: 1080px;
  margin: 0 auto;
}
.mp-info__title {
  font-size: clamp(1.6rem, 3.2vw, 2.25rem);
  line-height: 1.25;
  font-weight: 700;
  margin: 0 0 8px;
}
.mp-info__lead {
  margin: 0 0 40px;
  max-width: 60ch;
  color: var(--mp-muted);
  line-height: 1.6;
}
.mp-info__grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(24px, 4vw, 48px);
  align-items: start;
}
.mp-info__heading {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 4px;
}
.mp-info__list { margin: 0; padding: 0; }
.mp-info__row {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--mp-line);
}
.mp-info__row:last-child { border-bottom: 0; }
.mp-info__row dt { color: var(--mp-muted); font-size: 0.92rem; }
.mp-info__row dd { margin: 0; font-weight: 500; line-height: 1.5; }

.mp-contact {
  position: relative;
  overflow: hidden;
  background: var(--mp-sea-deep);
  color: #f4f8f9;
  border-radius: 20px;
  padding: clamp(24px, 4vw, 36px);
}
.mp-contact::after {
  /* crescent moon */
  content: "";
  position: absolute;
  top: -34px;
  right: -34px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 18px 18px 0 0 var(--mp-moon);
  transform: rotate(-20deg) translate(-14px, -14px);
  opacity: 0.95;
  pointer-events: none;
}
.mp-contact .mp-info__heading { color: #fff; }
.mp-contact__hint { margin: 0 0 24px; color: #b8d0d6; font-size: 0.92rem; line-height: 1.5; max-width: 30ch; }
.mp-contact__label { display: block; font-size: 0.85rem; color: #b8d0d6; margin-bottom: 4px; }
.mp-contact__hotline {
  display: inline-block;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--mp-moon);
  text-decoration: none;
  margin-bottom: 24px;
}
.mp-contact__item { margin-bottom: 20px; }
.mp-contact__item:last-of-type { margin-bottom: 28px; }
.mp-contact__item a, .mp-contact__item span.v {
  color: #fff;
  line-height: 1.5;
  word-break: break-word;
  text-decoration: none;
}
.mp-contact__item a:hover { text-decoration: underline; }
.mp-contact__btn {
  display: inline-block;
  background: var(--mp-moon);
  color: #1b2a30;
  font-weight: 700;
  text-decoration: none;
  padding: 12px 22px;
  border-radius: 999px;
}
.mp-contact__btn:hover { background: #f7d27a; }
.mp-info a:focus-visible {
  outline: 3px solid var(--mp-moon);
  outline-offset: 3px;
  border-radius: 6px;
}

@media (max-width: 820px) {
  .mp-info__grid { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .mp-info__row { grid-template-columns: 1fr; gap: 2px; }
}
`;

export default async function CompanyInfo({ lng }: { lng: string }) {
  const { t } = await getTranslation(lng);

  return (
    <section className="mp-info" aria-labelledby="mp-info-title">
      <style>{css}</style>
      <div className="mp-info__wrap">
        <h2 id="mp-info-title" className="mp-info__title">
          {t("homepage.footer.ownership")}
        </h2>

        <div className="mp-info__grid">
          <div>
            <dl className="mp-info__list">
              {COMPANY.map((item) => (
                <div className="mb-5" key={item.label}>
                  {t(item.value, {
                    brand: COMPANY_INFO.brand,
                    personHost: COMPANY_INFO.personHost,
                    taxCode: COMPANY_INFO.taxCode,
                  })}
                </div>
              ))}
            </dl>
          </div>

          <aside className="mp-contact" aria-label="Thông tin liên hệ">
            <h3 className="mp-info__heading">{t("homepage.title")}</h3>
            <p className="mp-contact__hint">{t("homepage.description")}</p>

            <span className="mp-contact__label">Hotline</span>
            <a className="mp-contact__hotline" href={`tel:${COMPANY_INFO.hotline}`}>
              {COMPANY_INFO.hotline}
            </a>

            <div className="mp-contact__item">
              <span className="mp-contact__label">Email</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>

            <div className="mp-contact__item">
              <span className="mp-contact__label">Địa chỉ văn phòng</span>
              <span className="v">{t(OFFICE)}</span>
            </div>

            <a className="mp-contact__btn" href={`tel:${HOTLINE}`}>
              Hotline
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
