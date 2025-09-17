import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/models/Modal";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [isLocationModalOpen, setLocationModalOpen] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await axios.get("https://rickandmortyapi.com/api/location");
      setLocations(response.data.results);
    };
    fetchLocations();
  }, []);

  return (
    <>
      <div>
        <h1>Locations Page</h1>
        {locations.map((location) => (
          <div key={location.id}>
            <h2>{location.name}</h2>
            <p>{location.type}</p>
            <p>{location.dimension}</p>
          </div>
        ))}
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