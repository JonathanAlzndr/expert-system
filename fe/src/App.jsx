import { Routes, Route } from "react-router-dom";
/* layouts */
import Layout from "./layouts/Layout";
import LayoutAdmin from "./layouts/LayoutAdmin";
/* components */
import PrivateRoute from "./components/PrivateRoute";
/* pages */
import DashboardAdmin from "./pages/DashboardAdmin";
import Diagnosis from "./pages/Diagnosis";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DiagnosisResults from "./pages/DiagnosisResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="diagnosis" element={<Diagnosis />} />
        <Route path="results" element={<DiagnosisResults />} />
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
