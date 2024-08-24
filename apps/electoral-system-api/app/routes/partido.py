from flask import Blueprint, request, jsonify
from psycopg2.extras import RealDictCursor
from app.db import get_db_connection
from app.routes.candidato import delete_candidato

partido_bp = Blueprint('partido_bp', __name__)


@partido_bp.route('/partido', methods=['GET'])
def get_partidos():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM partido')
    partidos = cur.fetchall()
    cur.close()
    return jsonify(partidos), 200


@partido_bp.route('/partido/<int:id>', methods=['DELETE'])
def delete_partido(id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute('SELECT id FROM candidato WHERE partido_id = %s', (id,))
    candidatos = cur.fetchall()
    for candidato in candidatos:
        delete_candidato(candidato[0])

    cur.execute('DELETE FROM partido WHERE id = %s', (id,))

    conn.commit()
    cur.close()
    return jsonify({"message": "Partido deleted successfully!"}), 200
