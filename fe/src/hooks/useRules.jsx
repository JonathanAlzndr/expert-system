import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';

export const useRules = (page = 1, perPage = 10) => {
    const [rulesData, setRulesData] = useState({
        data: [],
        meta: {
            page: 1,
            per_page: 10,
            total_data: 0,
            total_pages: 0
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // FIX: Dependency array dikosongkan untuk mencegah infinite loop
    const fetchRules = useCallback(async (pageNum, limit) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/admin/rules`, {
                params: { page: pageNum, per_page: limit }
            });

            if (response.data.msg === "Success" && response.status === 200) {
                setRulesData(prev => ({
                    data: response.data.data || [],
                    meta: response.data.meta || prev.meta
                }));
            } else {
                setError("Gagal mengambil data aturan");
            }
        } catch (err) {
            setError(err.response?.data?.msg || err.message || "Terjadi kesalahan");
            setRulesData(prev => ({...prev, data: []}));
        } finally {
            setLoading(false);
        }
    }, []); 

    const createRule = async (data) => {
        try {
            await api.post('/admin/rules', data);
            
            const totalItemsAfterCreation = (rulesData.meta?.total_data || 0) + 1;
            const newPage = Math.ceil(totalItemsAfterCreation / perPage);
            
            await fetchRules(newPage, perPage); 
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Failed to create rule' };
        }
    };

    const updateRule = async (id, data) => {
        try {
            await api.put(`/admin/rules/${id}`, data);
            await fetchRules(page, perPage);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Failed to update rule' };
        }
    };

    const deleteRule = async (id) => {
        try {
            await api.delete(`/admin/rules/${id}`);
            
            const currentRulesCount = rulesData.data.length;
            let targetPage = page;

            if (currentRulesCount === 1 && page > 1) {
                targetPage = page - 1;
            }
            
            await fetchRules(targetPage, perPage);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Failed to delete rule' };
        }
    };

    useEffect(() => {
        fetchRules(page, perPage);
    }, [fetchRules, page, perPage]);

    return { 
        rules: rulesData.data, 
        meta: rulesData.meta, 
        loading, 
        error, 
        fetchRules,
        createRule,
        updateRule,
        deleteRule
    };
};