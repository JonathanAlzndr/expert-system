// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout"; // Layout untuk halaman umum
import LayoutAdmin from "./layouts/LayoutAdmin"; // Layout khusus admin
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardAdmin from "./pages/DashboardAdmin"; // Halaman admin
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    <Routes>
      {/* Layout umum untuk halaman public */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* LayoutAdmin untuk halaman admin, dengan pengecekan token */}
      <Route path="/" element={<LayoutAdmin />}>
        {/* Gunakan PrivateRoute untuk memastikan hanya admin yang login yang bisa mengakses /admin */}
        <Route
          path="/admin"
          element={<PrivateRoute element={<DashboardAdmin />} />} // Berikan komponen dengan element
        />
      </Route>
    </Routes>
  );
}

export default App;
