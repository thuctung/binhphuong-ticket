export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold text-white">
            Nguyệt<span className="text-lagoon">Hoàng</span>
          </p>
          <p className="mt-2 text-sm">Đặt vé tham quan và tour du lịch trực tuyến.</p>
        </div>
        <div className="text-sm">
          <p className="font-bold text-white">Liên hệ</p>
          <p className="mt-2">Hotline: 1900 0000</p>
          <p>Email: nguyethoang@gmail.com</p>
          <p>Đà Nẵng</p>
        </div>
        <div className="text-sm">
          <p className="font-bold text-white">Hỗ trợ</p>
          <ul className="mt-2 space-y-1">
            <li>
              <a href="#" className="hover:text-white">
                Chính sách hoàn vé
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a href="#dai-ly" className="hover:text-white">
                Đăng ký đại lý
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
