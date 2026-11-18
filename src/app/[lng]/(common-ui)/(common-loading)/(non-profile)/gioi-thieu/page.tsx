import { COMPANY_INFO } from "@/commons/constant";

const services = [
  {
    name: "Vé tham quan",
    desc: "Bà Nà Hills, Cầu Vàng, Ngũ Hành Sơn, Hội An, Huế và nhiều điểm khác. Nhận vé điện tử ngay sau khi thanh toán.",
  },
  {
    name: "Tour trong ngày và tour ghép",
    desc: "Bán đảo Sơn Trà, Cù Lao Chàm, phố cổ Hội An, Huế. Có tour ghép giá tốt và tour riêng cho gia đình, nhóm bạn.",
  },
  {
    name: "Đưa đón và thuê xe",
    desc: "Đón sân bay, ga tàu, thuê xe có tài xế hoặc xe tự lái, đúng giờ và giá báo trước.",
  },
  {
    name: "Hỗ trợ trong chuyến đi",
    desc: "Gợi ý lịch trình, đặt khách sạn, đổi hoặc hoàn vé khi kế hoạch thay đổi. Có người trả lời khi bạn đang ở Đà Nẵng.",
  },
];

const reasons = [
  {
    title: "Hiểu rõ từng điểm đến",
    text: "Tám năm làm việc với các điểm tham quan và đối tác tại miền Trung giúp chúng tôi biết giờ nào đỡ đông, vé nào đáng mua.",
  },
  {
    title: "Giá niêm yết rõ ràng",
    text: "Báo giá trọn gói trước khi thanh toán, không phụ thu bất ngờ.",
  },
  {
    title: "Phản hồi nhanh",
    text: "Nhắn Zalo hoặc gọi điện, bạn nhận được câu trả lời từ người trực tiếp xử lý đơn.",
  },
  {
    title: "Đổi và hoàn khi cần",
    text: "Chuyến bay lùi, trời mưa lớn, đổi kế hoạch: chúng tôi làm việc với đối tác để xử lý giúp bạn.",
  },
];

const steps = [
  {
    title: "Đến trang Mua vé",
    text: "Cho chúng tôi biết ngày đi và nơi bạn muốn đến.",
  },
  {
    title: "Nhận báo giá",
    text: "Bạn nhận thông tin về giá vé trong giây lát.",
  },
  {
    title: "Thanh toán",
    text: "Chuyển khoản hoặc thanh toán tại văn phòng, tùy bạn chọn.",
  },
  {
    title: "Nhận vé và đi",
    text: "Vé điện tử gửi qua email. Cần gì, chúng tôi vẫn ở đó.",
  },
];

