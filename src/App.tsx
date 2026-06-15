import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import FavouritesPage from "./pages/FavouritesPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/favourites" element={<FavouritesPage />}/>
        <Route path="/pokemon/:name" element={<DetailPage />}/>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
