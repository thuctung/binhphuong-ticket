"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { CartItemList } from "./components/CartItemList";
import { OrderSummary } from "./components/OrderSummary";
import { PaymentMethods } from "./components/PaymentMethods";
import { RouteDecor } from "./components/RouteDecor";
import { Coupon, PaymentMethodId, CreatedOrder } from "./types";
import { CustomerForm } from "./components/CustomerForm";
import { CustomerInfo, EMPTY_CUSTOMER, validateCustomer } from "./components/customer";
import { useCartStore } from "@/stores/useCartStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { CommonType, ProfileType, QRBankResponseType } from "@/types";
import { formatVND } from "@/lib/money";
import { useCommonStore } from "@/stores/useCommonStore";
import { getCodeTopup } from "@/helpers/genCode";
import { DB_TABLE_NAME, ERROR_MESSAGE, TYPE_TRANSFER } from "@/commons/constant";
import { downloadTicketPDF, generateThirdPartyCode } from "@/helpers/ticket";
import { getSideItem } from "../admin/product-mgt/contants";
import { ProductSubmitType, TicketReponseType, TicketResultQRType } from "@/types/ticket";
import {
  cancleBooking,
  customerCreateOrder,
  customerCreateOrderTicket,
  getTicketSunWorld,
  updateStatusOrder,
} from "../checkout-client/api";
import {
  ClientOrderItem,
  CustomerOrderType,
  PayloadGetTicketSunType,
} from "../checkout-client/type";
import dayjs from "dayjs";
import { BASIC_DATE_FORMAT, SERVER_DATE_FORMAT } from "@/helpers/dateTime";
import { getBankInfo } from "@/helpers/getQRBank";
import BankTransferQR from "../affi/topup/components/qrToBank";
import { KEY_MODIFY_DATA } from "../affi/stats/contants";
import { toast } from "react-toastify";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const initOrderData = {
  dateUse: "",
  orderCode: "",
  orderId: "",
  siteCode: "",
  thirdPartyNum: "",
  formData: {},
  in_system: false,
};

