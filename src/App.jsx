import { Route, Routes } from "react-router"

import Characters from "./pages/Characters"
import Episodes from "./pages/Episodes"
import Locations from "./pages/Locations"
import Header from "./components/Header"
import Wrapper from "./components/utils/Wrapper"
import EpisodeDetailPage from "./pages/EpisodeDetailPage"

const App = () => {
  return (
    <>
      <Header />
      <Wrapper> 
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </Wrapper>
    </>
  )
}

export default App
