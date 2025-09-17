import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/models/Modal";
import CharacterDetails from "../components/models/CharacterDetails";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isCharacterModalOpen, setCharacterModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

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
        <div key={character.id} onClick={() => {
          setSelectedCharacter(character);
          setCharacterModalOpen(true);
        }}>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
        </div>
      ))}
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