import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import useFetch from "../../api/useFetch";

const BerandaAdmin = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("token")) navigate("/login");
	}, [navigate]);

	const [page, setPage] = useState(1);
	const [selectedId, setSelectedId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const limit = 10;

	// --- DATA FETCHING ---
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

	return (
		<div className="p-4 md:p-8 font-sans">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Beranda Admin</h1>
			</div>

			{errRules?.includes("401") && (
				<div className="bg-red-100 text-red-700 p-4 rounded mb-6 border border-red-200">
					Sesi berakhir. Silakan login kembali.
				</div>
			)}

			{/* 1. SECTION STATISTIK (Inline StatCard) */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{[
					{
						title: "Total Penyakit",
						count: getCount(dPenyakit),
						loading: lPenyakit,
						icon: "fa-disease",
					},
					{
						title: "Total Gejala",
						count: getCount(dGejala),
						loading: lGejala,
						icon: "fa-clipboard-list",
					},
					{
						title: "Total Rules",
						count: getCount(dRules),
						loading: lRules,
						icon: "fa-project-diagram",
					},
				].map((stat, idx) => (
					<div
						key={idx}
						className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center hover:shadow-md transition-all"
					>
						<div>
							<h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
							{stat.loading ? (
								<div className="animate-pulse mt-2 h-8 bg-gray-200 rounded w-16"></div>
							) : (
								<p className="text-3xl font-bold text-primary mt-2">{stat.count}</p>
							)}
						</div>
						<div className="bg-secondary rounded-full p-3 flex items-center justify-center">
							<i className={`fas ${stat.icon} text-2xl text-primary`}></i>
						</div>
					</div>
				))}
			</div>

			{/* 2. SECTION AKTIVITAS TERBARU (Inline Card & Table) */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h2>
					<button
						onClick={() => refetchTable()}
						className="text-sm text-primary hover:underline flex items-center gap-2"
					>
						<i className={`fas fa-sync-alt ${lTable ? "animate-spin" : ""}`}></i> Refresh
					</button>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
						<thead className="bg-gray-50">
							<tr>
								{["No", "Tanggal", "Hasil", "CF", "Aksi"].map((h) => (
									<th
										key={h}
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										{h}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{lTable ? (
								<tr>
									<td colSpan="5" className="text-center py-10 text-gray-500 italic">
										Memuat data...
									</td>
								</tr>
							) : errTable ? (
								<tr>
									<td colSpan="5" className="text-center py-10 text-red-500">
										{errTable}
									</td>
								</tr>
							) : tableRows.length === 0 ? (
								<tr>
									<td colSpan="5" className="text-center py-10 text-gray-500 italic">
										Belum ada data diagnosis.
									</td>
								</tr>
							) : (
								tableRows.map((d, i) => (
									<tr key={d.id_diagnosis || i} className="hover:bg-gray-50 transition-colors">
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											{(page - 1) * limit + i + 1}
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">{d.tanggal}</td>
										<td className="px-6 py-4 text-sm text-gray-500 font-semibold uppercase">
											{d.nama_penyakit}
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">{d.cf_persen}</td>
										<td className="px-6 py-4 text-sm">
											<button
												onClick={() => setSelectedId(d.id_diagnosis)}
												className="text-primary hover:text-blue-800 font-bold decoration-dotted transition-all"
											>
												Lihat Detail
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Inline Pagination */}
				<div className="flex justify-between items-center mt-6 px-2">
					<span className="text-sm text-gray-600">
						Halaman <b>{page}</b> dari <b>{totalPages}</b>
					</span>
					<div className="flex space-x-2">
						<button
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={page === 1 || lTable}
							className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
								page === 1 || lTable
									? "bg-gray-100 text-gray-400 cursor-not-allowed"
									: "bg-primary text-white hover:bg-blue-800"
							}`}
						>
							Previous
						</button>
						<button
							onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
							disabled={page === totalPages || lTable}
							className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
								page === totalPages || lTable
									? "bg-gray-100 text-gray-400 cursor-not-allowed"
									: "bg-primary text-white hover:bg-blue-800"
							}`}
						>
							Next
						</button>
					</div>
				</div>
			</div>

			{/* 3. SECTION MODAL (Inline Modal & DiagnosisDetail) */}
			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300"
					onClick={closeModal}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
					>
						<div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
							<h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">
								Laporan Detail Diagnosis
							</h2>
							<button
								onClick={closeModal}
								className="p-1 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
							>
								<IoClose size={28} className="text-gray-500 hover:text-gray-800" />
							</button>
						</div>

						<div className="p-6 overflow-y-auto">
							{lDetail ? (
								<div className="p-20 text-center text-gray-500 italic">
									<i className="fas fa-spinner fa-spin text-4xl mb-4 text-primary"></i>
									<p className="text-lg">Mengambil detail laporan...</p>
								</div>
							) : detailRes?.data ? (
								/* INLINE DIAGNOSIS DETAIL */
								<div className="space-y-6 animate-fade-in-up">
									{/* Header Hasil */}
									<div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center">
										<div>
											<h4 className="text-xs font-bold text-primary uppercase tracking-widest">
												Hasil Diagnosis Akhir
											</h4>
											<h3 className="text-3xl font-black text-primary mt-1">
												{detailRes.data.info_diagnosis?.hasil_penyakit || "TIDAK TERIDENTIFIKASI"}
											</h3>
										</div>
										<div className="text-right mt-4 md:mt-0">
											<span className="text-xs font-bold text-gray-500 block uppercase tracking-tighter">
												Tingkat Keyakinan (CF)
											</span>
											<span className="text-4xl font-black text-red-600 tracking-tight">
												{detailRes.data.info_diagnosis?.cf_persen || "0.0%"}
											</span>
										</div>
									</div>

									{/* Grid Info & Solusi */}
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
										<div className="bg-white border border-green-200 rounded-2xl p-5 shadow-sm">
											<h4 className="text-lg font-bold text-green-700 mb-4 flex items-center">
												<i className="fas fa-prescription-bottle text-xl mr-2"></i> Solusi
												Penanganan
											</h4>
											<div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm bg-green-50/50 p-4 rounded-xl border border-green-100 max-h-48 overflow-y-auto italic">
												{detailRes.data.info_diagnosis?.solusi ||
													"Hubungi tenaga medis profesional untuk penanganan lebih lanjut."}
											</div>
										</div>
										<div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center space-y-4">
											<h4 className="text-lg font-bold text-gray-700 flex items-center">
												<i className="fas fa-info-circle text-xl mr-2"></i> Info Metadata
											</h4>
											<div className="flex justify-between border-b pb-2">
												<p className="text-sm text-gray-500">Tanggal Pemeriksaan:</p>
												<p className="font-bold text-gray-800">
													{detailRes.data.info_diagnosis?.tanggal || "-"}
												</p>
											</div>
											<div className="flex justify-between">
												<p className="text-sm text-gray-500">Jumlah Gejala Terdeteksi:</p>
												<p className="font-bold text-primary">
													{detailRes.data.detail_jawaban?.length || 0} Gejala
												</p>
											</div>
										</div>
									</div>

									{/* List Gejala */}
									<div className="pt-4 border-t border-gray-100">
										<h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
											<i className="fas fa-microscope text-xl mr-3 text-primary"></i> Detail Gejala
											yang Dipilih
										</h4>
										<div className="max-h-[300px] overflow-y-auto pr-2">
											<ul className="grid grid-cols-1 gap-3">
												{detailRes.data.detail_jawaban?.map((item, index) => (
													<li
														key={index}
														className="bg-slate-50 border border-gray-100 rounded-xl p-4 flex justify-between items-center transition-hover hover:bg-slate-100"
													>
														<p className="font-semibold text-gray-800 text-sm">
															<span className="text-primary mr-2 opacity-50">
																#{(index + 1).toString().padStart(2, "0")}
															</span>
															{item.nama_gejala}
														</p>
														<div className="flex items-center gap-4">
															<span className="text-blue-700 font-bold text-xs uppercase">
																{item.jawaban_user}
															</span>
															<span className="bg-[#176B87] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
																CF: {item.cf_user}
															</span>
														</div>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							) : (
								<div className="text-center text-red-500 py-20 font-bold">
									Data detail tidak tersedia.
								</div>
							)}
						</div>

						<div className="p-4 border-t border-gray-50 bg-gray-50 flex justify-end">
							<button
								onClick={closeModal}
								className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-300 transition-all"
							>
								Tutup Laporan
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BerandaAdmin;
