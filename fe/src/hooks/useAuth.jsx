import {useState, useEffect} from 'react';
import {authService} from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('adminToken');
        const adminId = localStorage.getItem('adminId');

        if (token && adminId) {
            setUser({
                id: adminId,
                token: token,
                username: localStorage.getItem('adminUsername')
            });
        }
        setLoading(false);
    };

    const login = async (username, password) => {
        try {
            setLoading(true);
            const response = await authService.login(username, password);

            if (response.token) {
                // Store data ke localStorage
                authService.storeAdminData(response);

                // Update state
                setUser({
                    id: response.id_admin,
                    token: response.token,
                    username: username
                });

                return {success: true, data: response};
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Login failed. Please try again.';
            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return {
        user,
        loading,
        login,
        logout,
        isAuthenticated: authService.isAuthenticated()
    };
};
