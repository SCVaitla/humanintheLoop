// src/pages/Index.tsx
import Hero from "@/components/sections/Hero";
import Profile360 from "@/components/sections/Profile360";
import ToolsShowcase from "@/components/sections/ToolsShowcase";

export default function Index() {
  return (
    <>
      <Hero />
      <Profile360 />
      <ToolsShowcase />
      <section className="container mx-auto py-12">
        <div className="rounded-xl border bg-muted/20 p-8 text-center">
          <h3 className="text-xl font-semibold">Ready to get started?</h3>
          <p className="mt-2 text-muted-foreground">
            Join AIFICATION and put “Human in the Loop AI” to work for you.
          </p>
          <a href="/signup" className="inline-block mt-4">
            <span className="inline-flex h-11 items-center rounded-md bg-gradient-primary px-6 text-sm font-medium text-primary-foreground hover:scale-[1.02] transition">
              Create your account
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
