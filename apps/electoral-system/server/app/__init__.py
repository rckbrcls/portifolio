import sys
import os
from flask import Flask


# Adiciona o caminho da pasta raiz ao sys.path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from .db import get_db_connection
from .routes.partido import partido_bp
from .routes.cargo import cargo_bp
from .routes.pessoa import pessoa_bp
from .routes.candidato import candidato_bp
from .routes.processo_judicial import processo_judicial_bp
from .routes.equipe_apoio import equipe_apoio_bp
from .routes.participante_equipe import participante_equipe_bp
from .routes.doador import doador_bp
from .routes.doacao import doacao_bp
from .routes.pleito import pleito_bp
from .routes.bd_functions import bd_functions_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    cors = CORS(app, support_credentials=True, origins='*')
    app.config['CORS_HEADERS'] = 'Content-Type'

    # Registro dos Blueprints para todas as tabelas
    app.register_blueprint(partido_bp)
    app.register_blueprint(cargo_bp)
    app.register_blueprint(pessoa_bp)
    app.register_blueprint(candidato_bp)
    app.register_blueprint(processo_judicial_bp)
    app.register_blueprint(equipe_apoio_bp)
    app.register_blueprint(participante_equipe_bp)
    app.register_blueprint(doador_bp)
    app.register_blueprint(doacao_bp)
    app.register_blueprint(pleito_bp)
    app.register_blueprint(bd_functions_bp)

    return app
