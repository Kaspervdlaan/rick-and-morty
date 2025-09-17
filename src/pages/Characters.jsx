import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Modal from "../components/models/Modal";
import CharacterDetails from "../components/models/CharacterDetails";
import CharacterCard from "../components/cards/CharacterCard";
import Loading from "../components/utils/Loading";

const API_BASE = "https://rickandmortyapi.com/api/character/";

// Options
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

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [isCharacterModalOpen, setCharacterModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });

  const [filterDraft, setFilterDraft] = useState(filters);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return params.toString();
  }, [page, filters]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const response = await axios.get(`${API_BASE}?${queryString}`);
        setCharacters(response.data.results);
        setPageInfo(response.data.info);
      } catch (error) {
        if (error?.response?.status === 404) {
          setCharacters([]);
          setPageInfo({ count: 0, pages: 0, next: null, prev: null });
          setErrorMsg("No characters match your filters.");
        } else {
          console.error("Error fetching characters:", error);
          setErrorMsg("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [queryString]);

  const applyFilters = (e) => {
    e?.preventDefault?.();
    setPage(1);
    setFilters(filterDraft);
  };

  const clearFilters = () => {
    const cleared = { name: "", status: "", species: "", type: "", gender: "" };
    setFilterDraft(cleared);
    setFilters(cleared);
    setPage(1);
  };

  return (
    <>
      {/* Compact Filter Bar */}
      <form
        onSubmit={applyFilters}
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

          {/* Buttons (compact) */}
          <div className="flex gap-2 justify-start sm:justify-end lg:justify-start">
            <button
              type="submit"
              className="h-9 px-3 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="h-9 px-3 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {/* Character grid */}
      <div className="flex flex-wrap gap-4 justify-center min-h-[200px]">
        {loading ? (
          <Loading subject="characters" />
        ) : errorMsg ? (
          <div className="text-center text-gray-600 text-sm">{errorMsg}</div>
        ) : (
          characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => {
                setSelectedCharacter(character);
                setCharacterModalOpen(true);
              }}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-center items-center gap-3 mt-4 text-sm">
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
      )}

      {/* Modal */}
      <Modal
        isOpen={isCharacterModalOpen}
        onClose={() => setCharacterModalOpen(false)}
      >
        <CharacterDetails character={selectedCharacter} />
      </Modal>
    </>
  );
};

export default Characters;
