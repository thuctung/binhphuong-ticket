"use client";

import { Minus, Plus, Trash2, Ticket } from "lucide-react";
import Link from "next/link";
import { ProductInCartType } from "@/types/ticket";
import { formatVND } from "@/lib/money";

const STUB_GRADIENTS = [
  "from-[#1c5b41] to-[#2f8a63]",
  "from-[#fe9614] to-[#ffb84d]",
  "from-[#164a35] to-[#3b7d5f]",
];

type Props = {
  items: ProductInCartType[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export function CartItemList({ items, onIncrease, onDecrease, onRemove }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <Ticket className="h-10 w-10 text-slate-300" />
        <p className="font-semibold text-slate-700">Chưa có vé nào trong giỏ</p>
        <p className="text-sm text-slate-500">Chọn vé bạn muốn mua để thêm vào giỏ hàng.</p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-[#1c5b41] px-5 py-2 text-sm font-semibold text-white hover:bg-[#164a35]"
        >
          Xem vé
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li
          key={item.product.code}
          className="relative flex rounded-2xl bg-white shadow-[0_12px_32px_-16px_rgba(28,91,65,0.35)] ring-1 ring-slate-900/5"
        >
          {/* khuyết vé */}
          <span
            aria-hidden
            className="absolute -top-2 left-12 h-4 w-4 sm:left-[88px] rounded-full bg-[#f3f6f4]"
          />
          <span
            aria-hidden
            className="absolute -bottom-2 left-12 h-4 w-4 sm:left-[88px] rounded-full bg-[#f3f6f4]"
          />

          {/* cuống vé */}
          <div
            className={`flex w-14 shrink-0 items-center sm:w-24 justify-center rounded-l-2xl bg-gradient-to-br bg-cover bg-center ${
              STUB_GRADIENTS[idx % STUB_GRADIENTS.length]
            }`}
          >
           <Ticket className="h-6 w-6 text-white/90 sm:h-8 sm:w-8" />
          </div>

          {/* đường xé */}
          <div aria-hidden className="my-3 border-l-2 border-dashed border-slate-200" />

          <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="line-clamp-2 font-semibold leading-snug text-slate-900">
                  {item.product.name} 
                </p>
                  {item.product.restaurantName || ''} 

                {/* {item.desc && <p className="truncate text-sm text-slate-500">{item.desc}</p>} */}
              </div>
              <button
                type="button"
                onClick={() => onRemove(item.product.code)}
                aria-label={`Xóa ${item.product.name}`}

                className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#fe9614]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <div className="inline-flex items-center rounded-full border border-slate-200">
                <button
                  type="button"
                  onClick={() => onDecrease(item.product.code)}
                  disabled={item.quantity <= 1}
                  aria-label="Giảm số lượng"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold tabular-nums">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onIncrease(item.product.code)}
                  aria-label="Tăng số lượng"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="ml-auto text-right">
                <p className="text-[15px] font-bold text-[#1c5b41] tabular-nums sm:text-base">
                  {formatVND(item.product.unitPrice * item.quantity)}
                </p>
                {item.quantity > 1 && (
                  <p className="text-xs text-slate-400 tabular-nums">
                    {formatVND(item.product.unitPrice)} / vé
                  </p>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
