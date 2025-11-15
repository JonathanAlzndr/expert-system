from utils.extensions import db
from models.diagnosis import Diagnosis
from models.diagnosis_detail import DiagnosisDetail
from models.rule_set import RuleSet 
from models.penyakit import Penyakit
from sqlalchemy.orm import joinedload

class DiagnosisRepository:

    def get_all_rules_with_premises(self):
        return RuleSet.query.options(joinedload(RuleSet.premises)).all()
    
    def get_penyakit_details(self, id_penyakit):
        return Penyakit.query.filter_by(id_penyakit=id_penyakit).first()

    def save_diagnosis(self, hasil_penyakit_id, cf_tertinggi, user_answers):
        
        try:
            new_diagnosis = Diagnosis(
                hasil_penyakit=hasil_penyakit_id,
                cf_tertinggi=cf_tertinggi
            )
            db.session.add(new_diagnosis)
            db.session.flush() 
            details_list = []
            for answer in user_answers:
                if answer['cf_user'] > 0:
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