import React, { useState, useEffect, useRef, useCallback } from "react";
import { IoClose, IoChevronDown, IoSaveOutline } from "react-icons/io5";
import useFetch from "../../api/useFetch";

const AturanAdmin = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const perPage = 10;
	const [showForm, setShowForm] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [formError, setFormError] = useState("");
	const [deleteId, setDeleteId] = useState(null);

	// State untuk Dropdown Gejala
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const [formData, setFormData] = useState({
		id_ruleset: "",
		id_penyakit: "",
		premises: [],
		cf_ruleset: "",
	});

	// --- FETCH DATA ---
	const { data: penyakitResp } = useFetch("/penyakit", "GET", null, { autoFetch: true });
	const listPenyakit = Array.isArray(penyakitResp) ? penyakitResp : penyakitResp?.data || [];

	const { data: gejalaResp } = useFetch("/admin/gejala", "GET", null, { autoFetch: true });
	const listGejala = Array.isArray(gejalaResp) ? gejalaResp : gejalaResp?.data || [];

	const {
		data: rulesResp,
		loading: loadingRead,
		error: errorRead,
		execute: refetchRules,
	} = useFetch(`/admin/rules?page=${currentPage}&limit=${perPage}`, "GET", null, {
		autoFetch: true,
	});

	const rulesList = rulesResp?.data || [];
	const meta = rulesResp?.meta || {};

	const { execute: execCreate, loading: loadingCreate } = useFetch("/admin/rules", "POST", null, {
		autoFetch: false,
	});

	const updateUrl = formData.id_ruleset ? `/admin/rules/${formData.id_ruleset}` : "";
	const { execute: execUpdate, loading: loadingUpdate } = useFetch(updateUrl, "PUT", null, {
		autoFetch: false,
	});

	const deleteUrl = deleteId ? `/admin/rules/${deleteId}` : "";
	const { execute: execDelete, loading: loadingDelete } = useFetch(deleteUrl, "DELETE", null, {
		autoFetch: false,
	});

	const isSubmitLoading = loadingCreate || loadingUpdate || loadingDelete;

	// --- EFFECTS ---
	useEffect(() => {
		if (!isEditMode && !formData.id_ruleset && meta.total_data !== undefined) {
			const nextId = meta.total_data + 1;
			setFormData((prev) => ({
				...prev,
				id_ruleset: `R${nextId.toString().padStart(2, "0")}`,
			}));
		}
	}, [meta.total_data, isEditMode, formData.id_ruleset]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (deleteId) {
			execDelete()
				.then(() => {
					refetchRules();
					setDeleteId(null);
				})
				.catch((err) => {
					alert("Gagal menghapus rule.");
					setDeleteId(null);
				});
		}
	}, [deleteId, execDelete, refetchRules]);

	// --- HANDLERS ---
	const handleInputChange = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleGejalaToggle = (idGejala) => {
		let newPremises = [...formData.premises];
		if (newPremises.includes(idGejala)) {
			newPremises = newPremises.filter((id) => id !== idGejala);
		} else {
			newPremises.push(idGejala);
		}
		handleInputChange("premises", newPremises);
	};

	const resetForm = useCallback(() => {
		setFormData({ id_ruleset: "", id_penyakit: "", premises: [], cf_ruleset: "" });
		setIsEditMode(false);
		setFormError("");
		setIsDropdownOpen(false);
	}, []);

	const handleEdit = (item) => {
		setFormData({
			id_ruleset: item.id_ruleset,
			id_penyakit: item.id_penyakit,
			premises: item.premises || [],
			cf_ruleset: item.cf_ruleset.toString(),
		});
		setIsEditMode(true);
		setShowForm(true);
	};

	const handleDelete = (id) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus aturan ini?")) {
			setDeleteId(id);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");
		if (!formData.id_penyakit) return setFormError("Pilih Penyakit");
		if (formData.premises.length === 0) return setFormError("Pilih minimal 1 gejala");

		const payload = { ...formData, cf_ruleset: parseFloat(formData.cf_ruleset) };
		try {
			if (isEditMode) await execUpdate(payload);
			else await execCreate(payload);
			refetchRules();
			setShowForm(false);
			resetForm();
		} catch (err) {
			setFormError(err.response?.data?.message || "Gagal menyimpan");
		}
	};

	// Helpers
	const getPenyakitName = (id) =>
		listPenyakit.find((p) => p.id_penyakit === id)?.nama_penyakit || id;
	const getGejalaName = (id) => listGejala.find((g) => g.id_gejala === id)?.nama_gejala || id;

	return (
		<div className="max-w-7xl mx-auto p-6 font-sans">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-[#176B87]">Kelola Data Aturan</h1>
				<button
					onClick={() => {
						resetForm();
						setShowForm(true);
					}}
					className="bg-[#176B87] py-2 px-6 rounded-lg font-bold text-white shadow-lg active:scale-95 transition-all"
				>
					+ Tambah Aturan
				</button>
			</div>

			{/* Tabel Utama */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
				<table className="min-w-full divide-y divide-gray-100">
					<thead className="bg-gray-50">
						<tr className="text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
							<th className="px-6 py-4">ID Ruleset</th>
							<th className="px-6 py-4">Penyakit</th>
							<th className="px-6 py-4">Gejala</th>
							<th className="px-6 py-4 text-center">Aksi</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-50">
						{loadingRead ? (
							<tr>
								<td colSpan="4" className="p-10 text-center text-gray-400">
									Memuat data...
								</td>
							</tr>
						) : (
							rulesList.map((item) => (
								<tr key={item.id_ruleset} className="text-sm">
									<td className="px-6 py-4 font-bold">{item.id_ruleset}</td>
									<td className="px-6 py-4 font-semibold text-[#176B87]">
										{getPenyakitName(item.id_penyakit)}
									</td>
									<td className="px-6 py-4 text-gray-500 italic truncate max-w-xs">
										{item.premises.map((id) => getGejalaName(id)).join(", ")}
									</td>
									<td className="px-6 py-4 text-center space-x-4">
										<button
											onClick={() => handleEdit(item)}
											className="text-blue-600 font-bold hover:underline"
										>
											<i className="fas fa-edit mr-1"></i>
											Ubah
										</button>
										<button
											onClick={() => handleDelete(item.id_ruleset)}
											className="text-red-600 font-bold hover:underline"
										>
											<i className="fas fa-trash mr-1"></i>
											Hapus
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* MODAL FORM */}
			{showForm && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300">
					<div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
						<div className="p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-bold text-text">
									{isEditMode ? "Ubah Data Aturan" : "Tambah Aturan Baru"}
								</h2>
								<button
									onClick={() => {
										setShowForm(false);
										resetForm();
									}}
								>
									<IoClose size={24} className="text-gray-400 hover:text-gray-600" />
								</button>
							</div>

							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700">ID Ruleset</label>
									<input
										type="text"
										value={formData.id_ruleset}
										readOnly
										className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 outline-none cursor-not-allowed font-medium"
									/>
								</div>

								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700">Penyakit</label>
									<div className="relative">
										<select
											value={formData.id_penyakit}
											onChange={(e) => handleInputChange("id_penyakit", e.target.value)}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-1 focus:ring-[#176B87] outline-none cursor-pointer text-sm font-medium"
											required
										>
											<option value="">Pilih Penyakit</option>
											{listPenyakit.map((p) => (
												<option key={p.id_penyakit} value={p.id_penyakit}>
													{p.nama_penyakit}
												</option>
											))}
										</select>
										<IoChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
									</div>
								</div>

								<div className="space-y-2" ref={dropdownRef}>
									<label className="block text-sm font-medium text-gray-700">Gejala</label>
									<div className="relative">
										<button
											type="button"
											onClick={() => setIsDropdownOpen(!isDropdownOpen)}
											className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-[#176B87] outline-none flex justify-between items-center min-h-[42px]"
										>
											<div className="flex flex-wrap gap-1">
												{formData.premises.length > 0 ? (
													formData.premises.map((id) => (
														<span
															key={id}
															className="bg-blue-50 text-[#176B87] px-2 py-0.5 rounded text-xs border border-blue-100 flex items-center font-bold"
														>
															{id}
															<span
																onClick={(e) => {
																	e.stopPropagation();
																	handleGejalaToggle(id);
																}}
																className="ml-1 text-blue-300 hover:text-red-500 cursor-pointer"
															>
																&times;
															</span>
														</span>
													))
												) : (
													<span className="text-gray-400 text-sm">Pilih Gejala</span>
												)}
											</div>
											<IoChevronDown
												className={`text-gray-400 transition-transform ${
													isDropdownOpen ? "rotate-180" : ""
												}`}
											/>
										</button>

										{isDropdownOpen && (
											<div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
												{listGejala.map((g) => {
													const isSelected = formData.premises.includes(g.id_gejala);
													return (
														<div
															key={g.id_gejala}
															onClick={() => handleGejalaToggle(g.id_gejala)}
															className={`px-4 py-2.5 flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${
																isSelected ? "bg-blue-50/50" : ""
															}`}
														>
															<div
																className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${
																	isSelected
																		? "bg-[#176B87] border-[#176B87]"
																		: "bg-white border-gray-300"
																}`}
															>
																{isSelected && (
																	<div className="w-1.5 h-1.5 bg-white rounded-full"></div>
																)}
															</div>
															<span
																className={`text-sm font-medium ${
																	isSelected ? "text-[#176B87]" : "text-gray-700"
																}`}
															>
																{g.id_gejala} - {g.nama_gejala}
															</span>
														</div>
													);
												})}
											</div>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700">
										Certainty Factor (CF Ruleset)
									</label>
									<input
										type="number"
										step="0.1"
										min="0"
										max="1"
										placeholder="0.0 - 1.0"
										value={formData.cf_ruleset}
										onChange={(e) => handleInputChange("cf_ruleset", e.target.value)}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#176B87] outline-none text-sm font-medium"
										required
									/>
								</div>

								{/* UPDATED BUTTONS BASED ON image_b50963.png */}
								<div className="flex justify-end items-center space-x-4 pt-6">
									<button
										type="button"
										onClick={() => {
											setShowForm(false);
											resetForm();
										}}
										className="px-8 py-2.5 border border-slate-300 rounded-md cursor-pointer text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95 text-sm"
									>
										Batal
									</button>
									<button
										type="submit"
										className="px-8 py-2.5 bg-[#1d63ff] text-white rounded-md cursor-pointer font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm"
										disabled={isSubmitLoading}
									>
										{isSubmitLoading ? (
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
										) : (
											<IoSaveOutline className="text-xl" />
										)}
										<span>Simpan</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AturanAdmin;
