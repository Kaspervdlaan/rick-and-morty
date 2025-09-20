// src/pages/EpisodeDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/utils/Loading';
import CharacterCard from '../components/cards/CharacterCard';
import Modal from '../components/models/Modal';
import CharacterDetails from '../components/models/CharacterDetails';

const API_BASE = "https://rickandmortyapi.com/api/";

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
        const res = await fetch(`${API_BASE}/episode/${id}`);
        if (!res.ok) throw new Error('Failed to fetch episode');
        const data = await res.json();
        setEpisode(data);

        // Fetch character data
        if (data.characters?.length) {
          setCharactersLoading(true);
          const charIds = data.characters.map(url => url.split('/').pop());
          const charRes = await fetch(`${API_BASE}/character/${charIds.join(',')}`);
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
      <div className="flex flex-col max-w-[90vw] w-full items-start">
        <div className="flex flex-col gap-2 px-6 pb-3">
          <div>
            <h1 className="text-2xl font-bold text-white">{episode.name}</h1>
          </div>
          <div className="flex flex-col">
            <div className="text-gray-200 text-sm">
              <span className="font-semibold">Air Date:</span> {episode.air_date || 'Unknown'}
            </div>
            <div className="text-gray-200">
              <span className="font-semibold text-sm">Episode Code:</span> {episode.episode || 'Unknown'}
            </div>
          </div>

          <span className="font-semibold text-white">
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
          <div className="flex flex-wrap gap-2 justify-center">
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
