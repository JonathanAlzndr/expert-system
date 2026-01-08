import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../api/useFetch";

const ANSWER_OPTIONS = [
	{ label: "Pilih jawaban...", value: null, style: "border-gray-200 bg-white text-gray-400" },
	{ label: "Tidak Yakin", value: 0.0, style: "border-red-200 bg-red-50 text-red-600" },
	{ label: "Kurang Yakin", value: 0.2, style: "border-orange-200 bg-orange-50 text-orange-600" },
	{ label: "Sedikit Yakin", value: 0.4, style: "border-yellow-200 bg-yellow-50 text-yellow-600" },
	{ label: "Cukup Yakin", value: 0.6, style: "border-teal-200 bg-teal-50 text-teal-700" },
	{ label: "Yakin", value: 0.8, style: "border-blue-200 bg-blue-50 text-blue-600" },
	{ label: "Sangat Yakin", value: 1.0, style: "border-green-200 bg-green-50 text-green-600" },
];

const DiagnosisPage = () => {
	const navigate = useNavigate();
	const [showDisclaimer, setShowDisclaimer] = useState(true);
	const [agreed, setAgreed] = useState(false);
	const [symptoms, setSymptoms] = useState([]);

	const {
		data: questionsRawData,
		loading: loadingQuestions,
		execute: fetchQuestions,
	} = useFetch("/diagnosis/pertanyaan", "GET", null, { autoFetch: false });

	const { loading: processing, execute: submitDiagnosis } = useFetch("/diagnosis", "POST", null, {
		autoFetch: false,
	});

	useEffect(() => {
		if (!showDisclaimer) fetchQuestions();
	}, [showDisclaimer, fetchQuestions]);

	useEffect(() => {
		if (questionsRawData) {
			const data = Array.isArray(questionsRawData) ? questionsRawData : questionsRawData.data || [];
			setSymptoms(
				data.map((q) => ({
					id: q.id_gejala,
					name: q.teks_pertanyaan,
					certainty: null,
				}))
			);
		}
	}, [questionsRawData]);

	const handleCertaintyChange = (id, value) => {
		const parsedValue = value === "null" ? null : parseFloat(value);
		setSymptoms((prev) => prev.map((s) => (s.id === id ? { ...s, certainty: parsedValue } : s)));
	};

	const handleProcess = async () => {
		const answeredSymptoms = symptoms.filter((s) => s.certainty !== null);
		if (answeredSymptoms.length < symptoms.length) {
			alert("Harap jawab semua pertanyaan sebelum memproses diagnosis.");
			return;
		}
		const payload = answeredSymptoms.map((s) => ({ id_gejala: s.id, cf_user: s.certainty }));
		try {
			const result = await submitDiagnosis({ answers: payload });
			if (result) navigate("/result", { state: { diagnosisResult: result } });
		} catch (err) {
			console.error(err);
		}
	};

	const answeredCount = symptoms.filter((s) => s.certainty !== null).length;

	if (showDisclaimer) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 font-sans">
				<div className="bg-white rounded-md shadow-xl w-full max-w-[500px] overflow-hidden border border-gray-200">
					<div className="p-10 text-center">
						<div className="flex justify-center mb-4">
							<i className="fas fa-exclamation-triangle text-3xl text-yellow-500"></i>
						</div>
						<h3 className="text-2xl font-bold text-gray-800 mb-6">Peringatan Penting</h3>
						<div className="bg-yellow-50/50 border-l-[3px] border-yellow-500 p-4 mb-8 text-left">
							<p className="text-base leading-relaxed text-gray-600">
								Hasil diagnosis dari sistem ini bukan pengganti diagnosis dari dokter profesional.
								Hasil ini hanya sebagai referensi awal dan tidak boleh dijadikan sebagai dasar
								pengobatan.
							</p>
						</div>
						<div className="flex items-center justify-start mb-10">
							<input
								type="checkbox"
								id="agree-check"
								checked={agreed}
								onChange={(e) => setAgreed(e.target.checked)}
								className="w-4 h-4 border-gray-300 rounded text-[#176B87] focus:ring-0 cursor-pointer"
							/>
							<label
								htmlFor="agree-check"
								className="ml-2 text-[13px] text-gray-500 cursor-pointer"
							>
								Saya mengerti dan menyetujui
							</label>
						</div>
						<div className="flex justify-center border-t border-gray-50 pt-5">
							<button
								onClick={() => agreed && setShowDisclaimer(false)}
								disabled={!agreed}
								className={`text-base cursor-pointer font-medium transition-colors ${
									agreed
										? "text-[#176B87] hover:text-[#12556c]"
										: "text-gray-300 cursor-not-allowed"
								}`}
							>
								Lanjutkan
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white font-sans">
			<div className="max-w-5xl mx-auto px-6 py-10">
				<div className="mb-12">
					<h1 className="text-3xl font-bold text-[#176B87]">Diagnosis Penyakit</h1>
					<p className="text-lg text-gray-400 mt-2">
						Pilih tingkat keyakinan Anda untuk setiap gejala berikut
					</p>
				</div>

				{loadingQuestions ? (
					<div className="py-24 text-center">
						<div className="animate-spin inline-block w-8 h-8 border-4 border-[#176B87] border-t-transparent rounded-full mb-4"></div>
						<p className="text-gray-400 text-sm">Memuat pertanyaan...</p>
					</div>
				) : (
					<>
						<div className="space-y-12">
							{symptoms.map((symptom, index) => {
								const currentOption =
									ANSWER_OPTIONS.find((opt) => opt.value === symptom.certainty) ||
									ANSWER_OPTIONS[0];
								return (
									<div key={symptom.id} className="space-y-5">
										{/* Ukuran pertanyaan diubah ke text-xl (lebih besar) */}
										<h3 className="text-xl font-bold text-gray-700 leading-relaxed">
											{index + 1}. {symptom.name}
										</h3>
										<div className="max-w-md relative">
											<select
												value={symptom.certainty === null ? "null" : symptom.certainty}
												onChange={(e) => handleCertaintyChange(symptom.id, e.target.value)}
												// Ukuran teks opsi diubah ke text-base dan padding ditambah (py-3)
												className={`w-full appearance-none px-4 py-3 border rounded-lg text-base font-semibold outline-none transition-all cursor-pointer shadow-sm ${currentOption.style}`}
											>
												{ANSWER_OPTIONS.map((option, idx) => (
													<option
														key={idx}
														value={option.value === null ? "null" : option.value}
														className="text-gray-800 bg-white"
													>
														{option.label}
													</option>
												))}
											</select>
											<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
												<i className="fas fa-chevron-down text-xs"></i>
											</div>
										</div>
										<div className="flex justify-between items-center text-sm min-h-6">
											<span className="text-gray-400">Tingkat keyakinan saat ini:</span>
											{symptom.certainty !== null ? (
												<span className={`font-bold ${currentOption.textColor}`}>
													{currentOption.label}
												</span>
											) : (
												<span className="text-orange-500 font-bold italic underline decoration-dotted">
													Belum dijawab
												</span>
											)}
										</div>
									</div>
								);
							})}
						</div>

						<div className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
							<div className="space-y-1">
								<p className="text-sm text-gray-500 font-bold">
									Progress: <span className="text-[#176B87]">{answeredCount}</span> /{" "}
									{symptoms.length}
								</p>
								<div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
									<div
										className="h-full bg-[#176B87] transition-all duration-500"
										style={{ width: `${(answeredCount / symptoms.length) * 100}%` }}
									></div>
								</div>
							</div>
							<button
								onClick={handleProcess}
								disabled={answeredCount < symptoms.length}
								className={`flex items-center gap-3 px-6 py-3 rounded-lg text-base cursor-pointer font-bold transition-all shadow-md ${
									answeredCount < symptoms.length
										? "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none"
										: "bg-primary text-white active:scale-95"
								}`}
							>
								<i className="fas fa-project-diagram"></i> Proses Diagnosis Sekarang
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default DiagnosisPage;
