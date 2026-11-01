import { ButtonProp } from "@/types";

export function ResetButton({ onClick, ...prop }: ButtonProp) {
  return (
    <button
      {...prop}
      onClick={onClick}
      className="h-10 rounded-md bg-red-400 px-5 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
    >
      Reset
    </button>
  );
}
