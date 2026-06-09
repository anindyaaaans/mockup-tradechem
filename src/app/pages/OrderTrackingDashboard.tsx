import { useState } from "react";
import {
  Truck, MapPin, Clock, AlertTriangle, CheckCircle, Package,
  Anchor, Plane, Navigation, RefreshCw, ChevronRight, ExternalLink,
  Radio, Thermometer, Wind, Gauge, Calendar, FileText, Bell,
  ArrowUp, ArrowDown, Minus, Info,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────────────────────────
const SHIPMENT = {
  orderId: "TC-ORD-2026-04817",
  product: "Acetic Acid (Glacial) 99.85%",
  quantity: "240 MT · ISO Tank",
  status: "In Transit",
  hasDelay: true,
  delayDays: 2,
  delayReason: "Port congestion at Port Klang, Malaysia — vessel diverted from scheduled route.",
  carrier: "Samudera Shipping Line",
  vessel: "MV Pacific Star",
  vesselIMO: "IMO 9812345",
  voyage: "SSQ-026W",
  trackingNo: "SSLA2026040817",
  blNo: "SSLA20260601PK",
  origin: { port: "Nanjing, China", code: "CNNKG", departed: "2026-06-03 06:40 CST" },
  destination: { port: "Tanjung Priok, Jakarta", code: "IDJKT", original: "2026-06-28", revised: "2026-06-30" },
  lastUpdate: "2026-06-09 11:22 SGT",
  lastPosition: "Strait of Malacca, 2°48′N 103°52′E",
  speed: "12.4 knots",
  heading: "SW 218°",
  cargo: {
    temp: "Ambient",
    hazClass: "Class 8 – Corrosive",
    seals: "Intact",
    containerNo: "SSLA4408172",
  },
};

const CHECKPOINTS = [
  { id: 1, event: "Order Dispatched – Goods Loaded", location: "Nanjing Port, China", time: "2026-06-03 06:40", status: "done", note: "BOL issued. 4× ISO tanks sealed and loaded aboard MV Pacific Star." },
  { id: 2, event: "Departed Origin Port", location: "Nanjing (CNK), China", time: "2026-06-03 18:10", status: "done", note: "Vessel departed on schedule. Voyage number SSQ-026W." },
  { id: 3, event: "Passed Taiwan Strait", location: "Taiwan Strait", time: "2026-06-05 14:30", status: "done", note: "Routine checkpoint. No deviations reported." },
  { id: 4, event: "⚠ Route Deviation Detected", location: "South China Sea", time: "2026-06-07 08:15", status: "flag", note: "Vessel rerouted to avoid Port Klang congestion. ETA revised from Jun 28 to Jun 30. All parties notified via system alert." },
  { id: 5, event: "Current Position – In Transit", location: "Strait of Malacca (2°48′N 103°52′E)", time: "2026-06-09 11:22", status: "active", note: "Speed 12.4 kn. Heading SW 218°. On revised schedule." },
  { id: 6, event: "Expected: Arrival at Tanjung Priok", location: "Tanjung Priok, Jakarta, Indonesia", time: "2026-06-30 (ETA)", status: "pending", note: "" },
  { id: 7, event: "Customs Clearance", location: "Tanjung Priok, Jakarta, Indonesia", time: "Est. 2026-07-01", status: "pending", note: "" },
  { id: 8, event: "Last-mile Delivery to Buyer", location: "Buyer Warehouse, Cikarang", time: "Est. 2026-07-02", status: "pending", note: "" },
];

const ROUTE_NODES = [
  { label: "Nanjing, CN", sub: "Departed 3 Jun", done: true },
  { label: "South China Sea", sub: "5–6 Jun", done: true },
  { label: "Malacca Strait", sub: "Now · 9 Jun", active: true },
  { label: "Singapore Waters", sub: "Est. 11–12 Jun", done: false },
  { label: "Tanjung Priok, ID", sub: "ETA 30 Jun", done: false },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function etaDelta(original: string, revised: string) {
  const orig = new Date(original);
  const rev = new Date(revised);
  const diff = Math.round((rev.getTime() - orig.getTime()) / 86400000);
  if (diff === 0) return null;
  return diff > 0 ? `+${diff}d delay` : `${diff}d early`;
}

function CheckpointDot({ status }: { status: string }) {
  if (status === "done")   return <div className="w-4 h-4 rounded-full bg-[#2E5529] border-2 border-[#2E5529] flex items-center justify-center"><CheckCircle className="w-2.5 h-2.5 text-white" /></div>;
  if (status === "active") return <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-500 animate-pulse" />;
  if (status === "flag")   return <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-amber-500 flex items-center justify-center"><AlertTriangle className="w-2.5 h-2.5 text-white" /></div>;
  return <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300" />;
}

// ── Page ───────────────────────────────────────────────────────────────────────
export function OrderTrackingDashboard() {
  const [showTechDetails, setShowTechDetails] = useState(false);
  const delta = etaDelta(SHIPMENT.destination.original, SHIPMENT.destination.revised);

  return (
    <div className="bg-[#F5F7FA] min-h-screen">

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>Orders</span>
            <ChevronRight className="w-4 h-4" />
            <span>{SHIPMENT.orderId}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Shipment Tracking</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shipment Tracking</h1>
              <p className="text-sm text-gray-500 mt-0.5">{SHIPMENT.orderId} · {SHIPMENT.product}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Last updated {SHIPMENT.lastUpdate}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-semibold">
                <Radio className="w-4 h-4" /> In Transit
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Delay Alert Banner */}
        {SHIPMENT.hasDelay && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800">Active Delay Flag — ETA Revised by {SHIPMENT.delayDays} Days</p>
              <p className="text-sm text-amber-700 mt-0.5">{SHIPMENT.delayReason}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-amber-600">Original ETA: <strong>{SHIPMENT.destination.original}</strong></span>
                <span className="text-amber-800">Revised ETA: <strong>{SHIPMENT.destination.revised}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              icon: <Navigation className="w-5 h-5 text-blue-600" />,
              label: "Current Position",
              value: "Malacca Strait",
              sub: SHIPMENT.lastPosition,
              bg: "bg-blue-50",
            },
            {
              icon: <Calendar className="w-5 h-5 text-amber-600" />,
              label: "Revised ETA",
              value: SHIPMENT.destination.revised,
              sub: delta ? <span className="text-amber-600 font-medium">{delta}</span> : "On schedule",
              bg: "bg-amber-50",
            },
            {
              icon: <Gauge className="w-5 h-5 text-[#2E5529]" />,
              label: "Vessel Speed",
              value: SHIPMENT.speed,
              sub: `Heading ${SHIPMENT.heading}`,
              bg: "bg-green-50",
            },
            {
              icon: <Truck className="w-5 h-5 text-purple-600" />,
              label: "Carrier",
              value: "Samudera Shipping",
              sub: SHIPMENT.vessel,
              bg: "bg-purple-50",
            },
          ].map(c => (
            <div key={c.label} className={`${c.bg} rounded-xl p-4 border border-white`}>
              <div className="flex items-center gap-2 mb-2">{c.icon}<span className="text-xs text-gray-500 font-medium">{c.label}</span></div>
              <p className="font-bold text-gray-900 text-base leading-tight">{c.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Route Visualizer ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Visual Route */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Route Progress</h2>

              {/* Route nodes */}
              <div className="relative flex items-center justify-between mb-2">
                {ROUTE_NODES.map((node, i) => (
                  <div key={i} className="flex flex-col items-center text-center z-10 flex-1">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-1.5 ${
                      node.done ? "bg-[#2E5529] border-[#2E5529]"
                      : node.active ? "bg-blue-500 border-blue-500 animate-pulse"
                      : "bg-white border-gray-300"
                    }`}>
                      {i === 0 ? <Anchor className={`w-4 h-4 ${node.done ? "text-white" : "text-gray-400"}`} />
                        : i === ROUTE_NODES.length - 1 ? <MapPin className={`w-4 h-4 ${node.done ? "text-white" : "text-gray-400"}`} />
                        : node.active ? <Radio className="w-4 h-4 text-white" />
                        : <Navigation className={`w-4 h-4 ${node.done ? "text-white" : "text-gray-400"}`} />
                      }
                    </div>
                    <p className={`text-xs font-semibold leading-tight ${node.active ? "text-blue-700" : node.done ? "text-[#2E5529]" : "text-gray-400"}`}>
                      {node.label}
                    </p>
                    <p className={`text-[10px] mt-0.5 ${node.active ? "text-blue-500" : "text-gray-400"}`}>{node.sub}</p>
                  </div>
                ))}
                {/* Connecting line */}
                <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-0">
                  <div className="h-full bg-[#2E5529]" style={{ width: "46%" }} />
                </div>
              </div>

              {/* Ship icon moving */}
              <div className="relative h-6 mt-2 mb-3">
                <div className="absolute" style={{ left: "44%" }}>
                  <div className="bg-blue-500 text-white rounded-full p-1 shadow-lg">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-700 text-white text-[9px] px-1.5 py-0.5 rounded">
                    NOW
                  </div>
                </div>
              </div>

              {/* Distance info */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100 text-center">
                <div>
                  <p className="text-xs text-gray-500">Departed</p>
                  <p className="font-semibold text-sm text-gray-900">6 days ago</p>
                  <p className="text-xs text-gray-500">3 Jun 2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Est. Remaining</p>
                  <p className="font-semibold text-sm text-blue-700">~21 days</p>
                  <p className="text-xs text-gray-500">~4,400 nm left</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ETA</p>
                  <p className="font-semibold text-sm text-amber-700">{SHIPMENT.destination.revised}</p>
                  <p className="text-xs text-amber-600">+2d revised</p>
                </div>
              </div>
            </div>

            {/* Checkpoint History */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Tracking History</h2>
              <div className="space-y-0">
                {CHECKPOINTS.map((cp, i) => (
                  <div key={cp.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <CheckpointDot status={cp.status} />
                      {i < CHECKPOINTS.length - 1 && (
                        <div className={`w-0.5 flex-1 min-h-[32px] mt-1 ${cp.status === "done" ? "bg-[#2E5529]/40" : "bg-gray-200"}`} />
                      )}
                    </div>
                    <div className={`pb-5 min-w-0 flex-1 ${cp.status === "flag" ? "bg-amber-50 -mx-2 px-2 rounded-lg" : ""}`}>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className={`text-sm font-semibold ${
                          cp.status === "active" ? "text-blue-700"
                          : cp.status === "flag" ? "text-amber-800"
                          : cp.status === "pending" ? "text-gray-400"
                          : "text-gray-900"
                        }`}>{cp.event}</p>
                        <span className="text-xs text-gray-400">{cp.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <MapPin className="w-3 h-3" />{cp.location}
                      </div>
                      {cp.note && (
                        <p className={`text-xs mt-1 ${cp.status === "flag" ? "text-amber-700" : "text-gray-500"}`}>{cp.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Sidebar ─────────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Carrier Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Carrier Details</h2>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Carrier", val: SHIPMENT.carrier },
                  { label: "Vessel", val: SHIPMENT.vessel },
                  { label: "IMO Number", val: SHIPMENT.vesselIMO },
                  { label: "Voyage", val: SHIPMENT.voyage },
                  { label: "Tracking No.", val: SHIPMENT.trackingNo },
                  { label: "Bill of Lading", val: SHIPMENT.blNo },
                ].map(r => (
                  <div key={r.label} className="flex justify-between gap-2">
                    <span className="text-gray-500 text-xs flex-shrink-0">{r.label}</span>
                    <span className="font-medium text-gray-900 text-xs text-right">{r.val}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-xs text-[#2E5529] hover:underline font-medium flex items-center justify-center gap-1">
                Track on Samudera Portal <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Cargo Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Cargo Details</h2>
                <button onClick={() => setShowTechDetails(!showTechDetails)} className="text-xs text-gray-400 hover:text-gray-600">
                  <Info className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Package className="w-4 h-4 text-[#2E5529]" />, label: "Container No.", val: SHIPMENT.cargo.containerNo },
                  { icon: <Thermometer className="w-4 h-4 text-blue-500" />, label: "Temperature", val: SHIPMENT.cargo.temp },
                  { icon: <AlertTriangle className="w-4 h-4 text-red-500" />, label: "Hazard Class", val: SHIPMENT.cargo.hazClass },
                  { icon: <CheckCircle className="w-4 h-4 text-green-600" />, label: "Seal Status", val: SHIPMENT.cargo.seals },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-2">
                    {r.icon}
                    <div className="flex-1 flex justify-between">
                      <span className="text-xs text-gray-500">{r.label}</span>
                      <span className="text-xs font-semibold text-gray-900">{r.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Origin / Destination */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Ports</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Anchor className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Origin Port</p>
                    <p className="font-semibold text-sm text-gray-900">{SHIPMENT.origin.port}</p>
                    <p className="text-xs text-gray-400">Code: {SHIPMENT.origin.code}</p>
                    <p className="text-xs text-green-600 font-medium mt-0.5">✓ Departed {SHIPMENT.origin.departed}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2E5529] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Destination Port</p>
                    <p className="font-semibold text-sm text-gray-900">{SHIPMENT.destination.port}</p>
                    <p className="text-xs text-gray-400">Code: {SHIPMENT.destination.code}</p>
                    <div className="mt-0.5 space-y-0.5">
                      <p className="text-xs text-gray-400 line-through">ETA: {SHIPMENT.destination.original}</p>
                      <p className="text-xs text-amber-600 font-medium">Revised: {SHIPMENT.destination.revised}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Alerts</h2>
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">ETA revised — Customs clearance timeline may shift. Agent notified.</p>
                </div>
                <div className="flex items-start gap-2 p-2.5 bg-blue-50 rounded-lg">
                  <Bell className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">Packing list and BOL upload still pending from supplier.</p>
                </div>
                <div className="flex items-start gap-2 p-2.5 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-green-700">COA validated by agent. Cargo integrity confirmed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
