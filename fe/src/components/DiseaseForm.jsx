import React from "react";
import Button from "./Button";
import Alert from "./Alert"; // Path langsung ke components

const DiseaseForm = ({ formData, onChange, onSubmit, onCancel, loading, error, isEdit }) => {
	return (
		<form onSubmit={onSubmit}>
			{/* Tampilkan Error Form jika ada */}
			<Alert message={error} type="error" />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label className="block text-gray-700 mb-2 font-medium text-sm">
						ID Penyakit <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="id_penyakit"
						value={formData.id_penyakit}
						onChange={onChange}
						placeholder="Contoh: P01"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
						required
						disabled={isEdit} // ID tidak bisa diedit
					/>
				</div>
				<div>
					<label className="block text-gray-700 mb-2 font-medium text-sm">
						Nama Penyakit <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="nama_penyakit"
						value={formData.nama_penyakit}
						onChange={onChange}
						placeholder="Nama Penyakit"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						required
					/>
				</div>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700 mb-2 font-medium text-sm">Deskripsi</label>
				<textarea
					name="deskripsi"
					value={formData.deskripsi}
					onChange={onChange}
					rows={3}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="Deskripsi singkat..."
				/>
			</div>

			<div className="mb-6">
				<label className="block text-gray-700 mb-2 font-medium text-sm">Solusi & Perawatan</label>
				<textarea
					name="solusi"
					value={formData.solusi}
					onChange={onChange}
					rows={3}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="Solusi penanganan..."
				/>
			</div>

			<div className="flex justify-end space-x-3">
				<Button variant="secondary" onClick={onCancel} disabled={loading} type="button">
					Batal
				</Button>
				<Button type="submit" disabled={loading} className="min-w-[120px]">
					{loading ? "Menyimpan..." : "Simpan"}
				</Button>
			</div>
		</form>
	);
};

export default DiseaseForm;
