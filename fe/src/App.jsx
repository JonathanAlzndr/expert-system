//Components
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DiagnosisLayout from "./pages/Diagnosis/DiagnosisLayout";
import DiagnosisResults from "./pages/Diagnosis/DiagnosisResults";
import DiagnosisQuestions from "./pages/Diagnosis/DiagnosisQuestions";

//Hooks
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path={"login"} element={<LoginPage />} />
      <Route path="diagnosis" element={<DiagnosisLayout />}>
        <Route index />
        <Route path="questions" element={<DiagnosisQuestions />} />
        <Route path="results" element={<DiagnosisResults />} />
      </Route>
      <Route path="disease" />
    </Routes>
  );
}

export default App;
