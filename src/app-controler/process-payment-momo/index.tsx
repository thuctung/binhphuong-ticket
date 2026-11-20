"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getTicketSunWorld } from "../checkout-client/api";
import { getOrderItem } from "./apis";
import { OrderDetailType, OrderType } from "@/types";
import { getTicketForCustomer } from "../cart/helper";

type Props = { orderCode: string; amount: number; transId: string; payType: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ProcessPaymentMomo({ orderCode, amount, transId, payType }: Props) {
  const router = useRouter();
  const started = useRef(false);
  const [text, setText] = useState("Đang xác nhận thanh toán...");

  useEffect(() => {
    if (started.current) return; // chặn chạy 2 lần (React StrictMode)
    started.current = true;

    const fail = (reason: string) => router.replace(`/order-failed?reason=${reason}`);

    (async () => {
      try {
        const order: OrderType = await getOrderItem(orderCode);
        if (!order) return fail("not_found");

        if (Number(order.total_amount) !== amount) return fail("amount_mismatch");

        // 2. Đã xử lý trước đó (F5, IPN...) → không tạo vé lần nữa
        if (order.status_payment === "SUCCESS" && order.status === "SUCCESS") {
          return router.replace(`/order-success/${order.third_party_number}`);
        }

        // 3. xử lý, tránh gọi Sun World 2 lần cho cùng 1 đơn
        // const { claimed } = await claimOrder(orderCode);
        let claimed = false;
        if (!claimed) {
          setText("Đơn hàng đang được xử lý...");
          for (let i = 0; i < 15; i++) {
            await sleep(2000);
            // order = await getOrderByCode(orderCode);
            // if (order?.ticketStatus === "SUCCESS") {
            //   return router.replace(`/order-success/${order.thirdPartyNum}`);
            // }
          }
          return fail("processing");
        }

        // 4. Lấy vé từ Sun World (giữ nguyên logic của confirmBookingSunworld)
        setText("Đang tạo vé...");
        const currentOrderData = {
          orderCode: order.order_code,
          orderId: order.id,
          dateUse: order.order_items[0].date_use,
        };
        const listProductSelected = sessionStorage.getItem("PRODUCT_SELECTED")!;

        await getTicketForCustomer(
          currentOrderData,
          JSON.parse(listProductSelected),
          order.user_email,
          router
        );

        sessionStorage.removeItem("PRODUCT_SELECTED");
      } catch (err) {
        fail("error");
      }
    })();
  }, [orderCode, amount, transId, payType, router]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-4 text-center">
      <svg
        className="size-12 animate-spin text-blue-600"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
          className="opacity-20"
        />
        <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div>
        <p className="text-lg font-bold text-slate-900">{text}</p>
        <p className="mt-1 text-sm text-slate-500">Vui lòng không đóng hoặc tải lại trang.</p>
      </div>
    </main>
  );
}
