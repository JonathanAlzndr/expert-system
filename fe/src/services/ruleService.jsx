import api from './api';

export const ruleService = {
    // Get all rules
    getAll: async () => {
        const response = await api.get('/admin/rule');
        return response.data;
    },

    // Create new rule
    create: async (data) => {
        const response = await api.post('/admin/rule', data);
        return response.data;
    },

    // Update rule
    update: async (idRule, data) => {
        const response = await api.put(`/admin/rule/${idRule}`, data);
        return response.data;
    },

    // Delete rule
    delete: async (idRule) => {
        const response = await api.delete(`/admin/rule/${idRule}`);
        return response.data;
    }
};
