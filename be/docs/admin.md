# Admin API Specification

## Login Admin

**Description:**
Login admin untuk mendapatkan token JWT yang digunakan untuk autentikasi.

**Authorization:**
Tidak diperlukan

**Access:**
Public

### Endpoint: `POST /api/auth/login`

### Request Body:

```json
{
    "username": "admin",
    "password": "123456"
}
```

### Response Body (Success):
```json
{
    "msg": "Login berhasil",
    "token": "<JWT_TOKEN>"
}
```

### Response Body (Failed):
```json
{
    "msg": "Username atau password salah"
}
```

---

## Get All Diseases

**Description:**
Menampilkan semua data penyakit yang ada di sistem.

**Authorization:**
Required (Bearer Token)

**Access:**
Admin

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
            "deskripsi": "Infeksi akibat bakteri Neisseria gonorrhoeae.",
            "solusi": "Konsultasi ke dokter spesialis kulit dan kelamin."
        }
    ]
}
```

---

## Add Disease

**Description:**
Menambahkan penyakit baru ke dalam sistem.

**Authorization:**
Required

**Access:**
Admin

### Endpoint: `POST /api/penyakit`

### Request Body:
```json
{
    "kode_penyakit": "P03",
    "nama_penyakit": "Klamidia",
    "deskripsi": "Infeksi menular seksual disebabkan oleh Chlamydia trachomatis.",
    "solusi": "Periksa laboratorium dan konsumsi antibiotik sesuai resep dokter."
}
```

### Response Body (Success):
```json
{
    "msg": "Data penyakit berhasil ditambahkan"
}
```

---

## Update Disease

**Description:**
Mengubah data penyakit berdasarkan ID.

**Authorization:**
Required

**Access:**
Admin

### Endpoint: `PUT /api/penyakit/{id}`

### Request Body:
```json
{
    "nama_penyakit": "Gonore Akut",
    "deskripsi": "Infeksi bakteri tahap lanjut",
    "solusi": "Segera konsultasi ke dokter"
}
```

Response Body (Success):
```json
{
    "msg": "Data penyakit berhasil diperbarui"
}
```

---

## Delete Disease

**Description:**
Menghapus data penyakit berdasarkan ID.

**Authorization:**
Required

**Access:**
Admin

### Endpoint: `DELETE /api/penyakit/{id}`

### Response Body (Success):
```json
{
    "msg": "Data penyakit berhasil dihapus"
}
```

## Get All Symptoms

**Description:**
Menampilkan semua data gejala yang tersimpan.

**Authorization:**
Required

**Access:**
Admin

### Endpoint:  `GET /api/gejala`

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

## Add Symptom

**Description:**
Menambahkan gejala baru.

**Authorization:**
Required

**Access:**
Admin

### Endpoint: `POST /api/gejala`

### Request Body:
```json
{
    "kode_gejala": "G03",
    "nama_gejala": "Rasa gatal di area kelamin"
}
```

### Response Body (Success):
```json
{
    "msg": "Data gejala berhasil ditambahkan"
}
```
---

## Add Rule

**Description:**
Menambahkan rule baru yang menghubungkan penyakit dan gejala.

**Authorization:**
Required

**Access:**
Admin

**Endpoint:**
POST /api/rule

### Request Body:
```json
{
    "id_penyakit": 1,
    "id_gejala": 2,
    "cf_pakar": 0.85
}
```

### Response Body (Success):
```json
{
    "msg": "Rule berhasil ditambahkan"
}
```
---