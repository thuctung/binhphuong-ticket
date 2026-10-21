"use client";

import { useEffect, useMemo, useState } from "react";
import SearchForm, { SearchValues } from "./SearchForm";
import SyncDiffTable from "./SyncDiffTable";
import { Product, filterProducts } from "./products";
import { applySync, computeDiff, DiffRow, summarize } from "./sync";

import {
  getProductBySiteSun,
  getProductionInSystem,
  getSiteByStatus,
} from "@/components/GetTicketForm/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { BASIC_DATE_FORMAT, SERVER_DATE_FORMAT } from "@/helpers/dateTime";
import { ProductBanaType, ResultListProductType, SiteType } from "@/types/ticket";
import { getProductToSync, updateProductPrices } from "../api";
import { CommonType } from "@/types";
import { useCommonStore } from "@/stores/useCommonStore";
import { ProductUpdatePriceType } from "../type";

interface Props {
  listA: Product[]; // dữ liệu cũ
  listB: Product[]; // dữ liệu mới
  onSynced: (newListA: Product[]) => void;
}

const field =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";

export default function ProductSyncTab() {
  const [syncing, setSyncing] = useState(false);

  const [siteCode, setSiteCode] = useState("");
  const [listSite, setListSite] = useState<SiteType[]>([]);
  const { setGlobalLoading }: CommonType | any = useCommonStore.getState();

  const [listProductDiff, setListProductDiff] = useState<any[]>([]);

  const summary = summarize(listProductDiff);
  const pendingCount = summary.new + summary.changed;

  const fetchSites = async () => {
    const sites = await getSiteByStatus(true);
    if (sites && sites.length) {
      const outSystem = sites.filter((item: SiteType) => !item.in_system);
      setListSite(outSystem);
    }
  };

  const handleSync = async () => {
    const listProductFiter: ProductUpdatePriceType[] = [];
    listProductDiff.forEach((product: DiffRow) => {
      if (product.type !== "only_a" && product.type !== "unchanged") {
        listProductFiter.push({
          code: product.code,
          name: product.name,
          personType: product.personType,
          site_code: product.site.code || siteCode,
          publicPrice: product.newPublicPrice || 0,
          unitPrice: product.newUnitPrice || 0,
        });
      }
    });

    if (listProductFiter.length) {
      const result = await updateProductPrices(listProductFiter);
      if (result) {
        toast.success("Đồng bộ dữ liệu thành công");
        setListProductDiff([]);
      }
    }
  };

  const fetchListProduct = async () => {
    if (!siteCode) {
      toast.warning("Vui lòng chọng công viên");
      return;
    }
    setGlobalLoading(true);
    const [dataSun, dataSystem]: any = await getProductToSync(
      siteCode,
      dayjs(new Date()).format(SERVER_DATE_FORMAT)
    );
    const diff = computeDiff(dataSystem, dataSun);
    setListProductDiff(diff);
    setGlobalLoading(false);
  };

  useEffect(() => {
    fetchSites();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-end">
        <div className="">
          <label htmlFor="side" className="mb-1 block text-sm font-medium text-slate-700">
            Công viên
          </label>
          <select
            id="side"
            value={siteCode}
            onChange={(e) => setSiteCode(e.target.value)}
            className={field}
          >
            <option value="">Tất cả</option>
            {listSite.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={fetchListProduct}
          style={{ height: 34 }}
          className=" mx-5 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
          Tìm kiếm
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 mb-5">
        <button
          onClick={handleSync}
          disabled={syncing || pendingCount === 0}
          className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {syncing && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {syncing ? "Đang đồng bộ..." : "Đồng bộ dữ liệu"}
        </button>
      </div>

      <SyncDiffTable rows={listProductDiff} />
    </div>
  );
}
