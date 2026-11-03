import { BASIC_DATE_FORMAT } from "@/helpers/dateTime";
import { CategorySubmitType, ProductBanaType } from "@/types/ticket";
import dayjs from "dayjs";
import { get } from "lodash";

export const toDate = dayjs(new Date()).format(BASIC_DATE_FORMAT);

let cacheCategory: any = {};
export const getCategaryItem = (
  categoryCode: string,
  listCategory: CategorySubmitType[]
): CategorySubmitType | null => {
  const cateItem = get(cacheCategory, categoryCode);
  if (cateItem) {
    return cateItem;
  }
  if (listCategory.length) {
    const fintCategoryItem = listCategory.find((item) => item.code === categoryCode);
    if (fintCategoryItem) {
      cacheCategory[fintCategoryItem.code] = fintCategoryItem;
      return fintCategoryItem;
    }
    return null;
  }
  return null;
};

export const BADGE_STYLES: Record<string, string> = {
  ADULT: "bg-gradient-to-br from-[#ff4d4d] to-[#e11d48] text-white",
  CHILD: "bg-gradient-to-br from-sky-500 to-sky-400 text-white",
  SENIOR: "bg-gradient-to-br from-violet-500 to-violet-400 text-white",
  DEFAULT: "bg-gradient-to-br from-yellow-500 to-yellow-400 text-white",
};

export const getImageProduct = (product: ProductBanaType) => {
  switch (product.site_code) {
    case "BNC": {
      if (product.restaurantName) {
        return "/ba-na/buffet.png";
      }
      return "/ba-na/ve-thuong.png";
    }
  }
};
