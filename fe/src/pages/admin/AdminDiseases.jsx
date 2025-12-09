import React, { useState, useCallback } from "react";
// Pastikan path import hook benar
import { usePenyakit } from "../../hooks/usePenyakit"; 
import {
    LoadingSpinner,
    ErrorAlert,
    ActionButton,
    FormModal,
    DiseaseRow,
    EmptyState,
} from "./components";

export default function AdminDiseases() {
    // 1. STATE PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // 2. PANGGIL HOOK (Kirim page & perPage)
    // Ambil 'meta' yang berisi total_data & total_pages dari backend
    const { 
        penyakit, 
        meta, 
        loading, 
        error, 
        fetchPenyakit, 
        createPenyakit, 
        updatePenyakit, 
        deletePenyakit 
    } = usePenyakit(currentPage, itemsPerPage);

    const [showForm, setShowForm] = useState(false);
    const [editingPenyakit, setEditingPenyakit] = useState(null);
    const [formData, setFormData] = useState({
        id_penyakit: "",
        nama_penyakit: "",
        deskripsi: "",
        solusi: "",
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const totalData = meta ? meta.total_data : 0;
    const totalPages = meta ? meta.total_pages : 1;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function resetForm() {
        setFormData({ id_penyakit: "", nama_penyakit: "", deskripsi: "", solusi: "" });
        setEditingPenyakit(null);
        setFormError("");
    }

    function handleCreate() {
        resetForm();
        setShowForm(true);
    }

    const handleEdit = useCallback((disease) => {
        setFormData({
            id_penyakit: disease.id_penyakit || "",
            nama_penyakit: disease.nama_penyakit || "",
            deskripsi: disease.deskripsi || "", 
            solusi: disease.solusi || "", 
        });
        setEditingPenyakit(disease);
        setShowForm(true);
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitLoading(true);
        setFormError("");

        const { id_penyakit, nama_penyakit, deskripsi, solusi } = formData;

        if (!id_penyakit || !nama_penyakit) {
            setFormError("ID Penyakit dan Nama Penyakit harus diisi");
            setSubmitLoading(false);
            return;
        }

        let result;
        if (editingPenyakit) {
            result = await updatePenyakit(editingPenyakit.id_penyakit, {
                nama_penyakit,
                deskripsi: deskripsi || "",
                solusi: solusi || "",
            });
        } else {
            result = await createPenyakit({
                id_penyakit,
                nama_penyakit,
                deskripsi: deskripsi || "",
                solusi: solusi || "",
            });
        }

        if (result.success) {
            setShowForm(false);
            resetForm();
        } else {
            setFormError(result.error);
        }

        setSubmitLoading(false);
    }

    async function handleDelete(idPenyakit) {
        if (window.confirm("Apakah Anda yakin ingin menghapus penyakit ini?")) {
            await deletePenyakit(idPenyakit);
        }
    }

    const handleCloseModal = useCallback(() => {
        setShowForm(false);
        resetForm();
    }, []);

    function renderTableRows() {
        if (!loading && penyakit.length === 0) {
            return <EmptyState />;
        }
        
        
        return penyakit.map((disease) => (
            <DiseaseRow
                key={disease.id_penyakit}
                disease={disease}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        ));
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Kelola Data Penyakit</h1>
                    <ActionButton onClick={handleCreate}>
                        <i className="fas fa-plus"></i> Tambah Penyakit
                    </ActionButton>
                </div>

                {error && <ErrorAlert message={error} />}

                <div className="bg-white rounded-lg shadow-md">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Penyakit</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Deskripsi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Solusi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">{renderTableRows()}</tbody>
                            </table>
                        </div>
                    )}

                    {/* --- KONTROL PAGINATION --- */}
                    {!loading && !error && (
                        <div className="flex justify-between items-center p-4 border-t border-gray-200">
                            <span className="text-sm text-gray-600">
                                {/* Gunakan totalData dari META, bukan penyakit.length */}
                                Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalData)} dari {totalData} data
                            </span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded border ${
                                        currentPage === 1
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-blue-600 hover:bg-gray-50 border-gray-300"
                                    }`}
                                >
                                    Previous
                                </button>

                                {/* Render Tombol Halaman berdasarkan totalPages */}
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`px-3 py-1 rounded border ${
                                            currentPage === index + 1
                                                ? "bg-blue-600 text-white border-blue-600"
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
                                            : "bg-white text-blue-600 hover:bg-gray-50 border-gray-300"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {showForm && (
                    <FormModal
                        editingPenyakit={editingPenyakit}
                        formData={formData}
                        formError={formError}
                        submitLoading={submitLoading}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmit}
                        onInputChange={handleInputChange}
                    />
                )}
            </div>
        </div>
    );
}