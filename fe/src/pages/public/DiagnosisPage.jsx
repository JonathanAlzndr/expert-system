import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import DisclaimerModal from "../../components/diagnosis/DisclaimerModal";
import Button from "../../components/ui/Button";
import axios from "axios";

const DiagnosisPage = () => {
	const navigate = useNavigate();
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showDisclaimer, setShowDisclaimer] = useState(true);
	const [symptoms, setSymptoms] = useState([]);
	const [processing, setProcessing] = useState(false);

	const answerOptions = [
		{ label: "Pilih jawaban...", value: null },
		{ label: "Pasti Tidak", value: -1.0 },
		{ label: "Hampir Pasti Tidak", value: -0.8 },
		{ label: "Kemungkinan Besar Tidak", value: -0.6 },
		{ label: "Mungkin Tidak", value: -0.4 },
		{ label: "Tidak Yakin", value: -0.2 },
		{ label: "Mungkin Ya", value: 0.4 },
		{ label: "Kemungkinan Besar Ya", value: 0.6 },
		{ label: "Hampir Pasti Ya", value: 0.8 },
		{ label: "Pasti Ya", value: 1.0 },
	];

	const fetchQuestions = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await axios.get("http://127.0.0.1:5000/api/diagnosis/pertanyaan");

			// Handle different response formats
			let questionsData = [];

			if (response.data.pertanyaanList && Array.isArray(response.data.pertanyaanList)) {
				questionsData = response.data.pertanyaanList;
			} else if (Array.isArray(response.data)) {
				questionsData = response.data;
			} else {
				setError("Format data pertanyaan tidak sesuai");
				return;
			}

			setQuestions(questionsData);
		} catch (err) {
			setError(err.response?.data?.msg || "Gagal memuat data pertanyaan");
		} finally {
			setLoading(false);
		}
	};

	const submitDiagnosis = async (answers) => {
		setProcessing(true);
		try {
			const response = await axios.post("http://127.0.0.1:5000/api/diagnosis", { answers });
			return { success: true, data: response.data };
		} catch (err) {
			const errorMessage = err.response?.data?.msg || "Gagal memproses diagnosis";
			setError(errorMessage);
			return { success: false, error: errorMessage };
		} finally {
			setProcessing(false);
		}
	};

	useEffect(() => {
		if (!showDisclaimer) {
			fetchQuestions();
		}
	}, [showDisclaimer]);

	useEffect(() => {
		if (questions.length > 0) {
			const initialSymptoms = questions.map((q) => ({
				id: q.id_gejala,
				name: q.teks_pertanyaan,
				certainty: null,
			}));
			setSymptoms(initialSymptoms);
		}
	}, [questions]);

	const handleCertaintyChange = (id, certaintyValue) => {
		const value = certaintyValue === "null" ? null : parseFloat(certaintyValue);
		setSymptoms(
			symptoms.map((symptom) => (symptom.id === id ? { ...symptom, certainty: value } : symptom))
		);
	};

	const handleProcess = async () => {
		const answeredSymptoms = symptoms.filter((symptom) => symptom.certainty !== null);

		if (answeredSymptoms.length === 0) {
			setError("Harap pilih jawaban untuk minimal satu gejala");
			return;
		}

		// Format answers sesuai dengan struktur yang diharapkan backend
		const answers = answeredSymptoms.map((symptom) => ({
			id_gejala: symptom.id,
			cf_user: symptom.certainty,
		}));

		const result = await submitDiagnosis(answers);

		if (result.success) {
			// Navigate ke halaman result dengan membawa data diagnosis
			navigate("/result", { state: { diagnosisResult: result.data } });
		}
	};

	const answeredCount = symptoms.filter((s) => s.certainty !== null).length;

	if (showDisclaimer) {
		return (
			<div className="min-h-screen flex flex-col">
				<Header />
				<div className="flex-grow flex items-center justify-center bg-gray-100 p-4">
					<DisclaimerModal isOpen={showDisclaimer} onAgree={() => setShowDisclaimer(false)} />
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<div className="flex-grow container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-primary mb-2">Diagnosis Penyakit</h1>
				<p className="text-gray-600 mb-8">
					Pilih tingkat keyakinan Anda untuk setiap gejala berikut
				</p>

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						<strong>Error:</strong> {error}
					</div>
				)}

				{loading ? (
					<div className="flex justify-center items-center py-16">
						<div className="text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
							<p className="text-gray-600">Memuat data gejala...</p>
						</div>
					</div>
				) : symptoms.length > 0 ? (
					<div className="bg-white rounded-lg shadow-md p-6 mb-8">
						<div className="space-y-6">
							{symptoms.map((symptom, index) => (
								<div key={symptom.id} className="border-b border-gray-200 pb-6 last:border-b-0">
									<div className="mb-4">
										<h3 className="text-lg font-semibold text-gray-800 mb-2">
											{index + 1}. {symptom.name}
										</h3>
									</div>

									<div className="max-w-md">
										<select
											value={symptom.certainty === null ? "null" : symptom.certainty}
											onChange={(e) => handleCertaintyChange(symptom.id, e.target.value)}
											className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ${
												symptom.certainty === null
													? "border-gray-300 bg-white"
													: symptom.certainty < 0
													? "border-red-300 bg-red-50"
													: symptom.certainty === 0
													? "border-gray-300 bg-gray-50"
													: "border-green-300 bg-green-50"
											}`}
										>
											{answerOptions.map((option, optionIndex) => (
												<option
													key={optionIndex}
													value={option.value === null ? "null" : option.value}
													className={option.value === null ? "text-gray-400" : ""}
												>
													{option.label}
												</option>
											))}
										</select>
									</div>

									{symptom.certainty !== null && (
										<div className="mt-3 flex items-center justify-between">
											<span className="text-sm text-gray-500">Tingkat keyakinan:</span>
											<span
												className={`text-sm font-semibold ${
													symptom.certainty <= -0.6
														? "text-red-600"
														: symptom.certainty <= -0.2
														? "text-orange-600"
														: symptom.certainty === 0
														? "text-gray-600"
														: symptom.certainty <= 0.6
														? "text-blue-600"
														: "text-green-600"
												}`}
											>
												{answerOptions.find((opt) => opt.value === symptom.certainty)?.label}
											</span>
										</div>
									)}

									{symptom.certainty === null && (
										<div className="mt-2 flex items-center text-orange-600 text-sm">
											<i className="fas fa-exclamation-circle mr-1"></i>
											Belum dijawab
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				) : (
					!loading && (
						<div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
							<p className="text-gray-600">Tidak ada pertanyaan yang tersedia</p>
							<Button onClick={fetchQuestions} className="mt-4">
								<i className="fas fa-redo mr-2"></i> Coba Lagi
							</Button>
						</div>
					)
				)}

				<div className="flex justify-between items-center">
					<div>
						{symptoms.length > 0 && (
							<p className="text-sm text-gray-600">
								{answeredCount} dari {symptoms.length} pertanyaan telah dijawab
							</p>
						)}
						{answeredCount === 0 && symptoms.length > 0 && (
							<p className="text-orange-600 text-sm">
								<i className="fas fa-info-circle mr-1"></i>
								Harap pilih jawaban untuk minimal satu gejala
							</p>
						)}
					</div>
					<Button onClick={handleProcess} disabled={processing || answeredCount === 0}>
						<i className="fas fa-cogs mr-2"></i>
						{processing ? "Memproses..." : "Proses Diagnosis"}
					</Button>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default DiagnosisPage;
