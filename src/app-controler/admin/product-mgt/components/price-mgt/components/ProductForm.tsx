"use client";

import { useState } from "react";

import { AgentType } from "@/types";
import {
  DISCOUNT_TYPE_PRICE,
  getNoteTextDiscount,
  getSideItem,
  LIST_OPTION_DISCOUNT,
} from "@/app-controler/admin/product-mgt/contants";
import { formatVND } from "@/lib/money";
import { ProductBanaType, ProductType, SiteType } from "@/types/ticket";
import { AgentPriceAndTypeSubmit } from "@/app-controler/admin/product-mgt/type";
import { toast } from "react-toastify";
import { updateProduct } from "../../../api";

type Row = { type: ""; price: string };

type Props = {
  listSite: SiteType[];
  listAgent: AgentType[];
  product: ProductBanaType | null;
  prices?: AgentPriceAndTypeSubmit[];
  onClose: () => void;
};

const intitValue: ProductBanaType = {
  closeTime: "",
  code: "",
  name: "",
  personType: "",
  restaurantName: "",
  publicPrice: 0,
  unitPrice: 0,
  multiple: 1,
  site_code: "",
  order: 1,
};

export default function ProductForm({ listSite, listAgent, product, prices, onClose }: Props) {
  const [formData, setFormData] = useState<ProductBanaType>(product || intitValue);
  const [saving, setSaving] = useState(false);

  const onChangeValue = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    const payload: ProductType | any = { ...formData };
    const data = await updateProduct(payload);
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
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
      >
        <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
          {formData.name}
        </h2>
        <p className="text-sm text-slate-500">{getSideItem(formData.site_code, listSite)?.name}</p>

        <div className="max-h-[335px] overflow-y-auto md:max-h-[500px]">
          {listAgent.map((item) => (
            <div key={item.code} className="rounded-md border border-slate-300 my-4 p-3">
              <label className="text-sm font-medium text-slate-700">{item.name}</label>
              <div className="flex justify-between flex-col md:flex-row">
                <select
                  value={formData.code}
                  onChange={(e) => onChangeValue("type", e.target.value)}
                  className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-normal text-slate-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
                >
                  {LIST_OPTION_DISCOUNT.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="flex flex-col justify-end mt-2 md:mt-0">
                  <input
                    autoFocus
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={formData.unitPrice}
                    onChange={(e) => onChangeValue("price", e.target.value)}
                    className="h-10 text-right rounded-md border border-slate-300 px-3 text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-md border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
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
