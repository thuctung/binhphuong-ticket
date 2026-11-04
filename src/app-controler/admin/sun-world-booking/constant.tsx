import { AGENT, CUSTOMER } from "@/commons/constant";
import { BASIC_DATE_FORMAT } from "@/helpers/dateTime";
import { AdminSearchReport } from "@/types";
import dayjs from "dayjs";

const df_From = dayjs(new Date()).add(-7, "day").format(BASIC_DATE_FORMAT);
const df_To = dayjs(new Date()).format(BASIC_DATE_FORMAT);

export const intForm: AdminSearchReport = {
  from: df_From,
  to: df_To,
  email: "",
  location: "all",
  status: "",
};

export const BuyMethod = [
  { name: "Đại lý", code: AGENT },
  { name: "Khách lẻ", code: CUSTOMER },
];

import { TYPE_TRANSACTION } from "@/commons/constant";

import { StatusType } from "@/types";
export const KEY_STATUS_TICKET = {
  ["Used"]: "Used",
  ["Unused"]: "Unused",
  ["Expired"]: "Expired",
};

export const StatusData = {
  [KEY_STATUS_TICKET.Used]: "Đã sử dụng",
  [KEY_STATUS_TICKET.Unused]: "Chưa sử dụng",
  [KEY_STATUS_TICKET.Expired]: "Hết hạn",
};

export const statusClass: Record<string, string> = {
  [KEY_STATUS_TICKET.Used]: "text-blue-600 bg-blue-100 ",
  [KEY_STATUS_TICKET.Unused]: "text-green-600 bg-green-100 ",
  [KEY_STATUS_TICKET.Expired]: "text-red-600 bg-red-100 ",
};
