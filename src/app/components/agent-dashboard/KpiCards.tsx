import { useEffect, useState } from "react";
import { Users, MessageSquareText, FileClock, PackageCheck, Target, TrendingUp } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { formatUsd } from "../../data/agentDashboardData";

export interface KpiCardDef {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent: string;
}

interface KpiCardsProps {
  cards: KpiCardDef[];
}

/**
 * Summary cards with a brief skeleton loading state so the dashboard is
 * perceived as loading fast (no full-page spinner) even while KPI data
 * resolves. See docs/chapter10-agent-dashboard.md for the perf note.
 */
export function KpiCards({ cards }: KpiCardsProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
    >
      {cards.map((c) => (
        <div key={c.label} className={`bg-white rounded-xl border-l-4 border-r border-t border-b border-gray-200 p-4 ${c.accent}`}>
          <div className="flex items-center justify-between mb-2">
            {c.icon}
            <TrendingUp className="w-4 h-4 text-gray-300" />
          </div>
          {loading ? (
            <>
              <Skeleton className="h-7 w-16 mb-2" />
              <Skeleton className="h-3 w-20 mb-1" />
              <Skeleton className="h-3 w-24" />
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-gray-900">{c.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{c.label}</p>
              <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export function agentKpiCards(opts: {
  assignedSellers: number;
  activeRfqs: number;
  pendingQuotes: number;
  activeOrders: number;
  commissionEarnedUsd: number;
  commissionTargetUsd: number;
}): KpiCardDef[] {
  const pct = Math.min(100, Math.round((opts.commissionEarnedUsd / opts.commissionTargetUsd) * 100));
  return [
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      label: "Assigned Sellers",
      value: String(opts.assignedSellers),
      sub: "within your active mapping",
      accent: "border-l-blue-500",
    },
    {
      icon: <MessageSquareText className="w-5 h-5 text-indigo-600" />,
      label: "Active RFQs",
      value: String(opts.activeRfqs),
      sub: "across assigned sellers",
      accent: "border-l-indigo-500",
    },
    {
      icon: <FileClock className="w-5 h-5 text-amber-600" />,
      label: "Pending Quotes",
      value: String(opts.pendingQuotes),
      sub: "awaiting seller approval",
      accent: "border-l-amber-500",
    },
    {
      icon: <PackageCheck className="w-5 h-5 text-teal-600" />,
      label: "Active Orders",
      value: String(opts.activeOrders),
      sub: "in fulfilment tracking",
      accent: "border-l-teal-500",
    },
    {
      icon: <Target className="w-5 h-5 text-[#2E5529]" />,
      label: "Commission Target",
      value: `${formatUsd(opts.commissionEarnedUsd)}`,
      sub: `${pct}% of ${formatUsd(opts.commissionTargetUsd)} USD goal — this month`,
      accent: "border-l-[#2E5529]",
    },
  ];
}
