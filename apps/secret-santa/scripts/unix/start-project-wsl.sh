# Iniciar o backend em um novo terminal do Windows
echo "Iniciando o backend..."
cmd.exe /c start cmd.exe /K "cd ./backend && npm run dev"

# Esperar alguns segundos para garantir que o backend tenha iniciado completamente
sleep 5

# Iniciar o frontend em outro novo terminal do Windows
echo "Iniciando o frontend..."
cmd.exe /c start cmd.exe /K "cd ./frontend && npm run dev"
