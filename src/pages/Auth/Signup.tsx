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

type ApiOk = { msg?: string };
type ApiError = { detail?: string; message?: string };
type TokenResponse = { access_token: string; token_type?: string };

const isApiError = (x: unknown): x is ApiError =>
  typeof x === "object" && x !== null && ("detail" in x || "message" in x);

export default function Signup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refresh } = useAuth();

  // email/password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Google state
  const gsiBtnRef = useRef<HTMLDivElement>(null);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [gReady, setGReady] = useState(false);
  const [gMsg, setGMsg] = useState<string | null>(null);

  // Initialize Google Identity button
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
                  (data as ApiError).detail || (data as ApiError).message || "Google sign-up failed"
                );
              }
              localStorage.setItem("token", (data as TokenResponse).access_token);

              // 🔥 hydrate auth so header shows user immediately
              await refresh();

              toast({ title: "Welcome!", description: "Account created with Google." });
              navigate("/dashboard");
            } catch (e: unknown) {
              toast({
                title: "Google sign-up failed",
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
          text: "signup_with",
          logo_alignment: "left",
          width: "100%",
        });

        setGReady(true);
        setGMsg(null);
      } catch {
        setGMsg("Failed to initialize Google Sign-Up.");
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
      } else if (++tries > 80) {
        window.clearInterval(t);
        setGMsg("Google script didn't load. Check index.html and ad-blockers.");
      }
    }, 125);

    return () => window.clearInterval(t);
  }, [navigate, toast, refresh]);

  // email/password submit
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Missing info", description: "Please enter email and password." });
      return;
    }
    try {
      setLoadingEmail(true);
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as unknown;

      if (!res.ok) {
        const msg = isApiError(data) && (data as ApiError).detail
          ? (data as ApiError).detail
          : "Signup failed";
        throw new Error(msg);
      }

      toast({
        title: "Account created",
        description: (data as ApiOk).msg ?? "You can log in now.",
      });
      // No token yet in email flow; go to login
      navigate("/login");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Please try again.";
      toast({ title: "Signup failed", description: msg, variant: "destructive" });
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <section className="container mx-auto py-12 max-w-md">
      <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-2 text-muted-foreground">
        Get personalized tool suggestions and save your work.
      </p>

      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        {/* Google official button */}
        <div ref={gsiBtnRef} className="flex justify-center" />
        {!gReady && gMsg && (
          <p className="mt-2 text-center text-xs text-muted-foreground">{gMsg}</p>
        )}

        {/* Divider */}
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button className="w-full" type="submit" disabled={loadingEmail || loadingGoogle}>
          {loadingEmail ? "Creating account..." : "Sign up"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline-offset-4 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
