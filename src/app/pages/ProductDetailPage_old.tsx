import { useState } from "react";
import { Link } from "react-router";
import { Award, MapPin, Download, Share2, Bell, Bookmark, TrendingUp, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  { property: "Appearance", value: "White flakes/pearls" },
  { property: "Purity (NaOH)", value: "≥99.0%" },
  { property: "Na₂CO₃", value: "≤0.5%" },
  { property: "NaCl", value: "≤0.03%" },
  { property: "Fe₂O₃", value: "≤0.005%" },
  { property: "Moisture", value: "≤0.5%" },
  { property: "pH (10% solution)", value: "14.0" },
];

const suppliers = [
  {
    name: "PT Kimia Jaya",
    rating: 4.8,
    reviews: 142,
    location: "Jakarta, Indonesia",
    moq: "5 tons",
    leadTime: "7-14 days",
    paymentTerms: "T/T, L/C",
    priceRange: "$480-485/ton",
    verified: true,
    yearsActive: 8,
  },
  {
    name: "Global Chemicals Co.",
    rating: 4.7,
    reviews: 98,
    location: "Singapore",
    moq: "10 tons",
    leadTime: "10-15 days",
    paymentTerms: "T/T",
    priceRange: "$485-490/ton",
    verified: true,
    yearsActive: 12,
  },
  {
    name: "Indo Chem Solutions",
    rating: 4.6,
    reviews: 76,
    location: "Surabaya, Indonesia",
    moq: "3 tons",
    leadTime: "5-10 days",
    paymentTerms: "T/T, L/C, D/P",
    priceRange: "$478-483/ton",
    verified: true,
    yearsActive: 6,
  },
];

