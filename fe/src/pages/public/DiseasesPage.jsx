import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const DiseasesPage = () => {
	const [selectedDisease, setSelectedDisease] = useState(null);
	const [diseases, setDiseases] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchDiseases();
	}, []);

	const fetchDiseases = async () => {
		setLoading(true);
		try {
			const response = await fetch("http://127.0.0.1:5000/api/penyakit");

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Handle berbagai kemungkinan format response
			let penyakitData = [];
			if (Array.isArray(data)) {
				penyakitData = data;
			} else if (data?.data && Array.isArray(data.data)) {
				penyakitData = data.data;
			}

			// Transform data untuk sesuai dengan struktur yang diharapkan
			const transformedData = penyakitData.map((penyakit, index) => ({
				id: penyakit.id_penyakit || index + 1,
				name: penyakit.nama_penyakit || "Nama tidak tersedia",
				description: penyakit.deskripsi || "Deskripsi tidak tersedia",
				symptoms: penyakit.solusi
					? [penyakit.solusi.substring(0, 50) + "..."]
					: ["Informasi solusi tidak tersedia"],
			}));

			setDiseases(transformedData);
			setError(null);
		} catch (err) {
			console.error("Error fetching diseases:", err);
			setError("Gagal memuat data penyakit. Silakan coba lagi nanti.");

			// Fallback data jika API error
			setDiseases([
				{
					id: 1,
					name: "Flu",
					description: "Infeksi virus yang menyerang sistem pernapasan",
					symptoms: ["Demam", "Batuk", "Sakit kepala"],
				},
				{
					id: 2,
					name: "Demam Berdarah",
					description: "Penyakit yang disebabkan oleh virus dengue",
					symptoms: ["Demam tinggi", "Nyeri otot", "Ruam kulit"],
				},
			]);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col">
				<Header />
				<div className="grow container mx-auto px-4 py-8 flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
						<p className="text-gray-600">Memuat data penyakit...</p>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<div className="grow container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-primary mb-8">Informasi Penyakit</h1>

				{error && (
					<div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
						{error}
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{diseases.map((disease) => (
						<Card
							key={disease.id}
							className="overflow-hidden hover:shadow-lg transition duration-300"
						>
							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-800 mb-2">{disease.name}</h3>
								<p className="text-gray-600 mb-4 line-clamp-2">{disease.description}</p>

								<div className="mb-4">
									<h4 className="text-sm font-semibold text-gray-700 mb-1">Informasi:</h4>
									<ul className="list-disc pl-5 text-sm text-gray-600">
										{disease.symptoms.map((symptom, index) => (
											<li key={index}>{symptom}</li>
										))}
									</ul>
								</div>

								<button
									className="text-primary font-medium hover:text-[#0e556b] transition duration-300"
									onClick={() => setSelectedDisease(disease)}
								>
									Lihat Detail <i className="fas fa-arrow-right ml-1"></i>
								</button>
							</div>
						</Card>
					))}
				</div>
			</div>

			{/* Modal Detail Penyakit */}
			{selectedDisease && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold text-gray-800">{selectedDisease.name}</h2>
								<button
									className="text-gray-500 hover:text-gray-700"
									onClick={() => setSelectedDisease(null)}
								>
									<i className="fas fa-times text-xl"></i>
								</button>
							</div>

							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-700 mb-2">Deskripsi</h3>
								<p className="text-gray-600">{selectedDisease.description}</p>
							</div>

							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-700 mb-2">Informasi</h3>
								<ul className="list-disc pl-5 text-gray-600">
									{selectedDisease.symptoms.map((symptom, index) => (
										<li key={index}>{symptom}</li>
									))}
								</ul>
							</div>

							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-700 mb-2">Pencegahan</h3>
								<p className="text-gray-600">
									Untuk pencegahan penyakit ini, disarankan untuk menjaga kebersihan diri dan
									lingkungan, serta melakukan pemeriksaan kesehatan secara rutin.
								</p>
							</div>

							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-700 mb-2">Pengobatan</h3>
								<p className="text-gray-600">
									Segera konsultasikan dengan dokter atau tenaga kesehatan profesional untuk
									mendapatkan penanganan yang tepat sesuai dengan kondisi kesehatan Anda.
								</p>
							</div>

							<div className="flex justify-end">
								<Button onClick={() => setSelectedDisease(null)}>Tutup</Button>
							</div>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
};

export default DiseasesPage;
