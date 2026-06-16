import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import FavouritesPage from "./pages/FavouritesPage";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
  { path:"/", element: <Dashboard /> },
  { path:"/favourites", element: <FavouritesPage /> },
  { path:"/pokemon/:name", element:<DetailPage /> },
  { path:"*", element: <Dashboard /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
