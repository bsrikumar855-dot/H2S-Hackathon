import TopNav from "./components/TopNav"
import HeroSection from "./components/HeroSection"
import StatsSection from "./components/StatsSection"
import FeaturesSection from "./components/FeaturesSection"
import CTASection from "./components/CTASection"
import AppFooter from "../../components/AppFooter"

export default function LandingPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <TopNav />
      <main className="pt-16">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <AppFooter />
    </div>
  )
}
