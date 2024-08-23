from flask import Blueprint, request, jsonify
from psycopg2.extras import RealDictCursor
from app.db import get_db_connection

doacao_bp = Blueprint('doacao_bp', __name__)


@doacao_bp.route('/doacao', methods=['GET'])
def get_doacoes():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''
        SELECT *,  
        (
            SELECT row_to_json(p)
            FROM candidato c
            JOIN pessoa p ON c.pessoa_id = p.id
            WHERE doacao.candidato_id = c.id
        ) AS candidato 
        FROM doacao'''
                )
    doacoes = cur.fetchall()
    cur.close()
    return jsonify(doacoes), 200


@doacao_bp.route('/doacao/<int:id>', methods=['DELETE'])
def delete_doacao(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM doacao WHERE id = %s', (id,))
    conn.commit()
    cur.close()
    return jsonify({"message": "Doação deleted successfully!"}), 200
