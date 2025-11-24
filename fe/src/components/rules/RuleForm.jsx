import React from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";

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
	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name === "cf_ruleset") {
			const normalizedValue = value.replace(/,/g, ".").replace(/[^0-9.]/g, "");
			onChange(name, normalizedValue);
		} else {
			onChange(name, value);
		}
	};

	return (
		<>
			{formError && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{formError}
				</div>
			)}

			<form onSubmit={onSubmit}>
				<FormInput
					label="ID Ruleset"
					name="id_ruleset"
					value={formData.id_ruleset}
					onChange={handleInputChange}
					placeholder="Contoh: R01"
					required
					disabled={isEditMode}
				/>

				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Penyakit</label>
					<select
						name="id_penyakit"
						value={formData.id_penyakit}
						onChange={handleInputChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						required
					>
						<option value="">Pilih Penyakit</option>
						{penyakit.map((item) => (
							<option key={item.id_penyakit} value={item.id_penyakit}>
								{item.id_penyakit} - {item.nama_penyakit}
							</option>
						))}
					</select>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Gejala</label>
					<select
						name="id_gejala"
						value={formData.id_gejala}
						onChange={handleInputChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						required
					>
						<option value="">Pilih Gejala</option>
						{gejala.map((item) => (
							<option key={item.id_gejala} value={item.id_gejala}>
								{item.id_gejala} - {item.nama_gejala}
							</option>
						))}
					</select>
				</div>

				<FormInput
					label="Certainty Factor (CF Ruleset)"
					type="text"
					name="cf_ruleset"
					value={formData.cf_ruleset}
					onChange={handleInputChange}
					placeholder="0.0 - 1.0"
					required
				/>

				<div className="flex justify-end">
					<Button type="button" variant="secondary" className="mr-2" onClick={onClose}>
						Batal
					</Button>
					<Button type="submit" disabled={submitLoading}>
						{submitLoading
							? isEditMode
								? "Mengupdate..."
								: "Menyimpan..."
							: isEditMode
							? "Update"
							: "Simpan"}
					</Button>
				</div>
			</form>
		</>
	);
};

export default RuleForm;
