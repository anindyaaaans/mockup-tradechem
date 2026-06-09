import { Outlet, Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import logoImage from "../../imports/image.png";

export function Layout() {
  const [tradeOpen, setTradeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTradeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img src={logoImage} alt="TradeChem" className="h-8" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-[#303030] hover:text-[#2E5529]">Products</Link>
              <Link to="/search" className="text-[#303030] hover:text-[#2E5529]">Suppliers</Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setTradeOpen(!tradeOpen)}
                  className="flex items-center gap-1 text-[#303030] hover:text-[#2E5529]"
                >
                  Trade <ChevronDown className={`w-4 h-4 transition-transform ${tradeOpen ? "rotate-180" : ""}`} />
                </button>
                {tradeOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                    <Link
                      to="/market-intelligence"
                      onClick={() => setTradeOpen(false)}
                      className="block px-4 py-2 text-sm text-[#303030] hover:bg-[#F5F7FA] hover:text-[#2E5529]"
                    >
                      Market Intelligence
                    </Link>
                    <Link
                      to="/sourcing-hub"
                      onClick={() => setTradeOpen(false)}
                      className="block px-4 py-2 text-sm text-[#303030] hover:bg-[#F5F7FA] hover:text-[#2E5529]"
                    >
                      Sourcing Hub
                    </Link>
                    <Link
                      to="/procurement-infrastructure"
                      onClick={() => setTradeOpen(false)}
                      className="block px-4 py-2 text-sm text-[#303030] hover:bg-[#F5F7FA] hover:text-[#2E5529]"
                    >
                      Procurement Tools
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/logistics-dashboard" className="text-[#303030] hover:text-[#2E5529]">Logistics</Link>
              <Link to="/oms/monitoring" className="text-[#303030] hover:text-[#2E5529]">OMS</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-[#5D5D5D] hover:text-[#2E5529]">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-[#5D5D5D] hover:text-[#2E5529]">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-[#5D5D5D] hover:text-[#2E5529]">
                <User className="w-5 h-5" />
              </button>
              <Link
                to="/sourcing-hub"
                className="bg-[#2E5529] text-white px-4 py-2 rounded hover:bg-[#3E7B27] transition-colors"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[#303030] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Company Profile</a></li>
                <li><a href="#" className="hover:text-white">Leadership</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Buy on TradeChem</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/search" className="hover:text-white">Find Suppliers</Link></li>
                <li><Link to="/sourcing-hub" className="hover:text-white">Request Quote</Link></li>
                <li><a href="#" className="hover:text-white">Verified Suppliers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/market-intelligence" className="hover:text-white">Market Intelligence</Link></li>
                <li><Link to="/procurement-infrastructure" className="hover:text-white">Procurement Tools</Link></li>
                <li><a href="#" className="hover:text-white">Price Trends</a></li>
                <li><a href="#" className="hover:text-white">Industry Reports</a></li>
                <li><Link to="/logistics-dashboard" className="hover:text-white">Logistics Dashboard</Link></li>
                <li><Link to="/oms/order" className="hover:text-white">Order Detail</Link></li>
                <li><Link to="/oms/tracking" className="hover:text-white">Shipment Tracking</Link></li>
                <li><Link to="/oms/monitoring" className="hover:text-white">Agent Monitor</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 TradeChem. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
