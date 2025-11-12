from utils.extensions import db
from datetime import datetime

class Penyakit(db.Model):
    __tablename__ = "penyakit"

    id_penyakit = db.Column(db.String(5), primary_key=True)
    nama_penyakit = db.Column(db.String(100), nullable=False)
    deskripsi = db.Column(db.Text)
    solusi = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    rules = db.relationship('Rule', backref='penyakit', lazy=True, cascade="all, delete-orphan")
    diagnoses = db.relationship('Diagnosis', backref='penyakit_hasil', lazy=True, foreign_keys='Diagnosis.hasil_penyakit')

    def __repr__(self):
        return f'<Penyakit {self.id_penyakit} - {self.nama_penyakit}>'