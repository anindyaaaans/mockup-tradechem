import { useState } from "react";
import {
  MessageSquare, Ship, DollarSign, Leaf, Shield,
  CheckCircle, ChevronRight, Send, Globe, AlertTriangle,
  Truck, Package, MapPin, Clock, TrendingUp, Zap,
  FileText, Bell, Languages, Smartphone, Search,
  BarChart2, Wind, Factory, Anchor, Navigation,
  AlertCircle, RefreshCw, Calculator, Boxes
} from "lucide-react";

const TABS = [
  { id: "chat", label: "Chat Engine", icon: MessageSquare, color: "blue" },
  { id: "tracking", label: "Vessel Tracking", icon: Ship, color: "indigo" },
  { id: "freight", label: "Freight & Landed Cost", icon: DollarSign, color: "amber" },
  { id: "carbon", label: "Carbon Calculator", icon: Leaf, color: "emerald" },
  { id: "regulation", label: "Regulation Intelligence", icon: Shield, color: "rose" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string; btn: string }> = {
  blue:    { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   badge: "bg-blue-100 text-blue-800",   btn: "bg-blue-600 hover:bg-blue-700" },
  indigo:  { bg: "bg-indigo-50",  text: "text-indigo-700",  border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-800", btn: "bg-indigo-600 hover:bg-indigo-700" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",  badge: "bg-amber-100 text-amber-800",  btn: "bg-amber-600 hover:bg-amber-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",badge: "bg-emerald-100 text-emerald-800", btn: "bg-emerald-600 hover:bg-emerald-700" },
  rose:    { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200",   badge: "bg-rose-100 text-rose-800",   btn: "bg-rose-600 hover:bg-rose-700" },
};

// ─── Chat Engine Tab ────────────────────────────────────────────────────────
function ChatEngineTab() {
  const [message, setMessage] = useState("");
  const [activeChannel, setActiveChannel] = useState("rfq-1024");
  const [language, setLanguage] = useState("EN");

  const channels = [
    { id: "rfq-1024", label: "Citric Acid RFQ #TC-1024", type: "RFQ Thread", unread: 3 },
    { id: "pe-inquiry", label: "Polyethylene Food Grade Inquiry", type: "Product Inquiry", unread: 0 },
    { id: "shipment-eta", label: "Shipment ETA Discussion", type: "Logistics", unread: 1 },
    { id: "sds-verify", label: "SDS/TDS Verification", type: "Compliance", unread: 0 },
    { id: "pricing-neg", label: "Pricing & MOQ Discussion", type: "Negotiation", unread: 2 },
  ];

  const messages = [
    { sender: "PT Kimia Jaya", role: "Supplier", time: "09:14", text: "We can supply Citric Acid Monohydrate 99.5% purity, Food Grade certified. MOQ is 500 kg.", lang: "EN", avatar: "KJ" },
    { sender: "You", role: "Buyer", time: "09:18", text: "Do you have Halal certification available?", lang: "EN", avatar: "YU" },
    { sender: "PT Kimia Jaya", role: "Supplier", time: "09:21", text: "是的，我们持有有效的清真认证，有效期至2027年。我可以通过电子邮件发送证书。", lang: "ZH", translated: "Yes, we hold a valid Halal certificate valid until 2027. I can send the certificate via email.", avatar: "KJ" },
    { sender: "Compliance Bot", role: "System", time: "09:22", text: "⚠ REACH compliance check: Citric Acid (CAS 77-92-9) — No restrictions for food applications in SEA. Certificate required for EU export.", lang: "EN", avatar: "CB", isSystem: true },
    { sender: "You", role: "Buyer", time: "09:25", text: "Please share the Halal cert and SDS. What is the lead time for 2MT?", lang: "EN", avatar: "YU" },
  ];

  const channelObj = channels.find(c => c.id === activeChannel);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left: Channel List */}
      <div className="lg:col-span-1 bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-[#2E5529] text-white p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5" />
            <h3 className="font-bold">Procurement Channels</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-white/60" />
            <input className="w-full pl-8 pr-3 py-2 rounded bg-white/20 text-white placeholder-white/60 text-sm border border-white/30" placeholder="Search channels..." />
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {channels.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${activeChannel === ch.id ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#303030] truncate pr-2">{ch.label}</p>
                {ch.unread > 0 && (
                  <span className="bg-[#2E5529] text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{ch.unread}</span>
                )}
              </div>
              <p className="text-xs text-[#5D5D5D] mt-0.5">{ch.type}</p>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-sm text-[#2E5529] font-semibold border-2 border-dashed border-[#2E5529]/40 rounded-lg py-2 hover:border-[#2E5529] hover:bg-green-50 transition-colors">
            + New Channel
          </button>
        </div>
      </div>

      {/* Right: Chat Window */}
      <div className="lg:col-span-3 flex flex-col bg-white border-2 border-gray-200 rounded-xl overflow-hidden" style={{ minHeight: 520 }}>
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-[#303030]">{channelObj?.label}</p>
            <p className="text-xs text-[#5D5D5D]">{channelObj?.type} · 3 participants · WhatsApp synced</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full border border-green-200">
              <Smartphone className="w-3 h-3" />
              <span>WA Synced</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full border border-blue-200">
              <Languages className="w-3 h-3" />
              <select value={language} onChange={e => setLanguage(e.target.value)} className="bg-transparent text-xs font-semibold outline-none cursor-pointer">
                <option value="EN">Auto-Translate ON</option>
                <option value="OFF">Translate OFF</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => {
            const isMe = msg.sender === "You";
            const isSystem = msg.isSystem;
            if (isSystem) return (
              <div key={idx} className="flex justify-center">
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 max-w-xl text-xs text-amber-800 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>{msg.text}</span>
                </div>
              </div>
            );
            return (
              <div key={idx} className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isMe ? "bg-[#2E5529] text-white" : "bg-blue-600 text-white"}`}>
                  {msg.avatar}
                </div>
                <div className={`max-w-sm ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className="flex items-center gap-2">
                    {!isMe && <span className="text-xs font-semibold text-[#303030]">{msg.sender}</span>}
                    <span className="text-xs text-[#5D5D5D]">{msg.time}</span>
                    {msg.lang !== "EN" && (
                      <span className="bg-purple-100 text-purple-700 text-xs px-1.5 rounded">ZH → EN</span>
                    )}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl text-sm ${isMe ? "bg-[#2E5529] text-white rounded-tr-sm" : "bg-white border border-gray-200 rounded-tl-sm text-[#303030]"}`}>
                    {msg.lang !== "EN" && msg.translated ? (
                      <div>
                        <p className="text-xs opacity-70 mb-1 italic">{msg.text}</p>
                        <p>{msg.translated}</p>
                      </div>
                    ) : msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3">
            <button className="text-[#5D5D5D] hover:text-[#2E5529] p-2">
              <FileText className="w-5 h-5" />
            </button>
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-[#2E5529] outline-none"
              placeholder="Type a message... (auto-translated to recipient language)"
            />
            <button className="bg-[#2E5529] text-white p-2.5 rounded-full hover:bg-[#3E7B27] transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#5D5D5D] mt-2 text-center">
            All messages are archived · Contact masked · WhatsApp mirrored
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Languages, title: "Auto Multi-Language", desc: "AWS Translate + Alibaba Cloud for Mandarin", color: "bg-purple-50 text-purple-700" },
          { icon: Smartphone, title: "WhatsApp Sync", desc: "Mirrored conversations, contact masked", color: "bg-green-50 text-green-700" },
          { icon: FileText, title: "RFQ Threads", desc: "Linked to product, supplier & compliance", color: "bg-blue-50 text-blue-700" },
          { icon: Shield, title: "Audit Log", desc: "Full searchable negotiation history", color: "bg-amber-50 text-amber-700" },
        ].map((card, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
            <div className={`p-2 rounded-lg ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-[#303030]">{card.title}</p>
              <p className="text-xs text-[#5D5D5D] mt-0.5">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Vessel Tracking Tab ────────────────────────────────────────────────────
function VesselTrackingTab() {
  const [selected, setSelected] = useState(0);

  const shipments = [
    {
      vessel: "MV Sinar Bandung",
      container: "MSCU7834521",
      origin: "Shanghai, CN",
      destination: "Tanjung Priok, ID",
      cargo: "Caustic Soda – 20MT",
      status: "In Transit",
      eta: "Jun 3, 2026",
      risk: "Low",
      progress: 68,
      milestones: [
        { label: "Order Confirmed", done: true, date: "May 10" },
        { label: "Port Departure", done: true, date: "May 18" },
        { label: "In Transit", done: true, date: "May 18–Jun 3" },
        { label: "Port Arrival", done: false, date: "Jun 3 (est.)" },
        { label: "Customs Clearance", done: false, date: "Jun 4–5 (est.)" },
        { label: "Final Delivery", done: false, date: "Jun 6 (est.)" },
      ],
    },
    {
      vessel: "MV Ever Bright",
      container: "EVGU4412307",
      origin: "Busan, KR",
      destination: "Singapore",
      cargo: "Methanol – 5MT",
      status: "Customs Hold",
      eta: "Jun 1, 2026",
      risk: "High",
      progress: 85,
      milestones: [
        { label: "Order Confirmed", done: true, date: "May 5" },
        { label: "Port Departure", done: true, date: "May 14" },
        { label: "In Transit", done: true, date: "May 14–29" },
        { label: "Port Arrival", done: true, date: "May 29" },
        { label: "Customs Clearance", done: false, date: "Held — IMDG doc missing" },
        { label: "Final Delivery", done: false, date: "TBD" },
      ],
    },
    {
      vessel: "MV Pacific Titan",
      container: "HLXU1098234",
      origin: "Jubail, SA",
      destination: "Port Klang, MY",
      cargo: "Ethylene – 10MT",
      status: "Delivered",
      eta: "May 22, 2026",
      risk: "None",
      progress: 100,
      milestones: [
        { label: "Order Confirmed", done: true, date: "Apr 28" },
        { label: "Port Departure", done: true, date: "May 5" },
        { label: "In Transit", done: true, date: "May 5–20" },
        { label: "Port Arrival", done: true, date: "May 20" },
        { label: "Customs Clearance", done: true, date: "May 21" },
        { label: "Final Delivery", done: true, date: "May 22" },
      ],
    },
  ];

  const s = shipments[selected];
  const riskColors: Record<string, string> = {
    Low: "bg-green-100 text-green-800",
    High: "bg-red-100 text-red-800",
    None: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Shipment List */}
      <div className="space-y-3">
        <h3 className="font-bold text-[#303030] flex items-center gap-2">
          <Navigation className="w-5 h-5 text-indigo-600" />
          Active Shipments
        </h3>
        {shipments.map((sh, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`w-full text-left bg-white border-2 rounded-xl p-4 transition-all hover:shadow-md ${selected === idx ? "border-indigo-500 shadow-md" : "border-gray-200"}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold text-sm text-[#303030]">{sh.vessel}</p>
                <p className="text-xs text-[#5D5D5D]">{sh.container}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${riskColors[sh.risk]}`}>{sh.status}</span>
            </div>
            <p className="text-xs text-[#5D5D5D]">{sh.cargo}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-[#5D5D5D]">
              <MapPin className="w-3 h-3" />
              <span>{sh.origin} → {sh.destination}</span>
            </div>
            <div className="mt-3">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${sh.progress}%` }} />
              </div>
              <p className="text-xs text-[#5D5D5D] mt-1">{sh.progress}% complete · ETA {sh.eta}</p>
            </div>
          </button>
        ))}

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <p className="text-xs font-bold text-indigo-800 mb-2">Powered By</p>
          {["MarineTraffic", "project44", "Flexport API", "FourKites"].map(p => (
            <div key={p} className="flex items-center gap-2 text-xs text-indigo-700 mb-1">
              <CheckCircle className="w-3 h-3" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
          {/* Map Placeholder */}
          <div className="h-40 bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-700 relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(255,255,255,0.1) 20px,rgba(255,255,255,0.1) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(255,255,255,0.1) 20px,rgba(255,255,255,0.1) 21px)"
            }} />
            <div className="text-center text-white">
              <Ship className="w-12 h-12 mx-auto mb-2 opacity-80" />
              <p className="font-bold text-lg">{s.vessel}</p>
              <p className="text-sm opacity-80">{s.origin} → {s.destination}</p>
            </div>
            {s.risk === "High" && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Customs Hold
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Container", value: s.container },
                { label: "Cargo", value: s.cargo },
                { label: "ETA", value: s.eta },
                { label: "Risk", value: s.risk === "None" ? "Delivered" : s.risk },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-[#5D5D5D] mb-1">{item.label}</p>
                  <p className="font-bold text-sm text-[#303030]">{item.value}</p>
                </div>
              ))}
            </div>

            <h4 className="font-bold text-[#303030] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Shipment Milestones
            </h4>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-3">
                {s.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-4 pl-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center z-10 ${m.done ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300"}`}>
                      {m.done && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <div className={`flex-1 text-sm ${m.done ? "text-[#303030]" : "text-[#5D5D5D]"}`}>
                      <span className="font-semibold">{m.label}</span>
                      <span className="ml-2 text-xs">{m.date}</span>
                      {m.label === "Customs Clearance" && s.risk === "High" && (
                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Action Required</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Predictive ETA */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-indigo-700" />
          </div>
          <div>
            <p className="font-bold text-sm text-[#303030]">Predictive ETA & Risk Monitoring</p>
            <p className="text-xs text-[#5D5D5D] mt-1">
              Based on historical route analysis, port congestion data, and carrier performance history, delay probability for {s.vessel} is estimated at{" "}
              <span className={`font-bold ${s.risk === "High" ? "text-red-600" : "text-green-600"}`}>
                {s.risk === "High" ? "72% (customs documentation issue)" : s.risk === "Low" ? "8% (weather—minor)" : "0% (delivered)"}
              </span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Freight & Landed Cost Tab ──────────────────────────────────────────────
function FreightTab() {
  const [basePrice, setBasePrice] = useState(485);
  const [quantity, setQuantity] = useState(10);
  const [ocean, setOcean] = useState(45);
  const [inland, setInland] = useState(12);
  const [hazardous, setHazardous] = useState(8);
  const [port, setPort] = useState(6);
  const [duty, setDuty] = useState(5);
  const [insurance, setInsurance] = useState(1.5);
  const [vat, setVat] = useState(11);
  const [incoterm, setIncoterm] = useState("FOB");
  const [origin, setOrigin] = useState("Shanghai, CN");
  const [destination, setDestination] = useState("Jakarta, ID");

  const totalFreight = ocean + inland + hazardous + port;
  const dutyAmount = basePrice * (duty / 100);
  const insuranceAmount = (basePrice + totalFreight) * (insurance / 100);
  const subtotal = basePrice + totalFreight + dutyAmount + insuranceAmount;
  const vatAmount = subtotal * (vat / 100);
  const landedCostPerMT = subtotal + vatAmount;
  const totalCost = landedCostPerMT * quantity;

  const incotermResponsibility: Record<string, { buyer: string[]; seller: string[] }> = {
    EXW: { seller: ["Product Price"], buyer: ["All freight, duty, insurance, VAT"] },
    FOB: { seller: ["Product Price", "Export Customs"], buyer: ["Ocean Freight", "Inland", "Duty", "Insurance", "VAT"] },
    CFR: { seller: ["Product Price", "Ocean Freight"], buyer: ["Inland", "Duty", "Insurance", "VAT"] },
    CIF: { seller: ["Product Price", "Ocean Freight", "Insurance"], buyer: ["Inland", "Duty", "VAT"] },
    DDP: { seller: ["All costs including duty & VAT"], buyer: ["Inland delivery only"] },
  };

  const resp = incotermResponsibility[incoterm] || incotermResponsibility["FOB"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inputs */}
      <div className="lg:col-span-2 space-y-5">
        {/* Route & Product */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-600" />
            Route & Product
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Origin Port</label>
              <select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none">
                <option>Shanghai, CN</option>
                <option>Busan, KR</option>
                <option>Jubail, SA</option>
                <option>Jurong, SG</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Destination Port</label>
              <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none">
                <option>Jakarta, ID</option>
                <option>Singapore</option>
                <option>Kuala Lumpur, MY</option>
                <option>Bangkok, TH</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Base Price ($/MT)</label>
              <input type="number" value={basePrice} onChange={e => setBasePrice(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Quantity (MT)</label>
              <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Freight Breakdown */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-600" />
            Freight & Charges ($/MT)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Ocean Freight", val: ocean, set: setOcean },
              { label: "Inland Transport", val: inland, set: setInland },
              { label: "Hazardous Handling", val: hazardous, set: setHazardous },
              { label: "Port Fees", val: port, set: setPort },
              { label: "Import Duty (%)", val: duty, set: setDuty },
              { label: "Insurance (%)", val: insurance, set: setInsurance },
            ].map((item, i) => (
              <div key={i}>
                <label className="text-xs font-bold text-[#5D5D5D] block mb-1">{item.label}</label>
                <input type="number" value={item.val} step="0.1" onChange={e => item.set(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Incoterm Simulation */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            Incoterm Simulation
          </h3>
          <div className="flex gap-2 flex-wrap mb-4">
            {["EXW", "FOB", "CFR", "CIF", "DDP"].map(term => (
              <button
                key={term}
                onClick={() => setIncoterm(term)}
                className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${incoterm === term ? "bg-amber-500 text-white border-amber-500" : "bg-white text-[#303030] border-gray-200 hover:border-amber-300"}`}
              >
                {term}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-xs font-bold text-green-800 mb-2">Seller Responsibility</p>
              {resp.seller.map((r, i) => <p key={i} className="text-xs text-green-700 flex items-center gap-1"><CheckCircle className="w-3 h-3" />{r}</p>)}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs font-bold text-blue-800 mb-2">Buyer Responsibility</p>
              {resp.buyer.map((r, i) => <p key={i} className="text-xs text-blue-700 flex items-center gap-1"><CheckCircle className="w-3 h-3" />{r}</p>)}
            </div>
          </div>
        </div>

        {/* Container Optimization */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-3 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-amber-600" />
            Container Load Optimization
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "FCL (20ft)", capacity: "25 MT", cost: "$1,200", recommended: quantity >= 18 },
              { label: "FCL (40ft)", capacity: "27 MT", cost: "$1,600", recommended: quantity >= 24 },
              { label: "LCL", capacity: "Any", cost: "$85/CBM", recommended: quantity < 10 },
            ].map((c, i) => (
              <div key={i} className={`border-2 rounded-xl p-3 text-center ${c.recommended ? "border-amber-400 bg-amber-50" : "border-gray-200 bg-white"}`}>
                {c.recommended && <p className="text-xs font-bold text-amber-700 mb-1">Recommended</p>}
                <p className="font-bold text-sm text-[#303030]">{c.label}</p>
                <p className="text-xs text-[#5D5D5D]">{c.capacity}</p>
                <p className="text-sm font-bold text-amber-700 mt-1">{c.cost}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white sticky top-4">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-6 h-6" />
            <h3 className="font-bold text-lg">Landed Cost Result</h3>
          </div>
          <div className="space-y-2 mb-4">
            {[
              { label: "Base Price", value: `$${basePrice}/MT` },
              { label: "Ocean Freight", value: `$${ocean}/MT` },
              { label: "Inland Transport", value: `$${inland}/MT` },
              { label: "Hazardous Handling", value: `$${hazardous}/MT` },
              { label: "Port Fees", value: `$${port}/MT` },
              { label: `Import Duty (${duty}%)`, value: `$${dutyAmount.toFixed(2)}/MT` },
              { label: `Insurance (${insurance}%)`, value: `$${insuranceAmount.toFixed(2)}/MT` },
              { label: `VAT (${vat}%)`, value: `$${vatAmount.toFixed(2)}/MT` },
            ].map((row, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="opacity-80">{row.label}</span>
                <span className="font-semibold">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/30 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">Landed Cost/MT</span>
              <span className="text-2xl font-bold">${landedCostPerMT.toFixed(2)}</span>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-xs opacity-80 mb-1">Total for {quantity} MT ({incoterm})</p>
              <p className="text-3xl font-extrabold">USD {totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-bold text-[#5D5D5D] mb-2">Freight Rate Sources</p>
          {["Freightos API", "Flexport", "DHL Logistics", "Maersk API"].map(s => (
            <div key={s} className="flex items-center gap-2 text-xs text-[#5D5D5D] mb-1">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Carbon Calculator Tab ──────────────────────────────────────────────────
function CarbonTab() {
  const [ocean, setOcean] = useState(10);
  const [truck, setTruck] = useState(150);
  const [packaging, setPackaging] = useState(2);
  const [route, setRoute] = useState("Shanghai–Jakarta");

  const routeEmissions: Record<string, number> = {
    "Shanghai–Jakarta": 18.4,
    "Busan–Singapore": 7.2,
    "Jubail–Port Klang": 12.8,
    "Jurong–Bangkok": 5.6,
  };

  const baseOcean = (routeEmissions[route] || 18.4) * ocean;
  const truckCO2 = truck * 0.092 * ocean;
  const packCO2 = packaging * ocean;
  const totalCO2 = baseOcean + truckCO2 + packCO2;
  const trees = Math.round(totalCO2 / 21.7);

  const suppliers = [
    { name: "PT Kimia Jaya", score: 82, distance: "950 km", cert: "ISO 14001" },
    { name: "Global Chemicals Co.", score: 74, distance: "1,100 km", cert: "None" },
    { name: "Indo Chem Solutions", score: 91, distance: "320 km", cert: "ISO 14001 + GHG Protocol" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calculator */}
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-4 flex items-center gap-2">
            <Wind className="w-5 h-5 text-emerald-600" />
            Emission Parameters
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Shipping Route</label>
              <select value={route} onChange={e => setRoute(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-emerald-500 outline-none">
                {Object.keys(routeEmissions).map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Quantity (MT)</label>
              <input type="number" value={ocean} onChange={e => setOcean(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Inland Truck Distance (km)</label>
              <input type="number" value={truck} onChange={e => setTruck(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Packaging Factor (kg CO₂/MT)</label>
              <input type="number" value={packaging} onChange={e => setPackaging(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-emerald-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-600" />
            Emission Breakdown
          </h3>
          {[
            { label: "Ocean Freight", kg: baseOcean, color: "bg-blue-500", pct: (baseOcean / totalCO2) * 100 },
            { label: "Inland Transportation", kg: truckCO2, color: "bg-amber-500", pct: (truckCO2 / totalCO2) * 100 },
            { label: "Packaging", kg: packCO2, color: "bg-purple-500", pct: (packCO2 / totalCO2) * 100 },
          ].map((row, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#5D5D5D]">{row.label}</span>
                <span className="font-bold text-[#303030]">{row.kg.toFixed(1)} kg CO₂</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Supplier Sustainability Scores */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-4 flex items-center gap-2">
            <Factory className="w-5 h-5 text-emerald-600" />
            Supplier Sustainability Scores
          </h3>
          <div className="space-y-3">
            {suppliers.map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="font-semibold text-sm text-[#303030]">{s.name}</p>
                  <p className="text-xs text-[#5D5D5D]">{s.distance} · {s.cert}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-[#5D5D5D]">ESG Score</p>
                    <p className={`font-bold text-lg ${s.score >= 85 ? "text-emerald-600" : s.score >= 70 ? "text-amber-600" : "text-red-600"}`}>{s.score}/100</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 flex items-center justify-center" style={{ borderColor: s.score >= 85 ? "#059669" : s.score >= 70 ? "#D97706" : "#DC2626" }}>
                    <Leaf className={`w-5 h-5 ${s.score >= 85 ? "text-emerald-600" : s.score >= 70 ? "text-amber-600" : "text-red-600"}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#5D5D5D] mt-3">Lowest emission recommendation: <span className="font-bold text-emerald-700">Indo Chem Solutions</span> (320 km, ISO 14001 + GHG Protocol)</p>
        </div>
      </div>

      {/* Result Card */}
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl p-6 text-white sticky top-4">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-6 h-6" />
            <h3 className="font-bold text-lg">Total Emissions</h3>
          </div>
          <div className="text-center py-4">
            <p className="text-5xl font-extrabold">{totalCO2.toFixed(1)}</p>
            <p className="text-xl">kg CO₂e</p>
            <p className="text-sm opacity-80 mt-2">for {ocean} MT shipment via {route}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center mt-4">
            <p className="text-xs opacity-80 mb-1">Equivalent to</p>
            <p className="text-2xl font-bold">{trees} trees</p>
            <p className="text-xs opacity-80">needed to offset for 1 year</p>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p className="font-semibold opacity-90">Data Methodology</p>
            {["EcoTransIT", "GLEC Framework", "Smart Freight Centre", "Carrier Sustainability APIs"].map(s => (
              <div key={s} className="flex items-center gap-2 text-xs opacity-80">
                <CheckCircle className="w-3 h-3" />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="font-bold text-sm text-[#303030] mb-2">ESG Procurement Report</p>
          <p className="text-xs text-[#5D5D5D] mb-3">Export for sustainability compliance reporting.</p>
          <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
            Download ESG Report (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Regulation Intelligence Tab ─────────────────────────────────────────────
function RegulationTab() {
  const [casSearch, setCasSearch] = useState("NaOH");
  const [destCountry, setDestCountry] = useState("Indonesia");

  const regulations = [
    {
      framework: "GHS",
      scope: "Global",
      status: "Compliant",
      details: "Proper hazard classification required. SDS must include 16 sections. GHS-compliant labeling mandatory.",
      severity: "info",
    },
    {
      framework: "REACH",
      scope: "European Union",
      status: "Registration Required",
      details: "CAS 1310-73-2 (Sodium Hydroxide) is on SVHC candidate list. Registration required for >1T/year EU imports.",
      severity: "warn",
    },
    {
      framework: "TSCA",
      scope: "United States",
      status: "Compliant",
      details: "Listed on TSCA Inventory. No significant new use rule (SNUR) applies. Standard import documentation required.",
      severity: "info",
    },
    {
      framework: "IMDG",
      scope: "International Maritime",
      status: "Class 8 — Corrosive",
      details: "IMDG Class 8. Proper shipping name: Sodium Hydroxide, Solid. UN Number: 2680. Segregation group: Alkalis.",
      severity: "alert",
    },
    {
      framework: "Indonesia BPOM",
      scope: "Indonesia",
      status: "Permit Required",
      details: "Industrial chemicals require import permit from Ministry of Industry. B3 hazardous material registration needed.",
      severity: "warn",
    },
    {
      framework: "ASEAN GHS",
      scope: "Southeast Asia",
      status: "Compliant",
      details: "ASEAN harmonised GHS adopted. Regional SDS format accepted across ID, MY, TH, VN, PH markets.",
      severity: "info",
    },
  ];

  const severityStyle: Record<string, { badge: string; border: string; icon: React.ComponentType<{ className?: string }> }> = {
    info:  { badge: "bg-blue-100 text-blue-800",   border: "border-l-blue-500",   icon: CheckCircle },
    warn:  { badge: "bg-amber-100 text-amber-800", border: "border-l-amber-500",  icon: AlertTriangle },
    alert: { badge: "bg-red-100 text-red-800",     border: "border-l-red-500",    icon: AlertCircle },
  };

  const certificates = [
    { name: "Safety Data Sheet (SDS)", status: "Valid", expires: "N/A" },
    { name: "GHS Label Certificate", status: "Valid", expires: "Dec 2026" },
    { name: "REACH Pre-registration", status: "Pending", expires: "—" },
    { name: "Indonesia B3 Permit", status: "Valid", expires: "Mar 2027" },
    { name: "IMDG Packaging Certificate", status: "Valid", expires: "Sep 2026" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Search & Results */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-rose-600" />
            Chemical Regulation Search
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Chemical Name or CAS</label>
              <input value={casSearch} onChange={e => setCasSearch(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-rose-500 outline-none" placeholder="e.g. NaOH or 1310-73-2" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#5D5D5D] block mb-1">Destination Country</label>
              <select value={destCountry} onChange={e => setDestCountry(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-rose-500 outline-none">
                {["Indonesia", "Malaysia", "Singapore", "Thailand", "Philippines", "Vietnam", "European Union", "United States"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button className="mt-3 bg-rose-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-rose-700 transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Check Regulations
          </button>
        </div>

        {/* Results */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#303030]">
              Regulation Results: <span className="text-rose-600">{casSearch}</span>
            </h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-[#5D5D5D]">CAS 1310-73-2 · Sodium Hydroxide</span>
          </div>
          <div className="space-y-3">
            {regulations.map((reg, i) => {
              const style = severityStyle[reg.severity];
              const Icon = style.icon;
              return (
                <div key={i} className={`border-l-4 ${style.border} bg-white border border-gray-100 rounded-lg p-4 shadow-sm`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-bold text-sm text-[#303030]">{reg.framework}</span>
                      <span className="text-xs text-[#5D5D5D]">· {reg.scope}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${style.badge}`}>{reg.status}</span>
                  </div>
                  <p className="text-xs text-[#5D5D5D]">{reg.details}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Certificate Status */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-600" />
            Certificate Status
          </h3>
          <div className="space-y-2">
            {certificates.map((cert, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <div>
                  <p className="text-xs font-semibold text-[#303030]">{cert.name}</p>
                  {cert.expires !== "N/A" && cert.expires !== "—" && (
                    <p className="text-xs text-[#5D5D5D]">Expires {cert.expires}</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cert.status === "Valid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Alerts */}
        <div className="bg-white border-2 border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-[#303030] mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-600" />
            Active Compliance Alerts
          </h3>
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs font-bold text-amber-800">REACH Registration Pending</p>
              <p className="text-xs text-amber-700 mt-0.5">NaOH pre-registration expires in 90 days. Action required for EU shipments.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs font-bold text-red-800">IMDG Packaging Update</p>
              <p className="text-xs text-red-700 mt-0.5">IMDG 2026 amendment requires updated Class 8 packaging certification by July 1.</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs font-bold text-blue-800">Indonesia B3 Renewal</p>
              <p className="text-xs text-blue-700 mt-0.5">B3 Hazardous Material permit renewal due March 2027. Submit 3 months early.</p>
            </div>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
          <p className="text-xs font-bold text-rose-800 mb-2">Regulation Frameworks Covered</p>
          {["GHS (Global)", "REACH (EU)", "TSCA (US)", "IMDG (Maritime)", "Indonesia BPOM", "ASEAN Chemical Policy", "FDA (Food Grade)", "UN Transport Regulations"].map(f => (
            <div key={f} className="flex items-center gap-2 text-xs text-rose-700 mb-1">
              <Shield className="w-3 h-3" />
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export function AdvancedMarketplacePage() {
  const [activeTab, setActiveTab] = useState("chat");

  const tab = TABS.find(t => t.id === activeTab)!;
  const c = colorMap[tab.color];

  const infrastructureItems = [
    { title: "Chat Engine", desc: "Procurement communication orchestration", icon: MessageSquare, color: "bg-blue-50 text-blue-700" },
    { title: "Vessel Tracking", desc: "Real-time logistics visibility", icon: Ship, color: "bg-indigo-50 text-indigo-700" },
    { title: "Freight Intelligence", desc: "Landed cost & freight quotations", icon: DollarSign, color: "bg-amber-50 text-amber-700" },
    { title: "Carbon Calculator", desc: "Sustainable procurement support", icon: Leaf, color: "bg-emerald-50 text-emerald-700" },
    { title: "Regulation Intelligence", desc: "Global compliance automation", icon: Shield, color: "bg-rose-50 text-rose-700" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-white via-green-50 to-white border-b-2 border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#2E5529] to-[#3E7B27] bg-clip-text text-transparent leading-tight">
            Procurement Intelligence
            <br />Infrastructure
          </h1>
          <p className="text-xl text-[#5D5D5D] max-w-3xl mx-auto mb-8 leading-relaxed">
            TradeChem transforms from a supplier directory into an{" "}
            <span className="font-bold text-[#2E5529]">integrated procurement operating ecosystem</span>{" "}—
            combining communication, logistics, compliance, sustainability, and cost intelligence in one platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {infrastructureItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(TABS[idx].id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all hover:shadow-md ${activeTab === TABS[idx].id ? "border-[#2E5529] bg-[#2E5529]/5" : "border-gray-200 bg-white hover:border-gray-300"}`}
              >
                <div className={`p-1.5 rounded-md ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-[#303030]">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Impact Banner */}
      <div className="bg-[#303030] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { label: "Buyer Experience", value: "Faster, safer, intelligent procurement", icon: TrendingUp },
              { label: "Supplier Enablement", value: "Better visibility & collaboration", icon: Globe },
              { label: "Marketplace Positioning", value: "Higher differentiation & retention", icon: Shield },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
                <item.icon className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="font-semibold text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className={`${c.bg} border ${c.border} rounded-xl p-5 mb-8`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${c.bg} border ${c.border}`}>
              <tab.icon className={`w-6 h-6 ${c.text}`} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${c.text}`}>{tab.label}</h2>
              <p className="text-sm text-[#5D5D5D] mt-1">
                {activeTab === "chat" && "Centralized procurement communication orchestration layer embedded within the sourcing workflow."}
                {activeTab === "tracking" && "Real-time vessel, container, and freight tracking with predictive ETA and risk monitoring."}
                {activeTab === "freight" && "Embedded freight intelligence with full landed cost calculation, container optimization, and Incoterm simulation."}
                {activeTab === "carbon" && "Carbon emissions calculator supporting sustainable sourcing decisions and ESG procurement reporting."}
                {activeTab === "regulation" && "Global chemical import/export regulation intelligence with smart compliance matching and alert system."}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "chat" && <ChatEngineTab />}
        {activeTab === "tracking" && <VesselTrackingTab />}
        {activeTab === "freight" && <FreightTab />}
        {activeTab === "carbon" && <CarbonTab />}
        {activeTab === "regulation" && <RegulationTab />}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-br from-[#2E5529] to-[#3E7B27] rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">From Transactional Platform to Procurement Operating System</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            TradeChem's Advanced Marketplace Infrastructure transforms chemical sourcing by integrating communication,
            logistics visibility, cost intelligence, sustainability transparency, and compliance automation into one
            connected procurement ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-300" />
              <p className="font-bold">Chat Engine</p>
              <p className="text-xs text-white/70">Reduce comm. fragmentation</p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center">
              <Ship className="w-8 h-8 mx-auto mb-2 text-indigo-300" />
              <p className="font-bold">Vessel Tracking</p>
              <p className="text-xs text-white/70">Full logistics visibility</p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-amber-300" />
              <p className="font-bold">Landed Cost</p>
              <p className="text-xs text-white/70">True procurement cost</p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center">
              <Leaf className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
              <p className="font-bold">Carbon Calculator</p>
              <p className="text-xs text-white/70">ESG procurement support</p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-rose-300" />
              <p className="font-bold">Regulation Intel</p>
              <p className="text-xs text-white/70">Reduce compliance risk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
