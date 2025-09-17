import { Route, Routes } from "react-router"

import Characters from "./pages/Characters"
import Episodes from "./pages/Episodes"
import Locations from "./pages/Locations"

const App = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </>
  )
}

export default App
