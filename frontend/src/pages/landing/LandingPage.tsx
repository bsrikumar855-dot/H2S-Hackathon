import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Activity, ArrowRight, BrainCircuit, Cloud, Database, Gauge, Network, Sparkles } from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()
  const [demoProgress, setDemoProgress] = useState(28)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDemoProgress((value) => (value > 92 ? 18 : value + 9))
    }, 850)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="tm-page">
      <header className="tm-topbar">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 md:px-12">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-300/20 bg-indigo-400/10">
              <Network className="h-5 w-5 text-[var(--tm-primary)]" />
            </span>
            <span className="tm-gradient-text text-xl font-bold tracking-tight md:text-2xl">TalentMind AI</span>
          </button>
          <div className="flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2">
            <span className="tm-status-dot" />
            <span className="tm-label text-[10px] text-[var(--tm-tertiary)]">System Online</span>
          </div>
        </div>
      </header>

      <main className="tm-topbar-offset mx-auto max-w-[1440px] px-4 pb-20 md:px-12">
        <section className="mx-auto flex min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] max-w-5xl flex-col items-center justify-center text-center py-12 md:py-16">
          <div className="tm-card mb-7 inline-flex items-center gap-2 rounded-full px-5 py-2">
            <Sparkles className="h-4 w-4 text-[var(--tm-primary)]" />
            <span className="tm-label text-[var(--tm-primary)]">Next-Gen Recruitment</span>
          </div>
          <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl xl:text-7xl">
            Hire Smarter with <span className="tm-gradient-text">Neural Intelligence</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--tm-muted)]">
            Understand candidate intent beyond keywords. Map expertise, activity signals, and fit across technical
            dimensions with explainable AI ranking.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/job")}
              className="tm-primary-btn inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-bold transition hover:-translate-y-0.5"
            >
              Start Analysis <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate("/candidates")}
              className="tm-secondary-btn inline-flex items-center justify-center rounded-xl px-8 py-4 font-bold transition"
            >
              View Interactive Demo
            </button>
          </div>
        </section>

        <section className="mt-20 grid grid-cols-1 items-stretch gap-6 md:grid-cols-12">
          <article className="tm-card flex min-h-[320px] flex-col rounded-2xl p-8 md:col-span-8 md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-300/20 bg-indigo-400/10">
              <BrainCircuit className="h-7 w-7 text-[var(--tm-primary)]" />
            </div>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">Intent-Based Matching</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--tm-muted)]">
              Go beyond string matching. TalentMind interprets semantic nuance in resumes to reveal what a candidate
              actually contributes.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <MetricPill label="Relevance Score" value="98.2%" percent={98} />
              <MetricPill label="Bias Reduction" value="Active" percent={100} accent />
            </div>
          </article>

          <article className="tm-card flex min-h-[320px] flex-col rounded-2xl p-8 md:col-span-4 md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10">
              <Gauge className="h-7 w-7 text-[var(--tm-tertiary)]" />
            </div>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">Real-Time Pipeline</h2>
            <p className="mt-4 text-lg leading-8 text-[var(--tm-muted)]">
              Instant parsing and scoring for high-growth teams.
            </p>
            <div className="mt-auto rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="mb-4 flex items-center gap-3">
                <Cloud className="h-5 w-5 text-[var(--tm-primary)]" />
                <span className="text-sm text-white/80">Parsing 1,200 CVs...</span>
              </div>
              <div className="tm-progress">
                <span style={{ width: `${demoProgress}%` }} />
              </div>
            </div>
          </article>
        </section>

        <section className="mx-auto mt-24 max-w-4xl">
          <div className="tm-card rounded-2xl p-8 md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
                  <Database className="h-6 w-6 text-[var(--tm-tertiary)]" /> Infrastructure Health
                </h2>
                <p className="mt-2 text-[var(--tm-muted)]">Real-time node performance and API availability</p>
              </div>
              <div className="tm-mono rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm">
                <span className="text-white/45">GET /health</span>
                <span className="ml-3 font-bold text-[var(--tm-tertiary)]">200 OK</span>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <StatusCard icon={<Cloud className="h-5 w-5" />} title="Edge Gateway" subtitle="Production v2.4" />
              <StatusCard icon={<Activity className="h-5 w-5" />} title="Vector DB" subtitle="Cluster 4 active" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function MetricPill({ label, value, percent, accent = false }: { label: string; value: string; percent: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="tm-label text-[var(--tm-primary)]">{label}</span>
        <span className="tm-mono text-sm font-bold text-[var(--tm-tertiary)]">{value}</span>
      </div>
      <div className="tm-progress">
        <span style={{ width: `${percent}%`, background: accent ? "var(--tm-tertiary)" : undefined }} />
      </div>
    </div>
  )
}

function StatusCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10 text-[var(--tm-tertiary)]">
          {icon}
        </span>
        <div>
          <p className="font-bold text-white">{title}</p>
          <p className="text-sm text-[var(--tm-muted)]">{subtitle}</p>
        </div>
      </div>
      <span className="flex items-center gap-2 text-sm font-bold text-[var(--tm-tertiary)]">
        <span className="tm-status-dot" /> Online
      </span>
    </div>
  )
}
