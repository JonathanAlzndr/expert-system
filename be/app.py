from flask import Flask
from config import Config
from utils.extensions import db, bcrypt, jwt, migrate
from routes.auth.auth_routes import auth_bp
from routes.diagnose_route import diagnosis_bp
from models.admin import Admin
from models.penyakit import Penyakit
from models.gejala import Gejala
from models.pertanyaan import Pertanyaan

from models.rule_set import RuleSet
from models.rule_premise import RulePremise

from models.diagnosis import Diagnosis
from models.diagnosis_detail import DiagnosisDetail

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    bcrypt.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(diagnosis_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)