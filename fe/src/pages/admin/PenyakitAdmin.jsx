import React, { useState, useEffect, useCallback } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5"; // Menambah ikon disket
import useFetch from "../../api/useFetch";

const PenyakitAdmin = () => {
	// --- STATE ---
	const [showForm, setShowForm] = useState(false);
	const [editingPenyakit, setEditingPenyakit] = useState(null);
	const [formError, setFormError] = useState("");
	const [deleteId, setDeleteId] = useState(null);

	const [formData, setFormData] = useState({
		id_penyakit: "",
		nama_penyakit: "",
		deskripsi: "",
		solusi: "",
	});

	// --- DATA FETCHING (Logic) ---
	const {
		data: penyakitResp,
		loading: loadData,
		error: errData,
		execute: refetchPenyakit,
	} = useFetch("/penyakit", "GET", null, { autoFetch: true });

	const penyakitList = penyakitResp?.data || penyakitResp || [];

	const { execute: execCreate, loading: loadCreate } = useFetch("/penyakit", "POST", null, {
		autoFetch: false,
	});

	const updateUrl = editingPenyakit ? `/penyakit/${editingPenyakit.id_penyakit}` : "";
	const { execute: execUpdate, loading: loadUpdate } = useFetch(updateUrl, "PUT", null, {
		autoFetch: false,
	});

	const deleteUrl = deleteId ? `/penyakit/${deleteId}` : "";
	const { execute: execDelete, loading: loadDelete } = useFetch(deleteUrl, "DELETE", null, {
		autoFetch: false,
	});

	const isBusy = loadCreate || loadUpdate || loadDelete;

	// --- EFFECTS ---
	useEffect(() => {
		if (deleteId) {
			execDelete()
				.then(() => {
					refetchPenyakit();
					setDeleteId(null);
				})
				.catch((err) => {
					alert("Gagal menghapus: " + (err.response?.data?.message || "Terjadi kesalahan"));
					setDeleteId(null);
				});
		}
	}, [deleteId, execDelete, refetchPenyakit]);

	// --- HANDLERS ---
	const resetForm = useCallback(() => {
		setFormData({ id_penyakit: "", nama_penyakit: "", deskripsi: "", solusi: "" });
		setEditingPenyakit(null);
		setFormError("");
	}, []);

	const handleCreate = () => {
		resetForm();
		setShowForm(true);
	};

	const handleEdit = (disease) => {
		setFormData({
			id_penyakit: disease.id_penyakit || "",
			nama_penyakit: disease.nama_penyakit || "",
			deskripsi: disease.deskripsi || "",
			solusi: disease.solusi || "",
		});
		setEditingPenyakit(disease);
		setShowForm(true);
	};

	const handleDelete = (idPenyakit) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus penyakit ini?")) {
			setDeleteId(idPenyakit);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");

		if (!formData.id_penyakit || !formData.nama_penyakit) {
			setFormError("ID dan Nama Penyakit wajib diisi.");
			return;
		}

		try {
			if (editingPenyakit) {
				await execUpdate(formData);
			} else {
				await execCreate(formData);
			}
			setShowForm(false);
			resetForm();
			refetchPenyakit();
		} catch (err) {
			const msg = err.response?.data?.message || "Gagal menyimpan data";
			setFormError(msg);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// --- RENDER ---
	return (
		<div className="max-w-7xl mx-auto p-4 md:p-6 font-sans">
			{/* Header Section */}
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Kelola Data Penyakit</h1>
				<div className="w-auto">
					<button
						onClick={handleCreate}
						className="bg-primary py-2 px-6 rounded-lg font-semibold active:scale-98 text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-opacity-90 transition-all"
					>
						<i className="fas fa-plus mr-2"></i>Tambah Penyakit
					</button>
				</div>
			</div>

			{/* Inline Alert Component */}
			{errData && (
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative"
					role="alert"
				>
					<span className="block sm:inline">{errData}</span>
				</div>
			)}

			{/* Inline Card & Table Section */}
			<div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
				{loadData ? (
					<div className="p-12 text-center text-gray-500 italic">
						<i className="fas fa-spinner fa-spin mr-3 text-primary text-xl"></i>Memuat data
						penyakit...
					</div>
				) : penyakitList.length === 0 ? (
					<div className="p-12 text-center text-gray-500 italic font-medium">
						Tidak ada data penyakit yang tersedia.
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									{["ID", "Nama Penyakit", "Deskripsi", "Solusi", "Aksi"].map((header, index) => (
										<th
											key={index}
											className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
										>
											{header}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{penyakitList.map((disease) => (
									<tr key={disease.id_penyakit} className="hover:bg-gray-50 transition-colors">
										<td className="px-6 py-4 text-sm font-bold text-gray-900">
											{disease.id_penyakit}
										</td>
										<td className="px-6 py-4 text-sm font-semibold text-gray-800 uppercase">
											{disease.nama_penyakit}
										</td>
										<td
											className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate italic"
											title={disease.deskripsi}
										>
											{disease.deskripsi || "-"}
										</td>
										<td
											className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate"
											title={disease.solusi}
										>
											{disease.solusi || "-"}
										</td>
										<td className="px-6 py-4 text-sm font-medium">
											<div className="flex gap-3">
												<button
													onClick={() => handleEdit(disease)}
													className="text-blue-600 hover:text-blue-900 flex items-center gap-1 font-bold decoration-dotted transition"
													disabled={isBusy}
												>
													<i className="fas fa-edit text-xs"></i> Ubah
												</button>
												<button
													onClick={() => handleDelete(disease.id_penyakit)}
													className="text-red-600 hover:text-red-900 flex items-center gap-1 font-bold underline decoration-dotted transition"
													disabled={isBusy}
												>
													<i className="fas fa-trash text-xs"></i> Hapus
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Inline Modal & Form Section */}
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
									{editingPenyakit ? "Ubah Data Penyakit" : "Tambah Penyakit Baru"}
								</h2>
								<IoClose
									size={28}
									className="active:scale-90 text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
									onClick={() => {
										setShowForm(false);
										resetForm();
									}}
								/>
							</div>

							{/* Inline DiseaseForm Content */}
							<form onSubmit={handleSubmit}>
								{formError && (
									<div
										className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
										role="alert"
									>
										<span className="block sm:inline">{formError}</span>
									</div>
								)}

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
									<div className="space-y-2">
										<label className="block text-gray-700 font-bold text-sm uppercase tracking-tight">
											ID Penyakit <span className="text-red-500 font-black">*</span>
										</label>
										<input
											type="text"
											name="id_penyakit"
											value={formData.id_penyakit}
											onChange={handleInputChange}
											placeholder="Contoh: P01"
											className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 font-bold"
											required
											disabled={!!editingPenyakit}
										/>
									</div>
									<div className="space-y-2">
										<label className="block text-gray-700 font-bold text-sm uppercase tracking-tight">
											Nama Penyakit <span className="text-red-500 font-black">*</span>
										</label>
										<input
											type="text"
											name="nama_penyakit"
											value={formData.nama_penyakit}
											onChange={handleInputChange}
											placeholder="Nama Penyakit"
											className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
											required
										/>
									</div>
								</div>

								<div className="mb-6 space-y-2">
									<label className="block text-gray-700 font-bold text-sm uppercase tracking-tight">
										Deskripsi
									</label>
									<textarea
										name="deskripsi"
										value={formData.deskripsi}
										onChange={handleInputChange}
										rows={4}
										className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary italic"
										placeholder="Masukkan deskripsi singkat mengenai penyakit..."
									/>
								</div>

								<div className="mb-8 space-y-2">
									<label className="block text-gray-700 font-bold text-sm uppercase tracking-tight">
										Solusi & Perawatan
									</label>
									<textarea
										name="solusi"
										value={formData.solusi}
										onChange={handleInputChange}
										rows={4}
										className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="Langkah-langkah penanganan atau solusi..."
									/>
								</div>

								{/* UPDATED BUTTONS BASED ON image_b48cdf.png */}
								<div className="flex justify-end space-x-4 pt-3">
									<button
										type="button"
										onClick={() => {
											setShowForm(false);
											resetForm();
										}}
										className="px-8 py-2.5 border border-slate-300 rounded-md cursor-pointer text-slate-600 font-medium hover:bg-slate-50 transition-all active:scale-95"
										disabled={isBusy}
									>
										Batal
									</button>
									<button
										type="submit"
										className="px-8 py-2.5 bg-[#1d63ff] text-white rounded-md cursor-pointer font-medium hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
										disabled={isBusy}
									>
										{isBusy ? (
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
										) : (
											<IoSaveOutline className="text-xl" />
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

export default PenyakitAdmin;
