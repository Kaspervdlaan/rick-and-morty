import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import LocationCard from "../components/cards/LocationCard";
import Loading from "../components/utils/Loading";
import FilterBar from "../components/utils/FilterBar";

const LOCATION_FILTER_META = {
  type: { label: "Type", type: "text" },
  dimension: { label: "Dimension", type: "text" },
};

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
        if (page === 1) {
          // Reset when filters change or first load
          setLocations(res.data.results || []);
        } else {
          // Append when scrolling
          setLocations((prev) => [...prev, ...(res.data.results || [])]);
        }
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
    setPage(1);
  };

  const clearFilters = () => {
    const empty = { name: "", type: "", dimension: "" };
    setFilterDraft(empty);
    setFilters(empty);
    setPage(1);
  };

  const navigate = useNavigate();

  // IntersectionObserver for infinite scroll
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageInfo?.next) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, pageInfo]
  );

  return (
    <div className="flex flex-col items-start">
      <FilterBar
        filterMeta={LOCATION_FILTER_META}
        filterDraft={filterDraft}
        setFilterDraft={setFilterDraft}
        onApply={applyFilters}
        onClear={clearFilters}
        mainField={{ key: "name", placeholder: "e.g. Earth" }}
      />

      {errorMsg && (
        <div className="flex justify-center mb-4">
          <div className="text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded px-3 py-2">
            {errorMsg}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center max-h-[75vh] overflow-y-auto w-full">
        {locations.map((location, index) => {
          // attach observer to the last card
          if (index === locations.length - 1) {
            return (
              <div ref={lastElementRef} key={location.id}>
                <LocationCard
                  location={location}
                  onClick={() => navigate(`/locations/${location.id}`)}
                />
              </div>
            );
          }
          return (
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => navigate(`/locations/${location.id}`)}
            />
          );
        })}
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Locations;
