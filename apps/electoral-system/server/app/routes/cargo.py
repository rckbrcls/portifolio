from flask import Blueprint, request, jsonify
from psycopg2.extras import RealDictCursor
from app.db import get_db_connection
from app.routes.candidato import delete_candidato
from app.routes.pleito import delete_pleito

cargo_bp = Blueprint('cargo_bp', __name__)


@cargo_bp.route('/cargo', methods=['GET'])
def get_cargos():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM cargo')
    cargos = cur.fetchall()
    cur.close()
    return jsonify(cargos), 200


@cargo_bp.route('/cargo/<int:id>', methods=['DELETE'])
def delete_cargo(id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute('SELECT id FROM candidato WHERE cargo_id = %s', (id,))
    candidatos = cur.fetchall()
    for candidato in candidatos:
        delete_candidato(candidato[0])

    cur.execute('SELECT id FROM pleito WHERE cargo_id = %s', (id,))
    pleitos = cur.fetchall()
    for pleito in pleitos:
        delete_pleito(pleito[0])

    # Deletar o cargo
    cur.execute('DELETE FROM cargo WHERE id = %s', (id,))

    conn.commit()
    cur.close()
    return jsonify({"message": "Cargo deleted successfully!"}), 200
