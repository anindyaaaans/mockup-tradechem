import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { SEOLandingPage } from "./pages/SEOLandingPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { MarketIntelligencePage } from "./pages/MarketIntelligencePage";
import { SmartSourcingHub } from "./pages/SmartSourcingHub";
import { AdvancedMarketplacePage } from "./pages/AdvancedMarketplacePage";
import { LogisticsDashboardPage } from "./pages/LogisticsDashboardPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { OrderTrackingDashboard } from "./pages/OrderTrackingDashboard";
import { AgentMonitoringInterface } from "./pages/AgentMonitoringInterface";
import { AgentDashboardPage } from "./pages/AgentDashboardPage";

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
      { path: "logistics-dashboard", Component: LogisticsDashboardPage },
      { path: "oms/order/:orderId", Component: OrderDetailPage },
      { path: "oms/order", Component: OrderDetailPage },
      { path: "oms/tracking", Component: OrderTrackingDashboard },
      { path: "oms/monitoring", Component: AgentMonitoringInterface },
      { path: "oms/agent-dashboard", Component: AgentDashboardPage },
    ],
  },
]);
