import { FileText, CheckCircle2, AlertTriangle, Send, ShieldCheck, FileWarning } from "lucide-react";
import type { ActivityItem, ActivityType } from "../../data/agentDashboardData";

const ICONS: Record<ActivityType, { icon: React.ReactNode; cls: string }> = {
  rfq_received: { icon: <FileText className="w-4 h-4" />, cls: "bg-blue-100 text-blue-700" },
  quote_accepted: { icon: <CheckCircle2 className="w-4 h-4" />, cls: "bg-green-100 text-green-700" },
  milestone_missed: { icon: <AlertTriangle className="w-4 h-4" />, cls: "bg-red-100 text-red-700" },
  quote_sent: { icon: <Send className="w-4 h-4" />, cls: "bg-indigo-100 text-indigo-700" },
  document_flag: { icon: <FileWarning className="w-4 h-4" />, cls: "bg-amber-100 text-amber-700" },
  seller_activated: { icon: <ShieldCheck className="w-4 h-4" />, cls: "bg-teal-100 text-teal-700" },
};

interface ActivityFeedProps {
  items: ActivityItem[];
  onSelectSeller: (sellerId: string) => void;
}

export function ActivityFeed({ items, onSelectSeller }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Real-Time Activity</h2>
          <p className="text-xs text-gray-400 mt-0.5">Events within your assigned scope</p>
        </div>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Live" />
      </div>
      <div className="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
        {items.map((item) => {
          const conf = ICONS[item.type];
          return (
            <button
              key={item.id}
              onClick={() => onSelectSeller(item.sellerId)}
              className="w-full text-left px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${conf.cls}`}>
                {conf.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-[#2E5529] font-medium truncate max-w-[220px]">{item.sellerName}</span>
                  <span className="text-[11px] text-gray-300">·</span>
                  <span className="text-[11px] text-gray-400">{item.timestamp}</span>
                </div>
              </div>
            </button>
          );
        })}
        {items.length === 0 && (
          <div className="py-10 text-center text-gray-400 text-sm">No activity in your scope yet.</div>
        )}
      </div>
    </div>
  );
}
