from collections import defaultdict
import math
from repositories.diagnose_repository import DiagnosisRepository

class DiagnosisService:
    def __init__(self):
        self.repo = DiagnosisRepository()

    def _convert_user_cf(self, cf_user_value):
        """Mengkonversi nilai CF pengguna dari -1.0 s.d 1.0 menjadi teks jawaban."""
        # Positif
        if cf_user_value >= 1.0: return "Pasti Ya"
        if cf_user_value >= 0.8: return "Hampir Pasti Ya"
        if cf_user_value >= 0.6: return "Kemungkinan Besar Ya"
        if cf_user_value >= 0.4: return "Mungkin Ya"
        # Negatif
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
        
        # 1. Ambil Fakta User (Termasuk nilai negatif, KECUALI 0)
        user_facts = {ans['id_gejala']: ans['cf_user'] 
                      for ans in user_answers_raw if ans['cf_user'] != 0}
        
        if not user_facts:
            return {"msg": "Tidak ada gejala yang dipilih (semua netral).", "hasil_utama": None}
        
        # 2. Ambil Rules dari DB
        all_rule_sets = self.repo.get_all_rules_with_premises()

        # Dictionary untuk menampung list hasil CF per penyakit
        cf_per_penyakit = defaultdict(list)
        
        # 3. Forward Chaining (Evaluasi Rule)
        for rule_set in all_rule_sets:
            cf_premis_list = []
            
            for premise in rule_set.premises:
                id_gejala = premise.id_gejala
                
                # Cek fakta user
                if id_gejala in user_facts:
                    cf_premis_list.append(user_facts[id_gejala])
                else:
                    # Jika user tidak jawab/netral, anggap 0.
                    cf_premis_list.append(0)

            # Hitung CF Rule (Min * Pakar)
            if cf_premis_list:
                # Ambil nilai Minimum dari premis (Logika AND)
                cf_user_combined = min(cf_premis_list)
                
                # Jika min-nya 0, rule netral -> skip
                if cf_user_combined != 0:
                    cf_final_rule = cf_user_combined * rule_set.cf_ruleset
                    cf_per_penyakit[rule_set.id_penyakit].append(cf_final_rule)
        
        # 4. Kombinasi CF (LOGIKA SPLIT POSITIF/NEGATIF)
        final_scores = {}
        
        for id_penyakit, cf_list in cf_per_penyakit.items():
            if not cf_list:
                continue
            
            # Pisahkan nilai Positif dan Negatif
            cf_positif = [x for x in cf_list if x > 0]
            cf_negatif = [x for x in cf_list if x < 0]
            
            # A. Hitung Total Positif (CF Combine Standard)
            cf_gabungan_pos = 0
            if cf_positif:
                cf_gabungan_pos = cf_positif[0]
                for i in range(1, len(cf_positif)):
                    cf_gabungan_pos = cf_gabungan_pos + cf_positif[i] * (1 - cf_gabungan_pos)
            
            # B. Hitung Total Negatif (CF Combine Negatif)
            cf_gabungan_neg = 0
            if cf_negatif:
                cf_gabungan_neg = cf_negatif[0]
                for i in range(1, len(cf_negatif)):
                    cf_gabungan_neg = cf_gabungan_neg + cf_negatif[i] * (1 + cf_gabungan_neg)
            
            # C. Hitung Konflik (Jika ada Positif DAN Negatif)
            if cf_gabungan_pos > 0 and cf_gabungan_neg < 0:
                min_abs = min(abs(cf_gabungan_pos), abs(cf_gabungan_neg))
                
                # Hindari pembagian dengan nol
                if (1 - min_abs) == 0:
                    cf_final = 0 
                else:
                    cf_final = (cf_gabungan_pos + cf_gabungan_neg) / (1 - min_abs)
            else:
                # Jika hanya positif saja ATAU negatif saja
                cf_final = cf_gabungan_pos + cf_gabungan_neg
            
            final_scores[id_penyakit] = cf_final

        # 5. Tentukan Hasil Akhir
        if not final_scores:
            return {"msg": "Tidak ada diagnosis yang dapat ditentukan.", "hasil_utama": None}

        hasil_utama_id = max(final_scores, key=final_scores.get)
        cf_tertinggi = final_scores[hasil_utama_id]
        
        sorted_scores = sorted(final_scores.items(), key=lambda item: item[1], reverse=True)

        # 6. Simpan ke Database
        user_answers_for_save = []
        for ans in user_answers_raw:
            ans['jawaban_text'] = self._convert_user_cf(ans['cf_user'])
            user_answers_for_save.append(ans)
        
        id_diagnosis = self.repo.save_diagnosis(hasil_utama_id, cf_tertinggi, user_answers_for_save)
        hasil_utama_detail = self.repo.get_penyakit_details(hasil_utama_id)
        
        # 7. Return Logic (FIXED)
        
        # KASUS A: Hasil Negatif / Tidak Terindikasi
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

        # KASUS B: Hasil Positif (Penyakit Ditemukan)
        # Kode ini hanya berjalan jika cf_tertinggi > 0
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
        # 1. Get raw objects from Repo
        questions = self.repo.get_all_questions()
        
        # 2. Convert to List of Dictionaries
        output = []
        for q in questions:
            output.append({
                # IMPORTANT: Check your Pertanyaan model for exact column names!
                'id_pertanyaan': q.id_pertanyaan,                # or q.id_pertanyaan
                'id_gejala': q.id_gejala,
                'teks_pertanyaan': q.teks_pertanyaan  # if you need the symptom ID
            })
            
        return output