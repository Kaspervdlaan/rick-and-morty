import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/models/Modal";
import CharacterDetails from "../components/models/CharacterDetails";
import CharacterCard from "../components/cards/CharacterCard";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [isCharacterModalOpen, setCharacterModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        setCharacters(response.data.results);
        setPageInfo(response.data.info);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacters();
  }, [page]);

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {characters.map((character) => (
          <CharacterCard 
            key={character.id}
            character={character} 
            onClick={() => {
              setSelectedCharacter(character);
              setCharacterModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={!pageInfo?.prev}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {pageInfo?.pages || "?"}
        </span>
        <button
          disabled={!pageInfo?.next}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

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
