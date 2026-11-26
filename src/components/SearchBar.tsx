import { useState } from "react";
import type { FormEvent } from "react";

interface SearchBarProps {
  initialValue: string;
  onSearch: (term: string) => void;
  onBrowse: () => void;
}

export default function SearchBar({ initialValue, onSearch, onBrowse }: SearchBarProps) {
  const [term, setTerm] = useState<string>(initialValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = term.trim();
    if (trimmed === "") {
      return;
    }
    onSearch(trimmed);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className="search-input"
        placeholder="Search TV shows (e.g. Breaking Bad, Office, Arcane)"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        aria-label="Search TV shows"
      />
      <button type="submit" className="btn btn-primary" disabled={term.trim() === ""}>
        Search
      </button>
      <button type="button" className="btn btn-secondary" onClick={onBrowse}>
        Browse catalog
      </button>
    </form>
  );
}
