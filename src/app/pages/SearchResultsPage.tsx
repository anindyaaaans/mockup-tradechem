import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, X, Award, MapPin, TrendingUp, TrendingDown, Download } from "lucide-react";
// Product images from Unsplash
const img1 = "https://images.unsplash.com/photo-1693996045463-6ea86d10a2e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Caustic Soda - white powder scoop
const img2 = "https://images.unsplash.com/photo-1737098140591-f0988ae7e15a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Soda Ash - white powder pile
const img3 = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Calcium Hydroxide - lab beakers
const img4 = "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Sulfuric Acid - lab measuring cup
const img5 = "https://images.unsplash.com/photo-1621534416159-42d19eb5ed0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Hydrochloric Acid - abstract chemical
const img6 = "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Sodium Bicarbonate - white powder texture

const products = [
  {
    id: "caustic-soda",
    name: "Caustic Soda (NaOH)",
    cas: "1310-73-2",
    supplier: "PT Kimia Jaya",
    rating: 4.8,
    location: "Jakarta, Indonesia",
    moq: "5 tons",
    leadTime: "7-14 days",
    priceRange: "$480-485/ton",
    priceChange: 3.2,
    certifications: ["Halal", "REACH", "ISO 9001"],
    verified: true,
    grade: "Technical",
    image: img1,
  },
  {
    id: "soda-ash",
    name: "Soda Ash (Na₂CO₃)",
    cas: "497-19-8",
    supplier: "Global Chemicals Co.",
    rating: 4.7,
    location: "Singapore",
    moq: "10 tons",
    leadTime: "10-15 days",
    priceRange: "$320-330/ton",
    priceChange: -1.5,
    certifications: ["REACH", "ISO 9001"],
    verified: true,
    grade: "Industrial",
    image: img2,
  },
  {
    id: "calcium-hydroxide",
    name: "Calcium Hydroxide",
    cas: "1305-62-0",
    supplier: "Indo Chem Solutions",
    rating: 4.6,
    location: "Surabaya, Indonesia",
    moq: "3 tons",
    leadTime: "5-10 days",
    priceRange: "$180-190/ton",
    priceChange: 0.8,
    certifications: ["Halal", "ISO 9001"],
    verified: true,
    grade: "Food",
    image: img3,
  },
  {
    id: "sulfuric-acid",
    name: "Sulfuric Acid (H₂SO₄)",
    cas: "7664-93-9",
    supplier: "Asia Chemical Trading",
    rating: 4.5,
    location: "Malaysia",
    moq: "20 tons",
    leadTime: "14-21 days",
    priceRange: "$150-160/ton",
    priceChange: 2.1,
    certifications: ["ISO 9001"],
    verified: true,
    grade: "Technical",
    image: img4,
  },
  {
    id: "hydrochloric-acid",
    name: "Hydrochloric Acid (HCl)",
    cas: "7647-01-0",
    supplier: "Pacific Chem Corp",
    rating: 4.4,
    location: "Thailand",
    moq: "15 tons",
    leadTime: "10-18 days",
    priceRange: "$120-130/ton",
    priceChange: -0.5,
    certifications: ["REACH"],
    verified: false,
    grade: "Industrial",
    image: img5,
  },
  {
    id: "sodium-bicarbonate",
    name: "Sodium Bicarbonate",
    cas: "144-55-8",
    supplier: "Chem Supply Indonesia",
    rating: 4.7,
    location: "Bandung, Indonesia",
    moq: "5 tons",
    leadTime: "7-12 days",
    priceRange: "$280-290/ton",
    priceChange: 1.2,
    certifications: ["Halal", "Kosher", "ISO 9001"],
    verified: true,
    grade: "Food",
    image: img6,
  },
];

