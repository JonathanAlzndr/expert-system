from utils.extensions import db
from datetime import datetime

class Gejala(db.Model):
    __tablename__ = "gejala"

    id_gejala = db.Column(db.String(5), primary_key=True)
    nama_gejala = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    pertanyaan = db.relationship('Pertanyaan', backref='gejala', uselist=False, lazy=True, cascade="all, delete-orphan")
    rules = db.relationship('Rule', backref='gejala', lazy=True, cascade="all, delete-orphan")
    details = db.relationship('DiagnosisDetail', backref='gejala', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Gejala {self.id_gejala} - {self.nama_gejala}>'