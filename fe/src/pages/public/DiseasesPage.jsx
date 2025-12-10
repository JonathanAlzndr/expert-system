import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Card from "../../components/ui/Card";
import { Hero } from "./components/Hero";
import { Modal } from "./components/Modal";

const DiseasesPage = () => {
	const [selectedDisease, setSelectedDisease] = useState(null);
	const [diseases, setDiseases] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

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

			let penyakitData = [];
			if (Array.isArray(data)) {
				penyakitData = data;
			} else if (data?.data && Array.isArray(data.data)) {
				penyakitData = data.data;
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
		} catch (err) {
			console.error("Error fetching diseases:", err);
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
		} finally {
			setLoading(false);
		}
	};

	// Filter diseases based on search
	const filteredDiseases = diseases.filter((disease) =>
		disease.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

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

			{/* Modern Modal */}
			{selectedDisease && (
				<Modal selectedDisease={selectedDisease} setSelectedDisease={setSelectedDisease} />
			)}

			<Footer />
		</div>
	);
};

export default DiseasesPage;
