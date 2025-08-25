import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, Building2, BookOpen, FlaskConical, Landmark } from "lucide-react";

const items = [
  { title: "Students", icon: GraduationCap, desc: "Study assist, notes, and project helpers." },
  { title: "Job Seekers", icon: Briefcase, desc: "Resume, cover letters, interview prep." },
  { title: "SMBs", icon: Building2, desc: "Business plans, posts, and copywriting." },
  { title: "Educators", icon: BookOpen, desc: "Lesson planning, rubrics, feedback." },
  { title: "Researchers", icon: FlaskConical, desc: "Summaries, insights, data helpers." },
  { title: "Enterprises", icon: Landmark, desc: "Secure AI workflows at scale." },
];

const AudienceGrid = () => {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">Built for everyone</h2>
        <p className="mt-2 text-muted-foreground max-w-prose">Tailored AI experiences for different needs and goals.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="glass-card transition-all hover:shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <item.icon className="h-5 w-5 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceGrid;