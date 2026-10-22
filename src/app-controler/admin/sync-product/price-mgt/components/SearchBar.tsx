"use client";

import { useState } from "react";
import type { SearchFilters } from "../types";

type Props = {
  sites: string[];
  onSearch: (filters: SearchFilters) => void;
};

export default function SearchBar({ sites, onSearch }: Props) {
  const [site, setSite] = useState("");
  const [product, setProduct] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ site, product: product.trim() });
  };

  const reset = () => {
    setSite("");
    setProduct("");
    onSearch({ site: "", product: "" });
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-end"
    >
      <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-slate-700">
        Tên site
        <select
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-normal text-slate-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
        >
          <option value="">Tất cả site</option>
          {sites.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-[2] flex-col gap-1 text-sm font-medium text-slate-700">
        Tên vé
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Ví dụ: Vé cáp treo người lớn"
          className="h-10 rounded-md border border-slate-300 px-3 text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
        />
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="h-10 rounded-md bg-teal-700 px-5 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
        >
          Tìm kiếm
        </button>
        <button
          type="button"
          onClick={reset}
          className="h-10 rounded-md border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Xóa lọc
        </button>
      </div>
    </form>
  );
}
