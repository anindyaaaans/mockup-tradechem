import { FileWarning, ShieldCheck, Copy } from "lucide-react";
import { SELLERS, ALERTS, type Seller } from "../../data/agentDashboardData";
import { KpiCards, type KpiCardDef } from "./KpiCards";
import { kycBadge, docStatusBadge, severityBadge } from "./badges";

interface ComplianceViewProps {
  onSelectSeller: (seller: Seller) => void;
}

export function ComplianceView({ onSelectSeller }: ComplianceViewProps) {
  const docQueue = SELLERS.flatMap((s) =>
    s.documents
      .filter((d) => d.status !== "Approved")
      .map((d) => ({ seller: s, doc: d }))
  );
  const kycQueue = SELLERS.filter((s) => s.kycStatus !== "Approved");
  const complianceAlerts = ALERTS.filter((a) => ["duplicate_seller", "seller_stalled", "document_expiring"].includes(a.type));

  const cards: KpiCardDef[] = [
    { icon: <FileWarning className="w-5 h-5 text-amber-600" />, label: "Documents in Queue", value: String(docQueue.length), sub: "missing, under review, or expiring", accent: "border-l-amber-500" },
    { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, label: "KYC Not Approved", value: String(kycQueue.length), sub: "of " + SELLERS.length + " sellers reviewed", accent: "border-l-blue-500" },
    { icon: <Copy className="w-5 h-5 text-red-600" />, label: "Fraud/Risk Flags", value: String(complianceAlerts.length), sub: "duplicate, stalled, or expiring-document flags", accent: "border-l-red-500" },
  ];

  return (
    <div className="space-y-6">
      <KpiCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Document Review Queue</h2>
            <p className="text-xs text-gray-400 mt-0.5">Required legal / verification evidence pending action</p>
          </div>
          <div className="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
            {docQueue.map(({ seller, doc }, i) => (
              <button
                key={`${seller.id}-${doc.name}-${i}`}
                onClick={() => onSelectSeller(seller)}
                className="w-full text-left px-5 py-3 flex items-center justify-between gap-3 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm text-gray-800">{doc.name}</p>
                  <p className="text-xs text-[#2E5529] font-medium">{seller.name}</p>
                </div>
                {docStatusBadge(doc.status)}
              </button>
            ))}
            {docQueue.length === 0 && <div className="py-10 text-center text-gray-400 text-sm">Queue is clear.</div>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Risk Flags</h2>
            <p className="text-xs text-gray-400 mt-0.5">Fake/duplicate-seller, stalled, and expiring-document signals</p>
          </div>
          <div className="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
            {complianceAlerts.map((a) => (
              <button
                key={a.id}
                onClick={() => a.sellerId && onSelectSeller(SELLERS.find((s) => s.id === a.sellerId)!)}
                className="w-full text-left px-5 py-3 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-900">{a.title}</p>
                  {severityBadge(a.severity)}
                </div>
                <p className="text-xs text-gray-500 mt-1">{a.detail}</p>
                <p className="text-[11px] text-[#2E5529] font-medium mt-1">{a.sellerName}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">KYC Status by Seller</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-5 py-2.5 text-xs text-gray-500 font-semibold">SELLER</th>
                <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">REGION</th>
                <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">KYC STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SELLERS.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onSelectSeller(s)}>
                  <td className="px-5 py-2.5 text-sm text-gray-800">{s.name}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">{s.region}</td>
                  <td className="px-3 py-2.5">{kycBadge(s.kycStatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
