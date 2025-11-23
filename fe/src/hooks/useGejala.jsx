import {useState, useEffect} from 'react';
import {gejalaService} from '../services/gejalaService';

export const useGejala = () => {
    const [gejala, setGejala] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGejala = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await gejalaService.getAll();
            setGejala(response.data || []);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch symptoms');
        } finally {
            setLoading(false);
        }
    };

    const createGejala = async (data) => {
        try {
            const response = await gejalaService.create(data);
            await fetchGejala(); // Refresh list
            return {success: true, data: response};
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to create symptom'
            };
        }
    };

    // Tambahkan fungsi ini ke dalam hook useGejala
    const updateGejala = async (idGejala, data) => {
        try {
            const response = await gejalaService.update(idGejala, data);
            await fetchGejala(); // Refresh list
            return {success: true, data: response};
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to update symptom'
            };
        }
    };

    const deleteGejala = async (idGejala) => {
        try {
            const response = await gejalaService.delete(idGejala);
            await fetchGejala(); // Refresh list
            return {success: true, data: response};
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to delete symptom'
            };
        }
    };

    useEffect(() => {
        fetchGejala();
    }, []);

    return {
        gejala,
        loading,
        error,
        fetchGejala,
        createGejala,
        updateGejala,
        deleteGejala
    };
};
