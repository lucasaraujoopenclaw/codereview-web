# CodeReview Web

Frontend for **CodeReview Hub** — an AI-powered code review platform.

Built with React, TypeScript, Vite, and Tailwind CSS.

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (proxies /api to localhost:3001)
npm run dev

# Type-check
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable       | Description                                  | Default |
| -------------- | -------------------------------------------- | ------- |
| `VITE_API_URL` | Backend API base URL (empty = use dev proxy) | —       |

## Docker

```bash
docker build -t codereview-web .
docker run -p 80:80 codereview-web
```

The container serves the static build via nginx with SPA fallback.

## Project Structure

```
src/
├── shared/        # Shared types (mirrored from backend)
├── components/    # Reusable UI components
│   ├── layout/    # Layout, Sidebar
│   └── ui/        # StatCard, StatusBadge, LoadingSpinner, EmptyState
├── hooks/         # Custom React hooks (useApi)
├── lib/           # API client, utilities
└── pages/         # Route pages (Dashboard, Repositories, PullRequests, Settings)
```

## License

Private — all rights reserved.
