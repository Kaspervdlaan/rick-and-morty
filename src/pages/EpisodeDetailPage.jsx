import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/utils/Loading';
import CharacterCard from '../components/cards/CharacterCard'; // import your card
import Modal from '../components/models/Modal';
import CharacterDetails from '../components/models/CharacterDetails';

const EpisodeDetailPage = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const charIds = data.characters.map(url => url.split('/').pop());
        const charRes = await fetch(
          `https://rickandmortyapi.com/api/character/${charIds.join(',')}`
        );
        if (!charRes.ok) throw new Error('Failed to fetch characters');
        const charData = await charRes.json();
        setCharacters(Array.isArray(charData) ? charData : [charData]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisode();
  }, [id]);

  const handleCharacterClick = (character) => {
    // For example, navigate to character detail page if you have routing
    setSelectedCharacter(character);
    setCharacterModalOpen(true);
    console.log('Clicked character:', character);
  };

  if (loading) return <Loading subject="episode details" />;

  if (error)
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;

  return (
    <>  
      <div className="flex flex-col gap-2 px-6">
        <div className='flex flex-row gap-4 items-end'>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{episode.name}</h1>

            <div className="text-gray-700">
              <span className="font-semibold">ID:</span> {episode.id}
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">Air Date:</span> {episode.air_date}
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">Episode Code:</span> {episode.episode}
            </div>
          </div>
          {/* <div>
            <div className="text-gray-700">
              <span cla   sName="font-semibold">URL:</span>{' '}
              <a
                href={episode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {episode.url}
              </a>
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">Created:</span>{' '}
              {new Date(episode.created).toLocaleString()}
            </div>
          </div> */}
        </div>

        <div className="text-gray-700">
          <span className="font-semibold">Characters ({characters.length}):</span>
          <div className="flex flex-wrap gap-2">
            {characters.map(character => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={handleCharacterClick}
              />
            ))}
          </div>
        </div>
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
