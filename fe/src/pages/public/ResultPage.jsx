import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Button from "../../components/ui/Button";

const ResultPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const diagnosisResult = location.state?.diagnosisResult || null;

	// jika null → tampilkan pesan aman, TIDAK crash
	if (!diagnosisResult) {
		return (
			<div className="min-h-screen flex flex-col">
				<Header />
				<div className="grow flex items-center justify-center">
					<div className="text-center">
						<h2 className="text-xl font-bold mb-3">Tidak ada data diagnosis</h2>
						<Button onClick={() => navigate("/diagnosis")}>Kembali</Button>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	// Ambil data dengan struktur yang benar sesuai response backend
	const { msg, id_diagnosis, hasil_utama, analisis_tambahan = [] } = diagnosisResult;

	// Extract data dari hasil_utama
	const { id_penyakit, nama_penyakit, cf_tertinggi, deskripsi, solusi } = hasil_utama || {};

	// Format persentase untuk cf_tertinggi
	const cfPercentage = cf_tertinggi ? `${(cf_tertinggi * 100).toFixed(1)}%` : "0%";

	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<div className="container mx-auto px-4 py-8 grow">
				{/* Informasi Pesan dan ID Diagnosis */}
				<div className="mb-6">
					<div className="flex justify-between items-center">
						<h1 className="text-3xl font-bold">Hasil Diagnosis</h1>
						<div className="text-sm text-gray-500">
							ID Diagnosis: <span className="font-semibold">{id_diagnosis || "-"}</span>
						</div>
					</div>
					{msg && (
						<div className="mt-2 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded inline-block">
							{msg}
						</div>
					)}
				</div>

				{/* Hasil Utama */}
				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<h2 className="text-xl font-semibold mb-2">
						{nama_penyakit || "Tidak diketahui"}
						{id_penyakit && (
							<span className="ml-2 text-sm font-normal text-gray-500">(ID: {id_penyakit})</span>
						)}
					</h2>
					<p className="text-gray-600 mb-4">
						<strong>Tingkat Keyakinan:</strong> {cfPercentage}
					</p>
					{cf_tertinggi && (
						<div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
							<div
								className="bg-primary h-2.5 rounded-full"
								style={{ width: `${cf_tertinggi * 100}%` }}
							></div>
						</div>
					)}
				</div>

				{/* Deskripsi */}
				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<h3 className="text-lg font-semibold mb-3">Deskripsi Penyakit</h3>
					<p className="text-gray-700">{deskripsi || "Tidak ada deskripsi tersedia"}</p>
				</div>

				{/* Solusi */}
				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<h3 className="text-lg font-semibold mb-3">Solusi dan Rekomendasi</h3>
					<div className="text-gray-700 whitespace-pre-line">
						{solusi || "Belum ada solusi untuk penyakit ini."}
					</div>
				</div>

				{/* Analisis Tambahan (jika ada) */}
				{analisis_tambahan && analisis_tambahan.length > 0 && (
					<div className="bg-white shadow rounded-lg p-6 mb-6">
						<h3 className="text-lg font-semibold mb-3">Kemungkinan Penyakit Lain</h3>
						<div className="space-y-3">
							{analisis_tambahan.map((penyakit, index) => (
								<div
									key={penyakit.id_penyakit || index}
									className="border-b border-gray-100 pb-3 last:border-b-0"
								>
									<div className="flex justify-between items-center">
										<div>
											<span className="font-medium">{penyakit.nama_penyakit}</span>
											{penyakit.id_penyakit && (
												<span className="ml-2 text-sm text-gray-500">
													(ID: {penyakit.id_penyakit})
												</span>
											)}
										</div>
										<span className="text-primary font-semibold">
											{(penyakit.cf_score * 100).toFixed(1)}%
										</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
										<div
											className="bg-blue-300 h-1.5 rounded-full"
											style={{ width: `${penyakit.cf_score * 100}%` }}
										></div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Tombol Kembali */}
				<div className="flex justify-between">
					<Button onClick={() => navigate("/")} variant="outline" className="mr-2">
						<i className="fas fa-home mr-2"></i> Beranda
					</Button>
					<Button onClick={() => navigate("/diagnosis")}>
						<i className="fas fa-redo mr-2"></i> Diagnosis Baru
					</Button>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default ResultPage;
