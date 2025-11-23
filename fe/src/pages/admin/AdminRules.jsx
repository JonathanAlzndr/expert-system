import React, { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Modal from "../../components/common/Modal";
import FormInput from "../../components/ui/FormInput";
import { usePenyakit } from "../../hooks/usePenyakit";
import { useGejala } from "../../hooks/useGejala";
import api from "../../services/api";

const AdminRules = () => {
	const { penyakit } = usePenyakit();
	const { gejala } = useGejala();

	const [rules, setRules] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		id_ruleset: "",
		id_penyakit: "",
		id_gejala: "",
		cf_ruleset: "",
	});
	const [submitLoading, setSubmitLoading] = useState(false);
	const [formError, setFormError] = useState("");

	const fetchRules = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await api.get("/admin/rules");
			setRules(response.data.data || []);
		} catch (err) {
			setError(err.response?.data?.msg || "Failed to fetch rules");
		} finally {
			setLoading(false);
		}
	};

	const createRule = async (data) => {
		try {
			const response = await api.post("/admin/rules", data);
			await fetchRules();
			return { success: true, data: response.data };
		} catch (err) {
			return {
				success: false,
				error: err.response?.data?.msg || "Failed to create rule",
			};
		}
	};

	const deleteRule = async (idRuleset) => {
		try {
			await api.delete(`/admin/rules/${idRuleset}`);
			await fetchRules();
			return { success: true };
		} catch (err) {
			return {
				success: false,
				error: err.response?.data?.msg || "Failed to delete rule",
			};
		}
	};

	useEffect(() => {
		fetchRules();
	}, []);

	useEffect(() => {
		if (!formData.id_ruleset && rules.length > 0) {
			const nextId = rules.length + 1;
			setFormData((prev) => ({
				...prev,
				id_ruleset: `R${nextId.toString().padStart(2, "0")}`,
			}));
		}
	}, [rules.length]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name === "cf_ruleset") {
			const normalizedValue = value.replace(/,/g, ".").replace(/[^0-9.]/g, "");
			setFormData((prev) => ({
				...prev,
				[name]: normalizedValue,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitLoading(true);
		setFormError("");

		const cfValue = parseFloat(formData.cf_ruleset);
		if (isNaN(cfValue) || cfValue < 0 || cfValue > 1) {
			setFormError("CF Ruleset harus berupa angka antara 0.0 dan 1.0");
			setSubmitLoading(false);
			return;
		}

		const submitData = {
			id_ruleset: formData.id_ruleset,
			id_penyakit: formData.id_penyakit,
			cf_ruleset: cfValue,
			premises: [formData.id_gejala],
		};

		const result = await createRule(submitData);

		if (result.success) {
			setShowForm(false);
			setFormData({
				id_ruleset: "",
				id_penyakit: "",
				id_gejala: "",
				cf_ruleset: "",
			});
		} else {
			setFormError(result.error);
		}
		setSubmitLoading(false);
	};

	const handleDelete = async (idRuleset) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus rule ini?")) {
			const result = await deleteRule(idRuleset);
			if (!result.success) {
				setError(result.error);
			}
		}
	};

	const getPenyakitName = (idPenyakit) => {
		const penyakitItem = penyakit.find((p) => p.id_penyakit === idPenyakit);
		return penyakitItem ? penyakitItem.nama_penyakit : idPenyakit;
	};

	const getGejalaNames = (premises) => {
		return premises
			.map((idGejala) => {
				const gejalaItem = gejala.find((g) => g.id_gejala === idGejala);
				return gejalaItem ? gejalaItem.nama_gejala : idGejala;
			})
			.join(", ");
	};

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Kelola Data Aturan</h1>
				<Button onClick={() => setShowForm(true)}>
					<i className="fas fa-plus mr-2"></i> Tambah Aturan
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
					<Table headers={["ID Ruleset", "Penyakit", "Gejala", "CF Ruleset", "Aksi"]}>
						{rules.map((item) => (
							<tr key={item.id_ruleset}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{item.id_ruleset}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{getPenyakitName(item.id_penyakit)}
								</td>
								<td className="px-6 py-4 text-sm text-gray-500 max-w-md">
									<div className="line-clamp-2">{getGejalaNames(item.premises)}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{item.cf_ruleset}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button className="text-blue-600 hover:text-blue-900 mr-3">
										<i className="fas fa-edit"></i> Edit
									</button>
									<button
										className="text-red-600 hover:text-red-900"
										onClick={() => handleDelete(item.id_ruleset)}
									>
										<i className="fas fa-trash"></i> Hapus
									</button>
								</td>
							</tr>
						))}
					</Table>
				</Card>
			)}

			<Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Tambah Aturan Baru">
				{formError && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{formError}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<FormInput
						label="ID Ruleset"
						name="id_ruleset"
						value={formData.id_ruleset}
						onChange={handleInputChange}
						placeholder="Contoh: R01"
						required
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
						<Button
							type="button"
							variant="secondary"
							className="mr-2"
							onClick={() => setShowForm(false)}
						>
							Batal
						</Button>
						<Button type="submit" disabled={submitLoading}>
							{submitLoading ? "Menyimpan..." : "Simpan"}
						</Button>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default AdminRules;
