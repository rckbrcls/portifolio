#!/bin/bash

# Verificar o sistema operacional
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "Sistema Operacional: Linux"
    if [ -n "$WSL_DISTRO_NAME" ]; then
        # WSL
        echo "Terminal: Windows Subsystem for Linux"
        ./scripts/unix/start-project-wsl.sh
    else
        # Terminal nativo do Linux
        echo "Terminal: Terminal nativo do Linux"
        ./scripts/unix/start-project-linux.sh
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "Sistema Operacional: macOS"
    echo "Terminal: Terminal nativo do macOS"
    ./scripts/unix/start-project-macOS.sh
else
    # Outros sistemas operacionais não suportados
    echo "Sistema Operacional não suportado."
fi
