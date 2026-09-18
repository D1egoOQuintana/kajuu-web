import { describe, expect, it } from "vitest";

import { createProductWhatsAppUrl } from "@/lib/utils/whatsapp";

describe("createProductWhatsAppUrl", () => {
  it("codifica el nombre del producto y usa HTTPS", () => {
    const url = new URL(createProductWhatsAppUrl({ productName: "Top & Jean" }));
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toContain("Top & Jean");
  });
});
