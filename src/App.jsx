import { Route, Routes } from "react-router"

import Characters from "./pages/Characters"
import Episodes from "./pages/Episodes"
import Locations from "./pages/Locations"
import Header from "./components/Header"
import Wrapper from "./components/utils/Wrapper"
import EpisodeDetailPage from "./pages/EpisodeDetailPage"
import LocationDetailPage from "./pages/LocationDetailPage"

const App = () => {
  return (
    <div className="h-screen flex justify-center bg-gradient-to-b from-green-600 to-green-300">
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
