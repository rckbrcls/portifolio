from flask import Blueprint, request, jsonify
from psycopg2.extras import RealDictCursor
from app.db import get_db_connection

processo_judicial_bp = Blueprint('processo_judicial_bp', __name__)


@processo_judicial_bp.route('/processo_judicial', methods=['GET'])
def get_processos_judiciais():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''
        SELECT *,
            (
                SELECT row_to_json(p)
                FROM candidato c
                JOIN pessoa p ON c.pessoa_id = p.id
                WHERE processo_judicial.candidato_id = c.id
            ) AS candidato
        FROM processo_judicial
        ''')
    processos_judiciais = cur.fetchall()
    cur.close()
    return jsonify(processos_judiciais), 200


@processo_judicial_bp.route('/processo_judicial/<int:id>', methods=['DELETE'])
def delete_processo_judicial(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM processo_judicial WHERE id = %s', (id,))
    conn.commit()
    cur.close()
    return jsonify({"message": "Processo Judicial deleted successfully!"}), 200
