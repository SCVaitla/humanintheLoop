import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />   {/* nested pages render here */}
      </main>
      <footer className="border-t py-8 text-sm">
        <div className="container mx-auto text-center text-muted-foreground">
          © {new Date().getFullYear()} AIFICATION · Human in the Loop AI
        </div>
      </footer>
    </div>
  );
}
