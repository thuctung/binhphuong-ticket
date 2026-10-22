import { formatVND } from "@/lib/money";
import { SiteType } from "@/types/ticket";

export const fieldStyle =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";

const cacheData = new Map();

export const getSideItem = (siteCode: string, siteList: SiteType[]): SiteType | null => {
  let siteItem = cacheData.get(siteCode);

  if (siteItem) {
    return siteItem;
  }
  siteItem = siteList.find((item) => item.code === siteCode);
  if (siteItem) {
    cacheData.set(siteCode, siteItem);
    return siteItem;
  }
  return null;
};

export const DISCOUNT_TYPE_PRICE = {
  FIX_VALUE: "FIX_VALUE",
  PERCENT: "PERCENT",
};

export const LIST_OPTION_DISCOUNT = [
  { code: DISCOUNT_TYPE_PRICE.FIX_VALUE, name: "Theo giá" },
  { code: DISCOUNT_TYPE_PRICE.PERCENT, name: "Theo phần trăm" },
];

export const getNoteTextDiscount = (agentCode: string, value: number, typeDiscount: string) => {
  if (typeDiscount === DISCOUNT_TYPE_PRICE.FIX_VALUE) {
    if (agentCode === "customer" || agentCode === "register") {
      return `Thêm ${formatVND(value)} vào giá công bố`;
    }
    return `Thêm ${formatVND(value)} vào giá gốc`;
  } else if (agentCode === "customer" || agentCode === "register") {
    return `Giảm ${value}% vào giá công bố`;
  }
  return `Giảm ${value}% vào  giá gốc`;
};
