interface SearchHistoryProps {
  history: string[];
  onSelect: (term: string) => void;
  onRemove: (term: string) => void;
  onClear: () => void;
}

export default function SearchHistory({ history, onSelect, onRemove, onClear }: SearchHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="history">
      <span className="history-label">Recent:</span>
      {history.map((term) => (
        <span key={term} className="chip">
          <button type="button" className="chip-text" onClick={() => onSelect(term)}>
            {term}
          </button>
          <button
            type="button"
            className="chip-remove"
            onClick={() => onRemove(term)}
            aria-label={`Remove ${term} from history`}
          >
            ×
          </button>
        </span>
      ))}
      <button type="button" className="link-button" onClick={onClear}>
        Clear
      </button>
    </div>
  );
}
