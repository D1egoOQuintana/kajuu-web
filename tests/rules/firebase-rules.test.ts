import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { getBytes, ref, uploadBytes } from "firebase/storage";
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";

let testEnvironment: RulesTestEnvironment;

function productData(overrides: Record<string, unknown> = {}) {
  return {
    name: "Jean de prueba",
    slug: "jean-de-prueba",
    description: "Producto válido para probar las reglas.",
    price: 45000,
    category: "jeans",
    sizes: ["S", "M"],
    colors: ["Azul"],
    stockStatus: "available",
    images: [],
    isVisible: true,
    isFeatured: false,
    isNewArrival: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    ...overrides,
  };
}

beforeAll(async () => {
  testEnvironment = await initializeTestEnvironment({
    projectId: "kajuu-rules-test",
    firestore: { rules: readFileSync(resolve("firestore.rules"), "utf8") },
    storage: { rules: readFileSync(resolve("storage.rules"), "utf8") },
  });
});

beforeEach(async () => {
  await testEnvironment.clearFirestore();
  await testEnvironment.clearStorage();
});

afterAll(async () => testEnvironment.cleanup());

describe("reglas de Firestore", () => {
  it("permite leer productos visibles y bloquea los ocultos", async () => {
    await testEnvironment.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "products/visible"), productData({ slug: "visible" }));
      await setDoc(doc(context.firestore(), "products/oculto"), productData({ slug: "oculto", isVisible: false }));
    });
    const publicDb = testEnvironment.unauthenticatedContext().firestore();
    await assertSucceeds(getDoc(doc(publicDb, "products/visible")));
    await assertFails(getDoc(doc(publicDb, "products/oculto")));
    await assertSucceeds(getDocs(query(collection(publicDb, "products"), where("isVisible", "==", true))));
    await assertFails(getDocs(collection(publicDb, "products")));
  });

  it("solo deja crear datos válidos a una cuenta administradora", async () => {
    const publicDb = testEnvironment.unauthenticatedContext().firestore();
    await assertFails(setDoc(doc(publicDb, "products/jean-de-prueba"), productData()));

    const adminDb = testEnvironment.authenticatedContext("admin-user", { admin: true }).firestore();
    const validCreate = productData({ createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    await assertSucceeds(setDoc(doc(adminDb, "products/jean-de-prueba"), validCreate));
    await assertFails(setDoc(doc(adminDb, "products/id-distinto"), validCreate));
  });
});

describe("reglas de Storage", () => {
  it("admite imágenes de administrador y lectura pública", async () => {
    const adminStorage = testEnvironment.authenticatedContext("admin-user", { admin: true }).storage();
    const imageRef = ref(adminStorage, "products/jean-de-prueba/foto.webp");
    await assertSucceeds(uploadBytes(imageRef, new Uint8Array([1, 2, 3]), { contentType: "image/webp" }));

    const publicStorage = testEnvironment.unauthenticatedContext().storage();
    await assertSucceeds(getBytes(ref(publicStorage, "products/jean-de-prueba/foto.webp")));
  });

  it("bloquea archivos no permitidos", async () => {
    const adminStorage = testEnvironment.authenticatedContext("admin-user", { admin: true }).storage();
    await assertFails(uploadBytes(ref(adminStorage, "products/jean-de-prueba/data.txt"), new Uint8Array([1]), { contentType: "text/plain" }));
  });
});
