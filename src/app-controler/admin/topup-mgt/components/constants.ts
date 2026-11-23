import { STATUS_COMMON_TYPE } from "@/commons/constant";
import { StatusType } from "@/types";

export const getStatusTopupName = (status: string) => {
  switch (status) {
    case STATUS_COMMON_TYPE.APPROVED:
    case STATUS_COMMON_TYPE.COMPLETED:
      return "Thành công";
    case STATUS_COMMON_TYPE.PENDING:
      return "Đang xử lý";
    case STATUS_COMMON_TYPE.REJECTED:
      return "Thất bại";
    case STATUS_COMMON_TYPE.ERROR:
      return "Lỗi";
    default:
      return "";
  }
};

export const listTopupMgtStatus: StatusType[] = [
  { title: getStatusTopupName(STATUS_COMMON_TYPE.APPROVED), value: STATUS_COMMON_TYPE.APPROVED },
  { title: getStatusTopupName(STATUS_COMMON_TYPE.PENDING), value: STATUS_COMMON_TYPE.PENDING },
  { title: getStatusTopupName(STATUS_COMMON_TYPE.REJECTED), value: STATUS_COMMON_TYPE.REJECTED },
];

export const DrafDATA = {
  gateway: "MBBank",
  transactionDate: "2026-03-20 21:12:00",
  accountNumber: "66755886868",
  subAccount: null,
  code: null,
  content: "AFF5ATZE6NESS5X",
  transferType: "in",
  description: "BankAPINotify AFF5ATZE6NESS5X",
  transferAmount: 1000000,
  referenceCode: "FT26079067583586",
  accumulated: 0,
  id: 46130956,
};
