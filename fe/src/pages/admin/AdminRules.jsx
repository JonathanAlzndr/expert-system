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
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    const { 
        rules, 
        meta, 
        loading, 
        error, 
        createRule, 
        updateRule, 
        deleteRule,
        fetchRules 
    } = useRules(currentPage, itemsPerPage);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id_ruleset: "",
        id_penyakit: "",
        premises: [],
        cf_ruleset: "",
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);


    const totalPages = meta ? meta.total_pages : 1; 
    const totalData = meta ? meta.total_data : 0;

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // --- ID GENERATION LOGIC (Placeholder) ---
    useEffect(() => {
        if (!isEditMode && !formData.id_ruleset && rules.length > 0) {
            // Ideally, the backend should generate the ID. 
            // For now, using a simple random ID to avoid collisions in this view.
            const nextId = Math.floor(Math.random() * 10000); 
            setFormData((prev) => ({
                ...prev,
                id_ruleset: `R${nextId}`, 
            }));
        }
    }, [rules.length, isEditMode]);

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
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
            premises: rule.premises || [],
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
            premises: [],
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

            {/* --- 4. PASS DATA DIRECTLY --- */}
            {/* Pass 'rules' directly. It already contains only the items for the current page from the backend. */}
            <RulesTable
                rules={rules} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                penyakit={penyakit}
                gejala={gejala}
                loading={loading}
                error={error}
            />

            {/* --- 5. PAGINATION CONTROLS --- */}
            {!loading && !error && (
                <div className="flex justify-between items-center mt-4 px-2">
                    <span className="text-sm text-gray-600">
                        {/* Calculate display range */}
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalData)} dari {totalData} data
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded border ${
                                currentPage === 1
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-primary hover:bg-gray-50 border-gray-300"
                            }`}
                        >
                            Previous
                        </button>
                        
                        {/* Render Page Numbers */}
                        {/* Note: For very large page counts, you might want to limit the visible buttons */}
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-3 py-1 rounded border ${
                                    currentPage === index + 1
                                        ? "bg-primary text-white border-primary"
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
                                    : "bg-white text-primary hover:bg-gray-50 border-gray-300"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            
            <Modal isOpen={showForm} onClose={handleCloseForm} title={isEditMode ? "Ubah Aturan" : "Tambah Aturan Baru"}>
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