import React, { useState, useEffect, useCallback } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import useFetch from "../../api/useFetch";

const GejalaAdmin = () => {
	// --- 1. STATE MANAGEMENT ---
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);
	const [showForm, setShowForm] = useState(false);
	const [editingGejala, setEditingGejala] = useState(null);
	const [formError, setFormError] = useState("");
	const [deleteId, setDeleteId] = useState(null);

	const [formData, setFormData] = useState({
		id_gejala: "",
		nama_gejala: "",
		teks_pertanyaan: "",
	});

	// --- 2. FETCH DATA ---
	const {
		data: gejalaResp,
		loading: loadData,
		error: errData,
		execute: refetchGejala,
	} = useFetch(`/admin/gejala?page=${currentPage}&limit=${itemsPerPage}`, "GET", null, {
		autoFetch: true,
	});

	const gejalaList = gejalaResp?.data || gejalaResp || [];
	const meta = gejalaResp?.meta || {};

	// --- 3. CRUD ACTIONS ---
	const { execute: execCreate, loading: loadCreate } = useFetch("/admin/gejala", "POST", null, {
		autoFetch: false,
	});

	const updateUrl = editingGejala ? `/admin/gejala/${editingGejala.id_gejala}` : "";
	const { execute: execUpdate, loading: loadUpdate } = useFetch(updateUrl, "PUT", null, {
		autoFetch: false,
	});

	const deleteUrl = deleteId ? `/admin/gejala/${deleteId}` : "";
	const { execute: execDelete, loading: loadDelete } = useFetch(deleteUrl, "DELETE", null, {
		autoFetch: false,
	});

	const isBusy = loadCreate || loadUpdate || loadDelete;

	// --- 4. EFFECTS ---
	useEffect(() => {
		if (deleteId) {
			execDelete()
				.then(() => {
					refetchGejala();
					setDeleteId(null);
				})
				.catch((err) => {
					alert("Gagal menghapus: " + (err.response?.data?.message || "Terjadi kesalahan"));
					setDeleteId(null);
				});
		}
	}, [deleteId, execDelete, refetchGejala]);

	// --- 5. HANDLERS ---
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const resetForm = useCallback(() => {
		setFormData({ id_gejala: "", nama_gejala: "", teks_pertanyaan: "" });
		setEditingGejala(null);
		setFormError("");
	}, []);

	const handleCreate = () => {
		resetForm();
		setShowForm(true);
	};

	const handleEdit = (item) => {
		setFormData({
			id_gejala: item.id_gejala,
			nama_gejala: item.nama_gejala,
			teks_pertanyaan: item.teks_pertanyaan,
		});
		setEditingGejala(item);
		setShowForm(true);
	};

	const handleDelete = (id) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus gejala ini?")) {
			setDeleteId(id);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");
		if (!formData.id_gejala || !formData.nama_gejala) {
			setFormError("ID dan Nama Gejala wajib diisi.");
			return;
		}
		try {
			if (editingGejala) {
				await execUpdate(formData);
			} else {
				await execCreate(formData);
			}
			setShowForm(false);
			resetForm();
			refetchGejala();
		} catch (err) {
			setFormError(err.response?.data?.message || "Gagal menyimpan data");
		}
	};

	// --- RENDER ---
	return (
		<div className="max-w-7xl mx-auto p-4 md:p-6 font-sans">
			{/* Header Section */}
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Kelola Data Gejala</h1>
				<button
					onClick={handleCreate}
					className="bg-primary py-2 px-6 rounded-lg font-semibold text-white flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all active:scale-95"
				>
					<i className="fas fa-plus mr-2 text-sm"></i> Tambah Gejala
				</button>
			</div>

			{/* Inline Alert Component */}
			{errData && (
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
					role="alert"
				>
					<span className="block sm:inline">{errData}</span>
				</div>
			)}

			{/* Table Section Inline */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				{loadData ? (
					<div className="p-12 text-center text-gray-500 italic">
						<i className="fas fa-spinner fa-spin mr-3 text-primary"></i>Memuat data...
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
								<tr>
									<th className="px-6 py-3 text-left">ID Gejala</th>
									<th className="px-6 py-3 text-left">Nama Gejala</th>
									<th className="px-6 py-3 text-left">Teks Pertanyaan</th>
									<th className="px-6 py-3 text-left">Aksi</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{gejalaList.length === 0 ? (
									<tr>
										<td colSpan="4" className="p-8 text-center text-gray-500">
											Tidak ada data gejala.
										</td>
									</tr>
								) : (
									gejalaList.map((item) => (
										<tr key={item.id_gejala} className="hover:bg-gray-50 transition-colors">
											<td className="px-6 py-4 text-sm font-bold text-gray-900">
												{item.id_gejala}
											</td>
											<td className="px-6 py-4 text-sm font-semibold text-gray-800">
												{item.nama_gejala}
											</td>
											<td
												className="px-6 py-4 text-sm text-gray-600 max-w-sm truncate italic"
												title={item.teks_pertanyaan}
											>
												{item.teks_pertanyaan}
											</td>
											<td className="px-6 py-4 text-sm font-medium">
												<div className="flex gap-4">
													<button
														onClick={() => handleEdit(item)}
														className="text-blue-600 hover:text-blue-800 font-bold decoration-dotted transition active:scale-90"
														disabled={isBusy}
													>
														<i className="fas fa-edit mr-1"></i> Ubah
													</button>
													<button
														onClick={() => handleDelete(item.id_gejala)}
														className="text-red-600 hover:text-red-800 font-bold decoration-dotted transition active:scale-90"
														disabled={isBusy}
													>
														<i className="fas fa-trash mr-1"></i> Hapus
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				)}

				{/* Pagination Inline */}
				{meta.total_data > itemsPerPage && (
					<div className="flex justify-between items-center p-4 border-t border-gray-100 bg-white">
						<span className="text-xs text-gray-600">
							Halaman <b>{currentPage}</b> dari <b>{meta.total_pages || 1}</b>
						</span>
						<div className="flex space-x-2">
							<button
								onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
								disabled={currentPage === 1 || loadData}
								className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs font-bold hover:bg-gray-50 disabled:opacity-30 transition-all"
							>
								Previous
							</button>
							<button
								onClick={() => setCurrentPage((prev) => Math.min(meta.total_pages, prev + 1))}
								disabled={currentPage === meta.total_pages || loadData}
								className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-opacity-90 disabled:opacity-30 transition-all"
							>
								Next
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Modal & Form Section Inline */}
			{showForm && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300"
					onClick={() => {
						setShowForm(false);
						resetForm();
					}}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
					>
						<div className="p-6">
							<div className="flex justify-between items-center mb-6 border-b pb-4">
								<h2 className="text-xl font-bold text-gray-800">
									{editingGejala ? "Ubah Gejala" : "Tambah Gejala Baru"}
								</h2>
								<button
									onClick={() => {
										setShowForm(false);
										resetForm();
									}}
									className="p-1 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
								>
									<IoClose size={28} className="text-gray-500" />
								</button>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								{formError && (
									<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
										{formError}
									</div>
								)}

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-1.5">
										<label className="block text-gray-700 text-xs font-bold uppercase tracking-wide">
											ID Gejala <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="id_gejala"
											value={formData.id_gejala}
											onChange={handleInputChange}
											placeholder="G01"
											className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-primary disabled:bg-gray-100 font-bold"
											required
											disabled={!!editingGejala}
										/>
									</div>
									<div className="space-y-1.5">
										<label className="block text-gray-700 text-xs font-bold uppercase tracking-wide">
											Nama Gejala <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="nama_gejala"
											value={formData.nama_gejala}
											onChange={handleInputChange}
											placeholder="Masukkan nama gejala"
											className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-primary"
											required
										/>
									</div>
								</div>

								<div className="space-y-1.5">
									<label className="block text-gray-700 text-xs font-bold uppercase tracking-wide">
										Teks Pertanyaan untuk User <span className="text-red-500">*</span>
									</label>
									<textarea
										name="teks_pertanyaan"
										value={formData.teks_pertanyaan}
										onChange={handleInputChange}
										rows="3"
										className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-primary italic"
										placeholder="Contoh: Apakah Anda merasakan nyeri saat buang air kecil?"
										required
									/>
								</div>

								<div className="flex justify-end space-x-4 pt-3">
									<button
										type="button"
										onClick={() => {
											setShowForm(false);
											resetForm();
										}}
										className="px-8 py-2.5 border border-gray-300 rounded-md cursor-pointer text-gray-600 font-bold hover:bg-slate-50 transition-all active:scale-95"
										disabled={isBusy}
									>
										Batal
									</button>
									<button
										type="submit"
										className="px-8 py-2.5 bg-[#1d63ff] text-white rounded-md cursor-pointer font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
										disabled={isBusy}
									>
										{isBusy ? (
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
										) : (
											<IoSaveOutline size={20} />
										)}
										<span>Simpan</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GejalaAdmin;
