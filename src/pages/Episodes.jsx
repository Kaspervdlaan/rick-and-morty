import { useEffect, useState } from "react";
import axios from "axios";

import EpisodeCard from "../components/cards/EpisodeCard";
import Loading from "../components/utils/Loading"; // ✅ new import

import { useNavigate } from "react-router";

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);

  const navigate = useNavigate();

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
      <div className="flex flex-wrap gap-4 justify-center">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} onClick={() => {navigate(`/episodes/${episode.id}`)}} />
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
    </>
  );
};

export default Episodes;
