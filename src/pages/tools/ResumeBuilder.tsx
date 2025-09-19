import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Target, Zap } from "lucide-react";

export default function ResumeBuilder() {
  const handleStartResumeBuilder = () => {
    window.location.href = 'https://profile360.aification.ai';
  };

  const handleViewTemplates = () => {
    // Redirect to templates page of second project  
    window.location.href = 'http://localhost:3000/templates';
  };

  return (
    <section className="container mx-auto py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Profile 360
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
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleStartResumeBuilder}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Building Resume
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
    </section>
  );
}