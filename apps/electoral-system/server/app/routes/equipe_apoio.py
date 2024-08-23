from flask import Blueprint, request, jsonify
from psycopg2.extras import RealDictCursor
from app.db import get_db_connection
from app.routes.participante_equipe import delete_participante_equipe

equipe_apoio_bp = Blueprint('equipe_apoio_bp', __name__)


@equipe_apoio_bp.route('/equipe_apoio', methods=['GET'])
def get_equipes_apoio():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''
        SELECT *, 
        (
            SELECT row_to_json(p)
            FROM candidato c
            JOIN pessoa p ON c.pessoa_id = p.id
            WHERE equipe_apoio.candidato_id = c.id
        ) AS candidato 
        FROM equipe_apoio
    ''')
    equipes_apoio = cur.fetchall()
    cur.close()
    return jsonify(equipes_apoio), 200


@equipe_apoio_bp.route('/equipe_apoio/<int:id>', methods=['DELETE'])
def delete_equipe_apoio(id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute('SELECT id FROM participante_equipe WHERE equipe_apoio_id = %s', (id,))
    participantes = cur.fetchall()
    for participante in participantes:
        delete_participante_equipe(participante[0])

    cur.execute('DELETE FROM equipe_apoio WHERE id = %s', (id,))

    conn.commit()
    cur.close()
    return jsonify({"message": "Equipe de Apoio deleted successfully!"}), 200
