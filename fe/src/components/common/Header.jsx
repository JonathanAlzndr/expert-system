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
				<Link to="/" className="flex items-center group">
					<div className="bg-[#eef5ff] p-2 rounded-full mr-3 group-hover:bg-[#b4d4ff] transition-colors duration-300">
						<i className="fas fa-stethoscope text-2xl text-[#176b87]"></i>
					</div>
					<h1 className="text-2xl font-bold text-[#176b87] tracking-tight">
						Tanya<span className="text-[#071c23]">Pakar</span>
					</h1>
				</Link>

				{/* Navigation */}
				<nav>
					<ul className="flex space-x-8 items-center">
						<li>
							<Link
								to="/"
								className={`text-sm font-semibold transition-colors duration-300 ${
									isActive("/") ? "text-[#176b87]" : "text-gray-500 hover:text-[#176b87]"
								}`}
							>
								Beranda
							</Link>
						</li>
						<li>
							<Link
								to="/diseases"
								className={`text-sm font-semibold transition-colors duration-300 ${
									isActive("/diseases") ? "text-[#176b87]" : "text-gray-500 hover:text-[#176b87]"
								}`}
							>
								Informasi Penyakit
							</Link>
						</li>
						<li>
							<Link
								to="/login"
								className="bg-[#176b87] text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-[#176b87]/30 hover:bg-[#071c23] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
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
