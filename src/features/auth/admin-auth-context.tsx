"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getFirebaseAuth } from "@/lib/firebase/client";

type AdminAuthContextValue = {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  configurationError: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [configurationError, setConfigurationError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();
      return onAuthStateChanged(auth, async (nextUser) => {
        try {
          if (!nextUser) {
            setUser(null);
            setIsAdmin(false);
            return;
          }
          const token = await nextUser.getIdTokenResult(true);
          setUser(nextUser);
          setIsAdmin(token.claims.admin === true);
        } catch {
          setUser(null);
          setIsAdmin(false);
        } finally {
          setIsLoading(false);
        }
      });
    } catch (error) {
      queueMicrotask(() => {
        setConfigurationError(
          error instanceof Error ? error.message : "Firebase no está configurado.",
        );
        setIsLoading(false);
      });
      return undefined;
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(
      getFirebaseAuth(),
      email.trim(),
      password,
    );
    const token = await credential.user.getIdTokenResult(true);
    if (token.claims.admin !== true) {
      await signOut(getFirebaseAuth());
      throw new Error("Esta cuenta no tiene permisos de administración.");
    }
  }, []);

  const logout = useCallback(() => signOut(getFirebaseAuth()), []);

  const value = useMemo(
    () => ({ user, isAdmin, isLoading, configurationError, login, logout }),
    [configurationError, isAdmin, isLoading, login, logout, user],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth debe usarse dentro de AdminAuthProvider.");
  }
  return context;
}
