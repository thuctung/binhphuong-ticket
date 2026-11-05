import { ProductSubmitType } from "@/types/ticket";

export function splitByQuantity(items: ProductSubmitType[]): ProductSubmitType[] {
  return items.flatMap((item) =>
    Array.from({ length: item.quantity }, () => ({
      ...item,
      quantity: 1,
    }))
  )
}