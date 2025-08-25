import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ResearchSummarizer = () => {
  return (
    <section className="container mx-auto py-12 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Research Summarizer</h1>
      <p className="mt-2 text-muted-foreground">Paste text or upload a paper to get structured summaries.</p>
      <div className="mt-8 space-y-4">
        <Textarea placeholder="Paste research text or abstract…" rows={10} />
        <Button className="w-full">Summarize (connect backend)</Button>
      </div>
    </section>
  );
};

export default ResearchSummarizer;