import HoverImage from "@/components/ui/hover-image";
import Image from "next/image";
import Link from "next/link";

export type TicketCardProps = {
  image1: string;
  image2: string;
  title: string;
  address: string;
  price: string;
  href: string;
  className?: string;
};

export default function TicketCard({
  image1,
  image2,
  title,
  address,
  price,
  href,
  className = "",
}: TicketCardProps) {
  return (
    <article
      className={`group flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg ${className}`}
    >
      {/* Ảnh */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <HoverImage
          alt={title}
          image={image1}
          hoverImage={image2}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900">{title}</h3>

        <p className="flex items-start gap-2 text-sm text-slate-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="line-clamp-2">{address}</span>
        </p>

        {/* Đường răng cưa kiểu vé */}
        <div className="border-t border-dashed border-slate-300" />

        <div className="mt-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500">Giá vé từ</p>
            <p className="text-xl font-bold text-rose-600">{price}</p>
          </div>

          <Link
            href={href}
            className="rounded-full bg-[#2a7e1c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a7e5c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7e1c] focus-visible:ring-offset-2"
          >
            Mua ngay
          </Link>
        </div>
      </div>
    </article>
  );
}
