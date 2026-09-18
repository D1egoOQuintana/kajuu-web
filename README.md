# KAJÚ Web

Catálogo público y panel privado para KAJÚ Indumentaria. La aplicación usa Next.js, Firebase Authentication, Cloud Firestore y Firebase Storage.

## Requisitos

- Node.js 22 o superior
- Java 17 o superior para los emuladores de Firebase incluidos en las pruebas
- Un proyecto Firebase con Authentication, Firestore y Storage habilitados

## Configuración local

1. Instala dependencias con `npm ci`.
2. Copia `.env.example` como `.env.local` y completa los valores. Las variables `NEXT_PUBLIC_*` llegan al navegador; las variables `FIREBASE_*` son privadas y solo deben existir en el servidor.
3. Habilita el proveedor **Correo electrónico/Contraseña** en Firebase Authentication.
4. Inicia la aplicación con `npm run dev`.

El sitio abre en `http://localhost:3000` y el panel privado en `http://localhost:3000/kajuu-panel`.

## Preparar Firebase

Despliega reglas e índices antes de habilitar el panel:

```bash
npx firebase-tools deploy --only firestore:rules,firestore:indexes,storage
```

Crea la cuenta administradora en Firebase Authentication y concédele el custom claim `admin` desde un entorno que tenga las credenciales privadas configuradas:

```bash
npm run admin:grant -- correo@dominio.com
```

La persona debe cerrar y volver a iniciar sesión para recibir el nuevo claim. Las reglas permiten lectura pública únicamente de productos visibles. Solo una cuenta con `admin: true` puede crear, editar, eliminar o subir imágenes.

Para migrar el catálogo inicial que venía incluido en el prototipo:

```bash
npm run seed:products
```

Este comando crea o actualiza documentos usando el slug como identificador. Ejecútalo una sola vez contra el proyecto correcto.

## Seguridad de producción

- Configura Firebase App Check con reCAPTCHA v3 y añade `NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY`.
- Restringe la API key pública en Google Cloud a los dominios de producción y a las APIs de Firebase necesarias.
- Guarda `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL` y `FIREBASE_PROJECT_ID` como secretos del proveedor de hosting. Nunca los confirmes en Git.
- Autoriza el dominio final en Firebase Authentication y App Check.
- Usa un número internacional sin `+` ni espacios en `NEXT_PUBLIC_WHATSAPP_PHONE`.
- Define `NEXT_PUBLIC_SITE_URL` con el dominio canónico para sitemap, Open Graph y datos estructurados.

## Calidad

```bash
npm run lint
npm test
npm run test:rules
npm run build
```

`npm run check` ejecuta lint, pruebas unitarias y build. Las pruebas de reglas arrancan los emuladores de Firestore y Storage y necesitan Java.

## Despliegue

1. Configura todas las variables de `.env.example` en el entorno de producción.
2. Ejecuta `npm ci` y `npm run check` en integración continua.
3. Despliega las reglas de Firebase.
4. Publica la aplicación con `npm run build` y `npm run start` o mediante el adaptador oficial del proveedor.
5. Comprueba `/`, `/catalogo`, `/ultimos-ingresos`, un detalle de producto y el acceso a `/kajuu-panel`.

El catálogo público consulta Firestore desde el servidor y mantiene una caché de 60 segundos. El panel escribe directamente mediante el SDK web; Firestore y Storage vuelven a validar cada operación con sus reglas.
