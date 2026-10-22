import { Search } from "lucide-react";
import React from "react";
import Pagination from "../../pagination";

export type TableColumn<T> = {
  key: string;
  title: string;
  width?: string | number;
  className?: string;
  render?: (row: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
};

export type TableConfig<T> = {
  columns: TableColumn<T>[];
  data: T[];
  onChangePage?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  tableTitle?: string;
};

export function CustomTable<T>({
  columns,
  data,
  onChangePage,
  currentPage,
  totalPages,
  tableTitle,
}: TableConfig<T>) {
  return (
    <>
      {tableTitle ? (
        <div>
          <h2 className="text-xl font-bold text-gray-800">{tableTitle}</h2>
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 whitespace-nowrap">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 font-medium ${col.className ?? ""}`}
                  style={{
                    width: col.width,
                    textAlign: col.align ?? "left",
                  }}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 whitespace-nowrap">
            {data.length ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50">
                  {columns.map((col, index) => (
                    <td
                      key={index}
                      className={`py-4 px-3  text-slate-700 ${col.className ?? ""}`}
                      style={{ textAlign: col.align ?? "left" }}
                    >
                      {col.render ? col.render(row, rowIndex) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  Không tìm thấy vé nào. Thử đổi từ khóa hoặc xóa bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {onChangePage ? (
        <div className="flex justify-center items-center py-4">
          <Pagination
            page={currentPage || 1}
            onChangePage={onChangePage}
            totalPages={totalPages || 0}
          />
        </div>
      ) : null}
    </>
  );
}
