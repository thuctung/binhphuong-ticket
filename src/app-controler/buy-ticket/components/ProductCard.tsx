"use client";

import { stepBtn } from "@/components/ui/const-class";
import { formatVND } from "@/lib/money";
import { AgentPriceType, CategorySubmitType, ProductBanaType } from "@/types/ticket";
import PinIcon from "./PinIcon";
import { useState } from "react";
import CartIcon from "./CartIcon";
import { CUSTOMER } from "@/commons/constant";
import { useCartStore } from "@/stores/useCartStore";
import { getPriceAgentAndMultiple } from "@/components/GetTicketForm/constants";
import { Soup, UtensilsCrossed } from "lucide-react";
import { BADGE_STYLES, getCategaryItem, getImageProduct } from "../contants";
import ProductDetailModal from "./ProdcutDetail";

type Props = {
  product: ProductBanaType;
  mapAgentPrice: Map<string, AgentPriceType>;
  agentPriceDefault: number;
  quantity: number;
  lisCategory: CategorySubmitType[];
};
const MAX = 99;
const MIN = 0;
export default function ProductCard({
  product,
  quantity,
  mapAgentPrice,
  agentPriceDefault,
  lisCategory,
}: Props) {
  const setCartItems = useCartStore((s) => s.addItem);
  const [tampQty, setTempQty] = useState(quantity);
  const [openDetail, setOpenDetail] = useState(false);

  const step = Math.max(1, product.multiple || 1);
  const maxQty = Math.floor(MAX / step) * step;

  const normalize = (n: number) => {
    const snapped = Math.round(n / step) * step;
    return Math.min(maxQty, Math.max(MIN, snapped));
  };

  const handleAddCart = () => {
    if (tampQty > 0) {
      setCartItems({ product, quantity: tampQty });
    }
  };

  const handleIncrease = () => setTempQty((prev) => normalize(prev + step));

  const handleDecrease = () => setTempQty((prev) => normalize(prev - step));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTempQty(Number.isNaN(value) ? 0 : Math.min(MAX, Math.max(MIN, value)));
  };
  const handleInputBlur = () => setTempQty((prev) => normalize(prev));

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white p-3 shadow-lg shadow-ink/10 md:flex-row md:gap-5 md:p-4">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl md:aspect-auto md:min-h-[240px] md:w-72 lg:w-80">
        <img
          src={`/buy-ticket-image/${getImageProduct(product)}`}
          alt={product.name}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

        <span
          className={`absolute left-3 top-3 rounded-full px-3.5 py-1.5 font-display text-sm font-bold text-ink shadow ${BADGE_STYLES[product.personType] || BADGE_STYLES["DEFAULT"]}`}
        >
          {getCategaryItem(product.personType, lisCategory)?.name}
        </span>

        <button
          type="button"
          onClick={() => setOpenDetail(true)}
          className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1 text-sm font-medium text-white hover:underline focus-visible:outline-none focus-visible:underline"
        >
          Tìm hiểu thêm
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4 md:px-0 md:py-1">
        <h3 className="font-display text-lg font-bold uppercase leading-snug md:text-xl">
          {product.name}
        </h3>
        {product.restaurantName ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-ink/60">
            <Soup color="#22acf9" />
            <span className="text-sm font-semibold text-[#22acf9]">{product.restaurantName}</span>
          </p>
        ) : (
          <span className="text-sm font-semibold text-[#5ae444]">Vé thường</span>
        )}

        <div className="mt-auto">
          {/* Giá + số lượng */}
          <div className="mt-2 flex items-center justify-between gap-4 md:mt-4">
            <div>
              <p className="text-sm text-ink/45 line-through">{formatVND(product.publicPrice)}</p>

              <p className="font-display text-xl font-bold text-[#e5252a]">
                {formatVND(
                  getPriceAgentAndMultiple(product, CUSTOMER, mapAgentPrice, agentPriceDefault)
                )}
              </p>
            </div>

            <div className="flex items-center overflow-hidden rounded-lg border border-ink/15">
              <button
                type="button"
                aria-label="Giảm số lượng"
                className={stepBtn}
                disabled={!tampQty}
                onClick={handleDecrease}
              >
                −
              </button>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX}
                aria-label="Số lượng"
                value={tampQty}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="h-9 w-12 text-center text-base font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                aria-label="Tăng số lượng"
                className={stepBtn}
                disabled={tampQty >= MAX}
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <span>Vé phải là bội của: ${product.multiple}</span>
          </div>

          {/* Hành động */}
          <div className="mt-4 flex justify-end md:max-w-md">
            <button
              type="button"
              onClick={handleAddCart}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#f2a21d] bg-white px-3 py-3 font-semibold text-[#f26b1d] transition hover:bg-orange-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/50"
            >
              <CartIcon />
              Thêm giỏ hàng
            </button>
          </div>
        </div>
      </div>
      {openDetail && <ProductDetailModal product={product} onClose={() => setOpenDetail(false)} />}
    </article>
  );
}
