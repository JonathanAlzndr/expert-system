from flask import Blueprint, request, jsonify
from services.penyakit_service import PenyakitService
from flask_jwt_extended import jwt_required

penyakit_bp = Blueprint("penyakit_bp", __name__)
penyakit_service = PenyakitService()

@penyakit_bp.route("/api/penyakit", methods=["GET"])
def get_all_penyakit():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    return jsonify(penyakit_service.get_all_penyakit(page, per_page))

@penyakit_bp.route("/api/penyakit", methods=["POST"])
@jwt_required()
def create_penyakit():
    data = request.json
    res, code = penyakit_service.create_penyakit(data)
    return jsonify(res), code

@penyakit_bp.route("/api/penyakit/<id_penyakit>", methods=["PUT"])
@jwt_required()
def update_penyakit(id_penyakit):
    data = request.json
    res, code = penyakit_service.update_penyakit(id_penyakit, data)
    return jsonify(res), code

@penyakit_bp.route("/api/penyakit/<id_penyakit>", methods=["DELETE"])
@jwt_required()
def delete_penyakit(id_penyakit):
    res, code = penyakit_service.delete_penyakit(id_penyakit)
    return jsonify(res), code
