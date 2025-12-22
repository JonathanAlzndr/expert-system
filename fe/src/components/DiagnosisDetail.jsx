import React from "react";

const DiagnosisDetail = ({ data }) => {
	if (!data) return null;

	return (
		<>
			{/* Header Hasil */}
			<div className="bg-primary/5 border border-primary/20 p-5 rounded-xl shadow-lg flex justify-between items-center mb-6">
				<div>
					<h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
						Hasil Diagnosis Akhir
					</h4>
					<h3 className="text-3xl font-extrabold text-primary mt-1">
						{data.info_diagnosis?.hasil_penyakit || "TIDAK TERIDENTIFIKASI"}
					</h3>
				</div>
				<div className="text-right">
					<span className="text-sm font-medium text-gray-500 block">Tingkat Keyakinan (CF)</span>
					<span className="text-4xl font-black text-red-600">
						{data.info_diagnosis?.cf_persen || "0.0%"}
					</span>
				</div>
			</div>

			{/* Grid Info & Solusi */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				{/* Solusi */}
				<div className="bg-white border border-green-300 rounded-xl p-4 shadow-md">
					<h4 className="text-lg font-bold text-green-700 mb-3 flex items-center">
						<i className="fas fa-prescription-bottle text-xl mr-2"></i> Solusi Penanganan
					</h4>
					<div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm max-h-48 overflow-y-auto">
						{data.info_diagnosis?.solusi || "-"}
					</div>
				</div>

				{/* Info Meta */}
				<div className="bg-white border border-gray-300 rounded-xl p-4 shadow-md space-y-3">
					<h4 className="text-lg font-bold text-gray-700 flex items-center">
						<i className="fas fa-info-circle text-xl mr-2"></i> Info Diagnosis
					</h4>
					<div className="border-b pb-2">
						<p className="text-sm text-gray-500">Tanggal:</p>
						<p className="font-semibold text-gray-800">{data.info_diagnosis?.tanggal || "-"}</p>
					</div>
					<div>
						<p className="text-sm text-gray-500">Gejala:</p>
						<p className="font-semibold text-gray-800">{data.detail_jawaban?.length || 0} Gejala</p>
					</div>
				</div>
			</div>

			{/* List Gejala */}
			<div className="border-t pt-4">
				<h4 className="text-lg font-bold text-gray-800 mb-3">
					<i className="fas fa-microscope text-xl mr-2 text-primary"></i> Detail Analisis
				</h4>
				<div className="max-h-[350px] overflow-y-auto pr-2">
					<ul className="divide-y divide-gray-100 bg-white border border-gray-200 rounded-lg p-2">
						{data.detail_jawaban?.map((item, index) => (
							<li
								key={index}
								className="py-3 px-2 flex justify-between items-center text-sm hover:bg-gray-50"
							>
								<p className="font-medium text-gray-800 lg:w-3/5">
									<i className="fas fa-dot-circle text-xs text-primary/70 mr-2"></i>{" "}
									{item.nama_gejala}
								</p>
								<div className="flex items-center space-x-4 lg:w-2/5 justify-end">
									<span className="text-blue-700 font-semibold text-xs">{item.jawaban_user}</span>
									<span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full min-w-[50px] text-center">
										CF: {item.cf_user}
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default DiagnosisDetail;
