#!/bin/bash

# Iniciar o backend em um novo terminal
echo "Iniciando o backend..."
osascript -e 'tell app "Terminal" to do script "cd ./backend && npm run dev"'

# Esperar alguns segundos para garantir que o backend tenha iniciado completamente
sleep 5

# Iniciar o frontend em outro novo terminal
echo "Iniciando o frontend..."
osascript -e 'tell app "Terminal" to do script "cd ./frontend && npm run dev"'
