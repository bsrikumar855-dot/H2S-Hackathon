import HeroSection from "./components/HeroSection"
import AboutSection from "./components/AboutSection"
import FeaturedVideoSection from "./components/FeaturedVideoSection"
import PhilosophySection from "./components/PhilosophySection"
import ServicesSection from "./components/ServicesSection"

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-white/20 selection:text-white">
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      
      <footer className="border-t border-white/10 bg-black py-12 text-center">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-white">TalentMind AI</span>
          </div>
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} TalentMind AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/50 transition-colors hover:text-white">Privacy</a>
            <a href="#" className="text-sm text-white/50 transition-colors hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
