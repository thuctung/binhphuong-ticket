"use client";

import { useEffect, useMemo, useState } from "react";

import {
  AgentPriceType,
  CategorySubmitType,
  ProductBanaType,
  ResultListProductType,
  SiteType,
} from "@/types/ticket";
import { ProfileType } from "@/types";
import { CUSTOMER, SITE_CODES } from "@/commons/constant";
import { BASIC_DATE_FORMAT, SERVER_DATE_FORMAT } from "@/helpers/dateTime";
import dayjs from "dayjs";
import SearchBar from "./components/SearchBar";
import { useProfileStore } from "@/stores/useProfileStore";
import { useCartStore } from "@/stores/useCartStore";
import Hero from "./components/Hero";
import { FormDataType } from "./type";

import { getSideItem } from "../admin/product-mgt/contants";
import {
  getListAgentPriceDefaultBySite,
  getPriceBuyAgentLevel,
  getProductBySiteSun,
  getProductionInSystem,
} from "@/components/GetTicketForm/api";
import TicketTabs from "./components/TicketTabs";
import { getOrder } from "@/components/GetTicketForm/Affilate/constants";
import { AlertCircle } from "lucide-react";
import { geNoteSiteCode } from "@/components/GetTicketForm/Customer/constants";
import ProductCard from "./components/ProductCard";
import SummaryCustomer from "./components/SumaryCustomer";
import {
  getPriceAgentAndMultiple,
  mapAgentPriceByProductCode,
} from "@/components/GetTicketForm/constants";
import { getListCategory } from "../admin/product-mgt/api";

export default function BuyTicketController() {
  const profile: ProfileType = useProfileStore((state: any) => state.profile);

  const {
    siteList,
    formData,
    siteCode,
    items,
    getSites,
    clear: clearCart,
    setFormData,
  } = useCartStore((s) => s);

  const [listProduct, setListProductSun] = useState<ResultListProductType[]>([]);
  const [agentPriceDefault, setAgentPriceDefault] = useState(0);
  const [mapAgentPrice, setMapAgentPrice] = useState<Map<string, AgentPriceType>>(new Map());
  const [listCategory, setListCategory] = useState<CategorySubmitType[]>([]);

  const currentSite: SiteType | null = useMemo(
    () => getSideItem(formData.site_code, siteList),
    [siteList, formData.site_code]
  );

  const [filter, setFilter] = useState("");

  const [tickets, personTypes] = useMemo(() => {
    let listTicket: ProductBanaType[] = [];
    const listPersonType: string[] = [];
    listProduct.forEach((item) => {
      listTicket = listTicket.concat([...item.ticket]);
      listPersonType.push(item.personType);
    });
    listTicket = listTicket.map((items) => ({
      ...items,
      pinalPrice: getPriceAgentAndMultiple(items, CUSTOMER, mapAgentPrice, agentPriceDefault),
    }));
    return [listTicket.sort((a, b) => (a.order ?? 1) - (b.order ?? 1)), listPersonType];
  }, [listProduct]);

  const listProductFilter = useMemo(() => {
    let result: ProductBanaType[] = [];
    if (!filter) {
      result = tickets;
    } else {
      result = tickets.filter((item) => item.personType === filter);
    }
    if (formData.site_code === SITE_CODES.BANAHILL) {
      return result.sort((a, b) => getOrder(a?.id || 1) - getOrder(b?.id || 1));
    }
    return result;
  }, [filter, tickets, formData.site_code]);

  const onChangeFormData = (key: keyof FormDataType, value: string) => {
    if (value !== formData.site_code) {
      clearCart();
    }
    const newData = { ...formData, [key]: value };
    setFormData(newData);
  };

  const handleSearch = () => {
    fetchProductBySite(formData.site_code);
    clearCart();
  };

  const fetchProductBySite = async (siteCode: string) => {
    if (siteCode) {
      let data: any = [];
      if (currentSite && !currentSite.in_system) {
        data = await getProductBySiteSun(
          siteCode,
          dayjs(formData.date_use, BASIC_DATE_FORMAT).format(SERVER_DATE_FORMAT)
        );
      } else {
        data = await getProductionInSystem(siteCode);
      }
      if (data) {
        setListProductSun(data);
      } else {
        setListProductSun([]);
      }
    }
  };

  const fetchPriceAgentLevelAndProducts = async (sideCode: string, level: string) => {
    const [priceDefault, agentPrice, product]: any = await Promise.all([
      getListAgentPriceDefaultBySite(sideCode, level),
      getPriceBuyAgentLevel(sideCode, level),
      fetchProductBySite(formData.site_code),
    ]);
    const mapAgentPrice = mapAgentPriceByProductCode(agentPrice);
    setMapAgentPrice(mapAgentPrice);
    setAgentPriceDefault(priceDefault);
  };

  const fetchCategory = async () => {
    const data = await getListCategory(false);
    if (data?.data) {
      setListCategory(data.data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    getSites();
  }, [getSites]);

  useEffect(() => {
    if (formData.site_code) {
      let level = CUSTOMER;
      if (profile?.email) {
        level = "register";
      }
      fetchPriceAgentLevelAndProducts(formData.site_code, level);
    }
  }, [formData.site_code, profile.email]);

  return (
    <main className="min-h-screen flex flex-col text-foreground scene">
      <div className="min-h-screen ">
        <Hero />
        <div className=" mx-auto max-w-7xl  sm:px-6 lg:px-8">
          <SearchBar
            formData={formData}
            siteList={siteList}
            onChangeFormData={onChangeFormData}
            onSearch={handleSearch}
          />
          {listProductFilter.length > 0 && (
            <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
                <div>
                  <div className="mt-4">
                    <TicketTabs
                      formType={CUSTOMER}
                      active={filter}
                      onChange={setFilter}
                      listType={personTypes}
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-4">
                    <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3.5 text-sm text-amber-700">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">{geNoteSiteCode(siteCode)}</p>
                        <p className="mt-0.5 text-amber-600/90">
                          Vui lòng mang theo giấy tờ tuỳ thân để được kiểm tra khi cần thiết.
                        </p>
                      </div>
                    </div>
                    {listProductFilter.map((ticket) => (
                      <ProductCard
                        lisCategory={listCategory}
                        key={ticket.code}
                        product={ticket}
                        quantity={items?.get(ticket?.code)?.quantity || 0}
                      />
                    ))}
                  </div>
                </div>
                <SummaryCustomer siteName={currentSite?.name || ""} />
              </div>
            </main>
          )}
        </div>
      </div>
    </main>
  );
}
