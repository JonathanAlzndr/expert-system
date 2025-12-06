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
				title="Detail Diagnosis"
				size="lg"
			>
				{/* Modal Content */}
				<div>
					<h3 className="text-lg font-semibold text-gray-700">
						Hasil Penyakit: {selectedDiagnosis?.info_diagnosis?.hasil_penyakit}
					</h3>
					<p>
						<strong>Tanggal: </strong>
						{selectedDiagnosis?.info_diagnosis?.tanggal}
					</p>
					<p>
						<strong>CF Nilai: </strong>
						{selectedDiagnosis?.info_diagnosis?.cf_persen}
					</p>
					<p>
						<strong>Solusi: </strong>
						{selectedDiagnosis?.info_diagnosis?.solusi}
					</p>
					<div className="mt-4">
						<h4 className="text-lg font-semibold">Detail Jawaban Gejala:</h4>
						<ul className="list-disc pl-5 mt-2">
							{selectedDiagnosis?.detail_jawaban?.map((item, index) => (
								<li key={index}>
									<p>
										<strong>{item.nama_gejala}:</strong> {item.jawaban_user} (CF: {item.cf_user})
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default AdminDashboard;
