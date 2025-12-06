from utils.extensions import db
from models.rule_set import RuleSet
from models.rule_premise import RulePremise

class RuleRepository:
    def get_all(self):
        return RuleSet.query.all()

    def get_by_id(self, id_ruleset):
        return RuleSet.query.filter_by(id_ruleset=id_ruleset).first()

    def _generate_id(self):
        """Membuat ID Ruleset baru secara otomatis (R01, R02, ...)."""
        # Ambil semua rule, urutkan descending
        rules = RuleSet.query.order_by(RuleSet.id_ruleset.desc()).all()
        
        last_num = 0
        for rule in rules:
            try:
                # Coba ambil angka dari ID (misal R10 -> 10)
                # Menggunakan filter agar hanya mengambil digit
                num_part = ''.join(filter(str.isdigit, rule.id_ruleset))
                current_num = int(num_part)
                
                # Cari angka terbesar yang pernah ada
                if current_num > last_num:
                    last_num = current_num
            except ValueError:
                continue # Skip jika ID aneh (misal R15A) dan tidak bisa diparsing
        
        new_num = last_num + 1
        
        # Format jadi R01, R02 ... R10, R11
        return f"R{new_num:02d}"

    def create(self, data):
        new_id = self._generate_id()

        ruleset = RuleSet(
            id_ruleset=new_id,
            id_penyakit=data["id_penyakit"],
            cf_ruleset=data["cf_ruleset"],
        )
        db.session.add(ruleset)
        db.session.flush()

        for gejala in data["premises"]:
            premise = RulePremise(
                id_ruleset=new_id,
                id_gejala=gejala
            )
            db.session.add(premise)

        db.session.commit()
        return ruleset

    def update(self, ruleset, data):
        if "id_penyakit" in data:
            ruleset.id_penyakit = data["id_penyakit"]

        if "cf_ruleset" in data:
            ruleset.cf_ruleset = data["cf_ruleset"]

        if "premises" in data:
            RulePremise.query.filter_by(id_ruleset=ruleset.id_ruleset).delete()
            for g in data["premises"]:
                db.session.add(
                    RulePremise(id_ruleset=ruleset.id_ruleset, id_gejala=g)
                )

        db.session.commit()
        return ruleset

    def delete(self, ruleset):
        RulePremise.query.filter_by(id_ruleset=ruleset.id_ruleset).delete()
        db.session.delete(ruleset)
        db.session.commit()
