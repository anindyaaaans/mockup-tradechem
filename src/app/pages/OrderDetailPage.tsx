import { useState } from "react";
import {
  FileText, CheckCircle, Clock, AlertTriangle, XCircle, Upload,
  Download, ChevronRight, User, Truck, Building2, Shield,
  Package, CreditCard, Calendar, MapPin, ExternalLink,
  MessageSquare, Bell, ArrowRight, Flag, RotateCcw, Eye,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────────────────────────
const ORDER = {
  id: "TC-ORD-2026-04817",
  rfqRef: "TC-RFQ-2026-03201",
  createdAt: "2026-05-28 09:14 SGT",
  status: "Processing",
  statusCode: 3,
  product: "Acetic Acid (Glacial) 99.85%",
  hsCode: "2915.21.00",
  quantity: "240 MT",
  packageType: "ISO Tank",
  unitPrice: "USD 485 / MT",
  totalValue: "USD 116,400",
  currency: "USD",
  incoterms: "CIF Tanjung Priok",
  paymentTerms: "30% TT Advance + 70% at BL",
  deliveryDeadline: "2026-07-05",
  origin: "Nanjing, China",
  destination: "Tanjung Priok, Jakarta, Indonesia",
  buyer: { name: "PT Indokimia Utama", country: "Indonesia", contact: "Rizky Firmansyah" },
  supplier: { name: "Nanjing Chemical Co., Ltd.", country: "China", contact: "Wang Lei" },
  agent: { name: "James Carter", title: "TradeChem Trade Agent" },
  logistics: { name: "Samudera Shipping Line", vessel: "MV Pacific Star", eta: "2026-06-28" },
};

const STATUSES = [
  { code: 1, label: "Order Created", date: "28 May 09:14" },
  { code: 2, label: "Confirmed", date: "28 May 14:30" },
  { code: 3, label: "Processing", date: "01 Jun 08:00" },
  { code: 4, label: "Shipping", date: null },
  { code: 5, label: "In Transit", date: null },
  { code: 6, label: "Customs / Clearance", date: null },
  { code: 7, label: "Delivered", date: null },
  { code: 8, label: "Completed", date: null },
];

type DocStatus = "uploaded" | "pending" | "missing" | "rejected";

interface Doc {
  name: string;
  required: boolean;
  status: DocStatus;
  uploadedBy: string;
  date: string;
  note?: string;
}

const DOCUMENTS: Doc[] = [
  { name: "Purchase Order (PO)", required: true, status: "uploaded", uploadedBy: "Buyer", date: "28 May 2026" },
  { name: "Sales Contract / Proforma Invoice", required: true, status: "uploaded", uploadedBy: "Supplier", date: "29 May 2026" },
  { name: "Certificate of Analysis (COA)", required: true, status: "uploaded", uploadedBy: "Supplier", date: "01 Jun 2026" },
  { name: "Packing List", required: true, status: "pending", uploadedBy: "—", date: "—" },
  { name: "Bill of Lading (BOL)", required: true, status: "missing", uploadedBy: "—", date: "—" },
  { name: "Material Safety Data Sheet (MSDS)", required: true, status: "uploaded", uploadedBy: "Supplier", date: "01 Jun 2026" },
  { name: "Export License", required: true, status: "pending", uploadedBy: "—", date: "—" },
  { name: "Customs Declaration Form", required: true, status: "missing", uploadedBy: "—", date: "—" },
  { name: "Insurance Certificate", required: false, status: "uploaded", uploadedBy: "Supplier", date: "02 Jun 2026" },
];

const ACTIVITY = [
  { time: "01 Jun 08:12", actor: "Supplier", msg: "COA uploaded — Acetic Acid batch #AC-2026-0601 verified by QC team.", type: "doc" },
  { time: "29 May 16:40", actor: "Agent (James)", msg: "Proforma Invoice reviewed and approved. Supplier notified to begin production.", type: "action" },
  { time: "29 May 10:02", actor: "System", msg: "Payment milestone 1 (30% advance) confirmed by Finance Module. Order unlocked for processing.", type: "system" },
  { time: "28 May 14:30", actor: "Buyer", msg: "Order terms confirmed. Purchase Order #PO-IKU-2026-0528 uploaded.", type: "doc" },
  { time: "28 May 09:14", actor: "System", msg: "Order TC-ORD-2026-04817 created from RFQ TC-RFQ-2026-03201. All parties notified.", type: "system" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────
type Role = "Buyer" | "Supplier" | "Agent";

function docStatusBadge(status: DocStatus) {
  const map = {
    uploaded: { color: "bg-green-100 text-green-700", icon: <CheckCircle className="w-3.5 h-3.5" />, label: "Uploaded" },
    pending:  { color: "bg-amber-100 text-amber-700",  icon: <Clock className="w-3.5 h-3.5" />,        label: "Pending" },
    missing:  { color: "bg-red-100 text-red-700",      icon: <XCircle className="w-3.5 h-3.5" />,      label: "Missing" },
    rejected: { color: "bg-red-100 text-red-700",      icon: <XCircle className="w-3.5 h-3.5" />,      label: "Rejected" },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}>
      {s.icon}{s.label}
    </span>
  );
}

function RoleActions({ role, status }: { role: Role; status: string }) {
  if (role === "Buyer") return (
    <div className="space-y-3">
      {status === "Delivered" && (
        <button className="w-full bg-[#2E5529] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#3E7B27] flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4" /> Confirm Delivery Receipt
        </button>
      )}
      <button className="w-full border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
        <Flag className="w-4 h-4 text-red-500" /> Raise Dispute
      </button>
      <button className="w-full border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
        <MessageSquare className="w-4 h-4" /> Message Agent
      </button>
    </div>
  );

  if (role === "Supplier") return (
    <div className="space-y-3">
      <button className="w-full bg-[#2E5529] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#3E7B27] flex items-center justify-center gap-2">
        <Upload className="w-4 h-4" /> Upload Documents
      </button>
      <button className="w-full border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-600" /> Confirm Dispatch
      </button>
      <button className="w-full border border-red-200 text-red-600 px-4 py-2.5 rounded-lg font-medium hover:bg-red-50 flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4" /> Flag Unable to Fulfill
      </button>
    </div>
  );

  return (
    <div className="space-y-3">
      <button className="w-full bg-[#2E5529] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#3E7B27] flex items-center justify-center gap-2">
        <Shield className="w-4 h-4" /> Validate Documents
      </button>
      <button className="w-full border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
        <Truck className="w-4 h-4" /> Assign Logistics Partner
      </button>
      <button className="w-full border border-amber-300 text-amber-700 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-50 flex items-center justify-center gap-2">
        <ArrowRight className="w-4 h-4" /> Escalate Exception
      </button>
      <button className="w-full border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
        <RotateCcw className="w-4 h-4" /> Override Status
      </button>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export function OrderDetailPage() {
  const [role, setRole] = useState<Role>("Supplier");

  const missingCount = DOCUMENTS.filter(d => d.status === "missing" || d.status === "pending").length;

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Role Switcher Banner */}
      <div className="bg-[#2E5529] text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <span className="opacity-80">OMS Mockup — Viewing as:</span>
          <div className="flex gap-2">
            {(["Buyer", "Supplier", "Agent"] as Role[]).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  role === r ? "bg-white text-[#2E5529]" : "bg-white/20 hover:bg-white/30"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>Orders</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{ORDER.id}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{ORDER.id}</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                From RFQ {ORDER.rfqRef} · Created {ORDER.createdAt}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {missingCount > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <AlertTriangle className="w-4 h-4" />
                  {missingCount} document{missingCount > 1 ? "s" : ""} required
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-semibold">
                <Package className="w-4 h-4" />
                {ORDER.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left / Main Column ────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Status Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Order Timeline</h2>
              <div className="flex items-start gap-0 overflow-x-auto pb-2">
                {STATUSES.map((s, i) => {
                  const done = s.code < ORDER.statusCode;
                  const active = s.code === ORDER.statusCode;
                  return (
                    <div key={s.code} className="flex items-center min-w-0">
                      <div className="flex flex-col items-center min-w-[80px]">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                          done   ? "bg-[#2E5529] border-[#2E5529] text-white"
                          : active ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                        }`}>
                          {done ? <CheckCircle className="w-4 h-4" /> : s.code}
                        </div>
                        <span className={`text-[10px] text-center mt-1.5 leading-tight ${active ? "text-blue-700 font-semibold" : done ? "text-[#2E5529] font-medium" : "text-gray-400"}`}>
                          {s.label}
                        </span>
                        {s.date && (
                          <span className="text-[9px] text-gray-400 mt-0.5">{s.date}</span>
                        )}
                      </div>
                      {i < STATUSES.length - 1 && (
                        <div className={`h-0.5 w-6 flex-shrink-0 -mt-5 ${s.code < ORDER.statusCode ? "bg-[#2E5529]" : "bg-gray-200"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Grid */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Order Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Product</p>
                    <p className="font-semibold text-gray-900">{ORDER.product}</p>
                    <p className="text-xs text-gray-500">HS Code: {ORDER.hsCode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Quantity & Packaging</p>
                    <p className="font-medium text-gray-900">{ORDER.quantity}</p>
                    <p className="text-xs text-gray-500">{ORDER.packageType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Incoterms</p>
                    <span className="inline-block bg-blue-50 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {ORDER.incoterms}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                    <p className="font-semibold text-gray-900">{ORDER.unitPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Order Value</p>
                    <p className="text-xl font-bold text-[#2E5529]">{ORDER.totalValue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Payment Terms</p>
                    <p className="font-medium text-gray-900 text-sm">{ORDER.paymentTerms}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parties */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Parties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: <Building2 className="w-5 h-5 text-blue-600" />, role: "Buyer", name: ORDER.buyer.name, sub: ORDER.buyer.contact, tag: ORDER.buyer.country },
                  { icon: <Package className="w-5 h-5 text-[#2E5529]" />, role: "Supplier", name: ORDER.supplier.name, sub: ORDER.supplier.contact, tag: ORDER.supplier.country },
                  { icon: <User className="w-5 h-5 text-purple-600" />, role: "Trade Agent", name: ORDER.agent.name, sub: ORDER.agent.title, tag: "TradeChem" },
                  { icon: <Truck className="w-5 h-5 text-orange-600" />, role: "Logistics", name: ORDER.logistics.name, sub: ORDER.logistics.vessel, tag: `ETA ${ORDER.logistics.eta}` },
                ].map(p => (
                  <div key={p.role} className={`rounded-lg border-2 p-3 ${role === p.role ? "border-[#2E5529] bg-green-50" : "border-gray-100 bg-gray-50"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {p.icon}
                      <span className="text-xs font-semibold text-gray-500 uppercase">{p.role}</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm leading-tight">{p.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{p.sub}</p>
                    <span className="inline-block mt-2 bg-white border border-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded">{p.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Document Checklist</h2>
                <div className="flex gap-2 text-xs text-gray-500">
                  <span className="text-green-600 font-medium">
                    {DOCUMENTS.filter(d => d.status === "uploaded").length} uploaded
                  </span>
                  <span>·</span>
                  <span className="text-red-600 font-medium">
                    {DOCUMENTS.filter(d => d.status !== "uploaded").length} outstanding
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {DOCUMENTS.map(doc => (
                  <div key={doc.name} className={`flex items-center justify-between p-3 rounded-lg border ${
                    doc.status === "uploaded" ? "bg-green-50 border-green-100"
                    : doc.status === "pending" ? "bg-amber-50 border-amber-100"
                    : "bg-red-50 border-red-100"
                  }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className={`w-4 h-4 flex-shrink-0 ${
                        doc.status === "uploaded" ? "text-green-600" : doc.status === "pending" ? "text-amber-600" : "text-red-500"
                      }`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {doc.name}
                          {doc.required && <span className="text-red-500 ml-0.5">*</span>}
                        </p>
                        {doc.status === "uploaded" && (
                          <p className="text-xs text-gray-500">by {doc.uploadedBy} · {doc.date}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {docStatusBadge(doc.status)}
                      {doc.status === "uploaded" && (
                        <button className="text-gray-400 hover:text-gray-600">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      {(doc.status === "missing" || doc.status === "pending") && (role === "Supplier" || role === "Agent") && (
                        <button className="bg-[#2E5529] text-white text-xs px-2.5 py-1 rounded flex items-center gap-1 hover:bg-[#3E7B27]">
                          <Upload className="w-3 h-3" /> Upload
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Activity Log</h2>
              <div className="space-y-4">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      a.type === "doc" ? "bg-blue-100" : a.type === "action" ? "bg-purple-100" : "bg-gray-100"
                    }`}>
                      {a.type === "doc" ? <FileText className="w-4 h-4 text-blue-600" />
                        : a.type === "action" ? <Shield className="w-4 h-4 text-purple-600" />
                        : <Bell className="w-4 h-4 text-gray-500" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">{a.actor}</span>
                        <span className="text-xs text-gray-400">{a.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">{a.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Sidebar ─────────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Role-based Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Actions · <span className="text-[#2E5529]">{role}</span>
              </h2>
              <RoleActions role={role} status={ORDER.status} />
            </div>

            {/* Logistics & Delivery */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Shipment</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Origin</p>
                    <p className="font-medium text-gray-900">{ORDER.origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#2E5529] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="font-medium text-gray-900">{ORDER.destination}</p>
                  </div>
                </div>
                <hr className="border-gray-100" />
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Carrier</p>
                    <p className="font-medium text-gray-900">{ORDER.logistics.name}</p>
                    <p className="text-xs text-gray-500">{ORDER.logistics.vessel}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">ETA</p>
                    <p className="font-medium text-gray-900">{ORDER.logistics.eta}</p>
                  </div>
                </div>
                <button className="w-full text-center text-xs text-[#2E5529] hover:underline font-medium flex items-center justify-center gap-1 mt-1">
                  <Eye className="w-3.5 h-3.5" /> View Tracking Dashboard
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Commercial Terms Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Commercial Terms</h2>
              <div className="space-y-3 text-sm">
                {[
                  { icon: <CreditCard className="w-4 h-4 text-gray-400" />, label: "Payment", val: ORDER.paymentTerms },
                  { icon: <Calendar className="w-4 h-4 text-gray-400" />, label: "Delivery Deadline", val: ORDER.deliveryDeadline },
                  { icon: <Package className="w-4 h-4 text-gray-400" />, label: "Incoterms", val: ORDER.incoterms },
                ].map(t => (
                  <div key={t.label} className="flex items-start gap-2">
                    <div className="mt-0.5 flex-shrink-0">{t.icon}</div>
                    <div>
                      <p className="text-xs text-gray-500">{t.label}</p>
                      <p className="font-medium text-gray-900">{t.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Payment Status</h2>
              <div className="space-y-2">
                {[
                  { label: "Advance (30%)", amount: "USD 34,920", status: "Paid", color: "green" },
                  { label: "Balance (70%) at BL", amount: "USD 81,480", status: "Pending", color: "amber" },
                ].map(p => (
                  <div key={p.label} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-xs text-gray-500">{p.label}</p>
                      <p className="font-semibold text-gray-900 text-sm">{p.amount}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      p.color === "green" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
