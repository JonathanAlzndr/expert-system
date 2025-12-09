import api from './api';

const url = 'http://127.0.0.1:5000/'

export const gejalaService = {
    getAll: async (page = 1, perPage = 10) => {
        const response = await api.get(url + 'api/admin/gejala', {
            params: {
                page: page,
                per_page: perPage
            }
        });
        return response.data;
    },

    getById: async (idGejala) => {
        const response = await api.get(url + `api/admin/gejala/${idGejala}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post(url + 'api/admin/gejala', data);
        return response.data;
    },

    update: async (idGejala, data) => {
        const response = await api.put(url + `api/admin/gejala/${idGejala}`, data);
        return response.data;
    },

    delete: async (idGejala) => {
        const response = await api.delete(url + `api/admin/gejala/${idGejala}`);
        return response.data;
    }
};