function Wave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path
        d="M0 64c120 32 240 32 360 0s240-32 360 0 240 32 360 0 240-32 360 0v56H0z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="#" className="text-lg font-extrabold tracking-tight text-white">
            Đà Nẵng Tourist
          </a>
          <nav className="hidden gap-8 text-sm font-medium text-white/85 md:flex">
            <a
              href="#dich-vu"
              className="hover:text-white focus-visible:outline-2 focus-visible:outline-sun"
            >
              Dịch vụ
            </a>
            <a
              href="#vi-sao"
              className="hover:text-white focus-visible:outline-2 focus-visible:outline-sun"
            >
              Vì sao chọn chúng tôi
            </a>
            <a
              href="#dat-ve"
              className="hover:text-white focus-visible:outline-2 focus-visible:outline-sun"
            >
              Cách đặt vé
            </a>
          </nav>
          <a
            href="#lien-he"
            className="rounded-full bg-sun px-4 py-2 text-sm font-semibold text-sea hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Liên hệ
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-sea pb-28 pt-28 text-white md:pb-40 md:pt-40">
          {/* Mặt trời: nhỏ và mờ trên mobile để không che chữ */}
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sun/25 md:-right-24 md:-top-24 md:h-[28rem] md:w-[28rem] md:bg-sun/90"
          />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-[1.15fr_1fr] md:gap-14">
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold leading-[1.2] tracking-tight sm:text-5xl md:text-6xl">
                Đến Đà Nẵng, vé và lịch trình đã có Moon Prince lo.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Đà Nẵng Tourist bán vé tham quan, vé di chuyển và hỗ trợ du khách suốt chuyến đi tại
                Đà Nẵng, Hội An và Huế. Chúng tôi làm việc này đã 8 năm.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="/buy-ticket"
                  className="rounded-full bg-sun px-6 py-3 font-semibold text-sea hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Mua vé
                </a>
                <a
                  href="/dai-ly"
                  className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Trở thành đại lý
                </a>
              </div>
            </div>

            {/* Ticket: chỉ xoay từ màn hình sm trở lên */}
            <div className="relative mx-auto w-full max-w-md text-ink sm:rotate-2">
              <div className="flex overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/30">
                <div className="min-w-0 flex-1 p-5 sm:p-6">
                  <p className="text-sm font-medium text-lagoon">Vé hỗ trợ du lịch</p>
                  <p className="mt-2 text-xl font-extrabold text-sea sm:text-2xl">
                    Đà Nẵng Tourist
                  </p>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                      <dt className="text-ink/60">Điểm đến</dt>
                      <dd className="font-semibold sm:text-right">Đà Nẵng, Hội An, Huế</dd>
                    </div>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                      <dt className="text-ink/60">Dịch vụ</dt>
                      <dd className="font-semibold sm:text-right">Vé, tour, đưa đón</dd>
                    </div>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                      <dt className="text-ink/60">Hỗ trợ</dt>
                      <dd className="font-semibold sm:text-right">Trong suốt chuyến đi</dd>
                    </div>
                  </dl>
                </div>
                <div className="relative flex w-20 shrink-0 flex-col items-center justify-center border-l-2 border-dashed border-sea/25 bg-mist p-3 text-center sm:w-28 sm:p-4">
                  <span
                    aria-hidden="true"
                    className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-sea"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-full bg-sea"
                  />
                  <span className="text-4xl font-extrabold leading-none text-sea sm:text-5xl">
                    8
                  </span>
                  <span className="mt-2 text-xs font-semibold leading-snug text-sea">
                    năm kinh nghiệm
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Wave className="absolute bottom-0 left-0 h-12 w-full text-white md:h-24" />
        </section>

        {/* Giới thiệu */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-28">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-sea sm:text-3xl md:text-4xl">
              Một đội ngũ nhỏ, làm nghề du lịch ngay tại Đà Nẵng.
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
              <p>
                Đà Nẵng Tourist bắt đầu từ một quầy vé nhỏ phục vụ khách đến Đà Nẵng. Sau 8 năm,
                chúng tôi vẫn giữ cách làm đó: hỏi kỹ nhu cầu, báo giá rõ ràng và có mặt khi khách
                cần.
              </p>
            </div>
          </div>
        </section>

        {/* Dịch vụ */}
        <section id="dich-vu" className="bg-mist py-16 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-sea sm:text-3xl md:text-4xl">
              Những việc chúng tôi làm cho chuyến đi của bạn
            </h2>
            <ul className="mt-10 divide-y divide-sea/15 border-y border-sea/15 md:mt-12">
              {services.map((s) => (
                <li
                  key={s.name}
                  className="grid gap-2 py-6 md:grid-cols-[1fr_1.6fr] md:gap-12 md:py-7"
                >
                  <h3 className="text-lg font-semibold text-sea sm:text-xl">{s.name}</h3>
                  <p className="leading-relaxed text-ink/75">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Vì sao chọn */}
        <section id="vi-sao" className="mx-auto max-w-6xl px-5 py-16 md:py-28">
          <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-sea sm:text-3xl md:text-4xl">
            Vì sao du khách quay lại với chúng tôi
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 md:mt-12 md:gap-y-10">
            {reasons.map((r) => (
              <div key={r.title} className="border-l-4 border-lagoon pl-5">
                <h3 className="text-lg font-semibold sm:text-xl">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quy trình */}
        <section id="dat-ve" className="bg-sea py-16 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              Đặt vé trong bốn bước
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-12 md:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sun font-extrabold text-sea">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Liên hệ */}
        <section id="lien-he" className="mx-auto max-w-6xl px-5 py-16 md:py-28">
          <div className="grid grid-cols-1 gap-8 rounded-3xl bg-mist p-6 md:grid-cols-[1.2fr_1fr] md:gap-10 md:p-14">
            <div className="min-w-0">
              <h2 className="text-2xl font-extrabold tracking-tight text-sea sm:text-3xl md:text-4xl">
                Bạn sắp đến Đà Nẵng? Nhắn cho chúng tôi.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
                Gửi ngày đi và số người, chúng tôi trả lời kèm báo giá trong thời gian sớm nhất.
              </p>
            </div>
            <dl className="min-w-0 space-y-4 self-center">
              <div>
                <dt className="text-sm text-ink/60">Điện thoại và Zalo</dt>
                <dd className="break-words text-lg font-semibold text-sea sm:text-xl">
                  {COMPANY_INFO.hotline}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink/60">Email</dt>
                <dd className="break-words text-lg font-semibold text-sea sm:text-xl">
                  {COMPANY_INFO.email}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink/60">Văn phòng</dt>
                <dd className="break-words text-lg font-semibold text-sea sm:text-xl">
                  {COMPANY_INFO.address}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
    </>
  );
}
