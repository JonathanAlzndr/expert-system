from repositories.gejala_repository import GejalaRepository

class GejalaService:
    def __init__(self):
        self.repo = GejalaRepository()

    def get_all_gejala(self):
        data = self.repo.get_all()
        return {
            "msg": "Success",
            "data": [
                {
                    "id_gejala": g.id_gejala,
                    "nama_gejala": g.nama_gejala,
                    "teks_pertanyaan": g.pertanyaan.teks_pertanyaan if g.pertanyaan else None
                }
                for g in data
            ]
        }

    def create_gejala(self, data):
        if self.repo.get_by_id(data["id_gejala"]):
            return {
                "msg": f"Failed: Gejala dengan ID {data['id_gejala']} sudah ada.",
                "error_code": 400
            }, 400

        self.repo.create(data)
        return {"msg": "Success: Gejala dan pertanyaan berhasil disimpan."}, 201

    def update_gejala(self, id_gejala, data):
        gejala = self.repo.get_by_id(id_gejala)
        if not gejala:
            return {
                "msg": f"Failed: Gejala dengan ID {id_gejala} tidak ditemukan.",
                "error_code": 404
            }, 404

        self.repo.update(gejala, data)
        return {"msg": "Success: Gejala dan pertanyaan berhasil diperbarui."}, 200

    def delete_gejala(self, id_gejala):
        gejala = self.repo.get_by_id(id_gejala)
        if not gejala:
            return {
                "msg": f"Failed: Gejala dengan ID {id_gejala} tidak ditemukan.",
                "error_code": 404
            }, 404

        self.repo.delete(gejala)
        return {"msg": "Success: Gejala dan pertanyaan berhasil dihapus."}, 200
