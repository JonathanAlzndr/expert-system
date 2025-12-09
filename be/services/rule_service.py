from repositories.rule_repository import RuleRepository
from repositories.penyakit_repository import PenyakitRepository
from repositories.gejala_repository import GejalaRepository
import math 

class RuleService:
    def __init__(self):
        self.repo = RuleRepository()
        self.penyakit_repo = PenyakitRepository()
        self.gejala_repo = GejalaRepository()

    def validate_payload(self, data, is_update=False):
        if not is_update:
            required = ["id_penyakit", "cf_ruleset", "premises"]
            missing = [field for field in required if field not in data]
            if missing:
                return f"Field berikut wajib diisi: {', '.join(missing)}"

        if "id_penyakit" in data:
            if not self.penyakit_repo.get_by_id(data["id_penyakit"]):
                return f"Penyakit dengan ID {data['id_penyakit']} tidak ditemukan."

        if "cf_ruleset" in data:
            try:
                cf = float(data["cf_ruleset"])
            except ValueError:
                return "cf_ruleset harus berupa angka."
            if cf < 0 or cf > 1:
                return "cf_ruleset harus berada dalam rentang 0–1."

        if "premises" in data:
            if not isinstance(data["premises"], list):
                return "premises harus berupa array/list."
            if len(data["premises"]) == 0:
                return "Minimal harus ada 1 gejala dalam premises."

            invalid = [g for g in data["premises"] if not self.gejala_repo.get_by_id(g)]
            if invalid:
                return f"ID gejala berikut tidak ditemukan: {', '.join(invalid)}"

        return None

    def create_rule(self, data):
        error = self.validate_payload(data, is_update=False)
        if error:
            return {"msg": f"Failed: {error}"}, 400

        created = self.repo.create(data)
        return {"msg": "Success: RuleSet berhasil ditambahkan.", "id_ruleset": created.id_ruleset}, 201

    def update_rule(self, id_ruleset, data):
        rule = self.repo.get_by_id(id_ruleset)
        if not rule:
            return {"msg": f"Failed: RuleSet dengan ID {id_ruleset} tidak ditemukan."}, 404

        error = self.validate_payload(data, is_update=True)
        if error:
            return {"msg": f"Failed: {error}"}, 400

        self.repo.update(rule, data)
        return {"msg": "Success: RuleSet berhasil diperbarui."}, 200

    def delete_rule(self, id_ruleset):
        rule = self.repo.get_by_id(id_ruleset)
        if not rule:
            return {"msg": f"Failed: RuleSet dengan ID {id_ruleset} tidak ditemukan."}, 404

        self.repo.delete(rule)
        return {"msg": "Success: RuleSet berhasil dihapus."}, 200

    def get_all_rules(self, page=1, per_page=10):
        rules = self.repo.get_all()
        
        # Hitung Pagination
        total_data = len(rules)
        total_pages = math.ceil(total_data / per_page)
        
        start = (page - 1) * per_page
        end = start + per_page
        
        paginated_rules = rules[start:end]
        
        data = []
        for r in paginated_rules:
            data.append({
                "id_ruleset": r.id_ruleset,
                "id_penyakit": r.id_penyakit,
                "cf_ruleset": r.cf_ruleset,
                "premises": [p.id_gejala for p in r.premises]
            })
            
        return {
            "msg": "Success", 
            "data": data,
            "meta": {
                "page": page,
                "per_page": per_page,
                "total_data": total_data,
                "total_pages": total_pages
            }
        }, 200
