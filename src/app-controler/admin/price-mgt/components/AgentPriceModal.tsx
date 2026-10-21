"use client";

import { useEffect, useState } from "react";
import { formatVND, type Ticket } from "../types";

type Props = {
  ticket: Ticket | null; // null = đóng popup
  defaultPrice?: number;
  onClose: () => void;
  onSave: (ticketId: number, agentPrice: number | null) => Promise<void> | void;
};

export default function AgentPriceModal({ ticket, defaultPrice, onClose, onSave }: Props) {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ticket) return;
    setValue(ticket.agent_price != null ? String(ticket.agent_price) : "");
    setError("");
  }, [ticket]);

  // đóng bằng phím Esc
  useEffect(() => {
    if (!ticket) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ticket, onClose]);

  if (!ticket) return null;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    // để trống = quay về giá mặc định của site
    const price = value === "" ? null : Number(value);
    if (price !== null && (Number.isNaN(price) || price < 0)) {
      setError("Giá phải là số không âm.");
      return;
    }
    setSaving(true);
    try {
      await onSave(ticket.id, price);
      onClose();
    } catch {
      setError("Lưu thất bại, thử lại sau.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onSubmit={save}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
          {ticket.name}
        </h2>
        <p className="text-sm text-slate-500">
          {ticket.site_name} · {ticket.code}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 rounded-md bg-slate-50 p-3 text-sm">
          <div>
            <dt className="text-slate-500">Giá công bố</dt>
            <dd className="font-medium tabular-nums text-slate-900">
              {formatVND(ticket.public_price)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Giá đơn vị</dt>
            <dd className="font-medium tabular-nums text-slate-900">
              {formatVND(ticket.unit_price)}
            </dd>
          </div>
        </dl>

        <label className="mt-4 flex flex-col gap-1 text-sm font-medium text-slate-700">
          Giá đại lý (đ)
          <input
            autoFocus
            type="number"
            min={0}
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={defaultPrice != null ? `Mặc định: ${defaultPrice}` : "Nhập giá đại lý"}
            className="h-10 rounded-md border border-slate-300 px-3 text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
          />
          <span className="text-xs font-normal text-slate-500">
            Để trống để dùng giá mặc định của site.
          </span>
        </label>

        {error && <p className="mt-2 text-sm text-red-700">{error}</p>}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-md border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-10 rounded-md bg-teal-700 px-5 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </form>
    </div>
  );
}
