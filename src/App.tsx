import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShowDetailPage from "./pages/ShowDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <Link to="/" className="logo">
          📺 Show Finder
        </Link>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:id" element={<ShowDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        Data from the{" "}
        <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">
          TVMaze API
        </a>
      </footer>
    </div>
  );
}
