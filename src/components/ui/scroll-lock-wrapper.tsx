"use client";

import { useEffect, type ReactNode } from "react";

interface ScrollLockWrapperProps {
  open: boolean;
  children: ReactNode;
}

export function ScrollLockWrapper({ open, children }: ScrollLockWrapperProps) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return <>{children}</>;
}
