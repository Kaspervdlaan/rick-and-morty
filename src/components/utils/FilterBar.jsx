import { useEffect, useMemo, useRef, useState } from "react";
import FilterChip from "./FilterChip";

const input =
  "h-8 px-2 text-xs border border-gray-300 rounded-md bg-white";
const btn = "cursor-pointer h-8 px-3 text-xs rounded-md transition";

export default function FilterBar({
  filterMeta,
  filterDraft,
  setFilterDraft,
  onApply,
  onClear,
  mainField,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeKeys, setActiveKeys] = useState([]);
  const menuRef = useRef(null);

  // Outside click listener
  useEffect(() => {
    function handler(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const availableKeys = useMemo(() => {
    return Object.keys(filterMeta).filter((k) => !activeKeys.includes(k));
  }, [activeKeys, filterMeta]);

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
      className="mb-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        {mainField && (
          <div className="flex items-center gap-2">
            <input
              className={input + " w-[120px] sm:w-[180px]"}
              placeholder={mainField.placeholder}
              value={filterDraft[mainField.key] || ""}
              onChange={(e) =>
                setFilterDraft((f) => ({
                  ...f,
                  [mainField.key]: e.target.value,
                }))
              }
            />
          </div>
        )}

        <div className="relative flex items-center gap-2" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={
              btn + " border border-gray-300 bg-white hover:bg-gray-50"
            }
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            Filter +
          </button>

          <button
            type="submit"
            className={btn + " bg-blue-light text-white hover:bg-blue-medium"}
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => {
              onClear();
              setActiveKeys([]);
            }}
            className={
              btn + " border border-gray-300 bg-white hover:bg-gray-50"
            }
          >
            Clear
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
                    {filterMeta[k].label}
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

        <div className="flex gap-2 overflow-x-auto whitespace-nowrap max-w-full">
          {activeKeys.map((k) => (
            <div key={k} className="shrink-0">
              <FilterChip
                k={k}
                meta={filterMeta[k]}
                value={filterDraft[k]}
                onChange={(val) =>
                  setFilterDraft((f) => ({ ...f, [k]: val }))
                }
                onRemove={() => removeFilter(k)}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
