import { Button } from "./Button";

const AdminModal = ({
	editingPenyakit,
	formData,
	formError,
	submitLoading,
	onClose,
	onSubmit,
	onInputChange,
}) => {
	const modalTitle = editingPenyakit ? "Ubah Penyakit" : "Tambah Penyakit Baru";
	const submitButtonText = submitLoading
		? "Menyimpan..."
		: editingPenyakit
		? "Ubah Penyakit"
		: "Simpan Penyakit";

	function handleModalClick(e) {
		// Mencegah klik pada konten modal menutup modal
		e.stopPropagation();
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300"
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
					{formError && (
						<div
							className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
							role="alert"
						>
							{formError}
						</div>
					)}

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
							<Button variant="secondary" onClick={onClose} type="button">
								Batal
							</Button>
							<Button type="submit" className="min-w-[120px] justify-center">
								{submitLoading ? (
									<>
										<i className="fas fa-spinner fa-spin mr-2"></i>Menyimpan...
									</>
								) : (
									<>
										<i className={`fas ${editingPenyakit ? "fa-save" : "fa-plus"} mr-2`}></i>
										{submitButtonText}
									</>
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminModal;
