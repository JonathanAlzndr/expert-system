from utils.extensions import db
from models.rule_set import RuleSet
from models.rule_premise import RulePremise

class RuleRepository:
    def get_all(self):
        return RuleSet.query.all()

    def get_by_id(self, id_ruleset):
        return RuleSet.query.filter_by(id_ruleset=id_ruleset).first()

    def _generate_id(self):
        last_rule = RuleSet.query.order_by(RuleSet.id_ruleset.desc()).first()
        if not last_rule:
            return "RS01"

        last_num = int(last_rule.id_ruleset[2:])
        new_num = last_num + 1
        return f"RS{new_num:02d}"

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
