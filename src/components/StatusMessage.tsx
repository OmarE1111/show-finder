interface StatusMessageProps {
  kind: "loading" | "error" | "empty" | "info";
  message: string;
}

export default function StatusMessage({ kind, message }: StatusMessageProps) {
  return (
    <div className={`status status-${kind}`} role="status">
      {kind === "loading" && <span className="spinner" aria-hidden="true" />}
      <p>{message}</p>
    </div>
  );
}
