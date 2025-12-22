import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisclaimerModal from "../../components/Disclaimer";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";

// --- KONFIGURASI OPSI JAWABAN ---
// Label: Teks yang muncul di layar (Tanpa angka)
// Value: Nilai CF yang dikirim ke backend
// Style: CSS Class untuk warna border & background dropdown saat dipilih
// TextColor: CSS Class untuk warna teks label di bawah dropdown
const ANSWER_OPTIONS = [
	{
		label: "Pilih jawaban...",
		value: null,
		style: "border-gray-300 bg-white text-gray-600",
		textColor: "text-gray-500",
	},
	{
		label: "Sangat Tidak Yakin / Tidak",
		value: 0.0,
		style: "border-red-300 bg-red-50 text-red-700 font-medium",
		textColor: "text-red-600",
	},
	{
		label: "Kurang Yakin",
		value: 0.2,
		style: "border-orange-300 bg-orange-50 text-orange-700 font-medium",
		textColor: "text-orange-600",
	},
	{
		label: "Sedikit Yakin",
		value: 0.4,
		style: "border-yellow-300 bg-yellow-50 text-yellow-700 font-medium",
		textColor: "text-yellow-600",
	},
	{
		label: "Cukup Yakin",
		value: 0.6,
		style: "border-teal-300 bg-teal-50 text-teal-700 font-medium",
		textColor: "text-teal-600",
	},
	{
		label: "Yakin",
		value: 0.8,
		style: "border-blue-300 bg-blue-50 text-blue-700 font-medium",
		textColor: "text-blue-600",
	},
	{
		label: "Sangat Yakin / Ya",
		value: 1.0,
		style: "border-green-300 bg-green-50 text-green-700 font-bold",
		textColor: "text-green-600",
	},
];

const extractQuestionsData = (response) => {
	if (!response) return [];
	if (Array.isArray(response)) return response;
	if (Array.isArray(response.pertanyaanList)) return response.pertanyaanList;
	if (Array.isArray(response.data)) return response.data;
	return [];
};

