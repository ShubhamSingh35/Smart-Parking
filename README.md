# Smart Parking System (Demo)

A responsive web application demo that simulates parking management with real-time slot updates, geolocation map, and a mock authentication UI.

Features:
- Responsive list of parking locations with slot statuses
- Interactive map (Leaflet fallback). Replace with Mappls Maps if you have a Mappls API key.
- Demo "real-time" updates simulated in the browser.
- Firebase-ready placeholders for Auth and Realtime Database (you must add your config).

## What you get
A static site ready to upload to GitHub and deploy on Vercel. The demo works immediately without any external keys.

## How to enable Firebase (optional)
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable **Authentication -> Phone** (OTP) if you want phone login.
3. Create a Realtime Database and set rules (for testing you can set `.read` and `.write` to true, but secure it for production).
4. Copy your Firebase Web config and paste it into `firebase-config.js`.
5. Set `FIREBASE_ENABLED = true`.

Important: Phone auth requires domain verification and reCAPTCHA — follow Firebase docs.

## How to enable Mappls Maps (optional)
- Replace map initialization in `app.js` with Mappls JS map creation using your Mappls API key.
- Or set up Mappls in `index.html` and update the tile layer.

## Deploy to Vercel
1. Create a GitHub repository and push the project.
2. Sign in to Vercel and import the repo.
3. Vercel auto-deploys static sites. No build step required.

## Files
- index.html — main page
- styles.css — styles
- app.js — main logic (demo + placeholders)
- firebase-config.js — paste your Firebase config here
- README.md — this file

---

If you want, I can:
- Add real Firebase phone-OTP flow (I will need your Firebase config — **do not** paste sensitive keys in public chat; instead paste only the firebase config object).
- Replace the Leaflet map with Mappls initialization if you give the Mappls API key.
- Add additional pages (Admin dashboard) and instructions for database structure.

