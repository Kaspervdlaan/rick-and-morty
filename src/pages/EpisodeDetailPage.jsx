// src/pages/EpisodeDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/utils/Loading';
import CharacterCard from '../components/cards/CharacterCard';
import Modal from '../components/models/Modal';
import CharacterDetails from '../components/models/CharacterDetails';

const EpisodeDetailPage = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isCharacterModalOpen, setCharacterModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        if (!res.ok) throw new Error('Failed to fetch episode');
        const data = await res.json();
        setEpisode(data);

        // Fetch character data
        if (data.characters?.length) {
          setCharactersLoading(true);
          const charIds = data.characters.map(url => url.split('/').pop());
          const charRes = await fetch(
            `https://rickandmortyapi.com/api/character/${charIds.join(',')}`
          );
          if (!charRes.ok) throw new Error('Failed to fetch characters');
          const charData = await charRes.json();
          setCharacters(Array.isArray(charData) ? charData : [charData]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setCharactersLoading(false);
      }
    };
    fetchEpisode();
  }, [id]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setCharacterModalOpen(true);
  };

  if (loading) return <Loading subject="episode details" />;

  if (error)
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;

  return (
    <>
      <div className="flex flex-col max-w-[90vw] items-start">
        <div className="flex flex-col gap-2 p-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{episode.name}</h1>
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-gray-300">
              <span className="font-semibold">Air Date:</span> {episode.air_date || 'Unknown'}
            </div>
            <div className="text-gray-300">
              <span className="font-semibold">Episode Code:</span> {episode.episode || 'Unknown'}
            </div>
          </div>

          <span className="font-semibold">
            Characters ({charactersLoading ? 'loading…' : characters.length}):
          </span>
        </div>

        {charactersLoading ? (
          <div className="py-4">
            <Loading subject="characters" />
          </div>
        ) : characters.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">No known characters.</p>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-[60vh] justify-center overflow-y-auto">
            {characters.map(character => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={handleCharacterClick}
              />
            ))}
          </div>
        )}
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

export default EpisodeDetailPage;
