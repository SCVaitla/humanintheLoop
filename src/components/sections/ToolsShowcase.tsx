import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Search, ShieldCheck, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ToolKey = "resume" | "seo";

const TOOL_META: Record<
  ToolKey,
  {
    title: string;
    tagline: string;
    href: string;
    cta: string;
    highlights: string[];
    metrics: { label: string; value: string }[];
    icon: React.ElementType;
  }
> = {
  resume: {
    title: "Profile 360",
    tagline:
      "Create professional, ATS-optimized documents that spotlight your strengths.",
    href: "/tools/resume-builder",
    cta: "More Info →",
    icon: FileText,
    highlights: [
      "Role-aware templates with clean typography",
      "Keyword targeting for ATS",
      "Impact bullets suggested by AI",
      "Export to PDF / DOCX",
    ],
    metrics: [
      { label: "ATS Readability", value: "A" },
      { label: "Tailored Versions", value: "3" },
      { label: "Keyword Match", value: "87%" },
    ],
  },
  seo: {
    title: "SEO Optimized Digital Profile",
    tagline:
      "Ensure your professional presence ranks for the searches that matter.",
    href: "/signup",
    cta: "Optimize My Profile",
    icon: Search,
    highlights: [],
    metrics: [],
  },
};

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <ShieldCheck className="mt-0.5 h-4 w-4 text-purple-600" />
      <span className="text-sm">{children}</span>
    </li>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border px-3 py-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

export default function ToolsShowcase() {
  const [active, setActive] = useState<ToolKey>("resume");
  const tool = TOOL_META[active];
  const ActiveIcon = tool.icon;

  return (
    <section className="container py-12">
      <div className="mb-2 flex items-center gap-1">
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          Profile 360 Suite
        </Badge>
        <Wand2 className="h-4 w-4 text-purple-600" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">What can AI do for You?</h2>
      <p className="mt-2 text-muted-foreground">
        A streamlined toolkit—pick a tool on the left to preview features and jump in.
      </p>

      {/* Split layout: left selector / right detail */}
      <div className="mt-8 grid gap-6 md:grid-cols-[280px,1fr]">
        {/* Left: vertical selector */}
        <div className="space-y-2">
          {(Object.keys(TOOL_META) as ToolKey[]).map((k) => {
            const Icon = TOOL_META[k].icon;
            const isActive = k === active;
            return (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={[
                  "w-full rounded-lg border px-4 py-3 text-left transition",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive ? "border-purple-600 shadow-sm" : "border-input",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600/10">
                    <Icon className="h-4 w-4 text-purple-700" />
                  </span>
                  <span className="text-sm font-medium">{TOOL_META[k].title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: detail panel */}
        <div className="rounded-2xl border bg-card/60 p-6 shadow-sm">
          {active === "seo" ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Search className="h-8 w-8 text-purple-700 mb-4" />
              <h3 className="text-lg font-semibold">
                SEO Optimized Digital Profile
              </h3>
              <p className="text-sm text-muted-foreground">Coming soon...</p>
            </div>
          ) : (
            <>
              {/* Header row: icon + text + button aligned to far right */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/10">
                    <ActiveIcon className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.tagline}</p>
                  </div>
                </div>

                {/* Client-side navigation to resume builder */}
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-4 py-2 rounded-md"
                >
                  <Link to={tool.href}>{tool.cta}</Link>
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold">Highlights</div>
                  <ul className="mt-3 space-y-3">
                    {tool.highlights.map((h) => (
                      <Bullet key={h}>{h}</Bullet>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-sm font-semibold">Snapshot</div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {tool.metrics.map((m) => (
                      <Metric key={m.label} label={m.label} value={m.value} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border px-2 py-1">Privacy-minded</span>
                <span className="rounded-full border px-2 py-1">Designed for Outcomes</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
