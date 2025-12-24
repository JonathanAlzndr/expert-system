import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<div className="min-h-screen flex flex-col font-sans text-gray-900">
			{/* HERO SECTION */}
			<section className="relative bg-[#176B87] text-white py-24 overflow-hidden">
				{/* Decorative Wave Background */}
				<div className="absolute inset-0 z-0 opacity-20">
					<svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
						<path
							fill="#ffffff"
							d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
						></path>
					</svg>
				</div>

				<div className="container mx-auto px-6 relative z-10 max-w-6xl">
					<div className="md:w-2/3">
						<h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
							Jaga Kesehatan dengan <br />
							<span className="text-[#F7D716]">Diagnosis Akurat</span>
						</h1>
						<p className="text-2xl md:text-xl mb-10 leading-relaxed opacity-90 max-w-2xl">
							Temukan jawaban atas kondisi kesehatan Anda. Sistem kami memadukan metode{" "}
							<strong>Forward Chaining</strong> dan <strong>Certainty Factor</strong> untuk
							menganalisis setiap gejala yang Anda rasakan, memberikan hasil diagnosis layaknya
							berkonsultasi langsung dengan pakar.
						</p>
						<Link
							to="/diagnosis"
							className="bg-white text-lg text-[#176B87] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 inline-flex items-center shadow-lg"
						>
							<i className="fas fa-stethoscope mr-2"></i>
							Mulai Diagnosis
						</Link>
					</div>
				</div>

				{/* Bottom Wave Transition */}
				<div className="absolute bottom-0 left-0 w-full leading-0">
					<svg viewBox="0 0 1440 120" className="w-full h-16" preserveAspectRatio="none">
						<path
							fill="#ffffff"
							d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
						></path>
					</svg>
				</div>
			</section>

			{/* SECTION 1: MENGENAL PMS */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-6 max-w-6xl text-center">
					<div className="mb-16">
						<h2 className="text-3xl font-bold text-[#176B87] mb-4">
							Mengenal Penyakit Menular Seksual (PMS)
						</h2>
						<div className="w-20 h-1 bg-[#F7D716] mx-auto"></div>
						<p className="text-gray-500 mt-10 max-w-4xl mx-auto text-base leading-relaxed">
							Penyakit Menular Seksual (PMS) atau Infeksi Menular Seksual (IMS) adalah infeksi yang
							menular melalui hubungan seksual. Pemahaman dini sangat penting karena banyak kasus
							tidak menunjukkan gejala awal yang jelas namun dapat berakibat fatal.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Card 1 */}
						<div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center">
							<div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-3xl mb-6">
								<i className="fas fa-info-circle"></i>
							</div>
							<p className="text-base text-gray-500 leading-relaxed mb-6">
								PMS disebabkan oleh bakteri, virus, atau parasit. Penularan utamanya terjadi melalui
								kontak seksual (vaginal, anal, atau oral), namun beberapa juga dapat menular melalui
								darah atau dari ibu ke anak selama kehamilan.
							</p>
							<h3 className="text-lg font-bold text-[#176B87]">Apa itu PMS?</h3>
						</div>

						{/* Card 2 */}
						<div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center">
							<div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center text-3xl mb-6">
								<i className="fas fa-search-plus"></i>
							</div>
							<p className="text-base text-gray-500 leading-relaxed mb-6">
								Waspadai tanda-tanda seperti rasa nyeri saat buang air kecil, keluarnya cairan tidak
								normal (nanah/keputihan berbau), munculnya luka atau kutil di area genital, serta
								rasa gatal atau panas yang tidak wajar.
							</p>
							<h3 className="text-lg font-bold text-[#176B87]">Gejala Umum</h3>
						</div>

						{/* Card 3 */}
						<div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center">
							<div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mb-6">
								<i className="fas fa-biohazard"></i>
							</div>
							<p className="text-base text-gray-500 leading-relaxed mb-6">
								Jika dibiarkan tanpa pengobatan, PMS dapat menyebabkan komplikasi serius seperti
								kerusakan organ reproduksi, kemandulan (infertilitas), kehamilan di luar kandungan,
								hingga meningkatkan risiko terkena HIV/AIDS.
							</p>
							<h3 className="text-lg font-bold text-[#176B87]">Bahaya & Resiko</h3>
						</div>
					</div>
				</div>
			</section>

			{/* SECTION 2: METODE DIAGNOSIS */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-6 max-w-6xl text-center">
					<div className="mb-16">
						<h2 className="text-3xl font-bold text-[#176B87] mb-4">
							Metode Diagnosis Sistem Pakar
						</h2>
						<div className="w-20 h-1 bg-[#F7D716] mx-auto"></div>
						<p className="text-gray-500 mt-10 max-w-2xl mx-auto text-base">
							Untuk membantu mendeteksi risiko di atas secara akurat, sistem kami bekerja
							menggunakan standar algoritma kecerdasan buatan.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
						{/* Forward Chaining Card */}
						<div className="bg-white p-10 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center">
							<div className="w-16 h-16 text-[#176B87] text-4xl mb-6">
								<i className="fas fa-project-diagram"></i>
							</div>
							<h3 className="text-3xl font-bold text-gray-800 mb-4">Forward Chaining</h3>
							<p className="text-base text-gray-400 leading-relaxed text-center">
								Metode inferensi yang bekerja dengan alur 'maju' (data-driven). Sistem memulai
								analisis dengan mengumpulkan fakta-fakta gejala awal yang Anda rasakan, kemudian
								menelusuri basis pengetahuan medis untuk mencocokkan pola gejala tersebut hingga
								akhirnya menarik kesimpulan diagnosis penyakit yang paling relevan.
							</p>
						</div>

						{/* Certainty Factor Card */}
						<div className="bg-white p-10 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center">
							<div className="w-16 h-16 text-green-500 text-4xl mb-6">
								<i className="fas fa-percentage"></i>
							</div>
							<h3 className="text-3xl font-bold text-gray-800 mb-4">Certainty Factor</h3>
							<p className="text-base text-gray-400 leading-relaxed text-center">
								Metode kalkulasi matematis untuk menangani ketidakpastian. Tidak hanya sekadar 'Ya'
								atau 'Tidak', metode ini menghitung seberapa besar persentase kemungkinan Anda
								menderita suatu penyakit dengan menggabungkan bobot keyakinan gejala yang Anda pilih
								(misal: Ragu-ragu vs Sangat Yakin) dengan bobot klinis dari pakar medis.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default LandingPage;
