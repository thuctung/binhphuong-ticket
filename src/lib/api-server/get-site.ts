import apiServer from "@/axios/apiServer";
import { GET_HOME_HIGHLIGHTS } from "@/commons/apiURL";

export const getSitesHomePage = async () => {
  try {
    const { data } = await apiServer.get(GET_HOME_HIGHLIGHTS);
    return data || [];
  } catch (error) {
    return [];
  }
};
