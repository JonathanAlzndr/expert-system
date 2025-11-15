from utils.extensions import db
from datetime import datetime
from sqlalchemy import String

class RulePremise(db.Model):
    __tablename__ = "rule_premise"

    id_premise = db.Column(db.Integer, primary_key=True)
    id_ruleset = db.Column(
        String(5, collation='utf8mb4_general_ci'), 
        db.ForeignKey('rule_set.id_ruleset', ondelete='CASCADE', onupdate='CASCADE'), 
        nullable=False
    )
    id_gejala = db.Column(
        String(5, collation='utf8mb4_general_ci'), 
        db.ForeignKey('gejala.id_gejala', ondelete='CASCADE', onupdate='CASCADE'), 
        nullable=False
    )
    __table_args__ = (
        db.UniqueConstraint('id_ruleset', 'id_gejala', name='unique_rule_premise'),
    )
    
    def __repr__(self):
        return f'<RulePremise {self.id_ruleset} needs {self.id_gejala}>'