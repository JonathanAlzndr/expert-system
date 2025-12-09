import api from './api';

const url = 'http://127.0.0.1:5000/' // Pastikan base URL ini benar atau dihandle di axios instance

export const penyakitService = {
    // TERIMA parameter page & perPage
    getAll: async (page = 1, perPage = 10) => {
        // KIRIM ke backend sebagai params
        const response = await api.get(url + 'api/penyakit', {
            params: {
                page: page,
                per_page: perPage
            }
        });
        return response.data;
    },

    // ... fungsi lain (getById, create, update, delete) tetap sama ...
    getById: async (idPenyakit) => {
        const response = await api.get(url + `api/penyakit/${idPenyakit}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post(url + 'api/penyakit', data);
        return response.data;
    },

    update: async (idPenyakit, data) => {
        const response = await api.put(url + `api/penyakit/${idPenyakit}`, data);
        return response.data;
    },

    delete: async (idPenyakit) => {
        const response = await api.delete(url + `api/penyakit/${idPenyakit}`);
        return response.data;
    }
};