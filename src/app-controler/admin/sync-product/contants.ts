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
  console.log("lopp");
  if (siteItem) {
    cacheData.set(siteCode, siteItem);
    return siteItem;
  }
  return null;
};
