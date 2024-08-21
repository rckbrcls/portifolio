# Iniciar o backend em um novo terminal
Write-Host "Iniciando o backend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd './backend'; npm run dev"

# Esperar alguns segundos para garantir que o backend tenha iniciado completamente
Start-Sleep -Seconds 5

# Iniciar o frontend em outro novo terminal
Write-Host "Iniciando o frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd './frontend'; npm run dev"
