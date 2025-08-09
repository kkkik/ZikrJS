<h1 align="center">📿 Zikr Widget for iOS (Scriptable) </h1>

<p align="center">
  <a href="https://scriptable.app/">
    <img alt="Scriptable" src="https://img.shields.io/badge/Scriptable-iOS-000000?logo=apple&logoColor=white&labelColor=000000&color=555555">
  </a>
  <img alt="Language: JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000">
  <img alt="Platform: iOS ONLY" src="https://img.shields.io/badge/iOS-Only-000000?logo=apple&logoColor=white">
  <img alt="Status" src="https://img.shields.io/badge/Status-Active-22c55e?logo=github">
</p>

<p align="center">
  <strong> iOS ONLY</strong> • Built for the <a href="https://scriptable.app/">Scriptable</a> app
</p>

<p align="center">
  <span title="iOS">🍎</span>&nbsp;&nbsp;
  <span title="Home Screen Widget">📱</span>&nbsp;&nbsp;
  <span title="Scriptable">🧩</span>&nbsp;&nbsp;
  <span title="Hijri/Gregorian Dates">🗓️</span>&nbsp;&nbsp;
  <span title="Next Prayer">🕋</span>&nbsp;&nbsp;
  <span title="Dhikr/Reminder">🔔</span>&nbsp;&nbsp;
  <span title="Quotes">📝</span>&nbsp;&nbsp;
  <span title="Theme Colors">🎨</span>
</p>

---

## 🧭 Overview

Zikr Widget is a pair of Scriptable scripts for iOS that show:
- 🗓️ Gregorian and Hijri dates (with online API and an offline fallback)
- 📝 A rotating wisdom quote (hadith/aphorisms)
- 🔔 Short reminders/adhkar
- 🕋 An approximate “Next Prayer” time
- ✨ A salawat line

Two localized files are included:
- ZikrAR.js — Arabic UI and content
- ZikrEN.js — English UI and content (fully translated labels and texts)

Credit preserved as requested:
- `# Dev! kkkik on github`

## 🖼️ Screenshots / Inspiration

The layout and bilingual profile style are inspired by the GitHub profile of @kkkik.

![Inspiration: kkkik GitHub profile](https://sjc.microlink.io/X5iLuPZACf04ixBwPJObYtIeJEjravLFvPLpBqj3nKymRYQhWLscQZo7Nbva0gAkf4vZb_53t2RseBCFQ-9_oA.jpeg)

## 📍 Where it runs

- Platform: <img alt="iOS" src="https://img.shields.io/badge/iOS-000000?logo=apple&logoColor=white"> iOS
- App: <a href="https://scriptable.app/">Scriptable</a> (free on the App Store)

Get Scriptable: https://scriptable.app/

## ✨ Features

- 🌙 Hijri date via Aladhan API (`gToH`) with a robust local approximation fallback
- 🧠 Random wisdom quote and reminder on each refresh
- ⏰ Approximate next‑prayer display using a simple local schedule
- 📐 Light, readable layout suitable for small/medium widgets
- 🎨 Color theme varies per refresh

## 📁 Files

- 📄 ZikrAR.js — Arabic version (اﻟﻌﺮﺑﻴﺔ)
- 📄 ZikrEN.js — English version

Both scripts include the same logic; only the UI strings, reminders, and prayer names are localized.

## 🚀 Installation (iOS + Scriptable)

1. Install the Scriptable app from the App Store.
2. Open Scriptable → tap + to create a new script.
3. Copy the content of ZikrAR.js or ZikrEN.js into the script and save.
4. Optionally rename the script to match the file name.
5. Add a Scriptable widget to your Home Screen and select the saved script.
6. Run once inside Scriptable to allow network access for the Hijri API.

Tip: You can add both Arabic and English versions as separate widgets.

## ⚙️ Configuration

- 🕰️ Prayer times are approximate placeholders. For accurate, location‑based times, replace the static schedule with Aladhan Prayer Times by coordinates.
- 🎨 Colors are randomly picked from a small palette; customize the array if you prefer a fixed theme.

## 🙏 Acknowledgements

- Hijri conversion API by Aladhan: https://aladhan.com/prayer-times-api
- Inspired by @kkkik profile layout and bilingual presentation: https://github.com/kkkik/kkkik

## © Copyright

`# Dev! kkkik on github`  
Copyright (c) 2025 kkkik. All rights reserved.
