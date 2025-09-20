import { sliceString } from "../../utils/sliceString";

const getCharactersBg = (count) => {
  if (count > 30) return "bg-purple-light"; 
  if (count > 20) return "bg-blue-light";   
  if (count > 0) return "bg-green-light";   
  return "bg-gray-300";                   
};

const EpisodeCard = ({ episode, onClick }) => {
  const charactersCount = episode.characters?.length ?? 0;
  const charactersBg = getCharactersBg(charactersCount);

  return (
    <div
      onClick={() => onClick(episode)}
      className="flex items-center h-[110px] px-4 w-80 md:w-60 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-100"
    >
      <div className="p-4 w-full">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {sliceString(episode.name, 24)}
        </h3>
        <p className="text-xs text-gray-600">Air Date: {episode.air_date}</p>

        <div className="flex items-center justify-between">
          <span
            className={`inline-block mt-1 text-[10px] font-semibold ${charactersBg} px-2 py-1 rounded-full text-gray-700`}
          >
            Characters: {charactersCount}
          </span>
          <p className="text-xs text-gray-600">{episode.episode}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
