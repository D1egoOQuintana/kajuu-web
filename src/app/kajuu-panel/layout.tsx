import type { Metadata } from "next";

import { AdminGate } from "@/components/admin/admin-gate";
import { AdminAuthProvider } from "@/features/auth/admin-auth-context";

export const metadata: Metadata = {
  title: "Panel administrativo",
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminGate>{children}</AdminGate>
    </AdminAuthProvider>
  );
}
