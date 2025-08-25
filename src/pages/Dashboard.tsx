import AppLayout from "@/components/layout/AppLayout";

const Dashboard = () => {
  return (
    <AppLayout>
      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Sign in to see personalized tools, history, and insights.</p>
      </section>
    </AppLayout>
  );
};

export default Dashboard;