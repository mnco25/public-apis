import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const readme = `# Public APIs

A modern, production-ready platform for developers to discover, search, and validate public APIs across categories. Built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- **Browse APIs** - Explore a curated registry of public APIs organized by categories
- **Smart Search** - Full-text search with real-time filtering by category, pricing, auth type, and status
- **Health Validation** - Validate API endpoints and track uptime/response times
- **Contribute** - Add new APIs, validate existing ones, or report issues
- **Responsive Design** - Mobile-first design that works beautifully on all devices
- **Accessibility** - WCAG AA compliant with keyboard navigation and screen reader support
- **Performance** - Optimized for Lighthouse 90+ scores

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + custom CSS variables
- **Validation**: Zod for runtime schema validation
- **Data Layer**: JSON mock (production-ready for database swap)
- **Components**: Fully custom-built UI components

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

\`\`\`bash
# Navigate to the project
cd public-apis

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

\`\`\`
public-apis/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with Header/Footer
│   ├── page.tsx                  # Home page
│   ├── search/page.tsx           # Search & browse page
│   ├── api/[slug]/page.tsx       # API detail page
│   ├── contribute/page.tsx       # Contribution panel
│   └── settings/page.tsx         # Settings page
├── components/                   # React components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── Button.tsx                # Button component
│   ├── APICard.tsx               # API card component
│   ├── HealthBadge.tsx           # Status indicator
│   ├── SearchBar.tsx             # Search input
│   ├── FilterSidebar.tsx         # Filters panel
│   ├── Pagination.tsx            # Pagination
│   └── Toast.tsx                 # Toast notifications
├── lib/                          # Utilities and data layer
│   ├── types.ts                  # TypeScript type definitions
│   ├── validation.ts             # Zod schemas
│   ├── db.ts                     # Data layer abstraction
│   ├── utils.ts                  # Utility functions
│   └── health-check.ts           # Health check logic
└── data/                         # JSON data files
    ├── apis.json                 # API data (15 sample APIs)
    └── categories.json           # Category metadata
\`\`\`

## API Endpoints

### Search APIs
\`\`\`
GET /api/search?search=weather&category=Weather&pricing=free&sort=fastest&page=1&limit=20
\`\`\`

### Get Categories
\`\`\`
GET /api/categories
\`\`\`

### Validate API
\`\`\`
POST /api/validate
Body: { "apiId": "string", "baseUrl": "string" }
\`\`\`

### Report Issue
\`\`\`
POST /api/report-issue
Body: { "apiId": "string", "issueType": "broken|slow|down|incorrect_info", "description": "string" }
\`\`\`

## Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
\`\`\`

## Design System

### Colors
- Background: #ffffff, #fafafa, #f3f3f3
- Text: #1a1a1a, #666666, #999999
- Accent: #0066ff
- Status: #10b981 (success), #f59e0b (warning), #ef4444 (error)

### Typography
- Display: IBM Plex Mono
- Body: System fonts
- Code: Fira Code

## Contributing

1. Add APIs via the Contribute page
2. Validate existing APIs
3. Report issues with incorrect data
4. Submit pull requests for code improvements

## Roadmap

- [ ] User authentication with GitHub OAuth
- [ ] API favorites and collections
- [ ] Scheduled health checks
- [ ] Dark mode
- [ ] API comparison tool

## License

MIT License

---

Built with care for the developer community.
`;

fs.writeFileSync(path.join(rootDir, 'README.md'), readme);
console.log('README.md written!');
