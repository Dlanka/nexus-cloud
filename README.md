# 🚀 Nexus Cloud — SaaS & Financial Analytics Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Components-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A production-grade SaaS & Financial Analytics Dashboard engineered for high-growth startups and enterprises. Designed to deliver lightning-fast operational clarity, real-time revenue intelligence, customer lifetime metrics, and interactive financial data visualization.

---

## 🌐 Live Demo & Preview

- **Live Deployment:** [https://nexus-cloud-analytics.vercel.app](https://nexus-cloud-analytics.vercel.app) *(Demo Placeholder)*
- **GitHub Repository:** [https://github.com/Dlanka/nexus-cloud](https://github.com/Dlanka/nexus-cloud)

---

## ✨ Key Architectural Features

- 📊 **Real-Time Revenue & Financial Metrics:** Instant visibility into MRR, ARR, churn rate, ARPU, and conversion velocity with dynamic delta percentage indicators (positive/negative trends).
- 📈 **Interactive Area & Cohort Charts:** Granular revenue forecasting with custom glassmorphism tooltips, crosshairs, gradient fills, and seamless time-range filtering (`7D`, `30D`, `90D`, `1Y`, `ALL`).
- 🔍 **Filterable, Searchable Data Tables:** High-performance transaction logs and customer subscription registries featuring debounced search, status pills, multi-column sorting, and responsive pagination.
- 🎨 **Dark-Mode First Modern UI:** Built with precision using Zinc-950 palettes, glassmorphic cards, subtle border highlights, and crisp typography for high-density SaaS workflows.
- 🛡️ **Type-Safe & Scalable Architecture:** Strictly typed components, data contracts, and validation schemas ensuring zero runtime type drift.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js / React](https://nextjs.org/) | Hybrid Server/Client rendering, App Router & optimal bundling |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety & developer ergonomics |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS engine with dark mode primitives |
| **UI Components** | [Shadcn UI](https://ui.shadcn.com/) / Radix UI | Accessible, composable, and unstyled headless primitives |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent, and tree-shakeable iconography |
| **Charting Library** | [Recharts](https://recharts.org/) / SVG Charts | Composable SVG area, bar, and linear analytics charts |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Fluid layout transitions and micro-interactions |

---

## 📂 Project Structure

```text
nexus-cloud/
├── public/                  # Static assets (favicons, SVG badges, logos)
├── src/
│   ├── assets/              # Static media and vector graphics
│   ├── components/
│   │   ├── charts/          # Interactive Area, Bar & Metric charts
│   │   ├── dashboard/       # Metric cards, revenue feeds, summaries
│   │   ├── tables/          # Searchable, paginated transaction tables
│   │   ├── ui/              # Shadcn & custom atomic UI primitives (Button, Card, Input)
│   │   └── wizard/          # Multi-step onboarding and setup flows
│   ├── data/                # Mock financial data feeds & analytics constants
│   ├── hooks/               # Custom hooks (useMetrics, useFilter, usePagination)
│   ├── schema/              # Zod validation schemas for forms & mutations
│   ├── types/               # TypeScript interfaces & financial type definitions
│   ├── utils/               # Formatting helpers, currency converters, cn utility
│   ├── App.tsx              # Main dashboard view application container
│   └── main.tsx             # Application bootstrap entrypoint
├── package.json             # Scripts & dependency definitions
├── tsconfig.json            # Strict TypeScript compiler options
└── vite.config.ts           # Vite / Bundler configuration
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Dlanka/nexus-cloud.git
cd nexus-cloud
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for production
```bash
npm run build
```

### 5. Preview the production build
```bash
npm run preview
```

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
