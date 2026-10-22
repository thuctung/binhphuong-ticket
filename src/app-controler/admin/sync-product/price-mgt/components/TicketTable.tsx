import { formatVND, type Ticket } from "../types";

type Props = {
  tickets: Ticket[];
  defaults: Record<string, number>;
  onEdit: (ticket: Ticket) => void;
};

export default function TicketTable({ tickets, defaults, onEdit }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">Site</th>
            <th className="px-4 py-3 font-medium">Tên vé</th>
            <th className="px-4 py-3 text-right font-medium">Giá công bố</th>
            <th className="px-4 py-3 text-right font-medium">Giá đơn vị</th>
            <th className="px-4 py-3 text-right font-medium">Giá đại lý</th>
            <th className="px-4 py-3 font-medium">Trong hệ thống</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tickets.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                Không tìm thấy vé nào. Thử đổi từ khóa hoặc xóa bộ lọc.
              </td>
            </tr>
          )}

          {tickets.map((t) => {
            const fallback = defaults[t.site_name];
            return (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-700">{t.site_name}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.code}</div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{formatVND(t.public_price)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatVND(t.unit_price)}</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {t.agent_price != null ? (
                    formatVND(t.agent_price)
                  ) : fallback != null ? (
                    <span className="text-slate-400" title="Đang dùng giá mặc định của site">
                      {formatVND(fallback)}
                    </span>
                  ) : (
                    <span className="text-slate-400">Chưa có</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {t.in_system ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      Có
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      Đã ngừng
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onEdit(t)}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                  >
                    Sửa giá đại lý
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
