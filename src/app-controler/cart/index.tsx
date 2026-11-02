"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { CartItemList } from "./components/CartItemList";
import { OrderSummary } from "./components/OrderSummary";
import { PaymentMethods } from "./components/PaymentMethods";
import { RouteDecor } from "./components/RouteDecor";
import { CartItem, Coupon, PaymentMethodId, formatVND, CreatedOrder } from "./types";
import { CustomerForm } from "./components/CustomerForm";
import { CustomerInfo, EMPTY_CUSTOMER, validateCustomer } from "./components/customer";
import { calcTotals, findCoupon } from "./calc";
import { useCartStore } from "@/stores/useCartStore";

const DRAFT_ITEMS: CartItem[] = [
  { id: "p1", name: "Vé Bà Nà Hills", desc: "Người lớn · gồm cáp treo", price: 900000, qty: 2 },
  {
    id: "p2",
    name: "Vé tham quan phố cổ Hội An",
    desc: "Dùng trong 24 giờ",
    price: 120000,
    qty: 2,
  },
  {
    id: "p3",
    name: "Vé cano Cù Lao Chàm",
    desc: "Khứ hồi · khởi hành 8:00",
    price: 350000,
    qty: 1,
  },
];

export default function CartController() {
  const itemsCart = useCartStore((s) => s.items);
  console.log(
    "🚀 ~ file: index.tsx:34 ~ CartController ~ itemsCart:",
    itemsCart.values().toArray()
  );

  const [items, setItems] = useState<CartItem[]>(DRAFT_ITEMS);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [payment, setPayment] = useState<PaymentMethodId | null>("qr");

  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY_CUSTOMER);
  const [submitted, setSubmitted] = useState(false); // đã bấm Thanh toán -> hiện hết lỗi

  const [order, setOrder] = useState<CreatedOrder | null>(null); // chỉ dùng cho chuyển khoản QR
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const increase = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const decrease = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)));
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const applyCoupon = (code: string) => {
    const found = findCoupon(code);
    if (!found) {
      setCoupon(null);
      setCouponError("Mã không hợp lệ hoặc đã hết hạn.");
      return;
    }
    setCoupon(found);
    setCouponError("");
  };
  const removeCoupon = () => {
    setCoupon(null);
    setCouponError("");
  };

  const { subtotal, discount, total } = useMemo(() => calcTotals(items, coupon), [items, coupon]);
  const customerErrors = useMemo(() => validateCustomer(customer), [customer]);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const canCheckout = items.length > 0 && !!payment && !submitting;

  // Giỏ hàng / mã / phương thức đổi -> QR cũ không còn đúng số tiền, bỏ đi
  useEffect(() => {
    setOrder(null);
    setError("");
  }, [total, payment, customer]);

  const handleCheckout = async () => {
    // Đã có QR -> khách báo đã chuyển khoản, sang trang kết quả theo mã đơn
    if (order) {
      // router.push(`/cart/result?code=${order.orderCode}`);
      return;
    }

    // Kiểm tra thông tin liên hệ trước khi tạo đơn
    const firstInvalid = (["name", "email", "phone"] as const).find((k) => customerErrors[k]);
    if (firstInvalid) {
      setSubmitted(true);
      document.getElementById(`customer-${firstInvalid}`)?.focus();
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          couponCode: coupon?.code ?? null,
          method: payment,
          customer,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Không tạo được đơn hàng.");

      if (payment === "qr") {
        setOrder({ orderCode: data.orderCode, amount: data.amount });
      } else {
        // thẻ: sang cổng thanh toán, URL đã đính kèm mã đơn
        window.location.href = data.paymentUrl;
        return; // giữ trạng thái submitting trong lúc chuyển trang
      }
    } catch (e: any) {
      setError(e.message ?? "Có lỗi xảy ra, vui lòng thử lại.");
    }
    setSubmitting(false);
  };

  const buttonLabel = submitting
    ? "Đang xử lý..."
    : order
      ? "Tôi đã chuyển khoản"
      : `Thanh toán ${items.length > 0 ? formatVND(total) : ""}`;

  return (
    <div className="min-h-screen bg-[#f3f6f4]">
      {/* Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1c5b41] to-[#123d2b] pb-24 pt-8 sm:pb-28 md:pb-32 md:pt-14">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(254,150,20,0.28),transparent_45%)]"
        />
        <RouteDecor className="pointer-events-none absolute right-0 top-0 h-full w-[300px] opacity-30 sm:w-[460px] sm:opacity-100" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">Giỏ hàng</h1>
          <p className="mt-2 text-sm text-white/70 md:text-base">
            {items.length > 0
              ? `${totalQty} vé đang chờ bạn thanh toán`
              : "Chưa có vé nào được chọn"}
          </p>
        </div>
      </section>

      <main className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 pb-24 sm:-mt-20 md:-mt-24 md:px-6">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <section aria-label="Vé đã chọn">
              <CartItemList
                items={items}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={remove}
              />
            </section>
            <CustomerForm
              value={customer}
              onChange={setCustomer}
              errors={customerErrors}
              showAllErrors={submitted}
            />
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              appliedCoupon={coupon}
              couponError={couponError}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
            />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <PaymentMethods value={payment} onChange={setPayment} order={order} />

            <button
              type="button"
              onClick={handleCheckout}
              disabled={!canCheckout}
              className="w-full rounded-full bg-gradient-to-r from-[#fe9614] to-[#ffb039] py-3.5 text-base font-bold text-white shadow-[0_10px_24px_-8px_rgba(254,150,20,0.7)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {buttonLabel}
            </button>

            {error && <p className="text-center text-sm text-red-500">{error}</p>}
            {items.length > 0 && !payment && (
              <p className="text-center text-sm text-slate-500">
                Chọn phương thức thanh toán để tiếp tục.
              </p>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
