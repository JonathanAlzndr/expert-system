from utils.extensions import db
from datetime import datetime

class Diagnosis(db.Model):
    __tablename__ = "diagnosis"

    id_diagnosis = db.Column(db.Integer, primary_key=True)
    tanggal_diagnosis = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    hasil_penyakit = db.Column(db.String(5), db.ForeignKey('penyakit.id_penyakit', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False)
    cf_tertinggi = db.Column(db.Float(precision=2), nullable=False)
    details = db.relationship('DiagnosisDetail', backref='diagnosis', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Diagnosis {self.id_diagnosis} - Result: {self.hasil_penyakit}>'