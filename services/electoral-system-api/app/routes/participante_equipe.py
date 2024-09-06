from flask import Blueprint, request, jsonify
from psycopg2.extras import RealDictCursor
from app.db import get_db_connection

participante_equipe_bp = Blueprint('participante_equipe_bp', __name__)


@participante_equipe_bp.route('/participante_equipe', methods=['GET'])
def get_participantes_equipe():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM participante_equipe')
    participantes_equipe = cur.fetchall()
    cur.close()
    return jsonify(participantes_equipe), 200


@participante_equipe_bp.route('/participante_equipe/<int:id>', methods=['DELETE'])
def delete_participante_equipe(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM participante_equipe WHERE id = %s', (id,))
    conn.commit()
    cur.close()
    return jsonify({"message": "Participante da Equipe deleted successfully!"}), 200
