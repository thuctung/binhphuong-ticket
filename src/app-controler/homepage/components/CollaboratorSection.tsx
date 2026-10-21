import Link from "next/link";

type Step = {
  title: string;
  /** Nhãn nhỏ khi bước chỉ áp dụng cho một nhóm */
  note?: string;
};

type Panel = {
  title: string;
  description: string;
  badge?: string;
};

export type AffiliateIntroProps = {
  title?: string;
  steps?: Step[];
  panels?: [Panel, Panel];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
};

const defaultSteps: Step[] = [
  { title: "Đăng ký tài khoản" },
  { title: "Gửi yêu cầu cộng tác viên" },
  { title: "Admin duyệt" },
  { title: "Nạp tiền vào ví và xuất vé", note: "Nếu là agent" },
];

const defaultPanels: [Panel, Panel] = [
  {
    title: "Dành cho bạn muốn bán vé",
    description: "Có trang riêng quản lý đơn, theo dõi doanh số.",
  },
  {
    title: "Agent wallet",
    description: "Agent nạp tiền trước, hệ thống trừ ví khi xuất vé.",
    badge: "Tối ưu hiệu suất bán vé.",
  },
];

/*
 * Màu dùng trong component (đổi tại đây nếu cần):
 *  nền #EDF1EE · mực #0F2E2A · chữ phụ #4B635E · vàng nghệ #F2B134
 * Font: nếu có biến --font-display (next/font) thì tiêu đề sẽ dùng nó.
 */
export default function AffiliateIntro({
  title = "Cộng tác viên",
  steps = defaultSteps,
  panels = defaultPanels,
  primaryCta = { label: "Đăng ký làm Affiliate", href: "/affiliate/register" },
  secondaryCta = { label: "Xem câu hỏi", href: "/faq" },
  className = "",
}: AffiliateIntroProps) {
  return (
    <section className={`bg-[#EDF1EE] text-[#0F2E2A] ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Tiêu đề + nút */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none tracking-tight md:text-5xl">
            {title}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className="rounded-lg bg-[#F2B134] px-6 py-3.5 text-sm font-semibold text-[#0F2E2A] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2E2A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1EE]"
            >
              {primaryCta.label}
            </Link>
          </div>
        </div>

        {/* Quy trình: đây là một chuỗi bước nên đánh số */}
        <ol className="mt-14 grid md:mt-20 md:grid-cols-4 md:gap-8">
          {steps.map((step, i) => {
            const conditional = Boolean(step.note);
            return (
              <li
                key={step.title}
                className={`relative border-l-2 border-[#0F2E2A]/25 pb-8 pl-8 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-8 ${
                  conditional ? "border-dashed" : ""
                }`}
              >
                <span
                  className={`absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold md:-top-[17px] md:left-0 ${
                    conditional
                      ? "border-2 border-dashed border-[#0F2E2A] bg-[#EDF1EE]"
                      : "bg-[#0F2E2A] text-white"
                  }`}
                >
                  {i + 1}
                </span>

                <p className="max-w-[16rem] text-base font-semibold leading-snug">{step.title}</p>
              </li>
            );
          })}
        </ol>

        {/* Vé: hai nửa ngăn bởi đường răng cưa */}
        <div className="mt-16 grid overflow-hidden rounded-3xl bg-white md:mt-24 md:grid-cols-2">
          {panels.map((panel, i) => (
            <div
              key={panel.title}
              className={`relative flex flex-col gap-3 p-8 md:p-12 ${
                i === 1
                  ? "border-t-2 border-dashed border-[#0F2E2A]/25 md:border-l-2 md:border-t-0"
                  : ""
              }`}
            >
              {i === 1 && (
                <>
                  {/* Khuyết tròn ở hai đầu đường răng cưa */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#EDF1EE]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#EDF1EE] md:-bottom-3 md:-left-3 md:right-auto md:top-auto"
                  />
                </>
              )}

              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight md:text-3xl">
                {panel.title}
              </h3>
              <p className="max-w-sm leading-7 text-[#4B635E]">{panel.description}</p>
              {panel.badge && (
                <span className="mt-2 w-fit rounded-md bg-[#F2B134]/25 px-3 py-1.5 text-sm font-semibold">
                  {panel.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
