import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart3, CheckCircle2, Circle, Clock, Database, FileText, Info, Loader2, Network, Settings, ShieldCheck, User, Users, X } from "lucide-react"
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
  const { executeRanking, apiError, jobTitle, uploadedFiles } = useRecruitment()
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const remaining = useMemo(() => Math.max(0, 165 - Math.round(progress * 1.35)), [progress])
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
    <div className="tm-page bg-black text-white min-h-screen">
      <TopBar />
      <SideNav />
      <main className="tm-content-with-sidebar tm-topbar-offset mx-auto min-h-screen max-w-[1440px] px-4 py-8 md:px-8">
        <section className="tm-slide-up mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold text-[var(--tm-text)] md:text-4xl">{errorMessage ? "Pipeline Execution Error" : "Processing Candidates"}</h1>
              <p className="mt-2 text-[var(--tm-muted)]">Role: {jobTitle || "Active role analysis"} - <span className="font-semibold text-[var(--tm-primary)]">{uploadedFiles.length} resumes queued</span></p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[var(--tm-border)] bg-[var(--tm-surface-low)] px-4 py-2 text-[var(--tm-muted)]">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-semibold">Est. Completion: <span className="text-[var(--tm-text)]">{formatTime(remaining)}</span></span>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-7">
            <div className="tm-card tm-slide-up rounded-2xl p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--tm-primary)] text-white">
                    <BarChart3 className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--tm-text)]">Analysis Progress</h2>
                    <p className="text-sm text-[var(--tm-muted)]">{statusMessage}</p>
                  </div>
                </div>
                <span className="tm-count-pop text-3xl font-extrabold text-[var(--tm-primary)]">{Math.round(progress)}%</span>
              </div>
              <div className="tm-progress h-3">
                <span className={progress < 100 ? "tm-pulse-ring" : ""} style={{ width: `${progress}%` }} />
              </div>

              {errorMessage ? (
                <div className="mt-8 space-y-5">
                  <div className="rounded-2xl border border-[var(--tm-error)]/20 bg-[var(--tm-error-soft)] p-5 text-sm leading-6 text-[var(--tm-error)]">
                    {errorMessage}
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button onClick={() => navigate("/candidates")} className="tm-secondary-btn flex-1 rounded-xl px-5 py-3 font-bold">Back to Uploads</button>
                    <button onClick={runPipeline} className="tm-primary-btn flex-1 rounded-xl px-5 py-3 font-bold">Retry Analysis</button>
                  </div>
                </div>
              ) : (
                <div className="relative mt-8 space-y-5 pl-2">
                  <div className="absolute bottom-5 left-7 top-5 w-px bg-[var(--tm-border)]" />
                  {stepLabels.map((label, index) => {
                    const completed = activeStep > index
                    const active = activeStep === index
                    return (
                      <div key={label} className={`tm-slide-up relative flex items-start gap-5 ${active || completed ? "opacity-100" : "opacity-55"}`} style={{ animationDelay: `${index * 55}ms` }}>
                        <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--tm-border)] bg-[var(--tm-surface)]">
                          {completed ? <CheckCircle2 className="h-5 w-5 text-[var(--tm-tertiary)]" /> : active ? <Loader2 className="h-5 w-5 animate-spin text-[var(--tm-primary)]" /> : <Circle className="h-5 w-5 text-[var(--tm-muted)]" />}
                        </span>
                        <div className="flex-1 pt-1">
                          <h3 className={`font-bold ${active ? "text-[var(--tm-primary)]" : "text-[var(--tm-text)]"}`}>{label}</h3>
                          <div className="tm-progress mt-3">
                            <span className={active ? "tm-pulse-ring" : ""} style={{ width: completed ? "100%" : active ? "66%" : "0%" }} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="tm-card tm-slide-up rounded-2xl p-6" style={{ animationDelay: "140ms" }}>
              <h2 className="mb-5 text-xl font-bold text-[var(--tm-text)]">System Diagnostics</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Diagnostic icon={<ShieldCheck />} text="API Connectivity: Stable" />
                <Diagnostic icon={<Database />} text="Data Integrity: Verified" />
                <Diagnostic icon={<CheckCircle2 />} text="Memory Allocation: Optimal" />
                <Diagnostic icon={<Loader2 className="animate-spin" />} text={`Processing Batch ${Math.max(1, activeStep + 1)}/${stepLabels.length}`} active />
              </div>
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-5">
            <div className="tm-card tm-slide-up rounded-2xl border-dashed p-6" style={{ animationDelay: "180ms" }}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--tm-text)]">Live Preview</h2>
                <span className="rounded bg-[var(--tm-surface-high)] px-3 py-1 text-xs font-bold text-[var(--tm-muted)]">Awaiting Data</span>
              </div>
              <div className="space-y-6">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="tm-shimmer h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="tm-shimmer h-4 w-1/2 rounded" />
                      <div className="tm-shimmer h-3 w-3/4 rounded opacity-70" />
                    </div>
                    <div className="tm-shimmer h-6 w-12 rounded-full" />
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-sm italic text-[var(--tm-muted)]">Insights will appear here as semantic analysis completes.</p>
            </div>

            <div className="tm-card tm-slide-up flex items-start gap-4 rounded-2xl border-[var(--tm-primary)]/20 bg-[var(--tm-primary-soft)]/45 p-5" style={{ animationDelay: "240ms" }}>
              <Info className="h-5 w-5 shrink-0 text-[var(--tm-primary)]" />
              <p className="text-sm leading-6 text-[var(--tm-primary)]">Navigating away from this page will pause the visible analysis experience. Ranking results are saved automatically when the backend completes.</p>
            </div>

            {!errorMessage && (
              <button onClick={() => navigate("/candidates")} className="tm-secondary-btn flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold">
                <X className="h-4 w-4" /> Abort
              </button>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs.toString().padStart(2, "0")}s`
}

function Diagnostic({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[var(--tm-surface-low)] p-4">
      <span className={`[&>svg]:h-5 [&>svg]:w-5 ${active ? "text-[var(--tm-primary)]" : "text-[var(--tm-tertiary)]"}`}>{icon}</span>
      <span className="text-sm font-semibold text-[var(--tm-muted)]">{text}</span>
    </div>
  )
}

function TopBar() {
  const navigate = useNavigate()
  return (
    <header className="tm-topbar">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Network className="h-6 w-6 text-[var(--tm-primary)]" />
          <span className="text-xl font-extrabold text-[var(--tm-primary)]">TalentMind AI</span>
        </button>
      </div>
    </header>
  )
}

function SideNav() {
  const navigate = useNavigate()
  return (
    <aside className="tm-sidebar hidden flex-col p-5 pt-20 md:flex">
      <nav className="flex flex-col gap-1">
        <button onClick={() => navigate("/dashboard")} className="tm-shell-link"><BarChart3 className="h-5 w-5" /> Dashboard</button>
        <button onClick={() => navigate("/job")} className="tm-shell-link"><FileText className="h-5 w-5" /> Jobs</button>
        <button onClick={() => navigate("/candidates")} className="tm-shell-link"><Users className="h-5 w-5" /> Candidates</button>
        <button className="tm-shell-link tm-shell-link-active"><BarChart3 className="h-5 w-5" /> Pipeline</button>
        <button onClick={() => navigate("/profile")} className="tm-shell-link mt-6 border-t border-[var(--tm-border)] pt-6"><User className="h-5 w-5" /> Profile</button>
      </nav>
      <div className="mt-auto rounded-2xl border border-[var(--tm-border)] bg-[var(--tm-surface-low)] p-5">
        <p className="tm-label text-[var(--tm-primary)]">Premium Plan</p>
        <p className="mt-2 text-sm leading-6 text-[var(--tm-muted)]">Human-Centric Intelligence active for 12 roles.</p>
        <button className="tm-primary-btn mt-4 w-full rounded-lg py-2 text-sm font-bold">Upgrade</button>
      </div>
    </aside>
  )
}
