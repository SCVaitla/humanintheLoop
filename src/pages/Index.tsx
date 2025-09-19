// src/pages/Index.tsx
import Hero from "@/components/sections/Hero";
import Profile360 from "@/components/sections/Profile360";

import ToolsShowcase from "@/components/sections/ToolsShowcase";

export default function Index() {
  return (
    <>
      <Hero />
      <ToolsShowcase />
      <Profile360 />
    </>
  );
}