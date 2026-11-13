"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "@/lib/i18n/client";
import { useCommonStore } from "@/stores/useCommonStore";
import { CommonType, ConfirmType } from "@/types";
import { isEmpty } from "lodash";

export function ConfirmProvider() {
  const { t } = useTranslation();
  const { confirm }: CommonType = useCommonStore((state: any) => state);
  const { showConfirm }: CommonType | any = useCommonStore.getState();

  const initConfirm: ConfirmType = {
    message: null,
    okFunc: null,
    textOk: "Ok",
    onCancle: null,
  };

  const handleCancel = () => {
    showConfirm(initConfirm);
    if (confirm.onCancle) {
      confirm.onCancle && confirm.onCancle();
    }
  };

  const handleOk = () => {
    if (confirm.okFunc) {
      confirm.okFunc();
      const initConfirm: ConfirmType = {
        message: null,
        okFunc: null,
        textOk: "OK",
        onCancle: null,
      };
      showConfirm(initConfirm);
    }
  };

  return (
    <AlertDialog open={!isEmpty(confirm.message)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("common.label.confirm")}</AlertDialogTitle>
          <AlertDialogDescription>{confirm.message}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>{t("common.label.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleOk}>
            {confirm.textOk || t("common.label.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
