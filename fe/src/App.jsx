import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path={"login"} element={<LoginPage />} />
      <Route path="diagnosis">
        <Route path="questions" />
        <Route path="results" />
      </Route>
      <Route path="disease" />
    </Routes>
  );
}

export default App;
