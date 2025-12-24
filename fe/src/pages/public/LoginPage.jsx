import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import useFetch from "./../../api/useFetch";
import Loading from "../../components/Loading";

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
				console.log("Token tersimpan:", result.token);

				navigate("/admin");
			} else {
				console.warn("Login berhasil, tetapi token tidak ditemukan di response:", result);
			}
		} catch (err) {
			console.error("Gagal login:", err);
		}
	};

	return (
		<>
			<div className="min-h-screen flex flex-col bg-gray-100">
				{loading && <Loading />}
				<div className="grow flex items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
						<button onClick={() => navigate("/")} className="active:scale-98 cursor-pointer">
							<i className="fas fa-arrow-left text-gray-500 text-xl mb-4"></i>
						</button>
						<div className="text-center mb-6">
							<i className="fas fa-user-md text-4xl text-primary mb-4"></i>
							<h2 className="text-2xl font-bold text-gray-800">Masuk Admin</h2>
							<p className="text-gray-600 mt-2">Masuk ke sistem admin</p>
						</div>

						{/* TAMPILKAN ERROR */}
						{error && (
							<div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center border border-red-200">
								{error || "Username atau password salah"}
							</div>
						)}

						<form onSubmit={handleLogin}>
							<FormInput
								label="Username"
								name="username"
								value={formData.username}
								onChange={handleInputChange}
								required
							/>
							<FormInput
								label="Kata sandi"
								type="password"
								name="password"
								value={formData.password}
								onChange={handleInputChange}
								required
							/>

							<Button type="submit" size={"w-full"} disabled={loading}>
								{loading ? "Memproses..." : "Masuk"}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
