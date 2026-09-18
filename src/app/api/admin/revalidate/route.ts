import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { getAdminAuth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const token = await getAdminAuth().verifyIdToken(authorization.slice(7));
    if (token.admin !== true) {
      return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
    }
    revalidateTag("products", "max");
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
