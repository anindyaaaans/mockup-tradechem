import { useState } from "react";
import { Link } from "react-router";
import {
  TrendingUp, TrendingDown, AlertCircle, Download, Bell,
  ChevronRight, Clock, Activity, Globe, Users, Zap, Shield,
  BookOpen, AlertTriangle
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

const reportImg1 = "https://images.unsplash.com/photo-1635301213490-1b819c7bb668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const reportImg2 = "https://images.unsplash.com/photo-1726731782158-fcf6822b6ca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const reportImg3 = "https://images.unsplash.com/photo-1632069405112-2aaf8045904a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const reportImg4 = "https://images.unsplash.com/photo-1600683605785-d51d43138eee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";

const priceIndexData = [
  { month: "Dec", olefins: 850, caustics: 480, solvents: 620, polymers: 1200 },
  { month: "Jan", olefins: 870, caustics: 490, solvents: 610, polymers: 1220 },
  { month: "Feb", olefins: 860, caustics: 485, solvents: 615, polymers: 1210 },
  { month: "Mar", olefins: 880, caustics: 495, solvents: 630, polymers: 1250 },
  { month: "Apr", olefins: 900, caustics: 500, solvents: 640, polymers: 1280 },
  { month: "May", olefins: 920, caustics: 485, solvents: 635, polymers: 1300 },
];

const biggestMovers = [
  { name: "Ethylene", change: 8.5, direction: "up", price: "$920/ton", category: "Olefins" },
  { name: "Propylene", change: 6.2, direction: "up", price: "$850/ton", category: "Olefins" },
  { name: "Methanol", change: 5.8, direction: "up", price: "$380/ton", category: "Solvents" },
  { name: "Caustic Soda", change: -3.2, direction: "down", price: "$485/ton", category: "Caustics" },
  { name: "MEG", change: -2.1, direction: "down", price: "$540/ton", category: "Solvents" },
];

const supplyRiskData = [
  { chemical: "Methanol", risk: "High", level: 85, reason: "Force majeure in Middle East" },
  { chemical: "Ethylene", risk: "Medium", level: 55, reason: "Elevated demand from PE sector" },
  { chemical: "Propylene", risk: "Medium", level: 48, reason: "Moderate supply tightness" },
  { chemical: "Caustic Soda", risk: "Low", level: 22, reason: "Stable chlor-alkali supply" },
  { chemical: "Soda Ash", risk: "Low", level: 15, reason: "Oversupply from China" },
];

const riskColor = (risk: string) => {
  if (risk === "High") return { bg: "bg-red-100", text: "text-red-700", bar: "bg-red-500", border: "border-red-200" };
  if (risk === "Medium") return { bg: "bg-amber-50", text: "text-amber-700", bar: "bg-amber-400", border: "border-amber-200" };
  return { bg: "bg-green-50", text: "text-green-700", bar: "bg-green-500", border: "border-green-200" };
};

const regionalPrices = [
  { region: "Indonesia", caustic: 485, ethylene: 920, methanol: 380 },
  { region: "China", caustic: 465, ethylene: 900, methanol: 365 },
  { region: "India", caustic: 475, ethylene: 910, methanol: 375 },
  { region: "Middle East", caustic: 450, ethylene: 880, methanol: 350 },
];

const reports = [
  {
    title: "Southeast Asia Caustic Soda Market Outlook — May 2026",
    date: "May 15, 2026",
    category: "Weekly Update",
    categoryColor: "bg-blue-100 text-blue-800",
    summary: "Prices stabilize after Q1 surge. Supply outlook remains tight due to maintenance shutdowns at two major Indonesian producers.",
    tag: "Free",
    readTime: "4 min read",
    image: reportImg1,
  },
  {
    title: "Ethylene Price Forecast Q2–Q3 2026",
    date: "May 10, 2026",
    category: "Market Forecast",
    categoryColor: "bg-purple-100 text-purple-800",
    summary: "Strong demand from the polyethylene sector drives prices up 8.5% month-over-month. Analysts expect upward pressure to continue into Q3.",
    tag: "Free",
    readTime: "6 min read",
    image: reportImg2,
  },
  {
    title: "Indonesia Import Duty Changes — Chemical Commodities",
    date: "May 5, 2026",
    category: "Regulatory Update",
    categoryColor: "bg-indigo-100 text-indigo-800",
    summary: "New duty structure for imported chemicals effective June 1, 2026. Full analysis and procurement impact assessment included.",
    tag: "Free",
    readTime: "5 min read",
    image: reportImg3,
  },
  {
    title: "Supply Risk Alert: Methanol Shortage Warning",
    date: "May 1, 2026",
    category: "Supply Alert",
    categoryColor: "bg-red-100 text-red-800",
    summary: "Force majeure declared at major Middle East production facility. Expect 4–6 week supply disruption affecting ASEAN import volumes.",
    tag: "Alert",
    readTime: "3 min read",
    image: reportImg4,
  },
];

const categoryFilters = ["All", "Weekly Updates", "Forecasts", "Regulatory", "Alerts"];

export function MarketIntelligencePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [alertChemical, setAlertChemical] = useState("Caustic Soda");
  const [alertType, setAlertType] = useState("Price drops below");
  const [alertThreshold, setAlertThreshold] = useState("480");
  const [alertSet, setAlertSet] = useState(false);

  const filteredReports = reports.filter(r => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Weekly Updates") return r.category === "Weekly Update";
    if (activeFilter === "Forecasts") return r.category === "Market Forecast";
    if (activeFilter === "Regulatory") return r.category === "Regulatory Update";
    if (activeFilter === "Alerts") return r.category === "Supply Alert";
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-[#2E5529] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live Data
                </span>
                <span className="text-xs text-[#9ca3af]">Updated 12 minutes ago</span>
              </div>
              <h1 className="font-extrabold leading-tight mb-3 text-[36px]"><span className="text-[#0f172a]">Chemical Market Intelligence</span><br /><span className="text-[#3E7B27]">Real-Time Pricing & Supply Insights</span></h1>
              <p className="text-[#5D5D5D] text-lg">
                Track prices, monitor supply risks, and stay ahead of market movements across 47 key industrial chemicals in ASEAN and beyond.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2 shadow-sm text-sm">
                <Clock className="w-4 h-4" />
                Last 30 Days
              </button>
              <button className="bg-[#2E5529] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#3E7B27] shadow-[0px_8px_15px_-3px_rgba(46,85,41,0.25)] flex items-center gap-2 text-sm">
                <Bell className="w-4 h-4" />
                Create Watchlist
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
              {[
                { icon: Activity, label: "Chemicals Tracked", value: "47", sub: "across ASEAN" },
                { icon: Globe, label: "Markets Covered", value: "12", sub: "regional markets" },
                { icon: Users, label: "Procurement Teams", value: "5,200+", sub: "active users" },
                { icon: Zap, label: "Data Refresh", value: "15 min", sub: "update interval" },
              ].map(({ icon: Icon, label, value, sub }, i) => (
                <div key={i} className="flex items-center gap-3 py-4 px-6">
                  <div className="w-9 h-9 rounded-lg bg-[rgba(46,85,41,0.08)] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#2E5529]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af]">{label}</p>
                    <p className="font-bold text-[#0f172a]">{value} <span className="text-xs font-normal text-[#9ca3af]">{sub}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Price Index Dashboard */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#0f172a]">Price Index Dashboard</h2>
              <p className="text-sm text-[#5D5D5D]">6-month trend across major chemical categories (USD/ton)</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 font-medium">ASEAN</button>
              <button className="px-4 py-1.5 text-sm bg-[#2E5529] text-white rounded-lg font-medium">Global</button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={priceIndexData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid key="lc-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="lc-xaxis" dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis key="lc-yaxis" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <Tooltip
                key="lc-tooltip"
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }}
                formatter={(value: number, name: string) => [`$${value}/ton`, name]}
              />
              <Legend key="lc-legend" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
              <Line key="lc-olefins" type="monotone" dataKey="olefins" stroke="#2E5529" strokeWidth={2.5} name="Olefins" dot={false} activeDot={{ r: 5 }} />
              <Line key="lc-caustics" type="monotone" dataKey="caustics" stroke="#3E7B27" strokeWidth={2.5} name="Caustics" dot={false} activeDot={{ r: 5 }} />
              <Line key="lc-solvents" type="monotone" dataKey="solvents" stroke="#5D5D5D" strokeWidth={2.5} name="Solvents" dot={false} activeDot={{ r: 5 }} />
              <Line key="lc-polymers" type="monotone" dataKey="polymers" stroke="#e5a000" strokeWidth={2.5} name="Polymers" dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { name: "Olefins", value: "$920", change: 8.5, color: "#2E5529" },
              { name: "Caustics", value: "$485", change: -3.2, color: "#3E7B27" },
              { name: "Solvents", value: "$635", change: 2.3, color: "#5D5D5D" },
              { name: "Polymers", value: "$1,300", change: 4.1, color: "#e5a000" },
            ].map((cat, idx) => (
              <div key={idx} className="rounded-lg border border-gray-100 p-4" style={{ borderLeftColor: cat.color, borderLeftWidth: 3 }}>
                <p className="text-xs text-[#9ca3af] mb-1 uppercase tracking-wider">{cat.name}</p>
                <p className="text-2xl font-bold text-[#0f172a] mb-1">{cat.value}</p>
                <div className={`flex items-center gap-1 text-sm font-semibold ${cat.change > 0 ? "text-green-600" : "text-red-500"}`}>
                  {cat.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{cat.change > 0 ? "+" : ""}{cat.change}% MoM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supply Risk Indicators */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#0f172a]">Supply Risk Monitor</h2>
              <p className="text-sm text-[#5D5D5D]">Real-time supply disruption risk across key chemicals</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" />
              1 High Risk Active
            </span>
          </div>
          <div className="space-y-3">
            {supplyRiskData.map((item, idx) => {
              const colors = riskColor(item.risk);
              return (
                <div key={idx} className={`flex items-center gap-4 p-4 rounded-lg border ${colors.bg} ${colors.border}`}>
                  <div className="w-28 shrink-0">
                    <p className="font-semibold text-[#0f172a] text-sm">{item.chemical}</p>
                    <span className={`text-xs font-bold ${colors.text}`}>{item.risk} Risk</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-white rounded-full h-2 border border-gray-200">
                      <div
                        className={`h-2 rounded-full ${colors.bar}`}
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-8 text-right shrink-0">
                    <span className={`text-sm font-bold ${colors.text}`}>{item.level}</span>
                  </div>
                  <p className="text-xs text-[#5D5D5D] hidden lg:block w-56 shrink-0">{item.reason}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supplier Bridge Banner */}
        <div className="bg-gradient-to-r from-[#2E5529] to-[#3E7B27] rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div>
            <p className="text-white/70 text-xs mb-1 uppercase tracking-wider font-semibold">Based on current market data</p>
            <p className="text-white text-xl font-bold mb-1">
              See which suppliers offer Caustic Soda at <span className="underline decoration-dotted">$485/ton</span>
            </p>
            <p className="text-white/80 text-sm">Compare verified suppliers with live pricing, MOQ, lead times, and certifications.</p>
          </div>
          <Link
            to="/search"
            className="bg-white text-[#2E5529] px-7 py-3 rounded-xl font-bold hover:bg-gray-50 whitespace-nowrap flex items-center gap-2 shadow-lg shrink-0"
          >
            Compare Now
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Biggest Movers */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-[#0f172a]">Biggest Movers</h2>
                <p className="text-sm text-[#5D5D5D]">Last 30 days price change</p>
              </div>
              <Link to="/search" className="text-sm text-[#2E5529] hover:text-[#3E7B27] font-semibold flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-2">
              {biggestMovers.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#9ca3af] w-4 shrink-0">#{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-[#0f172a] text-sm">{item.name}</p>
                      <span className="text-xs text-[#9ca3af] bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${item.direction === "up" ? "bg-green-500" : "bg-red-400"}`}
                        style={{ width: `${Math.min(Math.abs(item.change) * 10, 100)}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-[#5D5D5D] w-20 text-right shrink-0">{item.price}</p>
                  <div className={`flex items-center gap-1 font-bold text-sm w-16 justify-end shrink-0 ${item.direction === "up" ? "text-green-600" : "text-red-500"}`}>
                    {item.direction === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{item.change > 0 ? "+" : ""}{item.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Alert System */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-5 h-5 text-[#2E5529]" />
              <h2 className="text-xl font-bold text-[#0f172a]">Price Alerts</h2>
            </div>
            <p className="text-sm text-[#5D5D5D] mb-5">Get notified when prices hit your target.</p>

            {alertSet ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="w-12 h-12 rounded-full bg-[#2E5529] flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-[#2E5529] mb-1">Alert Set!</p>
                <p className="text-sm text-[#5D5D5D] mb-4">
                  You'll be notified when <strong>{alertChemical}</strong> reaches <strong>${alertThreshold}/ton</strong>.
                </p>
                <button
                  onClick={() => setAlertSet(false)}
                  className="text-sm text-[#2E5529] underline"
                >
                  Set another alert
                </button>
              </div>
            ) : (
              <div className="space-y-3 flex-1">
                <div>
                  <label className="block text-xs font-semibold text-[#5D5D5D] mb-1.5 uppercase tracking-wider">Chemical</label>
                  <select
                    value={alertChemical}
                    onChange={e => setAlertChemical(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2E5529] focus:outline-none"
                  >
                    <option>Caustic Soda</option>
                    <option>Ethylene</option>
                    <option>Methanol</option>
                    <option>Propylene</option>
                    <option>Soda Ash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5D5D5D] mb-1.5 uppercase tracking-wider">Alert Type</label>
                  <select
                    value={alertType}
                    onChange={e => setAlertType(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2E5529] focus:outline-none"
                  >
                    <option>Price drops below</option>
                    <option>Price rises above</option>
                    <option>Price changes by %</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5D5D5D] mb-1.5 uppercase tracking-wider">
                    Threshold (USD/ton)
                  </label>
                  <input
                    type="number"
                    value={alertThreshold}
                    onChange={e => setAlertThreshold(e.target.value)}
                    placeholder="480"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2E5529] focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setAlertSet(true)}
                  className="w-full bg-[#2E5529] text-white px-4 py-2.5 rounded-lg hover:bg-[#3E7B27] font-semibold text-sm transition-colors mt-1"
                >
                  Set Price Alert
                </button>
                <p className="text-xs text-[#9ca3af] text-center">Free: up to 5 alerts · Premium: unlimited + real-time SMS</p>
              </div>
            )}
          </div>
        </div>

        {/* Regional Price Comparison */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#0f172a]">Regional Price Comparison</h2>
              <p className="text-sm text-[#5D5D5D]">Key chemical prices by region — USD/ton · Updated May 17, 2026</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg text-xs font-semibold">
              <Globe className="w-4 h-4" />
              ASEAN-focused data
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={regionalPrices} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={4}>
              <CartesianGrid key="bc-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="bc-xaxis" dataKey="region" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis key="bc-yaxis" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <Tooltip
                key="bc-tooltip"
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }}
                formatter={(value: number, name: string) => [`$${value}/ton`, name]}
              />
              <Legend key="bc-legend" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 13, paddingTop: 10 }} />
              <Bar key="bc-caustic" dataKey="caustic" fill="#2E5529" name="Caustic Soda" radius={[3, 3, 0, 0]} />
              <Bar key="bc-ethylene" dataKey="ethylene" fill="#3E7B27" name="Ethylene" radius={[3, 3, 0, 0]} />
              <Bar key="bc-methanol" dataKey="methanol" fill="#9ca3af" name="Methanol" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Lowest Caustic Price", value: "Middle East · $450/ton", icon: TrendingDown, color: "text-green-600" },
              { label: "Highest Ethylene Demand", value: "Indonesia · $920/ton", icon: TrendingUp, color: "text-amber-600" },
              { label: "Best Methanol Value", value: "Middle East · $350/ton", icon: TrendingDown, color: "text-green-600" },
            ].map((insight, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                <insight.icon className={`w-5 h-5 shrink-0 ${insight.color}`} />
                <div>
                  <p className="text-xs text-[#9ca3af]">{insight.label}</p>
                  <p className="text-sm font-semibold text-[#0f172a]">{insight.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Reports */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#0f172a]">Market Reports & Insights</h2>
              <p className="text-sm text-[#5D5D5D]">Curated intelligence for procurement professionals</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                    activeFilter === f
                      ? "bg-[#2E5529] text-white"
                      : "border border-gray-200 text-[#5D5D5D] hover:bg-gray-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredReports.map((report, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#2E5529] hover:shadow-md transition-all group"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-52 shrink-0">
                    <img
                      src={report.image}
                      alt={report.title}
                      className="w-full h-44 sm:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${report.categoryColor}`}>
                        {report.category}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        report.tag === "Free" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {report.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#0f172a] mb-2 group-hover:text-[#2E5529] transition-colors leading-snug">
                      {report.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[#9ca3af] mb-3">
                      <span>{report.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{report.readTime}</span>
                    </div>
                    <p className="text-sm text-[#5D5D5D] mb-4 flex-1">{report.summary}</p>

                    {report.tag === "Alert" && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-red-900">
                          <strong>Supply Risk:</strong> This alert may impact your procurement. Review immediately and check alternative suppliers.
                        </p>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        to="/sourcing-hub"
                        className="inline-flex items-center text-[#2E5529] hover:text-[#3E7B27] text-sm font-semibold gap-1"
                      >
                        Find Suppliers <ChevronRight className="w-4 h-4" />
                      </Link>
                      <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-[#5D5D5D]">
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="text-center py-12 text-[#9ca3af]">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>No reports found for this category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Free vs Premium */}
        <div className="bg-[#0f172a] rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-8">
              <p className="text-xs uppercase tracking-widest font-bold text-[#9ca3af] mb-2">Current Plan</p>
              <h3 className="text-2xl font-extrabold text-white mb-1">Free Access</h3>
              <p className="text-[#9ca3af] text-sm mb-6">All the essentials to start monitoring your market.</p>
              <ul className="space-y-3">
                {[
                  "30-day historical price data",
                  "Weekly market reports",
                  "Up to 5 price alerts",
                  "Supply risk notifications",
                  "Regional price comparison",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="w-5 h-5 rounded-full bg-[#2E5529] flex items-center justify-center text-xs text-white shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-gradient-to-br from-[#2E5529]/30 to-[#3E7B27]/10">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs uppercase tracking-widest font-bold text-[#3E7B27]">Upgrade</p>
                <span className="bg-[#3E7B27] text-white text-xs px-2 py-0.5 rounded-full font-bold">POPULAR</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-1">Premium Access</h3>
              <p className="text-[#9ca3af] text-sm mb-6">For serious procurement teams who need real-time intelligence.</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Real-time price data & forecasts",
                  "Unlimited price alerts + SMS",
                  "Custom market reports on demand",
                  "API access for ERP integration",
                  "Dedicated procurement analyst",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white">
                    <span className="w-5 h-5 rounded-full bg-[#3E7B27] flex items-center justify-center text-xs text-white shrink-0">★</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-[#2E5529] py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Upgrade to Premium →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
