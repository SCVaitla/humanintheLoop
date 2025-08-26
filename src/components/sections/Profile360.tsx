// src/components/sections/ToolsShowcase.tsx
import { Button } from "@/components/ui/button";

export default function ToolsShowcase() {
  const tool = {
    id: "resume-builder",
    title: "Profile 360",
    category: "Career Tools",
    description: "AI-powered resume creation and online profile optimization with expert validation",
    features: [
      "ATS optimization algorithms",
      "Industry-specific templates reviewed by HR experts",
      "Real-time feedback from career professionals",
      "Keyword optimization validated by recruiters",
      "Smart keyword analysis powered by AI",
      "SEO strategies refined by marketing experts",
      "Competitor analysis with human insights",
      "Content recommendations from industry specialists"
    ],
    users: "20K+ professionals",
    rating: "4.9",
    humanValidation: "Reviewed by 50+ recruiting professionals & certified SEO specialists",
    icon: "📄",
    gradient: "from-blue-500/10 via-purple-500/10 to-blue-600/10",
    borderColor: "border-blue-200/50",
    accentColor: "text-blue-600"
  };

  return (
    <section className="min-h-screen py-16 bg-gradient-to-b from-slate-50/50 via-white to-gray-50/30">
      <div className="w-full">
        {/* Header */}
        <div className="mx-auto max-w-6xl text-center mb-20 px-8">
          <div className="mb-12">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 text-sm font-semibold text-purple-700 mb-8 border border-purple-200/50">
              ✨ Human-in-the-Loop AI Tools
            </span>
            <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
              AI Tools, <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Human</span> Validated
            </h2>
          </div>

          <p className="text-xl text-gray-600 mb-16 leading-relaxed max-w-4xl mx-auto">
            Every recommendation is powered by advanced AI and refined by real experts in their fields.
            Get the speed of automation with the wisdom of human experience.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-12 mb-20 p-8 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">200+</div>
              <div className="text-sm text-gray-600 font-medium">Validators</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
            <div className="text-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">500+</div>
              <div className="text-sm text-gray-600 font-medium">Recommendations Refined</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
            <div className="text-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1">94%</div>
              <div className="text-sm text-gray-600 font-medium">User Success Rate</div>
            </div>
          </div>
        </div>

        {/* Tool Section Content */}
        <div className="w-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-600/5 border-y border-blue-200/20">
          <div className="mx-auto max-w-7xl px-8 py-20">

            {/* Tool Header */}
            <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
              <div className="flex items-center space-x-8 mb-8 lg:mb-0">
                <div className="text-6xl p-6 bg-white/90 rounded-3xl shadow-xl border border-white/50">
                  {tool.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                    {tool.category}
                  </div>
                  <h3 className="text-5xl font-bold text-gray-900 mb-4">
                    {tool.title}
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl min-w-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-700">{tool.users}</span>
                  <div className="flex items-center text-xl font-bold text-amber-600">
                    <span className="mr-3 text-2xl">⭐</span>
                    {tool.rating}
                  </div>
                </div>
                <div className="flex items-center text-base font-semibold text-purple-600">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-4 animate-pulse shadow-sm"></div>
                  {tool.humanValidation}
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mb-16">
              <h4 className="text-2xl font-bold text-gray-900 mb-12 text-center uppercase tracking-wide">
                Comprehensive Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tool.features.map((feature, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300">
                    <div className="flex items-start">
                      <div className={`inline-flex items-center justify-center w-8 h-8 ${tool.accentColor} bg-white rounded-full mr-4 mt-1 flex-shrink-0 shadow-md border border-white/50`}>
                        <span className="w-3 h-3 bg-current rounded-full"></span>
                      </div>
                      <span className="font-semibold text-gray-800 text-base leading-relaxed">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl px-12 py-6 rounded-2xl"
                onClick={() => {
                  if (tool.id === 'resume-builder') {
                    window.location.href = 'http://localhost:3000';
                  } else if (tool.id === 'profile-seo') {
                    window.location.href = 'http://localhost:3000';
                  } else {
                    window.location.href = `/tools/${tool.id}`;
                  }
                }}
              >
                Try {tool.title} Now →
              </Button>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-20 px-8">
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl p-16 text-white shadow-2xl border border-purple-500/20 relative overflow-hidden max-w-6xl mx-auto">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>

            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-8">
                Ready to Experience Human-Enhanced AI?
              </h3>
              <p className="text-purple-100 mb-12 max-w-3xl mx-auto text-xl leading-relaxed">
                Join thousands of professionals who trust AIFICATION's unique blend of AI efficiency
                and human expertise to advance their careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-10 py-5 text-xl shadow-xl rounded-2xl"
                  onClick={() => window.location.href = "/signup"}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold px-10 py-5 text-xl bg-white/10 backdrop-blur-sm rounded-2xl"
                  onClick={() => window.location.href = "/demo"}
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}