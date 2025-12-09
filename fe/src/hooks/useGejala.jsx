import { useState, useEffect, useCallback } from 'react';
import { gejalaService } from '../services/gejalaService';

export const useGejala = (page = 1, perPage = 10) => {
    const [gejala, setGejala] = useState([]);
    const [meta, setMeta] = useState(null); // Tambah state meta
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGejala = useCallback(async (pageNum, limit) => {
        setLoading(true);
        setError(null);
        try {
            // Panggil service dengan page & limit
            const response = await gejalaService.getAll(pageNum, limit);
            
            // Simpan data & meta
            if (response.msg === "Success" || response.success) {
                setGejala(response.data || []);
                setMeta(response.meta); 
            } else {
                setError("Gagal mengambil data gejala");
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch symptoms');
        } finally {
            setLoading(false);
        }
    }, []);

    const createGejala = async (data) => {
        try {
            const response = await gejalaService.create(data);
            await fetchGejala(page, perPage); 
            return { success: true, data: response };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Failed to create symptom' };
        }
    };

    const updateGejala = async (idGejala, data) => {
        try {
            const response = await gejalaService.update(idGejala, data);
            await fetchGejala(page, perPage); 
            return { success: true, data: response };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Failed to update symptom' };
        }
    };

    const deleteGejala = async (idGejala) => {
        try {
            const response = await gejalaService.delete(idGejala);
            await fetchGejala(page, perPage); 
            return { success: true, data: response };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Failed to delete symptom' };
        }
    };

    // Auto-fetch saat page berubah
    useEffect(() => {
        fetchGejala(page, perPage);
    }, [fetchGejala, page, perPage]);

    return {
        gejala,
        meta, // Return meta ke komponen
        loading,
        error,
        fetchGejala,
        createGejala,
        updateGejala,
        deleteGejala
    };
};