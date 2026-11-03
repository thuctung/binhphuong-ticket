// stores/useCartStore.ts
import { ProductInCartType } from "@/types/ticket";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartState = {
  items: Map<string, ProductInCartType>;
  siteCode: string;
  addItem: (item: ProductInCartType) => void;
  removeItem: (code: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: new Map(),
      siteCode: "",
      setSiteCode: (code: string) => set({ siteCode: code }),
      addItem: (productInCart) =>
        set((s) => {
          const newItems = new Map(s.items);
          newItems.set(productInCart.product.code, productInCart);
          return { items: newItems };
        }),
      removeItem: (code) =>
        set((s) => {
          const newItems = new Map(s.items);
          newItems.delete(code);
          return { items: newItems };
        }),
      clear: () => set({ items: new Map() }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),

      partialize: (s) => ({ items: Array.from(s.items.entries()) }),

      merge: (persisted, current) => {
        const p = persisted as { items?: [string, ProductInCartType][] } | undefined;
        return {
          ...current,
          items: new Map(Array.isArray(p?.items) ? p.items : []),
        };
      },
    }
  )
);
