"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { formatVND } from "@/lib/money";
import { ButtonCommon } from "@/components/ui/customs/buttonCommon";
import { ResetButton } from "@/components/ui/customs/ressetButton";
import { inputCls } from "@/components/ui/const-class";

type RefundAgentDialogProps = {
  open: boolean;
  maxAmount: number;
  onClose: () => void;
  onSubmit: (amount: number) => void;
};

export default function RefundAgentDialog({
  open,
  maxAmount,
  onClose,
  onSubmit,
}: RefundAgentDialogProps) {
  const [money, setMoney] = useState(10000);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleChangeMoney = (value: string) => {
    if (Number(value) < maxAmount) {
      setMoney(Number(value));
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        // Chỉ đóng khi bấm đúng vào lớp nền
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="refund-dialog-title"
        className="w-full max-w-[420px] rounded-3xl bg-white p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="refund-dialog-title"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              Thông tin phí hoàn tiền
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="-mr-1.5 -mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="mt-5">
          <label
            htmlFor="refund-amount"
            className="mb-1.5 block text-xs font-semibold text-slate-700"
          >
            Nhập số tiền phạt
          </label>
          <div className="relative">
            <input
              value={money}
              type="number"
              min={0}
              max={maxAmount}
              onChange={(e) => handleChangeMoney(e.target.value)}
              className={`${inputCls} text-right`}
            />
            <span className="pointer-events-none float-right text-[12px]">
              {formatVND(Number(money))}
            </span>
          </div>

          {maxAmount !== undefined ? (
            <p className="mt-3 text-xs text-slate-500">
              Nhận về:{" "}
              <span className="font-medium text-slate-700">
                {formatVND(maxAmount - Number(money))}
              </span>
            </p>
          ) : null}

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <ResetButton title="Hủy" onClick={onClose} />
            <ButtonCommon title="Xác nhận" onClick={() => onSubmit(maxAmount - Number(money))} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
