import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

import { mockProducts } from "../src/features/catalog/mock-products";

async function main() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const existingApp = getApps()[0];
  const app = existingApp || (process.env.FIRESTORE_EMULATOR_HOST
    ? initializeApp({ projectId: projectId || "kajuu-local" })
    : initializeApp({
        credential: projectId && clientEmail && privateKey
          ? cert({ projectId, clientEmail, privateKey })
          : applicationDefault(),
        projectId,
      }));
  const db = getFirestore(app);
  const batch = db.batch();

  for (const product of mockProducts) {
    const data = Object.fromEntries(
      Object.entries(product).filter(
        ([key]) => !["id", "createdAt", "updatedAt"].includes(key),
      ),
    );
    batch.set(db.collection("products").doc(product.slug), {
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
  console.log(`${mockProducts.length} productos cargados o actualizados en Firestore.`);
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "No se pudo cargar el catálogo.");
  process.exitCode = 1;
});
