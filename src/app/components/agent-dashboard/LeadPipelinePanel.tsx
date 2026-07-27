import type { Lead, LeadStage } from "../../data/agentDashboardData";
import { leadStageBadge } from "./badges";

const STAGE_ORDER: LeadStage[] = [
  "Identified",
  "Qualified",
  "Contacted",
  "Interested",
  "Registration Started",
  "Lost/Disqualified",
];

interface LeadPipelinePanelProps {
  leads: Lead[];
}

export function LeadPipelinePanel({ leads }: LeadPipelinePanelProps) {
  const counts = STAGE_ORDER.map((stage) => ({
    stage,
    count: leads.filter((l) => l.stage === stage).length,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-5 pt-5 pb-3 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Lead Pipeline</h2>
        <p className="text-xs text-gray-400 mt-0.5">Supplier leads sourced by this agent, by lifecycle stage</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-5 py-4">
        {counts.map((c) => (
          <div key={c.stage} className="border border-gray-100 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-gray-900">{c.count}</p>
            <p className="text-[10px] text-gray-500 mt-1 leading-tight">{c.stage}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto border-t border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-5 py-2.5 text-xs text-gray-500 font-semibold">COMPANY</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">REGION</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">CATEGORY</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">STAGE</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">SOURCE</th>
              <th className="text-left px-3 py-2.5 text-xs text-gray-500 font-semibold">LAST ACTIVITY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50">
                <td className="px-5 py-2.5">
                  <p className="text-sm text-gray-800 font-medium">{l.company}</p>
                  {l.note && <p className="text-[11px] text-gray-400">{l.note}</p>}
                </td>
                <td className="px-3 py-2.5 text-xs text-gray-600">{l.region}</td>
                <td className="px-3 py-2.5 text-xs text-gray-600">{l.category}</td>
                <td className="px-3 py-2.5">{leadStageBadge(l.stage)}</td>
                <td className="px-3 py-2.5 text-xs text-gray-500">{l.source}</td>
                <td className="px-3 py-2.5 text-xs text-gray-400">{l.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
