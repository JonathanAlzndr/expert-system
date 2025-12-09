from collections import defaultdict
import math
from repositories.diagnose_repository import DiagnosisRepository
from datetime import datetime 
import pytz

class DiagnosisService:
    def __init__(self):
        self.repo = DiagnosisRepository()

    from datetime import datetime # Pastikan ini atau 'from datetime import datetime' sudah ada di file service Anda

    def process_diagnosis(self, user_answers_raw):
    
        # --- MODIFIKASI WAKTU: Konversi dari UTC ke WITA ---
        # 1. Ambil waktu UTC (naive)
        utc_dt_naive = datetime.utcnow()
        
        # 2. Localize sebagai UTC (aware)
        utc_dt_aware = utc_dt_naive.replace(tzinfo=pytz.utc) 
        
        # 3. Konversi ke WITA (Asia/Makassar)
        wita_tz = pytz.timezone('Asia/Makassar')
        waktu_diagnosis = utc_dt_aware.astimezone(wita_tz) 
        
        # -----------------------------------------------------------------------
        
        cf_disease = {}

        # User CF numerik
        user_cf = {ans["id_gejala"]: float(ans["cf_user"]) for ans in user_answers_raw}

        # Ambil semua rule lengkap dengan premises
        rule_list = self.repo.get_all_rules_with_premises()

        for rule in rule_list:
            premise_cfs = [user_cf.get(p.id_gejala, 0) for p in rule.premises]

            # Abaikan rule jika ada gejala yang tidak dijawab
            if any(cf == 0 for cf in premise_cfs):
                continue

            combined_cf_user = min(premise_cfs)
            final_cf = combined_cf_user * rule.cf_ruleset

            pid = rule.id_penyakit
            if pid not in cf_disease:
                cf_disease[pid] = final_cf
            else:
                old = cf_disease[pid]
                if final_cf >= 0 and old >= 0:
                    cf_disease[pid] = old + final_cf * (1 - old)
                else:
                    cf_disease[pid] = (old + final_cf) / (1 - min(abs(old), abs(final_cf)))

        if not cf_disease:
            return {"msg": "Tidak ada rule yang terpenuhi", "hasil": None}

        sorted_scores = sorted(cf_disease.items(), key=lambda x: x[1], reverse=True)
        hasil_utama_id, cf_tertinggi = sorted_scores[0]
        hasil_utama_detail = self.repo.get_penyakit_details(hasil_utama_id)

        # Simpan semua jawaban pengguna termasuk yang 0
        user_answers_for_save = []
        for ans in user_answers_raw:
            cf_value = float(ans['cf_user'])
            
            # --- MENGUBAH KEY 'cf_user' MENJADI 'cf_pengguna' ---
            user_answers_for_save.append({
                "id_gejala": ans['id_gejala'],
                "cf_pengguna": cf_value, # KEY yang diharapkan Repository/Model
                "jawaban_text": str(cf_value), 
            })

        # Tambahkan parameter tanggal_diagnosis (menggunakan waktu WITA yang sudah dikonversi)
        id_diagnosis = self.repo.save_diagnosis(
            hasil_utama_id,
            cf_tertinggi,
            user_answers_for_save,
            tanggal_diagnosis=waktu_diagnosis 
        )

        output = {
            "id_diagnosis": id_diagnosis,
            # Output waktu WITA dalam format ISO (termasuk offset +08:00)
            "tanggal_diagnosis": waktu_diagnosis.isoformat(), 
            "hasil_utama": {
                "id_penyakit": hasil_utama_detail.id_penyakit,
                "nama_penyakit": hasil_utama_detail.nama_penyakit,
                "cf_tertinggi": round(cf_tertinggi, 4),
                "deskripsi": hasil_utama_detail.deskripsi,
                "solusi": hasil_utama_detail.solusi,
            },
            "analisis_tambahan": [
                {"id_penyakit": pid, "cf_score": round(cf, 4)}
                for pid, cf in sorted_scores if pid != hasil_utama_id
            ],
            "msg": "Diagnosis Complete"
        }

        return output
        
    def get_all_diagnoses_for_admin(self, page, limit):
        pagination = self.repo.get_all_history(page, limit)
        history_data = pagination.items
        
        result = []

        for item in history_data:
            
            utc_dt = item.tanggal_diagnosis.replace(tzinfo=pytz.utc)
            wita_tz = pytz.timezone('Asia/Makassar')
            wita_dt = utc_dt.astimezone(wita_tz)
            
            tanggal = wita_dt.strftime("%d-%m-%Y %H:%M:%S")
            
            
            nama_penyakit = item.penyakit_hasil.nama_penyakit if item.penyakit_hasil else "Tidak Teridentifikasi"
            
            result.append({
                "id_diagnosis": item.id_diagnosis,
                "tanggal": tanggal,
                "nama_penyakit": nama_penyakit,
                "cf_persen": f"{round(item.cf_tertinggi * 100, 1)}%" 
            })

            print(result)
        
        return {
            "data": result,
            "meta": {
                "page": page,
                "limit": limit,
                "totalItems": pagination.total,
                "totalPages": pagination.pages,
                "hasNextPage": pagination.has_next,
                "hasPrevPage": pagination.has_prev
            }
        }

    def get_all_questions(self):
        questions = self.repo.get_all_questions()
        
        output = []
        for q in questions:
            output.append({
                'id_pertanyaan': q.id_pertanyaan,                
                'id_gejala': q.id_gejala,
                'teks_pertanyaan': q.teks_pertanyaan  
            })
            
        return output

    def get_diagnosis_detail_for_admin(self, id_diagnosis):
        diagnosis = self.repo.get_by_id(id_diagnosis)
        
        if not diagnosis:
            return None

        list_gejala_user = []
        for detail in diagnosis.details:
            # Asumsi relasi ke model Gejala adalah 'gejala'
            # Asumsi kolom di DiagnosisDetail adalah 'jawaban_text'
            
            # --- PERBAIKAN DI SINI ---
            # Mengambil nama gejala melalui relasi 'gejala'
            nama_gejala_user = detail.gejala.nama_gejala if detail.gejala else "Unknown" 
            
            # Mengambil jawaban text pengguna
            jawaban_user_text = detail.jawaban if hasattr(detail, 'jawaban') else detail.jawaban_text # Cek field yang benar
            
            list_gejala_user.append({
                "kode_gejala": detail.id_gejala,
                "nama_gejala": nama_gejala_user, # Menggunakan relasi
                "jawaban_user": jawaban_user_text, # Menggunakan kolom jawaban yang benar
                "cf_user": detail.cf_pengguna
            })

        # Asumsi relasi ke model Penyakit adalah 'penyakit_hasil'
        nama_penyakit = diagnosis.penyakit_hasil.nama_penyakit if diagnosis.penyakit_hasil else "Unknown"
        solusi = diagnosis.penyakit_hasil.solusi if diagnosis.penyakit_hasil else "-"

        response_data = {
            "info_diagnosis": {
                "id_diagnosis": diagnosis.id_diagnosis,
                "tanggal": diagnosis.tanggal_diagnosis.strftime('%d-%m-%Y %H:%M'),
                "hasil_penyakit": nama_penyakit,
                "cf_nilai": round(diagnosis.cf_tertinggi, 4),
                "cf_persen": f"{round(diagnosis.cf_tertinggi * 100, 2)}%",
                "solusi": solusi
            },
            "detail_jawaban": list_gejala_user
        }

        return response_data

    