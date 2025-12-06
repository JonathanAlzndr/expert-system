import React, { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import { usePenyakit } from "../../hooks/usePenyakit";
import { useGejala } from "../../hooks/useGejala";
import { useRules } from "../../hooks/useRules";
import axios from "axios";

const AdminDashboard = () => {
    // Hooks data master
    const { penyakit, loading: loadingPenyakit, error: errorPenyakit } = usePenyakit();
    const { gejala, loading: loadingGejala, error: errorGejala } = useGejala();
    const { rules, loading: loadingRules, error: errorRules } = useRules();
    
    const [row, setRow] = useState([]);

    useEffect(() => {
        fetchDiagnosisHistory();
    }, []);

    async function fetchDiagnosisHistory() {
        try {
            const token = localStorage.getItem("adminToken");
            const { data } = await axios.get("http://127.0.0.1:5000/api/admin/diagnosis", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Data fetched:", data);

            if (data.status && Array.isArray(data.data)) {
                setRow(data.data);
            }
        } catch (error) {
            console.error("Gagal mengambil history:", error);
        }
    }

    const hasError = errorPenyakit || errorGejala || errorRules;

    // Helper untuk membersihkan format persen (menghilangkan minus jika ada)
    const formatPercent = (val) => {
        if (!val) return "0%";
        // Hapus tanda % untuk di-parse, ambil absolut, lalu tambah % lagi
        const number = parseFloat(val.replace("%", ""));
        return `${Math.abs(number).toFixed(1)}%`;
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-primary mb-8">Beranda Admin</h1>
            
            {/* Error Display */}
            {hasError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                        <h3 className="text-red-800 font-semibold">Terjadi kesalahan saat memuat data master</h3>
                    </div>
                </div>
            )}

            {/* Statistik Cards (Bagian ini sudah oke, dipersingkat agar fokus ke tabel) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Jumlah Penyakit</h3>
                            <p className="text-3xl font-bold text-primary mt-2">{loadingPenyakit ? "..." : penyakit.length}</p>
                        </div>
                        <div className="bg-secondary rounded-full p-3"><i className="fas fa-disease text-2xl text-primary"></i></div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Jumlah Gejala</h3>
                            <p className="text-3xl font-bold text-primary mt-2">{loadingGejala ? "..." : gejala.length}</p>
                        </div>
                        <div className="bg-secondary rounded-full p-3"><i className="fas fa-clipboard-list text-2xl text-primary"></i></div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Jumlah Rules</h3>
                            <p className="text-3xl font-bold text-primary mt-2">{loadingRules ? "..." : rules.length}</p>
                        </div>
                        <div className="bg-secondary rounded-full p-3"><i className="fas fa-project-diagram text-2xl text-primary"></i></div>
                    </div>
                </Card>
            </div>

            {/* Tabel Riwayat Diagnosis */}
            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h2>
                    <button
                        className="text-primary hover:text-[#0e556b] text-sm font-medium"
                        onClick={() => window.location.reload()}
                    >
                        <i className="fas fa-sync-alt mr-1"></i>
                        Refresh Data
                    </button>
                </div>

                <Table headers={["No", "Tanggal", "Hasil Penyakit", "Nilai Keyakinan", "Aksi"]}>
                    <tbody>
                        {row.length > 0 ? (
                            row.map((item, index) => (
                                <tr key={item.id_diagnosis || index} className="border-b hover:bg-gray-50">
                                    {/* Kolom 1: No (Lebar Kecil 5%) */}
                                    <td className="p-3 text-center w-[5%]">{index + 1}</td>
                                    
                                    {/* Kolom 2: Tanggal (Lebar Sedang 20%) */}
                                    <td className="p-3 w-[20%] text-gray-600">{item.tanggal}</td>
                                    
                                    {/* Kolom 3: Penyakit (Lebar Besar 30%) */}
                                    <td className="p-3 font-semibold text-primary w-[30%]">
                                        {item.nama_penyakit}
                                    </td>
                                    
                                    {/* Kolom 4: Nilai (Lebar 15%) */}
                                    <td className="p-3 w-[15%]">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">
                                            {formatPercent(item.cf_persen)}
                                        </span>
                                    </td>
                                    
                                    {/* Kolom 5: Aksi (Lebar 10%) */}
                                    <td className="p-3 w-[10%] text-center">
                                        <button 
                                            className="text-blue-500 hover:text-blue-700 underline text-sm"
                                            onClick={() => console.log("Detail ID:", item.id_diagnosis)}
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500 italic">
                                    Belum ada data riwayat diagnosis.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </>
    );
};

export default AdminDashboard;