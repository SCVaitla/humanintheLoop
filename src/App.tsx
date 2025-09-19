// src/App.tsx
import { Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ResumeBuilder from "@/pages/tools/ResumeBuilder";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Index />} />
        <Route path="tools">
          <Route path="resume-builder" element={<ResumeBuilder />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}