import { useState } from "react";
import {
  Clock, DollarSign, Shield, Zap, CheckCircle, AlertTriangle,
  ChevronDown, FileText, MapPin, Package, BarChart2, ArrowRight,
  Star, Anchor, Info, Activity, AlertCircle, Play,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// ── Route database ────────────────────────────────────────────────────────────
const ROUTE_DB: Record<string, Record<string, { sea: [number, number]; air: [number, number] }>> = {
  "Shanghai, CN": {
    "Tanjung Priok, ID": { sea: [14, 18], air: [2, 4] },
    "Rotterdam, NL":      { sea: [35, 45], air: [5, 8] },
  },
  "Singapore, SG": {
    "Tanjung Priok, ID": { sea: [3, 5],   air: [1, 2] },
    "Rotterdam, NL":      { sea: [26, 32], air: [4, 6] },
  },
  "Busan, KR": {
    "Tanjung Priok, ID": { sea: [12, 15], air: [3, 5] },
  },
};

const ORIGINS = Object.keys(ROUTE_DB);
const getDests = (o: string) => Object.keys(ROUTE_DB[o] ?? {});

const HAZARD_CLASSES = [
  "Non-DG",
  "Class 1 · Explosives",
  "Class 2 · Gases",
  "Class 3 · Flammable Liquids",
  "Class 4 · Flammable Solids",
  "Class 5 · Oxidizers",
  "Class 6 · Toxic",
  "Class 7 · Radioactive",
  "Class 8 · Corrosive",
  "Class 9 · Miscellaneous",
];
const URGENCY_LEVELS = ["Low", "Medium", "High", "Emergency"];
const PIE_COLORS = ["#2E5529","#5B8C5A","#7BB27A","#A8D5A2","#C5E0C2","#E8F5E9"];

// ── Types ─────────────────────────────────────────────────────────────────────
interface Form {
  product: string; quantityMT: number; volumeCBM: number; pricePerMT: number;
  origin: string; destination: string; urgency: string; hazardClass: string;
}
type RiskLevel   = "Low" | "Medium" | "High";
type CheckStatus = "pass" | "info" | "warning" | "block";
type AlertLevel  = "info" | "warning" | "block";

interface CalcResult {
  mode: string; freightCost: number; transitRange: string; transitMid: number;
  formula: { label: string; amt: number }[];
  productCost: number; totalLanded: number; costPerMT: number;
  visibleCosts: number; hiddenCosts: number;
  hiddenPremiumUSD: number; hiddenPremiumPct: number;
  costRows: { name: string; type: string; calc: string; amt: number; pct: number }[];
  pieParts: { name: string; value: number; color: string }[];
  overallRisk: RiskLevel; riskScore: number; isBlocked: boolean;
  checks: { id: string; label: string; status: CheckStatus; note: string }[];
  alerts: { id: string; level: AlertLevel; msg: string }[];
  docs: { doc: string; status: "mandatory" | "conditional"; note: string }[];
  incoterm: string; compositeScore: number;
  scoreFactors: { label: string; weight: number; score: number; color: string }[];
  alternatives: {
    key: string; label: string; icon: React.ElementType;
    mode: string; route: string; days: string; cost: string;
    incoterm: string; confidence: string; note: string;
    accentText: string; iconColor: string; scores: Record<string, number>;
  }[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const f2    = (n: number) => +n.toFixed(2);
const fUSD  = (n: number) => "USD " + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const DG_RISK: Record<number, number> = { 0:92, 1:38, 2:72, 3:65, 4:75, 5:70, 6:52, 7:10, 8:70, 9:85 };

function dgNote(cls: number, air: boolean): string {
  const n: Record<number,string> = {
    1: "Class 1 (Explosives): heavily restricted. Special packaging and permits required.",
    2: "Class 2 (Gases): pressurised container; segregation required.",
    3: air ? "Class 3 (Flammable): IATA DGR packing restrictions; temperature control required."
           : "Class 3 (Flammable Liquids): flash-point labelling; segregate from oxidizers.",
    4: "Class 4 (Flammable Solids): moisture protection; segregate from oxidizers.",
    5: "Class 5 (Oxidizers): UN-approved packaging; segregate from combustibles.",
    6: "Class 6 (Toxic): UN-approved packaging; PPE + biohazard labelling required.",
    8: "Class 8 (Corrosive): IMDG Code applies. Segregate from metals; acid-resistant liners.",
    9: "Class 9 (Misc DG): follow specific UN number requirements.",
  };
  return n[cls] ?? `DG Class ${cls}: standard IMDG/IATA requirements apply.`;
}

// ── Calculation engine ────────────────────────────────────────────────────────
function compute(f: Form): CalcResult {
  const { quantityMT, volumeCBM, pricePerMT, origin, destination, urgency, hazardClass } = f;
  const wKg    = quantityMT * 1000;
  const hasDG  = !hazardClass.startsWith("Non");
  const dgCls  = hasDG ? parseInt(hazardClass.split(" ")[1]) : 0;
  const blocked = dgCls === 7;
  const dgRate  = hasDG ? 0.20 : 0;
  const isHigh  = urgency === "High" || urgency === "Emergency";

  const route = ROUTE_DB[origin]?.[destination] ?? { sea: [14,18] as [number,number], air: [2,4] as [number,number] };
  const [s0,s1] = route.sea; const [a0,a1] = route.air;
  const seaMid = Math.round((s0+s1)/2); const airMid = Math.round((a0+a1)/2);

  // Freight
  const seaBase = volumeCBM * 60;
  const seaFuel = seaBase * 0.35; const seaDG = seaBase * dgRate;
  const seaFC   = Math.round(seaBase + seaFuel + seaDG);

  const airBase = wKg * 3.5;
  const airFuel = airBase * 0.35; const airDG = airBase * dgRate;
  const airFC   = Math.round(airBase + airFuel + airDG);

  const useAir  = !blocked && (isHigh || (volumeCBM <= 5 && airFC < seaFC * 0.7));
  const mode    = useAir ? "Air Freight" : "Sea FCL 20'";
  const fc      = useAir ? airFC   : seaFC;
  const tMid    = useAir ? airMid  : seaMid;
  const tRange  = useAir ? `${a0}–${a1}` : `${s0}–${s1}`;

  const formula = useAir
    ? [{ label: `Base (${wKg.toLocaleString()} kg × $3.50/kg)`, amt: Math.round(airBase) },
       { label: "Fuel surcharge (35%)", amt: Math.round(airFuel) },
       { label: `DG premium (${Math.round(dgRate*100)}%)`,     amt: Math.round(airDG) }]
    : [{ label: `Base (${volumeCBM} CBM × $60/CBM)`, amt: Math.round(seaBase) },
       { label: "Fuel surcharge (35%)",               amt: Math.round(seaFuel) },
       { label: `DG premium (${Math.round(dgRate*100)}%)`, amt: Math.round(seaDG) }];

  // Landed cost
  const pc  = f2(quantityMT * pricePerMT);
  const ins = f2(pc * 0.002);
  const cif = f2(pc + fc + ins);
  const dut = f2(cif * 0.05);
  const vat = f2((cif + dut) * 0.11);
  const loc = 350;
  const tot = f2(pc + fc + ins + dut + vat + loc);
  const cpm = f2(tot / quantityMT);
  const vis = f2(pc + fc + dut);
  const hid = f2(ins + vat + loc);
  const hpUSD = f2(cpm - pricePerMT);
  const hpPct = f2((hpUSD / pricePerMT) * 100);

  const rows = [
    { name: "Product Cost",      type:"visible", calc:`${quantityMT} MT × USD ${pricePerMT}`, amt:pc,  pct:f2(pc/tot*100) },
    { name: "Freight Cost",      type:"visible", calc:`${mode} (estimated)`,                   amt:fc,  pct:f2(fc/tot*100) },
    { name: "Insurance (0.20%)", type:"hidden",  calc:`0.20% × USD ${pc.toLocaleString()}`,    amt:ins, pct:f2(ins/tot*100)},
    { name: "Import Duty (5%)",  type:"visible", calc:"5% × CIF value",                        amt:dut, pct:f2(dut/tot*100)},
    { name: "VAT / PPN (11%)",   type:"hidden",  calc:"11% × (CIF + Duty)",                    amt:vat, pct:f2(vat/tot*100)},
    { name: "Local Charges",     type:"hidden",  calc:"THC + Broker + Trucking",                amt:loc, pct:f2(loc/tot*100)},
  ];
  const pie = rows.map((r,i) => ({ name:r.name.split(" ")[0], value:r.pct, color:PIE_COLORS[i] }));

  // Compliance
  const toIndo = destination.includes("ID");
  const rBase  = DG_RISK[dgCls] ?? 80;
  const oRisk: RiskLevel = blocked ? "High" : rBase >= 80 ? "Low" : rBase >= 55 ? "Medium" : "High";
  const rScore = clamp(100 - rBase, 5, 90);

  const checks: CalcResult["checks"] = [
    { id:"S1", label:"Sanctions / Embargo Check", status:"pass",
      note:`${destination} not on sanctions list. Route legally permissible.` },
    { id:"S2", label:"DG Restriction Check",
      status: blocked ? "block" : hasDG ? "info" : "pass",
      note: blocked ? "Class 7 (Radioactive) — BLOCKED. Licensed carrier and special authorization required."
          : hasDG   ? dgNote(dgCls, useAir)
                    : "Non-DG product. No dangerous goods restrictions apply." },
    { id:"S3", label:"Mandatory Document Check", status:"pass",
      note: hasDG ? "All required DG documents identified: Invoice, Packing List, B/L, MSDS, DG Declaration."
                  : "All required documents identified: Commercial Invoice, Packing List, B/L." },
    { id:"S4", label:"Import Permit Check",
      status: toIndo ? "warning" : "pass",
      note: toIndo ? "API-P / API-U import authorisation required. Verify before booking carrier."
                   : "No special import permit required for this destination." },
    { id:"S5", label:"Modal Compliance Check",
      status: (useAir && [1,3,6].includes(dgCls)) ? "warning" : "pass",
      note: useAir && [1,3,6].includes(dgCls)
          ? `${hazardClass.split("·")[0].trim()} via air: IATA DGR restrictions. Cargo aircraft only.`
          : "Shipping mode compliant with cargo type and route." },
    { id:"S6", label:"Port & Weather Context", status:"info",
      note: toIndo ? "Tanjung Priok: normal congestion. Add 2-day buffer during monsoon season (Nov–Mar)."
          : destination.includes("NL") ? "Rotterdam: low congestion. Standard clearance 1–2 days."
                                       : "Port conditions normal for selected route." },
  ];

  const alerts: CalcResult["alerts"] = [];
  if (blocked) {
    alerts.push({ id:"E1", level:"block", msg:"Class 7 (Radioactive) BLOCKED. Licensed carrier and special authorization required before proceeding." });
  } else if (hasDG) {
    if (dgCls===8) alerts.push({ id:"I1", level:"info",    msg:"IMDG Code applies — segregate from metals, acid-resistant liners required." });
    if (dgCls===3) alerts.push({ id:"I1", level:"info",    msg:"Class 3 (Flammable): temperature control + flash-point labelling required." });
    if (dgCls===6) alerts.push({ id:"W1", level:"warning", msg:"Class 6 Toxic: PPE + biohazard labelling mandatory. Sub-class 6.2 cargo aircraft only." });
    if (dgCls===1) alerts.push({ id:"W1", level:"warning", msg:"Class 1 Explosives: special packaging, permits, and security measures required." });
    if (useAir && [1,3,6].includes(dgCls)) alerts.push({ id:"W2", level:"warning", msg:"Verify IATA DGR packing group and quantity limits before booking air freight." });
  }
  if (toIndo) {
    alerts.push({ id:`W${alerts.length+1}`, level:"warning", msg:"API-P / API-U import authorisation required. Do not book carrier until permit is confirmed." });
    alerts.push({ id:`I${alerts.length+2}`, level:"info",    msg:"Tanjung Priok: normal congestion. Add 2-day buffer during monsoon season (Nov–Mar)." });
  }
  if (alerts.length === 0) {
    alerts.push({ id:"I1", level:"info", msg:"No critical alerts for this shipment. Proceed with standard documentation." });
  }

  const docs: CalcResult["docs"] = [
    { doc:"Commercial Invoice",   status:"mandatory",   note:"Must match B/L description exactly" },
    { doc:"Packing List",         status:"mandatory",   note:"Gross weight + package count" },
    { doc:"Bill of Lading (B/L)", status:"mandatory",   note:"Carrier-issued, endorsable" },
    ...(hasDG ? [
      { doc:"MSDS / SDS",                      status:"mandatory"   as const, note:"GHS format required" },
      { doc:`DG Declaration (Class ${dgCls})`, status:"mandatory"   as const, note:`UN Class ${dgCls}` },
    ] : []),
    { doc:"Certificate of Origin", status:"conditional", note:"For FTA preferential tariff" },
    ...(toIndo ? [{ doc:"Import Permit (API-P)", status:"conditional" as const, note:"Verify before booking" }] : []),
  ];

  // Scores
  const wts = isHigh
    ? { cost:0.20, time:0.45, risk:0.25, comp:0.10 }
    : { cost:0.35, time:0.25, risk:0.25, comp:0.15 };

  const maxDays   = 45;
  const costScore = clamp(Math.round(95 - (fc / (pc * 0.15)) * 20), 40, 98);
  const timeScore = clamp(Math.round(100 - (tMid / maxDays) * 70), 25, 95);
  const rskScore  = clamp(rBase, 10, 95);
  const cmpScore  = clamp(hasDG ? (blocked ? 0 : 80) : 95, 0, 100);

  const composite = clamp(Math.round(
    costScore*wts.cost + timeScore*wts.time + rskScore*wts.risk + cmpScore*wts.comp
  ), 0, 100);

  const airTot = f2(pc + airFC + f2(pc*0.002) + f2((pc+airFC+f2(pc*0.002))*0.05) + f2(((pc+airFC+f2(pc*0.002))*1.05)*0.11) + loc);
  const bufTot = f2(tot + 150);

  const route2 = `${origin.split(",")[0]} → ${destination.split(",")[0]}`;
  const alternatives: CalcResult["alternatives"] = [
    {
      key:"cost", label:"Lowest Cost", icon:DollarSign,
      mode:"Sea FCL 20'", route:route2, days:`${s0}–${s1}`, cost:fUSD(tot),
      incoterm:"CIF", confidence:"85–95%", note:"Cost 60% weight · most economical",
      accentText:"text-emerald-700", iconColor:"text-emerald-600",
      scores:{ Cost:costScore, Time:timeScore, Risk:rskScore, Compliance:cmpScore },
    },
    {
      key:"fast", label:"Fastest Delivery", icon:Zap,
      mode:"Air Freight", route:route2, days:`${a0}–${a1}`, cost:fUSD(airTot),
      incoterm:"EXW / FOB", confidence:"80–90%",
      note:`Time 55% weight · ${Math.round((airTot/tot-1)*100)}% total cost premium`,
      accentText:"text-amber-700", iconColor:"text-amber-600",
      scores:{
        Cost:    clamp(costScore-30, 20, 70),
        Time:    clamp(Math.round(100-(airMid/maxDays)*70), 80, 98),
        Risk:    clamp(rskScore - (hasDG && [1,3,6].includes(dgCls) ? 20 : 5), 20, 90),
        Compliance: clamp(cmpScore - (hasDG ? 15 : 5), 40, 95),
      },
    },
    {
      key:"safe", label:"Lowest Risk", icon:Shield,
      mode:"Sea FCL 20' + 5-day buffer", route:route2, days:`${s0+5}–${s1+5}`, cost:fUSD(bufTot),
      incoterm:"CIF", confidence:"75–88%", note:"Risk 50% weight · contingency buffer",
      accentText:"text-blue-700", iconColor:"text-blue-600",
      scores:{
        Cost:       clamp(costScore-5, 45, 95),
        Time:       clamp(timeScore-15, 20, 80),
        Risk:       clamp(rskScore+12, 40, 99),
        Compliance: clamp(cmpScore+5, 50, 100),
      },
    },
  ];

  const incoterm = oRisk === "High" ? "CIP" : useAir ? "CPT" : "CIF";

  return {
    mode, freightCost:fc, transitRange:tRange, transitMid:tMid, formula,
    productCost:pc, totalLanded:tot, costPerMT:cpm,
    visibleCosts:vis, hiddenCosts:hid, hiddenPremiumUSD:hpUSD, hiddenPremiumPct:hpPct,
    costRows:rows, pieParts:pie,
    overallRisk:oRisk, riskScore:rScore, isBlocked:blocked,
    checks, alerts, docs,
    incoterm, compositeScore:composite,
    scoreFactors:[
      { label:"Cost",       weight:Math.round(wts.cost*100), score:costScore, color:"#2E5529" },
      { label:"Time",       weight:Math.round(wts.time*100), score:timeScore, color:"#5B8C5A" },
      { label:"Risk",       weight:Math.round(wts.risk*100), score:rskScore,  color:"#7BB27A" },
      { label:"Compliance", weight:Math.round(wts.comp*100), score:cmpScore,  color:"#A8D5A2" },
    ],
    alternatives,
  };
}

// ── Status config ─────────────────────────────────────────────────────────────
type SK = "pass"|"info"|"warning"|"block";
const SC: Record<SK,{ Icon:React.ElementType; color:string; bg:string; border:string }> = {
  pass:    { Icon:CheckCircle,   color:"text-emerald-700", bg:"bg-emerald-50",  border:"border-emerald-200" },
  info:    { Icon:Info,          color:"text-blue-700",    bg:"bg-blue-50",     border:"border-blue-200"    },
  warning: { Icon:AlertTriangle, color:"text-amber-700",   bg:"bg-amber-50",    border:"border-amber-200"   },
  block:   { Icon:AlertCircle,   color:"text-red-700",     bg:"bg-red-50",      border:"border-red-200"     },
};

function PieTooltip({ active, payload }: { active?: boolean; payload?: { payload:{ name:string; value:number } }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow px-3 py-2 text-xs">
      <p className="font-semibold">{d.name}</p><p className="text-gray-500">{d.value}%</p>
    </div>
  );
}

// ── Default form ──────────────────────────────────────────────────────────────
const DEFAULT: Form = {
  product:"Caustic Soda (NaOH)", quantityMT:10, volumeCBM:4.5, pricePerMT:450,
  origin:"Shanghai, CN", destination:"Tanjung Priok, ID", urgency:"Medium", hazardClass:"Class 8 · Corrosive",
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export function LogisticsDashboardPage() {
  const [form, setForm]         = useState<Form>(DEFAULT);
  const [result, setResult]     = useState<CalcResult>(() => compute(DEFAULT));
  const [showBreakdown, setSB]  = useState(false);
  const [showDocs, setSD]       = useState(false);
  const [activeAlt, setAlt]     = useState<string|null>(null);

  const set = (k: keyof Form, v: string | number) => {
    setForm(prev => {
      const next = { ...prev, [k]: v };
      if (k === "origin") {
        const dests = getDests(v as string);
        if (!dests.includes(next.destination)) next.destination = dests[0] ?? "";
      }
      return next;
    });
  };

  const handleCalculate = () => {
    setResult(compute(form));
    setSB(false); setSD(false); setAlt(null);
  };

  const riskColors: Record<string,string> = { Low:"text-emerald-700", Medium:"text-amber-700", High:"text-red-700" };
  const riskBgs:    Record<string,string> = { Low:"bg-emerald-50 border-emerald-200", Medium:"bg-amber-50 border-amber-200", High:"bg-red-50 border-red-200" };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* ── INPUT FORM ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Shipment Input</span>
          </div>
          <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField label="Product Name">
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2E5529]/30 bg-slate-50"
                value={form.product}
                onChange={e => set("product", e.target.value)}
                placeholder="e.g. Caustic Soda (NaOH)"
              />
            </FormField>

            <FormField label="Quantity (MT)">
              <input type="number" min={0.1} step={0.1}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2E5529]/30 bg-slate-50"
                value={form.quantityMT}
                onChange={e => set("quantityMT", parseFloat(e.target.value) || 1)}
              />
            </FormField>

            <FormField label="Volume (CBM)">
              <input type="number" min={0.1} step={0.1}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2E5529]/30 bg-slate-50"
                value={form.volumeCBM}
                onChange={e => set("volumeCBM", parseFloat(e.target.value) || 0.1)}
              />
            </FormField>

            <FormField label="Product Price (USD/MT)">
              <input type="number" min={1} step={1}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2E5529]/30 bg-slate-50"
                value={form.pricePerMT}
                onChange={e => set("pricePerMT", parseFloat(e.target.value) || 1)}
              />
            </FormField>

            <FormField label="Origin Port" icon={<MapPin className="w-3.5 h-3.5" />}>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2E5529]/30 bg-slate-50"
                value={form.origin}
                onChange={e => set("origin", e.target.value)}
              >
                {ORIGINS.map(o => <option key={o}>{o}</option>)}
              </select>
            </FormField>

            <FormField label="Destination Port" icon={<MapPin className="w-3.5 h-3.5" />}>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2E5529]/30 bg-slate-50"
                value={form.destination}
                onChange={e => set("destination", e.target.value)}
              >
                {getDests(form.origin).map(d => <option key={d}>{d}</option>)}
              </select>
            </FormField>

            <FormField label="Urgency Level">
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2E5529]/30 bg-slate-50"
                value={form.urgency}
                onChange={e => set("urgency", e.target.value)}
              >
                {URGENCY_LEVELS.map(u => <option key={u}>{u}</option>)}
              </select>
            </FormField>

            <FormField label="Hazard Class">
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2E5529]/30 bg-slate-50"
                value={form.hazardClass}
                onChange={e => set("hazardClass", e.target.value)}
              >
                {HAZARD_CLASSES.map(h => <option key={h}>{h}</option>)}
              </select>
            </FormField>

            <div className="flex items-end">
              <button
                onClick={handleCalculate}
                className="w-full flex items-center justify-center gap-2 bg-[#2E5529] hover:bg-[#3E7B27] text-white font-bold text-sm rounded-lg px-4 py-2.5 transition-colors"
              >
                <Play className="w-4 h-4" /> Calculate
              </button>
            </div>
          </div>
        </div>

        {/* ── FREIGHT ENGINE ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <SectionHeader label="Freight Engine" />
            <div className="px-5 py-4 space-y-4">
              <div>
                <p className="text-[10px] text-slate-400 mb-1">Recommended Mode</p>
                <div className="flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-[#2E5529]" />
                  <span className="text-xl font-black text-slate-900">{result.mode}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {form.volumeCBM} CBM · {form.urgency} urgency · {form.hazardClass.split("·")[0].trim()}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-1.5">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">Freight Cost Formula</p>
                {result.formula.map((row, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="font-semibold text-slate-700">USD {row.amt.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-slate-200 pt-1.5">
                  <span className="font-bold text-slate-800">Freight Cost</span>
                  <span className="font-black text-[#2E5529]">≈ {fUSD(result.freightCost)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                  <p className="text-[10px] text-slate-400">Transit Time</p>
                  <p className="text-base font-black text-slate-900">{result.transitRange} days</p>
                </div>
                <div className="bg-[#2E5529]/5 rounded-xl px-3 py-2.5 border border-[#2E5529]/20">
                  <p className="text-[10px] text-slate-400">Confidence</p>
                  <p className="text-base font-black text-[#2E5529]">HIGH · 88%</p>
                </div>
              </div>

              <div className="text-xs bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100 space-y-1">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Mode Selection Logic</p>
                <p className="text-slate-500">
                  {form.urgency === "High" || form.urgency === "Emergency"
                    ? "✓ High urgency → Air Freight override"
                    : form.volumeCBM > 5
                      ? "✓ Volume > 5 CBM → Sea FCL preference"
                      : "✓ Full multi-criteria scoring applied"}
                </p>
                <p className="text-slate-500">
                  ✓ Urgency = {form.urgency} → {(form.urgency === "High" || form.urgency === "Emergency") ? "Time 45%, Cost 20%" : "Cost 35%, Time 25%"} weights
                </p>
              </div>
            </div>
          </div>

          {/* ── LANDED COST ──────────────────────────────────────────── */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <SectionHeader label="Landed Cost Calculator" />
            <div className="px-5 pt-5 pb-2">
              <p className="text-xs text-slate-400 mb-0.5">Total Landed Cost</p>
              <p className="text-5xl font-black text-slate-900 tracking-tight">{fUSD(result.totalLanded)}</p>
            </div>
            <div className="px-5 pb-4 mt-3 grid grid-cols-3 gap-2">
              <MiniCard label="Supplier Quote"  value={`USD ${form.pricePerMT}/MT`} />
              <MiniCard label="Actual Cost/MT"  value={`USD ${result.costPerMT.toLocaleString("en-US",{minimumFractionDigits:2})}`} highlight />
              <MiniCard label="Hidden Premium"  value={`+${result.hiddenPremiumPct}%`} warn />
            </div>

            <div className="mx-5 mb-3 grid grid-cols-2 gap-2">
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Visible Costs</p>
                <p className="text-lg font-black text-blue-900">{fUSD(result.visibleCosts)}</p>
                <p className="text-[10px] text-blue-500">Product · Freight · Duty</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
                <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wide mb-0.5">Hidden Costs</p>
                <p className="text-lg font-black text-amber-900">{fUSD(result.hiddenCosts)}</p>
                <p className="text-[10px] text-amber-500">Insurance · VAT · Local</p>
              </div>
            </div>

            <div className="mx-5 mb-3 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  +{fUSD(result.hiddenPremiumUSD)} / MT ({result.hiddenPremiumPct}%) above supplier quote
                </p>
                <p className="text-xs text-amber-600">Insurance · Terminal Handling · Customs Broker · Inland Trucking · VAT</p>
              </div>
            </div>

            <button onClick={() => setSB(!showBreakdown)}
              className="mx-5 mb-4 flex items-center gap-1.5 text-xs font-medium text-[#2E5529] hover:underline">
              <BarChart2 className="w-3.5 h-3.5" />
              {showBreakdown ? "Hide" : "View"} full cost breakdown
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showBreakdown?"rotate-180":""}`} />
            </button>

            {showBreakdown && (
              <div className="border-t border-slate-100 px-5 py-4">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-36 shrink-0">
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie data={result.pieParts} cx="50%" cy="50%" innerRadius={38} outerRadius={68} paddingAngle={2} dataKey="value" stroke="none">
                          {result.pieParts.map((d,i) => <Cell key={i} fill={d.color} />)}
                        </Pie>
                        <Tooltip content={<PieTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 w-full overflow-x-auto">
                    <table className="w-full text-xs min-w-[320px]">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-medium">
                          <th className="text-left py-1">Component</th>
                          <th className="text-center py-1">Type</th>
                          <th className="text-right py-1">Amount (USD)</th>
                          <th className="text-right py-1">%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.costRows.map(r => (
                          <tr key={r.name} className="border-b border-slate-50">
                            <td className="py-1.5 font-medium text-slate-700">{r.name}</td>
                            <td className="py-1.5 text-center">
                              <span className={`text-[10px] font-semibold px-1.5 rounded ${r.type==="visible"?"bg-blue-100 text-blue-700":"bg-amber-100 text-amber-700"}`}>{r.type}</span>
                            </td>
                            <td className="py-1.5 text-right font-semibold text-slate-800">{r.amt.toLocaleString("en-US",{minimumFractionDigits:2})}</td>
                            <td className="py-1.5 text-right text-slate-400">{r.pct}%</td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-slate-300">
                          <td className="py-2 font-black text-slate-900" colSpan={2}>Total Landed Cost</td>
                          <td className="py-2 text-right font-black text-[#2E5529]">{result.totalLanded.toLocaleString("en-US",{minimumFractionDigits:2})}</td>
                          <td className="py-2 text-right font-black text-slate-500">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── COMPLIANCE ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <SectionHeader label="Compliance & Risk Intelligence" />
          <div className="px-5 py-5 space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800`}>
                <Anchor className="w-3 h-3" /> {form.hazardClass.startsWith("Non") ? "Non-DG" : form.hazardClass}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${riskBgs[result.overallRisk]} ${riskColors[result.overallRisk]}`}>
                <AlertTriangle className="w-3 h-3" /> Overall Risk: {result.overallRisk}
              </span>
              {!result.isBlocked && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle className="w-3 h-3" /> Route: Permissible
                </span>
              )}
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Composite Risk Level</span>
                <span className={`font-semibold ${riskColors[result.overallRisk]}`}>
                  {result.overallRisk} — {result.riskScore} / 100
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${result.overallRisk==="High"?"bg-red-500":result.overallRisk==="Medium"?"bg-gradient-to-r from-amber-300 to-amber-500":"bg-emerald-500"}`}
                  style={{ width:`${result.riskScore}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-300 mt-1">
                <span>Low</span><span>Medium</span><span>High</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Sequential Decision Tree</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {result.checks.map(c => {
                  const cfg = SC[c.status];
                  return (
                    <div key={c.id} className={`flex items-start gap-3 rounded-xl px-3 py-2.5 border ${cfg.bg} ${cfg.border}`}>
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <span className="text-[9px] font-bold text-slate-400 leading-none">{c.id}</span>
                        <cfg.Icon className={`w-4 h-4 ${cfg.color}`} />
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${cfg.color}`}>{c.label}</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{c.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">System Alerts</p>
              <div className="space-y-2">
                {result.alerts.map(a => (
                  <div key={a.id} className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 border
                    ${a.level==="block" ? "bg-red-50 border-red-200" : a.level==="warning" ? "bg-amber-50 border-amber-200" : "bg-blue-50 border-blue-200"}`}>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 mt-0.5
                      ${a.level==="block" ? "bg-red-200 text-red-800" : a.level==="warning" ? "bg-amber-200 text-amber-800" : "bg-blue-200 text-blue-800"}`}>
                      {a.id}
                    </span>
                    <p className={`text-xs leading-relaxed ${a.level==="block"?"text-red-800":a.level==="warning"?"text-amber-800":"text-blue-800"}`}>{a.msg}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button onClick={() => setSD(!showDocs)}
                className="flex items-center gap-1.5 text-xs font-medium text-[#2E5529] hover:underline">
                <FileText className="w-3.5 h-3.5" />
                {showDocs ? "Hide" : "Show"} document checklist ({result.docs.length} documents)
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDocs?"rotate-180":""}`} />
              </button>
              {showDocs && (
                <div className="mt-3 space-y-1.5">
                  {result.docs.map(d => (
                    <div key={d.doc} className="flex items-center justify-between text-xs bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                      <div className="flex items-center gap-2">
                        {d.status==="mandatory"
                          ? <CheckCircle className="w-3.5 h-3.5 text-[#2E5529] shrink-0" />
                          : <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        <span className="font-medium text-slate-700">{d.doc}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${d.status==="mandatory"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>{d.status}</span>
                        <span className="text-slate-400 hidden sm:block">{d.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!result.isBlocked && (
              <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-emerald-800">All clear — shipment may proceed</p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">Review all conditional documents before booking carrier</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── SMART RECOMMENDATION ───────────────────────────────────── */}
        {!result.isBlocked && (
          <div className="rounded-2xl overflow-hidden shadow-sm border border-blue-900/20">
            <div className="bg-gradient-to-br from-[#1A3A5C] via-[#1E4D8C] to-[#2D6BC4] px-6 py-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">Smart Recommendation — Best Overall</p>
                  <h2 className="text-3xl font-black text-white leading-tight mb-1">{result.mode}</h2>
                  <div className="flex items-center gap-1.5 text-blue-200 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {form.origin.split(",")[0]} <ArrowRight className="w-3 h-3" /> {form.destination.split(",")[0]}
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span className="bg-white/15 border border-white/30 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                    Score {result.compositeScore} / 100
                  </span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(result.compositeScore/20) ? "text-yellow-300 fill-yellow-300" : "text-white/30"}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <HeroMetric icon={<Clock className="w-4 h-4" />}      label="Transit Time"    value={`${result.transitMid} days`} />
                <HeroMetric icon={<DollarSign className="w-4 h-4" />} label="Landed Cost"     value={fUSD(result.totalLanded)} />
                <HeroMetric icon={<FileText className="w-4 h-4" />}   label="Incoterm"        value={result.incoterm + " " + form.destination.split(",")[0]} />
                <HeroMetric icon={<Activity className="w-4 h-4" />}   label="Composite Score" value={`${result.compositeScore} / 100`} />
              </div>

              <div className="bg-white/10 rounded-2xl px-4 py-4">
                <p className="text-[10px] font-semibold text-blue-200 uppercase tracking-wider mb-3">
                  Score = (0.{String(result.scoreFactors[0].weight).padStart(2,"0")} × Cost) + (0.{String(result.scoreFactors[1].weight).padStart(2,"0")} × Time) + (0.{String(result.scoreFactors[2].weight).padStart(2,"0")} × Risk) + (0.{String(result.scoreFactors[3].weight).padStart(2,"0")} × Compliance)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {result.scoreFactors.map(f => (
                    <div key={f.label}>
                      <div className="flex justify-between text-[10px] text-blue-200 mb-1.5">
                        <span>{f.label} <span className="opacity-60">({f.weight}%)</span></span>
                        <span className="font-black text-white">{f.score}</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-white" style={{ width:`${f.score}%` }} />
                      </div>
                      <p className="text-[9px] text-blue-300 mt-1">
                        {((f.score * f.weight) / 100).toFixed(1)} pts
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-100 border-t border-slate-200">
              <p className="px-5 pt-3 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Alternative Options — click to compare scores</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                {result.alternatives.map(alt => (
                  <button key={alt.key}
                    onClick={() => setAlt(activeAlt===alt.key ? null : alt.key)}
                    className={`text-left px-5 py-4 transition-colors hover:bg-white ${activeAlt===alt.key?"bg-white":""}`}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <alt.icon className={`w-4 h-4 ${alt.iconColor}`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${alt.accentText}`}>{alt.label}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">{alt.mode}</p>
                    <p className="text-xs text-slate-500 mb-2">{alt.route}</p>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base font-black text-slate-900">{alt.cost}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {alt.days}d</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-1">{alt.incoterm} · Confidence {alt.confidence}</p>
                    <p className="text-[10px] text-slate-500 italic">{alt.note}</p>
                    {activeAlt===alt.key && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                        {Object.entries(alt.scores).map(([factor, score]) => (
                          <div key={factor}>
                            <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                              <span>{factor}</span><span className="font-semibold text-slate-600">{score}</span>
                            </div>
                            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-slate-500" style={{ width:`${score}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {result.isBlocked && (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl px-6 py-5 flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-black text-red-800 mb-1">Shipment Blocked</p>
              <p className="text-sm text-red-700">Class 7 (Radioactive) cargo cannot proceed without licensed carrier authorization and special regulatory approval. Contact your compliance team before proceeding.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────
function SectionHeader({ label }: { label: string }) {
  return (
    <div className="px-5 py-3 border-b border-slate-100">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function FormField({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        {icon && <span className="text-slate-300">{icon}</span>}
        {label}
      </div>
      {children}
    </div>
  );
}

function MiniCard({ label, value, highlight, warn }: { label:string; value:string; highlight?:boolean; warn?:boolean }) {
  return (
    <div className={`rounded-xl px-3 py-2.5 border ${warn?"bg-amber-50 border-amber-100":highlight?"bg-[#2E5529]/5 border-[#2E5529]/20":"bg-slate-50 border-slate-100"}`}>
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className={`text-sm font-black ${warn?"text-amber-700":highlight?"text-[#2E5529]":"text-slate-900"}`}>{value}</p>
    </div>
  );
}

function HeroMetric({ icon, label, value }: { icon:React.ReactNode; label:string; value:string }) {
  return (
    <div className="bg-white/10 rounded-xl px-3 py-2.5 flex items-start gap-2">
      <span className="text-blue-200 mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] text-blue-200 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
