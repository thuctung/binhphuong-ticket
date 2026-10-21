type FaqItem = {
  question: string;
  answer: string;
};

export type FaqProps = {
  title?: string;
  items?: FaqItem[];
  /** Vị trí câu hỏi mở sẵn (mặc định: câu đầu tiên). Truyền -1 để đóng hết. */
  defaultOpen?: number;
  className?: string;
};

// Nội dung mẫu: hãy chỉnh lại cho đúng chính sách thực tế của bạn.
const defaultItems: FaqItem[] = [
  {
    question: "Ai có thể đăng ký làm cộng tác viên?",
    answer:
      "Bạn chỉ cần có tài khoản, sau đó gửi yêu cầu cộng tác viên. Admin sẽ xem xét và duyệt yêu cầu của bạn.",
  },
  {
    question: "Sau khi được duyệt, tôi làm gì tiếp?",
    answer:
      "Bạn sẽ có trang riêng để quản lý đơn hàng và theo dõi doanh số. Nếu là agent, bạn cần nạp ví trước để xuất vé cho khách.",
  },
  {
    question: "Agent khác cộng tác viên thông thường ở điểm nào?",
    answer:
      "Agent nạp tiền vào ví trước, hệ thống sẽ trừ ví mỗi khi xuất vé. Nhờ vậy bạn xuất vé được ngay cho khách mà không phải chờ thanh toán từng đơn.",
  },
  {
    question: "Tôi có bắt buộc phải nạp ví không?",
    answer:
      "Không. Chỉ agent mới cần nạp ví. Nếu bạn chỉ muốn bán vé và theo dõi đơn, bạn có thể làm cộng tác viên mà không cần nạp ví.",
  },
  {
    question: "Ví hết tiền thì sao?",
    answer:
      "Khi số dư không đủ, hệ thống không thể trừ ví để xuất vé. Bạn cần nạp thêm vào ví rồi tiếp tục xuất vé cho khách.",
  },
  {
    question: "Tôi xem đơn và doanh số ở đâu?",
    answer:
      "Trong trang riêng dành cho cộng tác viên. Tại đây bạn quản lý đơn và theo dõi doanh số của mình.",
  },
];

export default function Faq({
  title = "Câu hỏi thường gặp",
  items = defaultItems,
  defaultOpen = 0,
  className = "",
}: FaqProps) {
  return (
    <section className={`bg-white text-[#0F2E2A] ${className}`}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_2fr] md:gap-16 md:py-24">
        <h2 className="self-start font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight md:sticky md:top-24 md:text-5xl">
          {title}
        </h2>

        <div className="divide-y-2 divide-[#0F2E2A]/15 border-y-2 border-[#0F2E2A]/15">
          {items.map((item, i) => (
            <details key={item.question} open={i === defaultOpen} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2E2A] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#0F2E2A] transition group-open:border-[#F2B134] group-open:bg-[#F2B134]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>

              <p className="max-w-prose pb-6 pr-14 leading-7 text-[#4B635E]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
