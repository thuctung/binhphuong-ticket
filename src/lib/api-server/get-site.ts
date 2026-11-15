import apiServer from "@/axios/apiServer";
import { GET_HOME_HIGHLIGHTS, GET_ORDER_DETAIL_BY_CODE } from "@/commons/apiURL";

export const getSitesHomePage = async () => {
  try {
    const { data } = await apiServer.get(GET_HOME_HIGHLIGHTS);
    return data || [];
  } catch (error) {
    return [];
  }
};
