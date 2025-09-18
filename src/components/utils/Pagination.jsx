const Pagination = ({ page, pageInfo, setPage }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-4 ml-2 md:ml-6 text-sm">
      <button
        disabled={!pageInfo?.prev}
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        className="h-9 px-3 rounded-md border border-gray-300 bg-white disabled:opacity-50"
      >
        {'<'}
      </button>

      <button
        disabled={!pageInfo?.next}
        onClick={() => setPage((prev) => prev + 1)}
        className="h-9 px-3 rounded-md border border-gray-300 bg-white disabled:opacity-50"
      >
        {'>'}
      </button>

      <span className="text-gray-800">
        {page} of {pageInfo?.pages ?? "?"}
      </span>

    </div>
  );
};

export default Pagination;
