import React, { useState, useEffect, useCallback } from "react";

// --- Components ---
import Card from "../../components/Card";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { Modal } from "../../components/Modal";
import Alert from "../../components/Alert";
import DiseaseForm from "../../components/DiseaseForm";

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

	// --- 1. FETCH DATA (READ) ---
	// FIX: Hapus "/admin", cukup "/penyakit" agar sesuai dengan route Flask "/api/penyakit"
	const {
		data: penyakitResp,
		loading: loadData,
		error: errData,
		execute: refetchPenyakit,
	} = useFetch("/penyakit", "GET", null, { autoFetch: true });

	const penyakitList = penyakitResp?.data || penyakitResp || [];

	// --- 2. CREATE (POST) ---
	// FIX: Hapus "/admin", menjadi "/penyakit"
	const { execute: execCreate, loading: loadCreate } = useFetch("/penyakit", "POST", null, {
		autoFetch: false,
	});

	// --- 3. UPDATE (PUT) ---
	// FIX: Hapus "/admin"
	const updateUrl = editingPenyakit ? `/penyakit/${editingPenyakit.id_penyakit}` : "";
	const { execute: execUpdate, loading: loadUpdate } = useFetch(updateUrl, "PUT", null, {
		autoFetch: false,
	});

	// --- 4. DELETE (DELETE) ---
	// FIX: Hapus "/admin"
	const deleteUrl = deleteId ? `/penyakit/${deleteId}` : "";
	const { execute: execDelete, loading: loadDelete } = useFetch(deleteUrl, "DELETE", null, {
		autoFetch: false,
	});

	// Gabungan status loading
	const isBusy = loadCreate || loadUpdate || loadDelete;

	// --- EFFECTS ---

	// Effect khusus untuk DELETE
	useEffect(() => {
		if (deleteId) {
			execDelete()
				.then(() => {
					refetchPenyakit(); // Refresh data setelah hapus
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
			setDeleteId(idPenyakit); // Trigger effect delete
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
				// execUpdate otomatis menggunakan URL yang benar karena updateUrl berubah saat editingPenyakit terisi
				await execUpdate(formData);
			} else {
				await execCreate(formData);
			}

			// Jika sukses
			setShowForm(false);
			resetForm();
			refetchPenyakit(); // Refresh tabel
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
		<div className="max-w-7xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Kelola Data Penyakit</h1>
				<div className="w-42">
					<Button onClick={handleCreate}>
						<i className="fas fa-plus mr-2"></i>Tambah Penyakit
					</Button>
				</div>
			</div>

			<Alert message={errData} type="error" />

			{/* Tabel Data */}
			<Card className="p-0 overflow-hidden">
				{loadData ? (
					<div className="p-8 text-center text-gray-500">
						<i className="fas fa-spinner fa-spin mr-2"></i>Memuat data...
					</div>
				) : penyakitList.length === 0 ? (
					<div className="p-8 text-center text-gray-500">Tidak ada data penyakit.</div>
				) : (
					<Table headers={["ID", "Nama Penyakit", "Deskripsi", "Solusi", "Aksi"]}>
						{penyakitList.map((disease) => (
							<tr
								key={disease.id_penyakit}
								className="hover:bg-gray-50 transition-colors border-b last:border-b-0"
							>
								<td className="px-6 py-4 text-sm font-medium text-gray-900">
									{disease.id_penyakit}
								</td>
								<td className="px-6 py-4 text-sm font-semibold text-gray-900">
									{disease.nama_penyakit}
								</td>
								<td
									className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate"
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
									<div className="flex gap-2">
										<button
											onClick={() => handleEdit(disease)}
											className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition"
											disabled={isBusy}
										>
											<i className="fas fa-edit"></i>
											Ubah
										</button>
										<button
											onClick={() => handleDelete(disease.id_penyakit)}
											className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50 transition"
											disabled={isBusy}
										>
											<i className="fas fa-trash"></i>
											Hapus
										</button>
									</div>
								</td>
							</tr>
						))}
					</Table>
				)}
			</Card>

			{/* Modal & Form */}
			<Modal
				isOpen={showForm}
				onClose={() => {
					setShowForm(false);
					resetForm();
				}}
				title={editingPenyakit ? "Ubah Data Penyakit" : "Tambah Penyakit Baru"}
			>
				<DiseaseForm
					formData={formData}
					onChange={handleInputChange}
					onSubmit={handleSubmit}
					onCancel={() => {
						setShowForm(false);
						resetForm();
					}}
					loading={isBusy}
					error={formError}
					isEdit={!!editingPenyakit}
				/>
			</Modal>
		</div>
	);
};

export default PenyakitAdmin;
