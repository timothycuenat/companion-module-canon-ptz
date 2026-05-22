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

## Digital Zoom (feature `feature/digital-zoom`)

- Action **PTZ Other - Digital Zoom** (une seule action, champs dynamiques) :
  - **Mode zoom** : vide (inchangé), `off`, `dzoom` (300x), `mag` (Digital Tele-Converter), `toggle` (off → dzoom → mag)
  - **Magnification** : vide ou `100` / `150` / `300` / `600` (1.0x – 6.0x, utile en mode `mag`)
- Commandes `control.cgi` : `zoom.mode=…`, `zoom.mag=…`
- Variables `digitalZoom`, `digitalZoomLabel`, `digitalZoomMag`, `digitalZoomMagLabel`
- Migration depuis `bol`, ancien `mode` on/off/toggle, feedbacks `option` 0/1

## White Balance CC (feature `feature/whitebalance-cc`)

- **CC Value Up / Down** : pas de ±1 (-20 … +20)
- **Set CC Value** : liste ou champ variable/expression
- Variables `kelvinCcValue`, `kelvinCcLabel`
- **PTZ (CR-N\*)** : `control.cgi?wb.kelvin.cc=<valeur>`
- **Autres (CR-X, XF-605, C300/C500/C70, Other)** : `control.cgi?c.1.wb.kelvin.cc=<valeur>`

## Camera Record (feature `feature/camera-rec`)

Protocole Canon XC — **cinéma uniquement** (XF-605, C300/C500/C70, série Other).  
Les PTZ CR-N **n’ont pas** `f.rec` dans la spec XC.

| Commande | Effet |
|----------|--------|
| `control.cgi?f.rec=on` | Démarrer l’enregistrement |
| `control.cgi?f.rec=off` | Arrêter |
| Poll `info.cgi` → `f.rec.status` | `idle` ou `rec` |

- Action **Camera - Record** : start / stop / toggle (dynamique)
- Variables `recordStatus`, `recordStatusLabel`
- Feedback + preset **Record Toggle**

## Save Settings

- Action **PTZ Other - Save Settings** : `control.cgi?s.action=save` (GET)
- Succès si HTTP **200** et ligne `s.action=save` dans le corps de la réponse
- Feedback **Other - Save Settings OK** : vert / texte « OK » pendant **2 s**, puis retour à l’état normal du bouton
- Preset bouton **Save Settings** (catégorie Other)

## Déploiement dev (Raspberry Pi Companion)

Module dans `/opt/companion-module-dev` sur le Pi — connexion **canon-ptz (Dev)** dans l’admin Companion. Déploiement via rsync/SSH (script local, non versionné).

## Doc upstream

Voir [HELP.md](./companion/HELP.md) et [LICENSE](./LICENSE).
