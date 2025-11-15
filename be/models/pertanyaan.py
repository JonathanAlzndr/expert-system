from utils.extensions import db
from datetime import datetime
from sqlalchemy import String

class Pertanyaan(db.Model):
    __tablename__ = "pertanyaan"

    id_pertanyaan = db.Column(db.Integer, primary_key=True)
    id_gejala = db.Column(
        String(5, collation='utf8mb4_general_ci'), 
        db.ForeignKey('gejala.id_gejala', ondelete='CASCADE', onupdate='CASCADE'), 
        nullable=False, 
        unique=True
    )
    teks_pertanyaan = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Pertanyaan {self.id_pertanyaan}>'