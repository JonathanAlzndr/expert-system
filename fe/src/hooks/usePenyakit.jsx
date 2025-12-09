import { useState, useEffect, useCallback } from 'react';
import { penyakitService } from '../services/penyakitService';

export const usePenyakit = (page = 1, perPage = 10) => {
    const [penyakit, setPenyakit] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPenyakit = useCallback(async (pageNum = page, limit = perPage) => {
        setLoading(true);
        setError(null);
        try {
            const response = await penyakitService.getAll(pageNum, limit);
            setPenyakit(response.data || []);
            setMeta(response.meta || null);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch diseases');
        } finally {
            setLoading(false);
        }
    }, []);

    const createPenyakit = async (data) => {
        try {
            const response = await penyakitService.create(data);
            await fetchPenyakit(page, perPage);
            return { success: true, data: response };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to create disease'
            };
        }
    };

    const updatePenyakit = async (idPenyakit, data) => {
        try {
            const response = await penyakitService.update(idPenyakit, data);
            await fetchPenyakit(page, perPage);
            return { success: true, data: response };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to update disease'
            };
        }
    };

    const deletePenyakit = async (idPenyakit) => {
        try {
            const response = await penyakitService.delete(idPenyakit);
            await fetchPenyakit(page, perPage);
            return { success: true, data: response };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to delete disease'
            };
        }
    };

    useEffect(() => {
        fetchPenyakit(page, perPage);
    }, [fetchPenyakit, page, perPage]);

    return {
        penyakit,
        meta,
        loading,
        error,
        fetchPenyakit,
        createPenyakit,
        updatePenyakit,
        deletePenyakit
    };
};