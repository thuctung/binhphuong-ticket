export type CustomerInfo = { name: string; email: string; phone: string };
export type CustomerErrors = Partial<Record<keyof CustomerInfo, string>>;

export const EMPTY_CUSTOMER: CustomerInfo = { name: "", email: "", phone: "" };

// Dùng chung cho client (hiện lỗi) và server (chặn dữ liệu sai)
export function validateCustomer(c: Partial<CustomerInfo> | null | undefined): CustomerErrors {
  const errors: CustomerErrors = {};
  const name = (c?.name ?? "").trim();
  const email = (c?.email ?? "").trim();
  const phone = (c?.phone ?? "").replace(/[\s.-]/g, "");

  if (name.length < 2) errors.name = "Vui lòng nhập họ và tên.";

  if (!email) errors.email = "Vui lòng nhập email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Email chưa đúng định dạng.";

  if (!phone) errors.phone = "Vui lòng nhập số điện thoại.";
  else if (!/^(0|\+84|84)(3|5|7|8|9)\d{8}$/.test(phone)) errors.phone = "Số điện thoại chưa đúng (ví dụ 0912345678).";

  return errors;
}
