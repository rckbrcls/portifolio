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

# Rodar o primeiro projeto em background
run_project_webpack "./apps/alan-turing"

# Rodar o segundo projeto em background
run_project_webpack "./apps/lojinha-simples"

# Rodar o terceiro projeto em background
run_project "./apps/portifolio"

# Esperar que todos os processos terminem
wait

echo "Todos os projetos foram iniciados com sucesso."