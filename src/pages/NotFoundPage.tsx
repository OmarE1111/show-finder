import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="status">
      <h1>404</h1>
      <p>That page does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to search
      </Link>
    </div>
  );
}
