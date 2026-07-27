# CHAPTER X

## Agent Dashboard Design (Portfolio View)

### 10.1 Objective and Scope

This chapter defines the Agent Dashboard, the primary working surface an
agent sees after login. On sign-in, the agent receives an aggregated,
real-time view filtered strictly through their `agent_seller_mapping`
scope, never a global view of all sellers on the platform. The dashboard
is implemented as a wireframe (mock-data) build in the TradeChem mockup
project at `/oms/agent-dashboard`, with a role switcher so the Agent,
Supervisor, Compliance, and Finance access scopes can each be demonstrated
from the same screen.

### 10.2 Portfolio View — Required Components

| Component | Description |
| --- | --- |
| KPI Summary Cards | Assigned Sellers, Active RFQs, Pending Quotes, Active Orders, Commission Target (this month) — shown with a brief loading-skeleton state, not a blocking spinner |
| Seller Roster | Paginated table — Seller Name, Region, Verification Tier, Active RFQs, Recent Revenue — with a "Viewing As: Agent for Supplier `<name>`" drill-down banner shown whenever a seller row is selected |
| Real-Time Activity Feed | Clickable entries for events such as New RFQ received, Quote accepted, Milestone missed — scoped to the agent's assigned sellers only |
| Currency Normalization | All revenue figures are converted to a single base currency (USD) for display, with a small "USD" label and, where the seller's original quote currency differs, a secondary caption showing the original amount and currency |

Every number on the KPI cards is derived from an underlying mock record
array rather than an inline constant:

| KPI Card | Derivation |
| --- | --- |
| Assigned Sellers | `SELLERS.length` — sellers within the agent's mapping |
| Active RFQs | Count of `RFQ_ACTIVITY` records in stage `Sent`, `Viewed`, `Quoted`, or `Under Negotiation` |
| Pending Quotes | Count of `RFQ_ACTIVITY` records specifically in stage `Quoted` or `Under Negotiation` — a quote has gone out and is awaiting the buyer/seller-approval gate |
| Active Orders | Count of `ORDERS` records (created once an RFQ reaches `Confirmed`) with status `In Fulfilment` or `Delivered` |
| Commission Target | Sum of `COMMISSIONS` entries in state `Approved`/`Paid`, shown against the agent's monthly target |

The per-seller "Active RFQs" column in the Seller Roster reads from the
same `RFQ_ACTIVITY` records (via each seller's active-stage count), so the
roster and the KPI card always agree with each other.

### 10.3 Supporting Components (Secondary)

Presented as an expandable seller-detail drawer (Onboarding through Tier
Readiness, scoped to one selected seller) plus three page-level secondary
tabs (Lead Pipeline, Commission Tracker, Feedback Notes) and a standalone
Alerts drawer — so none of them compete for primary visual weight with the
four required components above.

| Component | Key Elements | Data Source (inferred) |
| --- | --- | --- |
| Lead Pipeline | Leads identified, qualified, contacted; interested sellers; registration started; lost/disqualified leads | `seller_leads` table, filtered to `agent_id`, grouped by lifecycle stage |
| RFQ / Quote Pipeline | Individual RFQs per seller across Sent, Viewed, Quoted, Under Negotiation, Confirmed, Declined | `rfqs` table (Chapter VIII stage vocabulary), keyed by `seller_id` and `rfq_ref`; feeds the Active RFQs and Pending Quotes KPI cards |
| Orders | Order created once an RFQ reaches Confirmed; status In Fulfilment, Delivered, Completed, or Disputed | `orders` table, one row per confirmed RFQ (`rfq_ref` foreign key); feeds the Active Orders KPI card and links to the commission ledger via `order_ref` |
| Activation Tracker | Last login date, last product/catalogue update, last RFQ response; flags a seller as idle once inactivity exceeds the SLA threshold | Seller activity/session log + `seller_onboarding_progress`; idle flag computed against a configured SLA (14 days in this mock) |
| Onboarding Status Tracker | Registration, Documents, KYC, Storefront, Activation, Tier Commitment | `seller_onboarding_progress` (per-stage completion evidence, Chapter V) |
| Document Checklist | Business license, Tax ID, SDS, TDS, COA, certificates, expiry status, review status | `seller_documents` / `seller_document_reviews`, cross-referenced with the MDM connector where a document is already linked (Chapter VII) |
| KYC Status | Not Submitted, Pending, Information Required, Under Review, Approved, Rejected, Expired/Reverification Required | Compliance Reviewer decision record tied to `seller_documents` review outcome |
| Storefront Readiness Score | Profile completion, product count, technical-data completeness, image completeness, missing requirements | `seller_storefront_reviews` / catalogue completeness fields (Chapter VII) |
| Seller Quality Score | Overall score, score category (band), risk flags, latest score date, score trend | `seller_quality_scores` + `score_history` (Chapter VII scoring engine) |
| Tier Readiness | Current tier, eligible next tier, missing tier requirements, commitment status | `seller_tiers` / `seller_tier_commitments` (Chapter IX) |
| Commission Tracker | Pending, Approved, Paid, Canceled (exactly these four states) | `agent_commissions` ledger keyed by commission state, driven by OMS/Finance events rather than agent action (Chapter VIII/IX). Distinct from the RFQ/Quote Pipeline above — a commission entry only exists once an order exists, an RFQ can be Confirmed with no commission activity yet |
| Alerts | Seller stalled beyond SLA, missing/expiring document, duplicate-seller warning, mapping dispute, inactivity, commission on hold, agent-risk warning | `risk_flags` + `notifications`, cross-referenced with `mapping_disputes` and `agent_commissions` holds |
| Feedback Notes | Agent note, seller note, supervisor feedback, compliance request, follow-up due date | `agent_notes` (typed note table with `follow_up_due_at`) |

### 10.4 Dashboard Access Scope by Role

| Role | May See |
| --- | --- |
| Agent | Assigned leads, attributed sellers, onboarding tasks, limited seller information, own commission status |
| Supervisor | Team pipeline, agent performance, mapping disputes, quality and fraud trends |
| Compliance | Required legal/verification data, document queues, risk flags |
| Finance | Approved milestone evidence, payment profiles, commission status |

In the mock build this is demonstrated with a "View as" role switcher in
the dashboard header (`RoleSwitcher.tsx`) rather than four separate
logins — selecting a role swaps the rendered view (`AgentPortfolioView`,
`SupervisorView`, `ComplianceView`, `FinanceView`) while reusing the same
`AlertsPanel` and `SellerDetailDrawer` components, with alerts filtered to
the selected role's scope (e.g. `mapping_dispute` and `agent_risk` alerts
are hidden from the Agent view since those are supervisor-level signals).

### 10.5 Performance Note — "Loads in Under 2 Seconds"

The dashboard is designed so the page never blocks on a full-screen
spinner. The four KPI summary cards mount immediately with their layout,
icon, and label already in place, and only the numeric value area is
replaced by a skeleton placeholder (`Skeleton` component) for roughly
500–600ms before resolving to real figures — this keeps first paint and
perceived load fast even before data "arrives," and mirrors how the
production system would behave while the backend resolves the agent's
`agent_seller_mapping` scope, aggregates RFQ/order counts, and computes
the commission-target percentage. The seller roster and activity feed
render directly from already-scoped mock data (no network round trip in
this wireframe), so in practice the demo build loads well under the
2-second target; the skeleton state exists specifically to represent how
a real, network-backed version of this screen should *feel* even if an
individual query takes longer.
