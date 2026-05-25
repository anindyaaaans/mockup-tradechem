import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Award, Shield, Clock, CheckCircle, AlertTriangle, FileText, TrendingUp, Calculator, Package, MapPin, Star, Truck, DollarSign } from "lucide-react";
// Supplier company images from Unsplash
const supplierImg1 = "https://images.unsplash.com/photo-1516937941344-00b4e0337589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // PT Kimia Jaya - industrial factory
const supplierImg2 = "https://images.unsplash.com/photo-1509390288171-ce2088f7d08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Global Chemicals Co. - industrial facility
const supplierImg3 = "https://images.unsplash.com/photo-1665040221204-828ab5642a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Indo Chem Solutions - Surabaya industrial

const matchedSuppliers = [
  {
    name: "PT Kimia Jaya",
    matchScore: 95,
    reasons: ["Meets all spec requirements", "Has Food Grade certification", "Fast delivery to Jakarta"],
    location: "Jakarta, Indonesia",
    trustScore: 92,
    rating: 4.8,
    responseRate: 98,
    onTimeDelivery: 96,
    image: supplierImg1,
    estimatedPrice: "$480-485/MT",
  },
  {
    name: "Global Chemicals Co.",
    matchScore: 88,
    reasons: ["Verified supplier", "Competitive pricing", "ISO 9001 certified"],
    location: "Singapore",
    trustScore: 89,
    rating: 4.7,
    responseRate: 95,
    onTimeDelivery: 94,
    image: supplierImg2,
    estimatedPrice: "$485-490/MT",
  },
  {
    name: "Indo Chem Solutions",
    matchScore: 85,
    reasons: ["Low MOQ option", "Local warehouse", "Halal certified"],
    location: "Surabaya, Indonesia",
    trustScore: 86,
    rating: 4.6,
    responseRate: 92,
    onTimeDelivery: 91,
    image: supplierImg3,
    estimatedPrice: "$478-483/MT",
  },
];

