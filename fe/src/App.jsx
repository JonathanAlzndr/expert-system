import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardAdmin from "./pages/DashboardAdmin";
import PrivateRoute from "./components/PrivateRoute";
import Diagnosis from "./pages/Diagnosis";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="diagnosis" element={<Diagnosis />} />
      </Route>

      <Route path="/" element={<LayoutAdmin />}>
        <Route
          path="/admin"
          element={<PrivateRoute element={<DashboardAdmin />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
