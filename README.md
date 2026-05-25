# StudioVoice

Professional audio polish for iPhone voice memos — runs entirely in the browser, no server required.

## What it does

Upload an `.m4a`, `.mp3`, `.wav`, `.aac`, or `.flac` recording and StudioVoice applies a studio-quality processing chain using the Web Audio API:

- **Noise Reduction** — high-pass filter + 60/120 Hz hum notches + noise gate
- **Bass & Warmth** — low-shelf boost and body EQ at 120/240 Hz
- **Compression** — dynamics compressor with tunable ratio and threshold
- **Clarity & Air** — presence peak at 4 kHz and high-shelf at 10 kHz

The processed audio downloads as a 16-bit WAV.

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. No build step — Vercel serves `index.html` directly.

### Option B — Vercel Dashboard (no CLI)

1. Push this repo to GitHub / GitLab / Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Leave all build settings blank (Framework: **Other**, Build Command: empty, Output Dir: `.`)
4. Click **Deploy**

That's it. The `vercel.json` already handles headers and routing.

## Local development

No build step needed — just open `index.html` in a browser:

```bash
# macOS
open index.html

# or any static server
npx serve .
```

> **Note:** The Web Audio `OfflineAudioContext` requires a secure context (HTTPS or localhost). Vercel provides HTTPS automatically; for local dev use `npx serve` or VS Code Live Server rather than `file://`.

## Tech

- Vanilla HTML/CSS/JS — zero dependencies, zero build tools
- Web Audio API (`OfflineAudioContext`, `BiquadFilterNode`, `DynamicsCompressorNode`)
- WAV encoding via `DataView` / `Int16Array`
- ~42 KB total, loads instantly
