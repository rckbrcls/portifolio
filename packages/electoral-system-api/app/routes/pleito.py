from flask import Blueprint, request, jsonify
from psycopg2.extras import RealDictCursor
from app.db import get_db_connection

pleito_bp = Blueprint('pleito_bp', __name__)


@pleito_bp.route('/pleito', methods=['GET'])
def get_pleitos():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM pleito')
    pleitos = cur.fetchall()
    cur.close()
    return jsonify(pleitos), 200


@pleito_bp.route('/pleito/<int:id>', methods=['DELETE'])
def delete_pleito(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM pleito WHERE id = %s', (id,))
    conn.commit()
    cur.close()
    return jsonify({"message": "Pleito deleted successfully!"}), 200
