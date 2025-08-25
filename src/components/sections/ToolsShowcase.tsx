import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Search, ShieldCheck, Wand2 } from "lucide-react";

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
    title: "Automated Resume Builder",
    tagline:
      "Create professional, ATS-optimized documents that spotlight your strengths.",
    href: "/tools/resume-builder",
    cta: "Open Resume Builder",
    icon: FileText,
    highlights: [
      "Role-aware templates with clean typography",
      "Keyword targeting for ATS",
      "Impact bullets suggested by AI",
      "Export to PDF / DOCX (connect backend)",
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
    highlights: [
      "AI keyword discovery for your niche",
      "Profile completeness guidance",
      "Rich snippets & link hygiene checklist",
      "Multi-platform tips (LinkedIn, Google, personal site)",
    ],
    metrics: [
      { label: "Search Visibility", value: "A+" },
      { label: "Priority Keywords", value: "12" },
      { label: "Profile Score", value: "94%" },
    ],
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
    <section className="container mx-auto py-12">
      <div className="mb-2 flex items-center gap-2">
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
        {/* Left: vertical selector (buttons) */}
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
            <Link to={tool.href}>
              <Button className="whitespace-nowrap">{tool.cta}</Button>
            </Link>
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
              <p className="mt-3 text-xs text-muted-foreground">
                *Example data; connect backend to power live insights.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border px-2 py-1">Privacy-minded</span>
            <span className="rounded-full border px-2 py-1">Designed for Outcomes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
