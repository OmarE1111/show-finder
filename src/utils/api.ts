export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "https://api.tvmaze.com";

export function buildSearchUrl(query: string): string {
  return `${API_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`;
}

export function buildCatalogUrl(apiPage: number): string {
  return `${API_BASE_URL}/shows?page=${apiPage}`;
}

export function buildShowUrl(id: string): string {
  return `${API_BASE_URL}/shows/${encodeURIComponent(id)}?embed[]=cast&embed[]=seasons`;
}

export function stripHtml(html: string | null): string {
  if (!html) {
    return "";
  }
  return html.replace(/<[^>]*>/g, "").trim();
}
