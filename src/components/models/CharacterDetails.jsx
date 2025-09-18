import { IoMaleFemaleOutline, IoMaleOutline, IoFemaleOutline } from "react-icons/io5";


const CharacterDetails = ({ character }) => {

  const getGenderIcon = (gender) => {
    if (gender === "Male") return <IoMaleOutline className="inline-block" />;
    if (gender === "Female") return <IoFemaleOutline className="inline-block" />;
    return <IoMaleFemaleOutline className="inline-block" />;
  }

  if (!character) {
    return (
      <div className="text-center text-gray-500">
        No character selected.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto bg-white rounded-2xl overflow-hidden mt-2">
      <div className="flex items-center p-1 space-x-4">
        <img
          src={character.image}
          alt={character.name}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-gray-200 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{character.name}</h2>
          <p className="text-gray-600 text-sm">
            {character.species}
            {character.type ? ` • ${character.type}` : ""} • {character.gender} {getGenderIcon(character.gender)}
          </p>
          <span
            className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded-full ${
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

      <div className="border-b border-green-200"></div>

      {/* Body info */}
      <div className="px-6 pb-6 space-y-1">
        <div>
          <span className="font-semibold text-gray-700">Origin:</span>{" "}
          {character.origin?.name}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Last Known Location:</span>{" "}
          {character.location?.name}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Episodes:</span>{" "}
          {character.episode?.length}
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Created: {new Date(character.created).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
