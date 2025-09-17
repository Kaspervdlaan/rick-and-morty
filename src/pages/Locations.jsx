import { useEffect, useState } from "react";
import axios from "axios";

import LocationCard from "../components/cards/LocationCard";
import Loading from "../components/utils/Loading";

import { useNavigate } from "react-router";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://rickandmortyapi.com/api/location?page=${page}`
        );
        setLocations(response.data.results);
        setPageInfo(response.data.info);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, [page]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center py-10">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => navigate(`/locations/${location.id}`)}
            />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={!pageInfo?.prev || loading}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {pageInfo?.pages || "?"}
        </span>
        <button
          disabled={!pageInfo?.next || loading}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Locations;
