import { Route, Routes, useLocation } from "react-router"

import Characters from "./pages/Characters"
import Episodes from "./pages/Episodes"
import Locations from "./pages/Locations"
import Header from "./components/Header"
import Wrapper from "./components/utils/Wrapper"
import EpisodeDetailPage from "./pages/EpisodeDetailPage"
import LocationDetailPage from "./pages/LocationDetailPage"

const App = () => {
  const location = useLocation();

  const backgrounds = {
    "/": "bg-[url('./assets/bgrick.png')] bg-cover bg-center bg-no-repeat",
    "/episodes": "bg-[url('./assets/bgrick.png')] bg-cover bg-center bg-no-repeat",
    "/locations": "bg-[url('./assets/bgstars.png')]",
  }

  return (
    <div className={`min-h-[100dvh] flex justify-center ${backgrounds[location.pathname] || 'bg-[url(\'./assets/bgstars.png\')]'} `}>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetailPage />} />
        </Routes>
      </Wrapper>
    </div>
  )
}

export default App
