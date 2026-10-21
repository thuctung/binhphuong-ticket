"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { CommonType } from "@/types";
import { useCommonStore } from "@/stores/useCommonStore";
import { isEmpty } from "lodash";

export default function ToastMessage() {
  const data: CommonType = useCommonStore((state: any) => state);
  const { messageToast } = data;
  const { setToastMessage }: CommonType | any = useCommonStore.getState();

  const handleCloseToast = () => {
    setToastMessage(null);
  };
  return (
    <Dialog open={!isEmpty(messageToast)} onOpenChange={handleCloseToast}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông báo</DialogTitle>
          <DialogDescription>{messageToast}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={handleCloseToast}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
