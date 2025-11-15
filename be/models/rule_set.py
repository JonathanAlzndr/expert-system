from utils.extensions import db
from datetime import datetime
from sqlalchemy import String

class RuleSet(db.Model):
    __tablename__ = "rule_set"

    id_ruleset = db.Column(String(5, collation='utf8mb4_general_ci'), primary_key=True)
    id_penyakit = db.Column(
        String(5, collation='utf8mb4_general_ci'), 
        db.ForeignKey('penyakit.id_penyakit', ondelete='CASCADE', onupdate='CASCADE'), 
        nullable=False
    )
    
    cf_ruleset = db.Column(db.Float(precision=2), nullable=False)
    
    premises = db.relationship('RulePremise', backref='rule_set', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<RuleSet {self.id_ruleset} -> {self.id_penyakit}>'