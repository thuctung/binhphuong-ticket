"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getTicketSunWorld } from "../checkout-client/api";

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
        // let order = await getOrderByCode(orderCode);
        let order = {
          idx: 0,
          id: "06ca164e-219f-42e7-b81d-b731c06541b0",
          user_id: null,
          total_amount: "550000",
          status: "pending",
          created_at: "2026-11-20 10:44:50.067348+00",
          description: null,
          payment_method: "customer",
          user_email: "sdfsdfsdf@gmail.com",
          phone: "0987654342",
          payment_code: "CMT1U749458CG75",
          paid_at: null,
          buy_by: null,
          order_code: "0010160322",
          reference_code: null,
          site_code: "BNC",
          third_party_number: "N2WZ4UG8VZ0X6H",
          fullname: "sdfsfsd",
          status_payment: "pending",
          payment_type: null,
          momo_payment_id: "Thanh toan ve 0010160322",
        };
        if (!order) return fail("not_found");
        if (Number(order.total_amount) !== amount) return fail("amount_mismatch");

        // 2. Đã xử lý trước đó (F5, IPN...) → không tạo vé lần nữa
        if (order.status_payment === "SUCCESS" && order.status === "SUCCESS") {
          return router.replace(`/order-success/${order.third_party_number}`);
        }

        // 3. Giành quyền xử lý, tránh gọi Sun World 2 lần cho cùng 1 đơn
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
        // const tickets = await getTicketSunWorld({
        //   orderCode,
        //   productSelected: order.productSelected,
        //   orderId: order.orderId,
        //   dateUse: order.dateUse,
        //   customerEmail: order.customerEmail,
        // });
        // const ticketOk = Boolean(tickets?.length);

        // 5. Cập nhật DB: payment SUCCESS (tiền đã nhận) + ticket SUCCESS/FAILED
        // await completeOrder({ orderCode, transId, payType, amount, ticketOk });
        let ticketOk = false;
        if (!ticketOk) return fail("ticket"); // đã thu tiền nhưng chưa có vé → cần hỗ trợ

        // 6. Tải PDF (lỗi tải không được chặn việc chuyển trang)
        setText("Đang hoàn tất...");
        try {
          //   await downloadTicketPDF(tickets, []);
        } catch (e) {
          console.error("downloadTicketPDF", e);
        }

        // setCurrentOrderData(initOrderData);
        // router.replace(`/order-success/${order.thirdPartyNum}`);
      } catch (err) {
        console.error("[payment/result]", err);
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
