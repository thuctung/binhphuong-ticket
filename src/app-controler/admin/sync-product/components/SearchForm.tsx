"use client";

import { useState } from "react";
import { SIDES, Side } from "../data";

export interface SearchValues {
  name: string;
  side: Side | "";
}

interface Props {
  onSearch: (values: SearchValues) => void;
}

const EMPTY: SearchValues = { name: "", side: "" };

export default function SearchForm({ onSearch }: Props) {
  const [values, setValues] = useState<SearchValues>(EMPTY);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(values);
  };

  const reset = () => {
    setValues(EMPTY);
    onSearch(EMPTY);
  };

  const field =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
      <div className="w-full sm:w-64">
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
          Tên sản phẩm
        </label>
        <input
          id="name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          placeholder="Nhập tên sản phẩm"
          className={field}
        />
      </div>

      <div className="w-full sm:w-40">
        <label htmlFor="side" className="mb-1 block text-sm font-medium text-slate-700">
          Side
        </label>
        <select
          id="side"
          value={values.side}
          onChange={(e) => setValues({ ...values, side: e.target.value as Side | "" })}
          className={field}
        >
          <option value="">Tất cả</option>
          {SIDES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
          Tìm kiếm
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        >
          Xóa bộ lọc
        </button>
      </div>
    </form>
  );
}
