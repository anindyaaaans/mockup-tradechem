import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import {
  AlertOctagon,
  FileWarning,
  Copy,
  Scale,
  MoonStar,
  Banknote,
  ShieldAlert,
} from "lucide-react";
import type { AlertItem, AlertType } from "../../data/agentDashboardData";
import { severityBadge } from "./badges";

const ICONS: Record<AlertType, React.ReactNode> = {
  seller_stalled: <AlertOctagon className="w-4 h-4" />,
  document_expiring: <FileWarning className="w-4 h-4" />,
  duplicate_seller: <Copy className="w-4 h-4" />,
  mapping_dispute: <Scale className="w-4 h-4" />,
  inactivity: <MoonStar className="w-4 h-4" />,
  commission_hold: <Banknote className="w-4 h-4" />,
  agent_risk: <ShieldAlert className="w-4 h-4" />,
};

const SEVERITY_ICON_BG: Record<string, string> = {
  critical: "bg-red-100 text-red-600",
  warning: "bg-amber-100 text-amber-600",
  info: "bg-blue-100 text-blue-600",
};

interface AlertsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alerts: AlertItem[];
  onSelectSeller?: (sellerId: string) => void;
}

/**
 * Standalone alert drawer, reusable from both the Agent Portfolio View and
 * the Supervisor Dashboard. Lists: seller stalled beyond SLA, missing/expiring
 * document, duplicate-seller warning, mapping dispute, inactivity, commission
 * on hold, agent-risk warning.
 */
export function AlertsPanel({ open, onOpenChange, alerts, onSelectSeller }: AlertsPanelProps) {
  const criticalCount = alerts.filter((a) => a.severity === "critical").length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="border-b border-gray-100 px-5 py-4">
          <SheetTitle>Alerts</SheetTitle>
          <SheetDescription>
            {alerts.length} open alert{alerts.length === 1 ? "" : "s"}
            {criticalCount > 0 && <span className="text-red-600 font-medium"> · {criticalCount} critical</span>}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {alerts.map((a) => (
            <div
              key={a.id}
              onClick={() => a.sellerId && onSelectSeller?.(a.sellerId)}
              className={`px-5 py-3.5 ${a.sellerId ? "cursor-pointer hover:bg-gray-50" : ""}`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${SEVERITY_ICON_BG[a.severity]}`}>
                  {ICONS[a.type]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-gray-900">{a.title}</p>
                    {severityBadge(a.severity)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{a.detail}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {(a.sellerName || a.agentName) && (
                      <span className="text-[11px] text-[#2E5529] font-medium">{a.sellerName ?? a.agentName}</span>
                    )}
                    <span className="text-[11px] text-gray-300">·</span>
                    <span className="text-[11px] text-gray-400">{a.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">No open alerts.</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
