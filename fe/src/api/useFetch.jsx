import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const apiClient = axios.create({
	baseURL: "http://127.0.0.1:5000/api",
	headers: {
		"Content-Type": "application/json",
	},
});
// Request Interceptor: Sisipkan Token otomatis
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token"); // Ambil token dari Login tadi
		if (token) {
			config.headers.Authorization = `Bearer ${token}`; // Format standar JWT
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response Interceptor: Auto-logout jika token expired (401)
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("token");
			// Opsional: window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);
const useFetch = (url, method = "GET", payload = null, options = { autoFetch: true }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(options.autoFetch);
	const [error, setError] = useState(null);

	const execute = useCallback(
		async (dynamicPayload = payload) => {
			const controller = new AbortController();
			try {
				setLoading(true);
				setError(null);

				const response = await apiClient({
					method: method,
					url: url,
					data: dynamicPayload,
					signal: controller.signal,
				});

				setData(response.data);
				return response.data;
			} catch (err) {
				if (axios.isCancel(err)) {
					console.log("Request canceled");
				} else {
					const errMsg = err.response?.data?.message || err.message || "Something went wrong";
					setError(errMsg);
					throw err;
				}
			} finally {
				setLoading(false);
			}
		},
		[url, method, payload]
	);

	useEffect(() => {
		if (options.autoFetch) {
			execute();
		}
	}, [execute, options.autoFetch]);

	return { data, loading, error, execute };
};

export default useFetch;
