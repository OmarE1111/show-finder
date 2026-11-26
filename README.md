# Show Finder

A React + TypeScript app (bootstrapped with Vite) for searching and browsing TV shows with the free [TVMaze API](https://www.tvmaze.com/api).

## Features

- **Controlled search input**: a form submit fetches matching shows (`/search/shows?q=`)
- **Browse catalog** button that fetches the full catalog page (`/shows?page=0`)
- **Detail page** (`/show/:id`) for a single show, with its cast and season count (`/shows/:id?embed[]=cast&embed[]=seasons`)
- **Reusable `useFetch` hook**: uses `fetch()` inside `useEffect`, cancels stale requests with `AbortController`, and handles loading and error states
- **Search history** saved in `localStorage` (click to re-run, × to remove, Clear)
- **Genre filtering** and **pagination** (24 per page), both stored in the URL so the Back button and refreshes keep your place
- **Responsive** grid down to phone width

## Project structure

```
src/
  hooks/useFetch.ts           reusable data-fetching hook
  hooks/useSearchHistory.ts   localStorage-backed history
  components/                 SearchBar, SearchHistory, ShowCard, Pagination, StatusMessage
  pages/                      HomePage, ShowDetailPage, NotFoundPage
  utils/api.ts                URL builders (reads VITE_API_BASE_URL)
  types.ts                    TypeScript types for API responses
```

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

## Environment variables

| Name | Value |
| --- | --- |
| `VITE_API_BASE_URL` | `https://api.tvmaze.com` |

TVMaze needs no API key, so this variable only holds the API's base URL. It shows the `.env` pattern (Vite only exposes variables that start with `VITE_`). `.env` is gitignored.

## Deploy

- **Vercel**: import the GitHub repo, choose the Vite preset, and add `VITE_API_BASE_URL` under Environment Variables. `vercel.json` rewrites every route to `index.html`, so `/show/123` works on refresh.
- **Netlify**: build command `npm run build`, publish directory `dist`. `public/_redirects` handles the same rewrite.
