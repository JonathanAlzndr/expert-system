import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import DisclaimerModal from "../../components/diagnosis/DisclaimerModal";
import Button from "../../components/ui/Button";
import axios from "axios";
import FormInput from "./../../components/ui/FormInput";

export default function Dev() {
	const navigate = useNavigate();
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showDisclaimer, setShowDisclaimer] = useState(true);
	const [symptoms, setSymptoms] = useState([]);
	const [processing, setProcessing] = useState(false);
	const answerOptions = [
		{ label: "Pilih jawaban...", value: null },
		{ label: "Pasti Tidak", value: -1.0 },
		{ label: "Hampir Pasti Tidak", value: -0.8 },
		{ label: "Kemungkinan Besar Tidak", value: -0.6 },
		{ label: "Mungkin Tidak", value: -0.4 },
		{ label: "Tidak Yakin", value: -0.2 },
		{ label: "Mungkin Ya", value: 0.4 },
		{ label: "Kemungkinan Besar Ya", value: 0.6 },
		{ label: "Hampir Pasti Ya", value: 0.8 },
		{ label: "Pasti Ya", value: 1.0 },
	];
	return (
		<>
			<h1 className="text-3xl font-bold text-primary mb-2">Diagnosis Penyakit</h1>
			<p className="text-gray-600 mb-8">Pilih tingkat keyakinan Anda untuk setiap gejala berikut</p>
			<form className="bg-white shadow-lg w-full h-100 rounded-lg">
				<Input symptom={symptoms} />
			</form>
		</>
	);
}

const Input = (symptom, index) => {
	return (
		<div key={symptom.id}>
			<label htmlFor="">
				{index + 1}
				{symptom.name}
			</label>
			<select name="" id="">
				<select
					className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ${
						symptom.certainty === null
							? "border-gray-300 bg-white"
							: symptom.certainty < 0
							? "border-red-300 bg-red-50"
							: symptom.certainty === 0
							? "border-gray-300 bg-gray-50"
							: "border-green-300 bg-green-50"
					}`}
				>	</select>
			</select>
		</div>
	);
};
