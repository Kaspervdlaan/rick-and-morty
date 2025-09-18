import { sliceString } from "../../utils/sliceString";

const getResidentsBg = (count) => {
  if (count > 100) return "bg-blue-300";
  if (count > 0) return "bg-green-300";
  return "bg-gray-300";
};

const LocationCard = ({ location, onClick }) => {
  const residentsCount = location.residents?.length ?? 0;
  const residentsBg = getResidentsBg(residentsCount);

  return (
    <div
      onClick={() => onClick(location)}
      className={`flex items-center bg-white h-[110px] px-4 py-1 w-80 md:w-60 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-100`}
    >
      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{sliceString(location.name)}</h3>
        <p className="text-xs text-gray-600">Type: {location.type || "Unknown"}</p>
        {/* <p className="text-xs text-gray-600">Dimension: {location.dimension || "Unknown"}</p> */}

        <span
          className={`inline-block mt-1 text-[10px] font-semibold ${residentsBg} px-2 py-1 rounded-full text-gray-700`}
        >
          Residents: {residentsCount}
        </span>
      </div>
    </div>
  );
};

export default LocationCard;
