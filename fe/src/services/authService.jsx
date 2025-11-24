import api from "./api";

export const authService = {
	// Login Admin
	login: async (username, password) => {
		try {
			const response = await api.post("http://127.0.0.1:5000/api/auth/login", {
				username,
				password,
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Logout - Clear local storage
	logout: () => {
		localStorage.removeItem("adminToken");
		localStorage.removeItem("adminId");
		localStorage.removeItem("adminUsername");
	},

	// Check if user is authenticated
	isAuthenticated: () => {
		return !!localStorage.getItem("adminToken");
	},

	// Get stored token
	getToken: () => {
		return localStorage.getItem("adminToken");
	},

	// Get stored admin data
	getAdminData: () => {
		return {
			id: localStorage.getItem("adminId"),
			username: localStorage.getItem("adminUsername"),
			token: localStorage.getItem("adminToken"),
		};
	},

	// Store admin data after login
	storeAdminData: (data) => {
		if (data.token) {
			localStorage.setItem("adminToken", data.token);
		}
		if (data.id_admin) {
			localStorage.setItem("adminId", data.id_admin);
		}
		if (data.username) {
			localStorage.setItem("adminUsername", data.username);
		}
	},

	// Verify token validity (optional - jika backend punya endpoint verify)
	verifyToken: async () => {
		try {
			const response = await api.get("/admin/verify"); // Endpoint ini perlu dibuat di backend
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Refresh token (optional - jika implement refresh token)
	refreshToken: async () => {
		try {
			const refreshToken = localStorage.getItem("refreshToken");
			const response = await api.post("/admin/refresh", { refreshToken });
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export default authService;
