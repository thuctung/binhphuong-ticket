export type ParamStatusTicketType = {
  orderCode: string;
  siteCode: string;
};

export type TicketStatusType = {
  productName: string;
  siteCode: string;
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
