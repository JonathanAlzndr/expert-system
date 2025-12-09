import { useState, useCallback, useEffect } from 'react';
import api from '../services/api'; // Adjust path if needed

export const useRules = (page = 1, perPage = 10) => {
    const [rules, setRules] = useState([]);
    const [meta, setMeta] = useState(null); // State for pagination metadata
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRules = useCallback(async (pageNum, limit) => {
        setLoading(true);
        setError(null);
        try {
            // Pass page and per_page as query params
            const response = await api.get(`/admin/rules`, {
                params: { page: pageNum, per_page: limit }
            });

            // Handle successful response
            // Adjust this condition based on your exact API response structure
            if (response.data.msg === "Success" || response.status === 200) {
                setRules(response.data.data || []); // The actual list of rules
                setMeta(response.data.meta);       // The metadata object
            } else {
                setError("Gagal mengambil data aturan");
            }
        } catch (err) {
            setError(err.response?.data?.msg || err.message || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    }, []);

    // Create Rule
    const createRule = async (data) => {
        try {
            const response = await api.post('/admin/rules', data);
            await fetchRules(page, perPage); // Refresh current page
            return { success: true, data: response.data };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Failed to create rule' };
        }
    };

    // Update Rule
    const updateRule = async (id, data) => {
        try {
            const response = await api.put(`/admin/rules/${id}`, data);
            await fetchRules(page, perPage);
            return { success: true, data: response.data };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Failed to update rule' };
        }
    };

    // Delete Rule
    const deleteRule = async (id) => {
        try {
            const response = await api.delete(`/admin/rules/${id}`);
            await fetchRules(page, perPage);
            return { success: true, data: response.data };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Failed to delete rule' };
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchRules(page, perPage);
    }, [fetchRules, page, perPage]);

    return { 
        rules, 
        meta, // MUST RETURN THIS
        loading, 
        error, 
        fetchRules,
        createRule,
        updateRule,
        deleteRule
    };
};