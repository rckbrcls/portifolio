import psycopg2
from flask import g

DB_HOST = "localhost"
DB_NAME = "electoralsystem"
DB_USER = "brcls"
DB_PASS = "286723"


# Função para conectar ao banco de dados PostgresSQL
def get_db_connection():
    if 'db_conn' not in g:
        g.db_conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASS
        )
    return g.db_conn
