import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  email: string;
  auth?: "local" | "google" | string;
};

type AuthContextShape = {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setUser({ email: data.email, auth: data.auth });
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial hydrate
    fetchMe();
  }, []);

  // React to token changes (other tabs / code paths) and tab focus
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "access_token") fetchMe();
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchMe();
    };
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const signOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    setUser(null);
    window.location.replace("/");
  };

  const value = useMemo(
    () => ({ user, loading, refresh: fetchMe, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
