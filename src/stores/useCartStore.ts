// stores/useCartStore.ts
import { toDate } from "@/app-controler/buy-ticket/contants";
import { FormDataType } from "@/app-controler/buy-ticket/type";
import { getSiteByFormType } from "@/components/GetTicketForm/api";
import { BOOKING_FORM_TYPE } from "@/components/GetTicketForm/constants";
import { ProductInCartType, SiteType } from "@/types/ticket";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartState = {
  items: Map<string, ProductInCartType>;
  siteList: SiteType[];
  siteCode: string;
  formData: FormDataType;
  setSiteCode: (code: string) => void;
  setSiteList: (list: SiteType[]) => void;
  setFormData: (formData: FormDataType) => void;
  getSites: (force?: boolean) => Promise<SiteType[]>;
  addItem: (item: ProductInCartType) => void;
  removeItem: (code: string) => void;
  clear: () => void;
};

let inflight: Promise<SiteType[]> | null = null;

const initState = {
  items: new Map<string, ProductInCartType>(),
  siteList: [] as SiteType[],
  siteCode: "",
  formData: {
    site_code: "",
    date_use: toDate,
  } as FormDataType,
};

// Serialize / deserialize Map để lưu được vào JSON
const replacer = (_key: string, value: unknown) =>
  value instanceof Map ? { __type: "Map", value: Array.from(value.entries()) } : value;

const reviver = (_key: string, value: any) =>
  value && value.__type === "Map" ? new Map(value.value) : value;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      ...initState,

      setSiteCode: (code) => set({ siteCode: code }),
      setSiteList: (list) => set({ siteList: list }),
      setFormData: (formData) => set({ formData }),

      getSites: async (force = false) => {
        const { siteList } = get();
        if (siteList.length && !force) return siteList;
        if (inflight) return inflight;

        inflight = (async () => {
          try {
            const data = await getSiteByFormType(BOOKING_FORM_TYPE.CUSTOMER);
            set({ siteList: data });
            return data;
          } catch (e) {
            set({ siteList: [] });
            throw e;
          } finally {
            inflight = null;
          }
        })();

        return inflight;
      },

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
      storage: createJSONStorage(() => sessionStorage, { replacer, reviver }),
    }
  )
);
