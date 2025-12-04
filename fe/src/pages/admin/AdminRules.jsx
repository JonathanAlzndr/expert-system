import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import Modal from "../../components/common/Modal";
import { usePenyakit } from "../../hooks/usePenyakit";
import { useGejala } from "../../hooks/useGejala";
import { useRules } from "../../hooks/useRules";
import RuleForm from "../../components/rules/RuleForm";
import RulesTable from "../../components/rules/RuleTable";

const AdminRules = () => {
	const { penyakit } = usePenyakit();
	const { gejala } = useGejala();
	const { rules, loading, error, createRule, updateRule, deleteRule } = useRules();

	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		id_ruleset: "",
		id_penyakit: "",
		premises: [], // Array untuk multiple gejala
		cf_ruleset: "",
	});
	const [submitLoading, setSubmitLoading] = useState(false);
	const [formError, setFormError] = useState("");
	const [isEditMode, setIsEditMode] = useState(false);

	useEffect(() => {
		if (!isEditMode && !formData.id_ruleset && rules.length > 0) {
			const nextId = rules.length + 1;
			setFormData((prev) => ({
				...prev,
				id_ruleset: `R${nextId.toString().padStart(2, "0")}`,
			}));
		}
	}, [rules.length, isEditMode]);

	const handleInputChange = (name, value) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e, formDataWithPremises) => {
		e.preventDefault();
		setSubmitLoading(true);
		setFormError("");

		const cfValue = parseFloat(formDataWithPremises.cf_ruleset);
		if (isNaN(cfValue) || cfValue < 0 || cfValue > 1) {
			setFormError("CF Ruleset harus berupa angka antara 0.0 dan 1.0");
			setSubmitLoading(false);
			return;
		}

		// Validate that at least one gejala is selected
		if (!formDataWithPremises.premises || formDataWithPremises.premises.length === 0) {
			setFormError("Minimal pilih satu gejala");
			setSubmitLoading(false);
			return;
		}

		const submitData = {
			id_ruleset: formDataWithPremises.id_ruleset,
			id_penyakit: formDataWithPremises.id_penyakit,
			cf_ruleset: cfValue,
			premises: formDataWithPremises.premises,
		};

		let result;
		if (isEditMode) {
			result = await updateRule(formDataWithPremises.id_ruleset, submitData);
		} else {
			result = await createRule(submitData);
		}

		if (result.success) {
			setShowForm(false);
			resetForm();
		} else {
			setFormError(result.error);
		}
		setSubmitLoading(false);
	};

	const handleEdit = (rule) => {
		setFormData({
			id_ruleset: rule.id_ruleset,
			id_penyakit: rule.id_penyakit,
			premises: rule.premises || [], // Menggunakan array premises
			cf_ruleset: rule.cf_ruleset.toString(),
		});
		setIsEditMode(true);
		setShowForm(true);
	};

	const handleDelete = async (idRuleset) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus rule ini?")) {
			const result = await deleteRule(idRuleset);
			if (!result.success) {
				setFormError(result.error);
			}
		}
	};

	const resetForm = () => {
		setFormData({
			id_ruleset: "",
			id_penyakit: "",
			premises: [], // Reset ke array kosong
			cf_ruleset: "",
		});
		setIsEditMode(false);
		setFormError("");
	};

	const handleCloseForm = () => {
		setShowForm(false);
		resetForm();
	};

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">Kelola Data Aturan</h1>
				<Button onClick={() => setShowForm(true)}>
					<i className="fas fa-plus mr-2"></i> Tambah Aturan
				</Button>
			</div>

			<RulesTable
				rules={rules}
				onEdit={handleEdit}
				onDelete={handleDelete}
				penyakit={penyakit}
				gejala={gejala}
				loading={loading}
				error={error}
			/>

			<Modal
				isOpen={showForm}
				onClose={handleCloseForm}
				title={isEditMode ? "Ubah Aturan" : "Tambah Aturan Baru"}
			>
				<RuleForm
					formData={formData}
					onChange={handleInputChange}
					onSubmit={handleSubmit}
					onClose={handleCloseForm}
					isEditMode={isEditMode}
					submitLoading={submitLoading}
					formError={formError}
					penyakit={penyakit}
					gejala={gejala}
				/>
			</Modal>
		</>
	);
};

export default AdminRules;
