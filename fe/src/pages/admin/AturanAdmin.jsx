import React, { useState, useEffect } from "react";
import { Modal } from "../../components/Modal";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import RuleForm from "../../components/RuleForm";
import RulesTable from "../../components/RuleTable";
import Pagination from "../../components/Pagination";
import useFetch from "../../api/useFetch";

const AturanAdmin = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const perPage = 10;
	const [showForm, setShowForm] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [formError, setFormError] = useState("");
	const [deleteId, setDeleteId] = useState(null);

	const [formData, setFormData] = useState({
		id_ruleset: "",
		id_penyakit: "",
		premises: [],
		cf_ruleset: "",
	});

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

	const handleInputChange = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const resetForm = () => {
		setFormData({ id_ruleset: "", id_penyakit: "", premises: [], cf_ruleset: "" });
		setIsEditMode(false);
		setFormError("");
	};

	const handleEdit = (rule) => {
		setFormData({
			id_ruleset: rule.id_ruleset,
			id_penyakit: rule.id_penyakit,
			premises: rule.premises || [],
			cf_ruleset: rule.cf_ruleset.toString(),
		});
		setIsEditMode(true);
		setShowForm(true);
	};

	const handleDelete = (id) => {
		if (window.confirm("Yakin hapus?")) setDeleteId(id);
	};

	const handleSubmit = async (e, finalFormData) => {
		e.preventDefault();
		setFormError("");

		const dataToSubmit = finalFormData || formData;

		if (!dataToSubmit.id_penyakit) {
			setFormError("Pilih Penyakit");
			return;
		}
		if (!dataToSubmit.premises || dataToSubmit.premises.length === 0) {
			setFormError("Pilih minimal 1 gejala");
			return;
		}

		const payload = {
			id_ruleset: dataToSubmit.id_ruleset,
			id_penyakit: dataToSubmit.id_penyakit,
			cf_ruleset: parseFloat(dataToSubmit.cf_ruleset),
			premises: dataToSubmit.premises,
		};

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

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Kelola Data Aturan</h1>
				<div className="w-40">
					<Button onClick={() => setShowForm(true)}>
						<i className="fas fa-plus mr-2"></i> Tambah Aturan
					</Button>
				</div>
			</div>

			<Alert message={formError || errorRead} type="error" />

			<RulesTable
				rules={rulesList}
				onEdit={handleEdit}
				onDelete={handleDelete}
				penyakit={listPenyakit}
				gejala={listGejala}
				loading={loadingRead}
			/>

			{meta.total_data > perPage && (
				<Pagination
					page={currentPage}
					totalPages={meta.total_pages || 1}
					onNext={() => currentPage < meta.total_pages && setCurrentPage((p) => p + 1)}
					onPrev={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
					loading={loadingRead}
				/>
			)}

			<Modal
				isOpen={showForm}
				onClose={() => {
					setShowForm(false);
					resetForm();
				}}
				title={isEditMode ? "Ubah Aturan" : "Tambah Aturan"}
			>
				<RuleForm
					formData={formData}
					onChange={handleInputChange}
					onSubmit={handleSubmit}
					onClose={() => {
						setShowForm(false);
						resetForm();
					}}
					isEditMode={isEditMode}
					submitLoading={isSubmitLoading}
					formError={formError}
					penyakit={listPenyakit}
					gejala={listGejala}
				/>
			</Modal>
		</>
	);
};

export default AturanAdmin;
