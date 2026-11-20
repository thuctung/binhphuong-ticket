import Link from "next/link";

type Tone = "error" | "warning" | "info";

type Reason = {
  title: string;
  desc: string;
  tone: Tone;
  canRetry: boolean; // false = đã trả tiền hoặc đang xử lý, KHÔNG khuyến khích thanh toán lại
};

// Mã lỗi MoMo hay gặp. Đối chiếu thêm với bảng result code của MoMo.
const MOMO_CODES: Record<string, string> = {
  "1006": "Bạn đã hủy giao dịch trên MoMo.",
  "1007": "Thẻ đã bị khóa. Vui lòng dùng thẻ hoặc phương thức khác.",
  "1702": "Số thẻ không hợp lệ. Vui lòng kiểm tra lại.",
  "1713": "Thẻ đang bị hạn chế. Vui lòng dùng thẻ khác.",
  "4010": "Xác thực OTP không thành công.",
};

function getReason(reason?: string): Reason {
  switch (reason) {
    case "invalid":
      return {
        title: "Không xác thực được giao dịch",
        desc: "Thông tin trả về từ cổng thanh toán không hợp lệ. Nếu bạn đã bị trừ tiền, vui lòng liên hệ hỗ trợ.",
        tone: "warning",
        canRetry: true,
      };
    case "processing":
      return {
        title: "Đơn hàng đang được xử lý",
        desc: "Hệ thống đang xác nhận giao dịch của bạn. Vui lòng không thanh toán lại, hãy kiểm tra email hoặc liên hệ hỗ trợ nếu sau vài phút chưa nhận được vé.",
        tone: "info",
        canRetry: false,
      };
    case "ticket":
      return {
        title: "Đã thanh toán nhưng chưa xuất được vé",
        desc: "Chúng tôi đã nhận được tiền của bạn nhưng việc tạo vé gặp sự cố. Vui lòng không thanh toán lại, hãy liên hệ hỗ trợ kèm mã đơn hàng để được xử lý.",
        tone: "warning",
        canRetry: false,
      };
    case "not_found":
      return {
        title: "Không tìm thấy đơn hàng",
        desc: "Đơn hàng không tồn tại hoặc đã hết hạn. Nếu bạn đã bị trừ tiền, vui lòng liên hệ hỗ trợ.",
        tone: "error",
        canRetry: true,
      };
    case "amount_mismatch":
      return {
        title: "Số tiền thanh toán không khớp",
        desc: "Số tiền giao dịch không trùng với đơn hàng. Vui lòng liên hệ hỗ trợ để được kiểm tra.",
        tone: "warning",
        canRetry: false,
      };
    case "error":
      return {
        title: "Đã có lỗi xảy ra",
        desc: "Hệ thống gặp sự cố khi xử lý đơn hàng. Nếu bạn đã bị trừ tiền, vui lòng liên hệ hỗ trợ trước khi thanh toán lại.",
        tone: "error",
        canRetry: false,
      };
    default: {
      // reason là mã lỗi MoMo (ví dụ "1006") hoặc không có
      const momoMsg = reason ? MOMO_CODES[reason] : undefined;
      return {
        title: "Thanh toán không thành công",
        desc:
          momoMsg ?? "Giao dịch đã bị hủy hoặc thất bại. Bạn chưa bị trừ tiền và có thể thử lại.",
        tone: "error",
        canRetry: true,
      };
    }
  }
}

const TONE: Record<Tone, { box: string; icon: React.ReactNode }> = {
  error: {
    box: "text-red-600 bg-red-50",
    icon: <path d="M6 6l12 12M18 6 6 18" />,
  },
  warning: {
    box: "text-amber-600 bg-amber-50",
    icon: <path d="M12 8v5m0 3h.01" />,
  },
  info: {
    box: "text-blue-600 bg-blue-50",
    icon: <path d="M12 7v5l3 2" />,
  },
};

export default async function OrderFailedPage({
  params,
  searchParams,
}: {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ reason?: string; orderCode?: string }>;
}) {
  const { lng } = await params;
  const { reason, orderCode } = await searchParams;

  const info = getReason(reason);
  const tone = TONE[info.tone];

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-xl ring-1 ring-slate-900/5">
        <div
          className={`mx-auto mb-5 flex size-16 items-center justify-center rounded-full ${tone.box}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {tone.icon}
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{info.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{info.desc}</p>

        {orderCode && (
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm">
            <p className="text-slate-500">Mã đơn hàng</p>
            <p className="mt-0.5 break-all font-semibold text-slate-900">{orderCode}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2">
          {info.canRetry ? (
            <Link
              href={`/${lng}/buy-ticket`}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]"
            >
              Thử thanh toán lại
            </Link>
          ) : (
            <a
              href="mailto:support@your-domain.com"
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]"
            >
              Liên hệ hỗ trợ
            </a>
          )}

          <Link
            href={`/${lng}`}
            className="py-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}
