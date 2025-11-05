import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div
      className={`flex justify-center min-h-64 items-center gap-2 flex-wrap ${className}`}
      style={{ marginTop: "24px" }} // ✅ Inline margin
    >
      {/* Prev Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        style={{ padding: "8px 12px" }} // ✅ Inline padding
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="text-gray-500 px-2">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => handlePageClick(p)}
            className={`rounded text-sm transition ${
              currentPage === p
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            style={{ padding: "8px 12px" }} // ✅ Inline padding
          >
            {p}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        style={{ padding: "8px 12px" }} // ✅ Inline padding
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
