from flask import Blueprint, request, jsonify
from psycopg2.extras import RealDictCursor
from app.db import get_db_connection
from flask_cors import cross_origin

candidato_bp = Blueprint('candidato_bp', __name__)


@candidato_bp.route('/candidato', methods=['GET'])
@cross_origin()
def get_candidatos():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''
       SELECT
            c.id,
            c.pessoa_id,
            c.partido_id,
            c.cargo_id,
            c.data_candidatura,
            c.vice_candidato_id,
            c.eleito,
            (
                SELECT row_to_json(p)
                FROM pessoa p
                WHERE c.pessoa_id = p.id
            ) AS pessoa,
            (
                SELECT row_to_json(partido)
                FROM partido
                WHERE c.partido_id = partido.id
            ) AS partido,
            (
                SELECT row_to_json(cargo)
                FROM cargo
                WHERE c.cargo_id = cargo.id
            ) AS cargo,
            (
                SELECT row_to_json(vp)
                FROM candidato vc
                LEFT JOIN pessoa vp ON vc.pessoa_id = vp.id
                WHERE c.vice_candidato_id = vc.id
            ) AS vice_candidato,
            (
                SELECT row_to_json(equipe_apoio)
                FROM equipe_apoio
                WHERE c.id = equipe_apoio.candidato_id
            ) AS equipe_apoio,
            (
                 SELECT json_agg(
                    row_to_json(p)
                )
                FROM participante_equipe pe
                JOIN pessoa p ON pe.pessoa_id = p.id
                JOIN equipe_apoio e ON pe.equipe_apoio_id = e.id
                WHERE e.candidato_id = c.id
            ) AS participantes_equipe,
            (
                SELECT row_to_json(pleito)
                FROM pleito
                WHERE c.id = pleito.candidato_id
            ) AS pleito,
            (
                SELECT json_agg(row_to_json(d))
                FROM doacao d
                WHERE c.id = d.candidato_id
            ) AS doacoes,
            (
                SELECT json_agg(row_to_json(pr))
                FROM processo_judicial pr
                WHERE c.id = pr.candidato_id
            ) AS processos_judiciais
        FROM
            candidato c;
    ''')
    candidatos = cur.fetchall()
    cur.close()
    return jsonify(candidatos), 200


@candidato_bp.route('/candidato/<int:id>', methods=['DELETE'])
def delete_candidato(id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute('SELECT vice_candidato_id FROM candidato WHERE id = %s', (id,))
    vice_candidato_id = cur.fetchone()[0]

    cur.execute('UPDATE candidato SET vice_candidato_id = NULL WHERE vice_candidato_id = %s', (id,))

    cur.execute(
        'DELETE FROM participante_equipe WHERE equipe_apoio_id IN (SELECT id FROM equipe_apoio WHERE candidato_id = %s)',
        (id,))
    cur.execute('DELETE FROM equipe_apoio WHERE candidato_id = %s', (id,))
    cur.execute('DELETE FROM pleito WHERE candidato_id = %s', (id,))
    cur.execute('DELETE FROM doacao WHERE candidato_id = %s', (id,))
    cur.execute('DELETE FROM processo_judicial WHERE candidato_id = %s', (id,))

    cur.execute('DELETE FROM candidato WHERE id = %s', (id,))

    if vice_candidato_id:
        delete_candidato(vice_candidato_id)

    cur.execute('DELETE FROM candidato WHERE id = %s', (id,))
    conn.commit()
    cur.close()
    return jsonify({"message": "Candidato deleted successfully!"}), 200
