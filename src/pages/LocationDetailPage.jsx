import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Loading from '../components/utils/Loading';
import CharacterCard from '../components/cards/CharacterCard';
import Modal from '../components/models/Modal';
import CharacterDetails from '../components/models/CharacterDetails';

const API_BASE = "https://rickandmortyapi.com/api/";

const LocationDetailPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [residentsLoading, setResidentsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isCharacterModalOpen, setCharacterModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/location/${id}`);
        if (!res.ok) throw new Error('Failed to fetch location');
        const data = await res.json();
        setLocation(data);

        // Fetch resident data (same style as EpisodeDetailPage)
        if (data.residents?.length) {
          setResidentsLoading(true);
          const residentIds = data.residents.map(url => url.split('/').pop());
          const resRes = await fetch(`${API_BASE}/character/${residentIds.join(',')}`);
          if (!resRes.ok) throw new Error('Failed to fetch residents');
          const resData = await resRes.json();
          setResidents(Array.isArray(resData) ? resData : [resData]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setResidentsLoading(false);
      }
    };
    fetchLocation();
  }, [id]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setCharacterModalOpen(true);
  };

  if (loading) return <Loading subject="location details" />;

  if (error)
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;

  return (
    <>
      <div className="flex flex-col max-w-[90vw] w-full items-start">
        <div className="flex flex-col gap-2 px-6 pb-3">
          <div>
            <h1 className="text-2xl font-bold text-white">{location.name}</h1>
          </div>
          <div className="flex flex-col">
            <div className="text-gray-300">
              <span className="font-semibold">Type:</span> {location.type || 'Unknown'}
            </div>
            <div className="text-gray-300">
              <span className="font-semibold">Dimension:</span> {location.dimension || 'Unknown'}
            </div>
          </div>

          <span className="font-semibold text-white">
            Residents ({residentsLoading ? 'loading…' : residents.length}):
          </span>
        </div>

        {residentsLoading ? (
          <div className="py-4">
            <Loading subject="residents" />
          </div>
        ) : residents.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">No known residents.</p>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {residents.map((character) => (
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

export default LocationDetailPage;
