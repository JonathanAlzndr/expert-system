import {useState} from 'react';
import {diagnosisService} from '../services/diagnosisService';

export const useDiagnosis = () => {
    const [questions, setQuestions] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchQuestions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await diagnosisService.getQuestions();
            setQuestions(response.pertanyaanList || []);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch questions');
        } finally {
            setLoading(false);
        }
    };

    const submitDiagnosis = async (answers) => {
        setLoading(true);
        setError(null);
        try {
            const response = await diagnosisService.submitDiagnosis(answers);
            setResult(response);
            return {success: true, data: response};
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Failed to submit diagnosis';
            setError(errorMsg);
            return {success: false, error: errorMsg};
        } finally {
            setLoading(false);
        }
    };

    const resetDiagnosis = () => {
        setResult(null);
        setError(null);
    };

    return {
        questions,
        result,
        loading,
        error,
        fetchQuestions,
        submitDiagnosis,
        resetDiagnosis
    };
};
