import apiServer from "@/axios/apiServer";
import { GET_ORDER_DETAIL_BY_CODE } from "@/commons/apiURL";

export const getOrderDetail = async (orderCode: string) => {
  try {
    const { data } = await apiServer.post(GET_ORDER_DETAIL_BY_CODE, { orderCode });
    return data || [];
  } catch (error) {
    return [];
  }
};
