import { TicketSlash, UserRoundPen, HandCoins } from "lucide-react";
import Image from "next/image";
const HIGHLIGHTS = [
  { icon: TicketSlash, label: "Nhận vé nhanh chóng" },
  { icon: UserRoundPen, label: "Đăng kí hội viên để nhận ưu đãi" },
  { icon: HandCoins, label: "Thanh toán dễ dàng" },
];
export default function Hero() {
  return (
    <section className="relative h-[340px] w-full overflow-hidden sm:h-[380px]">
      <Image
        src="/banner-moonprice.png"
        alt="Moon Price"
        width={900}
        height={400}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
          Khám phá Du lịch Đà Nẵng cùng Moon Price
        </h1>

        <div className="mt-6 flex flex-wrap gap-3">
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md ring-1 ring-white/25"
            >
              <Icon size={16} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
