import { useState } from "react";
import { Link } from "react-router";
import { Award, MapPin, Download, Share2, Bell, Bookmark, TrendingUp, Star, Shield, CheckCircle, X, Clock, FileText, Calculator, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
// Caustic Soda product images from Unsplash
const productImg1 = "https://images.unsplash.com/photo-1693996045463-6ea86d10a2e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"; // Caustic Soda - white powder scoop
const productImg2 = "https://images.unsplash.com/photo-1737098140591-f0988ae7e15a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Caustic Soda Detail - white powder pile
const productImg3 = "https://images.unsplash.com/photo-1777304610456-e9d6206b19a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Caustic Soda Packaging - chemical drums

const priceData = [
  { day: "Mon", price: 482 },
  { day: "Tue", price: 485 },
  { day: "Wed", price: 483 },
  { day: "Thu", price: 487 },
  { day: "Fri", price: 490 },
  { day: "Sat", price: 488 },
  { day: "Sun", price: 485 },
];

const specifications = [
  { property: "Appearance", value: "White flakes/pearls", standard: "Visual" },
  { property: "Purity (NaOH)", value: "≥99.0%", standard: "ASTM E291" },
  { property: "Na₂CO₃", value: "≤0.5%", standard: "ASTM E291" },
  { property: "NaCl", value: "≤0.03%", standard: "ASTM D512" },
  { property: "Fe₂O₃", value: "≤0.005%", standard: "ASTM E394" },
  { property: "Moisture", value: "≤0.5%", standard: "Karl Fischer" },
  { property: "pH (10% solution)", value: "14.0", standard: "ASTM E70" },
];

const suppliers = [
  {
    id: 1,
    name: "PT Kimia Jaya",
    rating: 4.8,
    reviews: 142,
    location: "Jakarta, Indonesia",
    moq: "5 tons",
    leadTime: "7-14 days",
    paymentTerms: "T/T, L/C",
    pricePerTon: 482,
    priceRange: "$480-485",
    verified: true,
    trustScore: 92,
    responseRate: 98,
    onTimeDelivery: 96,
    yearsActive: 8,
    certifications: ["Halal", "ISO 9001", "REACH"],
    packaging: ["25kg Bag", "50kg Drum", "IBC"],
  },
  {
    id: 2,
    name: "Global Chemicals Co.",
    rating: 4.7,
    reviews: 98,
    location: "Singapore",
    moq: "10 tons",
    leadTime: "10-15 days",
    paymentTerms: "T/T",
    pricePerTon: 487,
    priceRange: "$485-490",
    verified: true,
    trustScore: 89,
    responseRate: 95,
    onTimeDelivery: 94,
    yearsActive: 12,
    certifications: ["ISO 9001", "REACH", "GMP"],
    packaging: ["50kg Drum", "IBC", "Bulk"],
  },
  {
    id: 3,
    name: "Indo Chem Solutions",
    rating: 4.6,
    reviews: 76,
    location: "Surabaya, Indonesia",
    moq: "3 tons",
    leadTime: "5-10 days",
    paymentTerms: "T/T, L/C, D/P",
    pricePerTon: 479,
    priceRange: "$478-483",
    verified: true,
    trustScore: 86,
    responseRate: 92,
    onTimeDelivery: 91,
    yearsActive: 6,
    certifications: ["Halal", "ISO 9001", "Kosher"],
    packaging: ["25kg Bag", "50kg Drum", "Flexi Bag"],
  },
];

export function ProductDetailPage() {
  const [quantity, setQuantity] = useState(10);
  const [origin, setOrigin] = useState("singapore");
  const [destination, setDestination] = useState("jakarta");
  const [incoterm, setIncoterm] = useState("CIF");
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const basePrice = 485;
  const freight = origin === "singapore" ? 45 : origin === "china" ? 65 : 30;
  const duty = basePrice * 0.05;
  const vat = (basePrice + freight + duty) * 0.11;
  const totalLandedCost = basePrice + freight + duty + vat;

  const toggleSupplierSelection = (id: number) => {
    if (selectedSuppliers.includes(id)) {
      setSelectedSuppliers(selectedSuppliers.filter(i => i !== id));
    } else if (selectedSuppliers.length < 3) {
      setSelectedSuppliers([...selectedSuppliers, id]);
    }
  };

  const selectedSupplierData = suppliers.filter(s => selectedSuppliers.includes(s.id));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Product Hero - Compact but Information-Rich */}
      <div className="bg-white border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-[#5D5D5D] mb-4">
                <Link to="/" className="hover:text-[#2E5529]">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link to="/search" className="hover:text-[#2E5529]">Chemicals</Link>
                <ChevronRight className="w-3 h-3" />
                <Link to="/search" className="hover:text-[#2E5529]">Inorganic Chemicals</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="font-semibold text-[#2E5529]">Caustic Soda</span>
              </div>

              <div className="flex items-start gap-6">
                {/* Product Images */}
                <div className="flex flex-col gap-3">
                  <img
                    src={productImg1}
                    alt="Caustic Soda Product"
                    className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <div className="flex gap-2">
                    <img
                      src={productImg2}
                      alt="Caustic Soda Detail"
                      className="w-[5.75rem] h-[5.75rem] object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-[#2E5529]"
                    />
                    <img
                      src={productImg3}
                      alt="Caustic Soda Packaging"
                      className="w-[5.75rem] h-[5.75rem] object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-[#2E5529]"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[rgba(46,85,41,0.1)] text-[#2E5529] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                      Industrial Grade
                    </span>
                    <span className="text-sm text-[#5D5D5D]">CAS 1310-73-2</span>
                    <div className="bg-[#f0fdf4] flex items-center gap-2 px-3 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3 text-[#16a34a]" />
                      <span className="text-xs font-bold text-[#16a34a]">VERIFIED</span>
                    </div>
                  </div>

                  <h1 className="text-4xl font-extrabold mb-1">Caustic Soda</h1>
                  <h2 className="text-3xl font-extrabold text-[#2E5529] mb-4">(Sodium Hydroxide)</h2>

                  <p className="text-[#5D5D5D] mb-4 max-w-2xl leading-relaxed">
                    Premium grade sodium hydroxide flakes, pearls, and solid forms. Primarily used in soap making, paper manufacturing, water treatment, and textile processing.
                  </p>

                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-extrabold text-[#2E5529]">USD 400–550</span>
                    <span className="text-xl text-[#5D5D5D]">/ MT</span>
                    <div className="bg-[#f0fdf4] flex items-center gap-1 px-2 py-1 rounded">
                      <TrendingUp className="w-4 h-4 text-[#16a34a]" />
                      <span className="text-sm font-semibold text-[#16a34a]">+2.4%</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#5D5D5D] mb-4">Updated 1 day ago</p>
                </div>

                {/* Mini Price Trend */}
                <div className="w-64 bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-xs text-[#5D5D5D] mb-2">7-Day Price Trend</p>
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={priceData}>
                      <Line key="line-price-trend" type="monotone" dataKey="price" stroke="#2E5529" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2 ml-6">
              <Link
                to="/sourcing-hub"
                className="bg-[#2E5529] text-white px-6 py-3 rounded-lg hover:bg-[#3E7B27] text-center font-semibold whitespace-nowrap"
              >
                Request Quote
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById("suppliers-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-2 border-2 border-[#3E7B27] text-[#2E5529] px-4 py-2 rounded-lg hover:bg-green-50 font-semibold whitespace-nowrap"
              >
                <Share2 className="w-4 h-4" />
                Compare Suppliers
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                <Bookmark className="w-4 h-4" />
                Save
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                <Bell className="w-4 h-4" />
                Alert
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* COMPARE SUPPLIERS CTA - PROMINENT */}
            {selectedSuppliers.length >= 2 && !showComparison && (
              <div className="bg-[#2E5529] text-white rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold mb-1">
                      {selectedSuppliers.length} suppliers selected for comparison
                    </p>
                    <p className="text-sm text-white/80">
                      Compare specifications, pricing, and performance metrics side-by-side
                    </p>
                  </div>
                  <button
                    onClick={() => setShowComparison(true)}
                    className="bg-white text-[#2E5529] px-6 py-3 rounded-lg hover:bg-gray-100 font-semibold"
                  >
                    Compare Now
                  </button>
                </div>
              </div>
            )}

            {/* Side-by-Side Comparison Modal */}
            {showComparison && selectedSuppliers.length >= 2 && (
              <div className="bg-white border-2 border-[#2E5529] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Supplier Comparison</h3>
                  <button
                    onClick={() => setShowComparison(false)}
                    className="text-[#5D5D5D] hover:text-[#303030]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2 text-sm">Criteria</th>
                        {selectedSupplierData.map((supplier) => (
                          <th key={supplier.id} className="text-center py-3 px-2 bg-green-50">
                            <div className="font-semibold text-sm">{supplier.name}</div>
                            <div className="flex items-center justify-center gap-1 text-xs text-[#5D5D5D]">
                              <Award className="w-3 h-3 text-[#2E5529]" />
                              Verified
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-semibold text-sm">Trust Score</td>
                        {selectedSupplierData.map((supplier) => (
                          <td key={supplier.id} className="py-3 px-2 text-center">
                            <span className="inline-block bg-[#2E5529] text-white px-3 py-1 rounded font-bold">
                              {supplier.trustScore}/100
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-semibold text-sm">Rating</td>
                        {selectedSupplierData.map((supplier) => (
                          <td key={supplier.id} className="py-3 px-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{supplier.rating}</span>
                              <span className="text-xs text-[#5D5D5D]">({supplier.reviews})</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-semibold text-sm">Price Range</td>
                        {selectedSupplierData.map((supplier) => (
                          <td key={supplier.id} className="py-3 px-2 text-center text-[#2E5529] font-bold">
                            {supplier.priceRange}/ton
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-semibold text-sm">MOQ</td>
                        {selectedSupplierData.map((supplier) => (
                          <td key={supplier.id} className="py-3 px-2 text-center">{supplier.moq}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-semibold text-sm">Lead Time</td>
                        {selectedSupplierData.map((supplier) => (
                          <td key={supplier.id} className="py-3 px-2 text-center">{supplier.leadTime}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-semibold text-sm">Response Rate</td>
                        {selectedSupplierData.map((supplier) => (
                          <td key={supplier.id} className="py-3 px-2 text-center text-green-600 font-semibold">
                            {supplier.responseRate}%
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-semibold text-sm">On-Time Delivery</td>
                        {selectedSupplierData.map((supplier) => (
                          <td key={supplier.id} className="py-3 px-2 text-center text-green-600 font-semibold">
                            {supplier.onTimeDelivery}%
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3 px-2 font-semibold text-sm">Action</td>
                        {selectedSupplierData.map((supplier) => (
                          <td key={supplier.id} className="py-3 px-2">
                            <Link
                              to="/sourcing-hub"
                              className="block bg-[#2E5529] text-white text-center px-4 py-2 rounded hover:bg-[#3E7B27] text-sm font-semibold"
                            >
                              RFQ
                            </Link>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="flex-1 border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Comparison
                  </button>
                  <Link
                    to="/sourcing-hub"
                    className="flex-1 bg-[#2E5529] text-white px-4 py-2 rounded-lg hover:bg-[#3E7B27] text-center font-semibold"
                  >
                    Send RFQ to Selected
                  </Link>
                </div>
              </div>
            )}

            {/* Technical Specifications Table */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Technical Specifications</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Technical Grade
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4">Property</th>
                      <th className="text-left py-3 px-4">Specification</th>
                      <th className="text-left py-3 px-4">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specifications.map((spec, idx) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#5D5D5D]">{spec.property}</td>
                        <td className="py-3 px-4 font-semibold">{spec.value}</td>
                        <td className="py-3 px-4 text-sm text-[#5D5D5D]">{spec.standard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#2E5529]" />
                    Available Documents
                  </h3>
                  <div className="space-y-2">
                    {["SDS", "TDS", "COA", "MSDS"].map((doc, idx) => (
                      <button key={idx} className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded hover:border-[#2E5529]">
                        <span className="text-sm">{doc}</span>
                        <Download className="w-4 h-4 text-[#2E5529]" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#2E5529]" />
                    Certifications
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["REACH", "Halal", "ISO 9001", "Kosher", "GMP", "HACCP"].map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* LANDED COST CALCULATOR - EXCLUSIVE FEATURE */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="text-center mb-8">
                <span className="bg-[rgba(46,85,41,0.1)] text-[#2E5529] px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase">
                  Market Intelligence Tool
                </span>
                <h2 className="text-4xl font-extrabold mt-4 mb-2">Landed Cost Calculator</h2>
                <p className="text-[#5D5D5D] max-w-2xl mx-auto">
                  Get full transparency on your procurement costs including freight, duties, and taxes before you commit to an order.
                </p>
              </div>

              <h3 className="text-xl font-bold mb-6">Configure Shipment Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Quantity (tons)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Origin</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="jakarta">Jakarta</option>
                    <option value="singapore">Singapore</option>
                    <option value="china">China</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Destination</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="jakarta">Jakarta</option>
                    <option value="surabaya">Surabaya</option>
                    <option value="medan">Medan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Incoterm</label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="FOB">FOB</option>
                    <option value="CIF">CIF</option>
                    <option value="DDP">DDP</option>
                  </select>
                </div>
              </div>

              {/* DARK COST SUMMARY BOX - From Figma Design */}
              <div className="bg-[#0f172a] rounded-2xl p-8 text-white">
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Estimated Total Landed Cost</p>
                <div className="text-6xl font-extrabold mb-8">
                  USD {(totalLandedCost * quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Product Cost ({quantity} MT)</span>
                    <span className="font-semibold">${(basePrice * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Ocean Freight</span>
                    <span className="font-semibold">${(freight * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Insurance (0.5%)</span>
                    <span className="font-semibold">${((basePrice * quantity) * 0.005).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">VAT (11.0%)</span>
                    <span className="font-semibold">${(vat * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Handling Fees</span>
                    <span className="font-semibold">$300.00</span>
                  </div>
                </div>

                <Link
                  to="/sourcing-hub"
                  className="block w-full bg-[#3E7B27] text-white text-center px-6 py-4 rounded-xl hover:bg-[#2E5529] font-bold shadow-lg mb-3"
                >
                  Request Official Quote →
                </Link>

                <button className="w-full flex items-center justify-center gap-2 text-white/80 hover:text-white py-2">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download Detailed Estimate</span>
                </button>
              </div>

              {/* Trust & Accuracy */}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900 mb-1">TradeChem Price Protection</p>
                  <p className="text-sm text-green-800">
                    Our calculations are based on real-time market data and verified freight rates. If the final quoted price differs by more than 5%, we'll cover the difference.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Suppliers */}
          <div className="space-y-6" id="suppliers-section">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#2E5529]" />
                  Verified Suppliers
                </h2>
                {selectedSuppliers.length > 0 ? (
                  <span className="bg-[#2E5529] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedSuppliers.length} selected
                  </span>
                ) : (
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    Select to compare
                  </span>
                )}
              </div>

              {/* Proactive Compare CTA */}
              {selectedSuppliers.length === 0 && (
                <div className="mb-4 p-3 bg-[rgba(46,85,41,0.06)] border border-[rgba(46,85,41,0.2)] rounded-lg flex items-start gap-2">
                  <Share2 className="w-4 h-4 text-[#2E5529] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#2E5529]">
                    <span className="font-bold">Compare with 2 other suppliers</span> — check the boxes below to compare specs, pricing, and performance side-by-side before submitting your RFQ.
                  </p>
                </div>
              )}

              <div className="mb-4">
                <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm">
                  <option>Sort by: Trust Score</option>
                  <option>Sort by: Price</option>
                  <option>Sort by: Lead Time</option>
                  <option>Sort by: Rating</option>
                </select>
              </div>

              {selectedSuppliers.length >= 2 && (
                <div className="mb-4 p-3 bg-green-50 border-2 border-green-500 rounded-lg">
                  <p className="text-sm text-green-900 font-semibold">
                    ✓ {selectedSuppliers.length} suppliers selected. Click "Compare Now" above to see side-by-side comparison.
                  </p>
                </div>
              )}

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {suppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className={`border-2 rounded-lg p-4 transition-all ${
                      selectedSuppliers.includes(supplier.id)
                        ? "border-[#2E5529] bg-green-50"
                        : "border-gray-200 hover:border-[#2E5529] hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <input
                        type="checkbox"
                        checked={selectedSuppliers.includes(supplier.id)}
                        onChange={() => toggleSupplierSelection(supplier.id)}
                        className="w-5 h-5 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{supplier.name}</h3>
                          <Award className="w-4 h-4 text-[#2E5529]" />
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{supplier.rating}</span>
                          <span className="text-xs text-[#5D5D5D]">({supplier.reviews})</span>
                        </div>
                        <div className="text-xs text-[#5D5D5D] flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" />
                          {supplier.location}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded p-2 mb-3 border border-gray-200">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="bg-[#2E5529] text-white px-2 py-1 rounded font-bold text-sm">
                          {supplier.trustScore}
                        </div>
                        <span className="text-xs text-[#5D5D5D]">Trust Score</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <p className="text-[#5D5D5D]">Response</p>
                        <p className="font-bold text-green-600">{supplier.responseRate}%</p>
                      </div>
                      <div>
                        <p className="text-[#5D5D5D]">On-Time</p>
                        <p className="font-bold text-green-600">{supplier.onTimeDelivery}%</p>
                      </div>
                      <div>
                        <p className="text-[#5D5D5D]">MOQ</p>
                        <p className="font-bold">{supplier.moq}</p>
                      </div>
                      <div>
                        <p className="text-[#5D5D5D]">Lead Time</p>
                        <p className="font-bold">{supplier.leadTime}</p>
                      </div>
                    </div>

                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <p className="text-xs text-[#5D5D5D] mb-1">Price Range</p>
                      <p className="font-bold text-[#2E5529]">{supplier.priceRange}/ton</p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to="/sourcing-hub"
                        className="flex-1 bg-[#2E5529] text-white px-3 py-2 rounded text-sm text-center font-semibold hover:bg-[#3E7B27]"
                      >
                        Quick RFQ
                      </Link>
                      <button className="px-3 py-2 text-sm border-2 border-gray-300 rounded hover:bg-gray-50 font-semibold">
                        Profile
                      </button>
                    </div>
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
