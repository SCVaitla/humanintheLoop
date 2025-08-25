import { useState } from "react";
import Profile360 from "@/components/sections/Profile360";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Eye, Sparkles, FileText, Zap, Target } from "lucide-react";

interface ResumeSection {
  id: string;
  title: string;
  content: string;
  suggestions?: string[];
}

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [resumeGenerated, setResumeGenerated] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    jobTitle: "",
    targetRole: "",
    experience: "",
    skills: "",
    education: "",
    projects: "",
    achievements: "",
    template: "modern"
  });

  // Resume sections
  const [resumeSections, setResumeSections] = useState<ResumeSection[]>([]);

  const templates = [
    { id: "modern", name: "Modern Professional", description: "Clean, contemporary design" },
    { id: "classic", name: "Classic Business", description: "Traditional, conservative layout" },
    { id: "creative", name: "Creative Designer", description: "Bold, visually striking format" },
    { id: "tech", name: "Tech Specialist", description: "Developer-focused with skills emphasis" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateResume = async () => {
    setLoading(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock AI-generated sections
    const mockSections: ResumeSection[] = [
      {
        id: "summary",
        title: "Professional Summary",
        content: `Dynamic ${formData.targetRole || 'professional'} with proven expertise in driving results through innovative solutions. Demonstrated ability to leverage technical skills and strategic thinking to exceed objectives and deliver value to organizations.`,
        suggestions: [
          "Consider adding specific years of experience",
          "Include 1-2 quantifiable achievements",
          "Mention key industry-relevant skills"
        ]
      },
      {
        id: "experience",
        title: "Professional Experience",
        content: formData.experience || "Experience section will be enhanced based on your input",
        suggestions: [
          "Use action verbs to start each bullet point",
          "Include metrics and numbers where possible",
          "Focus on achievements rather than responsibilities"
        ]
      },
      {
        id: "skills",
        title: "Core Competencies",
        content: formData.skills || "Technical and soft skills will be organized strategically",
        suggestions: [
          "Group skills by category (Technical, Leadership, etc.)",
          "Prioritize skills relevant to target role",
          "Consider adding proficiency levels"
        ]
      }
    ];

    setResumeSections(mockSections);
    setResumeGenerated(true);
    setLoading(false);
  };

  const exportResume = (format: 'pdf' | 'docx') => {
    // Mock export functionality
    console.log(`Exporting resume as ${format.toUpperCase()}`);
  };

  return (
    <section className="container mx-auto py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Resume Builder
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Create a professional, ATS-optimized resume in minutes. Our AI analyzes your experience and suggests improvements for maximum impact.
        </p>
      </div>

      {/* Feature highlights */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Sparkles className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold mb-2">AI-Powered Optimization</h3>
            <p className="text-sm text-muted-foreground">Smart suggestions to improve impact and readability</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Target className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <h3 className="font-semibold mb-2">ATS-Friendly</h3>
            <p className="text-sm text-muted-foreground">Optimized for applicant tracking systems</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Zap className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold mb-2">Multiple Formats</h3>
            <p className="text-sm text-muted-foreground">Export as PDF, DOCX, or shareable link</p>
          </CardContent>
        </Card>
      </div>

      {/* Hero Section with CTA */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="mb-8">
          <p className="text-lg text-muted-foreground mb-6">
            Create professional, ATS-optimized resumes that stand out to employers. Our AI analyzes your experience and optimizes every section for maximum impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Building Resume
            </Button>
            <Button variant="outline" size="lg">
              View Templates
            </Button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Resume Writing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Action Verbs</h4>
              <p className="text-xs text-muted-foreground">Start bullets with: Led, Developed, Implemented, Achieved, Optimized</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Quantify Results</h4>
              <p className="text-xs text-muted-foreground">Include numbers: "Increased sales by 25%" vs "Increased sales"</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Keywords</h4>
              <p className="text-xs text-muted-foreground">Use job posting keywords to pass ATS screening</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Length</h4>
              <p className="text-xs text-muted-foreground">Keep to 1-2 pages; prioritize relevant experience</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="my-10 h-px bg-border" />
      <Profile360 />
    </section>
  );
}