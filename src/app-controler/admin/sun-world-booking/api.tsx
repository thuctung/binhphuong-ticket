import api from "@/axios";
import {
  GET_PROFILE_BY_ORDER,
  SUN_CHECK_USEGE_TICKET,
  SUN_GET_BALANCE,
  SUN_GET_CHARGE_REFUND,
  SUN_GET_ORDER,
  SUN_REFUND_TICKET,
  SUN_TICKET_LISTING,
} from "@/commons/apiURL";
import { useCommonStore } from "@/stores/useCommonStore";
import { CommonType } from "@/types";
import {
  CheckChargeRefundType,
  CheckStatusTicketType,
  ParamStatusTicketType,
  RefuncTicketSubmitType,
} from "./type";

const { setToastMessage, setGlobalLoading }: CommonType | any = useCommonStore.getState();

export const getStatusBooking = async (orderCode: string) => {
  try {
    setGlobalLoading(true);
    const { data }: any = await api.post(SUN_GET_ORDER, { orderCode });
    if (data.result) {
      return data.result;
    } else if (data.messages[0]) {
      setToastMessage(data.messages[0]);
      return null;
    }
    return null;
  } catch (e) {
    setToastMessage("Có lỗi xảy ra! Thử lại sau");
  } finally {
    setGlobalLoading(false);
  }
};

export const getStatusTicket = async (prams: ParamStatusTicketType) => {
  try {
    setGlobalLoading(true);
    const { data, error }: any = await api.post(SUN_TICKET_LISTING, prams);
    if (data.errors?.length) {
      setToastMessage(data.messages?.[0] || "");
      return;
    }
    return data.result;
  } catch (e) {
    setToastMessage("Có lỗi xảy ra! Thử lại sau");
  } finally {
    setGlobalLoading(false);
  }
};

export const getCharegeRefund = async (prams: CheckChargeRefundType) => {
  try {
    setGlobalLoading(true);
    const { data, error }: any = await api.post(SUN_GET_CHARGE_REFUND, prams);
    if (data.success) {
      return data.result;
    }
    setToastMessage(data.messages?.[0] || "");
    return;
  } catch (e) {
    setToastMessage("Có lỗi xảy ra! Thử lại sau");
  } finally {
    setGlobalLoading(false);
  }
};

export const refundTicket = async (prams: RefuncTicketSubmitType) => {
  try {
    setGlobalLoading(true);
    const { data, error }: any = await api.post(SUN_REFUND_TICKET, prams);
    if (data.success) {
      return data.result;
    }
    setToastMessage(data.messages?.[0] || "");
    return;
  } catch (e) {
    setToastMessage("Có lỗi xảy ra! Thử lại sau");
  } finally {
    setGlobalLoading(false);
  }
};

export const checkUsegeTicket = async (prams: CheckStatusTicketType) => {
  try {
    setGlobalLoading(true);
    const { data, error }: any = await api.post(SUN_CHECK_USEGE_TICKET, prams);
    if (data.success) {
      return data.result;
    }
    setToastMessage(data.messages?.[0] || "");
    return;
  } catch (e) {
    setToastMessage("Có lỗi xảy ra! Thử lại sau");
  } finally {
    setGlobalLoading(false);
  }
};

export const getCurrentMoeny = async () => {
  try {
    const { data } = await api.get(SUN_GET_BALANCE);

    if (data.errors?.[0]) {
      setToastMessage(data.errors?.[0]);
    }
    return data.result;
  } catch (error) {
    setToastMessage("Có lỗi xảy ra");
  } finally {
    setGlobalLoading(false);
  }
};

export const getInforPersonOrder = async() => {
  try {
    const { data } = await api.get(SUN_GET_BALANCE);

    if (data.errors?.[0]) {
      setToastMessage(data.errors?.[0]);
    }
    return data.result;
  } catch (error) {
    setToastMessage("Có lỗi xảy ra");
  } finally {
    setGlobalLoading(false);
  }
}

export const getProfileOrder = async(orderCode:string) => {
try {
    const { data } = await api.post(GET_PROFILE_BY_ORDER,{
      orderCode
    });
    return data
  } catch (error) {
    setToastMessage("Có lỗi xảy ra");
  } finally {
    setGlobalLoading(false);
  }
}