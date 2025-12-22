import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../api/useFetch";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Modal } from "../../components/Modal";
import StatCard from "../../components/StatCard";
import DiagnosisDetail from "../../components/DiagnosisDetail";
import Pagination from "../../components/Pagination";

const BerandaAdmin = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("token")) navigate("/login");
	}, [navigate]);
	const [page, setPage] = useState(1);
	const [selectedId, setSelectedId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const limit = 10;

	// --- DATA FETCHING (Logic) ---
	const { data: dPenyakit, loading: lPenyakit } = useFetch("/penyakit", "GET");
	const { data: dGejala, loading: lGejala } = useFetch("/admin/gejala", "GET");
	const { data: dRules, loading: lRules, error: errRules } = useFetch("/admin/rules", "GET");

	const {
		data: historyData,
		loading: lTable,
		error: errTable,
		execute: refetchTable,
	} = useFetch(`/admin/diagnosis?page=${page}&limit=${limit}`, "GET", null, { autoFetch: true });

	const {
		data: detailRes,
		loading: lDetail,
		execute: getDetail,
	} = useFetch(selectedId ? `/admin/diagnosis/${selectedId}` : "", "GET", null, {
		autoFetch: false,
	});

	// --- HANDLERS ---
	useEffect(() => {
		if (selectedId) {
			getDetail();
			setIsModalOpen(true);
		}
	}, [selectedId, getDetail]);

	const getCount = (res) => (res?.data ? res.data.length : res?.length || 0);
	const totalPages = historyData?.meta?.totalPages || 1;
	const tableRows = historyData?.data || [];

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedId(null);
	};

	const renderRows = () => {
		if (lTable)
			return (
				<tr>
					<td colSpan="5" className="text-center py-4">
						Memuat...
					</td>
				</tr>
			);
		if (errTable)
			return (
				<tr>
					<td colSpan="5" className="text-center py-4 text-red-500">
						{errTable}
					</td>
				</tr>
			);
		if (tableRows.length === 0)
			return (
				<tr>
					<td colSpan="5" className="text-center py-4">
						Kosong.
					</td>
				</tr>
			);

		return tableRows.map((d, i) => (
			<tr key={d.id_diagnosis || i}>
				<td className="px-6 py-4 text-sm font-medium text-gray-900">
					{(page - 1) * limit + i + 1}
				</td>
				<td className="px-6 py-4 text-sm text-gray-500">{d.tanggal}</td>
				<td className="px-6 py-4 text-sm text-gray-500">{d.nama_penyakit}</td>
				<td className="px-6 py-4 text-sm text-gray-500">{d.cf_persen}</td>
				<td className="px-6 py-4 text-sm text-gray-500">
					<button
						onClick={() => setSelectedId(d.id_diagnosis)}
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
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Beranda Admin</h1>
			</div>

			{errRules?.includes("401") && (
				<div className="bg-red-100 text-red-700 p-4 rounded mb-6">Sesi berakhir.</div>
			)}

			{/* 1. SECTION STATISTIK (Bersih!) */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<StatCard
					title="Total Penyakit"
					count={getCount(dPenyakit)}
					loading={lPenyakit}
					icon="fa-disease"
				/>
				<StatCard
					title="Total Gejala"
					count={getCount(dGejala)}
					loading={lGejala}
					icon="fa-clipboard-list"
				/>
				<StatCard
					title="Total Rules"
					count={getCount(dRules)}
					loading={lRules}
					icon="fa-project-diagram"
				/>
			</div>

			{/* 2. SECTION TABEL (Bersih!) */}
			<Card className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h2>
					<button onClick={() => refetchTable()} className="text-sm text-primary hover:underline">
						<i className="fas fa-sync-alt mr-1"></i> Refresh
					</button>
				</div>

				<Table headers={["No", "Tanggal", "Hasil", "CF", "Aksi"]}>{renderRows()}</Table>

				<Pagination
					page={page}
					totalPages={totalPages}
					loading={lTable}
					onPrev={() => setPage((p) => Math.max(1, p - 1))}
					onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
				/>
			</Card>

			{/* 3. SECTION MODAL (Sangat Bersih!) */}
			<Modal isOpen={isModalOpen} onClose={closeModal} title="Laporan Detail Diagnosis" size="lg">
				{lDetail ? (
					<div className="p-10 text-center text-gray-500">
						<i className="fas fa-spinner fa-spin text-3xl mb-3 text-primary"></i>
						<p>Memuat...</p>
					</div>
				) : detailRes?.data ? (
					<DiagnosisDetail data={detailRes.data} />
				) : (
					<div className="text-center text-red-500 py-10">Data tidak ditemukan.</div>
				)}
			</Modal>
		</>
	);
};

export default BerandaAdmin;
