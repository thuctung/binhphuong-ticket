import { ParamStatusTicketType } from "@/app-controler/affi/ticket-statatus/type";
import { inputCls } from "@/components/ui/const-class";
import { ResetButton } from "@/components/ui/customs/ressetButton";
import { SearchButton } from "@/components/ui/customs/searchButton";
import { SelectBox } from "@/components/ui/customs/selectBox";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteType } from "@/types/ticket";

import { useState } from "react";

type SearchTicketStatusProps = {
  setOrderCode: (value: string) => void;
  orderCode: string;
  onSearch: () => void;
};

export function SearchBookingStatus({
  orderCode,
  setOrderCode,
  onSearch,
}: SearchTicketStatusProps) {
  return (
    <div>
      <div className="mb-4 pl-4 flex flex-wrap items-center gap-3">
        <div className="space-y-2 flex w-full gap-5">
          <div>
            <input
              type="text"
              value={orderCode}
              placeholder="Mã order"
              onChange={(e) => setOrderCode(e.target.value)}
              className={inputCls}
            />
          </div>

          <SearchButton onClick={onSearch} classMore="w-full" />
        </div>
      </div>
    </div>
  );
}
