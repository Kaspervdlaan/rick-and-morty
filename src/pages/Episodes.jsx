import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import EpisodeCard from "../components/cards/EpisodeCard";
import Loading from "../components/utils/Loading"; // ✅ new import
import Pagination from "../components/utils/Pagination";
import FilterBar from "../components/utils/FilterBar";

import { useNavigate } from "react-router";

const EPISODE_FILTER_META = {
  episode: { label: "Episode Code", type: "text" },
};

const ITEMS_PER_PAGE = 10; // ✅ only show 10 per page

const Episodes = () => {
  const navigate = useNavigate();

  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const API_BASE = "https://rickandmortyapi.com/api/episode/";

  const startIndex = (page % 2 === 0 ? 10 : 0);
  const pagedEpisodes = episodes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
    setPage(1);
  };

  const clearFilters = () => {
    setFilterDraft({ name: "", episode: "" });
    setFilters({ name: "", episode: "" });
    setPage(1);
  };


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
    <div className="flex flex-col items-start h-[calc(100dvh-120px)]">
      <FilterBar
        filterMeta={EPISODE_FILTER_META}
        filterDraft={filterDraft}
        setFilterDraft={setFilterDraft}
        onApply={applyFilters}
        onClear={clearFilters}
        mainField={{ key: "name", placeholder: "e.g. Pilot" }}
      />

      <div className="flex flex-wrap gap-4 justify-center max-h-[70dvh] overflow-y-auto w-full">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} onClick={() => {navigate(`/episodes/${episode.id}`)}} />
        ))}
      </div>

      {!loading && (
        <Pagination page={page} pageInfo={pageInfo} setPage={setPage} />
      )}
    </div>
  );
};

export default Episodes;
