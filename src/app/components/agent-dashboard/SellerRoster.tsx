import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, UserCog, X } from "lucide-react";
import type { Seller } from "../../data/agentDashboardData";
import { toUsd, formatUsd } from "../../data/agentDashboardData";
import { tierBadge } from "./badges";

const PAGE_SIZE = 5;

interface SellerRosterProps {
  sellers: Seller[];
  agentName: string;
  onSelectSeller: (seller: Seller) => void;
  selectedSeller: Seller | null;
  onClearSelection: () => void;
}

export function SellerRoster({ sellers, agentName, onSelectSeller, selectedSeller, onClearSelection }: SellerRosterProps) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(sellers.length / PAGE_SIZE));
  const paged = sellers.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {selectedSeller && (
        <div className="flex items-center justify-between gap-3 px-5 py-2.5 bg-[#2E5529]/5 border-b border-[#2E5529]/15 rounded-t-xl">
          <div className="flex items-center gap-2 text-sm text-[#2E5529] font-medium">
            <UserCog className="w-4 h-4" />
            Viewing As: Agent for Supplier {selectedSeller.name}
          </div>
          <button
            onClick={onClearSelection}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      )}

      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Seller Roster</h2>
          <p className="text-xs text-gray-400 mt-0.5">Scoped to {agentName}'s active agent–seller mapping</p>
        </div>
        <span className="text-xs text-gray-400">{sellers.length} assigned sellers</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-2.5 text-xs text-gray-500 font-semibold">SELLER NAME</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">REGION</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">VERIFICATION TIER</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">ACTIVE RFQS</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">RECENT REVENUE</th>
              <th className="px-3 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paged.map((s) => {
              const usd = toUsd(s.recentRevenue, s.currency);
              const isSelected = selectedSeller?.id === s.id;
              return (
                <tr
                  key={s.id}
                  onClick={() => onSelectSeller(s)}
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${isSelected ? "bg-[#2E5529]/5" : ""} ${s.idle ? "bg-amber-50/40" : ""}`}
                >
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 text-sm leading-tight">{s.name}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">{s.productCategory} · {s.id}</p>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600">{s.region}</td>
                  <td className="px-3 py-3">{tierBadge(s.verificationTier)}</td>
                  <td className="px-3 py-3 text-sm text-gray-800 font-medium">{s.activeRfqs}</td>
                  <td className="px-3 py-3">
                    <p className="text-sm font-semibold text-gray-900">{formatUsd(usd)} <span className="text-[10px] font-normal text-gray-400">USD</span></p>
                    {s.currency !== "USD" && (
                      <p className="text-[10px] text-gray-400">
                        ≈ converted from {s.recentRevenue.toLocaleString()} {s.currency}
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectSeller(s); }}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-[#2E5529]"
                      aria-label={`View ${s.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl flex items-center justify-between text-xs text-gray-500">
        <span>
          Showing {page * PAGE_SIZE + 1}–{Math.min(sellers.length, page * PAGE_SIZE + PAGE_SIZE)} of {sellers.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="p-1 rounded border border-gray-200 disabled:opacity-30 hover:bg-white"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="px-2">{page + 1} / {pageCount}</span>
          <button
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="p-1 rounded border border-gray-200 disabled:opacity-30 hover:bg-white"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
