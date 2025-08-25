// src/App.tsx
import { Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";
import NotFound from "@/pages/NotFound";
import ResumeBuilder from "@/pages/tools/ResumeBuilder";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

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
