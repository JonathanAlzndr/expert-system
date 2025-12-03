import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../ui/Button";

const DisclaimerModal = ({ isOpen, onAgree }) => {
	const [agreed, setAgreed] = useState(false);

	const handleAgree = () => {
		if (agreed) {
			onAgree();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={() => {}} title="Peringatan Penting">
			<div className="text-center mb-6">
				<i className="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
				<h2 className="text-2xl font-bold text-gray-800">Peringatan Penting</h2>
			</div>

			<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
				<p className="text-gray-700">
					Hasil diagnosis dari sistem ini bukan pengganti diagnosis dari dokter profesional. Hasil
					ini hanya sebagai referensi awal dan tidak boleh dijadikan sebagai dasar pengobatan.
				</p>
			</div>

			<div className="flex items-center mb-6">
				<input
					type="checkbox"
					id="agree"
					checked={agreed}
					onChange={(e) => setAgreed(e.target.checked)}
					className="h-5 w-5 text-primary rounded"
				/>
				<label htmlFor="agree" className="ml-2 text-gray-700">
					Saya mengerti dan menyetujui
				</label>
			</div>

			<Button
				className={`w-full  ${agreed ? "" : "opacity-50 cursor-not-allowed "}`}
				disabled={!agreed}
				onClick={handleAgree}
			>
				Lanjutkan
			</Button>
		</Modal>
	);
};

export default DisclaimerModal;
