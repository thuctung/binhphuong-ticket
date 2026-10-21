"use client";

import { Product, SIDES, formatPrice } from "./products";

export default function ProductTable({ products }: { products: Product[] }) {
  const th = "px-4 py-3 text-left text-sm font-medium text-slate-600";
  const td = "px-4 py-3 text-sm text-slate-800";

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className={th}>Mã SP</th>
            <th className={th}>Tên sản phẩm</th>
            <th className={th}>Side</th>
            <th className={`${th} text-right`}>Giá</th>
            <th className={th}>Cập nhật</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">
                Không tìm thấy sản phẩm nào. Thử đổi từ khóa hoặc xóa bộ lọc.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.code} className="hover:bg-slate-50">
                <td className={`${td} tabular-nums text-slate-500`}>{p.code}</td>
                <td className={`${td} font-medium`}>{p.name}</td>
                <td className={td}>{SIDES.find((s) => s.value === p.side)?.label}</td>
                <td className={`${td} text-right tabular-nums`}>{formatPrice(p.price)}</td>
                <td className={`${td} tabular-nums text-slate-500`}>{p.updatedAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
