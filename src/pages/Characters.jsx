import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/models/Modal";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isCharacterModalOpen, setCharacterModalOpen] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get("https://rickandmortyapi.com/api/character");
      setCharacters(response.data.results);
    };
    fetchCharacters();
  }, []);

  return (
    <>
    <div>
      <h1>Characters Page</h1>
      {characters.map((character) => (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
        </div>
      ))}
    </div>
    
    <Modal 
      isOpen={isCharacterModalOpen}
      onClose={() => setCharacterModalOpen(false)}
    >
      Character Details
    </Modal>
    </>
  );
};

export default Characters;