from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from services.rule_service import RuleService

rule_bp = Blueprint("rule_bp", __name__)
rule_service = RuleService()

@rule_bp.route("/api/admin/rules", methods=["GET"])
@jwt_required()
def get_all_rules():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    res, code = rule_service.get_all_rules(page, per_page)
    return jsonify(res), code

@rule_bp.route("/api/admin/rules", methods=["POST"])
@jwt_required()
def create_rule():
    data = request.json
    res, code = rule_service.create_rule(data)
    return jsonify(res), code

@rule_bp.route("/api/admin/rules/<id_ruleset>", methods=["PUT"])
@jwt_required()
def update_rule(id_ruleset):
    data = request.json
    res, code = rule_service.update_rule(id_ruleset, data)
    return jsonify(res), code

@rule_bp.route("/api/admin/rules/<id_ruleset>", methods=["DELETE"])
@jwt_required()
def delete_rule(id_ruleset):
    res, code = rule_service.delete_rule(id_ruleset)
    return jsonify(res), code
