import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ResultCard from '../../components/diagnosis/ResultCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ResultPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const diagnosisResult = location.state?.diagnosisResult;

    if (!diagnosisResult) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data tidak ditemukan</h2>
                        <Button onClick={() => navigate('/diagnosis')}>
                            Kembali ke Diagnosis
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const { hasil_utama, analisis_tambahan } = diagnosisResult;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-primary mb-8">Hasil Diagnosis</h1>

                <ResultCard
                    disease={hasil_utama.nama_penyakit}
                    percentage={Math.round(hasil_utama.cf_tertinggi * 100)}
                    description={hasil_utama.deskripsi}
                />

                {/* Detail & Solusi */}
                <Card className="p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Detail & Solusi</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Deskripsi Penyakit</h3>
                            <p className="text-gray-600">{hasil_utama.deskripsi}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Solusi & Perawatan</h3>
                            <p className="text-gray-600">{hasil_utama.solusi}</p>
                        </div>
                    </div>
                </Card>

                {/* Kemungkinan Lain */}
                {analisis_tambahan && analisis_tambahan.length > 0 && (
                    <Card className="p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Kemungkinan Lain</h2>

                        <div className="space-y-4">
                            {analisis_tambahan.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">{item.nama_penyakit}</h3>
                                        <p className="text-gray-600">Kemungkinan penyakit lainnya</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-yellow-600">
                                            {Math.round(item.cf_score * 100)}%
                                        </div>
                                        <div className="text-sm text-gray-500">Tingkat Keyakinan</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Tombol Aksi */}
                <div className="flex justify-center">
                    <Button onClick={() => navigate('/diagnosis')}>
                        <i className="fas fa-redo mr-2"></i> Diagnosis Ulang
                    </Button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ResultPage;
