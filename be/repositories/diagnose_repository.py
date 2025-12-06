from utils.extensions import db
from models.diagnosis import Diagnosis
from models.diagnosis_detail import DiagnosisDetail
from models.rule_set import RuleSet 
from models.penyakit import Penyakit
from sqlalchemy.orm import joinedload
from models.gejala import Gejala
from models.pertanyaan import Pertanyaan
from sqlalchemy import desc


class DiagnosisRepository:

    def get_all_rules_with_premises(self):
        return RuleSet.query.options(joinedload(RuleSet.premises)).all()
    
    def get_penyakit_details(self, id_penyakit):
        return Penyakit.query.filter_by(id_penyakit=id_penyakit).first()

    def save_diagnosis(self, hasil_penyakit_id, cf_tertinggi, user_answers):
        """Menyimpan hasil diagnosis dan detail jawaban pengguna."""
        
        try:
            # 1. Simpan Diagnosis Utama
            new_diagnosis = Diagnosis(
                hasil_penyakit=hasil_penyakit_id,
                cf_tertinggi=cf_tertinggi
            )
            db.session.add(new_diagnosis)
            db.session.flush() # Mendapatkan id_diagnosis yang baru

            # 2. Simpan Diagnosis Detail (SEMUA JAWABAN)
            details_list = []
            for answer in user_answers:
                # PERBAIKAN: Hapus filter 'if > 0'. 
                # Simpan semua jawaban termasuk yang Negatif atau 0 agar history lengkap.
                
                detail = DiagnosisDetail(
                    id_diagnosis=new_diagnosis.id_diagnosis,
                    id_gejala=answer['id_gejala'],
                    jawaban=answer['jawaban_text'], 
                    cf_pengguna=answer['cf_user']
                )
                details_list.append(detail)
            
            db.session.add_all(details_list)
            db.session.commit()

            return new_diagnosis.id_diagnosis
        
        except Exception as e:
            db.session.rollback()
            print(f"Error saving diagnosis: {e}")
            raise e
        
    def get_all_questions(self):
        return Pertanyaan.query.join(Gejala).all()
    
    def get_all_history(self, page, limit):
        return Diagnosis.query.order_by(desc(Diagnosis.tanggal_diagnosis)).paginate(page=page, per_page=limit, error_out=False)

    
    def get_by_id(self, id_diagnosis):
        return Diagnosis.query.filter_by(id_diagnosis=id_diagnosis).first()