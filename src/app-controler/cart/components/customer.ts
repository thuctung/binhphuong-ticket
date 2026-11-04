export type CustomerInfo = { fullname: string; email: string; phone: string };
export type CustomerErrors = Partial<Record<keyof CustomerInfo, string>>;

export const EMPTY_CUSTOMER: CustomerInfo = { fullname: "", email: "", phone: "" };

// Số di động Việt Nam: 0xxxxxxxxx, 84xxxxxxxxx hoặc +84xxxxxxxxx (đầu số 3,5,7,8,9)
const VN_PHONE_RE = /^(0|\+?84)(3|5|7|8|9)\d{8}$/;

// Số quốc tế theo E.164: bắt đầu bằng "+", mã quốc gia không bắt đầu bằng 0, tổng 8-15 chữ số
const INTL_PHONE_RE = /^\+[1-9]\d{7,14}$/;

// Dùng chung cho client (hiện lỗi) và server (chặn dữ liệu sai)
export function validateCustomer(c: Partial<CustomerInfo> | null | undefined): CustomerErrors {
  const errors: CustomerErrors = {};
  const name = (c?.fullname ?? "").trim();
  const email = (c?.email ?? "").trim();
  // Bỏ khoảng trắng, dấu chấm, gạch ngang, ngoặc đơn
  const phone = (c?.phone ?? "").replace(/[\s.\-()]/g, "");

  if (name.length < 2) errors.fullname = "Vui lòng nhập họ và tên.";

  if (!email) errors.email = "Vui lòng nhập email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "Email chưa đúng định dạng.";

  if (!phone) errors.phone = "Vui lòng nhập số điện thoại.";
  else if (!VN_PHONE_RE.test(phone) && !INTL_PHONE_RE.test(phone))
    errors.phone = "ví dụ 0912345678 hoặc +14155552671).";
  return errors;
}
