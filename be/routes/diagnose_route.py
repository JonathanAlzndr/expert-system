from flask import Blueprint, request, jsonify, url_for
from flask_jwt_extended import jwt_required
from utils.extensions import db
from services.diagnose_service import DiagnosisService

diagnosis_bp = Blueprint('diagnosis', __name__, url_prefix='/api/diagnosis')
diagnosis_service = DiagnosisService()

@diagnosis_bp.route('/', methods=['POST'])
def submit_diagnosis():    
    data = request.get_json()
    
    if not data or 'answers' not in data:
        return jsonify({"msg": "Failed: Data answers diperlukan."}), 400

    user_answers_raw = data['answers']

    if not all('id_gejala' in ans and 'cf_user' in ans for ans in user_answers_raw):
         return jsonify({"msg": "Failed: Format answers tidak valid (membutuhkan id_gejala dan cf_user)."}), 400

    try:
        result = diagnosis_service.process_diagnosis(user_answers_raw)
        
        if result.get("hasil_utama"):
            return jsonify({
                "msg": "Diagnosis Complete",
                "id_diagnosis": result['id_diagnosis'],
                "hasil_utama": result['hasil_utama'],
                "analisis_tambahan": result['analisis_tambahan']
            }), 200
        else:
             return jsonify(result), 200
             
    except Exception as e:
        print(f"Error during diagnosis process: {e}")
        db.session.rollback()
        return jsonify({"msg": "Failed: Terjadi kesalahan server saat memproses diagnosis."}), 500

@diagnosis_bp.route("/pertanyaan", methods=["GET"])
def get_questions():
    data = diagnosis_service.get_all_questions()
    return jsonify(data), 200