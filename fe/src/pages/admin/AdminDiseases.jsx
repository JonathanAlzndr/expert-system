// AdminDiseases.js
import React, { useState, useEffect, useCallback } from "react";
import { createApiService } from "./apiService";
import {
	LoadingSpinner,
	ErrorAlert,
	ActionButton,
	FormModal,
	DiseaseRow,
	EmptyState,
} from "./components";

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

	// Inisialisasi API service
	const apiService = createApiService();

	const fetchPenyakit = useCallback(
		async function () {
			setLoading(true);
			setError("");

			try {
				const result = await apiService.penyakit.getAll();

				if (result.success) {
					const data = result.data;
					// Handle berbagai format response
					if (Array.isArray(data)) {
						setPenyakit(data);
					} else if (data?.data && Array.isArray(data.data)) {
						setPenyakit(data.data);
					} else {
						setPenyakit([]);
					}
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
		},
		[apiService]
	);

	useEffect(
		function () {
			fetchPenyakit();
		},
		[fetchPenyakit]
	);

	const resetForm = useCallback(function () {
		setFormData({ id_penyakit: "", nama_penyakit: "", deskripsi: "", solusi: "" });
		setEditingPenyakit(null);
		setFormError("");
	}, []);

	function handleCreate() {
		resetForm();
		setShowForm(true);
	}

	function handleEdit(disease) {
		setFormData({
			id_penyakit: disease.id_penyakit,
			nama_penyakit: disease.nama_penyakit,
			deskripsi: disease.deskripsi,
			solusi: disease.solusi,
		});
		setEditingPenyakit(disease);
		setShowForm(true);
	}

	function handleInputChange(e) {
		const { name, value } = e.target;
		setFormData(function (prev) {
			return { ...prev, [name]: value };
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitLoading(true);
		setFormError("");

		const { id_penyakit, nama_penyakit, deskripsi, solusi } = formData;

		// Validasi form
		if (!id_penyakit || !nama_penyakit || !deskripsi || !solusi) {
			setFormError("Semua field harus diisi");
			setSubmitLoading(false);
			return;
		}

		let result;
		if (editingPenyakit) {
			// Method PUT - MASALAH UTAMA DIPERBAIKI DI SINI
			// Menggunakan field 'Solusi' (huruf besar) untuk backend
			const updateData = {
				nama_penyakit,
				deskripsi,
				solusi, // Akan diubah menjadi 'Solusi' di apiService
			};
			result = await apiService.penyakit.update(editingPenyakit.id_penyakit, updateData);
		} else {
			// Method POST
			const createData = {
				id_penyakit,
				nama_penyakit,
				deskripsi,
				solusi, // Akan diubah menjadi 'Solusi' di apiService
			};
			result = await apiService.penyakit.create(createData);
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
		if (window.confirm("Apakah Anda yakin ingin menghapus penyakit ini?")) {
			const result = await apiService.penyakit.delete(idPenyakit);

			if (result.success) {
				await fetchPenyakit();
				setError("");
			} else {
				setError(result.error);
			}
		}
	}

	function handleCloseModal() {
		setShowForm(false);
		resetForm();
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Kelola Data Penyakit</h1>
					<ActionButton onClick={handleCreate}>
						<i className="fas fa-plus"></i> Tambah Penyakit
					</ActionButton>
				</div>

				{error && <ErrorAlert message={error} />}

				<div className="bg-white rounded-lg shadow-md">
					{loading ? (
						<LoadingSpinner />
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										{["ID Penyakit", "Nama Penyakit", "Deskripsi", "Solusi", "Aksi"].map(
											(header) => (
												<th
													key={header}
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													{header}
												</th>
											)
										)}
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{penyakit.length === 0 ? (
										<EmptyState />
									) : (
										penyakit.map(function (disease) {
											return (
												<DiseaseRow
													key={disease.id_penyakit}
													disease={disease}
													onEdit={handleEdit}
													onDelete={handleDelete}
												/>
											);
										})
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{showForm && (
					<FormModal
						editingPenyakit={editingPenyakit}
						formData={formData}
						formError={formError}
						submitLoading={submitLoading}
						onClose={handleCloseModal}
						onSubmit={handleSubmit}
						onInputChange={handleInputChange}
					/>
				)}
			</div>
		</div>
	);
}
