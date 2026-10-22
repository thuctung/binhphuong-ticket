"use client";

import { useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import DefaultPriceCard from "./components/DefaultPriceCard";
import AgentPriceModal from "./components/AgentPriceModal";
import type { SearchFilters, Ticket } from "./types";
import { ProductBanaType, SiteType } from "@/types/ticket";
import { AgentType, SearchTableType } from "@/types";
import { AgentPriceAndTypeSubmit, SearchProductType } from "@/app-controler/admin/product-mgt/type";
import { getListAgentPrice, getProductByFilter } from "@/app-controler/admin/product-mgt/api";
import { toast } from "react-toastify";
import { getSideItem } from "@/app-controler/admin/product-mgt/contants";
import { CustomTable, TableColumn } from "@/components/ui/customs/table";
import { formatVND } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { getListAgent } from "@/app-controler/admin/agent-mgt/api";
import { AgentPriceType } from "@/app-controler/admin/agent-price/type";

// ---- Dữ liệu mẫu: thay bằng dữ liệu từ Supabase ----
const MOCK_TICKETS: Ticket[] = [
  {
    id: 1,
    site_name: "Bà Nà Hills",
    code: "BN-AD",
    name: "Vé cáp treo người lớn",
    public_price: 900000,
    unit_price: 780000,
    agent_price: 820000,
    in_system: true,
  },
  {
    id: 2,
    site_name: "Bà Nà Hills",
    code: "BN-TE",
    name: "Vé cáp treo trẻ em",
    public_price: 750000,
    unit_price: 640000,
    agent_price: null,
    in_system: true,
  },
  {
    id: 3,
    site_name: "Bà Nà Hills",
    code: "BN-OLD",
    name: "Vé combo buffet (cũ)",
    public_price: 1200000,
    unit_price: 1050000,
    agent_price: null,
    in_system: false,
  },
  {
    id: 4,
    site_name: "Fansipan Legend",
    code: "FS-AD",
    name: "Vé cáp treo + tàu hỏa",
    public_price: 800000,
    unit_price: 690000,
    agent_price: null,
    in_system: true,
  },
  {
    id: 5,
    site_name: "Hạ Long Park",
    code: "HL-AD",
    name: "Vé tổng hợp người lớn",
    public_price: 600000,
    unit_price: 500000,
    agent_price: 540000,
    in_system: true,
  },
];
const MOCK_DEFAULTS: Record<string, number> = { "Bà Nà Hills": 850000 };
// ----------------------------------------------------

type PriceManagementProps = {
  listSite: SiteType[];
};
const intForm: SearchProductType = {
  name: "",
  site_code: "",
};
export default function PriceManagement({ listSite }: PriceManagementProps) {
  const [totalPages, setTotalPage] = useState(0);
  const [params, setParams] = useState<SearchTableType<SearchProductType>>({
    searchValue: { ...intForm },
    currentPage: 1,
  });

  const [listProduct, setListProduct] = useState<ProductBanaType[]>([]);
  const [listAgent, setListAgent] = useState<AgentType[]>([]);

  const [listPrice, setListPrice] = useState<AgentPriceAndTypeSubmit[]>([]);

  const [itemAgentPrice, setItemAgentPrice] = useState<ProductBanaType | null>(null);

  const currentSite = useMemo(
    () => getSideItem(params.searchValue.site_code, listSite),
    [params.searchValue.site_code, listSite]
  );

  const updateSearchValue = (key: string, value: string) => {
    setParams((pre) => ({ ...pre, searchValue: { ...pre.searchValue, [key]: value } }));
  };

  const fetchListProduct = async (params: SearchTableType<SearchProductType>) => {
    const data = await getProductByFilter(params);
    if (data) {
      const { totalPages, listProduct } = data;
      setTotalPage(totalPages);
      setListProduct(listProduct);
    }
  };

  const handleSearch = () => {
    const { name, site_code } = params.searchValue;
    if (!name && !site_code) {
      toast.warning("Vui nhập thông tin tìm kiếm");
      return;
    }
    fetchListProduct(params);
  };
  const handleChangePage = (page: number) => {
    setParams((pre) => {
      const newValue = { ...pre, currentPage: page };
      fetchListProduct(newValue);
      return newValue;
    });
  };

  const handleOpenAgentForm = async (row: ProductBanaType) => {
    let agents = listAgent;
    if (agents.length === 0) {
      const { data } = await getListAgent({
        searchValue: {},
        currentPage: 1,
      });
      agents = data;
    }
    const { data: priceList } = await getListAgentPrice(row.site_code, row.code);
    if (priceList.length) {
      setListPrice(priceList);
    }
    setListAgent(agents);
    setItemAgentPrice(row);
  };

  const columnProduct: TableColumn<ProductBanaType>[] = [
    {
      key: "name",
      title: "Tên vé",
    },
    {
      key: "site_code",
      title: "Công viên",
      render: (row) => getSideItem(row.site_code, listSite)?.name,
    },
    {
      key: "publicPrice",
      title: "Giá công bố",
      render: (row) => formatVND(row.publicPrice),
    },
    {
      key: "unitPrice",
      title: "Giá đại lý",
      render: (row) => formatVND(row.unitPrice),
    },
    {
      key: "order",
      title: "Vị trí",
    },
    {
      key: "update_product",
      title: "",
      align: "center",
      render: (row) =>
        getSideItem(row.site_code, listSite)?.in_system ? <Button size="sm">Sửa vé</Button> : null,
    },
    {
      key: "update_agent_price",
      title: "",
      align: "center",
      render: (row) => (
        <Button onClick={() => handleOpenAgentForm(row)} size="sm">
          Sửa giá đại lý
        </Button>
      ),
    },
  ];

  const [defaults, setDefaults] = useState<Record<string, number>>(MOCK_DEFAULTS);
  const [filters, setFilters] = useState<SearchFilters>({ site: "", product: "" });
  const [editing, setEditing] = useState<Ticket | null>(null);

  const saveAgentPrice = async (id: number, price: number | null) => {};

  return (
    <main className="space-y-4">
      <SearchBar
        listSite={listSite}
        searchValue={params.searchValue}
        onSearch={handleSearch}
        onChangeSearch={updateSearchValue}
      />

      {currentSite ? <DefaultPriceCard site={currentSite} /> : null}

      <CustomTable
        columns={columnProduct}
        data={listProduct}
        onChangePage={(page) => handleChangePage(page)}
        currentPage={params.currentPage}
        totalPages={totalPages}
      />

      {itemAgentPrice ? (
        <AgentPriceModal
          listSite={listSite}
          listAgent={listAgent}
          prices={listPrice}
          product={itemAgentPrice}
          defaultPrice={editing ? defaults[editing.site_name] : undefined}
          onClose={() => setItemAgentPrice(null)}
          onSave={saveAgentPrice}
        />
      ) : null}
    </main>
  );
}
