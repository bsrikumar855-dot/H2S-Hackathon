import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"

export default function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      title: "Semantic Matching",
      description: "Deep contextual analysis of candidates' expertise, mapping capabilities beyond exact keyword syntax matches.",
      icon: (
        <svg className="h-6 w-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Behavioral Intelligence",
      description: "Evaluate active job-seeking activity, certification updates, response rates, and GitHub commits to prioritize outreach.",
      icon: (
        <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Explainable Ranking",
      description: "A transparent scoring breakdown of how suitability scores are calculated across semantic, experience, and behavioral metrics.",
      icon: (
        <svg className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Skill Gap Analysis",
      description: "Instantly map core matched skills, missing criteria, and transferable knowledge tags with recruiter-friendly justifications.",
      icon: (
        <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-[#030014] text-gray-200 antialiased font-sans relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.22),transparent_55%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none z-0" />

      {/* Main hero segment */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 py-16 max-w-6xl mx-auto w-full">
        
        {/* Logo tag */}
        <div className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-950/20 shadow-lg shadow-violet-500/5 animate-pulse">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          <span className="text-[10px] sm:text-xs font-semibold text-violet-300 uppercase tracking-widest font-mono">AI-Powered Recruitment Suite</span>
        </div>

        {/* Hero title */}
        <div className="text-center space-y-4 max-w-3xl">
          <h2 className="text-sm font-semibold text-violet-400 font-mono tracking-wider uppercase">AI Recruiter</h2>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-400">
            Beyond Keywords. <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">Beyond Resumes.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed pt-2">
            Rank candidates using semantic intelligence, behavioral insights, and explainable AI. Understand true potential rather than simple keyword lists.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate("/job")}
            className="px-8 py-4 text-base font-semibold tracking-wide rounded-xl shadow-xl shadow-violet-600/20 relative overflow-hidden group hover:scale-[1.03] transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Ranking Candidates
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Button>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="rounded-xl border border-white/5 bg-[#0a0720]/40 backdrop-blur-md p-6 hover:bg-[#0a0720]/60 hover:border-violet-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-violet-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white tracking-wide">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Mini Footer */}
      <footer className="w-full border-t border-white/5 py-6 text-center text-xs text-gray-500 font-mono relative z-10">
        AI Candidate Ranking Engine. Strictly for Hackathon Demonstration.
      </footer>

    </div>
  )
}
