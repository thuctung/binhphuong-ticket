import { SearchButton } from "@/components/ui/customs/searchButton";
import { SelectBox } from "@/components/ui/customs/selectBox";
import DatePickerCustom from "@/components/ui/date-picker";

import { SearchTicketSale } from "@/types";
import { Calendar, User } from "lucide-react";
import { StatusData } from "@/app-controler/affi/stats/contants";
import DropdownSearch from "@/components/ui/dropdown-search";
import { ListAffDropdownType } from "../type";
import { SiteType } from "@/types/ticket";
import { inputCls } from "@/components/ui/const-class";
import { ButtonCommon } from "@/components/ui/customs/buttonCommon";

type SearchTicketFormProps = {
  onChangeForm: (key: string, value: string) => void;
  onSearch: () => void;
  searchValue: SearchTicketSale;
  listAff: ListAffDropdownType[];
  listSite: SiteType[];
  handleExcel: () => void;
};

export function SearchReport({
  searchValue,
  listAff,
  listSite,
  onChangeForm,
  handleExcel,
  onSearch,
}: SearchTicketFormProps) {
  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Lịch sử rút vé</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              <Calendar size={14} /> Từ ngày (ngày bán)
            </label>
            <div>
              <DatePickerCustom
                value={searchValue.from}
                onChange={(date: string) => onChangeForm("from", date)}
                maxDate={searchValue.to}
              />
            </div>
          </div>
          {/* Đến ngày */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              <Calendar size={14} /> Đến ngày (ngày bán)
            </label>
            <div>
              <DatePickerCustom
                value={searchValue.to}
                onChange={(date: string) => onChangeForm("to", date)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              Trạng thái
            </label>

            <SelectBox
              value={searchValue.status || ""}
              onChange={(value) => onChangeForm("status", value)}
            >
              <option value="">Tất cả</option>
              {Object.keys(StatusData).map((key: string) => (
                <option key={key} value={key}>
                  {StatusData[key]}
                </option>
              ))}
            </SelectBox>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              Công viên
            </label>

            <SelectBox
              value={searchValue.siteCode || ""}
              onChange={(value) => onChangeForm("siteCode", value)}
            >
              <option value="">Tất cả</option>
              {listSite?.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </SelectBox>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              <User size={14} /> Tên đại lý
            </label>
            <DropdownSearch
              options={listAff}
              value={searchValue.email}
              onChange={(value: string) => onChangeForm("email", value)}
              placeholder="Chọn tên đại lý"
              searchPlaceholder="Nhập để tìm..."
            />
          </div>
          {/* Tên/Email aff */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              <User size={14} /> Email đại lý
            </label>
            <input
              className={inputCls}
              type="text"
              placeholder="email "
              value={searchValue.email || ""}
              onChange={(e) => onChangeForm("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              Third party code
            </label>
            <input
              className={inputCls}
              type="text"
              placeholder=""
              value={searchValue.third_party_number || ""}
              onChange={(e) => onChangeForm("third_party_number", e.target.value)}
            />
          </div>
        </div>
        <div className=" flex flex-wrap justify-end  pr-3">
          <div className="flex justify-end gap-3 mt-6">
            <SearchButton onClick={onSearch} />
            <ButtonCommon title="Export Excel" onClick={handleExcel} />
          </div>
        </div>
      </div>
    </div>
  );
}
