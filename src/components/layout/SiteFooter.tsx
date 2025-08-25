export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto grid gap-10 py-10 md:grid-cols-4">
        <div>
          <div className="text-lg font-bold">AIFICATION</div>
          <div className="text-sm text-muted-foreground">Human in the Loop AI</div>
          <p className="mt-4 text-sm">
            621 Driftwood Dr, Lincoln, NE, USA
          </p>
          <p className="mt-1 text-sm">Purple Podiums · 123-456-7890</p>
          <p className="mt-1 text-sm">AIFICATION.AI</p>
        </div>

        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:underline" href="/">Facebook</a></li>
            <li><a className="hover:underline" href="/">Instagram</a></li>
            <li><a className="hover:underline" href="/">X</a></li>
            <li><a className="hover:underline" href="/">TikTok</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:underline" href="/">Privacy Policy</a></li>
            <li><a className="hover:underline" href="/">Accessibility Statement</a></li>
            <li><a className="hover:underline" href="/">Terms &amp; Conditions</a></li>
            <li><a className="hover:underline" href="/">Refund Policy</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Stay in touch</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Get updates on new tools and features.
          </p>
          <form className="mt-4 flex gap-2">
            <input className="h-10 w-full rounded-md border bg-background px-3 text-sm" placeholder="Email address" />
            <button className="h-10 rounded-md bg-gradient-primary px-4 text-sm text-primary-foreground">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © 2035 by AIFICATION. Powered and secured by Wix
      </div>
    </footer>
  );
}
