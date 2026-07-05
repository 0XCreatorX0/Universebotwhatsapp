#!/data/data/com.termux/files/usr/bin/bash
cd ~/Universebotwhatsapp
termux-wake-lock
tmux new-session -d -s bot 'node src/index.js'
echo "✅ Bot iniciado en segundo plano"
echo "👉 Ver logs: tmux attach -t bot"
echo "👉 Detener: tmux kill-session -t bot"
 
