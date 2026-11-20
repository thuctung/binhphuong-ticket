import api from "@/axios";
import { ORDER_ITEM_AFTER_PAYMENT } from "@/commons/apiURL";
import { useCommonStore } from "@/stores/useCommonStore";
import { CommonType } from "@/types";
const { setToastMessage }: CommonType | any = useCommonStore.getState();

export const getOrderItem = async (orderCode: string) => {
  try {
    const { data }: any = await api.post(ORDER_ITEM_AFTER_PAYMENT, { orderCode });
    return data;
  } catch (e) {
    setToastMessage("Có lỗi xảy ra! Thử lại sau");
  }
};
