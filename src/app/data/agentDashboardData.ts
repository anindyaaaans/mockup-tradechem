// ── Chapter 10 · Agent Dashboard (Portfolio View) — mock data ──────────────────
// All names, companies, RFQ references, and figures below are fictional sample
// data for demo/wireframe purposes only. Values are illustrative, not real.

export type Currency = "USD" | "CNY" | "IDR" | "SGD";

export const FX_TO_USD: Record<Currency, number> = {
  USD: 1,
  CNY: 0.14,
  IDR: 0.000062,
  SGD: 0.74,
};

export function toUsd(amount: number, currency: Currency) {
  return Math.round(amount * FX_TO_USD[currency]);
}

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

// ── Roles ────────────────────────────────────────────────────────────────────
export type Role = "agent" | "supervisor" | "compliance" | "finance";

export const ROLE_LABELS: Record<Role, string> = {
  agent: "Agent",
  supervisor: "Supervisor",
  compliance: "Compliance",
  finance: "Finance",
};

// ── Current signed-in agent (demo) ──────────────────────────────────────────
export const CURRENT_AGENT = {
  id: "AGT-0142",
  name: "Anindya Nabila",
  function: "Outreach & Relationship Agent",
  tier: "Tier 2" as const,
  region: "Jiangsu / Zhejiang, China",
  commissionTargetUsd: 4200,
};

// ── Verification / seller tier ──────────────────────────────────────────────
export type SellerTier = "Standard" | "Verified" | "Premium-Ready" | "Strategic";
export type OnboardingStage =
  | "Registration"
  | "Documents"
  | "KYC"
  | "Storefront"
  | "Activation"
  | "Tier Commitment";
export type KycStatus =
  | "Not Submitted"
  | "Pending"
  | "Information Required"
  | "Under Review"
  | "Approved"
  | "Rejected"
  | "Expired/Reverification Required";

export interface SellerDocument {
  name: string;
  status: "Missing" | "Submitted" | "Under Review" | "Approved" | "Expiring Soon" | "Expired";
  expiry?: string;
}

export interface Seller {
  id: string;
  name: string;
  region: string;
  country: string;
  productCategory: string;
  verificationTier: SellerTier;
  activeRfqs: number;
  recentRevenue: number;
  currency: Currency;
  onboardingStage: OnboardingStage;
  onboardingStagesDone: OnboardingStage[];
  lastLogin: string;
  lastCatalogueUpdate: string;
  lastRfqResponse: string;
  idle: boolean;
  documents: SellerDocument[];
  kycStatus: KycStatus;
  storefront: {
    profileCompletion: number; // %
    productCount: number;
    technicalDataCompleteness: number; // %
    imageCompleteness: number; // %
    missing: string[];
  };
  qualityScore: {
    overall: number; // 0-100
    band: "High Risk" | "Basic" | "Standard" | "Verified" | "Strategic";
    riskFlags: string[];
    lastScoredOn: string;
    trend: "up" | "down" | "flat";
  };
  tierReadiness: {
    currentTier: SellerTier;
    eligibleNextTier: SellerTier | null;
    missingRequirements: string[];
    commitmentStatus: "Not Started" | "In Discussion" | "Committed" | "Declined";
  };
}

