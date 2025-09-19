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
        <div className="container mx-auto text-muted-foreground flex justify-center">
          <div className="max-w-md text-center">
            <h4 className="text-base font-semibold text-primary mb-2 uppercase">Contact Us</h4>
            <ul className="space-y-1">
              <li>200 L.W. Chase Hall</li>
              <li>P.O. Box 830726</li>
              <li>Lincoln, NE 68583-0726</li>
              <li>Phone: 402-472-1413</li>
              <li>Fax: 402-472-6338</li>
              <li>
                Email:{" "}
                <a href="mailto:support@aification.ai" className="underline">
                  support@aification.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 container mx-auto text-center text-muted-foreground">
          © {new Date().getFullYear()} AIFICATION · Human in the Loop AI
        </div>
      </footer>
    </div>
  );
}
