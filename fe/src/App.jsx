import { Routes, Route } from "react-router-dom";

/* layouts */
import Layout from "./layouts/Layout";
import LayoutAdmin from "./layouts/LayoutAdmin";

/* components */
import PrivateRoute from "./components/PrivateRoute";

/* pages */
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Diagnosis from "./pages/Diagnosis";
import DiagnosisResults from "./pages/DiagnosisResults";
import DashboardAdmin from "./pages/DashboardAdmin";
import DeasesAdmin from "./pages/DeasesAdmin";

function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="diagnosis" element={<Diagnosis />} />
        <Route path="diagnosis/results" element={<DiagnosisResults />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      {/* admin (private) */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <LayoutAdmin />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardAdmin />} />
        <Route path="deases" element={<DeasesAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
