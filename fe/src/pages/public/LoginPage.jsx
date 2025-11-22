import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import {useAuth} from '../../hooks/useAuth';

const LoginPage = () => {
    const navigate = useNavigate();
    const {login, loading} = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Username dan password harus diisi');
            return;
        }

        const result = await login(formData.username, formData.password);

        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header/>

            <div className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <div className="text-center mb-6">
                        <i className="fas fa-user-md text-4xl text-primary mb-4"></i>
                        <h2 className="text-2xl font-bold text-gray-800">Login Admin</h2>
                        <p className="text-gray-600 mt-2">Masuk ke sistem admin</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            <div className="flex items-center">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                {error}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <FormInput
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Masukkan username admin"
                            required
                            disabled={loading}
                        />

                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Masukkan password"
                            required
                            disabled={loading}
                        />

                        <Button
                            type="submit"
                            size={'w-full'}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-sign-in-alt mr-2"></i>
                                    Masuk
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">Info Login:</h3>
                        <p className="text-sm text-blue-700">
                            Gunakan credentials admin yang telah disediakan. Hubungi administrator jika lupa password.
                        </p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default LoginPage;
