import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle2, Circle, Loader2, Network, X } from "lucide-react"
import { useRecruitment } from "../../context/RecruitmentContext"

const stepLabels = [
  "Understanding Job",
  "Reading Resumes",
  "Generating Embeddings",
  "Semantic Matching",
  "Behavior Analysis",
  "Ranking Candidates",
  "Generating Explanations",
]

export default function AIProcessingPage() {
  const navigate = useNavigate()
  const { executeRanking, apiError } = useRecruitment()
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  const circumference = 2 * Math.PI * 45
  const dashOffset = circumference - (progress / 100) * circumference
  const statusMessage = useMemo(() => stepLabels[Math.min(activeStep, stepLabels.length - 1)] || "Analysis Engine", [activeStep])

  const runPipeline = () => {
    setErrorMessage("")
    setProgress(0)
    setActiveStep(0)

    const timer = window.setInterval(() => {
      setActiveStep((step) => Math.min(step + 1, 5))
      setProgress((value) => Math.min(value + 13, 84))
    }, 450)

    executeRanking()
      .then(() => {
        window.clearInterval(timer)
        setActiveStep(stepLabels.length)
        setProgress(100)
        window.setTimeout(() => navigate("/dashboard"), 850)
      })
      .catch((err: any) => {
        window.clearInterval(timer)
        setErrorMessage(err.message || apiError || "The agent workflow could not complete.")
      })
  }

  useEffect(() => {
    runPipeline()
  }, [])

  return (
    <div className="tm-page min-h-screen overflow-hidden">
      <header className="tm-topbar">
        <div className="flex h-full items-center justify-between px-4 md:px-12">
          <div className="flex items-center gap-3">
            <Network className="h-7 w-7 text-[var(--tm-primary)]" />
            <span className="tm-gradient-text text-2xl font-bold">TalentMind AI</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <span className="text-sm font-bold text-[var(--tm-primary)]">Job Analysis</span>
            <span className="text-sm text-[var(--tm-muted)]">Talent Pipeline</span>
          </div>
        </div>
      </header>

      <main className="tm-topbar-offset relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="tm-orbit absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.36),rgba(139,92,246,0.16),transparent_68%)]" />

        <div className="relative z-10 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-12">
          <section className="flex flex-col items-center lg:col-span-5">
            <div className="relative flex h-72 w-72 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="var(--tm-primary)"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
              <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full border border-indigo-300/20 bg-[rgba(42,42,44,0.45)] backdrop-blur-md">
                <span className="text-6xl font-bold text-[var(--tm-primary)]">{Math.round(progress)}%</span>
                <span className="tm-label mt-2">Analysis Engine</span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <h1 className="text-2xl font-bold text-white">{errorMessage ? "Pipeline Execution Error" : statusMessage}</h1>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--tm-muted)]">
                Processing language models and semantic clusters to find the strongest candidate matches.
              </p>
            </div>
          </section>

          <section className="lg:col-span-7">
            <div className="tm-card rounded-xl p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="tm-label text-[var(--tm-muted)]">Pipeline Sequence</span>
                <span className="tm-mono rounded-md bg-indigo-400/10 px-3 py-1 text-xs text-[var(--tm-primary)]">EST. TIME: 4.2s</span>
              </div>

              {errorMessage ? (
                <div className="space-y-6">
                  <div className="rounded-xl border border-red-300/20 bg-red-400/10 p-5 text-sm leading-6 text-red-100">
                    {errorMessage}
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button onClick={() => navigate("/candidates")} className="tm-secondary-btn flex-1 rounded-lg px-5 py-3 font-bold">
                      Back to Uploads
                    </button>
                    <button onClick={runPipeline} className="tm-primary-btn flex-1 rounded-lg px-5 py-3 font-bold">
                      Retry Analysis
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative space-y-4">
                  <div className="absolute bottom-4 left-5 top-4 w-px bg-white/10" />
                  {stepLabels.map((label, index) => {
                    const completed = activeStep > index
                    const active = activeStep === index
                    return (
                      <div key={label} className={`relative flex items-start gap-5 ${active || completed ? "opacity-100" : "opacity-45"}`}>
                        <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[var(--tm-surface-high)]">
                          {completed ? (
                            <CheckCircle2 className="h-5 w-5 text-[var(--tm-tertiary)]" />
                          ) : active ? (
                            <Loader2 className="h-5 w-5 animate-spin text-[var(--tm-primary)]" />
                          ) : (
                            <Circle className="h-5 w-5 text-[var(--tm-muted)]" />
                          )}
                        </span>
                        <div className="flex-1 pt-1">
                          <h2 className={`font-semibold ${active ? "text-[var(--tm-primary)]" : "text-white"}`}>{label}</h2>
                          <div className="tm-progress mt-3">
                            <span style={{ width: completed ? "100%" : active ? "66%" : "0%" }} className={active ? "tm-shimmer" : ""} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {!errorMessage && (
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex -space-x-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--tm-surface-low)] bg-indigo-400/20 text-xs font-bold text-[var(--tm-primary)]">A</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--tm-surface-low)] bg-emerald-400/20 text-xs font-bold text-[var(--tm-tertiary)]">B</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--tm-surface-low)] bg-white/10 text-xs font-bold text-white">+24</span>
                  </div>
                  <button onClick={() => navigate("/candidates")} className="tm-secondary-btn flex items-center gap-2 rounded-lg px-5 py-2 text-sm">
                    <X className="h-4 w-4" /> Abort
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
