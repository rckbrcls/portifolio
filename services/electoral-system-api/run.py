from app import create_app

app = create_app()

if __name__ == '__main__':
    # Bind em 0.0.0.0 para aceitar conexões dentro do container
    app.run(host='0.0.0.0', port=5000, debug=True)
