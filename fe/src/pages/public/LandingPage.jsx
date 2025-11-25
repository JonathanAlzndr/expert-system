import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const Card = ({ title, body, children }) => {
	return (
		<div className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
			<div className="flex items-center mb-4">
				<div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
					{children}
				</div>
				<h3 className="text-xl font-bold text-primary">{title}</h3>
			</div>
			<p className="text-gray-700">{body}</p>
		</div>
	);
};

const Hero = () => {
	return (
		<section className="relative bg-linear-to-br from-primary via-[#1a7a9a] to-secondary text-white py-20 overflow-hidden">
			{/* Background Wave */}
			<div className="absolute inset-0 z-0">
				<svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
					<path
						fill="#176b87"
						fillOpacity="1"
						d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,192C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
					></path>
				</svg>
			</div>
			{/* Content */}
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
				<div className="md:w-1/2 mb-8 md:mb-0">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
						Jaga Kesehatan dengan <span className="text-yellow-300">Diagnosis Akurat</span>
					</h1>
					<p className="text-lg md:text-xl mb-6 leading-relaxed opacity-90">
						Sistem pakar kesehatan menggunakan metode <strong>Forward Chaining</strong> dan{" "}
						<strong>Certainty Factor </strong>&nbsp;untuk identifikasi penyakit berdasarkan gejala.
					</p>
					<a
						href="/diagnosis"
						className="bg-white text-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
					>
						<i className="fas fa-stethoscope mr-2"></i>
						Mulai Diagnosis
					</a>
				</div>
			</div>
			{/* Bottom Wave */}
			<div className="absolute bottom-0 left-0 w-full">
				<svg viewBox="0 0 1440 120" className="w-full h-12" preserveAspectRatio="none">
					<path
						fill="#ffffff"
						d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
					></path>
				</svg>
			</div>
		</section>
	);
};

const LandingPage = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			{/* Hero Section dengan Simple Wave SVG */}
			<Hero />

			{/* Informasi Penyakit Section */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-primary">Informasi Penyakit</h2>
					<div className="flex gap-10">
						<Card
							title={"Forward Chaining"}
							body={`Sistem menggunakan metode forward chaining untuk melakukan inferensi dari gejala yang
				dimasukkan pengguna hingga mencapai kesimpulan diagnosis penyakit.`}
						>
							{" "}
							<i className="fas fa-project-diagram"></i>
						</Card>
						<Card
							title={"Certainty Factor"}
							body={`Metode certainty factor digunakan untuk menghitung tingkat keyakinan diagnosis
								berdasarkan gejala yang dipilih pengguna dengan tingkat keyakinan tertentu.`}
						>
							<i className="fas fa-percentage"></i>
						</Card>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default LandingPage;
