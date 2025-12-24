import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HasilDiagnosisPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const diagnosisResult = location.state?.diagnosisResult || null;

	if (!diagnosisResult) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
				<div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-md w-full text-center">
					<h2 className="text-xl font-bold text-gray-800 mb-2">Tidak ada data diagnosis</h2>
					<p className="text-sm text-gray-600 mb-6">
						Silakan lakukan diagnosis ulang dari halaman utama.
					</p>
					<button
						onClick={() => navigate("/diagnosis")}
						className="w-full bg-[#176B87] text-white py-2.5 rounded-md font-bold text-sm hover:bg-[#12556c] transition-colors"
					>
						Kembali ke Diagnosis
					</button>
				</div>
			</div>
		);
	}

	const { id_diagnosis, hasil_utama, analisis_tambahan = [] } = diagnosisResult;
	const { nama_penyakit, cf_tertinggi, deskripsi, solusi } = hasil_utama || {};
	const cfPercentage = cf_tertinggi ? (cf_tertinggi * 100).toFixed(1) : "0";

	return (
		<div className="min-h-screen bg-white font-sans text-gray-900 pb-12">
			<div className="max-w-5xl mx-auto px-6 py-8">
				{/* Header Section */}
				<div className="flex justify-between items-start mb-1">
					<h1 className="text-3xl font-bold text-gray-800 tracking-tight">Hasil Diagnosis</h1>
					<span className="text-[11px] text-gray-400 mt-2 font-medium">
						ID Diagnosis: {id_diagnosis || "99"}
					</span>
				</div>

				<div className="mb-8">
					<span className="bg-blue-100 text-blue-600 text-[10px] px-3 py-1 rounded font-bold border border-blue-200 uppercase tracking-wider">
						Diagnosis Complete
					</span>
				</div>

				{/* Main Result Card */}
				<div className="border border-gray-200 rounded-xl p-6 mb-6 shadow-sm bg-white">
					<div className="mb-4">
						<h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
							{nama_penyakit || "Penyakit"}
							<span className="text-xs text-gray-400 font-normal opacity-70">(ID: P01)</span>
						</h2>
						<p className="text-sm font-bold text-gray-600 mt-1">
							Tingkat Keyakinan: <span className="text-[#176B87]">{cfPercentage}%</span>
						</p>
					</div>
					{/* Progress Bar Utama */}
					<div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden border border-gray-200">
						<div
							className="bg-[#176B87] h-full transition-all duration-1000 ease-out"
							style={{ width: `${cfPercentage}%` }}
						></div>
					</div>
				</div>

				{/* Deskripsi Penyakit Card */}
				<div className="border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
					<h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-widest border-b border-gray-50 pb-2">
						Deskripsi Penyakit
					</h3>
					<p className="text-[14px] text-gray-600 leading-relaxed text-justify italic">
						{deskripsi || "Deskripsi penyakit tidak tersedia."}
					</p>
				</div>

				{/* Solusi dan Rekomendasi Card */}
				<div className="border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
					<h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-widest border-b border-gray-50 pb-2">
						Solusi dan Rekomendasi
					</h3>
					<p className="text-[14px] text-gray-700 leading-relaxed bg-slate-50/50 p-4 rounded-lg">
						{solusi || "Hubungi tenaga medis terdekat untuk konsultasi lebih lanjut."}
					</p>
				</div>

				{/* Kemungkinan Penyakit Lain Card */}
				<div className="border border-gray-200 rounded-xl p-6 mb-10 shadow-sm">
					<h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-widest border-b border-gray-50 pb-2">
						Kemungkinan Penyakit Lain
					</h3>
					<div className="space-y-8">
						{analisis_tambahan.length > 0 ? (
							analisis_tambahan.map((penyakit, index) => (
								<div key={index} className="space-y-2.5">
									<div className="flex justify-between items-center">
										<span className="text-[12px] text-gray-400 font-bold uppercase tracking-tight">
											{penyakit.nama_penyakit || "Penyakit Lain"}
											<span className="ml-2 opacity-50 text-[11px]">
												(ID: {penyakit.id_penyakit || `P0${index + 2}`})
											</span>
										</span>
										<span className="text-base text-[#176B87] font-black">
											{(penyakit.cf_score * 100).toFixed(1)}%
										</span>
									</div>
									{/* Progress Bar Penyakit Lain */}
									<div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
										<div
											className="bg-blue-300 h-full opacity-80"
											style={{ width: `${penyakit.cf_score * 100}%` }}
										></div>
									</div>
								</div>
							))
						) : (
							<p className="text-sm text-gray-400 italic">
								Tidak ada kemungkinan penyakit lain yang terdeteksi.
							</p>
						)}
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex justify-between items-center gap-4">
					<button
						onClick={() => navigate("/")}
						className="flex items-center gap-2 border border-gray-300 text-gray-600 px-8 py-3 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all active:scale-95"
					>
						<i className="fas fa-home"></i> Beranda
					</button>
					<button
						onClick={() => navigate("/diagnosis")}
						className="flex items-center gap-2 bg-[#176B87] text-white px-8 py-3 rounded-lg text-sm font-bold hover:bg-[#12556c] transition-all shadow-sm active:scale-95"
					>
						<i className="fas fa-redo"></i> Diagnosis Baru
					</button>
				</div>
			</div>
		</div>
	);
};

export default HasilDiagnosisPage;
