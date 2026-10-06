# 🏎️ Geburtstags-Einladung

Kleine Einladungs-Webseite: Briefumschlag → Einladung zum Kartfahren.

```sh
bun install
bun run dev      # lokal entwickeln
bun run build    # statischer Build nach dist/
```

Texte, Termine, Ort und optional die WhatsApp-Nummer stehen in `src/config.ts`.

## Deployment (GitHub Pages)

Repo auf GitHub pushen, dann unter **Settings → Pages → Source** „GitHub Actions“ wählen.
Jeder Push auf `main` baut und veröffentlicht die Seite automatisch (`.github/workflows/deploy.yml`).

## Persönliche Links

Mit `?name=` wird die Einladung persönlich, z. B. `https://<user>.github.io/<repo>/?name=Anna`.
Leerzeichen und Umlaute im Link kodieren: `?name=Anna%20Lena`, `?name=J%C3%BCrgen`.
