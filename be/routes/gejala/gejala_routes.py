from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.gejala_service import GejalaService

gejala_bp = Blueprint("gejala_bp", __name__)
gejala_service = GejalaService()

@gejala_bp.route("/api/admin/gejala", methods=["GET"])
@jwt_required()
def get_all_gejala():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    return jsonify(gejala_service.get_all_gejala(page, per_page))

@gejala_bp.route("/api/admin/gejala", methods=["POST"])
@jwt_required()
def create_gejala():
    data = request.json
    res, code = gejala_service.create_gejala(data)
    return jsonify(res), code


@gejala_bp.route("/api/admin/gejala/<id_gejala>", methods=["PUT"])
@jwt_required()
def update_gejala(id_gejala):
    data = request.json
    res, code = gejala_service.update_gejala(id_gejala, data)
    return jsonify(res), code


@gejala_bp.route("/api/admin/gejala/<id_gejala>", methods=["DELETE"])
@jwt_required()
def delete_gejala(id_gejala):
    res, code = gejala_service.delete_gejala(id_gejala)
    return jsonify(res), code
