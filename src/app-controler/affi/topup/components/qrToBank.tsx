"use client";

import { Copy } from "lucide-react";

import { QRBankResponseType } from "@/types";
import { BANK_INFO } from "@/commons/constant";
import { formatVND } from "@/helpers/money";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CODE_BANK } from "@/commons/code-bank";
import { useTranslation } from "@/lib/i18n/client";

import Countdown from "./countdown";

type BankTransferQRProps = {
  dataQR: QRBankResponseType;
  onDone?: () => void;
  onCancle?: () => void;
  isOpen: boolean;
  mesage?: string;
};

export default function BankTransferQR({
  dataQR,
  isOpen,
  mesage,
  onDone,
  onCancle,
}: BankTransferQRProps) {
  const { t } = useTranslation();
  const copy = (text?: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };
  const downloadQR = async () => {
    const response = await fetch(dataQR.qr);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${dataQR.code}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>BankTransferQR</DialogTitle>
      <DialogContent
        className="[&>button]:hidden"
        style={{ maxHeight: "95vh", overflowY: "auto", zIndex: 9999 }}
      >
        <div className="space-y-4">
          <img src={dataQR.qr} className="w-64 mx-auto" />
          <div className="flex justify-center gap-2">
            <button
              onClick={downloadQR}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14" />
              </svg>
              {t("cart.download_qr_code")}
            </button>
          </div>

          <div className="text-sm space-y-2">
            {BANK_INFO.bankName ? (
              <Row label={t("cart.bank")} value={CODE_BANK[BANK_INFO.bankName]} />
            ) : null}

            <Row
              label={t("cart.account_number")}
              value={BANK_INFO.bankNum}
              onCopy={() => copy(BANK_INFO.bankNum)}
            />
            <Row label={t("cart.recipient")} value="Moon Price" />
            <Row label={t("cart.amount")} value={formatVND(dataQR.amount)} />
            <Row
              label={t("cart.transfer_description")}
              value={dataQR.code}
              onCopy={() => copy(dataQR.code)}
            />
          </div>
        </div>
        <span className="text-sm text-center text-red-500">{mesage}</span>
        <Countdown totalSecounds={10 * 60} />
        <div className="flex ">
          <div className="w-full flex justify-center ">
            {onDone && <Button onClick={onDone}>{t("cart.payment_transferred")}</Button>}
          </div>
          {onCancle && (
            <div className="w-full flex justify-center ">
              <Button variant="destructive" onClick={onCancle}>
                {t("cart.cancel_transaction")}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value, onCopy }: { label?: string; value?: string; onCopy?: () => void }) {
  return (
    <div className="flex items-center justify-between border rounded-md p-2">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>

      {onCopy && (
        <Button size="icon" variant="ghost" onClick={onCopy}>
          <Copy size={16} />
        </Button>
      )}
    </div>
  );
}
