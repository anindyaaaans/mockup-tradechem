import { Banknote, CheckCircle2, ShieldCheck } from "lucide-react";
import { COMMISSIONS, PAYMENT_PROFILES } from "../../data/agentDashboardData";
import { formatUsd } from "../../data/agentDashboardData";
import { KpiCards, type KpiCardDef } from "./KpiCards";
import { CommissionTrackerPanel } from "./CommissionTrackerPanel";

export function FinanceView() {
  const approvedEvidence = COMMISSIONS.filter((c) => c.state === "Approved" || c.state === "Paid");
  const totalPaidUsd = COMMISSIONS.filter((c) => c.state === "Paid").reduce((s, c) => s + c.amountUsd, 0);
  const totalApprovedUsd = COMMISSIONS.filter((c) => c.state === "Approved").reduce((s, c) => s + c.amountUsd, 0);
  const unverifiedProfiles = PAYMENT_PROFILES.filter((p) => !p.verified).length;

  const cards: KpiCardDef[] = [
    { icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />, label: "Approved — Queued for Payout", value: formatUsd(totalApprovedUsd), sub: "delivery-confirmed, awaiting disbursement", accent: "border-l-blue-500" },
    { icon: <Banknote className="w-5 h-5 text-green-600" />, label: "Paid (period to date)", value: formatUsd(totalPaidUsd), sub: "processed by Finance", accent: "border-l-green-500" },
    { icon: <ShieldCheck className="w-5 h-5 text-amber-600" />, label: "Unverified Payment Profiles", value: String(unverifiedProfiles), sub: "bank details pending verification", accent: "border-l-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <KpiCards cards={cards} />

      <CommissionTrackerPanel entries={COMMISSIONS} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Approved Milestone Evidence</h2>
            <p className="text-xs text-gray-400 mt-0.5">Delivery confirmation backing each Approved / Paid commission</p>
          </div>
          <div className="divide-y divide-gray-50">
            {approvedEvidence.map((c) => (
              <div key={c.id} className="px-5 py-3">
                <p className="text-sm text-gray-800 font-medium">{c.orderRef} — {c.sellerName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{c.milestone}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatUsd(c.amountUsd)} USD · updated {c.updatedAt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Agent Payment Profiles</h2>
            <p className="text-xs text-gray-400 mt-0.5">Masked bank references — never fully visible to agents themselves</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-2.5 text-xs text-gray-500 font-semibold">AGENT</th>
                  <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">BANK REF</th>
                  <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">VERIFIED</th>
                  <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">LAST PAYOUT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {PAYMENT_PROFILES.map((p) => (
                  <tr key={p.agentId} className="hover:bg-gray-50">
                    <td className="px-5 py-2.5 text-sm text-gray-800">{p.agentName}</td>
                    <td className="px-3 py-2.5 text-xs font-mono text-gray-600">{p.bankMasked}</td>
                    <td className="px-3 py-2.5">
                      {p.verified ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Verified</span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Pending</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-gray-500">
                      {p.lastPayoutDate === "—" ? "—" : `${formatUsd(p.lastPayoutUsd)} · ${p.lastPayoutDate}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
