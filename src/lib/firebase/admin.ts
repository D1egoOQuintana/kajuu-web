import "server-only";

import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export function isFirebaseAdminConfigured() {
  const hasServiceAccount = Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );

  return Boolean(
    process.env.FIRESTORE_EMULATOR_HOST ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      hasServiceAccount,
  );
}

function createAdminApp() {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (process.env.FIRESTORE_EMULATOR_HOST) {
    return initializeApp({
      projectId: projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "kajuu-local",
    });
  }

  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      projectId,
    });
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return initializeApp({ credential: applicationDefault(), projectId });
  }

  throw new Error(
    "Firebase Admin no está configurado. Define FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY.",
  );
}

export function getAdminAuth() {
  return getAuth(createAdminApp());
}

export function getAdminDb() {
  return getFirestore(createAdminApp());
}
