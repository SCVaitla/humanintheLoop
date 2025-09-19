import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-indigo-500/10" />
      <div className="container mx-auto py-16 md:py-20 max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold text-purple-600">AIFICATION · Human in the Loop AI</p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">AI to Empower You</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          AIFICATION offers a suite of AI tools tailored for students, job seekers, small businesses,
          educators, researchers, universities, and enterprises. We blend cutting-edge technology with
          human expertise to deliver real results.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
          <a href="https://profile360.aification.ai" target="_blank" rel="noopener noreferrer">
            <Button size="xl" className="w-full h-20 flex flex-col gap-1 shadow-lg">
              <span className="text-lg font-bold">Profile 360</span>
              <span className="text-sm opacity-90">Complete digital identity toolkit</span>
            </Button>
          </a>

          <Button size="xl" variant="outline" className="w-full h-20 flex flex-col gap-1 shadow-lg">
            <span className="text-lg font-bold">Resume Builder</span>
            <span className="text-sm text-muted-foreground">Coming Soon...</span>
          </Button>
        </div>
      </div>
    </section>
  );
}