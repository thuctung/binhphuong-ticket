

export type Coupon = {
  code: string;
  type: "percent" | "fixed";
  value: number; // percent: 0-100, fixed: VND
  label: string;
};

export type PaymentMethodId = "qr" | "card";


// Kết quả server trả về sau khi tạo đơn
export type CreatedOrder = {
  orderCode: string; // mã thanh toán duy nhất: dùng làm nội dung chuyển khoản / mã tham chiếu cổng thanh toán
  amount: number;
};
