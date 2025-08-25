// src/components/sections/ToolsShowcase.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ToolsShowcase() {
  const tools = [
    {
      id: "resume-builder",
      title: "Smart Resume Builder",
      category: "Career Tools",
      description: "AI-powered resume creation with recruiter validation",
      features: [
        "ATS optimization algorithms",
        "Industry-specific templates reviewed by HR experts",
        "Real-time feedback from career professionals",
        "Keyword optimization validated by recruiters"
      ],
      users: "12K+ professionals",
      rating: "4.9",
      humanValidation: "Reviewed by 50+ recruiting professionals",
      icon: "📄",
      gradient: "from-blue-50 to-purple-50",
      borderColor: "border-blue-200"
    },
    {
      id: "profile-seo",
      title: "SEO Profile Optimizer",
      category: "Digital Presence",
      description: "Boost online visibility with expert-validated SEO strategies",
      features: [
        "Smart keyword analysis powered by AI",
        "SEO strategies refined by marketing experts",
        "Competitor analysis with human insights",
        "Content recommendations from industry specialists"
      ],
      users: "8K+ entrepreneurs",
      rating: "4.8",
      humanValidation: "Validated by certified SEO specialists",
      icon: "🔍",
      gradient: "from-green-50 to-blue-50",
      borderColor: "border-green-200"
    },
    {
      id: "interview-prep",
      title: "AI Interview Coach",
      category: "Skill Development",
      description: "Practice interviews with AI, get feedback from professionals",
      features: [
        "Personalized question generation",
        "Real-time performance analysis",
        "Expert coaching tips from interview professionals",
        "Industry-specific scenarios curated by hiring managers"
      ],
      users: "15K+ job seekers",
      rating: "4.9",
      humanValidation: "Coached by experienced hiring managers",
      icon: "🎯",
      gradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    },
    {
      id: "skill-assessments",
      title: "Skills Analytics",
      category: "Professional Development",
      description: "Identify skill gaps with AI analysis and expert guidance",
      features: [
        "Comprehensive skill mapping algorithms",
        "Market demand analysis",
        "Learning path recommendations from industry mentors",
        "Progress tracking with expert milestone validation"
      ],
      users: "6K+ learners",
      rating: "4.7",
      humanValidation: "Curated by industry learning specialists",
      icon: "📊",
      gradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200"
    },
    {
      id: "network-builder",
      title: "Strategic Networking",
      category: "Relationship Building",
      description: "AI-powered networking suggestions enhanced by relationship experts",
      features: [
        "Smart connection recommendations",
        "Conversation starters powered by AI",
        "Networking strategies from relationship professionals",
        "Follow-up automation with personal touch guidance"
      ],
      users: "4K+ networkers",
      rating: "4.6",
      humanValidation: "Strategies from professional networking coaches",
      icon: "🤝",
      gradient: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200"
    },
    {
      id: "career-insights",
      title: "Career Path Analyzer",
      category: "Strategic Planning",
      description: "AI career predictions refined by seasoned career counselors",
      features: [
        "Predictive career modeling",
        "Salary trajectory analysis",
        "Industry trend insights from market analysts",
        "Personalized roadmaps created with career experts"
      ],
      users: "9K+ professionals",
      rating: "4.8",
      humanValidation: "Guided by certified career counselors",
      icon: "🚀",
      gradient: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 mb-4">
              Human-in-the-Loop AI Tools
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              AI Tools, <span className="text-purple-600">Human</span> Validated
            </h2>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            Every recommendation is powered by advanced AI and refined by real experts in their fields.
            Get the speed of automation with the wisdom of human experience.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">200+</div>
              <div className="text-sm text-gray-600">Expert Validators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-600">Recommendations Refined</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600">User Success Rate</div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${tool.gradient} p-6 shadow-sm ring-1 ${tool.borderColor} hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{tool.icon}</div>
                  <div>
                    <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      {tool.category}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                      {tool.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                {tool.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {tool.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="inline-block w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats & Validation */}
              <div className="mb-6 p-4 bg-white bg-opacity-60 rounded-lg border border-white border-opacity-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{tool.users}</span>
                  <div className="flex items-center text-sm text-yellow-600">
                    <span className="mr-1">⭐</span>
                    {tool.rating}
                  </div>
                </div>
                <div className="text-xs text-purple-600 font-medium flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  {tool.humanValidation}
                </div>
              </div>

              {/* CTA */}
              <Button asChild size="sm" className="w-full bg-white bg-opacity-80 text-gray-900 hover:bg-opacity-100 border border-gray-200">
                <Link to={`/tools/${tool.id}`}>
                  Try {tool.title}
                </Link>
              </Button>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience Human-Enhanced AI?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who trust AIFICATION's unique blend of AI efficiency
              and human expertise to advance their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Link to="/demo">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}