export const SELLERS: Seller[] = [
  {
    id: "SLR-3301",
    name: "Nanjing Runchuan Chemical Co.",
    region: "Jiangsu, China",
    country: "China",
    productCategory: "Acetic Acid / Solvents",
    verificationTier: "Verified",
    activeRfqs: 3,
    recentRevenue: 116400,
    currency: "USD",
    onboardingStage: "Tier Commitment",
    onboardingStagesDone: ["Registration", "Documents", "KYC", "Storefront", "Activation"],
    lastLogin: "2026-07-26",
    lastCatalogueUpdate: "2026-07-24",
    lastRfqResponse: "2026-07-25",
    idle: false,
    documents: [
      { name: "Business License", status: "Approved" },
      { name: "Tax ID", status: "Approved" },
      { name: "SDS", status: "Approved" },
      { name: "TDS", status: "Approved" },
      { name: "COA", status: "Expiring Soon", expiry: "2026-08-14" },
      { name: "Export Certificate", status: "Approved" },
    ],
    kycStatus: "Approved",
    storefront: {
      profileCompletion: 100,
      productCount: 18,
      technicalDataCompleteness: 92,
      imageCompleteness: 88,
      missing: [],
    },
    qualityScore: {
      overall: 82,
      band: "Verified",
      riskFlags: [],
      lastScoredOn: "2026-07-20",
      trend: "up",
    },
    tierReadiness: {
      currentTier: "Verified",
      eligibleNextTier: "Premium-Ready",
      missingRequirements: ["Confirm paid-tier commitment"],
      commitmentStatus: "In Discussion",
    },
  },
  {
    id: "SLR-3298",
    name: "Formosa Wanhua Specialty Chemicals",
    region: "Zhejiang, China",
    country: "China",
    productCategory: "Sodium Hydroxide / Inorganic Salts",
    verificationTier: "Premium-Ready",
    activeRfqs: 1,
    recentRevenue: 610000,
    currency: "CNY",
    onboardingStage: "Tier Commitment",
    onboardingStagesDone: ["Registration", "Documents", "KYC", "Storefront", "Activation", "Tier Commitment"],
    lastLogin: "2026-07-27",
    lastCatalogueUpdate: "2026-07-22",
    lastRfqResponse: "2026-07-27",
    idle: false,
    documents: [
      { name: "Business License", status: "Approved" },
      { name: "Tax ID", status: "Approved" },
      { name: "SDS", status: "Approved" },
      { name: "TDS", status: "Approved" },
      { name: "COA", status: "Approved" },
      { name: "Export Certificate", status: "Approved" },
    ],
    kycStatus: "Approved",
    storefront: {
      profileCompletion: 100,
      productCount: 26,
      technicalDataCompleteness: 96,
      imageCompleteness: 94,
      missing: [],
    },
    qualityScore: {
      overall: 91,
      band: "Strategic",
      riskFlags: [],
      lastScoredOn: "2026-07-24",
      trend: "up",
    },
    tierReadiness: {
      currentTier: "Premium-Ready",
      eligibleNextTier: "Strategic",
      missingRequirements: ["Strategic-review sign-off pending"],
      commitmentStatus: "Committed",
    },
  },
  {
    id: "SLR-3312",
    name: "Rongcheng Delta Chemical Trading",
    region: "Shandong, China",
    country: "China",
    productCategory: "Sulfuric Acid / Battery-Grade Chemicals",
    verificationTier: "Standard",
    activeRfqs: 1,
    recentRevenue: 28900,
    currency: "USD",
    onboardingStage: "KYC",
    onboardingStagesDone: ["Registration", "Documents"],
    lastLogin: "2026-07-10",
    lastCatalogueUpdate: "2026-07-08",
    lastRfqResponse: "2026-07-09",
    idle: true,
    documents: [
      { name: "Business License", status: "Approved" },
      { name: "Tax ID", status: "Approved" },
      { name: "SDS", status: "Under Review" },
      { name: "TDS", status: "Missing" },
      { name: "COA", status: "Missing" },
      { name: "Export Certificate", status: "Missing" },
    ],
    kycStatus: "Information Required",
    storefront: {
      profileCompletion: 55,
      productCount: 4,
      technicalDataCompleteness: 40,
      imageCompleteness: 25,
      missing: ["Company banner", "Product technical sheets", "Minimum 6 SKUs required"],
    },
    qualityScore: {
      overall: 48,
      band: "Basic",
      riskFlags: ["Missing TDS/COA", "No RFQ response in 14+ days"],
      lastScoredOn: "2026-07-11",
      trend: "down",
    },
    tierReadiness: {
      currentTier: "Standard",
      eligibleNextTier: null,
      missingRequirements: ["Complete KYC", "Submit TDS and COA", "Improve storefront readiness"],
      commitmentStatus: "Not Started",
    },
  },
  {
    id: "SLR-3287",
    name: "CNOOC Meilan Petrochemical Supply",
    region: "Guangdong, China",
    country: "China",
    productCategory: "Methanol / Ethylene Glycol",
    verificationTier: "Verified",
    activeRfqs: 2,
    recentRevenue: 178200,
    currency: "USD",
    onboardingStage: "Activation",
    onboardingStagesDone: ["Registration", "Documents", "KYC", "Storefront", "Activation"],
    lastLogin: "2026-07-25",
    lastCatalogueUpdate: "2026-07-20",
    lastRfqResponse: "2026-07-24",
    idle: false,
    documents: [
      { name: "Business License", status: "Approved" },
      { name: "Tax ID", status: "Approved" },
      { name: "SDS", status: "Approved" },
      { name: "TDS", status: "Approved" },
      { name: "COA", status: "Approved" },
      { name: "Export Certificate", status: "Under Review" },
    ],
    kycStatus: "Approved",
    storefront: {
      profileCompletion: 96,
      productCount: 14,
      technicalDataCompleteness: 85,
      imageCompleteness: 80,
      missing: ["1 product missing HS code"],
    },
    qualityScore: {
      overall: 76,
      band: "Verified",
      riskFlags: [],
      lastScoredOn: "2026-07-18",
      trend: "flat",
    },
    tierReadiness: {
      currentTier: "Verified",
      eligibleNextTier: "Premium-Ready",
      missingRequirements: ["Export certificate approval pending"],
      commitmentStatus: "In Discussion",
    },
  },
  {
    id: "SLR-3320",
    name: "Qingzhou Baiyun Fine Chemicals",
    region: "Shandong, China",
    country: "China",
    productCategory: "Citric Acid / Food-Grade Additives",
    verificationTier: "Standard",
    activeRfqs: 0,
    recentRevenue: 0,
    currency: "USD",
    onboardingStage: "Documents",
    onboardingStagesDone: ["Registration"],
    lastLogin: "2026-06-30",
    lastCatalogueUpdate: "2026-06-28",
    lastRfqResponse: "—",
    idle: true,
    documents: [
      { name: "Business License", status: "Submitted" },
      { name: "Tax ID", status: "Submitted" },
      { name: "SDS", status: "Missing" },
      { name: "TDS", status: "Missing" },
      { name: "COA", status: "Missing" },
      { name: "Export Certificate", status: "Missing" },
    ],
    kycStatus: "Not Submitted",
    storefront: {
      profileCompletion: 20,
      productCount: 0,
      technicalDataCompleteness: 0,
      imageCompleteness: 0,
      missing: ["Company profile", "Product catalogue", "All technical documents"],
    },
    qualityScore: {
      overall: 31,
      band: "High Risk",
      riskFlags: ["No login in 27 days", "Registration abandoned mid-flow"],
      lastScoredOn: "2026-07-05",
      trend: "down",
    },
    tierReadiness: {
      currentTier: "Standard",
      eligibleNextTier: null,
      missingRequirements: ["Complete registration", "Submit business documents"],
      commitmentStatus: "Not Started",
    },
  },
  {
    id: "SLR-3305",
    name: "Jotai Titanium & Pigments Group",
    region: "Sichuan, China",
    country: "China",
    productCategory: "Titanium Dioxide (R-type)",
    verificationTier: "Premium-Ready",
    activeRfqs: 1,
    recentRevenue: 312000,
    currency: "USD",
    onboardingStage: "Tier Commitment",
    onboardingStagesDone: ["Registration", "Documents", "KYC", "Storefront", "Activation", "Tier Commitment"],
    lastLogin: "2026-07-27",
    lastCatalogueUpdate: "2026-07-26",
    lastRfqResponse: "2026-07-26",
    idle: false,
    documents: [
      { name: "Business License", status: "Approved" },
      { name: "Tax ID", status: "Approved" },
      { name: "SDS", status: "Approved" },
      { name: "TDS", status: "Approved" },
      { name: "COA", status: "Approved" },
      { name: "Export Certificate", status: "Approved" },
    ],
    kycStatus: "Approved",
    storefront: {
      profileCompletion: 100,
      productCount: 22,
      technicalDataCompleteness: 98,
      imageCompleteness: 95,
      missing: [],
    },
    qualityScore: {
      overall: 88,
      band: "Verified",
      riskFlags: [],
      lastScoredOn: "2026-07-25",
      trend: "up",
    },
    tierReadiness: {
      currentTier: "Premium-Ready",
      eligibleNextTier: "Strategic",
      missingRequirements: ["Strategic review scheduled 2026-08-02"],
      commitmentStatus: "Committed",
    },
  },
  {
    id: "SLR-3299",
    name: "Weihai Ocean Peroxide Industries",
    region: "Shandong, China",
    country: "China",
    productCategory: "Hydrogen Peroxide",
    verificationTier: "Verified",
    activeRfqs: 1,
    recentRevenue: 41200,
    currency: "USD",
    onboardingStage: "Activation",
    onboardingStagesDone: ["Registration", "Documents", "KYC", "Storefront", "Activation"],
    lastLogin: "2026-07-13",
    lastCatalogueUpdate: "2026-07-01",
    lastRfqResponse: "2026-07-12",
    idle: true,
    documents: [
      { name: "Business License", status: "Approved" },
      { name: "Tax ID", status: "Approved" },
      { name: "SDS", status: "Approved" },
      { name: "TDS", status: "Expired", expiry: "2026-07-01" },
      { name: "COA", status: "Approved" },
      { name: "Export Certificate", status: "Approved" },
    ],
    kycStatus: "Expired/Reverification Required",
    storefront: {
      profileCompletion: 90,
      productCount: 9,
      technicalDataCompleteness: 70,
      imageCompleteness: 65,
      missing: ["Renew TDS before relisting"],
    },
    qualityScore: {
      overall: 58,
      band: "Basic",
      riskFlags: ["TDS expired", "Buyer dispute under review (quantity discrepancy)"],
      lastScoredOn: "2026-07-14",
      trend: "down",
    },
    tierReadiness: {
      currentTier: "Verified",
      eligibleNextTier: null,
      missingRequirements: ["Resolve open buyer dispute", "Renew TDS"],
      commitmentStatus: "Declined",
    },
  },
];

