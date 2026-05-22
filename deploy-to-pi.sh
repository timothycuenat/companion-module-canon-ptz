#!/usr/bin/env bash
# Déploie le module dev sur le Pi Companion (15prod).
set -euo pipefail

PI_HOST="${PI_HOST:-pi@192.168.10.101}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_ed25519_15prodcompanion}"
MODULE_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE_TMP="/tmp/companion-module-canon-ptz-deploy"
REMOTE_DEST="/opt/companion-module-dev/companion-module-canon-ptz"

rsync -avz --delete --exclude '.git' \
	-e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new" \
	"${MODULE_DIR}/" "${PI_HOST}:${REMOTE_TMP}/"

ssh -i "${SSH_KEY}" "${PI_HOST}" "
	sudo rm -rf ${REMOTE_DEST} &&
	sudo mv ${REMOTE_TMP} ${REMOTE_DEST} &&
	sudo chown -R companion:companion ${REMOTE_DEST} &&
	sudo systemctl restart companion
"

echo "Déployé. Admin: http://192.168.10.101:8000 — module canon-ptz (Dev)"
