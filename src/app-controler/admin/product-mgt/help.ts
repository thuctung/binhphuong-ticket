import { ProductBanaType } from "@/types/ticket";

export function validateProduct(data: ProductBanaType) {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "Vui lòng nhập tên sản phẩm";
  }

  if (!data.site_code.trim()) {
    errors.site_code = "Vui lòng chọn địa điểm";
  }

  if (!data.personType) {
    errors.personType = "Vui lòng chọn loại vé";
  }

  if (Number(data.publicPrice) < 1000) {
    errors.publicPrice = "Giá công khai không hợp lệ";
  }

  if (Number(data.unitPrice) < 1000) {
    errors.unitPrice = "Giá nhập không hợp lệ";
  }

  if (!Number.isInteger(data.multiple) || data.multiple < 1) {
    errors.multiple = "Số lượng nhân phải lớn hơn hoặc bằng 1";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
