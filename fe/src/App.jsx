//Components
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DiagnosisLayout from "./pages/Diagnosis/DiagnosisLayout";
import Diagnosis from "./pages/Diagnosis/Diagnosis";
import DiagnosisResults from "./pages/Diagnosis/DiagnosisResults";
import DiagnosisQuestions from "./pages/Diagnosis/DiagnosisQuestions";
import Layout from "./pages/Layout";

//Hooks
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="questions" element={<DiagnosisQuestions />} />
        <Route path="results" element={<DiagnosisResults />} />
      </Route>
      <Route path={"login"} element={<LoginPage />} />
      <Route path="diagnosis" element={<DiagnosisLayout />}>
        <Route index element={<Diagnosis />} />
      </Route>
      <Route path="disease" />
    </Routes>
  );
}

export default App;
