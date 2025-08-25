// src/components/layout/SiteHeader.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import logo from "/src/assets/aification.png"; // 👈 add

export default function SiteHeader() {
  const { user, loading, signOut } = useAuth();

  const Nav = () => (
    <nav className="flex items-center gap-6 text-sm">
      <Link to="/" className="hover:text-foreground/80 text-foreground/60">Home</Link>
      <Link to="/tools" className="hover:text-foreground/80 text-foreground/60">Tools</Link>
    </nav>
  );

  const Right = () => {
    if (loading) return <div className="text-sm text-muted-foreground">Checking session…</div>;
    if (!user) {
      return (
        <>
          <Link to="/login"><Button variant="ghost">Log in</Button></Link>
          <Link to="/signup"><Button variant="hero" size="xl">Get Started</Button></Link>
        </>
      );
    }
    const initials = user.email?.slice(0, 1).toUpperCase() || "A";
    return (
      <div className="flex items-center gap-3">
        <div className="text-right leading-tight hidden sm:block">
          <div className="text-sm font-medium">{user.email}</div>
          <div className="text-[11px] -mt-0.5 text-muted-foreground">
            Signed in with {user.auth === "google" ? "Google" : "Email"}
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white grid place-items-center text-sm font-semibold">
          {initials}
        </div>
        <Button variant="outline" size="sm" onClick={signOut}>Sign out</Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto flex h-16 items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        {/* 👇 replace colored square with your logo */}
        <img
          src={logo}
          alt="AIFICATION logo"
          className="h-14 w-auto"
          loading="eager"
          decoding="async"
        />
      </Link>

      <div className="hidden md:block"><Nav /></div>

      <div className="hidden md:flex items-center gap-2">
        <Right />
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="mt-6 space-y-6">
              <Nav />
              <div className="flex gap-2">
                <Right />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
