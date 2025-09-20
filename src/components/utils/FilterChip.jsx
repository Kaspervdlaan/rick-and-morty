const input =
  "h-8 px-2 text-xs border border-gray-300 rounded-md bg-white";
const iconBtn =
  "h-6 w-6 inline-flex items-center justify-center rounded hover:bg-gray-100";

export default function FilterChip({ k, meta, value, onChange, onRemove }) {
  return (
    <div key={meta.label} className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2">
      <span className="text-[11px] text-gray-600">
        {meta.label}
      </span>

      {meta.type === "select" && (
        <select
          className="h-[30px] text-[11px] px-1"
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

      {meta.type === "text" && (
        <input
          className={input + " text-[11px] px-1"}
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
