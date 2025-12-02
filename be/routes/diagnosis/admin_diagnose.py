from flask import Blueprint, jsonify
from services.diagnose_service import DiagnosisService
from flask_jwt_extended import jwt_required

admin_diagnosis_bp = Blueprint('admin_diagnosis', __name__, url_prefix='/api/admin/diagnosis')
diagnosis_service = DiagnosisService()

@admin_diagnosis_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_history():
    """
    GET /api/admin/diagnosis
    Mengambil semua riwayat diagnosis untuk tabel dashboard.
    """
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

@admin_diagnosis_bp.route('/<int:id_diagnosis>', methods=['GET'])
@jwt_required()
def get_detail_history(id_diagnosis):
    """
    GET /api/admin/diagnosis/5
    Mengambil detail lengkap satu sesi diagnosis.
    """
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