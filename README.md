# Sistem Pakar Diagnosis Dini Penyakit Kelamin pada Pria
Aplikasi ini merupakan sistem pakar berbasis web yang digunakan untuk membantu melakukan diagnosis dini penyakit kelamin pada pria menggunakan metode Forward Chaining dan Certainty Factor (CF).

Sistem ini dirancang untuk memberikan estimasi awal tingkat kemungkinan penyakit berdasarkan gejala yang dipilih oleh pengguna, sehingga pengguna dapat memperoleh informasi awal sebelum melakukan pemeriksaan lebih lanjut ke tenaga medis profesional.

## Latar Belakang
Kurangnya kesadaran dan keterbatasan akses konsultasi medis menyebabkan banyak kasus penyakit kelamin terlambat terdeteksi. Selain itu, sebagian masyarakat masih merasa kurang nyaman melakukan konsultasi langsung terkait penyakit kelamin.

Dengan adanya sistem pakar ini, pengguna dapat melakukan konsultasi awal secara mandiri, cepat, dan informatif sebagai langkah awal untuk meningkatkan kesadaran kesehatan.

## Fitur Utama
* Konsultasi diagnosis berdasarkan gejala yang dipilih pengguna.
* Perhitungan tingkat kepastian diagnosis menggunakan metode Certainty Factor.
* Proses penalaran berbasis aturan menggunakan metode Forward Chaining
* Menampilkan hasil diagnosis beserta tingkat persentase keyakinan
* Manajemen data gejala, penyakit, aturan oleh admin

## Metode yang digunakan
* Forward chaining digunakan untuk melakukan proses inferensi berdasarkan aturan yang tersedia
* Certainty factor digunakan untuk menghitung tingkat keyakinan diagnosis berdasarkan kombinasi gejala yang dipilih pengguna

## Tech Stack
### Frontend
![React](https://img.shields.io/badge/React-Vite-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Markup-orange)
![CSS3](https://img.shields.io/badge/CSS3-Styling-blue)

### Backend
![Python](https://img.shields.io/badge/Python-Flask-green)
![Flask](https://img.shields.io/badge/Flask-REST%20API-black)

### Database
![MariaDB](https://img.shields.io/badge/MariaDB-Relational%20DB-blue)

### Tools & Development
![Git](https://img.shields.io/badge/Git-Version%20Control-red)
![GitHub](https://img.shields.io/badge/GitHub-Repository-black)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-orange)
![VSCode](https://img.shields.io/badge/VSCode-Editor-blue)
![Figma](https://img.shields.io/badge/Figma-UI%2FUX-purple)
![Laragon](https://img.shields.io/badge/Laragon-Local%20Server-orange)

## Methods:
![Forward Chaining](https://img.shields.io/badge/Inference-Forward%20Chaining-success)
![Certainty Factor](https://img.shields.io/badge/Reasoning-Certainty%20Factor-blueviolet)

## Instalasi

### 1. Clone Repository

```
git clone https://github.com/JonathanAlzndr/expert-system.git
cd expert-system
```

---

### 2. Setup Backend (Flask)

```
# masuk ke folder backend
cd be

# membuat virtual environment (Windows)
python -m venv venv

# aktivasi virtual environment
venv\Scripts\activate

# install dependencies
pip install -r requirements.txt
```

---

### 3. Setup Database (MariaDB)

1. Buat database baru di **MariaDB** (contoh: `expert_system_db`).
2. Import file database yang tersedia pada folder:

```
assets/database.sql
```

3. Buat file `.env` pada folder backend untuk konfigurasi koneksi database:

```
# Contoh .env
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=jwt_secret_key
DATABASE_URI=mysql+pymysql://root:password@localhost/expert_system_db
```

4. Jalankan Server Backend:

```
flask run
```

---

### 4. Setup Frontend

```
# masuk ke folder frontend
cd ../fe

# install dependencies
npm install

# jalankan aplikasi
npm run dev
```

Setelah semua langkah selesai, aplikasi dapat diakses melalui browser sesuai alamat yang ditampilkan pada terminal.

Akses Admin (Default)

Setelah instalasi selesai, Anda dapat login sebagai admin menggunakan akun berikut:
```
Username : dokter
Password : password123
```

### Dokumentasi endpoint API dapat dilihat di ```/be/docs/api_documentation.md```

## System Flow

| User Flow | Admin Flow |
|----------|------------|
| <p align="center"><img src="assets/user-flow.png" width="150"/></p> | <p align="center"><img src="assets/admin-flow.png" width="350"/></p> |
| <p align="center"><sub>Alur interaksi pengguna dalam proses diagnosis</sub></p> | <p align="center"><sub>Alur aktivitas admin dalam pengelolaan basis pengetahuan</sub></p> |

## Screenshots

### User
| Beranda | Diagnosis | Informasi Penyakit | Hasil Diagnosis |
|--------|-----------|--------------------|-----------------|
| <img src="assets/landing.png" width="280"/> | <img src="assets/diagnosis.png" width="280"/> | <img src="assets/informasi_penyakit.png" width="280"/> | <img src="assets/hasil_diagnosis.png" width="280"/> |

---

### Admin
| Login Admin | Beranda Admin | Detail Diagnosis | Kelola Gejala |
|-------------|---------------|-----------------|---------------|
| <img src="assets/login_admin.png" width="280"/> | <img src="assets/beranda_admin.png" width="280"/> | <img src="assets/detail_diagnosis.png" width="280"/> | <img src="assets/kelola_gejala.png" width="280"/> |

| Kelola Penyakit | Kelola Aturan |
|-----------------|---------------|
| <img src="assets/kelola_penyakit.png" width="280"/> | <img src="assets/kelola_aturan.png" width="280"/> |


## Contributors
- [Jonathan Alezandro](https://github.com/JonathanAlzndr) — Backend Developer  
- [Marcois Makalew](https://github.com/mrco23) — Frontend Developer

