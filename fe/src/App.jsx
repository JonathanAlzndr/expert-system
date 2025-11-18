//pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Results from "./pages/Results";
import Diagnosis from "./pages/Diagnosis";
import DashboardAdmin from "./pages/DashboardAdmin";

//layouts
import Layout from "./layouts/Layout";
import LayoutAdmin from "./layouts/LayoutAdmin";

//Hooks
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="diagnosis" element={<Diagnosis />} />
        <Route path="results" element={<Results />} />
      </Route>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<DashboardAdmin />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
