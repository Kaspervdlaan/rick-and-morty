const CharacterCard = ({ character, onClick }) => {
  return (
    <div
      onClick={() => onClick(character)}
      className="flex items-center p-4 w-80 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      {/* Image */}
        <img
          src={character.image}
          alt={character.name}
          className="w-24 h-24 rounded-full border-2 border-gray-200 object-cover"
        />

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate">{character.name}</h3>
        <p className="text-sm text-gray-600">{character.species}</p>

        <span
          className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full ${
            character.status === "Alive"
              ? "bg-green-100 text-green-700"
              : character.status === "Dead"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {character.status}
        </span>
      </div>
    </div>
  );
};

export default CharacterCard;
