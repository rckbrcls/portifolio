from flask import Blueprint, jsonify

root_bp = Blueprint('root_bp', __name__)


@root_bp.route('/', methods=['GET'])
def index():
    return jsonify({"title": "Electoral System API", "message": "API do sistema eleitoral"}), 200
