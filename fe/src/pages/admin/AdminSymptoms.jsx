import React, { useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Modal from "../../components/common/Modal";
import FormInput from "../../components/ui/FormInput";
import { Button } from "./components/Button";
import { useGejala } from "../../hooks/useGejala";

const AdminSymptoms = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	const { gejala, meta, loading, error, createGejala, updateGejala, deleteGejala } = useGejala(
		currentPage,
		itemsPerPage
	);

	const [showForm, setShowForm] = useState(false);
	const [editingGejala, setEditingGejala] = useState(null);
	const [formData, setFormData] = useState({
		id_gejala: "",
		nama_gejala: "",
		teks_pertanyaan: "",
	});
	const [submitLoading, setSubmitLoading] = useState(false);
	const [formError, setFormError] = useState("");

	const totalPages = meta ? meta.total_pages : 1;
	const totalData = meta ? meta.total_data : 0;

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitLoading(true);
		setFormError("");

		let result;
		if (editingGejala) {
			result = await updateGejala(editingGejala.id_gejala, formData);
		} else {
			result = await createGejala(formData);
		}

		if (result.success) {
			setShowForm(false);
			setFormData({ id_gejala: "", nama_gejala: "", teks_pertanyaan: "" });
			setEditingGejala(null);
		} else {
			setFormError(result.error);
		}
		setSubmitLoading(false);
	};

	// Fungsi handle delete pakai hook
	const handleDelete = async (idGejala) => {
		if (window.confirm("Apakah Anda yakin...?")) {
			await deleteGejala(idGejala);
		}
	};

	const handleEdit = (gejalaItem) => {
		setFormData({
			id_gejala: gejalaItem.id_gejala,
			nama_gejala: gejalaItem.nama_gejala,
			teks_pertanyaan: gejalaItem.teks_pertanyaan,
		});
		setEditingGejala(gejalaItem);
		setShowForm(true);
	};

	const handleCloseModal = () => {
		setShowForm(false);
		setEditingGejala(null);
		setFormData({ id_gejala: "", nama_gejala: "", teks_pertanyaan: "" });
	};

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Kelola Data Gejala</h1>
				<Button onClick={() => setShowForm(true)}>
					<i className="fas fa-plus mr-2"></i> Tambah Gejala
				</Button>
			</div>

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			{loading ? (
				<div className="flex justify-center items-center py-8">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			) : (
				<Card>
					<Table headers={["ID Gejala", "Nama Gejala", "Teks Pertanyaan", "Aksi"]}>
						{/* 4. RENDER DATA LANGSUNG (gejala) */}
						{gejala.map((item) => (
							<tr key={item.id_gejala}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{item.id_gejala}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{item.nama_gejala}
								</td>
								<td className="px-6 py-4 text-sm text-gray-500">{item.teks_pertanyaan}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button
										className="text-blue-600 hover:text-blue-900 mr-3"
										onClick={() => handleEdit(item)}
									>
										<i className="fas fa-edit"></i> Ubah
									</button>
									<button
										className="text-red-600 hover:text-red-900"
										onClick={() => handleDelete(item.id_gejala)}
									>
										<i className="fas fa-trash"></i> Hapus
									</button>
								</td>
							</tr>
						))}
					</Table>

					{/* 5. KONTROL PAGINATION UPDATE */}
					{!loading && !error && (
						<div className="flex justify-between items-center mt-4 px-6 py-4 border-t border-gray-100">
							<span className="text-sm text-gray-600">
								Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
								{Math.min(currentPage * itemsPerPage, totalData)} dari {totalData} data
							</span>
							<div className="flex space-x-2">
								<button
									onClick={() => paginate(currentPage - 1)}
									disabled={currentPage === 1}
									className={`px-3 py-1 rounded border ${
										currentPage === 1
											? "bg-gray-100 text-gray-400 cursor-not-allowed"
											: "bg-white text-blue-600 hover:bg-gray-50 border-gray-300"
									}`}
								>
									Previous
								</button>

								{[...Array(totalPages)].map((_, index) => (
									<button
										key={index}
										onClick={() => paginate(index + 1)}
										className={`px-3 py-1 rounded border ${
											currentPage === index + 1
												? "bg-blue-600 text-white border-blue-600"
												: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
										}`}
									>
										{index + 1}
									</button>
								))}

								<button
									onClick={() => paginate(currentPage + 1)}
									disabled={currentPage >= totalPages}
									className={`px-3 py-1 rounded border ${
										currentPage >= totalPages
											? "bg-gray-100 text-gray-400 cursor-not-allowed"
											: "bg-white text-blue-600 hover:bg-gray-50 border-gray-300"
									}`}
								>
									Next
								</button>
							</div>
						</div>
					)}
				</Card>
			)}

			{/* Modal tetap sama */}
			<Modal
				isOpen={showForm}
				onClose={handleCloseModal}
				title={editingGejala ? "Ubah Gejala" : "Tambah Gejala Baru"}
			>
				{/* ... isi modal sama ... */}
				{formError && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{formError}
					</div>
				)}
				<form onSubmit={handleSubmit}>
					<FormInput
						label="ID Gejala"
						name="id_gejala"
						value={formData.id_gejala}
						onChange={handleInputChange}
						placeholder="Contoh: G01"
						required
						disabled={!!editingGejala}
					/>
					<FormInput
						label="Nama Gejala"
						name="nama_gejala"
						value={formData.nama_gejala}
						onChange={handleInputChange}
						placeholder="Masukkan nama gejala"
						required
					/>
					<div className="mb-6">
						<label className="block text-gray-700 mb-2">Teks Pertanyaan</label>
						<textarea
							name="teks_pertanyaan"
							value={formData.teks_pertanyaan}
							onChange={handleInputChange}
							rows="3"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="Masukkan teks pertanyaan untuk diagnosis"
							required
						></textarea>
					</div>
					<div className="flex justify-end">
						<Button type="button" variant="secondary" className="mr-2" onClick={handleCloseModal}>
							Batal
						</Button>
						<Button type="submit" disabled={submitLoading}>
							{submitLoading ? "Menyimpan..." : editingGejala ? "Perbarui" : "Simpan"}
						</Button>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default AdminSymptoms;
