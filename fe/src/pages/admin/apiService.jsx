import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

export function createApiService() {
	const getAuthHeader = () => {
		const token = localStorage.getItem("adminToken");
		return token ? { Authorization: `Bearer ${token}` } : {};
	};

	const getHeaders = () => ({ headers: getAuthHeader() });

	return {
		penyakit: {
			getAll: async () => {
				try {
					const response = await axios.get(`${API_BASE_URL}/penyakit`, getHeaders());
					return { success: true, data: response.data };
				} catch (error) {
					return { success: false, error: error.response?.data?.message || error.message };
				}
			},

			create: async (data) => {
				try {
					const response = await axios.post(`${API_BASE_URL}/penyakit`, data, getHeaders());
					return { success: true, data: response.data };
				} catch (error) {
					return { success: false, error: error.response?.data?.message || error.message };
				}
			},

			update: async (id, data) => {
				try {
					const response = await axios.put(`${API_BASE_URL}/penyakit/${id}`, data, getHeaders());
					return { success: true, data: response.data };
				} catch (error) {
					return { success: false, error: error.response?.data?.message || error.message };
				}
			},

			delete: async (id) => {
				try {
					await axios.delete(`${API_BASE_URL}/penyakit/${id}`, getHeaders());
					return { success: true };
				} catch (error) {
					return { success: false, error: error.response?.data?.message || error.message };
				}
			},
		},
	};
}
