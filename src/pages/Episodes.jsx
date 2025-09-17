import { useEffect, useState } from "react";
import axios from "axios";  

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [isEpisodeModalOpen, setEpisodeModalOpen] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await axios.get("https://rickandmortyapi.com/api/episode");
      setEpisodes(response.data.results);
    };
    fetchEpisodes();
  }, []);

  return (
    <>
      <div>
        <h1>Episodes Page</h1>
        {episodes.map((episode) => (
          <div key={episode.id}>
            <h2>{episode.name}</h2>
            <p>Air Date: {episode.air_date}</p>
          </div>
        ))}
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