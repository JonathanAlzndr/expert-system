// import Button from "../../../components/ui/Button";
import { Button } from "./Button";

export const Modal = ({ setSelectedDisease, selectedDisease }) => (
	<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
		<div
			className="absolute inset-0 bg-dark/60 backdrop-blur-sm transition-opacity"
			onClick={() => setSelectedDisease(null)}
		></div>

		<div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in-up">
			{/* Modal Header */}
			<div className="bg-primary p-6 sticky top-0 flex justify-between items-start">
				<div>
					<h2 className="text-2xl font-bold text-white">{selectedDisease.name}</h2>
					<p className="text-white text-sm mt-1">Detail Informasi & Penanganan</p>
				</div>
				<button
					className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
					onClick={() => setSelectedDisease(null)}
				>
					<i className="fas fa-times text-xl w-6 h-6 flex items-center justify-center"></i>
				</button>
			</div>

			{/* Modal Content */}
			<div className="p-8 space-y-6">
				<div className="bg-biru p-5 rounded-xl border border-gray-100">
					<h3 className="text-primary font-bold mb-2 flex items-center">
						<i className="fas fa-info-circle mr-2"></i> Deskripsi
					</h3>
					<p className="text-gray-700 leading-relaxed">{selectedDisease.description}</p>
				</div>

				<div>
					<h3 className="text-primary font-bold mb-3 flex items-center">
						<i className="fas fa-hand-holding-medical mr-2"></i> Solusi & Penanganan
					</h3>
					<div className="bg-background p-5 rounded-xl border-l-4 border-primary">
						<p className="text-gray-700 leading-relaxed whitespace-pre-line">
							{selectedDisease.fullSolusi || selectedDisease.symptoms.join(", ")}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="p-4 border border-gray-100 rounded-lg">
						<h4 className="font-semibold text-gray-800 mb-2">Pencegahan</h4>
						<p className="text-sm text-gray-600">
							Jaga kebersihan lingkungan dan lakukan check-up rutin.
						</p>
					</div>
					<div className="p-4 border border-gray-100 rounded-lg">
						<h4 className="font-semibold text-gray-800 mb-2">Konsultasi</h4>
						<p className="text-sm text-gray-600">
							Hubungi dokter jika gejala berlanjut lebih dari 3 hari.
						</p>
					</div>
				</div>
			</div>

			{/* Modal Footer */}
			<div className="flex justify-center px-2 py-3 ">
				<Button onClick={() => setSelectedDisease(null)}>Mengerti</Button>
			</div>
		</div>
	</div>
);
