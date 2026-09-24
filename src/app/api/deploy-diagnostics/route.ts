import { getVisibleProducts } from "@/features/catalog/catalog.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const firstRead = await getVisibleProducts();
    const secondRead = await getVisibleProducts();
    const firstProduct = secondRead[0];

    return Response.json({
      firstReadCount: firstRead.length,
      secondReadCount: secondRead.length,
      firstProduct: firstProduct
        ? {
            createdAt: firstProduct.createdAt.toISOString(),
            id: firstProduct.id,
            updatedAt: firstProduct.updatedAt.toISOString(),
          }
        : null,
      firebaseAdminConfigured: Boolean(
        process.env.FIREBASE_PROJECT_ID &&
          process.env.FIREBASE_CLIENT_EMAIL &&
          process.env.FIREBASE_PRIVATE_KEY,
      ),
      ok: true,
    });
  } catch (error) {
    return Response.json(
      {
        message: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : "UnknownError",
        ok: false,
        stack: error instanceof Error ? error.stack : null,
      },
      { status: 500 },
    );
  }
}
