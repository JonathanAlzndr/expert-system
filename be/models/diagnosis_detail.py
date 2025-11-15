from utils.extensions import db
from datetime import datetime
from sqlalchemy import String

class DiagnosisDetail(db.Model):
    __tablename__ = "diagnosis_detail"

    id_diagnosis_detail = db.Column(db.Integer, primary_key=True)
    id_diagnosis = db.Column(db.Integer, db.ForeignKey('diagnosis.id_diagnosis', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    
    id_gejala = db.Column(
        String(5, collation='utf8mb4_general_ci'), 
        db.ForeignKey('gejala.id_gejala', ondelete='RESTRICT', onupdate='CASCADE'), 
        nullable=False
    )
    jawaban = db.Column(db.String(50), nullable=False)
    cf_pengguna = db.Column(db.Float(precision=2), nullable=False)

    def __repr__(self):
        return f'<Detail {self.id_diagnosis_detail} - Gejala {self.id_gejala}>'