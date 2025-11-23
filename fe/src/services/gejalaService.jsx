import api from './api';

export const gejalaService = {
    // Get all symptoms
    getAll: async () => {
        const response = await api.get('/admin/gejala');
        return response.data;
    },

    // Create new symptom
    create: async (data) => {
        const response = await api.post('/admin/gejala', data);
        return response.data;
    },

    // Update symptom
    update: async (idGejala, data) => {
        const response = await api.put(`/admin/gejala/${idGejala}`, data);
        return response.data;
    },

    // Delete symptom
    delete: async (idGejala) => {
        const response = await api.delete(`/admin/gejala/${idGejala}`);
        return response.data;
    }
};
