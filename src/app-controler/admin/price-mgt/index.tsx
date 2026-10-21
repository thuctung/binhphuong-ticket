"use client";

import { useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import DefaultPriceCard from "./components/DefaultPriceCard";
import TicketTable from "./components/TicketTable";
import AgentPriceModal from "./components/AgentPriceModal";
import type { SearchFilters, Ticket } from "./types";

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

export default function PriceMgtController() {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [defaults, setDefaults] = useState<Record<string, number>>(MOCK_DEFAULTS);
  const [filters, setFilters] = useState<SearchFilters>({ site: "", product: "" });
  const [editing, setEditing] = useState<Ticket | null>(null);

  const sites = useMemo(
    () => Array.from(new Set(tickets.map((t) => t.site_name))).sort(),
    [tickets]
  );

  const filtered = useMemo(() => {
    const q = filters.product.toLowerCase();
    return tickets.filter(
      (t) =>
        (!filters.site || t.site_name === filters.site) &&
        (!q || t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q))
    );
  }, [tickets, filters]);

  const saveDefault = async (site: string, price: number) => {
    // TODO Supabase:
    // const { error } = await supabase
    //   .from("site_default_prices")
    //   .upsert({ site_name: site, default_price: price }, { onConflict: "site_name" });
    // if (error) throw error;
    setDefaults((d) => ({ ...d, [site]: price }));
  };

  const saveAgentPrice = async (id: number, price: number | null) => {
    // TODO Supabase:
    // const { error } = await supabase.from("tickets").update({ agent_price: price }).eq("id", id);
    // if (error) throw error;
    setTickets((list) => list.map((t) => (t.id === id ? { ...t, agent_price: price } : t)));
  };

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Quản lý vé Sunworld</h1>
        <p className="text-sm text-slate-500">{filtered.length} vé</p>
      </header>

      <SearchBar sites={sites} onSearch={setFilters} />
      <DefaultPriceCard sites={sites} defaults={defaults} onSave={saveDefault} />
      <TicketTable tickets={filtered} defaults={defaults} onEdit={setEditing} />

      <AgentPriceModal
        ticket={editing}
        defaultPrice={editing ? defaults[editing.site_name] : undefined}
        onClose={() => setEditing(null)}
        onSave={saveAgentPrice}
      />
    </main>
  );
}
