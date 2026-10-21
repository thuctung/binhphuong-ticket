"use client";

import { useState } from "react";
import SearchForm, { SearchValues } from "./SearchForm";
import { Product, filterProducts } from "./products";
import ProductTable from "./ProductTable";

// products = list A hiện tại (được cập nhật sau khi đồng bộ)
export default function ProductManagementTab() {
  const [filter, setFilter] = useState<SearchValues>({ name: "", side: "" });

  return (
    <div className="space-y-5">
      <SearchForm onSearch={setFilter} />
      <ProductTable products={[]} />
    </div>
  );
}
