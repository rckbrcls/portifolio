from flask import Blueprint, request, jsonify
from psycopg2.extras import RealDictCursor
from app.db import get_db_connection

doador_bp = Blueprint('doador_bp', __name__)


@doador_bp.route('/doador', methods=['GET'])
def get_doadores():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM doador')
    doadores = cur.fetchall()
    cur.close()
    return jsonify(doadores), 200


@doador_bp.route('/doador/<int:id>', methods=['DELETE'])
def delete_doador(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM doador WHERE id = %s', (id,))
    conn.commit()
    cur.close()
    return jsonify({"message": "Doador deleted successfully!"}), 200
