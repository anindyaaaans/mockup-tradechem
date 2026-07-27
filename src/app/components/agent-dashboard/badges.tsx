import type {
  AlertSeverity,
  CommissionState,
  KycStatus,
  LeadStage,
  SellerTier,
} from "../../data/agentDashboardData";

function pill(cls: string, label: string, key?: string) {
  return (
    <span key={key} className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${cls}`}>
      {label}
    </span>
  );
}

export function tierBadge(tier: SellerTier) {
  const map: Record<SellerTier, string> = {
    Standard: "bg-gray-100 text-gray-700",
    Verified: "bg-blue-100 text-blue-700",
    "Premium-Ready": "bg-purple-100 text-purple-700",
    Strategic: "bg-amber-100 text-amber-800",
  };
  return pill(map[tier], tier);
}

export function kycBadge(status: KycStatus) {
  const map: Record<KycStatus, string> = {
    "Not Submitted": "bg-gray-100 text-gray-600",
    Pending: "bg-blue-100 text-blue-700",
    "Information Required": "bg-amber-100 text-amber-700",
    "Under Review": "bg-indigo-100 text-indigo-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    "Expired/Reverification Required": "bg-red-100 text-red-700",
  };
  return pill(map[status], status);
}

export function commissionBadge(state: CommissionState) {
  const map: Record<CommissionState, string> = {
    Pending: "bg-amber-100 text-amber-700",
    Approved: "bg-blue-100 text-blue-700",
    Paid: "bg-green-100 text-green-700",
    Canceled: "bg-gray-200 text-gray-600",
  };
  return pill(map[state], state);
}

export function leadStageBadge(stage: LeadStage) {
  const map: Record<LeadStage, string> = {
    Identified: "bg-gray-100 text-gray-700",
    Qualified: "bg-blue-100 text-blue-700",
    Contacted: "bg-indigo-100 text-indigo-700",
    Interested: "bg-teal-100 text-teal-700",
    "Registration Started": "bg-purple-100 text-purple-700",
    "Lost/Disqualified": "bg-red-100 text-red-700",
  };
  return pill(map[stage], stage);
}

export function severityBadge(sev: AlertSeverity) {
  const map: Record<AlertSeverity, string> = {
    critical: "bg-red-100 text-red-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-700",
  };
  const label = sev === "critical" ? "Critical" : sev === "warning" ? "Warning" : "Info";
  return pill(map[sev], label);
}

export function docStatusBadge(status: string) {
  const map: Record<string, string> = {
    Missing: "bg-red-100 text-red-700",
    Submitted: "bg-blue-100 text-blue-700",
    "Under Review": "bg-indigo-100 text-indigo-700",
    Approved: "bg-green-100 text-green-700",
    "Expiring Soon": "bg-amber-100 text-amber-700",
    Expired: "bg-red-100 text-red-700",
  };
  return pill(map[status] ?? "bg-gray-100 text-gray-600", status);
}

export function scoreBandBadge(band: string) {
  const map: Record<string, string> = {
    "High Risk": "bg-red-100 text-red-700",
    Basic: "bg-amber-100 text-amber-700",
    Standard: "bg-blue-100 text-blue-700",
    Verified: "bg-teal-100 text-teal-700",
    Strategic: "bg-purple-100 text-purple-700",
  };
  return pill(map[band] ?? "bg-gray-100 text-gray-600", band);
}
