# API Specification: Sistem Pakar Diagnosis Penyakit

Dokumentasi ini menjelaskan endpoint yang digunakan oleh Pengguna Umum (untuk diagnosis) dan Admin/Dokter (untuk manajemen data master dan rules).

---

## Otentikasi Admin

### Login Admin

**Description:**
Digunakan oleh Admin (Dokter) untuk mendapatkan token akses (Bearer Token) yang diperlukan untuk semua endpoint CRUD.

**Authorization:**
Tidak diperlukan

**Access:**
Admin

### Endpoint: `POST /api/admin/login`

#### Request Body:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `username` | `string` | Username Admin. |
| `password` | `string` | Password Admin. |

```json
{
  "username": "dokter_a",
  "password": "kata_sandi_rahasia"
}
```

### Response Body (Success):
```json
{
  "msg": "Login Success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id_admin": 1
}
```

## Diagnosis Umum

### Get All Questions
**description**:
Mengambil daftar lengkap semua pertanyaan gejala yang harus dijawab pengguna untuk memulai diagnosis

**authorization**:
Tidak diperlukan

**access**:
Pengguna Umum


### Endpoint `GET /api/diagnosis/pertanyaan`

### Response Body (Success):
```json
{
  "msg": "Success",
  "pertanyaanList": [
    {
      "id_pertanyaan": 1,
      "id_gejala": "G01",
      "teks_pertanyaan": "Apakah Anda merasakan nyeri atau sensasi terbakar saat buang air kecil?"
    },
    {
      "id_pertanyaan": 2,
      "id_gejala": "G02",
      "teks_pertanyaan": "Apakah Anda melihat adanya keluaran cairan seperti nanah saat buang air kecil?"
    }
  ]
}
```

## Submit Diagnosis

**description**:
Mengirimkan jawaban (Certainty Factor/CF User) dari pengguna untuk diproses oleh algoritma CF dan mendapatkan hasil diagnosis.

**authorization**:
Tidak diperlukan

### Endpoint `POST /api/diagnosis`

### Request Body:
```json
{
  "answers": [
    {"id_gejala": "G01", "cf_user": 0.8},  
    {"id_gejala": "G02", "cf_user": 0.2},  
    {"id_gejala": "G03", "cf_user": 0.0}   
  ]
}
```

### Response Body (Success):
```json
{
  "msg": "Diagnosis Complete",
  "id_diagnosis": 123,
  "hasil_utama": {
    "id_penyakit": "P01",
    "nama_penyakit": "Gonore",
    "cf_tertinggi": 0.965,
    "deskripsi": "Infeksi bakteri menular seksual...",
    "solusi": "Segera konsultasi ke dokter..."
  },
  "analisis_tambahan": [
    {"id_penyakit": "P02", "nama_penyakit": "Sifilis", "cf_score": 0.85}
  ]
}
```

---

# CRUD Data Master (Admin)

## CRUD Penyakit
**description**:
Mengelola data master penyakit

**authorization**:
Required (Bearer Token)

**access**:
Admin

### Endpoint List
- `GET /api/admin/penyakit` (Get All)
- `GET /api/admin/penyakit/{id_penyakit}` (Get By ID)
- `POST /api/admin/penyakit` (Create)
- `PUT /api/admin/penyakit/{id_penyakit}` (Update)
- `DELETE /api/admin/penyakit/{id_penyakit}` (Delete)

### Request Body (POST/PUT):
```json
{
  "id_penyakit": "P05", 
  "nama_penyakit": "Kandidiasis",
  "deskripsi": "Infeksi jamur...",
  "solusi": "Pengobatan antijamur..."
}
```

### Response Body (GET All):
```json
{
  "msg": "Success",
  "data": [
    {"id_penyakit": "P01", "nama_penyakit": "Gonore", "solusi": "..."},
    {"id_penyakit": "P02", "nama_penyakit": "Sifilis", "solusi": "..."}
  ]
}
```

### Response Body (POST/PUT/DELETE):
```json
{
  "msg": "Success: Data penyakit berhasil disimpan."
}
```

### Response Body (Failed)
```json
{
  "msg": "Failed: Penyakit dengan ID P05 sudah ada.",
  "error_code": 400
}
```

## CRUD Gejala dan Pertanyaan

**description**:
Karena Gejala dan Pertanyaan terkait 1:1, mereka dikelola melalui satu set endpoint.

**authorization**:
Required (Bearer Token)

**access**:
Admin

### Endpoint List
- `GET /api/admin/gejala` (Ambil daftar semua gejala dan pertanyaan terkait.) 
- `POST /api/admin/gejala` (Tambah gejala dan pertanyaan baru)
- `PUT /api/admin/gejala/{id_gejala}` (Ubah nama gejala dan teks pertanyaan.)
- `DELETE /api/admin/gejala/{id_gejala}` (Hapus gejala, pertanyaan, dan rules terkait)

### Request Body:
```json
{
  "id_gejala": "G11", 
  "nama_gejala": "Rasa gatal yang parah",
  "teks_pertanyaan": "Apakah Anda merasakan gatal yang sangat parah di area kelamin?"
}
```

### Response Body (Get All):
```json
{
  "msg": "Success",
  "data": [
    {"id_gejala": "G01", "nama_gejala": "Nyeri saat BAK", "teks_pertanyaan": "Apakah Anda merasakan nyeri..."},
    {"id_gejala": "G02", "nama_gejala": "Keluar nanah", "teks_pertanyaan": "Apakah Anda melihat nanah..."}
  ]
}
```

### Response Body (POST/PUT/DELETE):
```json
{
  "msg": "Success: Gejala dan pertanyaan berhasil diperbarui."
}
```

### Response Body (Failed):
```json
{
  "msg": "Failed: Gejala dengan ID G11 tidak ditemukan.",
  "error_code": 404
}
```

## CRUD Rules

**description**:
Mengelola data aturan gejala

**authorization**:
Required (Bearer Token)

**access**:
Admin

### Endpoint List:
- `GET /api/admin/rule` (Ambil daftar semua aturan) 
- `POST /api/admin/rule` (ambah aturan baru (ID rule, Penyakit, Gejala, CF))
- `PUT /api/admin/rule/{id_rule}` (Ubah nilai CF_Rules saja)
- `DELETE /api/admin/rule/{id_rule}` (Hapus Rule tertentu)

### Request Body (POST):
```json
{
  "id_rule": "R18",
  "id_penyakit": "P01",
  "id_gejala": "G11",
  "cf_rule": 0.85 
}
```

### Request Body (PUT /api/admin/rule/{id_rule})
```json
{
  "cf_rule": 0.90 
}
```

### Response Body (Get All):
```json
{
  "msg": "Success",
  "data": [
    {"id_rule": "R01", "id_penyakit": "P01", "id_gejala": "G01", "cf_rule": 0.95},
    {"id_rule": "R02", "id_penyakit": "P01", "id_gejala": "G02", "cf_rule": 0.97}
  ]
}
```

### Response Body (POST/PUT/DELETE):
```json
{
  "msg": "Success: Rule R18 berhasil diupdate dengan CF 0.85."
}
```

### Response Body (Failed):
```json
{
  "msg": "Failed: Rule R18 sudah ada atau data master (Penyakit/Gejala) tidak valid.",
  "error_code": 400
}
```