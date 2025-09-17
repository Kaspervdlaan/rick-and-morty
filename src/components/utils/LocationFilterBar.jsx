export function LocationFilterBar({ filterDraft, setFilterDraft, onApply, onClear }) {
    const inputClass =
    "h-9 px-2 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
    const labelClass = "text-xs font-medium text-gray-600 mb-1";
  
  return (
    <form
      onSubmit={onApply}
      className="max-w-[90vw] mb-4 border border-gray-200 rounded-xl bg-white/80 backdrop-blur px-2 py-2"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 items-end">
        {/* Name */}
        <div className="flex flex-col">
          <label className={labelClass}>Name</label>
          <input
            className={inputClass}
            placeholder="e.g. Earth"
            value={filterDraft.name}
            onChange={(e) =>
              setFilterDraft((f) => ({ ...f, name: e.target.value }))
            }
          />
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <label className={labelClass}>Type</label>
          <input
            className={inputClass}
            placeholder="e.g. Planet"
            value={filterDraft.type}
            onChange={(e) =>
              setFilterDraft((f) => ({ ...f, type: e.target.value }))
            }
          />
        </div>

        {/* Dimension */}
        <div className="flex flex-col">
          <label className={labelClass}>Dimension</label>
          <input
            className={inputClass}
            placeholder="e.g. C-137"
            value={filterDraft.dimension}
            onChange={(e) =>
              setFilterDraft((f) => ({ ...f, dimension: e.target.value }))
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-start sm:justify-end lg:justify-start">
          <button
            type="submit"
            className="h-9 px-3 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={onClear}
            className="h-9 px-3 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}
