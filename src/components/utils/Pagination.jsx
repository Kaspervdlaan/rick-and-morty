const Pagination = ({ page, pageInfo, setPage }) => {
  const totalPages = pageInfo?.pages ?? 1;

  // helper: generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5; // how many page buttons to show around current

    if (totalPages <= maxButtons) {
      // show all
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      pages.push(1); // always show first page
      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages); // always show last page
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex h-8 justify-center items-center gap-2 mt-4 ml-2 md:ml-6 text-sm">
      {/* Prev button */}
      <button
        disabled={page <= 1}
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        className={`${page <= 1 ? "cursor-default" : "cursor-pointer"} h-9 px-3 rounded-md border border-gray-300 bg-white hover:bg-blue-light hover:text-white disabled:opacity-50`}
      >
        {"<"}
      </button>

      {/* Number buttons */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => setPage(p)}
            className={`h-9 px-3 rounded-md cursor-pointer ${
              p === page
                ? "bg-blue-light text-white"
                : "bg-white hover:bg-blue-light hover:text-white"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        disabled={page >= totalPages}
        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        className="cursor-pointer h-9 px-3 rounded-md bg-white hover:bg-blue-light hover:text-white disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
