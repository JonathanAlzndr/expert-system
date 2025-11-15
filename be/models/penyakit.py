from utils.extensions import db
from datetime import datetime
from sqlalchemy import String

class Penyakit(db.Model):
    __tablename__ = "penyakit"

    id_penyakit = db.Column(String(5, collation='utf8mb4_general_ci'), primary_key=True)
    nama_penyakit = db.Column(db.String(100), nullable=False)
    deskripsi = db.Column(db.Text)
    solusi = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relasi: 1 Penyakit bisa menjadi kesimpulan dari BANYAK RuleSet
    rules = db.relationship('RuleSet', backref='penyakit', lazy=True, cascade="all, delete-orphan")
    
    # Relasi: 1 Penyakit bisa menjadi hasil dari BANYAK Diagnosis
    diagnoses = db.relationship('Diagnosis', backref='penyakit_hasil', lazy=True, foreign_keys='Diagnosis.hasil_penyakit')

    def __repr__(self):
        return f'<Penyakit {self.id_penyakit} - {self.nama_penyakit}>'