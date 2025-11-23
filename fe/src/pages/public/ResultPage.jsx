import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const ResultPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const diagnosisResult = location.state?.diagnosisResult;

	if (!diagnosisResult) {
		return (
			<div className="min-h-screen flex flex-col">
				<Header />
				<div className="flex-grow flex items-center justify-center bg-gray-100">
					<div className="text-center">
						<div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
							<i className="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
							<h2 className="text-2xl font-bold text-gray-800 mb-4">
								Data Hasil Diagnosis Tidak Ditemukan
							</h2>
							<p className="text-gray-600 mb-6">
								Silakan kembali ke halaman diagnosis untuk memulai proses diagnosis.
							</p>
							<Button onClick={() => navigate("/diagnosis")}>
								<i className="fas fa-arrow-left mr-2"></i> Kembali ke Diagnosis
							</Button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	const { hasil_utama, analisis_tambahan } = diagnosisResult;

	// Filter kemungkinan lain yang persentase di bawah hasil utama
	const kemungkinanLain = analisis_tambahan
		? analisis_tambahan.filter((item) => item.cf_score < hasil_utama.cf_tertinggi)
		: [];

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<Header />

			<div className="flex-grow container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<nav className="flex mb-6" aria-label="Breadcrumb">
					<ol className="flex items-center space-x-2 text-sm text-gray-600">
						<li>
							<button
								onClick={() => navigate("/")}
								className="hover:text-primary transition duration-200"
							>
								Beranda
							</button>
						</li>
						<li>
							<i className="fas fa-chevron-right text-xs"></i>
						</li>
						<li>
							<button
								onClick={() => navigate("/diagnosis")}
								className="hover:text-primary transition duration-200"
							>
								Diagnosis
							</button>
						</li>
						<li>
							<i className="fas fa-chevron-right text-xs"></i>
						</li>
						<li className="text-primary font-medium">Hasil Diagnosis</li>
					</ol>
				</nav>

				<h1 className="text-3xl font-bold text-primary mb-2">Hasil Diagnosis</h1>
				<p className="text-gray-600 mb-8">
					Berikut adalah hasil diagnosis berdasarkan gejala yang Anda pilih
				</p>

				{/* Hasil Utama */}
				<Card className="p-6 mb-8">
					<div className="flex items-center mb-4">
						<div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mr-4">
							<i className="fas fa-check text-xl"></i>
						</div>
						<h2 className="text-2xl font-bold text-gray-800">Hasil Utama</h2>
					</div>

					<div className="bg-green-50 border border-green-200 rounded-lg p-6">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center">
							<div className="flex-1 mb-4 md:mb-0">
								<h3 className="text-2xl font-bold text-gray-800 mb-2">
									{hasil_utama.nama_penyakit}
								</h3>
								<p className="text-gray-600">{hasil_utama.deskripsi}</p>
							</div>
							<div className="text-center bg-white rounded-lg p-4 shadow-sm min-w-[120px]">
								<div className="text-3xl font-bold text-green-600 mb-1">
									{Math.round(hasil_utama.cf_tertinggi * 100)}%
								</div>
								<div className="text-sm text-gray-500 font-medium">Tingkat Keyakinan</div>
							</div>
						</div>
					</div>
				</Card>

				{/* Detail & Solusi */}
				<Card className="p-6 mb-8">
					<div className="flex items-center mb-6">
						<div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
							<i className="fas fa-info-circle"></i>
						</div>
						<h2 className="text-2xl font-bold text-gray-800">Detail & Solusi</h2>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div>
							<div className="flex items-center mb-3">
								<i className="fas fa-file-medical text-blue-500 mr-2"></i>
								<h3 className="text-lg font-semibold text-gray-700">Deskripsi Penyakit</h3>
							</div>
							<div className="bg-blue-50 rounded-lg p-4">
								<p className="text-gray-700 leading-relaxed">{hasil_utama.deskripsi}</p>
							</div>
						</div>

						<div>
							<div className="flex items-center mb-3">
								<i className="fas fa-hand-holding-medical text-green-500 mr-2"></i>
								<h3 className="text-lg font-semibold text-gray-700">Solusi & Perawatan</h3>
							</div>
							<div className="bg-green-50 rounded-lg p-4">
								<p className="text-gray-700 leading-relaxed">{hasil_utama.solusi}</p>
							</div>
						</div>
					</div>
				</Card>

				{/* Kemungkinan Lain */}
				{kemungkinanLain.length > 0 && (
					<Card className="p-6 mb-8">
						<div className="flex items-center mb-6">
							<div className="bg-yellow-100 text-yellow-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
								<i className="fas fa-clipboard-list"></i>
							</div>
							<h2 className="text-2xl font-bold text-gray-800">Kemungkinan Lain</h2>
						</div>

						<p className="text-gray-600 mb-4">
							Penyakit lain yang memiliki kemungkinan di bawah hasil utama:
						</p>

						<div className="space-y-4">
							{kemungkinanLain.map((item, index) => (
								<div
									key={index}
									className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-yellow-300 transition duration-200"
								>
									<div className="flex-1">
										<h3 className="text-lg font-semibold text-gray-700 mb-1">
											{item.nama_penyakit}
										</h3>
										<p className="text-gray-600 text-sm">Kemungkinan penyakit lainnya</p>
									</div>
									<div className="text-right">
										<div className="text-xl font-bold text-yellow-600">
											{Math.round(item.cf_score * 100)}%
										</div>
										<div className="text-sm text-gray-500">Tingkat Keyakinan</div>
									</div>
								</div>
							))}
						</div>
					</Card>
				)}

				{/* Informasi Penting */}
				<Card className="p-6 mb-8 bg-orange-50 border-orange-200">
					<div className="flex items-start">
						<i className="fas fa-exclamation-triangle text-orange-500 text-xl mt-1 mr-3"></i>
						<div>
							<h3 className="text-lg font-semibold text-orange-800 mb-2">Penting!</h3>
							<p className="text-orange-700">
								Hasil diagnosis ini bersifat prediktif berdasarkan sistem pakar. Disarankan untuk
								konsultasi dengan dokter profesional untuk diagnosis dan penanganan yang lebih
								akurat.
							</p>
						</div>
					</div>
				</Card>

				{/* Tombol Aksi */}
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<Button
						onClick={() => navigate("/diagnosis")}
						className="bg-primary hover:bg-[#0e556b] transition duration-300"
					>
						<i className="fas fa-redo mr-2"></i> Diagnosis Ulang
					</Button>
					<Button onClick={() => navigate("/")} variant="secondary">
						<i className="fas fa-home mr-2"></i> Kembali ke Beranda
					</Button>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default ResultPage;
