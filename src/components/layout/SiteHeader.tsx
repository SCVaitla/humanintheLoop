// src/components/layout/SiteHeader.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "/src/assets/aification.png";

export default function SiteHeader() {
  const Nav = () => (
    <nav className="flex items-center gap-6 text-sm">
    </nav>
  );

  const Right = () => null;

  return (
    <div className="container mx-auto flex h-16 items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
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