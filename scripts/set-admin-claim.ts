import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

async function main() {
  const email = process.argv[2]?.trim();
  if (!email) throw new Error("Uso: npm run admin:grant -- correo@dominio.com");

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const credential = projectId && clientEmail && privateKey
    ? cert({ projectId, clientEmail, privateKey })
    : applicationDefault();
  const app = getApps()[0] || initializeApp({ credential, projectId });
  const auth = getAuth(app);
  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, { ...user.customClaims, admin: true });
  console.log(`Permiso admin concedido a ${email}. La persona debe volver a iniciar sesión.`);
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "No se pudo conceder el permiso.");
  process.exitCode = 1;
});
