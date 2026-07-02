import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { rankingService } from "../services/apiClient"

export default function LandingPage() {
  const navigate = useNavigate()
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">("checking")

  useEffect(() => {
    let mounted = true
    const checkApi = async () => {
      try {
        await rankingService.checkHealth()
        if (mounted) setApiStatus("online")
      } catch (e) {
        if (mounted) setApiStatus("offline")
      }
    }
    checkApi()
    
    // Setup intersection observer for staggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    
    document.querySelectorAll('.animate-in-view, .stagger-in').forEach(el => observer.observe(el))
    
    return () => { mounted = false; observer.disconnect() }
  }, [])

  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-lg overflow-hidden pt-2xl">
        {/* Background Decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-[#E8F3FF] rounded-full blur-[100px] mix-blend-multiply"></div>
        </div>

        <div className="z-10 max-w-container-max mx-auto w-full flex flex-col items-center justify-center mt-xl">
          <div className="text-center flex flex-col items-center animate-in-view visible">
            <span className="inline-block bg-[#E8F3FF] text-primary font-bold text-[11px] uppercase tracking-wider px-sm py-xs rounded mb-md">V2.4 Powered by Neural Match</span>
            <h1 className="font-display text-[64px] leading-[1.1] text-[#111827] font-bold mb-md tracking-tight">
              Hire Smarter.<br/>Hire Faster.
            </h1>
            <p className="font-body-lg text-[18px] text-[#4B5563] max-w-xl mx-auto mb-xl leading-relaxed">
              Find the most relevant candidates with intelligent resume analysis. Our human-centric AI identifies talent depth where others see keywords.
            </p>
            <div className="flex flex-wrap justify-center gap-md mb-xl">
              <button onClick={() => navigate("/job")} className="bg-[#0D47A1] text-white font-bold text-label-md px-2xl py-md rounded-lg hover:bg-[#1565C0] transition-colors shadow-md">
                Start Analysis
              </button>
              <button className="bg-white border border-outline-variant text-[#374151] font-bold text-label-md px-2xl py-md rounded-lg hover:bg-surface-container transition-colors shadow-sm">
                Learn More
              </button>
            </div>
            {/* Backend Status Card */}
            <div className="animate-in-view visible mt-lg">
              <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant rounded-xl p-md flex items-center gap-md max-w-[240px] shadow-sm mx-auto">
                <div className="relative flex h-3 w-3">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${apiStatus === 'online' ? 'bg-[#059669] animate-ping' : apiStatus === 'checking' ? 'bg-outline-variant animate-pulse' : 'bg-error'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${apiStatus === 'online' ? 'bg-[#059669]' : apiStatus === 'checking' ? 'bg-outline-variant' : 'bg-error'}`}></span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] text-[#111827] font-bold">API Status</span>
                  <span className="text-[12px] text-[#4B5563]">
                    {apiStatus === 'online' ? 'Systems Operational' : apiStatus === 'checking' ? 'Checking connection...' : 'System Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-xl bg-white border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-xl text-center">
            <div className="flex flex-col items-center">
              <span className="text-[32px] font-bold text-[#0D47A1] mb-xs">10k+</span>
              <span className="text-[14px] text-[#4B5563]">Resumes Processed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[32px] font-bold text-[#0D47A1] mb-xs">94%</span>
              <span className="text-[14px] text-[#4B5563]">Match Accuracy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[32px] font-bold text-[#0D47A1] mb-xs">4.2x</span>
              <span className="text-[14px] text-[#4B5563]">Faster Screening</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[32px] font-bold text-[#0D47A1] mb-xs">500+</span>
              <span className="text-[14px] text-[#4B5563]">Enterprise Teams</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-3xl bg-background">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="text-center max-w-2xl mx-auto mb-2xl">
            <h2 className="text-[32px] font-bold text-[#111827] mb-md">Precision Hiring Ecosystem</h2>
            <p className="text-[16px] text-[#4B5563]">Elevate your talent acquisition strategy with tools designed for high-performance HR teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
            {/* Semantic Analysis */}
            <div className="bg-white p-xl rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#E8F3FF] text-[#0D47A1] flex items-center justify-center mb-lg">
                <span className="material-symbols-outlined text-[24px]">troubleshoot</span>
              </div>
              <h3 className="text-[18px] font-bold text-[#111827] mb-sm">Semantic Analysis</h3>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">Beyond keywords, our AI understands the nuance of experience, soft skills, and career progression paths.</p>
            </div>

            {/* Bias Suppression */}
            <div className="bg-white p-xl rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-lg">
                <span className="material-symbols-outlined text-[24px]">psychology_alt</span>
              </div>
              <h3 className="text-[18px] font-bold text-[#111827] mb-sm">Bias Suppression</h3>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">Human-centric AI focuses purely on merit, missing unconscious bias throughout the screening funnel.</p>
            </div>

            {/* Instant Shortlisting */}
            <div className="bg-white p-xl rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-lg">
                <span className="material-symbols-outlined text-[24px]">flash_on</span>
              </div>
              <h3 className="text-[18px] font-bold text-[#111827] mb-sm">Instant Shortlisting</h3>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">Process 500+ resumes in seconds. Navigates a curated list of the most qualified candidates automatically.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-lg">
            {/* Data Driven */}
            <div className="md:col-span-3 bg-[#1F2937] p-2xl rounded-2xl text-white shadow-md flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-md">Executive Suite</span>
              <h3 className="text-[28px] font-bold mb-md">Data Driven Decision Making</h3>
              <p className="text-[16px] text-[#D1D5DB] max-w-md">Gain visibility into your recruitment pipeline with real-time analytics and predictive hiring insights.</p>
            </div>

            {/* Features */}
            <div className="md:col-span-2 bg-[#2563EB] p-xl rounded-2xl text-white shadow-md flex flex-col justify-center gap-lg">
              <div className="flex gap-md">
                <span className="material-symbols-outlined text-[24px] text-white/80 mt-1">rocket_launch</span>
                <div>
                  <h4 className="font-bold text-[16px] mb-xs">Scale Fast</h4>
                  <p className="text-[14px] text-white/80">Handle surges in applications without compromising on quality.</p>
                </div>
              </div>
              <div className="flex gap-md">
                <span className="material-symbols-outlined text-[24px] text-white/80 mt-1">shield</span>
                <div>
                  <h4 className="font-bold text-[16px] mb-xs">GDPR Secure</h4>
                  <p className="text-[14px] text-white/80">Enterprise-grade encryption for sensitive candidate data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-3xl px-lg">
        <div className="max-w-4xl mx-auto bg-[#EEF2FF] rounded-[32px] p-2xl text-center shadow-sm border border-[#E0E7FF]">
          <h2 className="text-[32px] font-bold text-[#111827] mb-md">Ready to transform your hiring?</h2>
          <p className="text-[16px] text-[#4B5563] mb-xl max-w-xl mx-auto">
            Join the ranks of high-growth companies using TalentMind AI to build their dream teams.
          </p>
          <div className="flex flex-wrap justify-center gap-md">
            <button onClick={() => navigate("/job")} className="bg-[#0D47A1] text-white font-bold text-label-md px-2xl py-md rounded-lg hover:bg-[#1565C0] transition-colors shadow-md">
              Create Free Account
            </button>
            <button className="bg-white border border-outline-variant text-[#374151] font-bold text-label-md px-2xl py-md rounded-lg hover:bg-surface-container transition-colors shadow-sm">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
