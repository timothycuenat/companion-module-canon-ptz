# companion-module-canon-ptz (fork 15prod)

Fork basé sur [bitfocus/companion-module-canon-ptz](https://github.com/bitfocus/companion-module-canon-ptz).

## Version

`2.5.0+15prod.x` — base upstream `2.5.0`, build metadata `15prod` (ex. `2.5.0+15prod.0.1`).

Mettre à jour **`package.json`** et **`companion/manifest.json`** ensemble.

## OSD (feature `feature/osd`)

- Action **PTZ Other - OSD** : sortie (12G / 3G) + mode (on / off / toggle)
- Variables `osdOut12G`, `osdOut3G`, feedbacks, presets
- Champs avec expressions / variables (style ATEM)
- Migration automatique depuis `osdOn` / `osdOff` / `osdToggle`

## Déploiement dev (Raspberry Pi Companion)

```bash
./deploy-to-pi.sh
```

Module chargé via `/opt/companion-module-dev` — connexion **canon-ptz (Dev)** dans l’admin Companion.

## Doc upstream

Voir [HELP.md](./companion/HELP.md) et [LICENSE](./LICENSE).
