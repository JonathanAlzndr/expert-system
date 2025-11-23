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
		id_rule: "",
		id_penyakit: "",
		id_gejala: "",
		cf_rule: "",
	});
	const [submitLoading, setSubmitLoading] = useState(false);
	const [formError, setFormError] = useState("");

	// Fetch rules dari API
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
			await fetchRules(); // Refresh list
			return { success: true, data: response.data };
		} catch (err) {
			return {
				success: false,
				error: err.response?.data?.msg || "Failed to create rule",
			};
		}
	};

	// Delete rule
	const deleteRule = async (idRule) => {
		try {
			await api.delete(`/admin/rules/${idRule}`);
			await fetchRules(); // Refresh list
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
		if (!formData.id_rule && penyakit.length > 0 && gejala.length > 0) {
			const nextId = rules.length + 1;
			setFormData((prev) => ({
				...prev,
				id_rule: `R${nextId.toString().padStart(2, "0")}`,
			}));
		}
	}, [penyakit, gejala, rules.length]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitLoading(true);
		setFormError("");

		const submitData = {
			...formData,
			cf_rule: parseFloat(formData.cf_rule),
		};

		const result = await createRule(submitData);

		if (result.success) {
			setShowForm(false);
			setFormData({
				id_rule: "",
				id_penyakit: "",
				id_gejala: "",
				cf_rule: "",
			});
		} else {
			setFormError(result.error);
		}
		setSubmitLoading(false);
	};

	const handleDelete = async (idRule) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus rule ini?")) {
			const result = await deleteRule(idRule);
			if (!result.success) {
				setError(result.error);
			}
		}
	};

	const getPenyakitName = (idPenyakit) => {
		const penyakitItem = penyakit.find((p) => p.id_penyakit === idPenyakit);
		return penyakitItem ? penyakitItem.nama_penyakit : idPenyakit;
	};

	const getGejalaName = (idGejala) => {
		const gejalaItem = gejala.find((g) => g.id_gejala === idGejala);
		return gejalaItem ? gejalaItem.nama_gejala : idGejala;
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
					<Table headers={["ID Aturan", "Penyakit", "Gejala", "CF Aturan", "Aksi"]}>
						{rules.map((item) => (
							<tr key={item.id_rule}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{item.id_rule}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{getPenyakitName(item.id_penyakit)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{getGejalaName(item.id_gejala)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{item.cf_rule}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button className="text-blue-600 hover:text-blue-900 mr-3">
										<i className="fas fa-edit"></i> Edit
									</button>
									<button
										className="text-red-600 hover:text-red-900"
										onClick={() => handleDelete(item.id_rule)}
									>
										<i className="fas fa-trash"></i> Hapus
									</button>
								</td>
							</tr>
						))}
					</Table>
				</Card>
			)}

			{/* Modal Form Tambah Rule */}
			<Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Tambah Aturan Baru">
				{formError && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{formError}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<FormInput
						label="ID Aturan"
						name="id_rule"
						value={formData.id_rule}
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
						label="Certainty Factor (CF)"
						type="text"
						name="cf_rule"
						value={formData.cf_rule}
						onChange={handleInputChange}
						min="0"
						max="1"
						step="0.1"
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