export function SearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const grades = ["Technical", "Industrial", "Food", "Pharma"];
  const regions = ["Indonesia", "Singapore", "Malaysia", "Thailand"];
  const certifications = ["Halal", "REACH", "ISO 9001", "Kosher"];

  const toggleFilter = (value: string, selected: string[], setter: (val: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const toggleProductSelection = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const filteredProducts = products.filter(product => {
    if (verifiedOnly && !product.verified) return false;
    if (selectedGrades.length > 0 && !selectedGrades.includes(product.grade)) return false;
    if (selectedRegions.length > 0 && !selectedRegions.some(r => product.location.includes(r))) return false;
    if (selectedCerts.length > 0 && !selectedCerts.some(c => product.certifications.includes(c))) return false;
    return true;
  });

  const activeFilterCount = selectedGrades.length + selectedRegions.length + selectedCerts.length + (verifiedOnly ? 1 : 0);

  return (
    <div className="bg-white min-h-screen">
      {/* Search Header - Cleaner Design */}
      <div className="bg-white border-b-2 border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold mb-2">
                <span className="text-[#0f172a]">124 results for </span>
                <span className="text-[#2E5529]">"HDPE"</span>
                <span className="text-[#0f172a]"> in </span>
                <span className="text-[#2E5529]">Indonesia</span>
              </h1>
              <p className="text-[#6b7280]">Found in Industrial Plastics & Packaging Material categories</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#9ca3af]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-5 py-2 border border-[#e5e7eb] rounded-xl bg-white font-bold text-[#0f172a]"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Smart Filter Chips - From Figma Design */}
          <div className="flex flex-wrap gap-2">
            <button className="bg-[#2E5529] text-white px-5 py-2.5 rounded-full font-bold shadow-[0px_10px_15px_-3px_rgba(46,85,41,0.2)] flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certified Suppliers
            </button>
            <button className="bg-white border border-[#e5e7eb] text-[#4b5563] px-5 py-2.5 rounded-full font-bold hover:bg-gray-50">
              Local Warehouse
            </button>
            <button className="bg-white border border-[#e5e7eb] text-[#4b5563] px-5 py-2.5 rounded-full font-bold hover:bg-gray-50">
              Fast Shipping (&lt;14 days)
            </button>
            <button className="bg-white border border-[#e5e7eb] text-[#4b5563] px-5 py-2.5 rounded-full font-bold hover:bg-gray-50">
              Halal Certified
            </button>
            <button className="bg-white border border-[#e5e7eb] text-[#4b5563] px-5 py-2.5 rounded-full font-bold hover:bg-gray-50">
              SGS Inspected
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-[#2E5529] text-white text-xs px-2 py-1 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      setSelectedGrades([]);
                      setSelectedRegions([]);
                      setSelectedCerts([]);
                      setVerifiedOnly(false);
                    }}
                    className="text-sm text-[#2E5529] hover:text-[#3E7B27]"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Verified Only Toggle */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-[#2E5529]" />
                      Verified Suppliers Only
                    </span>
                  </label>
                </div>

                {/* Chemical Grade */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Chemical Grade</h3>
                  <div className="space-y-2">
                    {grades.map((grade) => (
                      <label key={grade} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedGrades.includes(grade)}
                          onChange={() => toggleFilter(grade, selectedGrades, setSelectedGrades)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{grade}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Region/Origin */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Region/Origin</h3>
                  <div className="space-y-2">
                    {regions.map((region) => (
                      <label key={region} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRegions.includes(region)}
                          onChange={() => toggleFilter(region, selectedRegions, setSelectedRegions)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Certifications</h3>
                  <div className="space-y-2">
                    {certifications.map((cert) => (
                      <label key={cert} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCerts.includes(cert)}
                          onChange={() => toggleFilter(cert, selectedCerts, setSelectedCerts)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Price Range ($/ton)</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[#5D5D5D]">
                      <span>$0</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Lead Time */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Lead Time</h3>
                  <div className="space-y-2">
                    {["< 7 days", "7-14 days", "14-21 days", "> 21 days"].map((time) => (
                      <label key={time} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Market Signal Banner */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">Market Alert</p>
                <p className="text-sm text-yellow-800">
                  Caustic Soda prices increased 3% this month due to supply constraints.{" "}
                  <Link to="/market-intelligence" className="underline">Learn more</Link>
                </p>
              </div>
            </div>

            {/* Sort & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#5D5D5D]">
                Showing {filteredProducts.length} of {products.length} results
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="lead-time">Lead Time</option>
              </select>
            </div>

            {/* Product Cards */}
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`border rounded-lg p-6 transition-all ${
                    selectedProducts.includes(product.id)
                      ? "border-[#2E5529] bg-green-50"
                      : "border-gray-200 hover:border-[#2E5529] hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-6 justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="w-5 h-5 mt-1"
                      />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="flex-1">
                        <div className="mb-2">
                          <Link
                            to={`/product/${product.id}`}
                            className="text-xl hover:text-[#2E5529]"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-[#5D5D5D]">CAS: {product.cas}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-[#5D5D5D] mb-1">Supplier</p>
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-semibold">{product.supplier}</p>
                              {product.verified && (
                                <Award className="w-4 h-4 text-[#2E5529]" />
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-[#5D5D5D] mb-1">Location</p>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <p className="text-sm">{product.location}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-[#5D5D5D] mb-1">MOQ</p>
                            <p className="text-sm font-semibold">{product.moq}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#5D5D5D] mb-1">Lead Time</p>
                            <p className="text-sm">{product.leadTime}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex gap-2">
                            {product.certifications.map((cert, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 border border-gray-300 px-2 py-1 text-xs rounded"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-yellow-500">★</span>
                            <span>{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="mb-2">
                        <p className="text-2xl font-semibold text-[#2E5529]">{product.priceRange}</p>
                        <div className={`flex items-center justify-end gap-1 text-sm ${
                          product.priceChange > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {product.priceChange > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>{Math.abs(product.priceChange)}%</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/sourcing-hub"
                          className="bg-[#2E5529] text-white px-4 py-2 rounded hover:bg-[#3E7B27] text-sm text-center"
                        >
                          Quick RFQ
                        </Link>
                        <Link
                          to={`/product/${product.id}`}
                          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 text-sm text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Bar */}
      {selectedProducts.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#2E5529] text-white py-4 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="font-semibold">{selectedProducts.length} products selected for comparison</p>
              <button
                onClick={() => setSelectedProducts([])}
                className="text-white/80 hover:text-white flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-[#2E5529] px-6 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Comparison
              </button>
              <button className="bg-[#3E7B27] px-6 py-2 rounded hover:bg-[#2E5529]">
                View Side-by-Side
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
