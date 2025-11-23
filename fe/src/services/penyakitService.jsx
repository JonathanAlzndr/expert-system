import api from './api';

const url = 'http://127.0.0.1:5000/'

export const penyakitService = {
    // Get all diseases
    getAll: async () => {
        const response = await api.get(url + 'api/penyakit');
        return response.data;
    },

    // Get disease by ID
    getById: async (idPenyakit) => {
        const response = await api.get(url + `api/penyakit/${idPenyakit}`);
        return response.data;
    },

    // Create new disease
    create: async (data) => {
        const response = await api.post(url + 'api/penyakit' + data);
        return response.data;
    },

    // Update disease
    update: async (idPenyakit, data) => {
        const response = await api.put(url + `api/penyakit/${idPenyakit}` + data);
        return response.data;
    },

    // Delete disease
    delete: async (idPenyakit) => {
        const response = await api.delete(url + `api/penyakit/${idPenyakit}`);
        return response.data;
    }
};