export default function CartController() {
  const clientSupbase = createSupabaseBrowserClient();

  const {
    items,
    siteCode,
    formData,
    siteList,
    getSites,
    clear: clearCart,
  } = useCartStore((s) => s);

  const itemsCart = items?.values()?.toArray();
  const timeCancelOrderRef = useRef<NodeJS.Timeout | null>(null);
  const chanenSupbase = useRef<any>(null);

  const profile: ProfileType = useProfileStore((state: any) => state.profile);
  const { showConfirm }: CommonType | any = useCommonStore.getState();

  const subTotal = itemsCart.reduce((sum, t) => {
    let price = t.product.pinalPrice || 0;
    return sum + price * (t.quantity ?? 0);
  }, 0);

  const [qrPaymant, setQRPayment] = useState<QRBankResponseType>({
    qr: "",
    code: "",
    amount: 0,
  });
  const [openQR, setOpenQR] = useState(false);

  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [payment, setPayment] = useState<PaymentMethodId | null>("qr");
  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY_CUSTOMER);

  const [currentOrderData, setCurrentOrderData] = useState<any>(initOrderData);
  const [productSelected, setProductSelected] = useState<ProductSubmitType[]>([]);

  const currentSite = useMemo(() => getSideItem(siteCode, siteList), [siteCode, siteList]);

  useEffect(() => {
    getSites();
  }, [getSites]);

  useEffect(() => {
    if (profile.email) {
      const { full_name, email, phone } = profile;
      setCustomer({
        fullname: full_name || "",
        email: email,
        phone: phone || "",
      });
    }
  }, [profile.email]);

  const [submitted, setSubmitted] = useState(false);

  const totalPayment = useMemo(() => {
    return subTotal;
  }, [subTotal, coupon]);

  const [order, setOrder] = useState<CreatedOrder | null>(null); // chỉ dùng cho chuyển khoản QR
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const applyCoupon = (code: string) => {
    const found = false;
    if (!found) {
      setCoupon(null);
      setCouponError("Mã không hợp lệ hoặc đã hết hạn.");
      return;
    }
    setCoupon(found);
    setCouponError("");
  };
  const removeCoupon = () => {
    setCoupon(null);
    setCouponError("");
  };

  const customerErrors = useMemo(() => validateCustomer(customer), [customer]);
  const canCheckout = itemsCart.length > 0 && !!payment && !submitting;

  const cancleOrderTimeout = async (
    orderId: string,
    desc = ERROR_MESSAGE.PAYMENT_TIMEOUT,
    showMesage = true
  ) => {
    await updateStatusOrder({
      orderId: orderId,
      status: KEY_MODIFY_DATA.CANCEL,
      description: desc,
      status_payment: KEY_MODIFY_DATA.ERROR,
    });
    if (timeCancelOrderRef.current) {
      clearTimeout(timeCancelOrderRef.current);
      timeCancelOrderRef.current = null;
    }
    setCurrentOrderData(initOrderData);

    if (showMesage) {
      toast.error("Đơn hàng đã hủy do hết thời gian thanh toán");
    }
    handleDoneQR();
  };

  const handleBuyTicket = async () => {
    const paymentCode = getCodeTopup(TYPE_TRANSFER.CUSTOMER);
    const in_system = currentSite?.in_system || false;
    const thirdPartyNum = generateThirdPartyCode(in_system);
    const { email, phone, fullname } = customer;
    let passProcess = true;
    let dataOrderSunWorld: TicketReponseType | any = {};
    let site_code = formData.site_code || currentSite?.code || "";
    let site_name = currentSite?.name || "";

    const products = itemsCart.map((item) => {
      site_code = item.product.site_code;
      site_name = item.product.site?.name || "";
      const itemSubmit: ProductSubmitType = {
        productCode: item.product.code,
        siteCode: site_code,
        siteName: site_name,
        quantity: item.quantity,
        usageDate: item.product?.pricePolicy?.usageDate || "",
        usageDateTo: item.product?.pricePolicy?.validDateTo || "",
        performanceId: item.product?.performances?.[0]?.performanceId || "",
        productsName: item.product.name,
        publicPrice: item.product.publicPrice,
        unitPrice: item.product.pinalPrice || 0,
        restaurantName: item.product?.restaurantName || "",
        personType: item.product.personType,
        time: `${item.product.openTime || ""}-${item.product.closeTime || ""}`,
      };
      return itemSubmit;
    });
    setProductSelected(products);
    const paramCreateOrder: CustomerOrderType = {
      email,
      phone,
      fullname,
      products,
      thirdPartyNumber: thirdPartyNum,
    };

    // STEP 1: CREATE ORDER WITH SUN WORLD
    if (!in_system) {
      dataOrderSunWorld = await customerCreateOrder(paramCreateOrder);
      if (!dataOrderSunWorld) {
        passProcess = false;
      }
    }
    // SUCCESS OF SUN WORLD
    const dataSubmit: ClientOrderItem = {
      userEmail: email,
      totalAmount: totalPayment,
      dateUse: dayjs(formData.date_use, BASIC_DATE_FORMAT).format(SERVER_DATE_FORMAT),
      phone,
      fullname: fullname,
      thirdPartyNum,
      listTicketSubmit: products,
      siteCode: site_code,
      paymentCode,
      orderCode: dataOrderSunWorld.orderCode || thirdPartyNum, // in system use thirdPartyNum for ordercde
    };
    const orderID = await customerCreateOrderTicket(dataSubmit);
    if (orderID) {
      const qrLink = getBankInfo(totalPayment, paymentCode);
      setQRPayment({
        qr: qrLink,
        code: paymentCode,
        amount: totalPayment,
      });
      setOpenQR(true);
      setCurrentOrderData({
        orderCode: dataOrderSunWorld.orderCode,
        products,
        orderId: orderID,
        dateUse: formData.date_use,
        siteCode,
        formData,
        thirdPartyNum,
        in_system,
        paymentCode,
        siteName: site_name,
      });
      // CANCLE ORDER TIMEOUT :
      timeCancelOrderRef.current = setTimeout(() => cancleOrderTimeout(orderID), 10 * 60 * 1000); // 10m
    }
  };

  const confirmBookingSunworld = async () => {
    const { orderCode, orderId, dateUse } = currentOrderData;
    const paramGetTicket: PayloadGetTicketSunType = {
      orderCode,
      productSelected,
      orderId,
      dateUse,
      customerEmail: customer.email,
    };

    const ticketCustomer: TicketResultQRType[] = await getTicketSunWorld(paramGetTicket);
    if (ticketCustomer?.length) {
      downloadTicketPDF(ticketCustomer, []);
      setCurrentOrderData(initOrderData);
      toast.success(`Vé đã được gửi qua email: ${customer.email}`);
    }
  };

  const getTicketSuccess = async () => {
    handleDoneQR();
    if (timeCancelOrderRef.current) {
      clearTimeout(timeCancelOrderRef.current);
      timeCancelOrderRef.current = null;
    }
    const { in_system } = currentOrderData;
    if (in_system) {
      // sendMailTicketInSystem();
      return;
    } else {
      confirmBookingSunworld();
    }
    clearCart();
  };

  const handleCheckout = () => {
    // Kiểm tra thông tin liên hệ
    const firstInvalid = (["fullname", "email", "phone"] as const).find((k) => customerErrors[k]);

    if (firstInvalid) {
      setSubmitted(true);
      document.getElementById(`customer-${firstInvalid}`)?.focus();
      return;
    }

    showConfirm({
      message: "Thông tin mua vé đã đúng, xác nhận mua vé?",
      okFunc: handleBuyTicket,
      textOk: "Đồng ý",
    });
  };

  const handleDoneQR = () => {
    setOpenQR(false);
  };

  const handleCancleBooking = async () => {
    await cancleBooking(currentOrderData.orderCode);
    cancleOrderTimeout(currentOrderData.orderId, ERROR_MESSAGE.USER_CANCLE, false);
    handleDoneQR();
  };

  useEffect(() => {
    if (qrPaymant?.code) {
      chanenSupbase.current = clientSupbase
        .channel(`check-payment-${qrPaymant.code}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: DB_TABLE_NAME.ORDERS,
            filter: `payment_code=eq.${qrPaymant.code}`,
          },
          (payload) => {
            if (payload.new.status_payment === KEY_MODIFY_DATA.SUCCESS) {
              toast.success("Thanh toán thành công!");
              clientSupbase.removeChannel(chanenSupbase.current);
              getTicketSuccess();
            } else if (payload.new.status_payment === KEY_MODIFY_DATA.ERROR) {
              toast.error("Thanh toán thất bại! Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ");
              handleDoneQR();
            }
          }
        )
        .subscribe((status, err) => {});

      return () => {
        clientSupbase.removeChannel(chanenSupbase.current);
      };
    }
  }, [qrPaymant?.code]);

  const buttonLabel = submitting
    ? "Đang xử lý..."
    : order
      ? "Tôi đã chuyển khoản"
      : `Thanh toán ${itemsCart.length > 0 ? formatVND(totalPayment) : ""}`;

  return (
    <div className="min-h-screen bg-[#f3f6f4]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1c5b41] to-[#123d2b] pb-24 pt-8 sm:pb-28 md:pb-32 md:pt-14">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(254,150,20,0.28),transparent_45%)]"
        />
        <RouteDecor className="pointer-events-none absolute right-0 top-0 h-full w-[300px] opacity-30 sm:w-[460px] sm:opacity-100" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">Giỏ hàng</h1>
          <p className="mt-2 text-sm text-white/70 md:text-base">
            {itemsCart.length > 0
              ? `${itemsCart.length} loại vé đang chờ bạn thanh toán`
              : "Chưa có vé nào được chọn"}
          </p>
        </div>
      </section>

      <main className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 pb-24 sm:-mt-20 md:-mt-24 md:px-6">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <section aria-label="Vé đã chọn">
              <CartItemList items={itemsCart} />
            </section>
            <CustomerForm
              value={customer}
              onChange={setCustomer}
              errors={customerErrors}
              showAllErrors={submitted}
            />
            <OrderSummary
              subtotal={subTotal}
              discount={0}
              total={totalPayment}
              appliedCoupon={coupon}
              couponError={couponError}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
            />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <PaymentMethods value={payment} onChange={setPayment} order={order} />
            <button
              type="button"
              onClick={handleCheckout}
              disabled={!canCheckout}
              className="w-full rounded-full bg-gradient-to-r from-[#fe9614] to-[#ffb039] py-3.5 text-base font-bold text-white shadow-[0_10px_24px_-8px_rgba(254,150,20,0.7)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {buttonLabel}
            </button>

            {error && <p className="text-center text-sm text-red-500">{error}</p>}
            {itemsCart.length > 0 && !payment && (
              <p className="text-center text-sm text-slate-500">
                Chọn phương thức thanh toán để tiếp tục.
              </p>
            )}
          </aside>
        </div>
      </main>
      {openQR && (
        <BankTransferQR
          dataQR={qrPaymant}
          isOpen={openQR}
          onDone={handleDoneQR}
          onCancle={handleCancleBooking}
          mesage="Vui lòng đợi khi thanh toán và không tắt trình duyệt"
        />
      )}
    </div>
  );
}
