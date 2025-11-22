import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import DisclaimerModal from '../../components/diagnosis/DisclaimerModal';
import SymptomForm from '../../components/diagnosis/SymptomForm';
import Button from '../../components/ui/Button';
import { useDiagnosis } from '../../hooks/useDiagnosis';

const DiagnosisPage = () => {
    const navigate = useNavigate();
    const { questions, loading, error, fetchQuestions, submitDiagnosis } = useDiagnosis();
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const [symptoms, setSymptoms] = useState([]);
    const [processing, setProcessing] = useState(false);

    // Single useEffect untuk semua side effects
    useEffect(() => {
        if (!showDisclaimer && questions.length === 0) {
            // Hanya fetch questions jika disclaimer disetujui dan questions masih kosong
            fetchQuestions();
        }

        // Update symptoms ketika questions berubah
        if (questions.length > 0 && symptoms.length === 0) {
            const initialSymptoms = questions.map(q => ({
                id: q.id_gejala,
                name: q.teks_pertanyaan,
                certainty: 0
            }));
            setSymptoms(initialSymptoms);
        }
    }, [showDisclaimer, questions, symptoms.length, fetchQuestions]);

    const handleCertaintyChange = (id, value) => {
        setSymptoms(symptoms.map(symptom =>
            symptom.id === id ? { ...symptom, certainty: parseInt(value) } : symptom
        ));
    };

    const handleProcess = async () => {
        setProcessing(true);
        const answers = symptoms.map(symptom => ({
            id_gejala: symptom.id,
            cf_user: symptom.certainty / 100 // Convert to decimal
        }));

        const result = await submitDiagnosis(answers);

        if (result.success) {
            navigate('/result', { state: { diagnosisResult: result.data } });
        }
        setProcessing(false);
    };

    if (showDisclaimer) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                    <DisclaimerModal
                        isOpen={showDisclaimer}
                        onAgree={() => setShowDisclaimer(false)}
                    />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-primary mb-2">Diagnosis Penyakit</h1>
                <p className="text-gray-600 mb-8">Pilih tingkat keyakinan Anda untuk setiap gejala berikut</p>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-gray-600">Memuat data gejala...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <SymptomForm symptoms={symptoms} onCertaintyChange={handleCertaintyChange} />

                        <div className="flex justify-end">
                            <Button
                                onClick={handleProcess}
                                disabled={processing || symptoms.length === 0}
                            >
                                <i className="fas fa-cogs mr-2"></i>
                                {processing ? 'Memproses...' : 'Proses Diagnosis'}
                            </Button>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default DiagnosisPage;
