import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import EpisodeCard from "../components/cards/EpisodeCard";
import Loading from "../components/utils/Loading"; // ✅ new import

import { useNavigate } from "react-router";
import { EpisodeFilterBar } from "../components/utils/EpisodeFilterBar";

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const API_BASE = "https://rickandmortyapi.com/api/episode/";

  const [filters, setFilters] = useState({
    name: "",
    episode: "",
  });

  const [filterDraft, setFilterDraft] = useState(filters); 
  
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return params.toString();
  }, [page, filters]);

    useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const response = await axios.get(`${API_BASE}?${queryString}`);
        setEpisodes(response.data.results);
      } catch (error) {
        if (error?.response?.status === 404) {
          setEpisodes([]);
          setPageInfo({ count: 0, pages: 0, next: null, prev: null });
          setErrorMsg("No episodes match your filters.");
        } else {
          console.error("Error fetching episodes:", error);
          setErrorMsg("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [queryString]);

  const applyFilters = (e) => {
    e?.preventDefault?.();
    setFilters(filterDraft);
    setPage(1); // Reset to first page when applying new filters
  };

  const clearFilters = () => {
    setFilterDraft({ name: "", episode: "" });
    setFilters({ name: "", episode: "" });
    setPage(1);
  };

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
      <EpisodeFilterBar
        filterDraft={filterDraft}
        setFilterDraft={setFilterDraft}
        onApply={applyFilters}
        onClear={clearFilters}
      />

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
