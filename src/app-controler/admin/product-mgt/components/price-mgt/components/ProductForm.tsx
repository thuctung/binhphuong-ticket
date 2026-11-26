"use client";

import { useState } from "react";

import { AgentType } from "@/types";
import {
  DISCOUNT_TYPE_PRICE,
  generatProductCode,
  getNoteTextDiscount,
  getSideItem,
  LIST_OPTION_DISCOUNT,
} from "@/app-controler/admin/product-mgt/contants";
import { formatVND } from "@/lib/money";
import { CategorySubmitType, ProductBanaType, ProductType, SiteType } from "@/types/ticket";
import { AgentPriceAndTypeSubmit } from "@/app-controler/admin/product-mgt/type";
import { toast } from "react-toastify";
import { updateProduct } from "../../../api";
import { inputCls } from "@/components/ui/const-class";
import { validateProduct } from "../../../help";

type Props = {
  listSite: SiteType[];
  listAgent: AgentType[];
  product: ProductBanaType | null;
  prices?: AgentPriceAndTypeSubmit[];
  siteCode?: string;
  onClose: (refresh?: boolean) => void;
  listCategory: CategorySubmitType[];
};

const labelCls = "mb-1 block text-sm font-medium text-slate-700";
export default function ProductForm({
  listSite,
  listAgent,
  listCategory,
  product,
  prices,
  siteCode,
  onClose,
}: Props) {
  const intitValue: ProductBanaType = {
    closeTime: "",
    code: generatProductCode(siteCode || ""),
    name: "",
    personType: "",
    publicPrice: 0,
    unitPrice: 0,
    multiple: 1,
    site_code: siteCode || "",
    order: 1,
    status: true,
    min_quantity: 1,
  };
  const [formData, setFormData] = useState<ProductBanaType>(product || intitValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<any>({});

  const onChangeValue = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError({});
  };

  const handleSave = async () => {
    const validation = validateProduct(formData);
    if (!validation.isValid) {
      setError(validation.errors);
      return;
    }

    const payload: ProductType | any = { ...formData };
    delete payload.closeTime;
    const data = await updateProduct(payload);
    if (data) {
      toast.success(payload.id ? "Cập nhật vé thành công" : "Thêm vé thành công");
      onClose(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-[1128px] rounded-lg bg-white p-6 shadow-xl"
      >
        <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
          {formData.id ? "Cập nhật vé" : "Thêm vé"}
        </h2>

        <div className="mt-4 max-h-[calc(85vh-90px)] overflow-y-auto pr-1 md:max-h-[500px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Mã vé */}
            <div>
              <label htmlFor="ticket-code" className={labelCls}>
                Mã vé
              </label>
              <input
                disabled
                id="ticket-code"
                autoFocus
                type="text"
                value={formData.code ?? ""}
                onChange={(e) => onChangeValue("code", e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Tên vé */}
            <div>
              <label htmlFor="ticket-name" className={labelCls}>
                Tên vé
              </label>
              <input
                id="ticket-name"
                type="text"
                value={formData.name ?? ""}
                onChange={(e) => onChangeValue("name", e.target.value)}
                className={inputCls}
              />
              {error.name && <p className="text-sm text-red-500">{error.name}</p>}
            </div>

            {/* Loại vé */}
            <div>
              <label htmlFor="ticket-type" className={labelCls}>
                Loại vé
              </label>
              <select
                id="ticket-type"
                value={formData.personType ?? ""}
                onChange={(e) => onChangeValue("personType", e.target.value)}
                className={inputCls}
              >
                <option value="">-- Chọn loại vé --</option>
                {listCategory.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              {error.personType && <p className="text-sm text-red-500">{error.personType}</p>}
            </div>

            {/* Công viên */}
            <div>
              <label htmlFor="ticket-site" className={labelCls}>
                Công viên
              </label>
              <select
                id="ticket-site"
                value={formData.site_code ?? ""}
                onChange={(e) => onChangeValue("site_code", e.target.value)}
                className={inputCls}
              >
                <option value="">-- Chọn công viên --</option>
                {listSite.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              {error.site_code && <p className="text-sm text-red-500">{error.site_code}</p>}
            </div>

            {/* Giá công bố */}
            <div>
              <label htmlFor="ticket-published-price" className={labelCls}>
                Giá công bố
              </label>
              <input
                id="ticket-published-price"
                type="number"
                min={0}
                inputMode="numeric"
                value={formData.publicPrice ?? ""}
                onChange={(e) => onChangeValue("publicPrice", e.target.value)}
                className={`${inputCls} text-right`}
              />
              <span className="float-right text-[12px] text-[#1a780d]">
                {formatVND(formData.publicPrice ?? 0)}
              </span>
              {error.publicPrice && <p className="text-sm text-red-500">{error.publicPrice}</p>}
            </div>

            {/* Giá đại lý */}
            <div>
              <label htmlFor="ticket-agent-price" className={labelCls}>
                Giá đại lý
              </label>
              <input
                id="ticket-agent-price"
                type="number"
                min={0}
                inputMode="numeric"
                value={formData.unitPrice ?? ""}
                onChange={(e) => onChangeValue("unitPrice", e.target.value)}
                className={`${inputCls} text-right`}
              />
              <span className="float-right text-[12px] text-[#1a780d]">
                {formatVND(formData.unitPrice ?? 0)}
              </span>
              {error.unitPrice && <p className="text-sm text-red-500">{error.unitPrice}</p>}
            </div>

            {/* Order */}
            <div>
              <label htmlFor="ticket-order" className={labelCls}>
                Order
              </label>
              <input
                id="ticket-order"
                type="number"
                min={0}
                inputMode="numeric"
                value={formData.order ?? ""}
                onChange={(e) => onChangeValue("order", e.target.value)}
                className={`${inputCls} text-right`}
              />
            </div>

            {/* Multiple */}
            <div>
              <label htmlFor="ticket-multiple" className={labelCls}>
                Multiple
              </label>
              <input
                id="ticket-multiple"
                type="number"
                min={1}
                inputMode="numeric"
                value={formData.multiple ?? ""}
                onChange={(e) => onChangeValue("multiple", e.target.value)}
                className={`${inputCls} text-right`}
              />
            </div>

            {/* Min quantity */}
            <div>
              <label htmlFor="ticket-min-quantity" className={labelCls}>
                Min quantity
              </label>
              <input
                id="ticket-min-quantity"
                type="number"
                min={0}
                inputMode="numeric"
                value={formData.min_quantity ?? ""}
                onChange={(e) => onChangeValue("min_quantity", e.target.value)}
                className={`${inputCls} text-right`}
              />
            </div>

            {/* Status */}
            <div className="flex items-end">
              <label
                htmlFor="ticket-status"
                className="flex h-10 cursor-pointer items-center gap-2 text-sm font-medium text-slate-700"
              >
                <input
                  id="ticket-status"
                  type="checkbox"
                  checked={!!formData.status}
                  onChange={(e) => onChangeValue("status", e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-2 focus:ring-teal-700/30"
                />
                Status (Kích hoạt)
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onClose()}
            className="h-10 rounded-md border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="h-10 rounded-md bg-teal-700 px-5 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
