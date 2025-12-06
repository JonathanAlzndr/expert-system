from collections import defaultdict
import math
from repositories.diagnose_repository import DiagnosisRepository

class DiagnosisService:
    def __init__(self):
        self.repo = DiagnosisRepository()

    def _convert_user_cf(self, cf_user_value):
        """Mengkonversi nilai CF pengguna dari -1.0 s.d 1.0 menjadi teks jawaban."""
        if cf_user_value >= 1.0: return "Pasti Ya"
        if cf_user_value >= 0.8: return "Hampir Pasti Ya"
        if cf_user_value >= 0.6: return "Kemungkinan Besar Ya"
        if cf_user_value >= 0.4: return "Mungkin Ya"
    
        if cf_user_value <= -1.0: return "Pasti Tidak"
        if cf_user_value <= -0.8: return "Hampir Pasti Tidak"
        if cf_user_value <= -0.6: return "Kemungkinan Besar Tidak"
        if cf_user_value <= -0.4: return "Mungkin Tidak"
        # Netral
        return "Tidak Tahu"

    def process_diagnosis(self, user_answers_raw):
        """
        Melakukan perhitungan Forward Chaining & Certainty Factor
        dengan metode Split & Combine (Positif vs Negatif).
        """
        user_facts = {ans['id_gejala']: ans['cf_user'] 
                      for ans in user_answers_raw if ans['cf_user'] != 0}
        
        if not user_facts:
            return {"msg": "Tidak ada gejala yang dipilih (semua netral).", "hasil_utama": None}
        
        all_rule_sets = self.repo.get_all_rules_with_premises()

        cf_per_penyakit = defaultdict(list)
  
        for rule_set in all_rule_sets:
            cf_premis_list = []
            
            for premise in rule_set.premises:
                id_gejala = premise.id_gejala
             
                if id_gejala in user_facts:
                    cf_premis_list.append(user_facts[id_gejala])
                else:
                    cf_premis_list.append(0)

            if cf_premis_list:
                cf_user_combined = min(cf_premis_list)
                
                if cf_user_combined != 0:
                    cf_final_rule = cf_user_combined * rule_set.cf_ruleset
                    cf_per_penyakit[rule_set.id_penyakit].append(cf_final_rule)
        
        final_scores = {}
        
        for id_penyakit, cf_list in cf_per_penyakit.items():
            if not cf_list:
                continue
            
            cf_positif = [x for x in cf_list if x > 0]
            cf_negatif = [x for x in cf_list if x < 0]
            
            cf_gabungan_pos = 0
            if cf_positif:
                cf_gabungan_pos = cf_positif[0]
                for i in range(1, len(cf_positif)):
                    cf_gabungan_pos = cf_gabungan_pos + cf_positif[i] * (1 - cf_gabungan_pos)
            
            cf_gabungan_neg = 0
            if cf_negatif:
                cf_gabungan_neg = cf_negatif[0]
                for i in range(1, len(cf_negatif)):
                    cf_gabungan_neg = cf_gabungan_neg + cf_negatif[i] * (1 + cf_gabungan_neg)
            
            if cf_gabungan_pos > 0 and cf_gabungan_neg < 0:
                min_abs = min(abs(cf_gabungan_pos), abs(cf_gabungan_neg))

                if (1 - min_abs) == 0:
                    cf_final = 0 
                else:
                    cf_final = (cf_gabungan_pos + cf_gabungan_neg) / (1 - min_abs)
            else:
                cf_final = cf_gabungan_pos + cf_gabungan_neg
            
            final_scores[id_penyakit] = cf_final

        if not final_scores:
            return {"msg": "Tidak ada diagnosis yang dapat ditentukan.", "hasil_utama": None}

        hasil_utama_id = max(final_scores, key=final_scores.get)
        cf_tertinggi = final_scores[hasil_utama_id]
        
        sorted_scores = sorted(final_scores.items(), key=lambda item: item[1], reverse=True)

        user_answers_for_save = []
        for ans in user_answers_raw:
            ans['jawaban_text'] = self._convert_user_cf(ans['cf_user'])
            user_answers_for_save.append(ans)
        
        id_diagnosis = self.repo.save_diagnosis(hasil_utama_id, cf_tertinggi, user_answers_for_save)
        hasil_utama_detail = self.repo.get_penyakit_details(hasil_utama_id)
        
        if cf_tertinggi <= 0:
            return {
                "id_diagnosis": id_diagnosis,
                "msg": "Diagnosis Selesai",
                "hasil_utama": {
                    "nama_penyakit": "Tidak Terindikasi Penyakit",
                    "cf_tertinggi": 0,
                    "deskripsi": "Berdasarkan gejala yang Anda masukkan, sistem tidak menemukan indikasi kuat terhadap penyakit menular seksual yang ada dalam database kami.",
                    "solusi": "Tetap jaga kesehatan. Jika keluhan berlanjut, hubungi dokter."
                },
                "analisis_tambahan": []
            }

        output = {
            "id_diagnosis": id_diagnosis,
            "hasil_utama": {
                "id_penyakit": hasil_utama_detail.id_penyakit,
                "nama_penyakit": hasil_utama_detail.nama_penyakit,
                "cf_tertinggi": round(cf_tertinggi, 4), # 4 Desimal
                "deskripsi": hasil_utama_detail.deskripsi,
                "solusi": hasil_utama_detail.solusi,
            },
            "analisis_tambahan": [
                {"id_penyakit": pid, "cf_score": round(cf, 4)} 
                for pid, cf in sorted_scores if pid != hasil_utama_id
            ]
        }
        
        return output

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
    
    def get_all_diagnoses_for_admin(self, page, limit):
        pagination = self.repo.get_all_history(page, limit)
        history_data = pagination.items
        
        result = []

        hari_indo = {
            'Sunday': 'Minggu', 'Monday': 'Senin', 'Tuesday': 'Selasa', 
            'Wednesday': 'Rabu', 'Thursday': 'Kamis', 'Friday': 'Jumat', 'Saturday': 'Sabtu'
        }
        
        bulan_indo = {
            'January': 'Januari', 'February': 'Februari', 'March': 'Maret', 
            'April': 'April', 'May': 'Mei', 'June': 'Juni', 
            'July': 'Juli', 'August': 'Agustus', 'September': 'September', 
            'October': 'Oktober', 'November': 'November', 'December': 'Desember'
        }

        for item in history_data:
            nama_penyakit = item.penyakit_hasil.nama_penyakit if item.penyakit_hasil else "Tidak Teridentifikasi"
            
            dt = item.tanggal_diagnosis
     
            hari_en = dt.strftime('%A')  
            bulan_en = dt.strftime('%B')  
            
            hari_id = hari_indo[hari_en]
            bulan_id = bulan_indo[bulan_en]
            
            tanggal_cantik = f"{hari_id}, {dt.day} {bulan_id} {dt.year} {dt.strftime('%H:%M')}"
            # ----------------------------------------

            result.append({
                "id_diagnosis": item.id_diagnosis,
                "tanggal": tanggal_cantik, # <--- Pakai variabel baru ini
                "nama_penyakit": nama_penyakit,
                "cf_persen": f"{round(item.cf_tertinggi * 100, 1)}%" 
            })
        
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

    def get_diagnosis_detail_for_admin(self, id_diagnosis):
        diagnosis = self.repo.get_by_id(id_diagnosis)
        
        if not diagnosis:
            return None

        list_gejala_user = []
        for detail in diagnosis.details:
            list_gejala_user.append({
                "kode_gejala": detail.id_gejala,
                "nama_gejala": detail.gejala.nama_gejala,
                "jawaban_user": detail.jawaban, 
                "cf_user": detail.cf_pengguna
            })

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
    
    