const DiagnosisPage = () => {
	const navigate = useNavigate();
	const [showDisclaimer, setShowDisclaimer] = useState(true);
	const [symptoms, setSymptoms] = useState([]);

	// Fetch Pertanyaan
	const {
		data: questionsRawData,
		loading: loadingQuestions,
		error: errorQuestions,
		execute: fetchQuestions,
	} = useFetch("/diagnosis/pertanyaan", "GET", null, { autoFetch: false });

	// Submit Diagnosis
	const {
		loading: processing,
		error: errorSubmit,
		execute: submitDiagnosis,
	} = useFetch("/diagnosis", "POST", null, { autoFetch: false });

	// Load pertanyaan setelah disclaimer disetujui
	useEffect(() => {
		if (!showDisclaimer) {
			fetchQuestions();
		}
	}, [showDisclaimer, fetchQuestions]);

	// Format data pertanyaan ke state local
	useEffect(() => {
		if (questionsRawData) {
			const validQuestions = extractQuestionsData(questionsRawData);
			const formattedSymptoms = validQuestions.map((q) => ({
				id: q.id_gejala,
				name: q.teks_pertanyaan,
				certainty: null, // Default null
			}));
			setSymptoms(formattedSymptoms);
		}
	}, [questionsRawData]);

	const handleCertaintyChange = (id, value) => {
		// Convert string "null" kembali ke tipe data null, atau parse float
		const parsedValue = value === "null" ? null : parseFloat(value);

		setSymptoms((prev) => prev.map((s) => (s.id === id ? { ...s, certainty: parsedValue } : s)));
	};

	const handleProcess = async () => {
		const answeredSymptoms = symptoms.filter((s) => s.certainty !== null);

		if (answeredSymptoms.length === 0) {
			alert("Harap pilih jawaban untuk minimal satu gejala");
			return;
		}

		const payload = answeredSymptoms.map((s) => ({
			id_gejala: s.id,
			cf_user: s.certainty,
		}));

		try {
			const result = await submitDiagnosis({ answers: payload });
			if (result) {
				navigate("/result", { state: { diagnosisResult: result } });
			}
		} catch (err) {
			console.error("Diagnosis Error:", err);
		}
	};

	const answeredCount = symptoms.filter((s) => s.certainty !== null).length;

	if (showDisclaimer) {
		return (
			<div className="min-h-screen flex flex-col">
				<div className="grow flex items-center justify-center bg-gray-100 p-4">
					<DisclaimerModal isOpen={showDisclaimer} onAgree={() => setShowDisclaimer(false)} />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<div className="grow container mx-auto px-4 py-8 max-w-4xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-primary mb-2">Diagnosis Penyakit</h1>
					<p className="text-gray-600">
						Jawab pertanyaan berikut sesuai dengan kondisi yang Anda rasakan saat ini.
					</p>
				</div>

				{(errorQuestions || errorSubmit) && (
					<ErrorDisplay message={errorQuestions || errorSubmit} />
				)}

				{loadingQuestions ? (
					<LoadingSpinner />
				) : symptoms.length > 0 ? (
					<div className="space-y-6 mb-24">
						{/* Added margin bottom for sticky footer */}
						{symptoms.map((symptom, index) => (
							<SymptomItem
								key={symptom.id}
								index={index}
								symptom={symptom}
								onChange={handleCertaintyChange}
							/>
						))}
					</div>
				) : (
					!loadingQuestions && <EmptyState onRetry={() => fetchQuestions()} />
				)}

				{/* Sticky Footer Status Bar */}
				<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-20">
					<div className="container mx-auto max-w-4xl flex justify-between items-center">
						<div>
							<p className="text-sm text-gray-500">Progress</p>
							<p className="text-sm font-semibold text-gray-800">
								<span className="text-primary">{answeredCount}</span> dari {symptoms.length}{" "}
								terjawab
							</p>
						</div>
						<div className="w-48">
							<Button
								onClick={handleProcess}
								disabled={processing || answeredCount === 0}
								fullWidth
							>
								<i className="fas fa-stethoscope mr-2"></i>
								{processing ? "Menganalisis..." : "Proses Diagnosis"}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// --- SUB COMPONENTS ---

const SymptomItem = ({ index, symptom, onChange }) => {
	// Cari opsi yang sesuai dengan nilai saat ini untuk styling
	const currentOption =
		ANSWER_OPTIONS.find((opt) => opt.value === symptom.certainty) || ANSWER_OPTIONS[0];
	const isAnswered = symptom.certainty !== null;

	return (
		<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
			<div className="mb-4">
				<h3 className="text-lg font-medium text-gray-800">
					<span className="font-bold text-primary mr-2">{index + 1}.</span>
					{symptom.name}
				</h3>
			</div>

			<div className="flex flex-col gap-2">
				{/* Dropdown */}
				<div className="relative">
					<select
						value={symptom.certainty === null ? "null" : symptom.certainty}
						onChange={(e) => onChange(symptom.id, e.target.value)}
						className={`w-full appearance-none px-4 py-3 rounded-lg border outline-none cursor-pointer transition-colors duration-200 ${currentOption.style}`}
					>
						{ANSWER_OPTIONS.map((option, idx) => (
							<option
								key={idx}
								value={option.value === null ? "null" : option.value}
								className="bg-white text-gray-700 py-2" // Reset style option list
							>
								{option.label}
							</option>
						))}
					</select>
					{/* Custom Arrow Icon */}
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
						<i className="fas fa-chevron-down text-xs"></i>
					</div>
				</div>

				{/* Status Text di Bawah/Kanan */}
				<div className="flex justify-between items-center mt-1 px-1">
					<span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
						Tingkat Keyakinan:
					</span>

					{isAnswered ? (
						<span className={`text-sm font-bold ${currentOption.textColor} flex items-center`}>
							{currentOption.label}
							<i className="fas fa-check-circle ml-2"></i>
						</span>
					) : (
						<span className="text-sm text-orange-500 font-medium flex items-center animate-pulse">
							<i className="fas fa-exclamation-circle mr-1"></i>
							Belum dijawab
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

const EmptyState = ({ onRetry }) => (
	<div className="text-center flex flex-col items-center gap-4 p-12 bg-white rounded-xl shadow-sm border border-gray-100">
		<div className="text-gray-300 mb-2">
			<i className="fas fa-clipboard-list text-6xl"></i>
		</div>
		<p className="text-gray-600 text-lg">Tidak ada data gejala yang ditemukan.</p>
		<div className="w-40">
			<Button onClick={onRetry} className="mt-2" variant="outline">
				Coba Lagi
			</Button>
		</div>
	</div>
);

const ErrorDisplay = ({ message }) => (
	<div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-start">
		<i className="fas fa-exclamation-triangle mt-1 mr-3"></i>
		<div>
			<h4 className="font-bold">Terjadi Kesalahan</h4>
			<p>{message}</p>
		</div>
	</div>
);

const LoadingSpinner = () => (
	<div className="flex flex-col justify-center items-center py-20">
		<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mb-4"></div>
		<p className="text-gray-500 font-medium">Sedang memuat pertanyaan diagnosis...</p>
	</div>
);

export default DiagnosisPage;
