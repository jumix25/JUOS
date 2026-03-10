# JUOS Website (Single-File HTML)

A modern JUOS website concept delivered as a **fully self-contained HTML file** (`index.html`).

Features:
- Glass-texture visual design
- Pattern lock and PIN lock unlock flows
- Retro mode (90s style)
- German (DE) and US English language support
- "Next Gen" AI card (secure integration placeholder)
- Smooth animations

## Run locally

```bash
python3 -m http.server 4173
```

Open http://localhost:4173

## Demo unlock values

- Pattern: `1-2-3-6`
- PIN: `1990`

## Security note

Do **not** hardcode API keys in source code. Pass credentials securely via environment variables and a backend proxy.
