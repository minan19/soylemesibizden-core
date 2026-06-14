# SÖYLEMESİ BİZDEN — Frontend (Next.js 14)

## ⚠️ Naming Note

This directory is named `NextJS_16_Web` for historical reasons, but the actual Next.js version is **14.1.0** (not 16).

**Why?** The directory was named during development planning before version selection. Renaming now would break references across documentation and deployment scripts.

## Tech Stack

- **Next.js**: 14.1.0 (App Router, Server Components)
- **React**: 18
- **TypeScript**: Strict mode
- **Database**: PostgreSQL (Neon Cloud) + Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Styling**: Tailwind CSS
- **Real-time**: SSE for notifications
- **Maps**: Leaflet.js

## Key Directories

- `app/` — Next.js routes (App Router)
- `components/` — React components (Client/Server)
- `services/decision/` — Decision Engine (canonical scoring source)
- `lib/` — Utilities, auth config, Prisma client
- `prisma/` — Schema + migrations

## Build & Deploy

```bash
npm run build  # Next.js static build
npm run dev    # Development server (port 3000)
```

## Important Notes

- ✅ **Decision Engine**: Canonical source is `services/decision/ScoreEngine.ts`
  - Scoring weights: Financial (25%), Market (20%), Location (15%), Risk (15%), Trust (15%), Liquidity (10%)
  - See `DECISION_ENGINE_SPEC.md` for full spec

- ✅ **Rate Limiting**: 10 requests/minute per user (Decision API)
- ✅ **No Committed Artifacts**: `dist/`, `build/`, `.next/` excluded from git

## Nested Projects

- **soylemesi-bizden-os/** — NestJS microservices (separate concern, consider moving to separate repo)
