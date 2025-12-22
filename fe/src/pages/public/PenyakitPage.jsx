import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { Hero } from "../../components/Hero";
import { Modal } from "../../components/Modal";
import useFetch from "../../api/useFetch";

const DiseasesPage = () => {
	const [selectedDisease, setSelectedDisease] = useState(null);
	const [diseases, setDiseases] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const {
		data: apiData,
		loading: apiLoading,
		error: apiError,
	} = useFetch("/penyakit", "GET", null, { autoFetch: true });

	useEffect(() => {
		setLoading(apiLoading);
	}, [apiLoading]);

	useEffect(() => {
		if (apiData) {
			let penyakitData = [];
			if (Array.isArray(apiData)) {
				penyakitData = apiData;
			} else if (apiData?.data && Array.isArray(apiData.data)) {
				penyakitData = apiData.data;
			}

			const transformedData = penyakitData.map((penyakit, index) => ({
				id: penyakit.id_penyakit || index + 1,
				name: penyakit.nama_penyakit || "Nama tidak tersedia",
				description: penyakit.deskripsi || "Deskripsi tidak tersedia",
				symptoms: penyakit.solusi
					? [penyakit.solusi.substring(0, 100) + (penyakit.solusi.length > 100 ? "..." : "")]
					: ["Informasi solusi tidak tersedia"],
				fullSolusi: penyakit.solusi || "Solusi detail belum tersedia.",
			}));

			setDiseases(transformedData);
			setError(null);
		}
	}, [apiData]);

	useEffect(() => {
		if (apiError) {
			setError("Gagal memuat data penyakit. Menggunakan data offline sementara.");
			setDiseases([
				{
					id: 1,
					name: "Flu & Batuk",
					description: "Infeksi virus umum yang menyerang sistem pernapasan atas.",
					symptoms: ["Istirahat cukup", "Minum air putih hangat"],
					fullSolusi: "Istirahat total, minum vitamin C, dan konsumsi obat pereda gejala.",
				},
				{
					id: 2,
					name: "Demam Berdarah",
					description: "Penyakit menular yang disebabkan oleh virus dengue melalui nyamuk.",
					symptoms: ["Minum banyak cairan", "Kompres hangat"],
					fullSolusi:
						"Segera ke rumah sakit jika trombosit turun drastis, perbanyak cairan isotonik.",
				},
				{
					id: 3,
					name: "Maag Akut",
					description: "Peradangan pada dinding lambung akibat asam lambung naik.",
					symptoms: ["Makan teratur", "Hindari pedas & asam"],
					fullSolusi: "Minum antasida, makan porsi kecil tapi sering, hindari stres.",
				},
			]);
		}
	}, [apiError]);

	const filteredDiseases = diseases.filter((disease) =>
		disease.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Hero />

			<div className="grow container mx-auto px-4 -mt-12 mb-12 relative z-10">
				{error && (
					<div className="bg-orange-50 border-l-4 border-orange-500 text-orange-700 p-4 rounded shadow-md mb-8 flex items-center">
						<i className="fas fa-exclamation-triangle mr-3"></i>
						<p>{error}</p>
					</div>
				)}

				{loading ? (
					<div className="flex flex-col items-center justify-center py-20">
						<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
						<p className="text-primary font-semibold animate-pulse">Memuat data kesehatan...</p>
					</div>
				) : (
					<>
						{filteredDiseases.length === 0 ? (
							<div className="text-center py-20 bg-white rounded-xl shadow-sm">
								<i className="fas fa-folder-open text-6xl text-gray-200 mb-4"></i>
								<p className="text-gray-500 text-lg">Penyakit yang Anda cari tidak ditemukan.</p>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{filteredDiseases.map((disease) => (
									<Card
										key={disease.id}
										className="group hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary"
									>
										<div className="p-6 flex flex-col h-full">
											<div className="mb-4">
												<div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
													<i className="fas fa-notes-medical text-2xl text-primary group-hover:text-white transition-colors duration-300"></i>
												</div>
												<h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
													{disease.name}
												</h3>
												<p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
													{disease.description}
												</p>
											</div>

											<div className="mt-auto pt-4 border-t border-gray-100">
												<button
													className="w-full flex items-center justify-between text-primary font-semibold hover:text-dark transition-colors"
													onClick={() => setSelectedDisease(disease)}
												>
													<span>Baca Selengkapnya</span>
													<i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
												</button>
											</div>
										</div>
									</Card>
								))}
							</div>
						)}
					</>
				)}
			</div>

			<Modal
				isOpen={!!selectedDisease}
				onClose={() => setSelectedDisease(null)}
				title={selectedDisease?.name || "Detail Penyakit"}
			>
				{selectedDisease && (
					<div className="space-y-6">
						<div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
							<h4 className="font-bold text-lg text-primary mb-2 flex items-center">
								<i className="fas fa-info-circle mr-2"></i>Deskripsi
							</h4>
							<p className="text-gray-700 leading-relaxed">{selectedDisease.description}</p>
						</div>

						<div>
							<h4 className="font-bold text-lg text-primary mb-3 flex items-center">
								<i className="fas fa-stethoscope mr-2"></i>Gejala Umum
							</h4>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
								{selectedDisease.symptoms.map((symptom, index) => (
									<li
										key={index}
										className="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg"
									>
										<i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
										<span>{symptom}</span>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h4 className="font-bold text-lg text-primary mb-3 flex items-center">
								<i className="fas fa-prescription-bottle-alt mr-2"></i>Solusi & Penanganan
							</h4>
							<div className="bg-green-50 p-4 rounded-lg border border-green-100 text-gray-700 whitespace-pre-line leading-relaxed">
								{selectedDisease.fullSolusi}
							</div>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default DiseasesPage;