export function SmartSourcingHub() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCalculator, setShowCalculator] = useState(false);
  const [formData, setFormData] = useState({
    chemical: "Caustic Soda",
    grade: "Food Grade",
    quantity: "10",
    unit: "tons",
    packaging: "Drum",
    deliveryTimeline: "30 days",
    destination: "Jakarta, Indonesia",
    additionalRequirements: "",
  });

  // Landed Cost Calculator State
  const [calcData, setCalcData] = useState({
    basePrice: 485,
    quantity: 10,
    freight: 45,
    duty: 5,
    vat: 11,
  });

  const totalLandedCost = calcData.basePrice + calcData.freight + (calcData.basePrice * calcData.duty / 100) + ((calcData.basePrice + calcData.freight) * calcData.vat / 100);
  const totalCost = totalLandedCost * calcData.quantity;

  const steps = [
    { number: 1, title: "Product Requirements", icon: FileText },
    { number: 2, title: "Quantity & Delivery", icon: Clock },
    { number: 3, title: "Supplier Matching", icon: Award },
    { number: 4, title: "Preview & Send", icon: CheckCircle },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero - Enhanced Design */}
      <div className="bg-gradient-to-br from-white via-green-50 to-white border-b-2 border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[rgba(46,85,41,0.1)] text-[#2E5529] px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase border-2 border-[#2E5529]/20 mb-6">
            <Shield className="w-4 h-4" />
            <span>Exclusive Feature - Not on Knowde or CheMondis</span>
          </div>
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#2E5529] to-[#3E7B27] bg-clip-text text-transparent">
            Smart Sourcing Hub
          </h1>
          <p className="text-xl text-[#5D5D5D] max-w-3xl mx-auto mb-8 leading-relaxed">
            Complete procurement toolkit: <span className="font-bold text-[#2E5529]">RFQ Wizard</span> + <span className="font-bold text-[#2E5529]">Landed Cost Calculator</span> + <span className="font-bold text-[#2E5529]">Supplier KYC</span> + <span className="font-bold text-[#2E5529]">Dashboard</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold">Free Forever</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold">5 min Setup</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <Award className="w-4 h-4 text-[#2E5529]" />
              <span className="text-sm font-semibold">Verified Suppliers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Landed Cost Calculator", desc: "Total cost including freight & duty", icon: Calculator, color: "bg-blue-50", iconColor: "text-blue-600" },
            { title: "RFQ Wizard", desc: "4-step smart matching system", icon: FileText, color: "bg-green-50", iconColor: "text-green-600" },
            { title: "KYC Transparency", desc: "Verified supplier credentials", icon: Shield, color: "bg-purple-50", iconColor: "text-purple-600" },
            { title: "Procurement Dashboard", desc: "Track all your RFQs", icon: Clock, color: "bg-orange-50", iconColor: "text-orange-600" },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:shadow-xl hover:border-[#2E5529] transition-all cursor-pointer group">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              <h3 className="font-bold mb-2 text-[#303030]">{feature.title}</h3>
              <p className="text-sm text-[#5D5D5D]">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* RFQ Wizard - Main Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-[#2E5529] rounded-lg p-8">
              <h2 className="text-2xl mb-2">RFQ Drafting Wizard</h2>
              <p className="text-[#5D5D5D] mb-6">
                Smart supplier matching based on your requirements. Send RFQ to multiple verified suppliers with one click.
              </p>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, idx) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        currentStep >= step.number
                          ? "bg-[#2E5529] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}>
                        {currentStep > step.number ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-xs text-center max-w-[80px]">{step.title}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`h-0.5 w-12 mx-2 mb-6 ${
                        currentStep > step.number ? "bg-[#2E5529]" : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Product Requirements */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#303030]">Chemical Product *</label>
                    <input
                      type="text"
                      value={formData.chemical}
                      onChange={(e) => setFormData({...formData, chemical: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2E5529] focus:ring-2 focus:ring-[#2E5529]/20 outline-none transition-all"
                      placeholder="e.g., Caustic Soda, Ethylene"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#303030]">Grade / Specification *</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2E5529] focus:ring-2 focus:ring-[#2E5529]/20 outline-none transition-all"
                    >
                      <option>Technical Grade</option>
                      <option>Food Grade</option>
                      <option>Pharma Grade</option>
                      <option>Industrial Grade</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Required Certifications</label>
                    <div className="flex flex-wrap gap-2">
                      {["Halal", "REACH", "ISO 9001", "Kosher", "GMP"].map((cert) => (
                        <label key={cert} className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded cursor-pointer hover:bg-gray-50">
                          <input type="checkbox" />
                          <span className="text-sm">{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Quantity & Delivery */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#303030]">Quantity *</label>
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2E5529] focus:ring-2 focus:ring-[#2E5529]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#303030]">Unit *</label>
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData({...formData, unit: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2E5529] focus:ring-2 focus:ring-[#2E5529]/20 outline-none transition-all"
                      >
                        <option>tons</option>
                        <option>kg</option>
                        <option>liters</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#303030] flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Packaging Preference
                    </label>
                    <select
                      value={formData.packaging}
                      onChange={(e) => setFormData({...formData, packaging: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2E5529] focus:ring-2 focus:ring-[#2E5529]/20 outline-none transition-all"
                    >
                      <option>Drum (50kg)</option>
                      <option>Bag (25kg)</option>
                      <option>IBC (1000L)</option>
                      <option>Bulk</option>
                      <option>Flexi Bag</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#303030] flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Delivery Timeline *
                    </label>
                    <select
                      value={formData.deliveryTimeline}
                      onChange={(e) => setFormData({...formData, deliveryTimeline: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2E5529] focus:ring-2 focus:ring-[#2E5529]/20 outline-none transition-all"
                    >
                      <option>ASAP (within 7 days)</option>
                      <option>Within 2 weeks</option>
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#303030] flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Destination *
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2E5529] focus:ring-2 focus:ring-[#2E5529]/20 outline-none transition-all"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Supplier Matching */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-5 mb-6 shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500 rounded-full p-2">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-green-900 text-lg mb-1">✓ Smart Matching Complete!</p>
                        <p className="text-sm text-green-800">
                          AI-powered analysis found <span className="font-bold">{matchedSuppliers.length} verified suppliers</span> that perfectly match your requirements for <span className="font-bold">{formData.chemical}</span>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {matchedSuppliers.map((supplier, idx) => (
                    <div key={idx} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#2E5529] hover:shadow-lg transition-all">
                      <div className="flex">
                        <img
                          src={supplier.image}
                          alt={supplier.name}
                          className="w-32 h-32 object-cover"
                        />
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg">{supplier.name}</h3>
                                <Award className="w-5 h-5 text-[#2E5529]" />
                              </div>
                              <div className="flex items-center gap-4 text-sm text-[#5D5D5D]">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{supplier.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold text-[#303030]">{supplier.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-green-50 px-4 py-2 rounded-lg text-center border-2 border-green-200">
                              <div className="flex items-baseline gap-1 mb-0.5">
                                <span className="text-2xl font-bold text-[#2E5529]">{supplier.matchScore}</span>
                                <span className="text-xs text-[#5D5D5D]">/100</span>
                              </div>
                              <p className="text-xs font-semibold text-[#2E5529]">Match Score</p>
                            </div>
                          </div>

                          <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="w-4 h-4 text-blue-600" />
                              <p className="text-xs font-bold text-blue-900">Estimated Price Range</p>
                            </div>
                            <p className="text-lg font-bold text-blue-900">{supplier.estimatedPrice}</p>
                          </div>

                          <div className="mb-3">
                            <p className="text-xs font-bold text-[#5D5D5D] mb-2 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Why Recommended:
                            </p>
                            <ul className="space-y-1.5">
                              {supplier.reasons.map((reason, ridx) => (
                                <li key={ridx} className="text-sm flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center text-sm">
                            <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                              <p className="text-xs text-[#5D5D5D] mb-1">Trust Score</p>
                              <p className="font-bold text-[#2E5529]">{supplier.trustScore}/100</p>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                              <p className="text-xs text-[#5D5D5D] mb-1">Response</p>
                              <p className="font-bold text-[#2E5529]">{supplier.responseRate}%</p>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                              <p className="text-xs text-[#5D5D5D] mb-1">On-Time</p>
                              <p className="font-bold text-[#2E5529]">{supplier.onTimeDelivery}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm">Send to all {matchedSuppliers.length} matched suppliers</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 4: Preview & Send */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-300 rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                      <FileText className="w-6 h-6 text-[#2E5529]" />
                      <h3 className="font-bold text-xl">RFQ Summary</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-xs text-[#5D5D5D] mb-1 uppercase tracking-wide">Product</p>
                        <p className="font-bold text-lg text-[#2E5529]">{formData.chemical}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-xs text-[#5D5D5D] mb-1 uppercase tracking-wide">Grade</p>
                        <p className="font-bold text-lg">{formData.grade}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-xs text-[#5D5D5D] mb-1 uppercase tracking-wide">Quantity</p>
                        <p className="font-bold text-lg">{formData.quantity} {formData.unit}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-xs text-[#5D5D5D] mb-1 uppercase tracking-wide">Packaging</p>
                        <p className="font-bold text-lg">{formData.packaging}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-xs text-[#5D5D5D] mb-1 uppercase tracking-wide">Timeline</p>
                        <p className="font-bold text-lg">{formData.deliveryTimeline}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-xs text-[#5D5D5D] mb-1 uppercase tracking-wide">Destination</p>
                        <p className="font-bold text-lg">{formData.destination}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-green-900 text-lg mb-2">Ready to Send!</p>
                        <p className="text-sm text-green-800 mb-3">
                          Your RFQ will be sent to <span className="font-bold">{matchedSuppliers.length} verified suppliers</span>. You'll receive competitive quotes via email and in your dashboard within 24-48 hours.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {matchedSuppliers.map((supplier, idx) => (
                            <span key={idx} className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-green-900 border border-green-200 flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              {supplier.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#2E5529] to-[#3E7B27] text-white px-6 py-5 rounded-xl hover:shadow-2xl transition-all text-xl font-bold flex items-center justify-center gap-3 group">
                    <span>Send RFQ to {matchedSuppliers.length} Suppliers</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-200">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    currentStep === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
                  }`}
                >
                  ← Previous
                </button>
                {currentStep < 4 && (
                  <button
                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                    className="bg-gradient-to-r from-[#2E5529] to-[#3E7B27] text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all font-semibold flex items-center gap-2"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Dashboard & KYC */}
          <div className="space-y-6">
            {/* Landed Cost Calculator */}
            <div className="bg-gradient-to-br from-[#2E5529] to-[#3E7B27] rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-6 h-6" />
                <h3 className="font-bold text-lg">Quick Cost Calculator</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs opacity-90 block mb-1">Base Price ($/MT)</label>
                  <input
                    type="number"
                    value={calcData.basePrice}
                    onChange={(e) => setCalcData({...calcData, basePrice: Number(e.target.value)})}
                    className="w-full px-3 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/60"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs opacity-90 block mb-1">Quantity (MT)</label>
                    <input
                      type="number"
                      value={calcData.quantity}
                      onChange={(e) => setCalcData({...calcData, quantity: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded bg-white/20 border border-white/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs opacity-90 block mb-1">Freight ($/MT)</label>
                    <input
                      type="number"
                      value={calcData.freight}
                      onChange={(e) => setCalcData({...calcData, freight: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded bg-white/20 border border-white/30 text-white"
                    />
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 border-2 border-white/40 mt-4">
                  <p className="text-xs opacity-90 mb-1">Total Landed Cost</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">USD {totalCost.toLocaleString()}</span>
                  </div>
                  <p className="text-xs opacity-75 mt-1">${totalLandedCost.toFixed(2)}/MT × {calcData.quantity} MT</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                  <div className="bg-white/10 rounded p-2 text-center">
                    <p className="opacity-75">Duty</p>
                    <p className="font-semibold">{calcData.duty}%</p>
                  </div>
                  <div className="bg-white/10 rounded p-2 text-center">
                    <p className="opacity-75">VAT</p>
                    <p className="font-semibold">{calcData.vat}%</p>
                  </div>
                  <div className="bg-white/10 rounded p-2 text-center">
                    <p className="opacity-75">Total</p>
                    <p className="font-semibold">${totalLandedCost.toFixed(0)}/MT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Watchlist & Alerts */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">My Watchlist & Alerts</h3>
              <div className="space-y-3">
                {[
                  { name: "Caustic Soda", price: "$485", change: 3.2 },
                  { name: "Ethylene", price: "$920", change: 8.5 },
                  { name: "Methanol", price: "$380", change: -2.1 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-[#5D5D5D]">{item.price}/ton</p>
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      item.change > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      <TrendingUp className="w-3 h-3" />
                      <span>{Math.abs(item.change)}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/market-intelligence"
                className="block text-center mt-4 text-sm text-[#2E5529] hover:text-[#3E7B27]"
              >
                Manage Alerts →
              </Link>
            </div>

            {/* RFQ History */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Recent RFQs</h3>
              <div className="space-y-3">
                {[
                  { product: "Caustic Soda", date: "May 15, 2026", status: "3 quotes received" },
                  { product: "Soda Ash", date: "May 10, 2026", status: "Pending" },
                  { product: "Methanol", date: "May 5, 2026", status: "Completed" },
                ].map((rfq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded p-3">
                    <p className="font-semibold text-sm">{rfq.product}</p>
                    <p className="text-xs text-[#5D5D5D] mt-1">{rfq.date}</p>
                    <p className="text-xs text-[#2E5529] mt-1">{rfq.status}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-[#2E5529] hover:text-[#3E7B27] border border-gray-300 py-2 rounded hover:bg-gray-50">
                View All RFQs
              </button>
            </div>

            {/* Supplier KYC Trust Score */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-[#2E5529]" />
                <h3 className="font-semibold">KYC Transparency</h3>
              </div>
              <p className="text-sm text-[#5D5D5D] mb-4">
                All matched suppliers are verified with full KYC documentation.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#5D5D5D]">Business Registration</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5D5D5D]">Tax ID Verification</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5D5D5D]">Import License</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5D5D5D]">Audit Report</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>

            {/* Saved Suppliers */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Saved Suppliers</h3>
              <div className="space-y-2">
                {["PT Kimia Jaya", "Global Chemicals Co."].map((supplier, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{supplier}</span>
                    <Award className="w-4 h-4 text-[#2E5529]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Success Stats Section */}
        <div className="mt-16 bg-gradient-to-br from-[#2E5529] to-[#3E7B27] rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">Why TradeChem Smart Sourcing Hub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">47+</div>
              <p className="text-white/90">Verified Suppliers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24-48h</div>
              <p className="text-white/90">Average Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">15%</div>
              <p className="text-white/90">Cost Savings vs Market</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-white/90">Free Forever</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <h4 className="font-bold">No Login Required</h4>
                </div>
                <p className="text-sm text-white/80">Access market intelligence and prices instantly</p>
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <Shield className="w-5 h-5" />
                  <h4 className="font-bold">Full KYC Transparency</h4>
                </div>
                <p className="text-sm text-white/80">Every supplier verified with business docs</p>
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <Calculator className="w-5 h-5" />
                  <h4 className="font-bold">Landed Cost Calculator</h4>
                </div>
                <p className="text-sm text-white/80">See total costs including freight, duty & VAT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
