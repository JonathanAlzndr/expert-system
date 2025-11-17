from utils.extensions import db
from models.penyakit import Penyakit

class PenyakitRepository:

    def get_all(self):
        return Penyakit.query.all()

    def get_by_id(self, id_penyakit):
        return Penyakit.query.filter_by(id_penyakit=id_penyakit).first()

    def create(self, data):
        penyakit = Penyakit(
            id_penyakit=data["id_penyakit"],
            nama_penyakit=data["nama_penyakit"],
            deskripsi=data.get("deskripsi"),
            solusi=data.get("solusi")
        )
        db.session.add(penyakit)
        db.session.commit()
        return penyakit

    def update(self, penyakit, data):
        penyakit.nama_penyakit = data["nama_penyakit"]
        penyakit.deskripsi = data.get("deskripsi")
        penyakit.solusi = data.get("solusi")
        db.session.commit()
        return penyakit

    def delete(self, penyakit):
        db.session.delete(penyakit)
        db.session.commit()
