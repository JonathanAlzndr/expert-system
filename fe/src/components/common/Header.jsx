import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center cursor-pointer">
                    <i className="fas fa-stethoscope text-2xl text-primary mr-2"></i>
                    <h1 className="text-xl font-bold text-primary">TanyaPakar</h1>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to="/"
                                className={`font-medium ${location.pathname === '/' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/diseases"
                                className={`font-medium ${location.pathname === '/diseases' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
                            >
                                Informasi Penyakit
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-[#0e556b] transition duration-300"
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
