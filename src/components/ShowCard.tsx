import { Link } from "react-router-dom";
import type { Show } from "../types";

interface ShowCardProps {
  show: Show;
}

export default function ShowCard({ show }: ShowCardProps) {
  let year = "";
  if (show.premiered) {
    year = show.premiered.slice(0, 4);
  }

  let ratingText = "No rating";
  if (show.rating.average !== null) {
    ratingText = `★ ${show.rating.average.toFixed(1)}`;
  }

  return (
    <Link to={`/show/${show.id}`} className="card">
      {show.image && (
        <img className="card-poster" src={show.image.medium} alt={`${show.name} poster`} loading="lazy" />
      )}
      {!show.image && <div className="card-poster card-poster-empty">No image</div>}
      <div className="card-body">
        <h3 className="card-title">{show.name}</h3>
        <div className="card-meta">
          <span>{year}</span>
          <span className="card-rating">{ratingText}</span>
        </div>
      </div>
    </Link>
  );
}
