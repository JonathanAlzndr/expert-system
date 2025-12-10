import React, { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import { usePenyakit } from "../../hooks/usePenyakit";
import { useGejala } from "../../hooks/useGejala";
import { useRules } from "../../hooks/useRules";
import axios from "axios";
import Modal from "../../components/common/Modal"; // Import Modal component

const AdminDashboard = () => {
	// Hooks data statistik (Penyakit, Gejala, Rules)
	const { penyakit, loading: loadingPenyakit, error: errorPenyakit } = usePenyakit();
	const { gejala, loading: loadingGejala, error: errorGejala } = useGejala();
	const { rules, loading: loadingRules, error: errorRules } = useRules();

	// State untuk Tabel & Pagination
	const [row, setRow] = useState([]);
	const [loadingTable, setLoadingTable] = useState(false); // Loading khusus tabel
	const [page, setPage] = useState(1); // Halaman aktif
	const [totalPages, setTotalPages] = useState(1); // Total halaman dari backend
	const limit = 10; // Limit data per halaman

	// State untuk Detail Diagnosis
	const [selectedDiagnosis, setSelectedDiagnosis] = useState(null); // State untuk detail diagnosis
	const [isModalOpen, setIsModalOpen] = useState(false); // State untuk membuka/menutup modal

	// Fetch data dari API dengan Pagination
	const fetchDiagnosisHistory = async () => {
		setLoadingTable(true);
		try {
			const token = localStorage.getItem("adminToken");
			const response = await axios.get(`http://127.0.0.1:5000/api/admin/diagnosis`, {
				params: {
					page: page,
					limit: limit,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const result = response.data;

			if (result.data) {
				setRow(result.data);
				setTotalPages(result.meta ? result.meta.totalPages : 1);
			}
		} catch (error) {
			console.error("Error fetching data: ", error);
		} finally {
			setLoadingTable(false);
		}
	};

	useEffect(() => {
		fetchDiagnosisHistory();
	}, [page]);

	// Ambil Detail Diagnosis dari API
	const fetchDiagnosisDetail = async (id) => {
		try {
			const token = localStorage.getItem("adminToken");
			const response = await axios.get(`http://127.0.0.1:5000/api/admin/diagnosis/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setSelectedDiagnosis(response.data.data); // Set the selected diagnosis data
			setIsModalOpen(true); // Open the modal
		} catch (error) {
			console.error("Error fetching diagnosis detail: ", error);
		}
	};

	// Helper untuk mengubah halaman
	const handlePrevPage = () => {
		if (page > 1) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (page < totalPages) setPage(page + 1);
	};

	// Definisikan hasError
	const hasError = errorPenyakit || errorGejala || errorRules;

	const renderTableRows = () => {
		if (loadingTable) {
			return (
				<tr>
					<td colSpan="5" className="text-center py-4">
						Memuat data...
					</td>
				</tr>
			);
		}

		if (row.length === 0) {
			return (
				<tr>
					<td colSpan="5" className="text-center py-4">
						Tidak ada data riwayat diagnosis.
					</td>
				</tr>
			);
		}

		return row.map((data, index) => (
			<tr key={data.id_diagnosis || index}>
				<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
					{(page - 1) * limit + index + 1}
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.tanggal}</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.nama_penyakit}</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cf_persen}</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
					<button
						onClick={() => fetchDiagnosisDetail(data.id_diagnosis)}
						className="text-primary hover:underline"
					>
						Lihat
					</button>
				</td>
			</tr>
		));
	};

	return (
		<>
			<h1 className="text-3xl font-bold text-primary mb-8">Beranda Admin</h1>

			{/* Error Display */}
			{hasError && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
					<div className="flex items-center">
						<i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
						<h3 className="text-red-800 font-semibold">
							Terjadi kesalahan saat memuat data statistik
						</h3>
					</div>
				</div>
			)}

			{/* Statistik Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{/* Penyakit Card */}
				<Card className="p-6">
					<div className="flex justify-between items-center">
						<div>
							<h3 className="text-lg font-semibold text-gray-700">Jumlah Penyakit</h3>
							{loadingPenyakit ? (
								<div className="animate-pulse mt-2 h-8 bg-gray-200 rounded w-16"></div>
							) : (
								<p className="text-3xl font-bold text-primary mt-2">{penyakit.length}</p>
							)}
						</div>
						<div className="bg-secondary rounded-full p-3">
							<i className="fas fa-disease text-2xl text-primary"></i>
						</div>
					</div>
				</Card>

				{/* Gejala Card */}
				<Card className="p-6">
					<div className="flex justify-between items-center">
						<div>
							<h3 className="text-lg font-semibold text-gray-700">Jumlah Gejala</h3>
							{loadingGejala ? (
								<div className="animate-pulse mt-2 h-8 bg-gray-200 rounded w-16"></div>
							) : (
								<p className="text-3xl font-bold text-primary mt-2">{gejala.length}</p>
							)}
						</div>
						<div className="bg-secondary rounded-full p-3">
							<i className="fas fa-clipboard-list text-2xl text-primary"></i>
						</div>
					</div>
				</Card>

				{/* Rules Card */}
				<Card className="p-6">
					<div className="flex justify-between items-center">
						<div>
							<h3 className="text-lg font-semibold text-gray-700">Jumlah Rules</h3>
							{loadingRules ? (
								<div className="animate-pulse mt-2 h-8 bg-gray-200 rounded w-16"></div>
							) : (
								<p className="text-3xl font-bold text-primary mt-2">{rules.length}</p>
							)}
						</div>
						<div className="bg-secondary rounded-full p-3">
							<i className="fas fa-project-diagram text-2xl text-primary"></i>
						</div>
					</div>
				</Card>
			</div>

			{/* Recent Activity Table with Pagination */}
			<Card className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h2>
					<button
						className="text-primary hover:text-[#0e556b] text-sm font-medium"
						onClick={() => fetchDiagnosisHistory()} // Refresh manual
					>
						<i className="fas fa-sync-alt mr-1"></i> Refresh Data
					</button>
				</div>

				<Table headers={["No", "Tanggal", "Hasil Penyakit", "Nilai Keyakinan", "Aksi"]}>
					{renderTableRows()}
				</Table>

				{/* Kontrol Pagination */}
				<div className="flex justify-between items-center mt-4 px-2">
					<span className="text-sm text-gray-600">
						Halaman <b>{page}</b> dari <b>{totalPages}</b>
					</span>
					<div className="flex space-x-2">
						<button
							onClick={handlePrevPage}
							disabled={page === 1}
							className={`px-3 py-1 rounded text-sm ${
								page === 1
									? "bg-gray-200 text-gray-400 cursor-not-allowed"
									: "bg-primary text-white hover:bg-opacity-90"
							}`}
						>
							Previous
						</button>
						<button
							onClick={handleNextPage}
							disabled={page === totalPages}
							className={`px-3 py-1 rounded text-sm ${
								page === totalPages
									? "bg-gray-200 text-gray-400 cursor-not-allowed"
									: "bg-primary text-white hover:bg-opacity-90"
							}`}
						>
							Next
						</button>
					</div>
				</div>
			</Card>

			{/* Diagnosis Detail Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Laporan Detail Diagnosis"
				size="lg"
			>
				{/* BLOK HASIL UTAMA (HEADER) - Tidak Berubah */}
				<div className="bg-primary/5 border border-primary/20 p-5 rounded-xl shadow-lg flex justify-between items-center mb-6">
					<div>
						<h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
							Hasil Diagnosis Akhir
						</h4>
						<h3 className="text-3xl font-extrabold text-primary mt-1 break-words">
							{selectedDiagnosis?.info_diagnosis?.hasil_penyakit || "TIDAK TERIDENTIFIKASI"}
						</h3>
					</div>
					<div className="text-right">
						<span className="text-sm font-medium text-gray-500 block">Tingkat Keyakinan (CF)</span>
						<span className="text-4xl font-black text-red-600">
							{selectedDiagnosis?.info_diagnosis?.cf_persen || "0.0%"}
						</span>
					</div>
				</div>

				{/* GRID DETAIL (SOLUSI DAN INFO TAMBAHAN) - Tidak Berubah */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
					{/* KOLOM KIRI: SOLUSI/TINDAKAN */}
					<div className="bg-white border border-green-300 rounded-xl p-4 shadow-md">
						<h4 className="text-lg font-bold text-green-700 mb-3 flex items-center">
							<i className="fas fa-prescription-bottle text-xl mr-2"></i> Solusi Penanganan
						</h4>
						<div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm max-h-48 overflow-y-auto">
							{selectedDiagnosis?.info_diagnosis?.solusi ||
								"Tidak ada solusi yang direkomendasikan."}
						</div>
					</div>

					{/* KOLOM KANAN: INFO TAMBAHAN */}
					<div className="bg-white border border-gray-300 rounded-xl p-4 shadow-md space-y-3">
						<h4 className="text-lg font-bold text-gray-700 flex items-center">
							<i className="fas fa-info-circle text-xl mr-2"></i> Info Diagnosis
						</h4>
						<div className="border-b pb-2">
							<p className="text-sm text-gray-500">Tanggal Rekam:</p>
							<p className="font-semibold text-gray-800">
								{selectedDiagnosis?.info_diagnosis?.tanggal || "N/A"}
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Jumlah Gejala Dipilih:</p>
							<p className="font-semibold text-gray-800">
								{selectedDiagnosis?.detail_jawaban?.length || 0} Gejala
							</p>
						</div>
					</div>
				</div>

				{/* BLOK DETAIL GEJALA BARU (FULL WIDTH - LIST KOMPAK) */}
				<div className="border-t pt-4">
					<h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
						<i className="fas fa-microscope text-xl mr-2 text-primary"></i> Detail Analisis Gejala
					</h4>

					<div className="max-h-[350px] overflow-y-auto pr-2">
						{selectedDiagnosis?.detail_jawaban?.length > 0 ? (
							<ul className="divide-y divide-gray-100 bg-white border border-gray-200 rounded-lg p-2">
								{selectedDiagnosis.detail_jawaban.map((item, index) => (
									<li
										key={index}
										className="py-3 px-2 flex justify-between items-center text-sm hover:bg-gray-50 transition duration-150"
									>
										{/* Nama Gejala (Kiri) */}
										<p className="font-medium text-gray-800 lg:w-3/5">
											<i className="fas fa-dot-circle text-xs text-primary/70 mr-2"></i>{" "}
											{item.nama_gejala}
										</p>

										{/* Jawaban User & CF (Kanan - Kompak) */}
										<div className="flex items-center space-x-4 lg:w-2/5 justify-end">
											<span className="text-blue-700 font-semibold text-xs">
												{item.jawaban_user}
											</span>

											{/* BADGE CF */}
											<span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full min-w-[50px] text-center">
												CF: {item.cf_user}
											</span>
										</div>
									</li>
								))}
							</ul>
						) : (
							<p className="text-center py-4 text-gray-500 italic">
								Tidak ada detail gejala yang tercatat.
							</p>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default AdminDashboard;
