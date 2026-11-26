import { useEffect, useState } from "react";

const STORAGE_KEY = "show-finder:search-history";
const MAX_ITEMS = 8;

function readStoredHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
    return [];
  } catch {
    return [];
  }
}

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(readStoredHistory);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
    }
  }, [history]);

  function addSearch(term: string) {
    const trimmed = term.trim();
    if (trimmed === "") {
      return;
    }
    setHistory((previous) => {
      const withoutDuplicate = previous.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase()
      );
      return [trimmed, ...withoutDuplicate].slice(0, MAX_ITEMS);
    });
  }

  function removeSearch(term: string) {
    setHistory((previous) => previous.filter((item) => item !== term));
  }

  function clearHistory() {
    setHistory([]);
  }

  return { history, addSearch, removeSearch, clearHistory };
}
