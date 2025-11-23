import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="bg-dark text-white w-64 min-h-screen p-4">
            <div className="flex items-center mb-8">
                <i className="fas fa-stethoscope text-2xl mr-2"></i>
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>

            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/admin"
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${location.pathname === '/admin' ? 'bg-primary' : 'hover:bg-gray-700'}`}
                        >
                            <i className="fas fa-tachometer-alt mr-3"></i>
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/diseases"
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${location.pathname === '/admin/diseases' ? 'bg-primary' : 'hover:bg-gray-700'}`}
                        >
                            <i className="fas fa-disease mr-3"></i>
                            Data Penyakit
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/symptoms"
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${location.pathname === '/admin/symptoms' ? 'bg-primary' : 'hover:bg-gray-700'}`}
                        >
                            <i className="fas fa-clipboard-list mr-3"></i>
                            Data Gejala
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/rules"
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${location.pathname === '/admin/rules' ? 'bg-primary' : 'hover:bg-gray-700'}`}
                        >
                            <i className="fas fa-project-diagram mr-3"></i>
                            Data Aturan
                        </Link>
                    </li>
                    <li>
                        <button
                            className="w-full text-left px-4 py-3 rounded-lg flex items-center hover:bg-gray-700 mt-8"
                            onClick={handleLogout}
                        >
                            <i className="fas fa-sign-out-alt mr-3"></i>
                            Keluar
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar
