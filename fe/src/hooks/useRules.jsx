import {useState, useEffect} from 'react';
import {ruleService} from '../services/ruleService';

export const useRules = () => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRules = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await ruleService.getAll();
            setRules(response.data || []);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch rules');
        } finally {
            setLoading(false);
        }
    };

    const createRule = async (data) => {
        try {
            const response = await ruleService.create(data);
            await fetchRules(); // Refresh list
            return {success: true, data: response};
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to create rule'
            };
        }
    };

    // Tambahkan fungsi ini ke dalam hook useRules
    const updateRule = async (idRule, data) => {
        try {
            const response = await ruleService.update(idRule, data);
            await fetchRules(); // Refresh list
            return {success: true, data: response};
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to update rule'
            };
        }
    };

    const deleteRule = async (idRule) => {
        try {
            const response = await ruleService.delete(idRule);
            await fetchRules(); // Refresh list
            return {success: true, data: response};
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.msg || 'Failed to delete rule'
            };
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    return {
        rules,
        loading,
        error,
        fetchRules,
        createRule,
        updateRule,
        deleteRule
    };
};
