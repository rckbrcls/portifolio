#!/bin/bash

# Função para rodar um projeto em uma nova janela do terminal
run_project() {
  local project_path=$1
  echo "Rodando o projeto em $project_path..."
  osascript -e "tell application \"Terminal\" to do script \"cd $(pwd)/$project_path && pnpm run dev\""
}

run_project_webpack() {
  local project_path=$1
  echo "Rodando o projeto em $project_path..."
  osascript -e "tell application \"Terminal\" to do script \"cd $(pwd)/$project_path && pnpm run webpack-dev\""
}

echo "Starting the project: alan-turing"
run_project_webpack "./apps/alan-turing"

echo "Starting the project: lojinha-simples"
run_project_webpack "./apps/lojinha-simples"

echo "Starting the project: secret-santa-client"
run_project_webpack "./apps/secret-santa-client"

echo "Starting the project: portifolio"
run_project "./apps/portifolio"

echo "Todos os projetos foram iniciados com sucesso."