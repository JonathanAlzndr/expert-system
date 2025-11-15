from utils.extensions import db
from datetime import datetime
from sqlalchemy import String

class Gejala(db.Model):
    __tablename__ = "gejala"

    id_gejala = db.Column(String(5, collation='utf8mb4_general_ci'), primary_key=True)
    nama_gejala = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    pertanyaan = db.relationship('Pertanyaan', backref='gejala', uselist=False, lazy=True, cascade="all, delete-orphan")
    
    premises = db.relationship('RulePremise', backref='gejala', lazy=True, cascade="all, delete-orphan")
    
    details = db.relationship('DiagnosisDetail', backref='gejala', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Gejala {self.id_gejala} - {self.nama_gejala}>'