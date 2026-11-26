import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import { useFetch } from "../hooks/useFetch";
import { buildShowUrl, stripHtml } from "../utils/api";
import type { Show } from "../types";

export default function ShowDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  let url: string | null = null;
  if (id) {
    url = buildShowUrl(id);
  }
  const { data: show, loading, error } = useFetch<Show>(url);

  function handleBack() {
    if (location.key === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  }

  if (loading) {
    return <StatusMessage kind="loading" message="Loading show..." />;
  }
  if (error) {
    return (
      <div className="detail-error">
        <StatusMessage kind="error" message={`Could not load this show: ${error}`} />
        <Link to="/" className="btn btn-secondary">
          Go home
        </Link>
      </div>
    );
  }
  if (!show) {
    return null;
  }

  const cast = show._embedded?.cast || [];
  const seasons = show._embedded?.seasons || [];

  let channel = "Unknown";
  if (show.network) {
    channel = show.network.name;
  } else if (show.webChannel) {
    channel = show.webChannel.name;
  }

  let years = "Unknown";
  if (show.premiered) {
    years = show.premiered.slice(0, 4);
    if (show.ended) {
      years = `${years} – ${show.ended.slice(0, 4)}`;
    } else if (show.status === "Running") {
      years = `${years} – present`;
    }
  }

  let rating = "N/A";
  if (show.rating.average !== null) {
    rating = `${show.rating.average.toFixed(1)} / 10`;
  }

  let runtime = "N/A";
  if (show.runtime !== null) {
    runtime = `${show.runtime} min`;
  }

  const facts: { label: string; value: string }[] = [
    { label: "Rating", value: rating },
    { label: "Years", value: years },
    { label: "Status", value: show.status },
    { label: "Network", value: channel },
    { label: "Runtime", value: runtime },
    { label: "Language", value: show.language || "N/A" },
    { label: "Seasons", value: String(seasons.length) },
  ];

  return (
    <article className="detail">
      <button type="button" className="btn btn-secondary back-button" onClick={handleBack}>
        ‹ Back
      </button>

      <div className="detail-main">
        {show.image && <img className="detail-poster" src={show.image.original} alt={`${show.name} poster`} />}
        {!show.image && <div className="detail-poster card-poster-empty">No image</div>}

        <div className="detail-info">
          <h1>{show.name}</h1>
          <div className="genres">
            {show.genres.map((g) => (
              <span key={g} className="genre-tag">
                {g}
              </span>
            ))}
          </div>

          <dl className="facts">
            {facts.map((fact) => (
              <div key={fact.label} className="fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="summary">{stripHtml(show.summary) || "No summary available."}</p>

          {show.officialSite && (
            <a className="btn btn-primary" href={show.officialSite} target="_blank" rel="noreferrer">
              Official site
            </a>
          )}
        </div>
      </div>

      {cast.length > 0 && (
        <section className="cast">
          <h2>Cast</h2>
          <div className="cast-grid">
            {cast.slice(0, 12).map((member) => (
              <div key={`${member.person.id}-${member.character.id}`} className="cast-card">
                {member.person.image && (
                  <img src={member.person.image.medium} alt={member.person.name} loading="lazy" />
                )}
                {!member.person.image && <div className="cast-photo-empty">?</div>}
                <div className="cast-name">{member.person.name}</div>
                <div className="cast-character">as {member.character.name}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
