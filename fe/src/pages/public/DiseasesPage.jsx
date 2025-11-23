import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/ui/Card';
import Modal from '../../components/common/Modal';
import Button from '../../components/ui/Button'; // IMPORT YANG DITAMBAHKAN

const DiseasesPage = () => {
    const [selectedDisease, setSelectedDisease] = useState(null);
    const diseases = [
        { id: 1, name: "Flu", description: "Infeksi virus yang menyerang sistem pernapasan", symptoms: ["Demam", "Batuk", "Sakit kepala"] },
        { id: 2, name: "Demam Berdarah", description: "Penyakit yang disebabkan oleh virus dengue", symptoms: ["Demam tinggi", "Nyeri otot", "Ruam kulit"] },
        { id: 3, name: "Tifus", description: "Infeksi bakteri yang menyebar melalui makanan atau air terkontaminasi", symptoms: ["Demam", "Sakit perut", "Diare"] },
        { id: 4, name: "Malaria", description: "Penyakit yang disebabkan oleh parasit dan ditularkan melalui gigitan nyamuk", symptoms: ["Demam", "Menggigil", "Berkeringat"] }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-primary mb-8">Informasi Penyakit</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {diseases.map(disease => (
                        <Card key={disease.id} className="overflow-hidden hover:shadow-lg transition duration-300">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{disease.name}</h3>
                                <p className="text-gray-600 mb-4">{disease.description}</p>

                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Gejala Utama:</h4>
                                    <ul className="list-disc pl-5 text-sm text-gray-600">
                                        {disease.symptoms.map((symptom, index) => (
                                            <li key={index}>{symptom}</li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    className="text-primary font-medium hover:text-[#0e556b] transition duration-300"
                                    onClick={() => setSelectedDisease(disease)}
                                >
                                    Lihat Detail <i className="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Modal Detail Penyakit */}
            {selectedDisease && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">{selectedDisease.name}</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setSelectedDisease(null)}
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Deskripsi</h3>
                                <p className="text-gray-600">{selectedDisease.description}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Gejala</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    {selectedDisease.symptoms.map((symptom, index) => (
                                        <li key={index}>{symptom}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Pencegahan</h3>
                                <p className="text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Pengobatan</h3>
                                <p className="text-gray-600">
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    onClick={() => setSelectedDisease(null)}
                                >
                                    Tutup
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default DiseasesPage;
