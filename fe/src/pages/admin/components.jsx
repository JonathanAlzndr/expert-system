// components.js
import React from "react";

// LoadingSpinner Component
export function LoadingSpinner() {
	return (
		<div className="flex justify-center items-center py-8">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
		</div>
	);
}

// ErrorAlert Component
export function ErrorAlert(props) {
	const { message } = props;

	return (
		<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
			<strong>Error:</strong> {message}
		</div>
	);
}

// ActionButton Component
export function ActionButton(props) {
	const {
		onClick,
		children,
		variant = "primary",
		disabled = false,
		className = "",
		type = "button",
	} = props;

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
}

// FormModal Component
export function FormModal(props) {
	const { editingPenyakit, formData, formError, submitLoading, onClose, onSubmit, onInputChange } =
		props;

	const modalTitle = editingPenyakit ? "Ubah Penyakit" : "Tambah Penyakit Baru";
	const submitButtonText = submitLoading
		? "Menyimpan..."
		: editingPenyakit
		? "Ubah Penyakit"
		: "Simpan Penyakit";

	function handleModalClick(e) {
		e.stopPropagation();
	}

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
							<div>
								<label className="block text-gray-700 mb-2 font-medium">ID Penyakit *</label>
								<input
									type="text"
									name="id_penyakit"
									value={formData.id_penyakit}
									onChange={onInputChange}
									placeholder="Contoh: P01"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 disabled:bg-gray-100"
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
									onChange={onInputChange}
									placeholder="Masukkan nama penyakit"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
									required
								/>
							</div>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 mb-2 font-medium">Deskripsi Penyakit *</label>
							<textarea
								name="deskripsi"
								value={formData.deskripsi}
								onChange={onInputChange}
								rows={4}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
								placeholder="Masukkan deskripsi lengkap tentang penyakit..."
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 mb-2 font-medium">Solusi & Perawatan *</label>
							<textarea
								name="solusi"
								value={formData.solusi}
								onChange={onInputChange}
								rows={4}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
								placeholder="Masukkan solusi dan langkah-langkah perawatan..."
								required
							/>
						</div>

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
										<i className="fas fa-spinner fa-spin"></i>Menyimpan...
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
}

// DiseaseRow Component
export function DiseaseRow(props) {
	const { disease, onEdit, onDelete } = props;

	return (
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
						onClick={() => onEdit(disease)}
						className="text-blue-600 hover:text-blue-900 transition duration-200 flex items-center gap-1 px-3 py-1 rounded "
					>
						<i className="fas fa-edit text-sm"></i> Ubah
					</button>
					<button
						onClick={() => onDelete(disease.id_penyakit)}
						className="text-red-600 hover:text-red-900 transition duration-200 flex items-center gap-1 px-3 py-1 rounded "
					>
						<i className="fas fa-trash text-sm"></i> Hapus
					</button>
				</div>
			</td>
		</tr>
	);
}

// EmptyState Component
export function EmptyState() {
	return (
		<tr>
			<td colSpan="5" className="px-6 py-4 text-center text-gray-500">
				Tidak ada data penyakit
			</td>
		</tr>
	);
}
