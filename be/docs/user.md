# General User API Specification

## Get All Diseases

**Description:**
Menampilkan semua data penyakit yang ada di sistem.

**Authorization:**
Tidak diperlukan

**Access:**
Public

### Endpoint: `GET /api/penyakit`

### Response Body (Success):
```json
{
    "msg": "Success",
    "data": [
        {
            "id_penyakit": 1,
            "kode_penyakit": "P01",
            "nama_penyakit": "Gonore",
            "deskripsi": "Infeksi menular seksual akibat bakteri Neisseria gonorrhoeae.",
            "solusi": "Konsultasi ke dokter spesialis kulit dan kelamin."
        }
    ]
}
```

### Get All Symptoms

**Description:**
Menampilkan semua gejala yang tersedia untuk pengguna dalam proses diagnosa.

**Authorization:**
Tidak diperlukan

**Access:**
Public

### Endpoint: `GET /api/gejala`

### Response Body (Success):
```json
{
    "msg": "Success",
    "data": [
        {
            "id_gejala": 1,
            "kode_gejala": "G01",
            "nama_gejala": "Nyeri saat buang air kecil"
        },
        {
            "id_gejala": 2,
            "kode_gejala": "G02",
            "nama_gejala": "Keluarnya cairan dari penis"
        }
    ]
}
```
--- 

### Get All Rules

**Description:**
Menampilkan semua rule yang menghubungkan penyakit dan gejala dengan nilai CF pakar.

**Authorization:**
Tidak diperlukan

**Access:**
Public

### Endpoint: `GET /api/rule`


### Response Body (Success):
```json
{
    "msg": "Success",
    "data": [
        {
            "id_rule": 1,
            "penyakit": "Gonore",
            "gejala": "Keluarnya cairan dari penis",
            "cf_pakar": 0.8
        }
    ]
}
```

### Diagnose

**Description:**
Melakukan proses diagnosa penyakit berdasarkan gejala yang dipilih pengguna menggunakan metode Forward Chaining dan Certainty Factor.

**Authorization:**
Tidak diperlukan

**Access:**
Public

### Endpoint: `POST /api/diagnosa`

### Request Body:
```json
{
    "jawaban": [
        { "id_gejala": 1, "cf_user": 0.8 },
        { "id_gejala": 2, "cf_user": 0.6 }
    ]
}
```

### Response Body (Success):
```json
{
    "msg": "Success",
    "hasil": {
        "penyakit_teridentifikasi": "Gonore",
        "nilai_cf": 0.78,
        "solusi": "Segera konsultasi ke dokter spesialis kulit dan kelamin."
    },
    "detail_perhitungan": [
        { "gejala": "Nyeri saat buang air kecil", "cf_user": 0.8, "cf_pakar": 0.9, "cf_hasil": 0.72 },
        { "gejala": "Keluarnya cairan dari penis", "cf_user": 0.6, "cf_pakar": 0.8, "cf_hasil": 0.48 }
    ]
}
```

### Response Body (Failed):
```json
{
    "msg": "Tidak ditemukan penyakit yang cocok",
    "hasil": {}
}
```

### Error Response (Global)
```json
{
    "msg": "Unauthorized - Token tidak valid"
}
```
```json
{
    "msg": "Data tidak ditemukan"
}
```
```json
{
    "msg": "Terjadi kesalahan pada server"
}
```