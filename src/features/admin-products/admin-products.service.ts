"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import {
  getFirebaseAuth,
  getFirebaseDb,
  getFirebaseStorage,
} from "@/lib/firebase/client";
import {
  productSchema,
  productWriteSchema,
  type ProductWriteInput,
} from "@/lib/validators/product.schema";
import type { Product, ProductImage } from "@/types/product";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function productsCollection() {
  return collection(getFirebaseDb(), "products");
}

function validateFiles(files: File[], currentCount: number) {
  if (files.length + currentCount > 12) {
    throw new Error("Puedes guardar hasta 12 imágenes por producto.");
  }
  for (const file of files) {
    if (!ACCEPTED_IMAGE_TYPES.has(file.type)) {
      throw new Error(`${file.name}: formato no admitido.`);
    }
    if (file.size <= 0 || file.size >= MAX_FILE_BYTES) {
      throw new Error(`${file.name}: la imagen debe pesar menos de 5 MB.`);
    }
  }
}

function safeFileName(name: string): string {
  const extension = name.split(".").pop()?.toLowerCase() || "image";
  return `${crypto.randomUUID()}.${extension.replace(/[^a-z0-9]/g, "")}`;
}

async function uploadImages(
  productId: string,
  productName: string,
  files: File[],
  currentImages: ProductImage[],
): Promise<{ images: ProductImage[]; uploadedPaths: string[] }> {
  validateFiles(files, currentImages.length);
  const storage = getFirebaseStorage();
  const uploaded: ProductImage[] = [];
  try {
    for (const [index, file] of files.entries()) {
      const storagePath = `products/${productId}/${safeFileName(file.name)}`;
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: { productId },
      });
      uploaded.push({
        url: await getDownloadURL(storageRef),
        path: storagePath,
        alt: `${productName} - imagen ${currentImages.length + index + 1}`,
        position: currentImages.length + index,
      });
    }
  } catch (error) {
    await removeStoredImages(uploaded.flatMap((image) => image.path || []));
    throw error;
  }
  return {
    images: [...currentImages, ...uploaded].map((image, position) => ({
      ...image,
      position,
    })),
    uploadedPaths: uploaded.flatMap((image) => image.path || []),
  };
}

async function removeStoredImages(paths: string[]) {
  await Promise.allSettled(
    paths.map((path) => deleteObject(ref(getFirebaseStorage(), path))),
  );
}

async function refreshPublicCatalog() {
  const user = getFirebaseAuth().currentUser;
  if (!user) return;
  try {
    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: { Authorization: `Bearer ${await user.getIdToken()}` },
    });
  } catch {
    // La caché también expira automáticamente a los 60 segundos.
  }
}

function parseProduct(id: string, data: Record<string, unknown>): Product {
  const result = productSchema.safeParse({ id, ...data });
  if (!result.success) {
    throw new Error(`El producto ${id} tiene datos inválidos en Firestore.`);
  }
  return result.data;
}

export async function listAdminProducts(): Promise<Product[]> {
  const snapshot = await getDocs(
    query(productsCollection(), orderBy("updatedAt", "desc"), limit(200)),
  );
  return snapshot.docs.map((item) => parseProduct(item.id, item.data()));
}

export async function getAdminProduct(id: string): Promise<Product | null> {
  const snapshot = await getDoc(doc(productsCollection(), id));
  return snapshot.exists() ? parseProduct(snapshot.id, snapshot.data()) : null;
}

export async function createAdminProduct(
  input: ProductWriteInput,
  files: File[],
): Promise<string> {
  const cleanInput = productWriteSchema.parse(input);
  const productRef = doc(productsCollection(), cleanInput.slug);
  if ((await getDoc(productRef)).exists()) {
    throw new Error("Ya existe un producto con ese slug.");
  }

  const { images, uploadedPaths } = await uploadImages(
    cleanInput.slug,
    cleanInput.name,
    files,
    cleanInput.images,
  );
  const finalInput = productWriteSchema.parse({ ...cleanInput, images });
  try {
    await setDoc(productRef, {
      ...finalInput,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    await removeStoredImages(uploadedPaths);
    throw error;
  }
  await refreshPublicCatalog();
  return cleanInput.slug;
}

export async function updateAdminProduct(
  id: string,
  input: ProductWriteInput,
  files: File[],
  removedPaths: string[],
): Promise<void> {
  const cleanInput = productWriteSchema.parse(input);
  if (cleanInput.slug !== id) {
    throw new Error("El slug no puede cambiar después de crear el producto.");
  }
  const productRef = doc(productsCollection(), id);
  if (!(await getDoc(productRef)).exists()) {
    throw new Error("El producto ya no existe.");
  }
  const { images, uploadedPaths } = await uploadImages(
    id,
    cleanInput.name,
    files,
    cleanInput.images,
  );
  const finalInput = productWriteSchema.parse({ ...cleanInput, images });
  try {
    await updateDoc(productRef, { ...finalInput, updatedAt: serverTimestamp() });
  } catch (error) {
    await removeStoredImages(uploadedPaths);
    throw error;
  }
  await removeStoredImages(removedPaths);
  await refreshPublicCatalog();
}

export async function deleteAdminProduct(product: Product): Promise<void> {
  await deleteDoc(doc(productsCollection(), product.id));
  await removeStoredImages(product.images.flatMap((image) => image.path || []));
  await refreshPublicCatalog();
}
