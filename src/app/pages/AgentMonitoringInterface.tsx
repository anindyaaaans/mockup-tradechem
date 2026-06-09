import { useState } from "react";
import {
  AlertTriangle, CheckCircle, Clock, XCircle, Eye, ArrowRight,
  Package, Filter, Search, Bell, ChevronDown, User,
  Truck, Shield, RefreshCw, TrendingUp, Flag, Zap,
  ChevronRight, MoreHorizontal, BarChart2, FileText,
  AlertCircle, MessageSquare, Calendar,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type OrderStatus = "Order Created" | "Confirmed" | "Processing" | "Shipping" | "In Transit" | "Customs/Clearance" | "Delivered" | "Completed";
type ExceptionType = "delay" | "missing_doc" | "dispute" | "escalated" | null;
type Priority = "critical" | "high" | "medium" | "normal";

interface ActiveOrder {
  id: string;
  product: string;
  buyer: string;
  supplier: string;
  value: string;
  status: OrderStatus;
  exception: ExceptionType;
  priority: Priority;
  daysActive: number;
  overdue: boolean;
  overdueAction?: string;
  slaHours?: number;
  docsMissing: number;
  eta?: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────────
const ORDERS: ActiveOrder[] = [
  {
    id: "TC-ORD-2026-04817", product: "Acetic Acid 99.85%",
    buyer: "PT Indokimia Utama", supplier: "Nanjing Chemical Co.",
    value: "USD 116,400", status: "In Transit", exception: "delay",
    priority: "high", daysActive: 12, overdue: false, docsMissing: 2,
    eta: "30 Jun (revised)", slaHours: 48,
  },
  {
    id: "TC-ORD-2026-04721", product: "Sodium Hydroxide 50% Solution",
    buyer: "Kimia Farma Tbk", supplier: "Formosa Chemicals",
    value: "USD 84,750", status: "Processing", exception: "missing_doc",
    priority: "critical", daysActive: 7, overdue: true,
    overdueAction: "Packing list overdue by 2 days. Supplier has not responded.",
    docsMissing: 3, slaHours: 6,
  },
  {
    id: "TC-ORD-2026-04698", product: "Sulfuric Acid (Battery Grade)",
    buyer: "Astra Agro Lestari", supplier: "Rongcheng Chemical",
    value: "USD 203,000", status: "Customs/Clearance", exception: "escalated",
    priority: "critical", daysActive: 19, overdue: true,
    overdueAction: "Customs hold — declaration rejected. Agent escalated to Admin.",
    docsMissing: 1, slaHours: 2,
  },
  {
    id: "TC-ORD-2026-04655", product: "Methanol 99.9%",
    buyer: "Chandra Asri Petrochemical", supplier: "CNOOC Chemical",
    value: "USD 178,200", status: "Shipping", exception: null,
    priority: "normal", daysActive: 5, overdue: false, docsMissing: 0,
    eta: "15 Jul",
  },
  {
    id: "TC-ORD-2026-04602", product: "Ethylene Glycol (MEG)",
    buyer: "Sri Rejeki Isman Tbk", supplier: "PETRONAS Chemicals",
    value: "USD 94,500", status: "Confirmed", exception: "missing_doc",
    priority: "medium", daysActive: 3, overdue: false,
    overdueAction: "Supplier COA and MSDS upload pending since confirmation.",
    docsMissing: 2, slaHours: 24,
  },
  {
    id: "TC-ORD-2026-04588", product: "Hydrogen Peroxide 35%",
    buyer: "Mandom Corporation ID", supplier: "Peroxychem Asia",
    value: "USD 41,200", status: "Delivered", exception: "dispute",
    priority: "high", daysActive: 24, overdue: true,
    overdueAction: "Buyer raised quantity discrepancy dispute. Resolution pending.",
    docsMissing: 0, slaHours: 12,
  },
  {
    id: "TC-ORD-2026-04501", product: "Citric Acid Monohydrate",
    buyer: "Mayora Indah Tbk", supplier: "COFCO Bio-Tech",
    value: "USD 28,900", status: "Processing", exception: null,
    priority: "normal", daysActive: 4, overdue: false, docsMissing: 1,
    eta: "22 Jul",
  },
  {
    id: "TC-ORD-2026-04478", product: "Titanium Dioxide (R-type)",
    buyer: "Jotun Paints Indonesia", supplier: "Lomon Billions TiO2",
    value: "USD 312,000", status: "Order Created", exception: null,
    priority: "normal", daysActive: 1, overdue: false, docsMissing: 1,
    slaHours: 72,
  },
];

const ESCALATION_QUEUE = [
  {
    id: "ESC-2026-0031", orderId: "TC-ORD-2026-04698",
    issue: "Customs Declaration Rejected — Incorrect HS Code",
    raisedBy: "Agent (James)", raisedAt: "2026-06-08 14:20",
    currentHandler: "Platform Admin", slaRemaining: "2h 14m",
    priority: "critical",
    steps: ["Agent escalated after 3rd rejection", "Admin reviewing customs authority correspondence"],
  },
  {
    id: "ESC-2026-0028", orderId: "TC-ORD-2026-04588",
    issue: "Quantity Dispute — Buyer Claims 2 MT Short",
    raisedBy: "Buyer (Mandom)", raisedAt: "2026-06-07 09:45",
    currentHandler: "Agent (David)", slaRemaining: "11h 52m",
    priority: "high",
    steps: ["Buyer submitted delivery proof", "Awaiting supplier loading manifest"],
  },
  {
    id: "ESC-2026-0024", orderId: "TC-ORD-2026-04721",
    issue: "Supplier Non-Responsive — Missing Documents",
    raisedBy: "Agent (Rachel)", raisedAt: "2026-06-09 08:00",
    currentHandler: "Agent (Rachel)", slaRemaining: "5h 38m",
    priority: "critical",
    steps: ["2 follow-up messages sent", "Supplier contact unresponsive for 48h", "Escalation to supplier manager recommended"],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function statusBadge(status: OrderStatus) {
  const map: Record<OrderStatus, string> = {
    "Order Created": "bg-gray-100 text-gray-700",
    "Confirmed": "bg-blue-100 text-blue-700",
    "Processing": "bg-indigo-100 text-indigo-700",
    "Shipping": "bg-sky-100 text-sky-700",
    "In Transit": "bg-cyan-100 text-cyan-800",
    "Customs/Clearance": "bg-purple-100 text-purple-700",
    "Delivered": "bg-teal-100 text-teal-700",
    "Completed": "bg-green-100 text-green-700",
  };
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${map[status]}`}>{status}</span>;
}

function exceptionBadge(type: ExceptionType) {
  if (!type) return <span className="text-gray-300 text-xs">—</span>;
  const map = {
    delay:       { cls: "bg-amber-100 text-amber-700", label: "Delay", icon: <Clock className="w-3 h-3" /> },
    missing_doc: { cls: "bg-red-100 text-red-700",     label: "Missing Docs", icon: <FileText className="w-3 h-3" /> },
    dispute:     { cls: "bg-pink-100 text-pink-700",   label: "Dispute", icon: <Flag className="w-3 h-3" /> },
    escalated:   { cls: "bg-orange-100 text-orange-700", label: "Escalated", icon: <ArrowRight className="w-3 h-3" /> },
  };
  const s = map[type];
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${s.cls}`}>{s.icon}{s.label}</span>;
}

function priorityDot(p: Priority) {
  const cls = { critical: "bg-red-500", high: "bg-amber-500", medium: "bg-yellow-400", normal: "bg-green-400" };
  return <span className={`inline-block w-2 h-2 rounded-full ${cls[p]}`} />;
}

type Tab = "all" | "exceptions" | "escalation" | "overdue";

// ── Page ───────────────────────────────────────────────────────────────────────
export function AgentMonitoringInterface() {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");

  const exceptions = ORDERS.filter(o => o.exception !== null);
  const overdue    = ORDERS.filter(o => o.overdue);
  const active     = ORDERS.filter(o => o.status !== "Completed");

  const filtered = (tab === "all" ? active : tab === "exceptions" ? exceptions : overdue)
    .filter(o =>
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.buyer.toLowerCase().includes(search.toLowerCase())
    );

  const criticalCount = ORDERS.filter(o => o.priority === "critical").length;

  return (
    <div className="bg-[#F5F7FA] min-h-screen">

      {/* Header */}
      <div className="bg-[#2E5529] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 text-green-200 text-xs mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Agent Control Center</span>
              </div>
              <h1 className="text-2xl font-bold">Order Monitoring Interface</h1>
              <p className="text-green-200 text-sm mt-0.5">Real-time visibility across all active TradeChem orders</p>
            </div>
            <div className="flex items-center gap-3">
              {criticalCount > 0 && (
                <div className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  {criticalCount} Critical
                </div>
              )}
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
                <User className="w-4 h-4 text-green-200" />
                <span className="text-sm font-medium">Marcus Tan · Agent</span>
              </div>
              <button className="bg-white/10 hover:bg-white/20 p-1.5 rounded-lg">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              icon: <Package className="w-6 h-6 text-blue-600" />,
              label: "Active Orders",
              value: active.length,
              sub: "currently in progress",
              color: "blue",
            },
            {
              icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
              label: "Exception Flags",
              value: exceptions.length,
              sub: `${ORDERS.filter(o => o.exception === "missing_doc").length} missing docs · ${ORDERS.filter(o => o.exception === "delay").length} delays`,
              color: "amber",
            },
            {
              icon: <Clock className="w-6 h-6 text-red-600" />,
              label: "Overdue Actions",
              value: overdue.length,
              sub: "require immediate attention",
              color: "red",
            },
            {
              icon: <ArrowRight className="w-6 h-6 text-orange-600" />,
              label: "Escalation Queue",
              value: ESCALATION_QUEUE.length,
              sub: `${ESCALATION_QUEUE.filter(e => e.priority === "critical").length} critical, SLA active`,
              color: "orange",
            },
          ].map(c => (
            <div key={c.label} className={`bg-white rounded-xl border-l-4 border-r border-t border-b ${
              c.color === "blue" ? "border-l-blue-500 border-gray-200"
              : c.color === "amber" ? "border-l-amber-500 border-gray-200"
              : c.color === "red" ? "border-l-red-500 border-gray-200"
              : "border-l-orange-500 border-gray-200"
            } p-4`}>
              <div className="flex items-center justify-between mb-2">
                {c.icon}
                <TrendingUp className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{c.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{c.label}</p>
              <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Escalation Queue — always visible */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-orange-500" />
                Escalation Queue
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{ESCALATION_QUEUE.length}</span>
              </h2>
              <button className="text-xs text-[#2E5529] hover:underline font-medium">View all</button>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {ESCALATION_QUEUE.map(esc => (
              <div key={esc.id} className={`px-5 py-4 ${esc.priority === "critical" ? "bg-red-50/50" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${esc.priority === "critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                        {esc.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">{esc.id}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-[#2E5529] font-medium">{esc.orderId}</span>
                    </div>
                    <p className="font-semibold text-gray-900 mt-1.5 text-sm">{esc.issue}</p>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 flex-wrap">
                      <span>Raised by: <strong>{esc.raisedBy}</strong></span>
                      <span>Handler: <strong>{esc.currentHandler}</strong></span>
                      <span>{esc.raisedAt}</span>
                    </div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {esc.steps.map((s, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${esc.priority === "critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                      <Clock className="w-3 h-3" />
                      SLA: {esc.slaRemaining}
                    </div>
                    <button className="bg-[#2E5529] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#3E7B27] flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Take Action
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200">
          {/* Tab bar + search */}
          <div className="px-5 pt-5 pb-0 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h2 className="font-semibold text-gray-900">Active Orders</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search orders…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E5529] w-48"
                  />
                </div>
                <button className="flex items-center gap-1.5 text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                  <Filter className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-600">Filter</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="flex gap-0 -mb-px">
              {([
                { key: "all",        label: "All Orders",   count: active.length },
                { key: "exceptions", label: "Exceptions",   count: exceptions.length },
                { key: "overdue",    label: "Overdue",      count: overdue.length },
                { key: "escalation", label: "Escalations",  count: ESCALATION_QUEUE.length },
              ] as { key: Tab; label: string; count: number }[]).map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    tab === t.key
                      ? "border-[#2E5529] text-[#2E5529]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    tab === t.key ? "bg-[#2E5529] text-white" : "bg-gray-100 text-gray-500"
                  }`}>{t.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          {tab !== "escalation" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">P</th>
                    <th className="text-left px-3 py-3 text-xs text-gray-500 font-semibold">ORDER ID</th>
                    <th className="text-left px-3 py-3 text-xs text-gray-500 font-semibold">PRODUCT</th>
                    <th className="text-left px-3 py-3 text-xs text-gray-500 font-semibold">BUYER</th>
                    <th className="text-left px-3 py-3 text-xs text-gray-500 font-semibold">VALUE</th>
                    <th className="text-left px-3 py-3 text-xs text-gray-500 font-semibold">STATUS</th>
                    <th className="text-left px-3 py-3 text-xs text-gray-500 font-semibold">EXCEPTION</th>
                    <th className="text-left px-3 py-3 text-xs text-gray-500 font-semibold">DOCS</th>
                    <th className="text-left px-3 py-3 text-xs text-gray-500 font-semibold">SLA</th>
                    <th className="px-3 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(order => (
                    <tr
                      key={order.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        order.priority === "critical" ? "bg-red-50/30"
                        : order.overdue ? "bg-amber-50/30"
                        : ""
                      }`}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1">
                          {priorityDot(order.priority)}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="font-mono text-xs text-[#2E5529] font-medium">{order.id}</span>
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-medium text-gray-900 text-xs leading-tight max-w-[140px] truncate">{order.product}</p>
                        <p className="text-gray-400 text-[10px] mt-0.5">{order.supplier}</p>
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-xs text-gray-700 max-w-[120px] truncate">{order.buyer}</p>
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-xs font-semibold text-gray-900">{order.value}</p>
                      </td>
                      <td className="px-3 py-3">
                        {statusBadge(order.status)}
                      </td>
                      <td className="px-3 py-3">
                        {exceptionBadge(order.exception)}
                        {order.overdue && (
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-red-500" />
                            <span className="text-[10px] text-red-600 font-medium">OVERDUE</span>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        {order.docsMissing > 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
                            <XCircle className="w-3.5 h-3.5" />{order.docsMissing} missing
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                            <CheckCircle className="w-3.5 h-3.5" />Complete
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        {order.slaHours !== undefined ? (
                          <span className={`text-xs font-semibold ${order.slaHours <= 6 ? "text-red-600" : order.slaHours <= 24 ? "text-amber-600" : "text-gray-500"}`}>
                            {order.slaHours}h left
                          </span>
                        ) : <span className="text-gray-300 text-xs">—</span>}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-[#2E5529]">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-amber-600">
                            <Flag className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded hover:bg-gray-100 text-gray-400">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-12 text-center text-gray-400 text-sm">No orders match the current filter.</div>
              )}
            </div>
          ) : (
            /* Escalation tab full view */
            <div className="p-5 space-y-4">
              {ESCALATION_QUEUE.map(esc => (
                <div key={esc.id} className={`rounded-xl border p-5 ${esc.priority === "critical" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${esc.priority === "critical" ? "bg-red-200 text-red-800" : "bg-amber-200 text-amber-800"}`}>
                          {esc.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">{esc.id}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-[#2E5529] font-medium">{esc.orderId}</span>
                      </div>
                      <p className="font-bold text-gray-900">{esc.issue}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Raised by: <strong>{esc.raisedBy}</strong></span>
                        <span>Current handler: <strong>{esc.currentHandler}</strong></span>
                        <span className="text-gray-400">{esc.raisedAt}</span>
                      </div>
                      <div className="mt-3 space-y-1">
                        {esc.steps.map((s, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${i === esc.steps.length - 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>{i + 1}</span>
                            <p className="text-sm text-gray-700">{s}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <div className={`text-sm font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 ${esc.priority === "critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                        <Clock className="w-4 h-4" />
                        SLA: {esc.slaRemaining}
                      </div>
                      <button className="bg-[#2E5529] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#3E7B27] flex items-center gap-1.5 justify-center">
                        <Zap className="w-4 h-4" /> Resolve
                      </button>
                      <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-white flex items-center gap-1.5 justify-center">
                        <MessageSquare className="w-4 h-4" /> Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Overdue Panel */}
          {tab === "overdue" && overdue.length > 0 && (
            <div className="px-5 pb-5">
              <div className="mt-5 pt-5 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">Overdue Action Details</h3>
                <div className="space-y-2">
                  {overdue.map(o => o.overdueAction && (
                    <div key={o.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono text-[#2E5529] font-medium">{o.id} — </span>
                        <span className="text-xs text-red-700">{o.overdueAction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Table Footer */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl flex items-center justify-between text-xs text-gray-400">
            <span>Showing {filtered.length} of {active.length} active orders</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last refreshed: 2026-06-09 11:22 SGT</span>
            </div>
          </div>
        </div>

        {/* Bottom summary row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Order Value (Active)", val: "USD 1,058,950", icon: <BarChart2 className="w-4 h-4 text-[#2E5529]" /> },
            { label: "Avg. Days to Resolution (Last 30d)", val: "6.4 days", icon: <Clock className="w-4 h-4 text-blue-600" /> },
            { label: "SLA Compliance Rate (Jun 2026)", val: "87.2%", icon: <CheckCircle className="w-4 h-4 text-green-600" /> },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="font-bold text-gray-900">{s.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
