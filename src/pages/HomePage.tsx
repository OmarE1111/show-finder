import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import ShowCard from "../components/ShowCard";
import Pagination from "../components/Pagination";
import StatusMessage from "../components/StatusMessage";
import { useFetch } from "../hooks/useFetch";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { buildCatalogUrl, buildSearchUrl } from "../utils/api";
import type { SearchResult, Show } from "../types";

const PAGE_SIZE = 24;
const ALL_GENRES = "All";

export default function HomePage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const mode = params.get("mode") || "";
  const genre = params.get("genre") || ALL_GENRES;
  const requestedPage = Number(params.get("page") || "1");

  const { history, addSearch, removeSearch, clearHistory } = useSearchHistory();

  let searchUrl: string | null = null;
  let catalogUrl: string | null = null;
  if (query !== "") {
    searchUrl = buildSearchUrl(query);
  } else if (mode === "browse") {
    catalogUrl = buildCatalogUrl(0);
  }

  const search = useFetch<SearchResult[]>(searchUrl);
  const catalog = useFetch<Show[]>(catalogUrl);

  let shows: Show[] = [];
  if (search.data) {
    shows = search.data.map((result) => result.show);
  } else if (catalog.data) {
    shows = catalog.data;
  }
  const loading = search.loading || catalog.loading;
  const error = search.error || catalog.error;

  const genreSet = new Set<string>();
  for (const show of shows) {
    for (const g of show.genres) {
      genreSet.add(g);
    }
  }
  const genres = [ALL_GENRES, ...Array.from(genreSet).sort()];

  let filtered = shows;
  if (genre !== ALL_GENRES) {
    filtered = shows.filter((show) => show.genres.includes(genre));
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  let currentPage = requestedPage;
  if (!Number.isInteger(currentPage) || currentPage < 1) {
    currentPage = 1;
  }
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageShows = filtered.slice(start, start + PAGE_SIZE);

  function handleSearch(term: string) {
    addSearch(term);
    setParams({ q: term });
  }

  function handleBrowse() {
    setParams({ mode: "browse" });
  }

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value === null) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next);
  }

  function handleGenreChange(value: string) {
    const next = new URLSearchParams(params);
    if (value === ALL_GENRES) {
      next.delete("genre");
    } else {
      next.set("genre", value);
    }
    next.delete("page");
    setParams(next);
  }

  function handlePageChange(page: number) {
    updateParam("page", String(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const hasRequest = searchUrl !== null || catalogUrl !== null;

  let heading = "";
  if (query !== "") {
    heading = `Results for "${query}"`;
  } else if (mode === "browse") {
    heading = "Catalog";
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Find your next show</h1>
        <p>Search thousands of TV shows or browse the catalog. Click any poster for details.</p>
        <SearchBar key={query} initialValue={query} onSearch={handleSearch} onBrowse={handleBrowse} />
        <SearchHistory history={history} onSelect={handleSearch} onRemove={removeSearch} onClear={clearHistory} />
      </section>

      {!hasRequest && <StatusMessage kind="info" message="Type a show name and hit Search, or browse the catalog." />}
      {loading && <StatusMessage kind="loading" message="Loading shows..." />}
      {error && <StatusMessage kind="error" message={`Could not load shows: ${error}`} />}

      {hasRequest && !loading && !error && (
        <section className="results">
          <div className="results-header">
            <h2>
              {heading} <span className="results-count">({filtered.length})</span>
            </h2>
            {shows.length > 0 && (
              <label className="filter">
                Genre
                <select value={genre} onChange={(event) => handleGenreChange(event.target.value)}>
                  {genres.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {filtered.length === 0 && <StatusMessage kind="empty" message="No shows matched. Try another search or genre." />}

          <div className="grid">
            {pageShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      )}
    </div>
  );
}
