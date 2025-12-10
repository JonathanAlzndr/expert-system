import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";
import { usePenyakit } from "../../hooks/usePenyakit";
import { useGejala } from "../../hooks/useGejala";
import { useRules } from "../../hooks/useRules"; 
import RuleForm from "../../components/rules/RuleForm";
import RulesTable from "../../components/rules/RuleTable";
import { Button } from "./components/Button";

const AdminRules = () => {
    const { penyakit } = usePenyakit();
    const { gejala } = useGejala();

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10); 

    const { rules, meta, loading, error, createRule, updateRule, deleteRule } = useRules(currentPage, perPage);

    const rulesList = rules; 
    const metaData = meta; 

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

    useEffect(() => {
        if (!isEditMode && !formData.id_ruleset && metaData.total_data !== undefined) {
            const nextId = metaData.total_data + 1;
            setFormData((prev) => ({
                ...prev,
                id_ruleset: `R${nextId.toString().padStart(2, "0")}`,
            }));
        }
    }, [metaData.total_data, isEditMode, formData.id_ruleset]);

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
    
    const handlePageChange = (page) => {
        if (page > 0 && page <= metaData.total_pages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Kelola Data Aturan</h1>
                <Button onClick={() => setShowForm(true)}>
                    <i className="fas fa-plus mr-2"></i> Tambah Aturan
                </Button>
            </div>
            
            {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <p>{formError}</p>
                </div>
            )}

            <RulesTable
                rules={rulesList} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                penyakit={penyakit}
                gejala={gejala}
                loading={loading}
                error={error}
            />

            <div className="mt-6 flex justify-center">
                {/* Asumsi perPage sudah didefinisikan di AdminRules.jsx */}
                 {metaData.total_data > perPage && (
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={metaData.total_pages}
                        onPageChange={handlePageChange}
                    />
                 )}
            </div>

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

// --- START: SUB-KOMPONEN PAGINATION ---
const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    
    const renderPageNumbers = () => {
        const pagesToShow = 5; 
        let startPage, endPage;

        if (totalPages <= pagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrentPage = Math.floor(pagesToShow / 2);
            const maxPagesAfterCurrentPage = Math.ceil(pagesToShow / 2) - 1;
            
            if (currentPage <= maxPagesBeforeCurrentPage) {
                startPage = 1;
                endPage = pagesToShow;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                startPage = totalPages - pagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }
        
        return pageNumbers.slice(startPage - 1, endPage).map(number => (
            <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`px-4 py-2 mx-1 border rounded-lg transition-colors duration-150 ${
                    number === currentPage
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                }`}
            >
                {number}
            </button>
        ));
    };

    return (
        <nav className="flex items-center space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border rounded-lg text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-gray-300"
            >
                <i className="fas fa-chevron-left"></i>
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border rounded-lg text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-gray-300"
            >
                <i className="fas fa-chevron-right"></i>
            </button>
        </nav>
    );
};
// --- END: SUB-KOMPONEN PAGINATION ---