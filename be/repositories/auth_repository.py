from utils.extensions import db
from models.admin import Admin

def get_user_by_username(username):
    return Admin.query.filter(Admin.username==username).first()

def create_user(username, password_hash):
    user = Admin(username=username, password=password_hash)
    db.session.add(user)
    db.session.commit()
    return user