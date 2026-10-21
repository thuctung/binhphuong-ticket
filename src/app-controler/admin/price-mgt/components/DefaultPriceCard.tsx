"use client";

import { useEffect, useState } from "react";

type Props = {
  sites: string[];
  defaults: Record<string, number>;
  onSave: (site: string, price: number) => Promise<void> | void;
};

export default function DefaultPriceCard({ sites, defaults, onSave }: Props) {
  const [site, setSite] = useState(sites[0] ?? "");
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // đổi site → nạp lại giá mặc định hiện có
  useEffect(() => {
    setValue(defaults[site] != null ? String(defaults[site]) : "");
    setMsg("");
  }, [site, defaults]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(value);
    if (!site || value === "" || Number.isNaN(price) || price < 0) {
      setMsg("Nhập giá hợp lệ (số, không âm).");
      return;
    }
    setSaving(true);
    try {
      await onSave(site, price);
      setMsg("Đã lưu giá mặc định.");
    } catch {
      setMsg("Lưu thất bại, thử lại sau.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={save}
      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-end"
    >
      <div className="sm:w-48">
        <h2 className="text-sm font-semibold text-slate-900">Giá đại lý mặc định</h2>
        <p className="text-xs text-slate-500">Áp dụng cho vé chưa sửa giá riêng.</p>
      </div>

      <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-slate-700">
        Site
        <select
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-normal text-slate-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
        >
          {sites.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-slate-700">
        Giá mặc định (đ)
        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-10 rounded-md border border-slate-300 px-3 text-sm font-normal text-slate-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
        />
      </label>

      <button
        type="submit"
        disabled={saving}
        className="h-10 rounded-md bg-teal-700 px-5 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {saving ? "Đang lưu..." : "Lưu"}
      </button>

      {msg && (
        <p role="status" className="text-sm text-slate-600 sm:self-center">
          {msg}
        </p>
      )}
    </form>
  );
}