export function ProductDetailPage() {
  const [quantity, setQuantity] = useState(10);
  const [origin, setOrigin] = useState("singapore");
  const [destination, setDestination] = useState("jakarta");
  const [incoterm, setIncoterm] = useState("CIF");
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);

  const basePrice = 485;
  const freight = origin === "singapore" ? 45 : origin === "china" ? 65 : 30;
  const duty = basePrice * 0.05;
  const vat = (basePrice + freight + duty) * 0.11;
  const totalLandedCost = basePrice + freight + duty + vat;

  const toggleSupplierSelection = (idx: number) => {
    if (selectedSuppliers.includes(idx)) {
      setSelectedSuppliers(selectedSuppliers.filter(i => i !== idx));
    } else if (selectedSuppliers.length < 3) {
      setSelectedSuppliers([...selectedSuppliers, idx]);
    }
  };

  return (
    <div className="bg-white">
      {/* Product Hero */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-[#5D5D5D] mb-2">
                <Link to="/" className="hover:text-[#2E5529]">Home</Link>
                <span>/</span>
                <Link to="/search" className="hover:text-[#2E5529]">Products</Link>
                <span>/</span>
                <span>Caustic Soda</span>
              </div>
              <h1 className="text-3xl mb-2">Caustic Soda (Sodium Hydroxide)</h1>
              <p className="text-[#5D5D5D] mb-3">CAS No: 1310-73-2 | IUPAC: Sodium Hydroxide</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">${basePrice}/ton</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +1.2%
                  </span>
                </div>
                <div className="flex gap-2">
                  {["Halal", "REACH", "ISO 9001"].map((cert, idx) => (
                    <span key={idx} className="bg-white border border-gray-300 px-2 py-1 text-xs rounded">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini Price Chart */}
              <div className="mt-4 bg-white rounded p-3 border border-gray-200" style={{ width: 300, height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <Line type="monotone" dataKey="price" stroke="#2E5529" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                to="/sourcing-hub"
                className="bg-[#2E5529] text-white px-6 py-3 rounded hover:bg-[#3E7B27] transition-colors text-center"
              >
                Request Quotation
              </Link>
              <button className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-2 rounded hover:bg-gray-50">
                <Bookmark className="w-4 h-4" />
                Save to Watchlist
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-2 rounded hover:bg-gray-50">
                <Bell className="w-4 h-4" />
                Set Price Alert
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-2 rounded hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Download Spec Sheet
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-2 rounded hover:bg-gray-50">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Specs & Calculator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Technical Specifications */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl mb-4">Technical Specifications</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 bg-gray-50">Property</th>
                      <th className="text-left py-3 px-4 bg-gray-50">Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specifications.map((spec, idx) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 px-4 text-[#5D5D5D]">{spec.property}</td>
                        <td className="py-3 px-4">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-2">Packaging Options</h3>
                <div className="flex flex-wrap gap-2">
                  {["25kg Bag", "50kg Drum", "IBC (1000L)", "Bulk", "Flexi Bag"].map((pkg, idx) => (
                    <span key={idx} className="bg-white border border-gray-300 px-3 py-1 rounded text-sm">
                      {pkg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm">
                  <strong>Hazmat Classification:</strong> UN 1823, Class 8 (Corrosive)
                </p>
              </div>
            </div>

            {/* Landed Cost Calculator - DIFFERENTIATOR */}
            <div className="border-2 border-[#2E5529] rounded-lg p-6 bg-green-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Landed Cost Calculator</h2>
                <span className="bg-[#2E5529] text-white px-3 py-1 rounded text-sm">
                  Exclusive Feature
                </span>
              </div>
              <p className="text-sm text-[#5D5D5D] mb-6">
                Calculate total landed cost including freight, duty, and taxes. Not available on any competitor platform.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm mb-1">Quantity (tons)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Origin Port</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="jakarta">Jakarta, Indonesia</option>
                    <option value="singapore">Singapore</option>
                    <option value="china">China (Shanghai)</option>
                    <option value="india">India (Mumbai)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Destination Port</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="jakarta">Jakarta</option>
                    <option value="surabaya">Surabaya</option>
                    <option value="medan">Medan</option>
                    <option value="makassar">Makassar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Incoterm</label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="FOB">FOB</option>
                    <option value="CIF">CIF</option>
                    <option value="DDP">DDP</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold mb-3">Cost Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#5D5D5D]">Product Cost ({quantity} tons)</span>
                    <span>${(basePrice * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5D5D5D]">Freight Estimate (FCL)</span>
                    <span>${(freight * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5D5D5D]">Import Duty (5%)</span>
                    <span>${(duty * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5D5D5D]">VAT (11%)</span>
                    <span>${(vat * quantity).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold text-lg">
                    <span>Total Landed Cost</span>
                    <span className="text-[#2E5529]">${(totalLandedCost * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#5D5D5D]">
                    <span>Per Ton</span>
                    <span>${totalLandedCost.toFixed(2)}/ton</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-[#2E5529] text-white px-4 py-2 rounded hover:bg-[#3E7B27]">
                  Export to PDF
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Suppliers */}
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl">Verified Suppliers</h2>
                {selectedSuppliers.length > 0 && (
                  <button className="text-sm text-[#2E5529] hover:text-[#3E7B27]">
                    Compare ({selectedSuppliers.length})
                  </button>
                )}
              </div>

              <div className="mb-4">
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                  <option>Sort by: Rating</option>
                  <option>Sort by: Price</option>
                  <option>Sort by: MOQ</option>
                  <option>Sort by: Lead Time</option>
                </select>
              </div>

              <div className="space-y-4">
                {suppliers.map((supplier, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-4 transition-all ${
                      selectedSuppliers.includes(idx)
                        ? "border-[#2E5529] bg-green-50"
                        : "border-gray-200 hover:border-[#2E5529]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{supplier.name}</h3>
                          {supplier.verified && (
                            <Award className="w-4 h-4 text-[#2E5529]" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{supplier.rating}</span>
                          <span className="text-[#5D5D5D]">({supplier.reviews} reviews)</span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedSuppliers.includes(idx)}
                        onChange={() => toggleSupplierSelection(idx)}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="space-y-1 text-sm text-[#5D5D5D] mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {supplier.location}
                      </div>
                      <div className="flex justify-between">
                        <span>MOQ:</span>
                        <span className="text-[#303030]">{supplier.moq}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lead Time:</span>
                        <span className="text-[#303030]">{supplier.leadTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment:</span>
                        <span className="text-[#303030]">{supplier.paymentTerms}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Price Range:</span>
                        <span className="text-[#2E5529]">{supplier.priceRange}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-[#2E5529] text-white px-3 py-2 text-sm rounded hover:bg-[#3E7B27]">
                        Quick RFQ
                      </button>
                      <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedSuppliers.length >= 2 && (
                <button className="w-full mt-4 bg-white border-2 border-[#2E5529] text-[#2E5529] px-4 py-2 rounded hover:bg-green-50">
                  Compare Selected Suppliers
                </button>
              )}
            </div>

            {/* Related Content */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Related Content</h3>
              <div className="space-y-3">
                <Link
                  to="/market-intelligence"
                  className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                >
                  <p className="text-sm font-semibold">Caustic Soda Market Report</p>
                  <p className="text-xs text-[#5D5D5D]">May 2026 - Price trends & forecast</p>
                </Link>
                <Link
                  to="/search"
                  className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                >
                  <p className="text-sm font-semibold">Related Products</p>
                  <p className="text-xs text-[#5D5D5D]">Soda Ash, Calcium Hydroxide</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
