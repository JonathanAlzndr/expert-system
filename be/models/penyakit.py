from utils.extensions import db

class Penyakit(db.Model):
    __tablename__ = "penyakit"

    id_penyakit = db.Column(db.Integer, primary_key=True)
    kode_penyakit = db.Column(db.String(10), nullable=False, unique=True)
    nama_penyakit = db.Column(db.String(100), nullable=False)
    deskripsi = db.Column(db.Text, nullable=True)
    solusi = db.Column(db.Text, nullable=True)

    # Relasi one-to-many: Satu penyakit bisa memiliki banyak aturan (rule)
    # cascade="all, delete-orphan" akan menghapus rules terkait jika penyakit dihapus
    rules = db.relationship("Rule", back_populates="penyakit", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Penyakit {self.nama_penyakit}>'