import AppLayout from "@/components/layout/AppLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BusinessPlanner = () => {
  return (
    <AppLayout>
      <section className="container mx-auto py-12 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Business Planner</h1>
        <p className="mt-2 text-muted-foreground">Describe your idea; get a lean plan outline.</p>
        <div className="mt-8 space-y-4">
          <Input placeholder="Business name" />
          <Textarea placeholder="Describe your idea, audience, and goals" rows={8} />
          <Button className="w-full">Create Plan (connect backend)</Button>
        </div>
      </section>
    </AppLayout>
  );
};

export default BusinessPlanner;