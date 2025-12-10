import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
	const location = useLocation();

	// Helper untuk mengecek active link
	const isActive = (path) => location.pathname === path;

	return (
		<header className="bg-white shadow-md sticky top-0 z-40 transition-all duration-300">
			<div className="container mx-auto px-6 py-4 flex justify-between items-center">
				{/* Logo Section */}
				<Link to="/" className="flex items-center">
					<div className=" p-2 rounded-full mr-3 hover:bg-primary transition-colors duration-300">
						<i className="fas fa-stethoscope text-2xl text-primary hover:text-white"></i>
					</div>
					<h1 className="text-2xl font-bold text-primary tracking-tight">
						Tanya<span className="text-primary">Pakar</span>
					</h1>
				</Link>

				{/* Navigation */}
				<nav>
					<ul className="flex space-x-8 items-center">
						<li>
							<Link
								to="/"
								className={`text-sm font-semibold transition-colors duration-300 ${
									isActive("/") ? "text-primary" : "text-gray-500 hover:text-primary"
								}`}
							>
								Beranda
							</Link>
						</li>
						<li>
							<Link
								to="/diseases"
								className={`text-sm font-semibold transition-colors duration-300 ${
									isActive("/diseases") ? "text-primary" : "text-gray-500 hover:text-primary"
								}`}
							>
								Informasi Penyakit
							</Link>
						</li>
						<li>
							<Link
								to="/login"
								className="bg-primary text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-primary/30 hover:bg-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex"
							>
								Masuk
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
