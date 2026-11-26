
export interface ImageSet {
  medium: string;
  original: string;
}

export interface Show {
  id: number;
  name: string;
  language: string | null;
  genres: string[];
  status: string;
  runtime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  rating: { average: number | null };
  network: { name: string } | null;
  webChannel: { name: string } | null;
  image: ImageSet | null;
  summary: string | null;
  _embedded?: {
    cast?: CastMember[];
    seasons?: Season[];
  };
}

export interface SearchResult {
  score: number;
  show: Show;
}

export interface CastMember {
  person: { id: number; name: string; image: ImageSet | null };
  character: { id: number; name: string; image: ImageSet | null };
}

export interface Season {
  id: number;
  number: number;
  episodeOrder: number | null;
  premiereDate: string | null;
}
