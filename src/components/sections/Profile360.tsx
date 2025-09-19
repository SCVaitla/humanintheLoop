// src/components/sections/ToolsShowcase.tsx
import { Button } from "@/components/ui/button";

export default function ToolsShowcase() {
  return (
    <section className="py-12">
      {/* Gradient CTA (kept) */}
      <div className="text-center px-8">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl p-16 text-white shadow-2xl border border-purple-500/20 relative overflow-hidden max-w-6xl mx-auto">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />

          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-8">
              Ready to Experience Human-Enhanced AI?
            </h3>
            <p className="text-purple-100 mb-12 max-w-3xl mx-auto text-xl leading-relaxed">
              Join thousands of professionals who trust AIFICATION&apos;s unique blend of AI
              efficiency and human expertise to advance their careers.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-10 py-5 text-xl shadow-xl rounded-2xl"
                onClick={() => (window.location.href = "https://profile360.aification.ai")}
              >
                Start Free Trial
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold px-10 py-5 text-xl bg-white/10 backdrop-blur-sm rounded-2xl"
                onClick={() => (window.location.href = "/demo")}
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
