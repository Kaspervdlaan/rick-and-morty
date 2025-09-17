const LocationCard = ({ location, onClick }) => {
  return (
    <div
      onClick={() => onClick(location)}
      className="flex items-center px-4 w-80 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-100"
    >
      {/* Info */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 truncate">{location.name}</h3>
        <p className="text-xs text-gray-600">Type: {location.type || "Unknown"}</p>
        <p className="text-xs text-gray-600">Dimension: {location.dimension || "Unknown"}</p>

        <span
          className="inline-block mt-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700"
        >
          Residents: {location.residents?.length ?? 0}
        </span>
      </div>
    </div>
  );
};

export default LocationCard;
