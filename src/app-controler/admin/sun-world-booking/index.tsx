"use client";

import { useEffect, useState, type ReactNode } from "react";
import AdminBookingStatus from "./components/booking-status";
import TicketStatus from "./components/ticket-statatus";
import { getSiteByStatus } from "@/components/GetTicketForm/api";
import { SiteType } from "../site/type";
import type { SiteType as TicketSiteType } from "@/types/ticket";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
      {label}
      {children}
    </label>
  );
}

type TabProps = { listSideSun: TicketSiteType[] };

const TABS: {
  id: "status" | "booking" | "refund";
  label: string;
  Component: React.ComponentType<TabProps>;
}[] = [
  { id: "status", label: "Tra cứu trạng thái vé", Component: TicketStatus },
  { id: "booking", label: "Tra cứu booking", Component: AdminBookingStatus },
  { id: "refund", label: "Hoàn hủy vé", Component: AdminBookingStatus },
];
type TabId = (typeof TABS)[number]["id"];

export default function SunworldBookingController() {
  const [active, setActive] = useState<TabId>("status");
  const [listSideSun, setListSideSun] = useState<TicketSiteType[]>([]);

  const ActiveTab = TABS.find((t) => t.id === active)!.Component;

  const fetchListSite = async () => {
    const data = await getSiteByStatus(true);
    if (data?.length) {
      setListSideSun(
        data.filter((item: SiteType) => !item.in_system) as unknown as TicketSiteType[]
      );
    }
  };

  useEffect(() => {
    fetchListSite();
  }, []);

  return (
    <main className="min-h-screen  text-slate-900">
      <div className="mx-auto ">
        <h1 className="text-xl font-semibold">Tra cứu booking Sunworld</h1>

        <div
          role="tablist"
          aria-label="Chức năng tra cứu"
          className="mt-6 flex gap-1 overflow-x-auto border-b border-slate-200"
        >
          {TABS.map((t) => {
            const selected = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                onClick={() => setActive(t.id)}
                className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                  selected
                    ? "border-teal-700 text-teal-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          className="pt-6"
        >
          {/* key để reset form/kết quả khi đổi tab */}
          <ActiveTab key={active} listSideSun={listSideSun} />
        </div>
      </div>
    </main>
  );
}
