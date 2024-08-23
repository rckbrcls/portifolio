#!/bin/bash

# Função para rodar um projeto em background
run_project() {
  local project_path=$1
  echo "Rodando o projeto em $project_path..."
  (cd "$project_path" && pnpm run dev) &
}

run_project_webpack() {
  local project_path=$1
  echo "Rodando o projeto em $project_path..."
  (cd "$project_path" && pnpm run webpack-dev) &
}

echo "Starting the project: alan-turing"
run_project_webpack "./apps/alan-turing"

echo "Starting the project: lojinha-simples"
run_project_webpack "./apps/lojinha-simples"

echo "Starting the project: secret-santa-client"
run_project_webpack "./apps/secret-santa-client"

echo "Starting the project: joystick"
run_project_webpack "./apps/joystick-client"

echo "Starting the project: "
run_project "./apps/portifolio"

# Esperar que todos os processos terminem
wait

echo "Todos os projetos foram iniciados com sucesso."