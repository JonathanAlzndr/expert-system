from utils.extensions import db

class Rule(db.Model):
    __tablename__ = "rule"

    id_rule = db.Column(db.Integer, primary_key=True)
    
    id_penyakit = db.Column(db.Integer, db.ForeignKey('penyakit.id_penyakit'), nullable=False)
    id_gejala = db.Column(db.Integer, db.ForeignKey('gejala.id_gejala'), nullable=False)
    
    cf_pakar = db.Column(db.Float, nullable=False)
    keterangan_rule = db.Column(db.Text, nullable=True)

    penyakit = db.relationship("Penyakit", back_populates="rules")
    
    gejala = db.relationship("Gejala", back_populates="rules")

    def __repr__(self):
        return f'<Rule {self.id_rule} (P:{self.id_penyakit} G:{self.id_gejala})>'