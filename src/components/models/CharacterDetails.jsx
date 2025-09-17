const CharacterDetails = ({ character }) => {
  if (!character) {
    return <div className="text-center text-gray-500">No character selected.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mt-6">
      <div className="flex items-center space-x-4">
        <img
          src={character.image}
          alt={character.name}
          className="w-24 h-24 rounded-full border-2 border-gray-200"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{character.name}</h2>
          <p className="text-gray-600">{character.species} - {character.status}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div>
          <span className="font-semibold text-gray-700">Gender:</span> {character.gender}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Origin:</span> {character.origin?.name}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Location:</span> {character.location?.name}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Episodes:</span> {character.episode?.length}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;