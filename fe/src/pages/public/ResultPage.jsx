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

	// destructuring | AMAN
	const {
		hasil_utama = {},
		analisis_tambahan = [],
		nama_penyakit,
		cf_tertinggi,
		deskripsi,
		solusi,
		id_penyakit,
	} = diagnosisResult || {};

	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<div className="container mx-auto px-4 py-8 grow">
				<h1 className="text-3xl font-bold mb-6">Hasil Diagnosis</h1>

				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<h2 className="text-xl font-semibold mb-2">{nama_penyakit || "Tidak diketahui"}</h2>
					<p className="text-gray-600">Tingkat Keyakinan: {cf_tertinggi || "-"}%</p>
				</div>

				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<h3 className="text-lg font-semibold mb-3">Deskripsi</h3>
					<p className="text-gray-700">{deskripsi || "Tidak ada deskripsi tersedia"}</p>
				</div>

				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<h3 className="text-lg font-semibold mb-3">Solusi</h3>
					<p className="text-gray-700 whitespace-pre-line">
						{solusi || "Belum ada solusi untuk penyakit ini."}
					</p>
				</div>

				<Button onClick={() => navigate("/diagnosis")}>Kembali ke Diagnosis</Button>
			</div>

			<Footer />
		</div>
	);
};

export default ResultPage;
