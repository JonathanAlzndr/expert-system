from utils.extensions import db
from models.gejala import Gejala
from models.pertanyaan import Pertanyaan

class GejalaRepository:
    def get_all(self):
        return Gejala.query.all()

    def get_by_id(self, id_gejala):
        return Gejala.query.filter_by(id_gejala=id_gejala).first()

    def create(self, data):
        gejala = Gejala(
            id_gejala=data["id_gejala"],
            nama_gejala=data["nama_gejala"]
        )
        db.session.add(gejala)
        db.session.flush() 

        pertanyaan = Pertanyaan(
            id_gejala=gejala.id_gejala,
            teks_pertanyaan=data["teks_pertanyaan"]
        )
        db.session.add(pertanyaan)
        db.session.commit()

    def update(self, gejala, data):
        gejala.nama_gejala = data["nama_gejala"]

        if gejala.pertanyaan:
            gejala.pertanyaan.teks_pertanyaan = data["teks_pertanyaan"]

        db.session.commit()

    def delete(self, gejala):
        db.session.delete(gejala)
        db.session.commit()
