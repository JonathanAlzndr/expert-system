import React, { useState, useEffect, useCallback } from "react";
import { createApiService } from "./apiService";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { LoadingSpinner, ErrorAlert } from "./components";

export default function AdminDiseases() {
	const [penyakit, setPenyakit] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [editingPenyakit, setEditingPenyakit] = useState(null);
	const [formData, setFormData] = useState({
		id_penyakit: "",
		nama_penyakit: "",
		deskripsi: "",
		solusi: "",
	});
	const [submitLoading, setSubmitLoading] = useState(false);
	const [formError, setFormError] = useState("");

	const apiService = React.useMemo(() => createApiService(), []);

	// --- Operasi Data (CRUD) ---

	const fetchPenyakit = useCallback(async () => {
		setLoading(true);
		setError("");

		try {
			const result = await apiService.penyakit.getAll();

			if (result.success) {
				const data = result.data;
				let penyakitData = [];

				if (Array.isArray(data)) {
					penyakitData = data;
				} else if (data?.data && Array.isArray(data.data)) {
					penyakitData = data.data;
				}

				// Memastikan deskripsi dan solusi tidak null untuk tampilan yang aman
				const cleanedData = penyakitData.map((p) => ({
					...p,
					deskripsi: p.deskripsi || "",
					solusi: p.solusi || "",
				}));

				setPenyakit(cleanedData);
			} else {
				setError(result.error);
				setPenyakit([]);
			}
		} catch (error) {
			setError("Terjadi kesalahan saat mengambil data");
			setPenyakit([]);
		} finally {
			setLoading(false);
		}
	}, [apiService]);

	useEffect(() => {
		fetchPenyakit();
	}, [fetchPenyakit]);

	function resetForm() {
		setFormData({ id_penyakit: "", nama_penyakit: "", deskripsi: "", solusi: "" });
		setEditingPenyakit(null);
		setFormError("");
	}

	function handleCreate() {
		resetForm();
		setShowForm(true);
	}

	const handleEdit = useCallback(async (disease) => {
		setFormData({
			id_penyakit: disease.id_penyakit || "",
			nama_penyakit: disease.nama_penyakit || "",
			deskripsi: disease.deskripsi || "",
			solusi: disease.solusi || "",
		});
		setEditingPenyakit(disease);
		setShowForm(true);
	}, []);

	const handleInputChange = useCallback((e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitLoading(true);
		setFormError("");

		const { id_penyakit, nama_penyakit, deskripsi, solusi } = formData;

		if (!id_penyakit || !nama_penyakit || !deskripsi || !solusi) {
			setFormError("Semua kolom harus diisi.");
			setSubmitLoading(false);
			return;
		}

		let result;
		if (editingPenyakit) {
			result = await apiService.penyakit.update(editingPenyakit.id_penyakit, {
				nama_penyakit,
				deskripsi,
				solusi,
			});
		} else {
			result = await apiService.penyakit.create({
				id_penyakit,
				nama_penyakit,
				deskripsi,
				solusi,
			});
		}

		if (result.success) {
			setShowForm(false);
			resetForm();
			setError("");
			await fetchPenyakit();
		} else {
			setFormError(result.error);
		}

		setSubmitLoading(false);
	}

	async function handleDelete(idPenyakit) {
		if (
			window.confirm(
				"Apakah Anda yakin ingin menghapus penyakit ini? Tindakan ini tidak dapat dibatalkan."
			)
		) {
			const result = await apiService.penyakit.delete(idPenyakit);

			if (result.success) {
				await fetchPenyakit();
				setError("");
			} else {
				setError(
					result.error ||
						"Gagal menghapus data. Pastikan penyakit ini tidak terikat pada data aturan."
				);
			}
		}
	}

	const handleCloseModal = useCallback(() => {
		setShowForm(false);
		resetForm();
	}, []);

	// --- Render Utama ---
	return (
		<div className="max-w-7xl mx-auto p-4 md:p-8">
			<div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
				<h1 className="text-3xl font-bold text-primary flex items-center">Kelola Data Penyakit</h1>
				<Button onClick={handleCreate}>
					<i className="fas fa-plus mr-2"></i>Tambah Penyakit
				</Button>
			</div>

			{error && <ErrorAlert message={error} className="mb-6" />}

			{loading ? (
				<LoadingSpinner />
			) : (
				<Card>
					{penyakit.length === 0 && !loading ? (
						<div className="p-8 text-center text-gray-500">
							Tidak ada data penyakit yang tersedia.
						</div>
					) : (
						<Table headers={["ID Penyakit", "Nama Penyakit", "Deskripsi", "Solusi", "Aksi"]}>
							{penyakit.map((disease) => (
								<tr key={disease.id_penyakit} className="hover:bg-gray-50 transition-colors">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{disease.id_penyakit}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
										{disease.nama_penyakit}
									</td>
									{/* Memotong teks untuk tampilan tabel yang rapi */}
									<td className="px-6 py-4 text-sm text-gray-600 max-w-sm">
										<div className="line-clamp-2">{disease.deskripsi || "(kosong)"}</div>
									</td>
									<td className="px-6 py-4 text-sm text-gray-600 max-w-sm">
										<div className="line-clamp-2">{disease.solusi || "(kosong)"}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<div className="flex gap-2">
											<button
												onClick={() => handleEdit(disease)}
												className="text-blue-600 hover:text-blue-900 transition duration-200 flex items-center gap-1 px-3 py-1 rounded"
											>
												<i className="fas fa-edit text-sm"></i> Ubah
											</button>
											<button
												onClick={() => handleDelete(disease.id_penyakit)}
												className="text-red-600 hover:text-red-900 transition duration-200 flex items-center gap-1 px-3 py-1 rounded"
											>
												<i className="fas fa-trash text-sm"></i> Hapus
											</button>
										</div>
									</td>
								</tr>
							))}
						</Table>
					)}
				</Card>
			)}

			{/* Modal untuk Form Tambah/Ubah */}
			{showForm && (
				<Modal
					editingPenyakit={editingPenyakit}
					formData={formData}
					formError={formError}
					submitLoading={submitLoading}
					onClose={handleCloseModal}
					onSubmit={handleSubmit}
					onInputChange={handleInputChange}
				>
					{formError && <ErrorAlert message={formError} className="mb-4" />}

					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label className="block text-gray-700 mb-2 font-medium">ID Penyakit *</label>
								<input
									type="text"
									name="id_penyakit"
									value={formData.id_penyakit}
									onChange={handleInputChange}
									placeholder="Contoh: P01"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 disabled:bg-gray-100"
									required
									disabled={!!editingPenyakit}
								/>
							</div>
							<div>
								<label className="block text-gray-700 mb-2 font-medium">Nama Penyakit *</label>
								<input
									type="text"
									name="nama_penyakit"
									value={formData.nama_penyakit}
									onChange={handleInputChange}
									placeholder="Masukkan nama penyakit"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
									required
								/>
							</div>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 mb-2 font-medium">Deskripsi Penyakit *</label>
							<textarea
								name="deskripsi"
								value={formData.deskripsi}
								onChange={handleInputChange}
								rows={3}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
								placeholder="Masukkan deskripsi lengkap tentang penyakit..."
								required
							/>
						</div>

						<div className="mb-6">
							<label className="block text-gray-700 mb-2 font-medium">Solusi & Perawatan *</label>
							<textarea
								name="solusi"
								value={formData.solusi}
								onChange={handleInputChange}
								rows={3}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
								placeholder="Masukkan solusi dan langkah-langkah perawatan..."
								required
							/>
						</div>

						<div className="flex justify-end space-x-3">
							<Button
								variant="secondary"
								onClick={handleCloseModal}
								disabled={submitLoading}
								type="button"
							>
								Batal
							</Button>
							<Button
								type="submit"
								disabled={submitLoading}
								className="min-w-[120px] justify-center"
							>
								{submitLoading ? (
									<>
										<i className="fas fa-spinner fa-spin"></i>Menyimpan...
									</>
								) : editingPenyakit ? (
									<>
										<i className="fas fa-save mr-2"></i>Ubah Penyakit
									</>
								) : (
									<>
										<i className="fas fa-plus mr-2"></i>Simpan Penyakit
									</>
								)}
							</Button>
						</div>
					</form>
				</Modal>
			)}
		</div>
	);
}
