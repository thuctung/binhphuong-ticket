import Link from "next/link";

const policies = [
  { title: "Điều khoản sử dụng", href: "/chinh-sach/dieu-khoan-su-dung" },
  { title: "Chính sách bảo mật", href: "/chinh-sach/chinh-sach-bao-mat" },
  {
    title: "Bảo vệ dữ liệu cá nhân",
    href: "/chinh-sach/chinh-sach-bao-ve-du-lieu-ca-nhan",
  },
  {
    title: "Chính sách thanh toán",
    href: "/chinh-sach/chinh-sach-thanh-toan",
  },
  { title: "Giao nhận vé", href: "/chinh-sach/chinh-sach-giao-nhan-ve" },
  {
    title: "Đổi vé và hoàn tiền",
    href: "/chinh-sach/chinh-sach-doi-tra-hoan-tien",
  },
  { title: "Chính sách hủy vé", href: "/chinh-sach/chinh-sach-huy-ve" },
  {
    title: "Giá và khuyến mại",
    href: "/chinh-sach/chinh-sach-gia-ca-khuyen-mai",
  },
  { title: "Quy trình đặt vé", href: "/chinh-sach/quy-trinh-dat-ve" },
  {
    title: "Giải quyết khiếu nại",
    href: "/chinh-sach/quy-trinh-khieu-nai",
  },
  {
    title: "Quy chế hoạt động website",
    href: "/chinh-sach/quy-che-hoat-dong",
  },
  {
    title: "Thông tin chủ sở hữu",
    href: "/chinh-sach/thong-tin-chu-so-huu",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#12391f] via-[#174c2a] to-[#0b2918] text-white">
      {/* Ánh sáng trang trí */}
      <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-amber-300/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
          {/* Thương hiệu */}
          <div>
            <Link
              href="/"
              className="inline-block text-2xl font-bold tracking-tight text-white transition hover:text-amber-300"
            >
              <span className="text-amber-300">Moon Price</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-emerald-50/70">
              Hệ thống đặt vé tham quan và du lịch trực tuyến. Đồng hành cùng bạn trên mỗi hành
              trình khám phá.
            </p>

            <div className="mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-amber-300 to-amber-100" />
          </div>

          {/* Chính sách */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">Chính sách & điều khoản</h3>

            <ul className="space-y-3">
              {policies.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-emerald-50/70 transition-colors duration-200 hover:text-amber-300"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-300/50 transition-colors group-hover:bg-amber-300" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">Hỗ trợ khách hàng</h3>

            <ul className="space-y-3">
              {policies.slice(6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-emerald-50/70 transition-colors duration-200 hover:text-amber-300"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-300/50 transition-colors group-hover:bg-amber-300" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/15 pt-6 md:mt-12">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-emerald-50/55 sm:flex-row sm:text-left">
            <p>© {new Date().getFullYear()} Moon Price. All rights reserved.</p>

            <p className="text-emerald-50/45">Khám phá hành trình · Lưu giữ trải nghiệm</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
