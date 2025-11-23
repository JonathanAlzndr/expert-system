import { useState, useCallback } from "react";
import axios from "axios";

export const useDiagnosis = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchQuestions = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await axios.get("http://127.0.0.1:5000/api/diagnosis/pertanyaan");
			// Sesuai dengan struktur response yang baru
			if (response.data.pertanyaanList && Array.isArray(response.data.pertanyaanList)) {
				setQuestions(response.data.pertanyaanList);
			} else {
				setError("Format data pertanyaan tidak sesuai");
			}
		} catch (err) {
			setError(err.response?.data?.msg || "Failed to fetch questions");
		} finally {
			setLoading(false);
		}
	}, []);

	const submitDiagnosis = useCallback(async (answers) => {
		setLoading(true);
		setError("");
		try {
			const response = await axios.post("http://127.0.0.1:5000/api/diagnosis", { answers });
			return { success: true, data: response.data };
		} catch (err) {
			const errorMessage = err.response?.data?.msg || "Failed to submit diagnosis";
			setError(errorMessage);
			return { success: false, error: errorMessage };
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		questions,
		loading,
		error,
		fetchQuestions,
		submitDiagnosis,
	};
};
