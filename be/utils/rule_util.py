from models.rule_set import RuleSet

def generate_new_id(self):
    last = RuleSet.query.order_by(RuleSet.id_ruleset.desc()).first()

    if not last:
        return "R01"

    last_num = int(last.id_ruleset[1:])  
    new_num = last_num + 1
    return f"R{new_num:02d}"
