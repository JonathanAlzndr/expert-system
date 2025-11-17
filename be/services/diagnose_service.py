from collections import defaultdict
import math
from repositories.diagnose_repository import DiagnosisRepository

class DiagnosisService:
    def __init__(self):
        self.repo = DiagnosisRepository()

    def _combine_cf(self, cf1, cf2):
        if cf1 >= 0 and cf2 >= 0:
            return cf1 + cf2 * (1 - cf1)
        elif cf1 <= 0 and cf2 <= 0:
            return cf1 + cf2 * (1 + cf1)
        else:
            return (cf1 + cf2) / (1 - min(abs(cf1), abs(cf2)))
        
    def _convert_user_cf(self, cf_user_value):
        if cf_user_value == 1.0: return "Pasti Ya"
        if cf_user_value >= 0.8: return "Sangat Yakin"
        if cf_user_value >= 0.6: return "Yakin"
        if cf_user_value >= 0.4: return "Cukup Yakin"
        if cf_user_value >= 0.2: return "Tidak Yakin"
        return "Tidak Ada Gejala"
    
    def process_diagnosis(self, user_answers_raw, min_confidence=0.2, accept_negative_cf=False):
        if accept_negative_cf:
            user_facts = {ans['id_gejala']: float(ans['cf_user']) for ans in user_answers_raw}
        else:
            user_facts = {ans['id_gejala']: float(ans['cf_user']) for ans in user_answers_raw if float(ans['cf_user']) > 0}

        if not user_facts:
            return {"msg": "Tidak ada gejala yang dipilih.", "hasil_utama": None}

        all_rule_sets = self.repo.get_all_rules_with_premises()

        cf_per_penyakit = defaultdict(list)

        for rule_set in all_rule_sets:
            premis_terpenuhi = True
            cf_premis_list = []

            for premise in rule_set.premises:
                id_gejala_required = premise.id_gejala
                if id_gejala_required in user_facts:
                    cf_premis_list.append(user_facts[id_gejala_required])
                else:
                    premis_terpenuhi = False
                    break

            if not premis_terpenuhi:
                continue

            if not cf_premis_list:
                continue

            cf_user_combined = min(cf_premis_list)
            cf_final_rule = cf_user_combined * float(rule_set.cf_ruleset)


            if abs(cf_final_rule) < 1e-12:
                continue

            cf_per_penyakit[rule_set.id_penyakit].append(cf_final_rule)

        final_scores = {}
        for id_penyakit, cf_list in cf_per_penyakit.items():
            if not cf_list:
                continue

            cf_list.sort(reverse=True)

            cf_gabungan = cf_list[0]
            for i in range(1, len(cf_list)):
                cf_gabungan = self._combine_cf(cf_gabungan, cf_list[i])

            if cf_gabungan >= min_confidence or cf_gabungan <= -min_confidence:
                final_scores[id_penyakit] = cf_gabungan

        if not final_scores:
            return {"msg": "Tidak ada diagnosis yang dapat ditentukan.", "hasil_utama": None}

        hasil_utama_id = max(final_scores, key=final_scores.get)
        cf_tertinggi = final_scores[hasil_utama_id]
        sorted_scores = sorted(final_scores.items(), key=lambda item: item[1], reverse=True)

        user_answers_for_save = []
        for ans in user_answers_raw:
            ans_copy = ans.copy()
            ans_copy['jawaban_text'] = self._convert_user_cf(float(ans_copy.get('cf_user', 0.0)))
            user_answers_for_save.append(ans_copy)
        id_diagnosis = self.repo.save_diagnosis(hasil_utama_id, cf_tertinggi, user_answers_for_save)
        hasil_utama_detail = self.repo.get_penyakit_details(hasil_utama_id)

        if not hasil_utama_detail:
            hasil_data = {"id_penyakit": hasil_utama_id, "nama_penyakit": None, "cf_tertinggi": round(cf_tertinggi, 3)}
        else:
            hasil_data = {
                "id_penyakit": hasil_utama_detail.id_penyakit,
                "nama_penyakit": hasil_utama_detail.nama_penyakit,
                "cf_tertinggi": round(cf_tertinggi, 3),
                "deskripsi": hasil_utama_detail.deskripsi,
                "solusi": hasil_utama_detail.solusi,
            }

        output = {
            "id_diagnosis": id_diagnosis,
            "hasil_utama": hasil_data,
            "analisis_tambahan": [
                {"id_penyakit": pid, "cf_score": round(cf, 3)}
                for pid, cf in sorted_scores if pid != hasil_utama_id
            ]
        }

        return output
    
    def get_all_questions(self):
        questions = self.repo.get_all_questions()

        result = []
        for q in questions:
            result.append({
                "id_pertanyaan": q.id_pertanyaan,
                "id_gejala": q.id_gejala,
                "teks_pertanyaan": q.teks_pertanyaan
            })
        return {
            "msg": "Success",
            "pertanyaanList": result
        }

        