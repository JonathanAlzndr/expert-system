// components/rules/RuleForm.jsx
import React, { useState, useEffect } from "react";
import MultiSelectDropdown from "../common/MultiSelectDropdown";

const RuleForm = ({
	formData,
	onChange,
	onSubmit,
	onClose,
	isEditMode,
	submitLoading,
	formError,
	penyakit,
	gejala,
}) => {
	const [selectedGejala, setSelectedGejala] = useState([]);

	// Initialize selectedGejala from formData.premises
	useEffect(() => {
		if (formData.premises && Array.isArray(formData.premises)) {
			setSelectedGejala(formData.premises);
		} else if (formData.id_gejala) {
			// Handle backward compatibility if data masih menggunakan id_gejala
			if (typeof formData.id_gejala === "string") {
				setSelectedGejala([formData.id_gejala]);
			}
		} else {
			setSelectedGejala([]);
		}
	}, [formData.premises, formData.id_gejala]);

	const handleGejalaChange = (newSelectedGejala) => {
		setSelectedGejala(newSelectedGejala);
		// Update formData.premises (array of gejala IDs)
		onChange("premises", newSelectedGejala);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Pass selectedGejala to parent onSubmit
		const dataToSubmit = {
			...formData,
			premises: selectedGejala,
		};
		onSubmit(e, dataToSubmit);
	};

	// Format gejala options for MultiSelectDropdown
	const gejalaOptions = gejala.map((g) => ({
		value: g.id_gejala,
		label: `${g.id_gejala} - ${g.nama_gejala}`,
	}));

	return (
		<form onSubmit={handleSubmit}>
			{formError && (
				<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
					{formError}
				</div>
			)}

			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">ID Ruleset</label>
				<input
					type="text"
					value={formData.id_ruleset}
					onChange={(e) => onChange("id_ruleset", e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
					disabled={isEditMode}
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">Penyakit</label>
				<select
					value={formData.id_penyakit}
					onChange={(e) => onChange("id_penyakit", e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				>
					<option value="">Pilih Penyakit</option>
					{penyakit.map((p) => (
						<option key={p.id_penyakit} value={p.id_penyakit}>
							{p.id_penyakit} - {p.nama_penyakit}
						</option>
					))}
				</select>
			</div>

			<div className="mb-4">
				<MultiSelectDropdown
					label="Gejala"
					options={gejalaOptions}
					selectedValues={selectedGejala}
					onChange={handleGejalaChange}
					placeholder="Pilih gejala..."
				/>
			</div>

			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					CF Ruleset (0.0 - 1.0)
				</label>
				<input
					type="number"
					step="0.01"
					min="0"
					max="1"
					value={formData.cf_ruleset}
					onChange={(e) => onChange("cf_ruleset", e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<p className="text-sm text-gray-500 mt-1">Nilai Certainty Factor antara 0.0 sampai 1.0</p>
			</div>

			<div className="flex justify-end space-x-3">
				<button
					type="button"
					onClick={onClose}
					className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
					disabled={submitLoading}
				>
					Batal
				</button>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
					disabled={submitLoading}
				>
					{submitLoading ? (
						<>
							<i className="fas fa-spinner fa-spin mr-2"></i>
							{isEditMode ? "Menyimpan..." : "Membuat..."}
						</>
					) : (
						<>
							<i className="fas fa-save mr-2"></i>
							{isEditMode ? "Simpan Perubahan" : "Buat Aturan"}
						</>
					)}
				</button>
			</div>
		</form>
	);
};

export default RuleForm;
