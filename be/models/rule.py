from utils.extensions import db
from datetime import datetime

class Rule(db.Model):
    __tablename__ = "rule"

    id_rule = db.Column(db.String(5), primary_key=True)
    id_penyakit = db.Column(db.String(5), db.ForeignKey('penyakit.id_penyakit', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    id_gejala = db.Column(db.String(5), db.ForeignKey('gejala.id_gejala', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    cf_rule = db.Column(db.Float(precision=2), nullable=False) 
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    __table_args__ = (
        db.UniqueConstraint('id_penyakit', 'id_gejala', name='unique_penyakit_gejala'),
    )

    def __repr__(self):
        return f'<Rule {self.id_rule} (CF: {self.cf_rule})>'