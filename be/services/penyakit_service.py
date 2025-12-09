from repositories.penyakit_repository import PenyakitRepository
import math 

class PenyakitService:
    def __init__(self):
        self.repo = PenyakitRepository()

    def get_all_penyakit(self, page=1, per_page=10):
        
        all_data = self.repo.get_all()
        
        
        total_data = len(all_data)
        total_pages = math.ceil(total_data / per_page)
        
        
        if page > total_pages and total_data > 0:
            page = total_pages
            
        start = (page - 1) * per_page
        end = start + per_page
        
        paginated_data = all_data[start:end]

        
        formatted_data = [
            {
                "id_penyakit": p.id_penyakit,
                "nama_penyakit": p.nama_penyakit,
                "deskripsi": p.deskripsi,
                "solusi": p.solusi
            } for p in paginated_data
        ]

        
        return {
            "msg": "Success",
            "data": formatted_data,
            "meta": {
                "page": page,
                "per_page": per_page,
                "total_data": total_data,
                "total_pages": total_pages
            }
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

