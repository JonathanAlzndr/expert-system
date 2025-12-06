from flask import Flask
from config import Config
from utils.extensions import db, bcrypt, jwt, migrate
from routes.auth.auth_routes import auth_bp
from routes.diagnose_route import diagnosis_bp
from models.admin import Admin
from models.penyakit import Penyakit
from models.gejala import Gejala
from models.pertanyaan import Pertanyaan
from flask import jsonify
from models.rule_set import RuleSet
from models.rule_premise import RulePremise
from routes.penyakit.penyakit_routes import penyakit_bp
from models.diagnosis import Diagnosis
from models.diagnosis_detail import DiagnosisDetail
from routes.gejala.gejala_routes import gejala_bp
from routes.rule.rule_routes import rule_bp
from routes.diagnosis.admin_diagnose import admin_diagnosis_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, 
     resources={r"/api/*": {"origins": "http://localhost:5173"}},
     supports_credentials=True)

    bcrypt.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)


    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return jsonify(msg="Unauthorized: Token tidak ditemukan"), 401

    @jwt.expired_token_loader
    def expired_callback(jwt_header, jwt_payload):
         return jsonify(msg="Token expired"), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify(msg="Unauthorized: Token invalid"), 422

    app.register_blueprint(auth_bp)
    app.register_blueprint(rule_bp)
    app.register_blueprint(penyakit_bp)
    app.register_blueprint(diagnosis_bp)
    app.register_blueprint(gejala_bp)
    app.register_blueprint(admin_diagnosis_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)