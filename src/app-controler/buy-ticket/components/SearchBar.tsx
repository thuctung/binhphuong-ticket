"use client";

import DatePickerCustom from "@/components/ui/date-picker";
import DropdownSearch from "@/components/ui/dropdown-search";
import { SiteType } from "@/types/ticket";
import { Info, Search } from "lucide-react";
import { useMemo } from "react";
import { toDate } from "../contants";
import { FormDataType } from "../type";

type SearchBarProp = {
  siteList: SiteType[];
  formData: FormDataType;
  onChangeFormData: (key: keyof FormDataType, value: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  formData,
  siteList,
  onChangeFormData,
  onSearch,
}: SearchBarProp) {
  const lisStateCover = useMemo(
    () => siteList.map((item) => ({ value: item.code, label: item.name })),
    [siteList]
  );

  return (
    <section className="relative z-10 mx-auto -mt-16 ">
      <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
          <div>
            <label className="text-[11px] font-semibold">Chọn công viên</label>
            <DropdownSearch
              options={lisStateCover}
              value={formData.site_code}
              onChange={(value: string) => onChangeFormData("site_code", value)}
              placeholder="Chọn tên công viên"
              searchPlaceholder="Nhập để tìm..."
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold">Ngày sử dụng</label>
            <DatePickerCustom
              name="date_use"
              id="date_use"
              value={formData.date_use}
              onChange={(value: any) => onChangeFormData("date_use", value)}
              minDate={toDate}
              className="shadow-none border border-gray-200 h-12 rounded-xl"
            />
          </div>
          <button
            onClick={onSearch}
            className=" flex items-center justify-center  gap-2 h-10 w-full rounded-lg bg-[#61a05e] text-xs font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            <Search size={18} />
            Tìm kiếm
          </button>
        </div>

        <div className="mt-5 flex items-start gap-2 text-sm text-gray-500">
          <Info size={16} className="mt-0.5 shrink-0" />
          <span>
            <a
              href="/uu-dai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-600 underline"
            >
              Đăng kí ngay
            </a>{" "}
            để nhận ưu đãi
          </span>
        </div>
      </div>
    </section>
  );
}
