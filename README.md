# Akuru

WhatsApp bot built on Baileys. Pair your number once, then deploy anywhere that runs Node.js 20+.

Problems? Open an issue: https://github.com/engineermarcus/akuru/issues

## 1. Pair (do this first)

1. Open **http://209.159.148.190:3000**
2. Enter your WhatsApp number with country code, no `+` (e.g. `254712345678`).
3. In WhatsApp go to **Settings → Linked Devices → Link a Device → Link with phone number** and enter the code shown.
4. WhatsApp sends you your **session ID** (32 characters). Copy it.

## 2. Configure `settings.js`

Open `settings.js` and fill in the first two values:

```js
export const session = process.env.SESSION || "PASTE_SESSION_ID_HERE";
export const phone = process.env.PHONE || "254712345678";
export const prefix = process.env.PREFIX || "%";
```

Other options in the same file (`antiDelete`, `antiViewOnce`, `autoViewStatus`, `autoReactStatus`, `previewPort`) can be changed there too.

Every value can also be set as an environment variable (`SESSION`, `PHONE`, `PREFIX`, `ANTI_DELETE`, `ANTI_VIEW_ONCE`, `AUTO_VIEW_STATUS`, `AUTO_REACT_STATUS`, `PREVIEW_PORT`). Platforms like Heroku, Render and Hugging Face use these, so you don't commit your session ID to a public fork.

Run only **one** instance per session. A second one disconnects the first (code 440).

## 3. Deploy

### Termux (Android)
Install Termux from F-Droid, not the Play Store.
```bash
pkg update -y && pkg install -y nodejs-lts git nano
git clone https://github.com/engineermarcus/akuru && cd akuru
npm install
nano settings.js      # set session and phone, then Ctrl+O, Enter, Ctrl+X
termux-wake-lock && npm start
```

### Ubuntu / any VPS
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs git
git clone https://github.com/engineermarcus/akuru && cd akuru
npm install
nano settings.js      # set session and phone
sudo npm i -g pm2 && pm2 start npm --name akuru -- start && pm2 save && pm2 startup
```
Check it with `pm2 logs akuru`. You should see `All systems online`.

### Heroku
Heroku has no free tier, so you need a paid worker dyno.
1. Fork this repo.
2. Create an app, then **Deploy → GitHub** and connect your fork.
3. **Settings → Config Vars**: add `SESSION` and `PHONE`.
4. **Resources**: enable the `worker` dyno (from the `Procfile`).

### Render
Use a **Background Worker** (paid).
1. New → Background Worker → connect your fork.
2. Build command `npm install`, start command `npm start`.
3. Add `SESSION` and `PHONE` under Environment.

### Hugging Face Spaces
1. Create a Space with the **Docker** SDK.
2. Push the repo files to the Space (the repo includes the `Dockerfile`).
3. Add these lines at the very top of the **Space's** `README.md`:
```
---
title: akuru
sdk: docker
app_port: 7860
---
```
4. **Settings → Variables and secrets**: add `SESSION` and `PHONE` as secrets.
Free Spaces may sleep when idle.

### Other platforms
Anything that runs Node 20+ and git works: `npm install`, edit `settings.js` (or set the env vars), then `npm start`.

## Troubleshooting

- **Session fetch failed: HTTP 404**: the session ID is wrong. Copy it again from WhatsApp.
- **Logged out**: unlink the device in WhatsApp, delete `sessions/`, and pair again.
- **Code 440 / connection replaced**: another instance is running with the same session. Stop it.
- **Bad MAC errors**: the number is linked twice, or the session is stale. Re-pair.
- Hosts with temporary storage re-download the session on every restart. The bot does not upload session updates back to the site, so if it keeps failing after restarts, re-pair.
- Anything else: https://github.com/engineermarcus/akuru/issues
