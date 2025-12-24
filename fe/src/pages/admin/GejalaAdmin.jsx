import React, { useState, useEffect, useCallback } from "react";

// --- Components ---
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Modal } from "../../components/Modal";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import Pagination from "../../components/Pagination";

// --- Hook ---
import useFetch from "../../api/useFetch";

const GejalaAdmin = () => {
	// --- 1. STATE MANAGEMENT ---
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	// UI State
	const [showForm, setShowForm] = useState(false);
	const [editingGejala, setEditingGejala] = useState(null);
	const [formError, setFormError] = useState("");

	// Trigger Delete
	const [deleteId, setDeleteId] = useState(null);

	// Form Data
	const [formData, setFormData] = useState({
		id_gejala: "",
		nama_gejala: "",
		teks_pertanyaan: "",
	});

	// --- 2. FETCH DATA (READ) ---
	const {
		data: gejalaResp,
		loading: loadData,
		error: errData,
		execute: refetchGejala,
	} = useFetch(`/admin/gejala?page=${currentPage}&limit=${itemsPerPage}`, "GET", null, {
		autoFetch: true,
	});

	// Normalisasi Data
	const gejalaList = gejalaResp?.data || gejalaResp || [];
	const meta = gejalaResp?.meta || {};

	// --- 3. CRUD ACTIONS ---

	// Create
	const { execute: execCreate, loading: loadCreate } = useFetch("/admin/gejala", "POST", null, {
		autoFetch: false,
	});

	// Update
	const updateUrl = editingGejala ? `/admin/gejala/${editingGejala.id_gejala}` : "";
	const { execute: execUpdate, loading: loadUpdate } = useFetch(updateUrl, "PUT", null, {
		autoFetch: false,
	});

	// Delete
	const deleteUrl = deleteId ? `/admin/gejala/${deleteId}` : "";
	const { execute: execDelete, loading: loadDelete } = useFetch(deleteUrl, "DELETE", null, {
		autoFetch: false,
	});

	const isBusy = loadCreate || loadUpdate || loadDelete;

	// --- 4. EFFECTS ---

	// Effect Delete
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

	// Pagination Handlers
	const handleNextPage = () => {
		if (currentPage < meta.total_pages) setCurrentPage((prev) => prev + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	// --- RENDER ---
	return (
		<div className="max-w-7xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Kelola Data Gejala</h1>
				<div className="w-40">
					<Button onClick={handleCreate}>
						<i className="fas fa-plus mr-2"></i> Tambah Gejala
					</Button>
				</div>
			</div>

			<Alert message={errData} type="error" />

			{/* Tabel Data  */}
			<Card className="p-0 overflow-hidden">
				{loadData ? (
					<div className="p-8 text-center text-gray-500">
						<i className="fas fa-spinner fa-spin mr-2"></i>Memuat data...
					</div>
				) : gejalaList.length === 0 ? (
					<div className="p-8 text-center text-gray-500">Tidak ada data gejala.</div>
				) : (
					<Table headers={["ID Gejala", "Nama Gejala", "Teks Pertanyaan", "Aksi"]}>
						{gejalaList.map((item) => (
							<tr
								key={item.id_gejala}
								className="hover:bg-gray-50 transition-colors border-b last:border-b-0"
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{item.id_gejala}
								</td>
								<td className="px-6 py-4 text-sm font-semibold text-gray-900">
									{item.nama_gejala}
								</td>
								<td
									className="px-6 py-4 text-sm text-gray-600 max-w-sm truncate"
									title={item.teks_pertanyaan}
								>
									{item.teks_pertanyaan}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div className="flex gap-2">
										<button
											className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition"
											onClick={() => handleEdit(item)}
											disabled={isBusy}
										>
											<i className="fas fa-edit"></i>Ubah
										</button>
										<button
											className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50 transition"
											onClick={() => handleDelete(item.id_gejala)}
											disabled={isBusy}
										>
											<i className="fas fa-trash"></i>Hapus
										</button>
									</div>
								</td>
							</tr>
						))}
					</Table>
				)}
			</Card>

			{/* Pagination */}
			{meta.total_data > itemsPerPage && (
				<Pagination
					page={currentPage}
					totalPages={meta.total_pages || 1}
					onNext={handleNextPage}
					onPrev={handlePrevPage}
					loading={loadData}
				/>
			)}

			{/* Modal Form  */}
			<Modal
				isOpen={showForm}
				onClose={() => {
					setShowForm(false);
					resetForm();
				}}
				title={editingGejala ? "Ubah Gejala" : "Tambah Gejala Baru"}
			>
				<GejalaForm
					formData={formData}
					onChange={handleInputChange}
					onSubmit={handleSubmit}
					onCancel={() => {
						setShowForm(false);
						resetForm();
					}}
					loading={isBusy}
					error={formError}
					isEdit={!!editingGejala}
				/>
			</Modal>
		</div>
	);
};

// --- SUB COMPONENT FORM ---
const GejalaForm = ({ formData, onChange, onSubmit, onCancel, loading, error, isEdit }) => {
	return (
		<form onSubmit={onSubmit}>
			<Alert message={error} type="error" />

			<div className="mb-4">
				<FormInput
					label="ID Gejala"
					name="id_gejala"
					value={formData.id_gejala}
					onChange={onChange}
					placeholder="Contoh: G01"
					required
					disabled={isEdit}
				/>
			</div>

			<div className="mb-4">
				<FormInput
					label="Nama Gejala"
					name="nama_gejala"
					value={formData.nama_gejala}
					onChange={onChange}
					placeholder="Masukkan nama gejala"
					required
				/>
			</div>

			<div className="mb-6">
				<label className="block text-gray-700 text-sm font-bold mb-2">Teks Pertanyaan</label>
				<textarea
					name="teks_pertanyaan"
					value={formData.teks_pertanyaan}
					onChange={onChange}
					rows="3"
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="Masukkan teks pertanyaan untuk diagnosis"
					required
				></textarea>
			</div>

			<div className="flex justify-end space-x-3">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
					disabled={loading}
				>
					Batal
				</button>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
					disabled={loading}
				>
					{loading ? (
						<>
							<i className="fas fa-spinner fa-spin mr-2"></i>
							Menyimpan...
						</>
					) : (
						<>
							<i className="fas fa-save mr-2"></i>
							Simpan
						</>
					)}
				</button>
			</div>
		</form>
	);
};

export default GejalaAdmin;
