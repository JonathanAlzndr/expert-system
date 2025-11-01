from utils.extensions import db
from datetime import datetime

class Admin(db.Model):
    __tablename__ = "admin"

    id_admin = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Admin {self.username}>'