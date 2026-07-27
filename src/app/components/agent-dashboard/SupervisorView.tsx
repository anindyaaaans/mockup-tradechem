import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users2, ListChecks, Scale, ShieldAlert, ArrowRight } from "lucide-react";
import {
  LEADS,
  TEAM_PERFORMANCE,
  MAPPING_DISPUTES,
  QUALITY_TREND,
  type Seller,
} from "../../data/agentDashboardData";
import { KpiCards, type KpiCardDef } from "./KpiCards";
import { leadStageBadge } from "./badges";

interface SupervisorViewProps {
  onSelectSeller: (seller: Seller) => void;
  sellers: Seller[];
}

export function SupervisorView({ sellers }: SupervisorViewProps) {
  const [flagFilter, setFlagFilter] = useState<"all" | "flagged">("all");

  const totalAssigned = TEAM_PERFORMANCE.reduce((s, a) => s + a.assignedSellers, 0);
  const avgActiveRatio = Math.round(TEAM_PERFORMANCE.reduce((s, a) => s + a.activeSellerRatio, 0) / TEAM_PERFORMANCE.length);
  const totalFlags = TEAM_PERFORMANCE.reduce((s, a) => s + a.flags, 0);

  const cards: KpiCardDef[] = [
    { icon: <Users2 className="w-5 h-5 text-blue-600" />, label: "Team Members", value: String(TEAM_PERFORMANCE.length), sub: "agents on this team", accent: "border-l-blue-500" },
    { icon: <ListChecks className="w-5 h-5 text-teal-600" />, label: "Sellers Assigned", value: String(totalAssigned), sub: "across all agent mappings", accent: "border-l-teal-500" },
    { icon: <ShieldAlert className="w-5 h-5 text-amber-600" />, label: "Avg. Active Seller Ratio", value: `${avgActiveRatio}%`, sub: "team average — KPI target 60%", accent: "border-l-amber-500" },
    { icon: <Scale className="w-5 h-5 text-purple-600" />, label: "Mapping Disputes", value: String(MAPPING_DISPUTES.length), sub: "open, requiring review", accent: "border-l-purple-500" },
    { icon: <ShieldAlert className="w-5 h-5 text-red-600" />, label: "Agent Risk Flags", value: String(totalFlags), sub: "quality/conduct flags this cycle", accent: "border-l-red-500" },
  ];

  const filteredAgents = flagFilter === "flagged" ? TEAM_PERFORMANCE.filter((a) => a.flags > 0) : TEAM_PERFORMANCE;

  return (
    <div className="space-y-6">
      <KpiCards cards={cards} />

      {/* Team pipeline */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Team Pipeline</h2>
          <p className="text-xs text-gray-400 mt-0.5">Supplier leads across the whole team, by lifecycle stage</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-5 py-4">
          {(["Identified", "Qualified", "Contacted", "Interested", "Registration Started", "Lost/Disqualified"] as const).map((stage) => (
            <div key={stage} className="border border-gray-100 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-gray-900">{LEADS.filter((l) => l.stage === stage).length}</p>
              <div className="mt-1 flex justify-center">{leadStageBadge(stage)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent performance comparison */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Agent Performance</h2>
              <p className="text-xs text-gray-400 mt-0.5">Official KPI comparison across the team</p>
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {(["all", "flagged"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFlagFilter(f)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${flagFilter === f ? "bg-white text-[#2E5529] shadow-sm" : "text-gray-500"}`}
                >
                  {f === "all" ? "All" : "Flagged"}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-2.5 text-xs text-gray-500 font-semibold">AGENT</th>
                  <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">LEADS/WK</th>
                  <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">REG. RATE</th>
                  <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">KYC RATE</th>
                  <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">ACTIVE RATIO</th>
                  <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">FLAGS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredAgents.map((a) => (
                  <tr key={a.agentId} className={`hover:bg-gray-50 ${a.flags > 0 ? "bg-red-50/30" : ""}`}>
                    <td className="px-5 py-2.5">
                      <p className="text-sm font-medium text-gray-900">{a.name}</p>
                      <p className="text-[11px] text-gray-400">{a.functionRole}</p>
                    </td>
                    <td className="px-3 py-2.5 text-sm text-gray-700">{a.qualifiedLeadsPerWeek}</td>
                    <td className="px-3 py-2.5 text-sm">
                      <span className={a.registrationCompletionRate >= 70 ? "text-green-600" : "text-amber-600"}>{a.registrationCompletionRate}%</span>
                    </td>
                    <td className="px-3 py-2.5 text-sm">
                      <span className={a.kycApprovalRate >= 85 ? "text-green-600" : "text-amber-600"}>{a.kycApprovalRate}%</span>
                    </td>
                    <td className="px-3 py-2.5 text-sm">
                      <span className={a.activeSellerRatio >= 60 ? "text-green-600" : "text-amber-600"}>{a.activeSellerRatio}%</span>
                    </td>
                    <td className="px-3 py-2.5">
                      {a.flags > 0 ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">{a.flags}</span>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quality / fraud trend */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Seller Quality &amp; Fraud Trend</h2>
            <p className="text-xs text-gray-400 mt-0.5">Team-wide average quality score vs. confirmed fake/duplicate sellers</p>
          </div>
          <div className="px-3 pt-4 pb-2" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={QUALITY_TREND} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="avgScore" name="Avg. Quality Score" stroke="#2E5529" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="fakeOrDuplicate" name="Confirmed Fake/Duplicate" stroke="#DC2626" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 px-5 pb-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2E5529]" /> Avg. Quality Score</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Confirmed Fake/Duplicate</span>
          </div>
        </div>
      </div>

      {/* Mapping disputes */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-purple-500" /> Mapping Disputes
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Agent–seller attribution disputes awaiting supervisor decision</p>
        </div>
        <div className="divide-y divide-gray-50">
          {MAPPING_DISPUTES.map((d) => (
            <div key={d.id} className="px-5 py-3.5 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-medium text-gray-900">{d.sellerName} <span className="text-xs text-gray-400 font-normal">({d.sellerId})</span></p>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                  {d.agentA} <ArrowRight className="w-3 h-3 text-gray-300" /> {d.agentB}
                  <span className="text-gray-300">·</span> opened {d.openedAt}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  d.status === "Escalated" ? "bg-red-100 text-red-700" : d.status === "Under Review" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                }`}
              >
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        {sellers.length} sellers visible in the underlying dataset for this demo — supervisor scope is team-wide rather than a single agent_seller_mapping.
      </p>
    </div>
  );
}
