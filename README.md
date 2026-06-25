# 🚲 DirtDealFinder — Instrukcja uruchomienia

## Struktura projektu

```
dirtdealfinder/
├── server/
│   └── index.js        ← backend (Express proxy)
├── public/
│   └── index.html      ← frontend (React przez CDN)
├── package.json
└── README.md
```

## Dlaczego backend?

Przeglądarka blokuje bezpośrednie zapytania do:
- `generativelanguage.googleapis.com` (Gemini) — CORS
- `kleinanzeigen.de` — CORS + bot detection

Backend Node.js omija oba problemy i działa 24/7 na hostingu.

---

## 🚀 Hosting na Railway (darmowy plan)

1. Wejdź na **railway.app** → zaloguj się przez GitHub
2. Kliknij **New Project → Deploy from GitHub repo**
3. Wrzuć ten folder na GitHub (lub wgraj zip)
4. Railway automatycznie wykryje `package.json` i uruchomi `node server/index.js`
5. Kliknij **Generate Domain** → masz link https, który działa 24/7

**Gotowe!** Otwórz link, wejdź w Ustawienia, wpisz:
- Klucz Gemini API (aistudio.google.com/apikey)
- Discord Webhook URL
- Opcjonalnie: nazwę chatu Gemini

---

## 🚀 Hosting na Render (darmowy plan)

1. Wejdź na **render.com** → nowe konto przez GitHub
2. **New → Web Service** → połącz repo
3. Build Command: `npm install`
4. Start Command: `node server/index.js`
5. Kliknij **Deploy** → dostaniesz link https

---

## 🖥 Lokalnie (do testów)

```bash
npm install
npm start
# Otwórz: http://localhost:3000
```

---

## ★ Nowa funkcja: Nazwa chatu Gemini

W zakładce **Ustawienia** znajdziesz pole **"Nazwa chatu Gemini"**.

Wpisz tam nazwę swojego Gema lub chatu w Gemini (np. `Bike Deals Analyzer`).
Ta nazwa zostanie dołączona do każdego promptu wysyłanego do Gemini API,
żeby AI wiedziało, w kontekście jakiej rozmowy działa.

Jak znaleźć nazwę chatu:
- Wejdź na **gemini.google.com**
- W lewym panelu znajdź swoją rozmowę lub Gema
- Skopiuj jej tytuł i wklej w ustawienia

---

## Jak działa skanowanie

1. Backend pobiera HTML z Kleinanzeigen dla każdego modelu
2. Parser wyciąga tytuły, ceny, lokalizacje
3. Nowe ogłoszenia (niewidziane wcześniej) trafiają do Gemini
4. Gemini ocenia: czy warto kupić i odsprzedać z zyskiem w Polsce?
5. Jeśli TAK i zysk ≥ minimum → embed Discord wysłany automatycznie
6. Auto-skan co N minut działa przez cały czas

---

## Modele rowerów (można edytować w kodzie)

- Specialized P.3
- Dartmoor Two6player
- Canyon Stitched 360
- Trek Ticket
- Rose The Bruce
- Radon Slush
