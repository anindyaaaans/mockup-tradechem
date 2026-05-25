# 🧪 TradeChem — Premium B2B Chemical Trading & Sourcing Platform

TradeChem is a state-of-the-art B2B digital commerce and supply chain intelligence platform designed specifically for the chemical industry. This high-fidelity interactive mockup demonstrates a modern, premium enterprise web application that connects global buyers, suppliers, and manufacturers.

Designed with stunning modern aesthetics, seamless page-to-page navigation, and interactive analytics, TradeChem provides a streamlined, secure, and smart chemical sourcing experience.

---

## 🎨 Figma Design Reference
This project is built based on the high-fidelity designs from the **[Figma Design File](https://www.figma.com/design/EXGTjxZNrxcUxnmkiAcyig/Group-2-Mockup--Anindya-)**.

---

## ✨ Key Features & Modules

### 1. 🌐 Interactive B2B SEO Landing Page (`/`)
*   **Dynamic Chemical Categories**: Browse industrial, pharmaceutical, agricultural, specialty, and food-grade chemicals.
*   **Supplier Directory Highlights**: Showcases premium certified global suppliers.
*   **Live Procurement Ticker**: Interactive feed showing active global sourcing requests in real-time.
*   **Clean and Elegant UI**: Responsive glassmorphism hero banner, smooth interactive transitions, and responsive grid layouts.

### 2. 🔍 Advanced Sourcing Hub (`/sourcing-hub`)
*   **Filter & Match Engine**: Instantly search chemicals based on exact grades (e.g., USP, Food Grade, Reagent Grade, Industrial) and certifications (e.g., ISO, GMP, HALAL, Kosher).
*   **Active Buying Requests**: Post new RFQs (Request for Quotes) or bid on active buying requests.
*   **Live Match Notifications**: Smart matching matching mechanism alerts buyers of relevant supplier quotes.

### 3. 📊 Market Intelligence & Analytics (`/market-intelligence`)
*   **Live Price Trend Analysis**: Interactive charts powered by `Recharts` displaying chemical commodity pricing indexes (USD per Metric Ton) over custom intervals.
*   **Global Import/Export Tracking**: Beautiful pie charts and bar charts demonstrating market share, global demand, and logistics pipelines.
*   **Fluctuation Alerts**: Alerts detailing price jumps or falls for volatile chemical compounds (e.g., Ethylene, Propylene, Sulfuric Acid).

### 4. 📦 Enterprise Procurement Infrastructure (`/procurement-infrastructure`)
*   **Active RFP/RFQ Dashboard**: A comprehensive list of ongoing enterprise procurement contracts.
*   **Supply Chain & Logistics Tracking**: Visual status updates of shipments in transit (e.g., customs clearance, high-seas transit, port arrival).
*   **Regulatory & Compliance Dashboard**: Direct visibility into REACH registration status, GHS classification, and safety documentation.

### 5. 🧪 Interactive Chemical Product Details (`/product/:productId`)
*   **Dynamic Product Specification**: Detailed info covering purity (e.g., ≥ 99.8%), CAS Registry Number, density, and safety classifications.
*   **Volume Pricing Calculator**: Interactive pricing calculator that dynamically computes bulk discounts based on tonnage volume.
*   **Direct RFQ Generator**: Submit structured RFQs, request samples, or download Safety Data Sheets (SDS/MSDS) instantly.

---

## 🛠️ Technology Stack

*   **Core Framework**: React 18, Vite 6, TypeScript
*   **Routing**: React Router v7 (`react-router`)
*   **Styling & UI**: Tailwind CSS v4, Radix UI Primitives, Lucide Icons, Tailwind Merge, CVA
*   **Analytics & Visuals**: Recharts (Highly responsive, animated interactive SVG charts)
*   **Motion & Micro-interactions**: Framer Motion (`motion`)
*   **Notifications**: Sonner (Toast notifications)
*   **Extra Polish**: Canvas Confetti (For successful RFQ submissions)

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have **Node.js** (v18+ recommended) and **npm** installed on your system.

### ⚙️ Installation
1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   cd "Mockup TradeChem"
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local dev URL:
   `http://localhost:5173`

### 🏗️ Building for Production
To build the application for deployment:
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🔒 Security, Safety & Regulatory Focus
TradeChem integrates compliance tools to ensure industry standards are maintained:
*   **GHS Standards**: Globals Harmonized System tags for hazardous compounds.
*   **Safety Data Sheets (SDS)**: Easily accessible chemical documentation.
*   **REACH / FDA Compliance**: Built-in verification badges for pharmaceutical and food ingredients.

---

*Made with ❤️ by Anindya — Group 2 Figma Mockup Implementation*