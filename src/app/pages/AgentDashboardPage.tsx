import { useState } from "react";
import { Bell, RefreshCw, Shield, User } from "lucide-react";
import {
  CURRENT_AGENT,
  SELLERS,
  ALERTS,
  ROLE_LABELS,
  type Role,
  type Seller,
} from "../data/agentDashboardData";
import { RoleSwitcher } from "../components/agent-dashboard/RoleSwitcher";
import { AgentPortfolioView } from "../components/agent-dashboard/AgentPortfolioView";
import { SupervisorView } from "../components/agent-dashboard/SupervisorView";
import { ComplianceView } from "../components/agent-dashboard/ComplianceView";
import { FinanceView } from "../components/agent-dashboard/FinanceView";
import { SellerDetailDrawer } from "../components/agent-dashboard/SellerDetailDrawer";
import { AlertsPanel } from "../components/agent-dashboard/AlertsPanel";

const ROLE_SUBTITLE: Record<Role, string> = {
  agent: "Aggregated, real-time view — filtered strictly to your agent_seller_mapping scope",
  supervisor: "Team-level rollup across all agents on this team",
  compliance: "Required legal/verification data, document queues, and risk flags",
  finance: "Approved milestone evidence, payment profiles, and commission status",
};

function scopedAlerts(role: Role) {
  if (role === "agent") {
    return ALERTS.filter((a) => a.type !== "mapping_dispute" && a.type !== "agent_risk");
  }
  return ALERTS;
}

export function AgentDashboardPage() {
  const [role, setRole] = useState<Role>("agent");
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);

  const alerts = scopedAlerts(role);
  const criticalCount = alerts.filter((a) => a.severity === "critical").length;

  const handleSelectSellerById = (sellerId: string) => {
    const seller = SELLERS.find((s) => s.id === sellerId);
    if (seller) setSelectedSeller(seller);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Header */}
      <div className="bg-[#2E5529] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 text-green-200 text-xs mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Agent Backend · Portfolio View</span>
              </div>
              <h1 className="text-2xl font-bold">
                {role === "agent" ? "My Portfolio" : `${ROLE_LABELS[role]} Dashboard`}
              </h1>
              <p className="text-green-200 text-sm mt-0.5">{ROLE_SUBTITLE[role]}</p>
            </div>
            <div className="flex items-center gap-3">
              <RoleSwitcher role={role} onChange={setRole} />
              <button
                onClick={() => setAlertsOpen(true)}
                className="relative bg-white/10 hover:bg-white/20 p-2 rounded-lg"
                aria-label="Open alerts"
              >
                <Bell className="w-4 h-4" />
                {alerts.length > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      criticalCount > 0 ? "bg-red-500" : "bg-amber-500"
                    }`}
                  >
                    {alerts.length}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
                <User className="w-4 h-4 text-green-200" />
                <span className="text-sm font-medium">{CURRENT_AGENT.name} · {ROLE_LABELS[role]}</span>
              </div>
              <button className="bg-white/10 hover:bg-white/20 p-1.5 rounded-lg" aria-label="Refresh">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {role === "agent" && (
          <AgentPortfolioView
            selectedSeller={selectedSeller}
            onSelectSeller={setSelectedSeller}
            onClearSelection={() => setSelectedSeller(null)}
          />
        )}
        {role === "supervisor" && <SupervisorView sellers={SELLERS} onSelectSeller={setSelectedSeller} />}
        {role === "compliance" && <ComplianceView onSelectSeller={setSelectedSeller} />}
        {role === "finance" && <FinanceView />}
      </div>

      <SellerDetailDrawer seller={selectedSeller} onClose={() => setSelectedSeller(null)} />
      <AlertsPanel
        open={alertsOpen}
        onOpenChange={setAlertsOpen}
        alerts={alerts}
        onSelectSeller={(id) => {
          handleSelectSellerById(id);
          setAlertsOpen(false);
        }}
      />
    </div>
  );
}
