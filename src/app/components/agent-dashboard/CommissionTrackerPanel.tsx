import type { CommissionEntry, CommissionState } from "../../data/agentDashboardData";
import { formatUsd } from "../../data/agentDashboardData";
import { commissionBadge } from "./badges";

const STATES: CommissionState[] = ["Pending", "Approved", "Paid", "Canceled"];

interface CommissionTrackerPanelProps {
  entries: CommissionEntry[];
}

export function CommissionTrackerPanel({ entries }: CommissionTrackerPanelProps) {
  const totals = STATES.map((state) => ({
    state,
    total: entries.filter((e) => e.state === state).reduce((sum, e) => sum + e.amountUsd, 0),
    count: entries.filter((e) => e.state === state).length,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-5 pt-5 pb-3 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Commission Tracker</h2>
        <p className="text-xs text-gray-400 mt-0.5">Four canonical states only — driven by OMS and Finance events, not agent action</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 py-4">
        {totals.map((t) => (
          <div key={t.state} className="border border-gray-100 rounded-lg p-3">
            {commissionBadge(t.state)}
            <p className="text-lg font-bold text-gray-900 mt-2">{formatUsd(t.total)}</p>
            <p className="text-[10px] text-gray-400">{t.count} entr{t.count === 1 ? "y" : "ies"}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto border-t border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-5 py-2.5 text-xs text-gray-500 font-semibold">SELLER</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">ORDER REF</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">AMOUNT</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">STATE</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">MILESTONE</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">UPDATED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {entries.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-5 py-2.5 text-sm text-gray-800">{e.sellerName}</td>
                <td className="px-3 py-2.5 text-xs font-mono text-[#2E5529]">{e.orderRef}</td>
                <td className="px-3 py-2.5 text-sm font-semibold text-gray-900">{formatUsd(e.amountUsd)} <span className="text-[10px] font-normal text-gray-400">USD</span></td>
                <td className="px-3 py-2.5">{commissionBadge(e.state)}</td>
                <td className="px-3 py-2.5 text-xs text-gray-500 max-w-[220px]">{e.milestone}</td>
                <td className="px-3 py-2.5 text-xs text-gray-400">{e.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
