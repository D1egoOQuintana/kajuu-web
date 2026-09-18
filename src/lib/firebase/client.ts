import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

let appCheckInitialized = false;

function getFirebaseConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const missing = Object.entries(config)
    .filter(([key, value]) => key !== "measurementId" && !value)
    .map(([key]) => key);
  if (missing.length > 0) {
    throw new Error(`Falta configuración pública de Firebase: ${missing.join(", ")}.`);
  }
  return config;
}

export function getFirebaseClientApp(): FirebaseApp {
  const app = getApps().length > 0 ? getApp() : initializeApp(getFirebaseConfig());
  const appCheckKey = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY;

  if (typeof window !== "undefined" && appCheckKey && !appCheckInitialized) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckKey),
      isTokenAutoRefreshEnabled: true,
    });
    appCheckInitialized = true;
  }

  return app;
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseClientApp());
}

export function getFirebaseDb() {
  return getFirestore(getFirebaseClientApp());
}

export function getFirebaseStorage() {
  return getStorage(getFirebaseClientApp());
}
