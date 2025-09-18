const Pagination = ({ page, pageInfo, setPage }) => {
  return (
    <div className="flex justify-center items-center gap-3 mt-4 ml-6 text-sm">
      <button
        disabled={!pageInfo?.prev}
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        className="h-9 px-3 rounded-md border border-gray-300 bg-white disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {page} of {pageInfo?.pages ?? "?"}
      </span>

      <button
        disabled={!pageInfo?.next}
        onClick={() => setPage((prev) => prev + 1)}
        className="h-9 px-3 rounded-md border border-gray-300 bg-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
