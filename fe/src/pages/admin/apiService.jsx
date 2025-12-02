// apiService.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

export function createApiService() {
	const getAuthHeader = () => {
		const token = localStorage.getItem("adminToken");
		return token ? { Authorization: `Bearer ${token}` } : {};
	};

	const getHeaders = () => ({
		headers: getAuthHeader(),
	});

	const handleApiError = (error) => {
		return error.response?.data?.message || error.message || "Terjadi kesalahan";
	};

	return {
		// CRUD untuk penyakit
		penyakit: {
			getAll: async () => {
				try {
					const response = await axios.get(`${API_BASE_URL}/penyakit`, getHeaders());
					return { success: true, data: response.data };
				} catch (error) {
					return { success: false, error: handleApiError(error) };
				}
			},

			create: async (data) => {
				try {
					// Format data untuk konsistensi
					const formattedData = {
						id_penyakit: data.id_penyakit,
						nama_penyakit: data.nama_penyakit,
						deskripsi: data.deskripsi,
						Solusi: data.solusi, // Perhatikan huruf besar untuk backend
					};

					const response = await axios.post(
						`${API_BASE_URL}/penyakit`,
						formattedData,
						getHeaders()
					);
					return { success: true, data: response.data };
				} catch (error) {
					return { success: false, error: handleApiError(error) };
				}
			},

			update: async (id, data) => {
				try {
					// Format data untuk konsistensi - SAMA dengan create
					const formattedData = {
						nama_penyakit: data.nama_penyakit,
						deskripsi: data.deskripsi,
						Solusi: data.solusi, // Perhatikan huruf besar untuk backend
					};

					const response = await axios.put(
						`${API_BASE_URL}/penyakit/${id}`,
						formattedData,
						getHeaders()
					);
					return { success: true, data: response.data };
				} catch (error) {
					return { success: false, error: handleApiError(error) };
				}
			},

			delete: async (id) => {
				try {
					await axios.delete(`${API_BASE_URL}/penyakit/${id}`, getHeaders());
					return { success: true };
				} catch (error) {
					return { success: false, error: handleApiError(error) };
				}
			},
		},
	};
}
