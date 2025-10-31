//Components
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DiagnosisLayout from "./pages/Diagnosis/DiagnosisLayout";

//Hooks
import { Routes, Route } from "react-router";
import FormInput from "./pages/Diagnosis/components/FormInput";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path={"login"} element={<LoginPage />} />
      <Route path="diagnosis" element={<DiagnosisLayout />}>
        <Route index />
        <Route path="questions" element={<FormInput />} />
        <Route path="results" />
      </Route>
      <Route path="disease" />
    </Routes>
  );
}

export default App;
