import { ButtonProp } from "@/types";

export function ButtonCommon({ title, onClick, ...prop }: ButtonProp) {
  return (
    <button
      {...prop}
      onClick={onClick}
      className={`h-10 rounded-md bg-teal-700 px-5 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${prop.className || ""}`}
    >
      {title}
    </button>
  );
}
