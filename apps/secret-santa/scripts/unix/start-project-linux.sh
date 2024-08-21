# Iniciar o backend em um novo terminal
echo "Iniciando o backend..."
gnome-terminal --working-directory="./backend" -- npm run dev

# Esperar alguns segundos para garantir que o backend tenha iniciado completamente
sleep 5

# Iniciar o frontend em outro novo terminal
echo "Iniciando o frontend..."
gnome-terminal --working-directory="./frontend" -- npm run dev
