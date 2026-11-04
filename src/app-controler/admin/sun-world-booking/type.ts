export type ParamStatusTicketType = {
  orderCode: string;
  siteCode: string;
};

export type TicketStatusType = {
  productName: string;
  siteCode: string;
  status:string;
  ticketNumber: string;
  usageStatus: string;
  productCode: string;
  validDateTo: string;
  validDateFrom: string;
};

export type ItemRefundType = {
  siteCode: string;
  ticketNumber: string;
};

export type CheckChargeRefundType = {
  thirdPartyNumber: string;
  returnDate: string;
  items: ItemRefundType[];
};

export type TicketRunfundType = {
  email: string;
  fullname: string;
  referenceThirdPartyNumber: string;
  tickets: ItemRefundType[];
};

export type RefuncTicketSubmitType = {
  thirdPartyNumber: string;
  returnReason: string;
  referenceOrders: TicketRunfundType[];
};

export type RefundItem = {
  productId: string;
  ticketNumber: string;
  returnRate: number;
  numberReturnDate: number;
  usageDateFrom: string;
  usageDateTo: string;
  unitPrice: number;
  returnCharge: number;
};

export type RefundInfo = {
  thirdPartyNumber: string;
  sapThirdPartyNumber: string;
  returnDate: string;
  totalReturnCharge: number;
  items: RefundItem[];
};

export type CheckStatusTicketType = {
  siteCode: string;
  ticketNumbers: string[];
};

export type StatusTicketListType = {
  siteCode: string;
  usageStatus: string;
  status: string;
  productName: string;
  firstUsageDateTime: string;
  validDateTo: string;
  ticketNumber: string;
};
