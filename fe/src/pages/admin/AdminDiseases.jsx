import React, { useState, useEffect, useCallback } from "react";
import { createApiService } from "./apiService";
import { Button } from "./components/Button";
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

	const apiService = React.useMemo(() => createApiService(), []);

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

				setPenyakit(penyakitData);
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

	const handleEdit = useCallback((disease) => {
		// Data dari API mungkin tidak memiliki deskripsi dan solusi bisa null
		setFormData({
			id_penyakit: disease.id_penyakit || "",
			nama_penyakit: disease.nama_penyakit || "",
			deskripsi: "", // Selalu kosong karena tidak ada di response GET
			solusi: disease.solusi || "", // Gunakan yang ada atau empty string jika null
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

		if (!id_penyakit || !nama_penyakit) {
			setFormError("ID Penyakit dan Nama Penyakit harus diisi");
			setSubmitLoading(false);
			return;
		}

		let result;
		if (editingPenyakit) {
			result = await apiService.penyakit.update(editingPenyakit.id_penyakit, {
				nama_penyakit,
				deskripsi: deskripsi || "", // Kirim meski kosong
				solusi: solusi || "", // Kirim meski kosong
			});
		} else {
			result = await apiService.penyakit.create({
				id_penyakit,
				nama_penyakit,
				deskripsi: deskripsi || "",
				solusi: solusi || "",
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

	const handleCloseModal = useCallback(() => {
		setShowForm(false);
		resetForm();
	}, []);

	function renderTableRows() {
		if (penyakit.length === 0) {
			return <EmptyState />;
		}

		return penyakit.map((disease) => (
			<DiseaseRow
				key={disease.id_penyakit}
				disease={disease}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
		));
	}

	return (
		<div className="max-w-7xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Kelola Data Penyakit</h1>
				<Button onClick={handleCreate}>
					<i className="fas fa-plus mr-2"></i>Tambah Penyakit
				</Button>
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
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										ID Penyakit
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Nama Penyakit
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
										Deskripsi
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
										Solusi
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">{renderTableRows()}</tbody>
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
	);
}
