# Base image
FROM python:3.10

# Define a pasta de trabalho
WORKDIR /app

# Copia os requisitos do projeto
COPY requirements.txt .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código
COPY . .

# Exponha a porta onde o Flask irá rodar
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["python", "app.py"]