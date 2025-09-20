import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import EpisodeCard from "../components/cards/EpisodeCard";
import Loading from "../components/utils/Loading";
import FilterBar from "../components/utils/FilterBar";
import Pagination from "../components/utils/Pagination";

const API_BASE = "https://rickandmortyapi.com/api/episode/";

const EPISODE_FILTER_META = {
  episode: { label: "Episode", type: "text" },
};
const ITEMS_PER_PAGE = 10;

const Episodes = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [filters, setFilters] = useState({ name: "", episode: "" });
  const [filterDraft, setFilterDraft] = useState(filters);

  const apiPage = Math.ceil(page / 2);
  const startIndex = (page % 2 === 0 ? 10 : 0);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(apiPage)); // apiPage not page
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return params.toString();
  }, [apiPage, filters]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const response = await axios.get(`${API_BASE}?${queryString}`);
        setEpisodes(response.data.results || []);
        setPageInfo(response.data.info);
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

  const pagedEpisodes = episodes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col items-start">
      <FilterBar
        filterMeta={EPISODE_FILTER_META}
        filterDraft={filterDraft}
        setFilterDraft={setFilterDraft}
        onApply={(e) => { e.preventDefault(); setFilters(filterDraft); setPage(1); }}
        onClear={() => { setFilters({ name: "", episode: "" }); setPage(1); }}
        mainField={{ key: "name", placeholder: "Pilot ..." }}
      />

      {/* Character grid */}
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {loading ? (
          <Loading subject="characters" />
        ) : errorMsg ? (
          <div className="text-center text-gray-600 text-sm">{errorMsg}</div>
        ) : (
          pagedEpisodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            onClick={() => navigate(`/episodes/${episode.id}`)}
          />
        ))
        )}
      </div>

      {!loading && (
        <Pagination
          page={page}
          pageInfo={{ ...pageInfo, pages: pageInfo ? pageInfo.pages * 2 : 0 }}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default Episodes;