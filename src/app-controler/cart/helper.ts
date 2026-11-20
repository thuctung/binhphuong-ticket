import { ProductSubmitType, TicketResultQRType } from "@/types/ticket";
import { PayloadGetTicketSunType } from "../buy-ticket/type";
import { getTicketSunWorld } from "../checkout-client/api";
import { downloadTicketPDF } from "@/helpers/ticket";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getTicketForCustomer = async (
  currentOrderData: any,
  productSelected: ProductSubmitType[],
  email: string,
  route: AppRouterInstance,
  callback?: Function
) => {
  const { orderCode, orderId, dateUse } = currentOrderData;
  const paramGetTicket: PayloadGetTicketSunType = {
    orderCode,
    productSelected,
    orderId,
    dateUse,
    customerEmail: email,
  };

  const { customerTickets } = await getTicketSunWorld(paramGetTicket);

  if (customerTickets?.length) {
    await downloadTicketPDF(customerTickets, []);
    if (callback) {
      callback();
    }
    route.push(`/order-success/${currentOrderData.thirdPartyNum}`);
  }
};
