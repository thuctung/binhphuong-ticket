"use client";

import { useState } from "react";
import Tabs from "./components/Tabs";
import ProductSyncTab from "./components/ProductSyncTab";
import ProductManagementTab from "./components/ProductManagementTab";

const TABS = [
  { key: "manage", label: "Quản lý sản phẩm" },
  { key: "sync", label: "Đồng bộ sản phẩm" },
];

export default function ProductsPage() {
  const [active, setActive] = useState("manage");

  return (
    <main className="  px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Sản phẩm</h1>
      <Tabs tabs={TABS} active={active} onChange={setActive} />
      <section className="pt-6">
        {active === "manage" ? <ProductManagementTab /> : <ProductSyncTab />}
      </section>
    </main>
  );
}
