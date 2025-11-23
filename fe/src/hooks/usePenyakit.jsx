import {useState, useEffect} from 'react';
import {penyakitService} from '../services/penyakitService';

export const usePenyakit = () => {
    const [penyakit, setPenyakit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPenyakit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await penyakitService.getAll();
            setPenyakit(response.data || []);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch diseases');
        } finally {
            setLoading(false);
        }
    };

    const createPenyakit = async (data) => {
        try {
            const response = await penyakitService.create(data);
            await fetchPenyakit(); // Refresh list
            return {success: true, data: response};
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to create disease'
            };
        }
    };

    // Tambahkan fungsi ini ke dalam hook usePenyakit
    const updatePenyakit = async (idPenyakit, data) => {
        try {
            const response = await penyakitService.update(idPenyakit, data);
            await fetchPenyakit(); // Refresh list
            return {success: true, data: response};
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
            await fetchPenyakit(); // Refresh list
            return {success: true, data: response};
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to delete disease'
            };
        }
    };


    useEffect(() => {
        fetchPenyakit();
    }, []);

    return {
        penyakit,
        loading,
        error,
        fetchPenyakit,
        createPenyakit,
        updatePenyakit,
        deletePenyakit
    };
};
