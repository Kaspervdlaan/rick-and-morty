import { useEffect, useState } from "react";
import axios from "axios";

import Modal from "../components/models/Modal";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/location?page=${page}`
        );
        setLocations(response.data.results);
        setPageInfo(response.data.info);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, [page]);

  return (
    <>
      <div>
        <h1>Locations Page</h1>
        {locations.map((location) => (
          <div key={location.id} className="border-b border-gray-200 py-2">
            <h2 className="font-bold">{location.name}</h2>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={!pageInfo?.prev}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {pageInfo?.pages || "?"}
        </span>
        <button
          disabled={!pageInfo?.next}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={isLocationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      >
        Location Details
      </Modal>
    </>
  );
};

export default Locations;
