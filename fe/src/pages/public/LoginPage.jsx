import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./../../api/useFetch";

const LoginPage = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ username: "", password: "" });

	const { loading, error, execute } = useFetch("/auth/login", "POST", null, { autoFetch: false });

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const result = await execute(formData);

			if (result && result.token) {
				localStorage.setItem("token", result.token);
				navigate("/admin");
			}
		} catch (err) {
			console.error("Gagal login:", err);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
			{/* Container Card dibuat lebih lebar dengan max-w-md */}
			<div className="bg-white rounded-lg shadow-xl p-10 max-w-md w-full border border-gray-100 relative">
				{/* Tombol Kembali */}
				<button
					onClick={() => navigate("/")}
					className="absolute top-6 left-6 text-gray-400 cursor-pointer hover:text-[#176B87] transition-colors"
					title="Kembali ke Beranda"
				>
					<i className="fas fa-arrow-left text-lg"></i>
				</button>

				{/* Ikon Admin */}
				<div className="text-center mb-6">
					<div className="inline-flex items-center justify-center w-12 h-12 bg-white text-primary">
						<i className="fas fa-user-md text-3xl"></i>
					</div>
					<h2 className="text-2xl font-bold text-gray-800 mt-2">Masuk Admin</h2>
					<p className="text-base text-gray-400 mt-1">Masuk ke sistem admin</p>
				</div>

				{/* Tampilkan Error */}
				{error && (
					<div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-[11px] text-center border border-red-100">
						{error || "Username atau password salah"}
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-5">
					{/* Input Username */}
					<div className="space-y-1.5">
						<label className="text-base font-semibold text-gray-500 ml-1">Username</label>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-md outline-none focus:border-[#176B87] transition-colors bg-white"
							placeholder="admin"
							required
						/>
					</div>

					{/* Input Kata Sandi */}
					<div className="space-y-1.5">
						<label className="text-base font-semibold text-gray-500 ml-1">Kata sandi</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-md outline-none focus:border-[#176B87] transition-colors bg-blue-50/30"
							placeholder="••••••••"
							required
						/>
					</div>

					{/* Tombol Masuk */}
					<button
						type="submit"
						disabled={loading}
						className={`w-full flex items-center justify-center cursor-pointer gap-2 py-3 rounded-md text-white text-sm font-bold transition-all shadow-sm ${
							loading
								? "bg-gray-400 cursor-not-allowed"
								: "bg-[#176B87] hover:bg-[#12556c] active:scale-95"
						}`}
					>
						{loading ? (
							<>
								<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
								<span>Memproses...</span>
							</>
						) : (
							<>
								<i className="fas fa-sign-in-alt"></i>
								<span>Masuk</span>
							</>
						)}
					</button>
				</form>

				{/* Info Login Section */}
				<div className="mt-8 bg-blue-50/50 border border-blue-100 p-4 rounded-lg">
					<p className="text-sm font-bold text-blue-600 mb-1">Info Login:</p>
					<p className="text-sm text-blue-500 leading-relaxed">
						Gunakan credentials admin yang telah disediakan.
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
