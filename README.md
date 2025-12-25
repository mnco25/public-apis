<div align="center">

# 🌐 Public APIs

**A beautifully designed, open-source registry of free public APIs for developers**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

[Live Demo](https://public-apis.vercel.app) · [Report Bug](https://github.com/yourusername/public-apis/issues) · [Request Feature](https://github.com/yourusername/public-apis/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | Full-text search with real-time filtering by category, pricing, auth type, and status |
| 🎮 **API Playground** | Test APIs directly from the browser with the built-in playground |
| 🌙 **Dark Mode** | Beautiful light and dark themes with smooth transitions |
| ⌨️ **Command Palette** | Press `Cmd/Ctrl + K` for quick navigation and search |
| 📊 **Health Monitoring** | Automated daily health checks via GitHub Actions |
| 📱 **Responsive Design** | Optimized for all devices from mobile to desktop |
| 🚀 **60+ APIs** | Curated collection of working, tested public APIs |

---

## 🖥️ Screenshots

<details>
<summary>View Screenshots</summary>

### Home Page
The landing page features animated statistics, category browsing, and quick access to recently validated APIs.

### Browse & Search
Advanced filtering with a responsive sidebar, real-time search, and card-based API display.

### API Detail Page
Comprehensive API information including the interactive playground for testing endpoints.

</details>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/public-apis.git
cd public-apis

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```
public-apis/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   ├── search/page.tsx           # Browse & search page
│   ├── api/[slug]/page.tsx       # API detail page
│   ├── contribute/page.tsx       # Contribution forms
│   ├── opengraph-image.tsx       # Dynamic OG images
│   └── globals.css               # Global styles & theme
├── components/                   # React components
│   ├── CommandPalette.tsx        # Cmd+K search
│   ├── APIPlayground.tsx         # API testing tool
│   ├── ThemeToggle.tsx           # Dark mode toggle
│   ├── APICard.tsx               # API display card
│   ├── FilterSidebar.tsx         # Search filters
│   └── ...                       # Other components
├── lib/                          # Utilities
│   ├── db.ts                     # Data layer
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Helper functions
├── data/                         # JSON data
│   ├── apis.json                 # API registry (60+ APIs)
│   └── categories.json           # Category metadata
├── scripts/                      # Automation scripts
│   ├── validate-apis.js          # Health checker
│   └── update-health-status.js   # Status updater
└── .github/
    ├── workflows/                # CI/CD workflows
    │   └── validate-apis.yml     # Daily health checks
    └── ISSUE_TEMPLATE/           # Issue templates
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + CSS Variables |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Command Palette** | [cmdk](https://cmdk.paco.me/) |
| **OG Images** | [@vercel/og](https://vercel.com/docs/functions/edge-functions/og-image-generation) |

---

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🎨 Design System

### Colors

| Token | Light | Dark |
|-------|-------|------|
| `bg-primary` | `#ffffff` | `#0a0a0f` |
| `bg-secondary` | `#f5f5f7` | `#141419` |
| `text-primary` | `#1a1a1a` | `#fafafa` |
| `accent` | `#3b82f6` | `#3b82f6` |

### Typography

- **Display**: IBM Plex Mono
- **Body**: System fonts (SF Pro, Segoe UI, etc.)

---

## 🤝 Contributing

We welcome contributions! There are several ways to help:

### 1. Add a New API

Use our [contribution form](/contribute) or create a [GitHub Issue](https://github.com/yourusername/public-apis/issues/new?template=add-api.yml).

### 2. Report an Issue

Found a broken or outdated API? [Report it here](https://github.com/yourusername/public-apis/issues/new?template=report-issue.yml).

### 3. Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🗺️ Roadmap

- [x] Dark mode support
- [x] Command palette (Cmd+K)
- [x] API playground
- [x] Automated health checks
- [x] Dynamic OG images
- [ ] User authentication (GitHub OAuth)
- [ ] API favorites & collections
- [ ] API comparison tool
- [ ] Real-time uptime monitoring dashboard
- [ ] Database migration (PostgreSQL)

---

## 📊 API Categories

| Category | Count | Description |
|----------|-------|-------------|
| Development Tools | 15+ | Testing, mock data, utilities |
| Entertainment | 20+ | Movies, TV, games, fun APIs |
| Finance & Markets | 5+ | Crypto, stocks, currency |
| Weather | 3+ | Forecasts, climate data |
| Education | 5+ | Dictionary, trivia, learning |
| Maps & Location | 5+ | Geocoding, countries, places |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by the original [public-apis](https://github.com/public-apis/public-apis) project
- Built with [Next.js](https://nextjs.org/) by Vercel
- Icons by [Lucide](https://lucide.dev/)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ for the developer community

</div>
