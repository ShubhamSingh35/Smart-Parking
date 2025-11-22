// If you want real Firebase functionality, replace the placeholders below
// with your project's configuration and deploy on a secure origin (https://).
// Create realtime database and enable Phone Auth if you want OTP sign-in.
// For now the app works in DEMO mode without Firebase.
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
// Flag: leave false to run demo without Firebase. Set to true after adding real config.
const FIREBASE_ENABLED = false;
