# companion-module-canon-ptz (fork 15prod)

Fork basé sur [bitfocus/companion-module-canon-ptz](https://github.com/bitfocus/companion-module-canon-ptz).

## Version

`2.5.0+15prod.x` — base upstream `2.5.0`, build metadata `15prod` (ex. `2.5.0+15prod.0.1`).

Mettre à jour **`package.json`** et **`companion/manifest.json`** ensemble.

## API admin/config (jeton Basic dans la config)

Fonctions sans retour d’état caméra — variables = dernière commande réussie.

| Fonction | Action | Body (on / off) |
|----------|--------|-----------------|
| Retournement vertical | **Vertical Flip (Image)** | `da05=1` / `da05=2` |
| Tally | **Tally (admin/config)** | `db09-0=1` / `db09-0=0` |

Base commune : `lg=ja&pt=4&em=2&…` — `Content-Type: text/plain`

## OSD (feature `feature/osd`)

- Action **PTZ Other - OSD** : sortie (12G / 3G) + mode (on / off / toggle)
- Variables `osdOut12G`, `osdOut3G`, feedbacks, presets
- Champs avec expressions / variables (style ATEM)
- Migration automatique depuis `osdOn` / `osdOff` / `osdToggle`

## Déploiement dev (Raspberry Pi Companion)

Module dans `/opt/companion-module-dev` sur le Pi — connexion **canon-ptz (Dev)** dans l’admin Companion. Déploiement via rsync/SSH (script local, non versionné).

## Doc upstream

Voir [HELP.md](./companion/HELP.md) et [LICENSE](./LICENSE).
