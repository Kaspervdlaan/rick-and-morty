const statusOptions = ["", "alive", "dead", "unknown"];
const genderOptions = ["", "female", "male", "genderless", "unknown"];
const speciesOptions = [
  "", 
  "Human",
  "Alien",
  "Humanoid",
  "Poopybutthole",
  "Mythological Creature",
  "Animal",
  "Robot",
  "Cronenberg",
  "Disease",
  "Unknown",
];
const typeOptions = [
  "",
  "Parasite",
  "Superhuman",
  "Clone",
  "Genetic experiment",
  "Cronenberg",
  "Human with Cronenberg head",
];

const inputClass =
  "h-9 px-2 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
const labelClass = "text-xs font-medium text-gray-600 mb-1";

export default function CharacterFilterBar({
  filterDraft,
  setFilterDraft,
  onApply,
  onClear,
}) {
  return (
    <form
      onSubmit={onApply}
      className="max-w-[90vw] mb-4 border border-gray-200 rounded-xl bg-white/80 backdrop-blur px-2 py-2"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 items-end">
        {/* Name */}
        <div className="flex flex-col">
          <label className={labelClass}>Name</label>
          <input
            className={inputClass}
            placeholder="e.g. Rick"
            value={filterDraft.name}
            onChange={(e) =>
              setFilterDraft((f) => ({ ...f, name: e.target.value }))
            }
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className={labelClass}>Status</label>
          <select
            className={inputClass}
            value={filterDraft.status}
            onChange={(e) =>
              setFilterDraft((f) => ({ ...f, status: e.target.value }))
            }
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt || "Any"}
              </option>
            ))}
          </select>
        </div>

        {/* Species */}
        <div className="flex flex-col">
          <label className={labelClass}>Species</label>
          <select
            className={inputClass}
            value={filterDraft.species}
            onChange={(e) =>
              setFilterDraft((f) => ({ ...f, species: e.target.value }))
            }
          >
            {speciesOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt || "Any"}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <label className={labelClass}>Type</label>
          <select
            className={inputClass}
            value={filterDraft.type}
            onChange={(e) =>
              setFilterDraft((f) => ({ ...f, type: e.target.value }))
            }
          >
            {typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt || "Any"}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className={labelClass}>Gender</label>
          <select
            className={inputClass}
            value={filterDraft.gender}
            onChange={(e) =>
              setFilterDraft((f) => ({ ...f, gender: e.target.value }))
            }
          >
            {genderOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt || "Any"}
              </option>
            ))}
          </select>
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
