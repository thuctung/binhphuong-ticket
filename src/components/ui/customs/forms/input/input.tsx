"use client";

import { cn } from "@/lib/utils";

type InputProps = {
  id: string;
  name: string;
  className?: string;
  value: string | number;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};
const InputForm = ({
  id,
  type,
  value,
  name,
  className,
  onChange,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <input
      id={id}
      type={type || "text"}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900",
        className
      )}
      {...props}
    />
  );
};

export default InputForm;