// ── Lead pipeline (agent-level, Chapter 2/5 lifecycle) ──────────────────────
export type LeadStage =
  | "Identified"
  | "Qualified"
  | "Contacted"
  | "Interested"
  | "Registration Started"
  | "Lost/Disqualified";

export interface Lead {
  id: string;
  company: string;
  region: string;
  category: string;
  stage: LeadStage;
  source: string;
  lastActivity: string;
  note?: string;
}

export const LEADS: Lead[] = [
  { id: "LD-9041", company: "Yancheng Bright Solvents Ltd.", region: "Jiangsu, China", category: "Solvents", stage: "Identified", source: "Trade directory", lastActivity: "2026-07-24" },
  { id: "LD-9038", company: "Hangzhou Delta Polymer Trading", region: "Zhejiang, China", category: "Polymers", stage: "Qualified", source: "Referral — SLR-3298", lastActivity: "2026-07-25" },
  { id: "LD-9035", company: "Foshan Guangyuan Coatings Supply", region: "Guangdong, China", category: "Resins & Coatings", stage: "Contacted", source: "Trade fair — Canton Fair", lastActivity: "2026-07-23" },
  { id: "LD-9030", company: "Jinan Huatai Agrochemical Co.", region: "Shandong, China", category: "Agrochemicals", stage: "Interested", source: "Cold outreach (WeChat)", lastActivity: "2026-07-26" },
  { id: "LD-9027", company: "Suzhou Xinghe Fine Chemicals", region: "Jiangsu, China", category: "Specialty Additives", stage: "Registration Started", source: "Referral code AGT-0142", lastActivity: "2026-07-27" },
  { id: "LD-9019", company: "Dongying Trust Petrochemical", region: "Shandong, China", category: "Bulk Petrochemicals", stage: "Lost/Disqualified", source: "Trade directory", lastActivity: "2026-07-15", note: "Product line outside TradeChem's active categories" },
];

