import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { SEOLandingPage } from "./pages/SEOLandingPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { MarketIntelligencePage } from "./pages/MarketIntelligencePage";
import { SmartSourcingHub } from "./pages/SmartSourcingHub";
import { AdvancedMarketplacePage } from "./pages/AdvancedMarketplacePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: SEOLandingPage },
      { path: "product/:productId", Component: ProductDetailPage },
      { path: "search", Component: SearchResultsPage },
      { path: "market-intelligence", Component: MarketIntelligencePage },
      { path: "sourcing-hub", Component: SmartSourcingHub },
      { path: "procurement-infrastructure", Component: AdvancedMarketplacePage },
    ],
  },
]);
