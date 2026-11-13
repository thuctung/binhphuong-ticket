"use-client";

import Link from "next/link";
import { getOrder, type Order, type Ticket } from "./api";
import dayjs from "dayjs";
import { FULL_DATE_FORMAT } from "@/helpers/dateTime";
import { formatVND } from "@/lib/money";

export default function OrderSuccessController({ code }: { code: string }) {
  const orderCode = "12122";
  const order: any = {
    customer: {
      email: "",
    },
    tickets: [],
  };

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10 text-slate-900 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {order ? <Success order={order} /> : <NotFound code={orderCode} />}
      </div>
    </main>
  );
}

function NotFound({ code }: { code?: string }) {
  return (
    <section className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5M8.5 8.5l5 5m0-5-5 5" />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-semibold">Không tìm thấy đơn hàng</h1>
      <p className="mx-auto mt-2 max-w-md text-slate-600">
        {code
          ? `Mã đơn “${code}” không tồn tại hoặc không đúng. Hãy kiểm tra lại mã trong email xác nhận.`
          : "Đường dẫn thiếu mã đơn hàng. Hãy mở lại liên kết từ email xác nhận hoặc từ bước thanh toán."}
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Về trang chủ
      </Link>
    </section>
  );
}

function Success({ order }: { order: Order }) {
  return (
    <>
      <header className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          Cảm ơn bạn đã đặt vé!
        </h1>
        <p className="mt-2 text-slate-600">
          Thanh toán thành công lúc {dayjs(order.paidAt).format(FULL_DATE_FORMAT)}.
        </p>
        <p className="mt-4 inline-block rounded-full bg-white px-4 py-1.5 text-sm ring-1 ring-slate-200">
          Mã đơn hàng: <span className="font-mono font-semibold">{order.code}</span>
        </p>
      </header>

      <section
        className="mt-8 flex items-start gap-3 rounded-xl bg-indigo-50 p-4 text-indigo-950 ring-1 ring-indigo-100"
        role="status"
      >
        <svg
          viewBox="0 0 24 24"
          className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        <p className="text-sm leading-relaxed">
          Vé điện tử sẽ được gửi đến <strong>{order.customer.email}</strong> trong ít phút. Nếu chưa
          thấy email, hãy kiểm tra thư mục spam.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="tickets-title">
        <h2 id="tickets-title" className="text-lg font-semibold">
          Vé đã đặt ({order.tickets.length})
        </h2>
        <ul className="mt-4 space-y-4">
          {order.tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between rounded-xl bg-white px-5 py-4 ring-1 ring-slate-200">
          <span className="text-slate-600">Tổng thanh toán</span>
          <span className="text-xl font-semibold">{formatVND(order.total)}</span>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="customer-title">
        <h2 id="customer-title" className="text-lg font-semibold">
          Thông tin khách hàng
        </h2>
        <dl className="mt-4 grid gap-x-6 gap-y-4 rounded-xl bg-white p-5 ring-1 ring-slate-200 sm:grid-cols-2">
          <Info label="Họ và tên" value={order.customer.name} />
          <Info label="Email nhận vé" value={order.customer.email} />
          {order.customer.phone && <Info label="Số điện thoại" value={order.customer.phone} />}
        </dl>
      </section>

      <footer className="mt-10 text-center">
        <p className="text-slate-600">
          Chúc bạn có một trải nghiệm thật trọn vẹn. Hẹn gặp bạn tại sự kiện!
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Tiếp tục khám phá
        </Link>
      </footer>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="mt-0.5 break-words font-medium">{value}</dd>
    </div>
  );
}

function TicketCard({ ticket: t }: { ticket: Ticket }) {
  return (
    <li className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 md:flex-row">
      {/* Phần thông tin chính */}
      <div className="flex-1 p-5 sm:p-6">
        <p className="text-sm font-medium text-indigo-700">{t.ticketType}</p>
        <h3 className="mt-1 text-xl font-semibold">{t.eventName}</h3>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <Info label="Thời gian" value={dayjs(t.date).format(FULL_DATE_FORMAT)} />
          <Info label="Địa điểm" value={t.venue} />
          {t.holderName && <Info label="Người sử dụng" value={t.holderName} />}
        </dl>
      </div>

      {/* Cuống vé */}
      <div className="relative flex items-center justify-between gap-4 border-t-2 border-dashed border-slate-200 bg-slate-50 p-5 md:w-48 md:flex-col md:items-start md:justify-center md:border-l-2 md:border-t-0">
        <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-stone-100 ring-1 ring-slate-200 md:-top-2.5 md:left-[-11px]" />
        <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-stone-100 ring-1 ring-slate-200 md:-bottom-2.5 md:left-[-11px] md:right-auto md:top-auto" />
        <div>
          <p className="text-sm text-slate-500">Ghế</p>
          <p className="font-mono text-2xl font-semibold">{t.seat ?? "Tự do"}</p>
        </div>
        <div className="text-right md:text-left">
          <p className="text-sm text-slate-500">Giá vé</p>
          <p className="font-medium">{formatVND(t.price)}</p>
          <p className="mt-1 font-mono text-xs text-slate-400">{t.id}</p>
        </div>
      </div>
    </li>
  );
}
