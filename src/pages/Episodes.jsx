import { useEffect, useState } from "react";
import axios from "axios";

import Modal from "../components/models/Modal";

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [isEpisodeModalOpen, setEpisodeModalOpen] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/episode?page=${page}`
        );
        setEpisodes(response.data.results);
        setPageInfo(response.data.info);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };
    fetchEpisodes();
  }, [page]);

  return (
    <>
      <div>
        <h1>Episodes Page</h1>
        {episodes.map((episode) => (
          <div key={episode.id} className="border-b border-gray-200 py-2">
            <h2 className="font-bold">{episode.name}</h2>
            <p>Air Date: {episode.air_date}</p>
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
        isOpen={isEpisodeModalOpen}
        onClose={() => setEpisodeModalOpen(false)}
      >
        Episode Details
      </Modal>
    </>
  );
};

export default Episodes;
