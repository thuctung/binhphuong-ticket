"use client";

import { useMemo, useState } from "react";

import { SearchTableType } from "@/types";
import { RefundHistorySubmit, SearchRefunType } from "../../type";
import { SiteType } from "@/types/ticket";
import { CustomTable, TableColumn } from "@/components/ui/customs/table";
import { df_From, df_To } from "@/app-controler/admin/history/constant";
import { getProfileByEmail, getRefundHistory, updateBalanceHistory } from "../../api";
import SearchRefundForm from "./components/search-form";
import { covertDateFormToServer } from "@/helpers/dateTime";
import { formatVND } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { getSideItem } from "@/app-controler/admin/product-mgt/contants";
import RefundAgentDialog from "./components/add-moeny";
import { toast } from "react-toastify";

const initSearch = { site_code: "", email: "", from: df_From, to: df_To, third_party_number: "" };

export default function RefundHistory({ listSideSun }: { listSideSun: SiteType[] }) {
  const [totalPages, setTotalPage] = useState(0);
  const [params, setParams] = useState<SearchTableType<SearchRefunType>>({
    searchValue: initSearch,
    currentPage: 1,
  });

  const [litsHistory, setListHistory] = useState<RefundHistorySubmit[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [currentData, setCurrentData] = useState<RefundHistorySubmit | null>(null);

  const returnMoney = useMemo(() => {
    if (currentData) {
      return currentData.total_price - currentData.return_charge;
    }
    return 0;
  }, [currentData]);

  const handleOpenDialog = (row: RefundHistorySubmit) => {
    setCurrentData(row);
    setOpenDialog(true);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
    setCurrentData(null);
  };

  const onChangeSearch = (key: string, value: string) => {
    setParams((pre) => ({
      ...pre,
      searchValue: {
        ...pre.searchValue,
        [key]: value,
      },
    }));
  };

  const handleSearchHistory = async () => {
    const data = await getRefundHistory({
      ...params,
      searchValue: {
        ...params.searchValue,
        from: covertDateFormToServer(params.searchValue.from),
        to: covertDateFormToServer(params.searchValue.to),
      },
    });
    if (data) {
      const { listHistory, totalPages } = data;
      setListHistory(listHistory);
      setTotalPage(totalPages);
    }
  };

  const handleReturnMoneyAffilate = async (money: number) => {
    if (currentData) {
      const { data } = await getProfileByEmail(currentData.email_order);
      console.log(currentData.total_price , currentData.return_charge , money)
      if (data) {
        const { role, agent_level, user_id } = data;
        if (role !== "affiliate" || agent_level === "register" || agent_level === "customer") {
          toast.error("Đối tượng không phải là đại lý");
          return;
        }
        const resUpdate = await updateBalanceHistory({
          user_id,
          id_history: currentData.id || "",
          amount: money,
        });
        if (resUpdate) {
          toast.success("Hoàn tiền thành công");
          onCloseDialog();
          handleSearchHistory();
        }
      } else {
        toast.error("Không tìm thấy đại lý");
      }
    }
  };

  const columnAffStats: TableColumn<RefundHistorySubmit>[] = [
    {
      key: "site_code",
      title: "Công viên",
      render: (row) => getSideItem(row.site_code, listSideSun)?.name,
    },
    {
      key: "email_order",
      title: "Email order",
      align: "center",
    },
    {
      key: "product_name",
      title: "Tên vé",
      align: "left",
    },

    {
      key: "unit_price",
      title: "Giá vé",
      align: "center",
      render: (row) => formatVND(row.unit_price),
    },
    {
      key: "quantity",
      title: "Số lượng",
      align: "center",
    },
    {
      key: "unit_price",
      title: "Tổng tiền",
      align: "center",
      render: (row) => formatVND(row.total_price),
    },
    {
      key: "return_rate",
      title: "Phần trăm phí",
      align: "center",
      render: (row) => `${row.return_rate}%`,
    },
    {
      key: "return_charge",
      title: "Phí hoàn vé",
      align: "center",
      render: (row) => formatVND(row.return_charge),
    },
    {
      key: "get_price",
      title: "Nhận lại",
      align: "center",
      render: (row) => formatVND(row.total_price - row.return_charge),
    },
    {
      key: "action",
      title: "Hoàn tiền",
      align: "center",
      render: (row) =>
        row.status === "UNPAID" ? (
          <Button onClick={() => handleOpenDialog(row)}>Hoàn tiền</Button>
        ) : (
          <p className="text-green-500">Đã hoàn</p>
        ),
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Lịch sử hoàn vé</h1>
      </header>
      <SearchRefundForm
        searchValue={params.searchValue}
        onChange={onChangeSearch}
        handleSearch={handleSearchHistory}
        listSideSun={listSideSun}
      />

      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <CustomTable
          columns={columnAffStats}
          data={litsHistory}
          totalPages={totalPages}
          onChangePage={(page) => setParams((pre) => ({ ...pre, currentPage: page }))}
        />
      </section>

      {currentData ? (
        <RefundAgentDialog
          open={openDialog}
          onClose={onCloseDialog}
          onSubmit={handleReturnMoneyAffilate}
          maxAmount={returnMoney}
        />
      ) : null}
    </main>
  );
}
