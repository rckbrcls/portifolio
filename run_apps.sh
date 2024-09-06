#!/bin/bash

# Função para rodar um projeto em background
run_project() {
  local project_path=$1
  echo "Rodando o projeto em $project_path..."
  (cd "$project_path" && pnpm run dev) &
}

echo "Starting the project: alan-turing"
run_project "./apps/alan-turing"

echo "Starting the project: lojinha-simples"
run_project "./apps/lojinha-simples"

echo "Starting the project: secret-santa-client"
run_project "./apps/secret-santa-client"

echo "Starting the project: joystick"
run_project "./apps/joystick-client"

echo "Starting the project: video-project-manage"
run_project "./apps/video-project-manage"

echo "Starting the project: electoral-system"
run_project "./apps/electoral-system-client"

echo "Starting the project: "
run_project "./apps/main"

# Esperar que todos os processos terminem
wait

echo "Todos os projetos foram iniciados com sucesso."