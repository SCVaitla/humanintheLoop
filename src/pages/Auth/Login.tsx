import { useEffect, useRef, useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (opts: {
            client_id: string;
            callback: (resp: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            itp_support?: boolean;
            use_fedcm_for_prompt?: boolean;
          }) => void;
          renderButton: (el: HTMLElement, opts?: Record<string, unknown>) => void;
          prompt: () => void;
          disableAutoSelect?: () => void;
        };
      };
    };
  }
}

type TokenResponse = { access_token: string; token_type?: string };
type ApiError = { detail?: string; message?: string };
const isApiError = (x: unknown): x is ApiError =>
  typeof x === "object" && x !== null && ("detail" in x || "message" in x);

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refresh } = useAuth();

  // Email/password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Google
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const gsiBtnRef = useRef<HTMLDivElement>(null);
  const [gReady, setGReady] = useState(false);
  const [gMsg, setGMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      setGMsg("Missing VITE_GOOGLE_CLIENT_ID");
      return;
    }

    const init = () => {
      if (!window.google || !gsiBtnRef.current) return;
      try {
        window.google.accounts.id.disableAutoSelect?.();
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async ({ credential }) => {
            try {
              setLoadingGoogle(true);
              const res = await fetch(`${API_BASE}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential }),
              });
              const data = (await res.json().catch(() => ({}))) as TokenResponse | ApiError;
              if (!res.ok) {
                throw new Error(
                  (data as ApiError).detail || (data as ApiError).message || "Google sign-in failed"
                );
              }
              localStorage.setItem("token", (data as TokenResponse).access_token);

              // 🔥 hydrate auth immediately so header updates without delay
              await refresh();

              toast({ title: "Welcome back!", description: "Signed in with Google." });
              navigate("/dashboard");
            } catch (e: unknown) {
              toast({
                title: "Google sign-in failed",
                description: e instanceof Error ? e.message : "Please try again.",
                variant: "destructive",
              });
            } finally {
              setLoadingGoogle(false);
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          itp_support: true,
          use_fedcm_for_prompt: false,
        });

        window.google.accounts.id.renderButton(gsiBtnRef.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "signin_with",
          logo_alignment: "left",
          width: "100%",
        });

        setGReady(true);
        setGMsg(null);
      } catch {
        setGMsg("Failed to initialize Google Sign-In.");
      }
    };

    if (window.google) {
      init();
      return;
    }
    let tries = 0;
    const t = window.setInterval(() => {
      if (window.google) {
        window.clearInterval(t);
        init();
      } else if (++tries > 66) {
        window.clearInterval(t);
        setGMsg("Google script didn't load. Check index.html and ad-blockers.");
      }
    }, 150);
    return () => window.clearInterval(t);
  }, [navigate, toast, refresh]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Missing info", description: "Please enter email and password." });
      return;
    }

    try {
      setLoadingEmail(true);
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as TokenResponse | ApiError;
      if (!res.ok) {
        throw new Error((data as ApiError).detail || (data as ApiError).message || "Invalid email or password");
      }

      localStorage.setItem("token", (data as TokenResponse).access_token);

      // 🔥 hydrate auth immediately so header/gated content show up now
      await refresh();

      toast({ title: "Welcome back!", description: "Login successful." });
      navigate("/dashboard");
    } catch (err: unknown) {
      toast({
        title: "Login failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <section className="container mx-auto py-12 max-w-md">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-muted-foreground">Sign in to your AIFICATION account.</p>

      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <div ref={gsiBtnRef} className="flex justify-center" />
        {!gReady && gMsg && (
          <p className="mt-2 text-center text-xs text-muted-foreground">{gMsg}</p>
        )}

        <div className="relative my-4">
          <div className="h-px bg-border" />
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-background px-2 text-xs text-muted-foreground">
            or continue with email
          </span>
        </div>

        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button className="w-full" type="submit" disabled={loadingEmail || loadingGoogle}>
          {loadingEmail ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary underline-offset-4 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}
