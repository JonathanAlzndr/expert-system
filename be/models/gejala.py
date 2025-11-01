from utils.extensions import db

class Gejala(db.Model):
    __tablename__ = "gejala"

    id_gejala = db.Column(db.Integer, primary_key=True)
    kode_gejala = db.Column(db.String(10), nullable=False, unique=True)
    nama_gejala = db.Column(db.String(150), nullable=False)

    # Relasi one-to-many: Satu gejala bisa ada di banyak aturan (rule)
    rules = db.relationship("Rule", back_populates="gejala", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Gejala {self.nama_gejala}>'