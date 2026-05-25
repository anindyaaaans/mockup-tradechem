import { Link } from "react-router";
import { TrendingUp, TrendingDown, MapPin, Award, FileText, Download, ChevronRight, Shield, CheckCircle, Clock, Star, BarChart3, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
// Supplier company images from Unsplash
const productImg1 = "https://images.unsplash.com/photo-1516937941344-00b4e0337589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // PT Kimia Jaya - industrial factory
const productImg2 = "https://images.unsplash.com/photo-1509390288171-ce2088f7d08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Global Chemicals Co. - industrial facility
const productImg3 = "https://images.unsplash.com/photo-1665040221204-828ab5642a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Indo Chem Solutions - Surabaya industrial

const priceData = [
  { date: "Nov", price: 450, forecast: null },
  { date: "Dec", price: 465, forecast: null },
  { date: "Jan", price: 455, forecast: null },
  { date: "Feb", price: 480, forecast: null },
  { date: "Mar", price: 490, forecast: null },
  { date: "Apr", price: 485, forecast: null },
  { date: "May", price: 485, forecast: 490 },
  { date: "Jun", price: null, forecast: 495 },
  { date: "Jul", price: null, forecast: 500 },
];

const topSuppliers = [
  {
    name: "PT Kimia Jaya",
    rating: 4.8,
    reviews: 142,
    location: "Jakarta, Indonesia",
    moq: "5 tons",
    leadTime: "7-14 days",
    priceRange: "$480-485",
    verified: true,
    trustScore: 92,
    responseRate: 98,
    onTimeDelivery: 96,
    yearsActive: 8,
    image: productImg1
  },
  {
    name: "Global Chemicals Co.",
    rating: 4.7,
    reviews: 98,
    location: "Singapore",
    moq: "10 tons",
    leadTime: "10-15 days",
    priceRange: "$485-490",
    verified: true,
    trustScore: 89,
    responseRate: 95,
    onTimeDelivery: 94,
    yearsActive: 12,
    image: productImg2
  },
  {
    name: "Indo Chem Solutions",
    rating: 4.6,
    reviews: 76,
    location: "Surabaya, Indonesia",
    moq: "3 tons",
    leadTime: "5-10 days",
    priceRange: "$478-483",
    verified: true,
    trustScore: 86,
    responseRate: 92,
    onTimeDelivery: 91,
    yearsActive: 6,
    image: productImg3
  },
];

export function SEOLandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section - Data-First Above the Fold */}
      <div className="bg-white border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb + Trust Signal */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-[#5D5D5D]">
              <Link to="/" className="hover:text-[#2E5529]">Home</Link>
              <span>/</span>
              <span>Caustic Soda</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-[#2E5529]" />
                <span className="text-[#5D5D5D]">24 Verified Suppliers</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-[#2E5529]" />
                <span className="text-[#5D5D5D]">All Docs Available</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Live Price Chart - PROMINENT */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[rgba(46,85,41,0.1)] text-[#2E5529] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                    Industrial Grade
                  </span>
                  <span className="text-sm text-[#5D5D5D]">CAS 1310-73-2</span>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight mb-0 leading-tight">
                  Caustic Soda
                </h1>
                <h1 className="text-5xl font-extrabold tracking-tight text-[#2E5529] leading-tight">
                  Indonesia
                </h1>
                <p className="text-[#5D5D5D] mt-4 text-lg leading-relaxed max-w-xl">
                  High-purity sodium hydroxide flakes and pearls sourced directly from verified Indonesian manufacturers for global export.
                </p>
              </div>

              {/* Price Data Card - MAXIMUM PROMINENCE */}
              <div className="bg-gradient-to-br from-[#2E5529] to-[#3E7B27] text-white rounded-xl p-6 mb-6 relative overflow-hidden">
                {/* Decorative blur */}
                <div className="absolute bg-[rgba(62,123,39,0.3)] blur-[48px] left-[-60px] rounded-full size-[200px] top-[-60px]" />

                <div className="relative flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h2 className="text-5xl font-extrabold">USD 380–420</h2>
                      <span className="text-xl text-white/80">/ MT</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#f0fdf4] flex items-center gap-2 px-3 py-1.5 rounded-md">
                        <TrendingUp className="w-4 h-4 text-[#16a34a]" />
                        <span className="text-sm font-semibold text-[#16a34a]">+2.4% (30d) · Updated today</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="text-white/90 hover:text-white text-sm flex items-center gap-1 bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                      Set Price Alert
                    </button>
                  </div>
                </div>

                {/* Interactive Chart with Forecast */}
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop key="stop-1" offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                        <stop key="stop-2" offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid key="grid-seo" strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                    <XAxis key="xaxis-seo" dataKey="date" stroke="rgba(255,255,255,0.8)" />
                    <YAxis key="yaxis-seo" stroke="rgba(255,255,255,0.8)" domain={[440, 510]} />
                    <Tooltip
                      key="tooltip-seo"
                      contentStyle={{ backgroundColor: '#303030', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Area
                      key="price-area"
                      type="monotone"
                      dataKey="price"
                      stroke="#ffffff"
                      strokeWidth={3}
                      fill="url(#priceGradient)"
                      name="Actual Price"
                    />
                    <Area
                      key="forecast-area"
                      type="monotone"
                      dataKey="forecast"
                      stroke="#FFD700"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="none"
                      name="Forecast"
                    />
                  </AreaChart>
                </ResponsiveContainer>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-white/20 text-white rounded hover:bg-white/30">6M</button>
                    <button className="px-3 py-1.5 text-sm bg-white text-[#2E5529] rounded font-semibold">1Y</button>
                    <button className="px-3 py-1.5 text-sm bg-white/20 text-white rounded hover:bg-white/30">All</button>
                  </div>
                  <Link to="/market-intelligence" className="text-sm text-white/90 hover:text-white flex items-center gap-1">
                    View Full Market Report <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Key Market Insights - Quick Scan */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-[#5D5D5D]">30-Day Trend</span>
                  </div>
                  <p className="text-2xl text-green-600">+3.2%</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-[#5D5D5D]">Supply Status</span>
                  </div>
                  <p className="text-2xl text-blue-600">Stable</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-[#5D5D5D]">Avg Lead Time</span>
                  </div>
                  <p className="text-2xl text-yellow-600">7-14d</p>
                </div>
              </div>
            </div>

            {/* Right: INSTANT RFQ - Positioned Next to Price Data */}
            <div>
              <div className="bg-white border-2 border-[#2E5529] rounded-xl p-6 sticky top-20 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Request Quotation</h3>
                </div>

                <div className="bg-[#f0fdf4] border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-900">
                    <strong>47 verified suppliers</strong> · Average response: <strong>2-4 hours</strong>
                  </p>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Product</label>
                    <input
                      type="text"
                      value="Caustic Soda (NaOH)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-[#303030] bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Grade Required</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-[#303030]">
                      <option>Technical Grade</option>
                      <option>Food Grade</option>
                      <option>Pharma Grade</option>
                      <option>Industrial Grade</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Quantity</label>
                      <input type="number" placeholder="10" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-[#303030]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Unit</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-[#303030]">
                        <option>Tons</option>
                        <option>KG</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Delivery Destination</label>
                    <input type="text" placeholder="Jakarta, Indonesia" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-[#303030]" />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#3E7B27] text-white px-6 py-4 rounded-full hover:bg-[#2E5529] transition-colors font-bold shadow-[0px_10px_15px_-3px_rgba(62,123,39,0.3),0px_4px_6px_-4px_rgba(62,123,39,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Request Quotation</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </form>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-[#5D5D5D] mb-3">
                    <CheckCircle className="w-4 h-4 text-[#2E5529]" />
                    <span>No registration required</span>
                  </div>
                  <Link to="/sourcing-hub" className="block text-center text-[#2E5529] hover:text-[#3E7B27] text-sm font-semibold">
                    Or use Smart RFQ Wizard →
                  </Link>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="mt-4 space-y-2">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-[#2E5529] hover:bg-gray-50">
                  <span className="text-sm">Calculate Landed Cost</span>
                  <ChevronRight className="w-4 h-4 text-[#5D5D5D]" />
                </button>
                <Link to="/search" className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-[#2E5529] hover:bg-gray-50">
                  <span className="text-sm">Compare All 24 Suppliers</span>
                  <ChevronRight className="w-4 h-4 text-[#5D5D5D]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLACK SUPPLIER STATS BAR - From Figma Design */}
      <div className="bg-[#0f172a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="bg-[#2E5529] p-3 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold text-white">47</p>
                <p className="text-sm text-gray-400">Verified Suppliers</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-[#2E5529] p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold text-white">12+</p>
                <p className="text-sm text-gray-400">Export Destinations</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-[#2E5529] p-3 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold text-white">20 MT</p>
                <p className="text-sm text-gray-400">Average MOQ</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link
              to="/search"
              className="inline-flex items-center text-white hover:text-green-300 transition-colors"
            >
              View All Suppliers <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* TRUST-FIRST SUPPLIER SECTION */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-3">Top Verified Suppliers</h2>
            <p className="text-[#5D5D5D] text-lg">
              Showing 3 of 47 verified suppliers. All undergo rigorous KYC verification.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Verified Suppliers with TRUST SIGNALS */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#2E5529]" />
                  Top 3 Verified Suppliers
                </h3>
                <span className="bg-[#2E5529] text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                  24 Total Available
                </span>
              </div>

              <div className="space-y-4">
                {topSuppliers.map((supplier, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#2E5529] hover:shadow-md transition-all">
                    <div className="flex flex-col">
                      {/* Landscape Image */}
                      <img
                        src={supplier.image}
                        alt={supplier.name}
                        className="w-full h-44 object-cover"
                      />

                      {/* Content */}
                      <div className="p-5">
                        {/* Name + Verified Badge */}
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-lg">{supplier.name}</h4>
                            <Award className="w-5 h-5 text-[#2E5529]" />
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-semibold">
                              VERIFIED
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#5D5D5D] mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{supplier.location}</span>
                          <span className="text-xs">•</span>
                          <span>{supplier.yearsActive} years in business</span>
                        </div>

                        {/* Trust Score */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="bg-[#2E5529] text-white w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                              <span className="text-xl font-bold">{supplier.trustScore}</span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#303030]">Trust Score</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-semibold">{supplier.rating}</span>
                                <span className="text-xs text-[#5D5D5D]">({supplier.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Key Performance Metrics */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-gray-50 rounded p-2 text-center">
                            <p className="text-xs text-[#5D5D5D] mb-1">Response</p>
                            <p className="text-base font-bold text-[#2E5529]">{supplier.responseRate}%</p>
                          </div>
                          <div className="bg-gray-50 rounded p-2 text-center">
                            <p className="text-xs text-[#5D5D5D] mb-1">On-Time</p>
                            <p className="text-base font-bold text-[#2E5529]">{supplier.onTimeDelivery}%</p>
                          </div>
                          <div className="bg-gray-50 rounded p-2 text-center">
                            <p className="text-xs text-[#5D5D5D] mb-1">Lead Time</p>
                            <p className="text-sm font-bold text-[#2E5529]">{supplier.leadTime}</p>
                          </div>
                        </div>

                        {/* Commercial Terms */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                          <div>
                            <p className="text-xs text-[#5D5D5D]">Price Range (FOB)</p>
                            <p className="font-semibold text-[#2E5529]">{supplier.priceRange}/ton</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-[#5D5D5D]">MOQ</p>
                            <p className="font-semibold">{supplier.moq}</p>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-2">
                          <Link
                            to="/sourcing-hub"
                            className="flex-1 bg-[#2E5529] text-white px-4 py-2.5 rounded-lg hover:bg-[#3E7B27] text-center font-semibold"
                          >
                            Quick RFQ
                          </Link>
                          <Link
                            to={`/product/caustic-soda-${idx}`}
                            className="flex-1 border-2 border-[#2E5529] text-[#2E5529] px-4 py-2.5 rounded-lg hover:bg-green-50 text-center font-semibold"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/search"
                className="block text-center mt-6 bg-gray-100 text-[#2E5529] py-3 rounded-lg hover:bg-gray-200 font-semibold"
              >
                Compare All 24 Verified Suppliers →
              </Link>
            </div>

            {/* NO LOGIN WALL - KEY DIFFERENTIATOR */}
            <div className="bg-white border-2 border-[#2E5529] rounded-xl p-6 shadow-sm">
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-bold text-yellow-900 mb-1">NO LOGIN REQUIRED</p>
                    <p className="text-sm text-yellow-800">
                      Access all technical documents instantly. Unlike Knowde and competitors, we believe in transparency.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl mb-4">Technical Documentation</h3>

              <div className="space-y-3 mb-6">
                {[
                  { name: "Safety Data Sheet (SDS)", badge: "PDF", size: "2.4 MB" },
                  { name: "Technical Data Sheet (TDS)", badge: "PDF", size: "1.8 MB" },
                  { name: "Certificate of Analysis (COA)", badge: "PDF", size: "1.2 MB" },
                  { name: "MSDS (Material Safety)", badge: "PDF", size: "2.1 MB" },
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-[#2E5529] hover:bg-green-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded group-hover:bg-red-200">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{doc.name}</p>
                        <p className="text-xs text-[#5D5D5D]">{doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-[#2E5529] group-hover:text-[#3E7B27]" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#2E5529]" />
                  Compliance Certifications Available
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "REACH", verified: true },
                    { name: "Halal", verified: true },
                    { name: "ISO 9001", verified: true },
                    { name: "Kosher", verified: true },
                    { name: "GMP", verified: true },
                    { name: "HACCP", verified: false },
                  ].map((cert, idx) => (
                    <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded ${
                      cert.verified ? "bg-green-100" : "bg-gray-200"
                    }`}>
                      {cert.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                      <span className="text-sm font-semibold">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={`/product/caustic-soda`}
                className="block w-full bg-[#2E5529] text-white text-center px-6 py-3 rounded-lg hover:bg-[#3E7B27] font-semibold"
              >
                View Full Specifications & Suppliers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONABLE MARKET INTELLIGENCE */}
      <div className="bg-white py-12 border-t-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl mb-2">May 2026 Market Intelligence</h3>
                <p className="text-[#5D5D5D]">Southeast Asia Caustic Soda Market Analysis</p>
              </div>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                FREE ACCESS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-[#5D5D5D]">30-Day Movement</span>
                </div>
                <p className="text-2xl font-bold text-green-600">+3.2%</p>
                <p className="text-xs text-[#5D5D5D] mt-1">Rising trend expected</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-[#5D5D5D]">Supply Status</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">Stable</p>
                <p className="text-xs text-[#5D5D5D] mt-1">Good availability</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-[#5D5D5D]">Best Time to Buy</span>
                </div>
                <p className="text-2xl font-bold text-yellow-600">Now</p>
                <p className="text-xs text-[#5D5D5D] mt-1">Before Q3 surge</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-sm text-[#5D5D5D]">Supply Risk</span>
                </div>
                <p className="text-2xl font-bold text-red-600">Low</p>
                <p className="text-xs text-[#5D5D5D] mt-1">No major alerts</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold mb-3">Key Market Drivers (May 2026)</h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-sm">
                    <strong>Demand Growth:</strong> Pulp & paper and textile industries driving 8% YoY increase in Southeast Asia
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-sm">
                    <strong>Supply Tightness:</strong> China production cuts due to environmental regulations (+5% impact on regional prices)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-sm">
                    <strong>Price Outlook:</strong> Expected 2-4% increase through Q3 2026, stabilizing in Q4
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-sm">
                    <strong>Sourcing Recommendation:</strong> Lock in prices now before anticipated Q3 supply constraints
                  </span>
                </li>
              </ul>

              <div className="flex gap-3">
                <Link
                  to="/market-intelligence"
                  className="flex-1 bg-[#2E5529] text-white text-center px-6 py-3 rounded-lg hover:bg-[#3E7B27] font-semibold"
                >
                  Read Full 12-Page Report
                </Link>
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-[#2E5529] text-[#2E5529] rounded-lg hover:bg-green-50 font-semibold">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* PROCUREMENT-FOCUSED FAQ */}
          <div className="mt-8 bg-white border-2 border-gray-200 rounded-xl p-8">
            <h3 className="text-2xl mb-6">Procurement FAQs - Caustic Soda Indonesia</h3>
            <div className="space-y-5">
              {[
                {
                  q: "What is the current caustic soda price in Indonesia (May 2026)?",
                  a: "Current spot price: $485/ton FOB Indonesia for technical grade. Price range across verified suppliers: $478-490/ton. Prices up 3.2% from last month due to regional supply tightness."
                },
                {
                  q: "What is the typical MOQ and lead time?",
                  a: "MOQ ranges from 3-10 tons depending on supplier. Average lead time: 7-14 days for local Indonesian suppliers, 14-21 days for Singapore/China imports. We have 24 verified suppliers with flexible terms."
                },
                {
                  q: "Are all technical documents available without login?",
                  a: "Yes. Unlike Knowde and competitors, TradeChem provides instant access to SDS, TDS, COA, and compliance certificates without requiring account registration."
                },
                {
                  q: "What certifications are available for caustic soda?",
                  a: "Available certifications include REACH, Halal, ISO 9001, Kosher, GMP, and food-grade compliance. All certificates are verified and downloadable instantly."
                },
                {
                  q: "How do I calculate total landed cost?",
                  a: "Use our free Landed Cost Calculator on the product detail page. It includes product cost + freight + import duty (5%) + VAT (11%) for accurate total cost estimation."
                },
                {
                  q: "What's the best time to buy caustic soda?",
                  a: "Current market intelligence suggests buying now (May 2026) before anticipated Q3 supply constraints. Prices expected to rise 2-4% through Q3 due to regional production cuts."
                },
              ].map((faq, idx) => (
                <div key={idx} className="border-l-4 border-[#2E5529] pl-4 pb-4">
                  <h4 className="font-semibold mb-2 text-lg">{faq.q}</h4>
                  <p className="text-[#5D5D5D] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-[#5D5D5D] mb-3">Still have questions about sourcing caustic soda?</p>
              <Link
                to="/sourcing-hub"
                className="inline-flex items-center bg-[#2E5529] text-white px-6 py-3 rounded-lg hover:bg-[#3E7B27] font-semibold"
              >
                Talk to Sourcing Expert <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
