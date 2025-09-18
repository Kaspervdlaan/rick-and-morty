import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Modal from "../components/models/Modal";
import CharacterDetails from "../components/models/CharacterDetails";
import CharacterCard from "../components/cards/CharacterCard";
import Loading from "../components/utils/Loading";
import Pagination from "../components/utils/Pagination";
import CharacterFilterBar from "../components/utils/CharacterFilterBar";

const API_BASE = "https://rickandmortyapi.com/api/character/";

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
    setFilters(filterDraft);
    setPage(1);
  };

  const clearFilters = () => {
    const cleared = { name: "", status: "", species: "", type: "", gender: "" };
    setFilterDraft(cleared);
    setFilters(cleared);
    setPage(1);
  };

  return (
    <div className="flex flex-col items-start">
      <CharacterFilterBar
        filterDraft={filterDraft}
        setFilterDraft={setFilterDraft}
        onApply={applyFilters}
        onClear={clearFilters}
      />

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
        <Pagination page={page} pageInfo={pageInfo} setPage={setPage} />
      )}

      {/* Modal */}
      <Modal
        isOpen={isCharacterModalOpen}
        onClose={() => setCharacterModalOpen(false)}
      >
        <CharacterDetails character={selectedCharacter} />
      </Modal>
    </div>
  );
};

export default Characters;
