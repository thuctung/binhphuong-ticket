"use client";

import { QrCode, CreditCard, ShieldCheck } from "lucide-react";
import { CreatedOrder, PaymentMethodId } from "../types";
import { formatVND } from "@/lib/money";

// Thay bằng tài khoản nhận tiền của bạn (hoặc đặt trong .env)
const BANK = {
  id: process.env.NEXT_PUBLIC_BANK_ID ?? "VCB",
  account: process.env.NEXT_PUBLIC_BANK_ACCOUNT ?? "0123456789",
  name: process.env.NEXT_PUBLIC_BANK_NAME ?? "CONG TY ABC",
};

// Thẻ chỉ bật khi đã tích hợp cổng thanh toán thẻ (đặt NEXT_PUBLIC_ENABLE_CARD=true trong .env)
const CARD_ENABLED = process.env.NEXT_PUBLIC_ENABLE_CARD === "true";

const METHODS: { id: PaymentMethodId; name: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: "qr",
    name: "Quét mã QR",
    desc: "App ngân hàng, MoMo, ZaloPay",
    icon: <QrCode className="h-5 w-5" />,
  },
  {
    id: "card",
    name: "Thẻ tín dụng / ghi nợ",
    desc: "Visa, Mastercard, JCB",
    icon: <CreditCard className="h-5 w-5" />,
  },
];

type Props = {
  value: PaymentMethodId | null;
  onChange: (id: PaymentMethodId) => void;
  order: CreatedOrder | null; // có sau khi server tạo đơn
};

export function PaymentMethods({ value, onChange, order }: Props) {
  const qrUrl = order
    ? `https://img.vietqr.io/image/${BANK.id}-${BANK.account}-compact2.png` +
      `?amount=${order.amount}&addInfo=${encodeURIComponent(order.orderCode)}` +
      `&accountName=${encodeURIComponent(BANK.name)}`
    : null;

  return (
    <fieldset className="space-y-3 rounded-2xl bg-white shadow-[0_12px_32px_-16px_rgba(28,91,65,0.35)] ring-1 ring-slate-900/5 p-5">
      <legend className="sr-only">Phương thức thanh toán</legend>
      <h2 className="text-base font-bold text-slate-900">Phương thức thanh toán</h2>

      <div className="space-y-2">
        {METHODS.map((m) => {
          const disabled = m.id === "card" && !CARD_ENABLED;
          const selected = value === m.id && !disabled;
          return (
            <div key={m.id}>
              <label
                className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${disabled ? "" : "cursor-pointer"} ${
                  disabled
                    ? "cursor-not-allowed border-slate-200 opacity-50"
                    : selected
                      ? "border-[#1c5b41] bg-[#1c5b41]/5"
                      : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={selected}
                  disabled={disabled}
                  onChange={() => onChange(m.id)}
                  className="sr-only"
                />
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    selected ? "bg-[#1c5b41] text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {m.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-900">{m.name}</span>
                  <span className="block truncate text-xs text-slate-500">
                    {disabled ? "Sắp ra mắt" : m.desc}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                    selected
                      ? "border-[#fe9614] bg-[#fe9614] ring-2 ring-inset ring-white"
                      : "border-slate-300"
                  }`}
                />
              </label>

              {/* Chuyển khoản QR: hiện QR + nội dung CK sau khi đã có mã đơn */}
              {selected && m.id === "qr" && (
                <div className="mt-2 rounded-xl bg-slate-50 p-4">
                  {order && qrUrl ? (
                    <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrUrl}
                        alt="Mã QR chuyển khoản"
                        className="h-36 w-36 shrink-0 rounded-lg bg-white"
                      />
                      <dl className="space-y-1 text-sm text-slate-600">
                        <div>
                          Ngân hàng: <b>{BANK.id}</b>
                        </div>
                        <div>
                          Số tài khoản: <b>{BANK.account}</b>
                        </div>
                        <div>
                          Số tiền: <b>{formatVND(order.amount)}</b>
                        </div>
                        <div>
                          Nội dung: <b className="break-all text-[#1c5b41]">{order.orderCode}</b>
                        </div>
                        <p className="pt-1 text-xs text-slate-500">
                          Giữ nguyên nội dung chuyển khoản để chúng tôi biết bạn thanh toán đơn nào.
                        </p>
                      </dl>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600">
                      Bấm Thanh toán để nhận mã QR kèm nội dung chuyển khoản. Quét được bằng app
                      ngân hàng, MoMo hoặc ZaloPay.
                    </p>
                  )}
                </div>
              )}

              {/* Thẻ: không thu thông tin thẻ ở web mình, chuyển sang cổng thanh toán */}
              {selected && m.id === "card" && (
                <div className="mt-2 flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1c5b41]" />
                  Bạn sẽ được chuyển sang cổng thanh toán để nhập thông tin thẻ.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
