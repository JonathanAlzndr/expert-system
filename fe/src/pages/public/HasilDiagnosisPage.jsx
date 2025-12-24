import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const HasilDiagnosisPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const diagnosisResult = location.state?.diagnosisResult || null;

	if (!diagnosisResult) {
		return (
			<div className="min-h-screen flex flex-col bg-background">
				<div className="grow flex items-center justify-center p-4">
					<div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-center p-8 max-w-md w-full">
						<h2 className="text-xl font-bold mb-3 text-gray-800">Tidak ada data diagnosis</h2>
						<p className="text-gray-600 mb-6">Silakan lakukan diagnosis ulang.</p>
						<Button onClick={() => navigate("/diagnosis")} fullWidth>
							Kembali
						</Button>
					</div>
				</div>
			</div>
		);
	}

	const { msg, id_diagnosis, hasil_utama, analisis_tambahan = [] } = diagnosisResult;
	const { id_penyakit, nama_penyakit, cf_tertinggi, deskripsi, solusi } = hasil_utama || {};
	const cfPercentage = cf_tertinggi ? `${(cf_tertinggi * 100).toFixed(1)}%` : "0%";

	return (
		<div className="min-h-screen flex flex-col bg-background">
			<div className="container mx-auto px-4 py-8 grow">
				<div className="mb-6">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-3xl font-bold text-primary">Hasil Diagnosis</h1>
						<div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">
							ID: <span className="font-semibold text-gray-700">{id_diagnosis || "-"}</span>
						</div>
					</div>
					{msg && (
						<div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-sm">
							<p className="font-medium">{msg}</p>
						</div>
					)}
				</div>

				<div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden mb-6 p-6 border-t-4 border-primary">
					<h2 className="text-2xl font-bold mb-2 text-gray-800">
						{nama_penyakit || "Tidak diketahui"}
					</h2>
					<p className="text-gray-600 mb-4 flex items-center">
						<span className="font-semibold mr-2">Tingkat Keyakinan:</span>
						<span className="text-primary font-bold text-lg">{cfPercentage}</span>
					</p>
					{cf_tertinggi && (
						<div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
							<div
								className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
								style={{ width: `${cf_tertinggi * 100}%` }}
							></div>
						</div>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div className="p-6 h-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
						<h3 className="text-lg font-bold mb-3 text-primary flex items-center">
							<i className="fas fa-info-circle mr-2"></i>Deskripsi Penyakit
						</h3>
						<p className="text-gray-700 leading-relaxed text-justify">
							{deskripsi || "Tidak ada deskripsi tersedia"}
						</p>
					</div>

					<div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden p-6 h-full">
						<h3 className="text-lg font-bold mb-3 text-green-600 flex items-center">
							<i className="fas fa-prescription-bottle-alt mr-2"></i>Solusi & Rekomendasi
						</h3>
						<div className="text-gray-700 whitespace-pre-line leading-relaxed">
							{solusi || "Belum ada solusi untuk penyakit ini."}
						</div>
					</div>
				</div>

				{analisis_tambahan && analisis_tambahan.length > 0 && (
					<div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden mb-8 p-6">
						<h3 className="text-lg font-bold mb-4 text-gray-800">Kemungkinan Penyakit Lain</h3>
						<div className="space-y-4">
							{analisis_tambahan.map((penyakit, index) => (
								<div
									key={penyakit.id_penyakit || index}
									className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
								>
									<div className="flex justify-between items-center mb-1">
										<span className="font-medium text-gray-700">{penyakit.nama_penyakit}</span>
										<span className="text-sm font-bold text-gray-500">
											{(penyakit.cf_score * 100).toFixed(1)}%
										</span>
									</div>
									<div className="w-full bg-gray-100 rounded-full h-2">
										<div
											className="bg-blue-400 h-2 rounded-full"
											style={{ width: `${penyakit.cf_score * 100}%` }}
										></div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="flex justify-between items-center mt-8">
					<div className="w-30">
						<Button onClick={() => navigate("/")} variant="secondary">
							<i className="fas fa-home mr-2"></i> Beranda
						</Button>
					</div>
					<div className="w-40">
						<Button onClick={() => navigate("/diagnosis")}>
							<i className="fas fa-redo mr-2"></i> Diagnosis Baru
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HasilDiagnosisPage;
