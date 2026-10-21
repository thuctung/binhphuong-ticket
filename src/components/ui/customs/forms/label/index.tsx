"use client";

import { cn } from "@/lib/utils";

type LabelProps = {
  text: string;
  htmlFor: string;
  className?: string;
};
const LabelForm = ({ text, htmlFor, className, ...props }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={cn("mb-1.5 block text-[11px] font-semibold", className)}>
      {text}
    </label>
  );
};

export default LabelForm;
