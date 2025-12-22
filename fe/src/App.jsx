import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* pages */
import LoginPage from "./pages/public/LoginPage";
import LandingPage from "./pages/public/LandingPage";
import DiagnosisPage from "./pages/public/DiagnosisPage";
import BerandaAdmin from "./pages/admin/BerandaAdmin";
import AturanAdmin from "./pages/admin/AturanAdmin";
import PenyakitAdmin from "./pages/admin/PenyakitAdmin";
import GejalaAdmin from "./pages/admin/GejalaAdmin";
import PenyakitPage from "./pages/public/PenyakitPage";
import HasilDiagnosisPage from "./pages/public/HasilDiagnosisPage";

/* layouts */
import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
	return (
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<Routes>
				<Route path="/" element={<DefaultLayout />}>
					<Route index element={<LandingPage />} />
					<Route path="diagnosis" element={<DiagnosisPage />} />
					<Route path="diseases" element={<PenyakitPage />} />
					<Route path="result" element={<HasilDiagnosisPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />

				<Route path={"/admin"} element={<AdminLayout />}>
					<Route index element={<BerandaAdmin />} />
					<Route path="rules" element={<AturanAdmin />} />
					<Route path="symptoms" element={<GejalaAdmin />} />
					<Route path="diseases" element={<PenyakitAdmin />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
