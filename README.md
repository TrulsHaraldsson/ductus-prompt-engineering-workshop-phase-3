# Meme-Tinder

Tinder but for memes

A proof of concept that workshop teams fork and extend. It is an npm workspaces monorepo:

- `backend/`: Express + TypeScript API on port 3000. Serves the seed memes (original SVGs in `backend/assets/memes`).
- `frontend/`: React + Vite + TypeScript on port 5173. The dev server proxies `/api` to the backend.

## Requirements

- Node.js 22 or newer (see `.nvmrc`; run `nvm use` if you use nvm)
- npm 10 or newer

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173 to see a meme.

## Commands

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Starts backend and frontend in watch mode     |
| `npm test`      | Runs all backend and frontend tests           |
| `npm run build` | Builds both workspaces                        |
