import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import LocationCard from "../components/cards/LocationCard";
import Loading from "../components/utils/Loading";
import { useNavigate } from "react-router";
import { LocationFilterBar } from "../components/utils/LocationFilterBar";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const API_BASE = "https://rickandmortyapi.com/api/location";

  const [filters, setFilters] = useState({
    name: "",
    type: "",
    dimension: "",
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
    const fetchLocations = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await axios.get(`${API_BASE}?${queryString}`);
        setLocations(res.data.results || []);
        setPageInfo(res.data.info || null);
      } catch (error) {
        if (error?.response?.status === 404) {
          setLocations([]);
          setPageInfo({ count: 0, pages: 0, next: null, prev: null });
          setErrorMsg("No locations match your filters.");
        } else {
          console.error("Error fetching locations:", error);
          setErrorMsg("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, [queryString]);

  const applyFilters = (e) => {
    e?.preventDefault?.();
    setFilters(filterDraft);
    setPage(1); // reset to first page on new filters
  };

  const clearFilters = () => {
    const empty = { name: "", type: "", dimension: "" };
    setFilterDraft(empty);
    setFilters(empty);
    setPage(1);
  };

  const navigate = useNavigate();

  return (
    <>
      <LocationFilterBar
        filterDraft={filterDraft}
        setFilterDraft={setFilterDraft}
        onApply={applyFilters}
        onClear={clearFilters}
      />

      {loading ? (
        <div className="flex justify-center py-10">
          <Loading />
        </div>
      ) : (
        <>
          {errorMsg && (
            <div className="flex justify-center mb-4">
              <div className="text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded px-3 py-2">
                {errorMsg}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={() => navigate(`/locations/${location.id}`)}
              />
            ))}
          </div>
        </>
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
          Page {page} of {pageInfo?.pages ?? (locations.length ? 1 : 0)}
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
