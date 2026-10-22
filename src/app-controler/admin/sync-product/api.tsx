import api from "@/axios";
import {
  GET_PRODUCT_FILTER,
  GET_PRODUCT_IN_SYSTEM,
  SUN_GET_PRODOCT_LIST,
  UPDATE_PRODUCT_PRICES,
} from "@/commons/apiURL";
import { useCommonStore } from "@/stores/useCommonStore";
import { CommonType, SearchTableType } from "@/types";
import { ProductUpdatePriceType, SearchProductType } from "./type";

const { setToastMessage, setGlobalLoading }: CommonType | any = useCommonStore.getState();

export const getProductToSync = async (siteCodes: string, date: string) => {
  try {
    const [dataSun, dataSystem] = await Promise.all([
      api.post(SUN_GET_PRODOCT_LIST, {
        siteCodes,
        date,
      }),
      api.post(GET_PRODUCT_IN_SYSTEM, { site_code: siteCodes }),
    ]);

    if (dataSun.data.result && dataSystem.data) {
      return [dataSun.data.result, dataSystem.data];
    }
    return [];
  } catch (e) {
    setToastMessage("Có lỗi xảy ra! Thử lại sau");
  }
};

export const updateProductPrices = async (listProducts: ProductUpdatePriceType[]) => {
  try {
    setGlobalLoading(true);
    const { data } = await api.post(UPDATE_PRODUCT_PRICES, {
      listProducts,
    });

    if (data.errors?.[0]) {
      setToastMessage(data.errors?.[0]);
    }
    return true;
  } catch (error) {
    setToastMessage("Có lỗi xảy ra");
  } finally {
    setGlobalLoading(false);
  }
};

export const getProductByFilter = async (params: SearchTableType<SearchProductType>) => {
  try {
    setGlobalLoading(true);
    const { data } = await api.post(GET_PRODUCT_FILTER, params);

    if (data.errors?.[0]) {
      setToastMessage(data.errors?.[0]);
    }
    return data;
  } catch (error) {
    setToastMessage("Có lỗi xảy ra");
  } finally {
    setGlobalLoading(false);
  }
};