// ── RFQs / activity feed ─────────────────────────────────────────────────────
export type ActivityType = "rfq_received" | "quote_accepted" | "milestone_missed" | "quote_sent" | "document_flag" | "seller_activated";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  sellerId: string;
  sellerName: string;
  timestamp: string;
  detail: string;
}

export const ACTIVITY_FEED: ActivityItem[] = [
  { id: "ACT-2201", type: "rfq_received", title: "New RFQ received", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", timestamp: "2026-07-27 09:14", detail: "RFQ-8842 — Acetic Acid 99.85%, 40 MT, Incoterm FOB" },
  { id: "ACT-2200", type: "quote_accepted", title: "Quote accepted", sellerId: "SLR-3298", sellerName: "Formosa Wanhua Specialty Chemicals", timestamp: "2026-07-27 08:02", detail: "RFQ-8831 accepted by buyer — order created (ORD-77213)" },
  { id: "ACT-2199", type: "milestone_missed", title: "Milestone missed", sellerId: "SLR-3299", sellerName: "Weihai Ocean Peroxide Industries", timestamp: "2026-07-26 17:40", detail: "Batch-testing certificate overdue by 2 days on ORD-77108" },
  { id: "ACT-2198", type: "document_flag", title: "Document expiring soon", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", timestamp: "2026-07-26 14:10", detail: "COA expires 2026-08-14 — renewal reminder sent" },
  { id: "ACT-2197", type: "quote_sent", title: "Quote sent to buyer", sellerId: "SLR-3287", sellerName: "CNOOC Meilan Petrochemical Supply", timestamp: "2026-07-26 11:55", detail: "RFQ-8819 — seller-approved quote dispatched" },
  { id: "ACT-2196", type: "rfq_received", title: "New RFQ received", sellerId: "SLR-3305", sellerName: "Jotai Titanium & Pigments Group", timestamp: "2026-07-26 09:30", detail: "RFQ-8815 — Titanium Dioxide R-type, 60 MT, Incoterm CIF" },
  { id: "ACT-2195", type: "seller_activated", title: "Seller activated", sellerId: "SLR-3287", sellerName: "CNOOC Meilan Petrochemical Supply", timestamp: "2026-07-24 16:05", detail: "Storefront readiness and KYC both cleared — status set to Active" },
  { id: "ACT-2194", type: "milestone_missed", title: "Milestone missed", sellerId: "SLR-3312", sellerName: "Rongcheng Delta Chemical Trading", timestamp: "2026-07-23 13:20", detail: "No RFQ response within SLA window (72h)" },
];

// ── RFQ / quote pipeline (Chapter 8 stage vocabulary) ───────────────────────
// Individual RFQ records per seller. This is a distinct concept from the
// commission ledger below — an RFQ moves through Sent → Viewed → Quoted →
// Under Negotiation → Confirmed (or Declined) before an order/commission
// record ever exists for it.
export type RfqStage = "Sent" | "Viewed" | "Quoted" | "Under Negotiation" | "Confirmed" | "Declined";

const ACTIVE_RFQ_STAGES: RfqStage[] = ["Sent", "Viewed", "Quoted", "Under Negotiation"];
const PENDING_QUOTE_STAGES: RfqStage[] = ["Quoted", "Under Negotiation"];

export interface RfqRecord {
  id: string;
  rfqRef: string;
  sellerId: string;
  sellerName: string;
  stage: RfqStage;
  product: string;
  createdAt: string;
}

export const RFQ_ACTIVITY: RfqRecord[] = [
  { id: "RFQ-8842", rfqRef: "RFQ-8842", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", stage: "Sent", product: "Acetic Acid 99.85%, 40 MT", createdAt: "2026-07-27" },
  { id: "RFQ-8835", rfqRef: "RFQ-8835", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", stage: "Quoted", product: "Acetic Acid 99.85%, 25 MT", createdAt: "2026-07-25" },
  { id: "RFQ-8828", rfqRef: "RFQ-8828", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", stage: "Under Negotiation", product: "Glacial Acetic Acid, 60 MT", createdAt: "2026-07-23" },
  { id: "RFQ-8790", rfqRef: "RFQ-8790", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", stage: "Declined", product: "Acetic Acid 99.85%, 10 MT", createdAt: "2026-07-10" },
  { id: "RFQ-8770", rfqRef: "RFQ-8770", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", stage: "Confirmed", product: "Acetic Acid 99.85%, 30 MT", createdAt: "2026-07-05" },
  { id: "RFQ-8850", rfqRef: "RFQ-8850", sellerId: "SLR-3298", sellerName: "Formosa Wanhua Specialty Chemicals", stage: "Viewed", product: "Sodium Hydroxide 50% Solution, 80 MT", createdAt: "2026-07-26" },
  { id: "RFQ-8831", rfqRef: "RFQ-8831", sellerId: "SLR-3298", sellerName: "Formosa Wanhua Specialty Chemicals", stage: "Confirmed", product: "Sodium Hydroxide 50% Solution, 120 MT", createdAt: "2026-07-27" },
  { id: "RFQ-8860", rfqRef: "RFQ-8860", sellerId: "SLR-3312", sellerName: "Rongcheng Delta Chemical Trading", stage: "Quoted", product: "Sulfuric Acid (Battery Grade), 20 MT", createdAt: "2026-07-09" },
  { id: "RFQ-8819", rfqRef: "RFQ-8819", sellerId: "SLR-3287", sellerName: "CNOOC Meilan Petrochemical Supply", stage: "Quoted", product: "Methanol 99.9%, 50 MT", createdAt: "2026-07-26" },
  { id: "RFQ-8865", rfqRef: "RFQ-8865", sellerId: "SLR-3287", sellerName: "CNOOC Meilan Petrochemical Supply", stage: "Sent", product: "Ethylene Glycol (MEG), 35 MT", createdAt: "2026-07-24" },
  { id: "RFQ-8760", rfqRef: "RFQ-8760", sellerId: "SLR-3287", sellerName: "CNOOC Meilan Petrochemical Supply", stage: "Confirmed", product: "Methanol 99.9%, 45 MT", createdAt: "2026-07-10" },
  { id: "RFQ-8815", rfqRef: "RFQ-8815", sellerId: "SLR-3305", sellerName: "Jotai Titanium & Pigments Group", stage: "Sent", product: "Titanium Dioxide R-type, 60 MT", createdAt: "2026-07-26" },
  { id: "RFQ-8700", rfqRef: "RFQ-8700", sellerId: "SLR-3305", sellerName: "Jotai Titanium & Pigments Group", stage: "Confirmed", product: "Titanium Dioxide R-type, 50 MT", createdAt: "2026-06-20" },
  { id: "RFQ-8875", rfqRef: "RFQ-8875", sellerId: "SLR-3299", sellerName: "Weihai Ocean Peroxide Industries", stage: "Under Negotiation", product: "Hydrogen Peroxide 35%, 15 MT", createdAt: "2026-07-20" },
  { id: "RFQ-8650", rfqRef: "RFQ-8650", sellerId: "SLR-3299", sellerName: "Weihai Ocean Peroxide Industries", stage: "Confirmed", product: "Hydrogen Peroxide 35%, 18 MT", createdAt: "2026-06-05" },
  { id: "RFQ-8500", rfqRef: "RFQ-8500", sellerId: "SLR-3320", sellerName: "Qingzhou Baiyun Fine Chemicals", stage: "Declined", product: "Citric Acid Monohydrate, 12 MT", createdAt: "2026-06-15" },
];

export function activeRfqCount(sellerId?: string) {
  return RFQ_ACTIVITY.filter((r) => ACTIVE_RFQ_STAGES.includes(r.stage) && (!sellerId || r.sellerId === sellerId)).length;
}

export function pendingQuoteCount(sellerId?: string) {
  return RFQ_ACTIVITY.filter((r) => PENDING_QUOTE_STAGES.includes(r.stage) && (!sellerId || r.sellerId === sellerId)).length;
}

// ── Orders — created once an RFQ reaches the Confirmed stage ───────────────
export type OrderStatus = "In Fulfilment" | "Delivered" | "Completed" | "Disputed";

const ACTIVE_ORDER_STATUSES: OrderStatus[] = ["In Fulfilment", "Delivered"];

export interface OrderRecord {
  orderRef: string;
  rfqRef: string;
  sellerId: string;
  sellerName: string;
  status: OrderStatus;
}

export const ORDERS: OrderRecord[] = [
  { orderRef: "ORD-76901", rfqRef: "RFQ-8770", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", status: "Completed" },
  { orderRef: "ORD-77213", rfqRef: "RFQ-8831", sellerId: "SLR-3298", sellerName: "Formosa Wanhua Specialty Chemicals", status: "In Fulfilment" },
  { orderRef: "ORD-77108", rfqRef: "RFQ-8760", sellerId: "SLR-3287", sellerName: "CNOOC Meilan Petrochemical Supply", status: "Delivered" },
  { orderRef: "ORD-76950", rfqRef: "RFQ-8700", sellerId: "SLR-3305", sellerName: "Jotai Titanium & Pigments Group", status: "Completed" },
  { orderRef: "ORD-76877", rfqRef: "RFQ-8650", sellerId: "SLR-3299", sellerName: "Weihai Ocean Peroxide Industries", status: "Disputed" },
];

export function activeOrderCount(sellerId?: string) {
  return ORDERS.filter((o) => ACTIVE_ORDER_STATUSES.includes(o.status) && (!sellerId || o.sellerId === sellerId)).length;
}

// ── Commission tracker — exactly Pending / Approved / Paid / Canceled ───────
export type CommissionState = "Pending" | "Approved" | "Paid" | "Canceled";

export interface CommissionEntry {
  id: string;
  sellerId: string;
  sellerName: string;
  orderRef: string;
  amountUsd: number;
  state: CommissionState;
  milestone: string;
  updatedAt: string;
}

export const COMMISSIONS: CommissionEntry[] = [
  { id: "COM-5510", sellerId: "SLR-3298", sellerName: "Formosa Wanhua Specialty Chemicals", orderRef: "ORD-77213", amountUsd: 1840, state: "Pending", milestone: "Order created — awaiting delivery confirmation", updatedAt: "2026-07-27" },
  { id: "COM-5498", sellerId: "SLR-3287", sellerName: "CNOOC Meilan Petrochemical Supply", orderRef: "ORD-77108", amountUsd: 960, state: "Approved", milestone: "Delivery confirmed — queued for payout", updatedAt: "2026-07-24" },
  { id: "COM-5471", sellerId: "SLR-3305", sellerName: "Jotai Titanium & Pigments Group", orderRef: "ORD-76950", amountUsd: 2280, state: "Paid", milestone: "Payout processed by Finance", updatedAt: "2026-07-18" },
  { id: "COM-5464", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", orderRef: "ORD-76901", amountUsd: 640, state: "Paid", milestone: "Payout processed by Finance", updatedAt: "2026-07-14" },
  { id: "COM-5459", sellerId: "SLR-3299", sellerName: "Weihai Ocean Peroxide Industries", orderRef: "ORD-76877", amountUsd: 410, state: "Canceled", milestone: "Order refunded — buyer quantity dispute upheld", updatedAt: "2026-07-16" },
];

// ── Alerts ────────────────────────────────────────────────────────────────
export type AlertSeverity = "critical" | "warning" | "info";
export type AlertType =
  | "seller_stalled"
  | "document_expiring"
  | "duplicate_seller"
  | "mapping_dispute"
  | "inactivity"
  | "commission_hold"
  | "agent_risk";

export interface AlertItem {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  sellerId?: string;
  sellerName?: string;
  agentName?: string;
  detail: string;
  timestamp: string;
}

export const ALERTS: AlertItem[] = [
  { id: "ALT-661", type: "seller_stalled", severity: "critical", title: "Seller stalled beyond SLA", sellerId: "SLR-3320", sellerName: "Qingzhou Baiyun Fine Chemicals", detail: "No document submission in 27 days — registration stage stalled beyond the 10-day SLA.", timestamp: "2026-07-27 07:10" },
  { id: "ALT-660", type: "document_expiring", severity: "warning", title: "Document expiring soon", sellerId: "SLR-3301", sellerName: "Nanjing Runchuan Chemical Co.", detail: "COA expires on 2026-08-14 (18 days remaining).", timestamp: "2026-07-26 14:10" },
  { id: "ALT-659", type: "commission_hold", severity: "warning", title: "Commission on hold", sellerId: "SLR-3299", sellerName: "Weihai Ocean Peroxide Industries", detail: "COM-5459 held pending resolution of buyer quantity dispute.", timestamp: "2026-07-16 10:44" },
  { id: "ALT-658", type: "duplicate_seller", severity: "critical", title: "Duplicate-seller warning", sellerId: "SLR-3312", sellerName: "Rongcheng Delta Chemical Trading", detail: "Tax ID partially matches an existing seller record (SLR-2984). Flagged for Compliance review.", timestamp: "2026-07-22 16:00" },
  { id: "ALT-657", type: "inactivity", severity: "warning", title: "Seller inactivity", sellerId: "SLR-3299", sellerName: "Weihai Ocean Peroxide Industries", detail: "No login in 14 days; last catalogue update 26 days ago.", timestamp: "2026-07-21 09:00" },
  { id: "ALT-656", type: "mapping_dispute", severity: "info", title: "Mapping dispute opened", agentName: "Chandra Purnama", detail: "Attribution dispute raised over SLR-3287 between AGT-0142 and AGT-0117. Under supervisor review.", timestamp: "2026-07-19 11:32" },
  { id: "ALT-655", type: "agent_risk", severity: "info", title: "Agent risk score updated", agentName: "Dandi Muhamad Zaki", detail: "Two consecutive low-quality seller submissions flagged for review.", timestamp: "2026-07-15 08:50" },
];

// ── Feedback notes ───────────────────────────────────────────────────────────
export type NoteType = "Agent Note" | "Seller Note" | "Supervisor Feedback" | "Compliance Request";

export interface FeedbackNote {
  id: string;
  type: NoteType;
  sellerId?: string;
  sellerName?: string;
  author: string;
  body: string;
  followUpDue?: string;
  createdAt: string;
}

export const FEEDBACK_NOTES: FeedbackNote[] = [
  { id: "NOTE-341", type: "Agent Note", sellerId: "SLR-3312", sellerName: "Rongcheng Delta Chemical Trading", author: "Reina Budisaputra", body: "Called factory contact — TDS delayed due to lab backlog, expects to submit by Aug 1.", followUpDue: "2026-08-01", createdAt: "2026-07-25" },
  { id: "NOTE-340", type: "Supervisor Feedback", sellerId: "SLR-3320", sellerName: "Qingzhou Baiyun Fine Chemicals", author: "Chandra Purnama (Supervisor)", body: "This lead has been idle for 3+ weeks — recommend closing or reassigning if no response by end of week.", followUpDue: "2026-07-31", createdAt: "2026-07-24" },
  { id: "NOTE-339", type: "Compliance Request", sellerId: "SLR-3312", sellerName: "Rongcheng Delta Chemical Trading", author: "Compliance Reviewer", body: "Please confirm Tax ID with the seller directly — potential match with an existing record requires clarification before KYC can proceed.", followUpDue: "2026-07-29", createdAt: "2026-07-22" },
  { id: "NOTE-338", type: "Seller Note", sellerId: "SLR-3298", sellerName: "Formosa Wanhua Specialty Chemicals", author: "Seller contact — Ms. Liang", body: "Confirmed interest in committing to Strategic tier once Q3 export volume is finalized.", createdAt: "2026-07-20" },
];

// ── Supervisor view — team rollup ───────────────────────────────────────────
export interface AgentPerformance {
  agentId: string;
  name: string;
  functionRole: string;
  qualifiedLeadsPerWeek: number;
  registrationCompletionRate: number; // %
  kycApprovalRate: number; // %
  activeSellerRatio: number; // %
  assignedSellers: number;
  flags: number;
}

export const TEAM_PERFORMANCE: AgentPerformance[] = [
  { agentId: "AGT-0142", name: "Reina Budisaputra", functionRole: "Outreach & Relationship", qualifiedLeadsPerWeek: 27, registrationCompletionRate: 74, kycApprovalRate: 88, activeSellerRatio: 71, assignedSellers: 7, flags: 1 },
  { agentId: "AGT-0117", name: "Cakti Fadhillah", functionRole: "Onboarding Support", qualifiedLeadsPerWeek: 22, registrationCompletionRate: 69, kycApprovalRate: 91, activeSellerRatio: 65, assignedSellers: 9, flags: 0 },
  { agentId: "AGT-0098", name: "Dandi Muhamad Zaki", functionRole: "Lead Generation", qualifiedLeadsPerWeek: 34, registrationCompletionRate: 58, kycApprovalRate: 79, activeSellerRatio: 52, assignedSellers: 11, flags: 2 },
  { agentId: "AGT-0155", name: "Khansa Hayyu Layyina", functionRole: "Compliance & Verification Support", qualifiedLeadsPerWeek: 18, registrationCompletionRate: 81, kycApprovalRate: 94, activeSellerRatio: 68, assignedSellers: 6, flags: 0 },
  { agentId: "AGT-0173", name: "Odilia Keisha Hariyanto", functionRole: "Storefront Setup", qualifiedLeadsPerWeek: 20, registrationCompletionRate: 76, kycApprovalRate: 85, activeSellerRatio: 74, assignedSellers: 8, flags: 0 },
  { agentId: "AGT-0161", name: "Stephanie Hebrina Mabunbun S.", functionRole: "Account Manager (Post-Onboarding)", qualifiedLeadsPerWeek: 15, registrationCompletionRate: 70, kycApprovalRate: 89, activeSellerRatio: 61, assignedSellers: 10, flags: 1 },
];

export interface MappingDispute {
  id: string;
  sellerId: string;
  sellerName: string;
  agentA: string;
  agentB: string;
  status: "Evidence Collected" | "Under Review" | "Escalated";
  openedAt: string;
}

export const MAPPING_DISPUTES: MappingDispute[] = [
  { id: "DSP-118", sellerId: "SLR-3287", sellerName: "CNOOC Meilan Petrochemical Supply", agentA: "Reina Budisaputra", agentB: "Cakti Fadhillah", status: "Under Review", openedAt: "2026-07-19" },
  { id: "DSP-114", sellerId: "SLR-3260", sellerName: "Zibo Hengrui Chemical Trading", agentA: "Dandi Muhamad Zaki", agentB: "Odilia Keisha Hariyanto", status: "Escalated", openedAt: "2026-07-12" },
];

export const QUALITY_TREND = [
  { month: "Feb", avgScore: 61, fakeOrDuplicate: 4 },
  { month: "Mar", avgScore: 64, fakeOrDuplicate: 3 },
  { month: "Apr", avgScore: 66, fakeOrDuplicate: 3 },
  { month: "May", avgScore: 69, fakeOrDuplicate: 2 },
  { month: "Jun", avgScore: 71, fakeOrDuplicate: 2 },
  { month: "Jul", avgScore: 73, fakeOrDuplicate: 1 },
];

// ── Finance-view supplemental data ──────────────────────────────────────────
export interface PaymentProfile {
  agentId: string;
  agentName: string;
  bankMasked: string;
  verified: boolean;
  lastPayoutUsd: number;
  lastPayoutDate: string;
}

export const PAYMENT_PROFILES: PaymentProfile[] = [
  { agentId: "AGT-0142", agentName: "Reina Budisaputra", bankMasked: "•••• 6642", verified: true, lastPayoutUsd: 2920, lastPayoutDate: "2026-07-14" },
  { agentId: "AGT-0117", agentName: "Cakti Fadhillah", bankMasked: "•••• 2210", verified: true, lastPayoutUsd: 3410, lastPayoutDate: "2026-07-14" },
  { agentId: "AGT-0098", agentName: "Dandi Muhamad Zaki", bankMasked: "•••• 8834", verified: false, lastPayoutUsd: 0, lastPayoutDate: "—" },
];

export function getSellerById(id: string) {
  return SELLERS.find((s) => s.id === id);
}
