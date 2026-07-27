import { useState } from "react";
import {
  CURRENT_AGENT,
  SELLERS,
  ACTIVITY_FEED,
  LEADS,
  COMMISSIONS,
  FEEDBACK_NOTES,
  getSellerById,
  activeRfqCount,
  pendingQuoteCount,
  activeOrderCount,
  type Seller,
} from "../../data/agentDashboardData";
import { agentKpiCards, KpiCards } from "./KpiCards";
import { SellerRoster } from "./SellerRoster";
import { ActivityFeed } from "./ActivityFeed";
import { LeadPipelinePanel } from "./LeadPipelinePanel";
import { CommissionTrackerPanel } from "./CommissionTrackerPanel";
import { FeedbackNotesPanel } from "./FeedbackNotesPanel";

type SecondaryTab = "leads" | "commission" | "notes";

const SECONDARY_TABS: { key: SecondaryTab; label: string }[] = [
  { key: "leads", label: "Lead Pipeline" },
  { key: "commission", label: "Commission Tracker" },
  { key: "notes", label: "Feedback Notes" },
];

interface AgentPortfolioViewProps {
  selectedSeller: Seller | null;
  onSelectSeller: (seller: Seller) => void;
  onClearSelection: () => void;
}

export function AgentPortfolioView({ selectedSeller, onSelectSeller, onClearSelection }: AgentPortfolioViewProps) {
  const [secondaryTab, setSecondaryTab] = useState<SecondaryTab>("leads");

  const activeRfqs = activeRfqCount();
  const pendingQuotes = pendingQuoteCount();
  const activeOrders = activeOrderCount();
  const commissionEarnedUsd = COMMISSIONS.filter((c) => c.state === "Approved" || c.state === "Paid").reduce((s, c) => s + c.amountUsd, 0);

  const cards = agentKpiCards({
    assignedSellers: SELLERS.length,
    activeRfqs,
    pendingQuotes,
    activeOrders,
    commissionEarnedUsd,
    commissionTargetUsd: CURRENT_AGENT.commissionTargetUsd,
  });

  const handleSelectBySellerId = (sellerId: string) => {
    const seller = getSellerById(sellerId);
    if (seller) onSelectSeller(seller);
  };

  return (
    <div className="space-y-6">
      <KpiCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SellerRoster
            sellers={SELLERS}
            agentName={CURRENT_AGENT.name}
            selectedSeller={selectedSeller}
            onSelectSeller={onSelectSeller}
            onClearSelection={onClearSelection}
          />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed items={ACTIVITY_FEED} onSelectSeller={handleSelectBySellerId} />
        </div>
      </div>

      {/* Secondary components — expandable tabs, not competing for primary weight */}
      <div>
        <div className="flex gap-0 bg-white rounded-t-xl border border-gray-200 border-b-0 px-2">
          {SECONDARY_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setSecondaryTab(t.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                secondaryTab === t.key ? "border-[#2E5529] text-[#2E5529]" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="[&>div]:rounded-t-none">
          {secondaryTab === "leads" && <LeadPipelinePanel leads={LEADS} />}
          {secondaryTab === "commission" && <CommissionTrackerPanel entries={COMMISSIONS} />}
          {secondaryTab === "notes" && <FeedbackNotesPanel notes={FEEDBACK_NOTES} />}
        </div>
      </div>

      <p className="text-[11px] text-gray-400 text-center">
        Revenue figures are normalized to USD for display. Sample data shown for demo purposes only.
      </p>
    </div>
  );
}
