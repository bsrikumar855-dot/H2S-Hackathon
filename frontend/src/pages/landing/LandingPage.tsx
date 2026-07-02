import { useEffect, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, BrainCircuit, CheckCircle2, Database, Gauge, ListOrdered, Network, Rocket, Search, ShieldCheck, Sparkles, Users } from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()
  const [processed, setProcessed] = useState(9840)
  const [accuracy, setAccuracy] = useState(91)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProcessed((value) => (value >= 10000 ? 9840 : value + 20))
      setAccuracy((value) => (value >= 94 ? 91 : value + 1))
    }, 900)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="tm-page">
      <header className="tm-topbar">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 md:px-8">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--tm-primary)] text-white">
              <Network className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold text-[var(--tm-primary)]">TalentMind AI</span>
          </button>
          <nav className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-semibold text-[var(--tm-primary)]" href="#top">Home</a>
            <a className="text-sm font-semibold text-[var(--tm-muted)] transition hover:text-[var(--tm-primary)]" href="#features">Features</a>
            <a className="text-sm font-semibold text-[var(--tm-muted)] transition hover:text-[var(--tm-primary)]" href="#stats">Performance</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/job")} className="hidden rounded-lg px-4 py-2 text-sm font-bold text-[var(--tm-text)] transition hover:bg-[var(--tm-surface-low)] sm:block">
              Sign In
            </button>
            <button onClick={() => navigate("/job")} className="tm-primary-btn rounded-lg px-5 py-2 text-sm font-bold">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="tm-topbar-offset">
        <section className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden px-4 py-16 md:px-8">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="tm-float absolute -right-24 -top-24 h-[560px] w-[560px] rounded-full bg-[var(--tm-primary-soft)] blur-[120px]" />
            <div className="tm-float absolute -bottom-32 -left-24 h-[460px] w-[460px] rounded-full bg-[var(--tm-tertiary-soft)] blur-[105px]" style={{ animationDirection: "reverse" }} />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-12">
            <div className="tm-slide-up flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--tm-primary-soft)] px-4 py-2 text-xs font-bold uppercase tracking-[0.05em] text-[var(--tm-primary)]">
                <Sparkles className="h-4 w-4" /> V2.4 powered by Neural Match
              </span>
              <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight text-[var(--tm-text)] md:text-7xl">
                Hire Smarter. <br /> Hire Faster.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--tm-muted)]">
                Find the most relevant candidates with intelligent resume analysis. Human-centric AI identifies talent depth where others see keywords.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button onClick={() => navigate("/job")} className="tm-primary-btn flex items-center gap-2 rounded-lg px-8 py-4 font-bold">
                  Start Analysis <ArrowRight className="h-5 w-5" />
                </button>
                <button onClick={() => navigate("/candidates")} className="tm-secondary-btn rounded-lg px-8 py-4 font-bold">
                  Load Demo
                </button>
              </div>
              <div className="tm-card mt-12 flex max-w-xs items-center gap-4 rounded-xl p-4">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--tm-tertiary)] opacity-70" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--tm-tertiary)]" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-extrabold uppercase tracking-[0.05em] text-[var(--tm-text)]">API Status</p>
                  <p className="flex items-center gap-1 text-sm text-[var(--tm-muted)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--tm-tertiary)]" /> Systems Operational
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stats" className="border-y border-[var(--tm-border)] bg-white py-12">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-4 text-center md:grid-cols-4 md:px-8">
            <Stat value={`${processed.toLocaleString()}+`} label="Resumes Processed" />
            <Stat value={`${accuracy}%`} label="Match Accuracy" />
            <Stat value="4.2x" label="Faster Screening" />
            <Stat value="500+" label="Enterprise Teams" />
          </div>
        </section>

        <section id="features" className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
          <div className="tm-slide-up mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-[var(--tm-text)]">Precision Hiring Ecosystem</h2>
            <p className="mt-3 leading-7 text-[var(--tm-muted)]">Elevate your talent acquisition strategy with tools designed for high-performance HR teams.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Feature icon={<Search className="h-6 w-6" />} title="Semantic Analysis" text="Beyond keywords: understand the nuance of experience, soft skills, and career progression." />
            <Feature icon={<ShieldCheck className="h-6 w-6" />} title="Bias Suppression" text="Focus scoring on evidence, skills, and role fit throughout the screening funnel." />
            <Feature icon={<Rocket className="h-6 w-6" />} title="Instant Shortlisting" text="Process uploaded resumes and receive a ranked list through the existing agent pipeline." />
          </div>
          <div className="mt-6 flex justify-center">
            <div className="tm-card flex w-full max-w-2xl rounded-3xl bg-[var(--tm-primary-soft)] p-10">
              <div className="my-auto w-full space-y-8">
                <ValueRow icon={<Rocket />} title="Scale Fast" text="Handle surges in applications without losing quality." />
                <div className="h-px bg-[var(--tm-primary)]/20" />
                <ValueRow icon={<Users />} title="Recruit Better" text="Keep every existing upload, ranking, and dashboard workflow intact." />
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
          <div className="tm-slide-up mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-[var(--tm-text)]">Multi-Agent AI Workflow</h2>
            <p className="mt-3 leading-7 text-[var(--tm-muted)]">Our platform leverages a sophisticated LangGraph pipeline to analyze and rank candidates objectively.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Feature icon={<Database className="h-6 w-6" />} title="1. Resume Ingestion" text="Extracts structured data, skills, and experience metrics from varied resume formats." />
            <Feature icon={<BrainCircuit className="h-6 w-6" />} title="2. Neural Evaluation" text="Our specialized LLM agents assess technical fit and domain expertise against the job criteria." />
            <Feature icon={<ListOrdered className="h-6 w-6" />} title="3. Objective Ranking" text="Provides a synthesized final score and clear justification for every candidate." />
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--tm-border)] bg-white py-12 text-center">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            <Network className="h-6 w-6 text-[var(--tm-primary)]" />
            <span className="text-lg font-extrabold text-[var(--tm-primary)]">TalentMind AI</span>
          </div>
          <p className="text-sm text-[var(--tm-muted)]">
            © {new Date().getFullYear()} TalentMind AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[var(--tm-muted)] hover:text-[var(--tm-primary)]">Privacy</a>
            <a href="#" className="text-sm text-[var(--tm-muted)] hover:text-[var(--tm-primary)]">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CandidatePreview({ name, score, tone }: { name: string; score: string; tone: "primary" | "secondary" }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[var(--tm-surface-low)] p-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--tm-surface-high)] font-bold text-[var(--tm-primary)]">{name[0]}</div>
      <div className="h-4 flex-1 rounded bg-[var(--tm-border)]/35" />
      <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${tone === "primary" ? "bg-[var(--tm-primary)]" : "bg-[var(--tm-secondary)]"}`}>{score}</span>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="tm-count-pop p-6">
      <p className="text-3xl font-extrabold text-[var(--tm-primary)]">{value}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--tm-muted)]">{label}</p>
    </div>
  )
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="tm-card tm-slide-up rounded-2xl bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl">
      <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--tm-primary-soft)] text-[var(--tm-primary)]">{icon}</span>
      <h3 className="text-xl font-bold text-[var(--tm-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--tm-muted)]">{text}</p>
    </article>
  )
}

function ValueRow({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-[var(--tm-primary)] [&>svg]:h-9 [&>svg]:w-9">{icon}</span>
      <div>
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-[var(--tm-muted)]">{text}</p>
      </div>
    </div>
  )
}
