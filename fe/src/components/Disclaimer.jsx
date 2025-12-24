import React, { useState } from "react";

const Disclaimer = ({ isOpen, onAgree }) => {
	const [agreed, setAgreed] = useState(false);

	if (!isOpen) return null;

	const handleAgree = () => {
		if (agreed) {
			onAgree();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
			<div className="bg-white rounded-md shadow-lg w-full max-w-lg overflow-hidden border border-gray-200">
				{/* Header Modal */}
				<div className="px-4 py-2 border-b border-gray-100 bg-white">
					<h2 className="text-sm font-bold text-gray-800">Peringatan Penting</h2>
				</div>

				{/* Isi Modal */}
				<div className="p-8 text-center">
					{/* Ikon Segitiga Peringatan */}
					<div className="flex justify-center mb-4">
						<div className="relative">
							<i className="fas fa-exclamation-triangle text-3xl text-yellow-500"></i>
						</div>
					</div>

					<h3 className="text-xl font-bold text-gray-800 mb-6">Peringatan Penting</h3>

					{/* Kotak Teks Kuning */}
					<div className="bg-yellow-50/50 border-l-4 border-yellow-500 p-4 mb-8 text-left">
						<p className="text-[13px] leading-relaxed text-gray-600">
							Hasil diagnosis dari sistem ini bukan pengganti diagnosis dari dokter profesional.
							Hasil ini hanya sebagai referensi awal dan tidak boleh dijadikan sebagai dasar
							pengobatan.
						</p>
					</div>

					{/* Checkbox Persetujuan */}
					<div className="flex items-center justify-start mb-8 pl-1">
						<input
							type="checkbox"
							id="agree-checkbox"
							checked={agreed}
							onChange={(e) => setAgreed(e.target.checked)}
							className="w-4 h-4 border-gray-300 rounded text-[#176B87] focus:ring-[#176B87] cursor-pointer"
						/>
						<label
							htmlFor="agree-checkbox"
							className="ml-2 text-[13px] text-gray-500 cursor-pointer select-none"
						>
							Saya mengerti dan menyetujui
						</label>
					</div>

					{/* Tombol Lanjutkan */}
					<div className="flex justify-center border-t border-gray-50 pt-4">
						<button
							onClick={handleAgree}
							disabled={!agreed}
							className={`text-[13px] font-medium transition-colors ${
								agreed ? "text-[#176B87] hover:text-[#12556c]" : "text-gray-300 cursor-not-allowed"
							}`}
						>
							Lanjutkan
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Disclaimer;
