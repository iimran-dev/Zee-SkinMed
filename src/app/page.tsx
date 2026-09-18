import { Navbar } from "@/components/skinmed/sections/Navbar";
import { Hero } from "@/components/skinmed/sections/Hero";
import { TrustStats } from "@/components/skinmed/sections/TrustStats";
import { DoctorSection } from "@/components/skinmed/sections/DoctorSection";
import { TreatmentSection } from "@/components/skinmed/sections/TreatmentSection";
import { AdvancedCare } from "@/components/skinmed/sections/AdvancedCare";
import { ResultsSection } from "@/components/skinmed/sections/ResultsSection";
import { AISkinAnalysis } from "@/components/skinmed/sections/AISkinAnalysis";
import { ClinicGallery } from "@/components/skinmed/sections/ClinicGallery";
import { Testimonials } from "@/components/skinmed/sections/Testimonials";
import { FaqLocation } from "@/components/skinmed/sections/FaqLocation";
import { ConsultationCTA } from "@/components/skinmed/sections/ConsultationCTA";
import { Footer } from "@/components/skinmed/sections/Footer";
import { FloatingActions, CursorGlow } from "@/components/skinmed/sections/FloatingActions";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-skinmed-ivory text-skinmed-charcoal">
      <CursorGlow />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStats />
        <DoctorSection />
        <TreatmentSection />
        <AdvancedCare />
        <ResultsSection />
        <AISkinAnalysis />
        <ClinicGallery />
        <Testimonials />
        <FaqLocation />
        <ConsultationCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
