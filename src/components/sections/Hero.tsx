import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-indigo-500/10" />
      <div className="container mx-auto grid gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-20">
        <div>
          <p className="mb-3 text-sm font-semibold text-purple-600">AIFICATION · Human in the Loop AI</p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">AI to Empower You</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            AIFICATION offers a suite of AI tools tailored for students, job seekers, small businesses,
            educators, researchers, universities, and enterprises. We blend cutting-edge technology with
            human expertise to deliver real results.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="https://profile360.aification.ai"><Button size="xl" className="shadow">Start Free</Button></Link>
            <Link to="/tools/resume-builder"><Button size="xl" variant="outline">Explore Tools</Button></Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-purple-500/20 blur-2xl" />
          <div className="absolute -bottom-10 -left-8 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-2xl" />
          <div className="rounded-2xl border bg-card/70 p-6 shadow-xl backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Profile 360", desc: "Complete digital identity toolkit." },
                { title: "Resume Builder", desc: "ATS-ready, personalized documents." },
                { title: "SEO Profile", desc: "Rank higher with smart keywords." },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border p-4">
                  <div className="text-sm font-semibold">{f.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
