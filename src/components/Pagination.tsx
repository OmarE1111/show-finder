interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "gap")[] {
  const pages: (number | "gap")[] = [];
  for (let page = 1; page <= totalPages; page++) {
    const isEdge = page === 1 || page === totalPages;
    const isNear = Math.abs(page - currentPage) <= 1;
    if (isEdge || isNear) {
      pages.push(page);
    } else if (pages[pages.length - 1] !== "gap") {
      pages.push("gap");
    }
  }
  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="btn btn-secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹ Prev
      </button>

      {getPageNumbers(currentPage, totalPages).map((item, index) => {
        if (item === "gap") {
          return (
            <span key={`gap-${index}`} className="page-gap">
              …
            </span>
          );
        }
        let className = "page-number";
        if (item === currentPage) {
          className = "page-number active";
        }
        return (
          <button key={item} type="button" className={className} onClick={() => onPageChange(item)}>
            {item}
          </button>
        );
      })}

      <button
        type="button"
        className="btn btn-secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next ›
      </button>
    </nav>
  );
}
