import { sliceString } from "../../utils/sliceString";

const EpisodeCard = ({ episode, onClick }) => {
  return (
    <div
      onClick={() => onClick(episode)}
      className="flex items-center px-4 w-80 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-100"
    >
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 truncate">{sliceString(episode.name)}</h3>
        <p className="text-xs text-gray-600">Air Date: {episode.air_date}</p>
        <p className="text-xs text-gray-600">Episode: {episode.episode}</p>

        <span
          className="inline-block mt-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700"
        >
          Characters: {episode.characters.length}
        </span>
      </div>
    </div>
  );
};

export default EpisodeCard;
