import {sliceString} from "../../utils/sliceString";

const CharacterCard = ({ character, onClick }) => {
  return (
    <div
      key={character.id}
      onClick={() => onClick(character)}
      className={`flex items-center h-[110px] px-4 py-2 w-60 rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-100 cursor-pointer ${
            character.status === "Alive"
              ? "bg-green-300"
              : character.status === "Dead"
              ? "bg-red-300"
              : "bg-gray-300"
          }`}
    >
      {/* Image */}
      <img
        src={character.image}
        alt={character.name}
        className="w-20 h-20 rounded-full border-2 border-gray-200 object-cover"
      />

      {/* Info */}
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-900 truncate">{sliceString(character.name, 16)}</h3>
        <p className="text-xs text-gray-600">{sliceString(character.species, 13)}</p>

        <span
          className={`inline-block mt-1 text-[10px] font-semibold px-2 py-1 rounded-full ${
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
