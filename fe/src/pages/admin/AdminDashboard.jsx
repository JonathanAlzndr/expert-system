import React, { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import { usePenyakit } from "../../hooks/usePenyakit";
import { useGejala } from "../../hooks/useGejala";
import { useRules } from "../../hooks/useRules";
import axios from "axios";

const AdminDashboard = () => {
	const { penyakit, loading: loadingPenyakit, error: errorPenyakit } = usePenyakit();
	const { gejala, loading: loadingGejala, error: errorGejala } = useGejala();
	const { rules, loading: loadingRules, error: errorRules } = useRules();

	const [row, setRow] = useState([]); // State untuk data dari API

	// Fetch data dari API
	const fetchDiagnosisHistory = async () => {
		try {
			const token = localStorage.getItem("adminToken");
			const response = await axios.get("http://127.0.0.1:5000/api/admin/diagnosis", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			// Update state row dengan data yang diterima dari API
			setRow(response.data.data); // Mapping data ke state row
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};

	// Mengambil data dari API ketika komponen pertama kali di-render
	useEffect(() => {
		fetchDiagnosisHistory();
	}, []);

	// Check if there are any errors
	const hasError = errorPenyakit || errorGejala || errorRules;

	// Fungsi untuk membuat baris tabel
	const renderTableRows = () => {
		return row.map((data, index) => (
			<tr key={data.id_diagnosis}>
				<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
					{index + 1}
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.tanggal}</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.nama_penyakit}</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cf_persen}</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
					<button className="text-primary">Lihat</button>
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
						<h3 className="text-red-800 font-semibold">Terjadi kesalahan saat memuat data</h3>
					</div>
					<div className="mt-2 text-sm text-red-600">
						{errorPenyakit && <p>• Penyakit: {errorPenyakit}</p>}
						{errorGejala && <p>• Gejala: {errorGejala}</p>}
						{errorRules && <p>• Rules: {errorRules}</p>}
					</div>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{/* Penyakit Card */}
				<Card className="p-6">
					<div className="flex justify-between items-center">
						<div>
							<h3 className="text-lg font-semibold text-gray-700">Jumlah Penyakit</h3>
							{loadingPenyakit ? (
								<div className="animate-pulse mt-2">
									<div className="h-8 bg-gray-200 rounded w-16"></div>
								</div>
							) : (
								<p className="text-3xl font-bold text-primary mt-2">{penyakit.length}</p>
							)}
						</div>
						<div className="bg-secondary rounded-full p-3">
							<i className="fas fa-disease text-2xl text-primary"></i>
						</div>
					</div>
					{errorPenyakit && <p className="text-red-500 text-xs mt-2">Gagal memuat data</p>}
				</Card>

				{/* Gejala Card */}
				<Card className="p-6">
					<div className="flex justify-between items-center">
						<div>
							<h3 className="text-lg font-semibold text-gray-700">Jumlah Gejala</h3>
							{loadingGejala ? (
								<div className="animate-pulse mt-2">
									<div className="h-8 bg-gray-200 rounded w-16"></div>
								</div>
							) : (
								<p className="text-3xl font-bold text-primary mt-2">{gejala.length}</p>
							)}
						</div>
						<div className="bg-secondary rounded-full p-3">
							<i className="fas fa-clipboard-list text-2xl text-primary"></i>
						</div>
					</div>
					{errorGejala && <p className="text-red-500 text-xs mt-2">Gagal memuat data</p>}
				</Card>

				{/* Rules Card */}
				<Card className="p-6">
					<div className="flex justify-between items-center">
						<div>
							<h3 className="text-lg font-semibold text-gray-700">Jumlah Rules</h3>
							{loadingRules ? (
								<div className="animate-pulse mt-2">
									<div className="h-8 bg-gray-200 rounded w-16"></div>
								</div>
							) : (
								<p className="text-3xl font-bold text-primary mt-2">{rules.length}</p>
							)}
						</div>
						<div className="bg-secondary rounded-full p-3">
							<i className="fas fa-project-diagram text-2xl text-primary"></i>
						</div>
					</div>
					{errorRules && <p className="text-red-500 text-xs mt-2">Gagal memuat data</p>}
				</Card>
			</div>
			{/* Recent Activity */}
			<Card className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h2>
					<button
						className="text-primary hover:text-[#0e556b] text-sm font-medium"
						onClick={() => {
							// Refresh all data
							window.location.reload();
						}}
					>
						<i className="fas fa-sync-alt mr-1"></i>
						Refresh Data
					</button>
				</div>

				<Table headers={["No", "Tanggal", "Hasil Penyakit", "Nilai Keyakinan", "Aksi"]}>
					{renderTableRows()}
				</Table>
			</Card>
		</>
	);
};

export default AdminDashboard;
