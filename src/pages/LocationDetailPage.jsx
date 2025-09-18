// src/pages/LocationDetailPage.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/utils/Loading';
import CharacterCard from '../components/cards/CharacterCard';
import Modal from '../components/models/Modal';
import CharacterDetails from '../components/models/CharacterDetails';

const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
};

const LocationDetailPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [residentsLoading, setResidentsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isCharacterModalOpen, setCharacterModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Precompute resident IDs from URLs once location is available
  const residentIds = useMemo(() => {
    if (!location?.residents?.length) return [];
    return location.residents
      .map(url => url.split('/').pop())
      .filter(Boolean);
  }, [location]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
        if (!res.ok) throw new Error('Failed to fetch location');
        const data = await res.json();
        setLocation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, [id]);

  useEffect(() => {
    const fetchResidents = async () => {
      if (!residentIds.length) {
        setResidents([]);
        return;
      }

      try {
        setResidentsLoading(true);
        // API supports multiple IDs; batch to keep URLs reasonable
        const batches = chunk(residentIds, 20);
        const responses = await Promise.all(
          batches.map(ids =>
            fetch(`https://rickandmortyapi.com/api/character/${ids.join(',')}`)
          )
        );

        for (const r of responses) {
          if (!r.ok) throw new Error('Failed to fetch residents');
        }

        const jsons = await Promise.all(responses.map(r => r.json()));

        // Each batch returns either an array (many) or an object (single)
        const flattened = jsons.flatMap(j => (Array.isArray(j) ? j : [j]));
        setResidents(flattened);
      } catch (err) {
        setError(err.message);
      } finally {
        setResidentsLoading(false);
      }
    };

    fetchResidents();
  }, [residentIds]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setCharacterModalOpen(true);
  };

  if (loading) return <Loading subject="location details" />;

  if (error)
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;

  return (
    <>
        <div className='flex flex-col max-w-[90vw] w-full items-start'>
          <div className='flex flex-col gap-2 px-6 pb-3'>
            <div>
              <h1 className="text-2xl font-bold text-white">{location.name}</h1>
            </div>
            <div className='flex flex-col'>
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
            <div className="flex flex-wrap gap-2 max-h-[60vh] justify-center overflow-y-auto">
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
