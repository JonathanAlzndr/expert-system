import api from './api.jsx';

export const diagnosisService = {
    // Get all questions/gejala
    getQuestions: async () => {
        const response = await api.get('http://127.0.0.1:5000/api/diagnosis/pertanyaan');
        return response.data;
    },

    // Submit diagnosis
    submitDiagnosis: async (answers) => {
        const response = await api.post('/diagnosis', {answers});
        return response.data;
    }
};
