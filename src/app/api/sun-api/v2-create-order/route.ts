import { NextResponse } from "next/server";
import sunWorldApi from "@/axios/sunworldApi";
import { CreateOrderSunGroupPayload } from "@/app-controler/affi/getTicket/type";
import { TicketResultQRType } from "@/types/ticket";
import { rebuildDataTicket } from "@/helpers/ticket";
import { DB_TABLE_NAME } from "@/commons/constant";
import { getTicketFOCAndCutomer } from "@/app-controler/checkout-client/contants";
import { supabaseAdmin } from "@/lib/supabase/server";

import { KEY_MODIFY_DATA } from "@/app-controler/affi/stats/contants";
import { get } from "lodash";
import { updateOrderError } from "@/helpers/update-status-order";
import { downloadTicketPDFServer } from "@/helpers/ticket-server";
import { sendMailTicketBaNa } from "@/axios/resendMail";

export async function POST(req: Request) {
  const body: CreateOrderSunGroupPayload = await req.json();
  const { date_use, order_id, thirdPartyNumber, products, email, phone, fullname, haveFOC } = body;
  let orderCode = "";
  try {
    const { data: dataSunworld, error }: any = await sunWorldApi.post(`/v2/order/create`, {
      thirdPartyNumber,
      products,
      email,
      phone,
      fullname,
    });
    const { result, messages, success } = dataSunworld;
    orderCode = result?.orderCode || "";
    if (success) {
      const { data, error } = await supabaseAdmin.rpc(DB_TABLE_NAME.FUNC_COMPLETE_ORDER, {
        p_order_id: order_id,
        p_provider_order_code: result.orderCode,
        p_tickets: [],
        p_reference_code: result.referenceCode,
      });

      if (data) {
        const ticketBuild: TicketResultQRType[] = rebuildDataTicket(
          result,
          order_id,
          date_use,
          products
        );
        const siteName: any = get(ticketBuild, [0, "siteName"]);
        await Promise.allSettled([
          supabaseAdmin.from(DB_TABLE_NAME.TICKETS).insert(ticketBuild).select(),
          // supabaseAdmin.from(DB_TABLE_NAME.EMAIL_QUEUE).insert({
          //   email: email,
          //   order_id: order_id,
          //   site_name: siteName || "",
          //   order_code: result.orderCode,
          //   status: KEY_MODIFY_DATA.PENDING,
          //   is_send_foc: haveFOC,
          // }),
        ]);

        const { focTickets, customerTickets } = getTicketFOCAndCutomer(ticketBuild);

        // const pdfBuffer = await downloadTicketPDFServer(customerTickets, haveFOC ? focTickets : []);

        // Send Resend
        // await sendMailTicketBaNa({
        //   mail: email,
        //   siteName: siteName,
        //   orderCode: result.orderCode,
        //   fileAttch: pdfBuffer,
        // });

        return NextResponse.json(
          { data: { focTickets, customerTickets, data: dataSunworld }, messages: "" },
          { status: 200 }
        );
      } else {
        // LỖI TỪ DATABASE LƯU ORDER
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        await updateOrderError(order_id, `DATABASE-${errorMessage}`, result.orderCode);
        return NextResponse.json(
          {
            data: { focTickets: [], customerTickets: [] },
            messages: "Lỗi khi lưu thông tin vé. Vui lòng liên hệ hỗ trợ",
          },
          { status: 200 }
        );
      }
    } else {
      // LỖI TỪ SUNWORD
      const resMess = messages?.[0] || "Lỗi khi tạo vé";
      await updateOrderError(order_id, `SUNWORLD-${resMess}`);
      return NextResponse.json(
        { data: { focTickets: [], customerTickets: [] }, messages: resMess, dataSunworld },
        { status: 200 }
      );
    }
  } catch (error) {
    // LỖI CỦA FUNCION
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    await updateOrderError(order_id, `INSYSTEM-${errorMessage}`, orderCode);
    return NextResponse.json(error, { status: 500 });
  }
}
