// EpisodeFilterBarCompact.jsx
import { useEffect, useMemo, useRef, useState } from "react";

const input = "h-8 px-2 text-xs border border-gray-300 rounded-md bg-white";
const btn = "h-8 px-3 text-xs rounded-md transition";
const iconBtn = "h-6 w-6 inline-flex items-center justify-center rounded hover:bg-gray-100";

// Define filter metadata
const EPISODE_FILTER_META = {
  episode: { label: "Episode Code", type: "text" },
};

export default function EpisodeFilterBar({
  filterDraft,
  setFilterDraft,
  onApply,
  onClear,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeKeys, setActiveKeys] = useState([]); // e.g. ["episode","season"]
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handler(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const availableKeys = useMemo(() => {
    return Object.keys(EPISODE_FILTER_META).filter((k) => !activeKeys.includes(k));
  }, [activeKeys]);

  function addFilter(k) {
    setActiveKeys((keys) => [...keys, k]);
    setMenuOpen(false);
  }

  function removeFilter(k) {
    setActiveKeys((keys) => keys.filter((x) => x !== k));
    setFilterDraft((f) => ({ ...f, [k]: "" }));
  }

  return (
    <form
      onSubmit={onApply}
      className="max-w-[90vw] mb-4 rounded-xl px-3 mx-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        {/* Name (always visible) */}
        <div className="flex items-center gap-2">
          <input
            className={input + " w-[180px] sm:w-[220px]"}
            placeholder="e.g. Pilot"
            value={filterDraft.name}
            onChange={(e) =>
              setFilterDraft((f) => ({ ...f, name: e.target.value }))
            }
          />
        </div>

        {/* Add Filters */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={btn + " border border-gray-300 bg-white hover:bg-gray-50"}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            Filters +
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="absolute z-20 mt-1 w-44 rounded-md border border-gray-200 bg-white p-1 shadow-lg"
            >
              {availableKeys.length ? (
                availableKeys.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => addFilter(k)}
                    className="w-full text-left px-2 py-1 text-xs rounded hover:bg-gray-100"
                    role="menuitem"
                  >
                    {EPISODE_FILTER_META[k].label}
                  </button>
                ))
              ) : (
                <div className="px-2 py-1 text-xs text-gray-500">
                  No more filters
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active filter pills */}
        <div className="flex flex-wrap gap-2">
          {activeKeys.map((k) => (
            <EpisodeFilterPill
              key={k}
              k={k}
              value={filterDraft[k]}
              onChange={(val) =>
                setFilterDraft((f) => ({ ...f, [k]: val }))
              }
              onRemove={() => removeFilter(k)}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="submit"
            className={btn + " bg-indigo-600 text-white hover:bg-indigo-700"}
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => {
              onClear();
              setActiveKeys([]);
            }}
            className={btn + " border border-gray-300 bg-white hover:bg-gray-50"}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}

function EpisodeFilterPill({ k, value, onChange, onRemove }) {
  const meta = EPISODE_FILTER_META[k];

  return (
    <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2 ">
      <span className="text-[11px] font-medium text-gray-600">
        {meta.label}
      </span>

      {/* Select */}
      {meta.type === "select" && (
        <select
          className={input + " h-6 text-[11px] px-1"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {meta.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt || "Any"}
            </option>
          ))}
        </select>
      )}

      {/* Text input */}
      {meta.type === "text" && (
        <input
          className={input + " h-6 text-[11px] px-1 w-28"}
          placeholder={`Enter ${meta.label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${meta.label}`}
        className={iconBtn}
        title="Remove"
      >
        ×
      </button>
    </div>
  );
}
