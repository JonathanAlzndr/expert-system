from flask import Blueprint, jsonify, request
from services.diagnose_service import DiagnosisService
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin

admin_diagnosis_bp = Blueprint('admin_diagnosis', __name__, url_prefix='/api/admin/diagnosis')
diagnosis_service = DiagnosisService()

@admin_diagnosis_bp.route('/', methods=['GET', 'OPTIONS'], strict_slashes=False)
@cross_origin()
def get_all_history():
    # PRE-FLIGHT OPTIONS → JANGAN CEK JWT
    if request.method == 'OPTIONS':
        return '', 200

    # GET → CEK JWT
    return get_all_history_protected()


@jwt_required()
def get_all_history_protected():
    try:
        data = diagnosis_service.get_all_diagnoses_for_admin()
        return jsonify({
            "status": True,
            "msg": "Berhasil mengambil data riwayat",
            "data": data
        }), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": False, "msg": "Terjadi kesalahan server"}), 500


# ======================================
# GET DETAIL HISTORY (ADMIN)
# ======================================
@admin_diagnosis_bp.route('/<int:id_diagnosis>', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_detail_history(id_diagnosis):
    if request.method == 'OPTIONS':
        return '', 200

    return get_detail_history_protected(id_diagnosis)


@jwt_required()
def get_detail_history_protected(id_diagnosis):
    try:
        data = diagnosis_service.get_diagnosis_detail_for_admin(id_diagnosis)
        
        if not data:
            return jsonify({"status": False, "msg": "Data diagnosis tidak ditemukan"}), 404
        
        return jsonify({
            "status": True,
            "msg": "Berhasil mengambil detail diagnosis",
            "data": data
        }), 200
    except Exception as e:
        print(f"Error Detail: {e}")
        return jsonify({"status": False, "msg": "Terjadi kesalahan server"}), 500
