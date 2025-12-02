from repositories.penyakit_repository import PenyakitRepository

class PenyakitService:
    def __init__(self):
        self.repo = PenyakitRepository()

    def get_all_penyakit(self):
        data = self.repo.get_all()
        return {
            "msg": "Success",
            "data": [
                {
                    "id_penyakit": p.id_penyakit,
                    "nama_penyakit": p.nama_penyakit,
                    "solusi": p.solusi,
                    "deskripsi": p.deskripsi
                } for p in data
            ]
        }

    def create_penyakit(self, data):
        if self.repo.get_by_id(data["id_penyakit"]):
            return {
                "msg": f"Failed: Penyakit dengan ID {data['id_penyakit']} sudah ada.",
                "error_code": 400
            }, 400

        self.repo.create(data)
        return {
            "msg": "Success: Data penyakit berhasil disimpan."
        }, 201

    def update_penyakit(self, id_penyakit, data):
        penyakit = self.repo.get_by_id(id_penyakit)
        if not penyakit:
            return {
                "msg": f"Failed: Penyakit dengan ID {id_penyakit} tidak ditemukan.",
                "error_code": 404
            }, 404

        self.repo.update(penyakit, data)
        return {
            "msg": "Success: Data penyakit berhasil diupdate."
        }, 200

    def delete_penyakit(self, id_penyakit):
        penyakit = self.repo.get_by_id(id_penyakit)
        if not penyakit:
            return {
                "msg": f"Failed: Penyakit dengan ID {id_penyakit} tidak ditemukan.",
                "error_code": 404
            }, 404

        self.repo.delete(penyakit)
        return {
            "msg": "Success: Data penyakit berhasil dihapus."
        }, 200

