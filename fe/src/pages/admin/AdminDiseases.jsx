import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const LoadingSpinner = () => (
	<div className="flex justify-center items-center py-8">
		<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
	</div>
);

const ErrorAlert = ({ message }) => (
	<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
		<strong>Error:</strong> {message}
	</div>
);

const FormField = ({
	label,
	name,
	value,
	onChange,
	placeholder,
	required,
	disabled = false,
	type = "text",
}) => (
	<div>
		<label className="block text-gray-700 mb-2 font-medium">{label}</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 disabled:bg-gray-100"
			required={required}
			disabled={disabled}
		/>
	</div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder, rows, required }) => (
	<div className="mb-4">
		<label className="block text-gray-700 mb-2 font-medium">{label}</label>
		<textarea
			name={name}
			value={value}
			onChange={onChange}
			rows={rows}
			className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
			placeholder={placeholder}
			required={required}
		/>
	</div>
);

const ActionButton = ({
	onClick,
	children,
	variant = "primary",
	disabled = false,
	className = "",
	type = "button",
}) => {
	const baseStyles =
		"px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 disabled:opacity-50";
	const variants = {
		primary: "bg-blue-600 hover:bg-blue-700 text-white",
		secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
		danger: "bg-red-600 hover:bg-red-700 text-white",
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyles} ${variants[variant]} ${className}`}
		>
			{children}
		</button>
	);
};

// Form Modal sebagai komponen terpisah
const FormModal = ({
	editingPenyakit,
	formData,
	formError,
	submitLoading,
	onClose,
	onSubmit,
	onInputChange,
}) => {
	const modalTitle = editingPenyakit ? "Edit Penyakit" : "Tambah Penyakit Baru";
	const submitButtonText = submitLoading
		? "Menyimpan..."
		: editingPenyakit
		? "Update Penyakit"
		: "Simpan Penyakit";

	// Handler untuk mencegah event bubbling
	const handleModalClick = (e) => {
		e.stopPropagation();
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
				onClick={handleModalClick}
			>
				<div className="flex justify-between items-center p-6 border-b">
					<h2 className="text-xl font-semibold text-gray-800">{modalTitle}</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition duration-200"
						type="button"
					>
						<i className="fas fa-times text-lg"></i>
					</button>
				</div>

				<div className="p-6">
					{formError && <ErrorAlert message={formError} />}

					<form onSubmit={onSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<FormField
								label="ID Penyakit *"
								name="id_penyakit"
								value={formData.id_penyakit}
								onChange={onInputChange}
								placeholder="Contoh: P01"
								required
								disabled={!!editingPenyakit}
							/>
							<FormField
								label="Nama Penyakit *"
								name="nama_penyakit"
								value={formData.nama_penyakit}
								onChange={onInputChange}
								placeholder="Masukkan nama penyakit"
								required
							/>
						</div>

						<TextAreaField
							label="Deskripsi Penyakit *"
							name="deskripsi"
							value={formData.deskripsi}
							onChange={onInputChange}
							placeholder="Masukkan deskripsi lengkap tentang penyakit..."
							rows={4}
							required
						/>

						<TextAreaField
							label="Solusi & Perawatan *"
							name="solusi"
							value={formData.solusi}
							onChange={onInputChange}
							placeholder="Masukkan solusi dan langkah-langkah perawatan..."
							rows={4}
							required
						/>

						<div className="flex justify-end space-x-3">
							<ActionButton
								variant="secondary"
								onClick={onClose}
								disabled={submitLoading}
								type="button"
							>
								Batal
							</ActionButton>
							<ActionButton
								type="submit"
								disabled={submitLoading}
								className="min-w-[120px] justify-center"
							>
								{submitLoading ? (
									<>
										<i className="fas fa-spinner fa-spin"></i>
										Menyimpan...
									</>
								) : (
									<>
										<i className={`fas ${editingPenyakit ? "fa-save" : "fa-plus"}`}></i>
										{submitButtonText}
									</>
								)}
							</ActionButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

// API Service
const createApiService = () => {
	const getAuthHeader = () => {
		const token = localStorage.getItem("adminToken");
		return token ? { Authorization: `Bearer ${token}` } : {};
	};

	return {
		async get(url) {
			try {
				const response = await axios.get(url, {
					headers: {
						"Content-Type": "application/json",
						...getAuthHeader(),
					},
				});
				return { success: true, data: response.data };
			} catch (error) {
				return {
					success: false,
					error: error.response?.data?.message || error.message,
				};
			}
		},

		async post(url, data) {
			try {
				const response = await axios.post(url, data, {
					headers: {
						"Content-Type": "application/json",
						...getAuthHeader(),
					},
				});
				return { success: true, data: response.data };
			} catch (error) {
				return {
					success: false,
					error: error.response?.data?.message || error.message,
				};
			}
		},

		async put(url, data) {
			try {
				const response = await axios.put(url, data, {
					headers: {
						"Content-Type": "application/json",
						...getAuthHeader(),
					},
				});
				return { success: true, data: response.data };
			} catch (error) {
				return {
					success: false,
					error: error.response?.data?.message || error.message,
				};
			}
		},

		async delete(url) {
			try {
				const response = await axios.delete(url, {
					headers: {
						"Content-Type": "application/json",
						...getAuthHeader(),
					},
				});
				return { success: true, data: response.data };
			} catch (error) {
				return {
					success: false,
					error: error.response?.data?.message || error.message,
				};
			}
		},
	};
};

// Main Component
const AdminDiseases = () => {
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

	const api = createApiService();
	const API_URL = "http://127.0.0.1:5000/api/penyakit";

	// Fetch data
	const fetchPenyakit = async () => {
		setLoading(true);
		setError("");

		const result = await api.get(API_URL);

		if (result.success) {
			const data = result.data;
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

		setLoading(false);
	};

	// Create penyakit
	const handleCreatePenyakit = async (data) => {
		const result = await api.post(API_URL, data);
		return result;
	};

	// Update penyakit
	const handleUpdatePenyakit = async (id, data) => {
		const result = await api.put(`${API_URL}/${id}`, data);
		return result;
	};

	// Delete penyakit
	const handleDeletePenyakit = async (id) => {
		const result = await api.delete(`${API_URL}/${id}`);
		return result;
	};

	useEffect(() => {
		fetchPenyakit();
	}, []);

	// Form handlers dengan useCallback
	const resetForm = useCallback(() => {
		setFormData({
			id_penyakit: "",
			nama_penyakit: "",
			deskripsi: "",
			solusi: "",
		});
		setEditingPenyakit(null);
		setFormError("");
	}, []);

	const handleCreate = () => {
		resetForm();
		setShowForm(true);
	};

	const handleEdit = useCallback((disease) => {
		setFormData({
			id_penyakit: disease.id_penyakit,
			nama_penyakit: disease.nama_penyakit,
			deskripsi: disease.deskripsi,
			solusi: disease.solusi,
		});
		setEditingPenyakit(disease);
		setShowForm(true);
	}, []);

	const handleInputChange = useCallback((e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitLoading(true);
		setFormError("");

		// Validate form
		const { id_penyakit, nama_penyakit, deskripsi, solusi } = formData;
		if (!id_penyakit || !nama_penyakit || !deskripsi || !solusi) {
			setFormError("Semua field harus diisi");
			setSubmitLoading(false);
			return;
		}

		// Check if token exists
		const token = localStorage.getItem("adminToken");
		if (!token) {
			setFormError("Token admin tidak ditemukan. Silakan login kembali.");
			setSubmitLoading(false);
			return;
		}

		// Prepare data
		const postData = {
			id_penyakit: id_penyakit,
			nama_penyakit: nama_penyakit,
			deskripsi: deskripsi,
			Solusi: solusi,
		};

		let result;
		if (editingPenyakit) {
			result = await handleUpdatePenyakit(editingPenyakit.id_penyakit, postData);
		} else {
			result = await handleCreatePenyakit(postData);
		}

		if (result.success) {
			setShowForm(false);
			resetForm();
			setError("");
			await fetchPenyakit(); // Refresh data
		} else {
			setFormError(result.error);
		}

		setSubmitLoading(false);
	};

	const handleDelete = async (idPenyakit) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus penyakit ini?")) {
			const result = await handleDeletePenyakit(idPenyakit);
			if (result.success) {
				await fetchPenyakit(); // Refresh data
				setError("");
			} else {
				setError(result.error);
			}
		}
	};

	const handleCloseModal = useCallback(() => {
		setShowForm(false);
		resetForm();
	}, [resetForm]);

	// Table row component
	const DiseaseRow = ({ disease }) => (
		<tr className="hover:bg-gray-50 transition-colors">
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
				{disease.id_penyakit}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
				{disease.nama_penyakit}
			</td>
			<td className="px-6 py-4 text-sm text-gray-600 max-w-md">
				<div className="line-clamp-2">
					{disease.deskripsi?.length > 100
						? `${disease.deskripsi.substring(0, 100)}...`
						: disease.deskripsi || "-"}
				</div>
			</td>
			<td className="px-6 py-4 text-sm text-gray-600 max-w-md">
				<div className="line-clamp-2">
					{disease.solusi?.length > 100
						? `${disease.solusi.substring(0, 100)}...`
						: disease.solusi || "-"}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
				<div className="flex gap-2">
					<button
						onClick={() => handleEdit(disease)}
						className="text-blue-600 hover:text-blue-900 transition duration-200 flex items-center gap-1 px-3 py-1 rounded border border-blue-200 hover:bg-blue-50"
					>
						<i className="fas fa-edit text-sm"></i> Edit
					</button>
					<button
						onClick={() => handleDelete(disease.id_penyakit)}
						className="text-red-600 hover:text-red-900 transition duration-200 flex items-center gap-1 px-3 py-1 rounded border border-red-200 hover:bg-red-50"
					>
						<i className="fas fa-trash text-sm"></i> Hapus
					</button>
				</div>
			</td>
		</tr>
	);

	// Empty state component
	const EmptyState = () => (
		<tr>
			<td colSpan="5" className="px-6 py-4 text-center text-gray-500">
				Tidak ada data penyakit
			</td>
		</tr>
	);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Kelola Data Penyakit</h1>
					<ActionButton onClick={handleCreate}>
						<i className="fas fa-plus"></i> Tambah Penyakit
					</ActionButton>
				</div>

				{/* Error Alert */}
				{error && <ErrorAlert message={error} />}

				{/* Content */}
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
										penyakit.map((disease) => (
											<DiseaseRow key={disease.id_penyakit} disease={disease} />
										))
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{/* Modal */}
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
};

export default AdminDiseases;
