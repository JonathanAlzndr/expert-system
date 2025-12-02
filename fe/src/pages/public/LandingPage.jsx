import React from "react";
import { Link } from "react-router-dom"; // Import Link
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

// Komponen Card yang reusable
const Card = ({ title, body, children }) => {
    return (
        <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100 h-full flex flex-col">
            <div className="flex flex-col items-center mb-4 text-center">
                {/* Icon Container */}
                <div className="mb-4">
                    {children}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed text-center flex-grow">
                {body}
            </p>
        </div>
    );
};

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-br from-primary via-[#1a7a9a] to-secondary text-white py-20 overflow-hidden">
            {/* Background Wave */}
            <div className="absolute inset-0 z-0 opacity-30">
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
                <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Jaga Kesehatan dengan <span className="text-yellow-300">Diagnosis Akurat</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                        Temukan jawaban atas kondisi kesehatan Anda. Sistem kami memadukan metode <strong>Forward Chaining</strong> dan{" "}
                        <strong>Certainty Factor</strong> untuk menganalisis setiap gejala yang Anda rasakan, memberikan hasil diagnosis layaknya berkonsultasi langsung dengan pakar.
                    </p>
                    
                    {/* Ganti <a> dengan <Link> untuk performa SPA */}
                    <Link
                        to="/diagnosis"
                        className="bg-white text-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <i className="fas fa-stethoscope mr-2"></i>
                        Mulai Diagnosis
                    </Link>
                </div>
                
                {/* Optional: Tambahkan Ilustrasi Hero di sisi kanan jika ada */}
                {/* <div className="md:w-1/2 hidden md:block">...Gambar Dokter/Kesehatan...</div> */}
            </div>

            {/* Bottom Wave - Transisi ke section putih */}
            <div className="absolute bottom-0 left-0 w-full">
                <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24" preserveAspectRatio="none">
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
        <div className="min-h-screen flex flex-col font-sans">
            <Header />

            <Hero />

            {/* Main Content Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">

                    {/* --- BAGIAN 1: EDUKASI UMUM TENTANG PMS (DI ATAS) --- */}
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Mengenal Penyakit Menular Seksual (PMS)</h2>
                            <div className="w-24 h-1 bg-secondary mx-auto rounded"></div>
                        </div>
                        
                        <p className="text-center text-gray-600 mb-12 max-w-4xl mx-auto text-lg leading-relaxed">
                            Penyakit Menular Seksual (PMS) atau Infeksi Menular Seksual (IMS) adalah infeksi yang menular melalui hubungan seksual. 
                            Pemahaman dini sangat penting karena banyak kasus tidak menunjukkan gejala awal yang jelas namun dapat berakibat fatal.
                        </p>
                        
                        {/* Grid 3 Kolom untuk Definisi, Gejala, dan Bahaya */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            
                            {/* Kartu 1: Apa itu PMS? */}
                            <Card title={"Apa itu PMS?"}>
                                <div className="text-5xl text-blue-500 mb-4 flex justify-center transform transition duration-500 hover:scale-110">
                                    <i className="fas fa-info-circle"></i>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    PMS disebabkan oleh bakteri, virus, atau parasit. Penularan utamanya terjadi melalui kontak seksual (vaginal, anal, atau oral), namun beberapa juga dapat menular melalui darah atau dari ibu ke anak selama kehamilan.
                                </p>
                            </Card>

                            {/* Kartu 2: Seperti Apa Gejalanya? */}
                            <Card title={"Gejala Umum"}>
                                <div className="text-5xl text-yellow-500 mb-4 flex justify-center transform transition duration-500 hover:scale-110">
                                    <i className="fas fa-search-plus"></i>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Waspadai tanda-tanda seperti rasa nyeri saat buang air kecil, keluarnya cairan tidak normal (nanah/keputihan berbau), munculnya luka atau kutil di area genital, serta rasa gatal atau panas yang tidak wajar.
                                </p>
                            </Card>

                            {/* Kartu 3: Apa Bahayanya? */}
                            <Card title={"Bahaya & Resiko"}>
                                <div className="text-5xl text-red-500 mb-4 flex justify-center transform transition duration-500 hover:scale-110">
                                    <i className="fas fa-biohazard"></i>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Jika dibiarkan tanpa pengobatan, PMS dapat menyebabkan komplikasi serius seperti kerusakan organ reproduksi, kemandulan (infertilitas), kehamilan di luar kandungan, hingga meningkatkan risiko terkena HIV/AIDS.
                                </p>
                            </Card>

                        </div>
                    </div>

                    {/* --- BAGIAN 2: METODE DIAGNOSIS (DI BAWAH) --- */}
                    <div>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Metode Diagnosis Sistem Pakar</h2>
                            <div className="w-24 h-1 bg-secondary mx-auto rounded"></div>
                        </div>

                        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                            Untuk membantu mendeteksi risiko di atas secara akurat, sistem kami bekerja menggunakan standar algoritma kecerdasan buatan.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <Card
                                title={"Forward Chaining"}
                                body={`Metode inferensi yang bekerja dengan alur 'maju' (data-driven). Sistem memulai analisis dengan mengumpulkan fakta-fakta gejala awal yang Anda rasakan, kemudian menelusuri basis pengetahuan medis untuk mencocokkan pola gejala tersebut hingga akhirnya menarik kesimpulan diagnosis penyakit yang paling relevan.`}
                            >
                                <div className="text-5xl text-blue-600 mb-4 flex justify-center">
                                    <i className="fas fa-project-diagram"></i>
                                </div>
                            </Card>
                            
                            <Card
                                title={"Certainty Factor"}
                                body={`Metode kalkulasi matematis untuk menangani ketidakpastian. Tidak hanya sekadar 'Ya' atau 'Tidak', metode ini menghitung seberapa besar persentase kemungkinan Anda menderita suatu penyakit dengan menggabungkan bobot keyakinan gejala yang Anda pilih (misal: Ragu-ragu vs Sangat Yakin) dengan bobot klinis dari pakar medis.`}
                            >
                                <div className="text-5xl text-green-600 mb-4 flex justify-center">
                                    <i className="fas fa-percentage"></i>
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default LandingPage;