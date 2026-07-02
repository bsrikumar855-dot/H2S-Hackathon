import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Lightbulb, Menu, Network, Save, Sparkles, Users } from "lucide-react"
import { useRecruitment } from "../../context/RecruitmentContext"

const mockJobTitle = "Senior Full-Stack AI Engineer"
const mockJobDesc = `Position: Senior Full-Stack AI Engineer
Core Stack: React, TypeScript, Tailwind CSS, Python, FastAPI, SQLite, LangGraph

Responsibilities:
- Build state-of-the-art interactive recruiter workflows and dashboards using React and TypeScript.
- Design and integrate multi-agent backend orchestrations using LangGraph and Gemini.
- Implement vector database schemas with SQLite JSON vectors and optimize similarity searches.
- Ensure 100% test coverage for complex agent state transitions and scoring heuristics.

Prerequisites:
- 4+ years of professional full-stack development experience.
- Deep expertise in state management and web application architectures.
- Experience with AI model integration, prompt engineering, or vector spaces.`

export default function JobInputPage() {
  const navigate = useNavigate()
  const { jobTitle, setJobTitle, jobDescription, setJobDescription } = useRecruitment()
  const [error, setError] = useState("")
  const wordCount = useMemo(() => (jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0), [jobDescription])

  const handlePreFill = () => {
    setJobTitle(mockJobTitle)
    setJobDescription(mockJobDesc)
    setError("")
  }

  const handleContinue = () => {
    if (!jobTitle.trim()) {
      setError("Please specify a job title before proceeding.")
      return
    }
    if (jobDescription.trim().length < 100) {
      setError("Please enter a valid job description with at least 100 characters.")
      return
    }
    navigate("/candidates")
  }

  return (
    <div className="tm-page">
      <TopBar />
      <main className="tm-topbar-offset mx-auto flex min-h-screen max-w-[1440px] flex-col gap-8 px-4 py-8 lg:flex-row lg:px-8">
        <aside className="tm-slide-up w-full shrink-0 space-y-6 lg:w-[280px]">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm font-semibold text-[var(--tm-muted)] transition hover:text-[var(--tm-primary)]">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>
          <div className="rounded-2xl bg-[var(--tm-surface-low)] p-5">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--tm-primary)]">
              <Lightbulb className="h-5 w-5" /> Writing Guide
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--tm-muted)]">Effective job descriptions attract more qualified candidates.</p>
            <div className="mt-5 space-y-2">
              <Tip title="Be Specific" text="Outline day-to-day tasks clearly." />
              <Tip title="Culture Matters" text="Mention values and team expectations." />
              <Tip title="Inclusion" text="Use clear, neutral language." />
            </div>
          </div>
          <div className="group relative h-52 overflow-hidden rounded-2xl bg-[var(--tm-text)]">
            <img src="/inspiration_bg.png" alt="Inspiration" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-5 z-10">
              <p className="text-sm font-bold leading-6 text-white drop-shadow-md">Need inspiration? Use the sample generator for a head start.</p>
            </div>
          </div>
        </aside>

        <section className="tm-slide-up flex flex-1 flex-col items-center gap-6" style={{ animationDelay: "120ms" }}>
          <div className="tm-glass-card w-full max-w-3xl rounded-3xl p-6 shadow-md md:p-8">
            <header className="mb-8">
              <span className="tm-label text-[var(--tm-primary)]">Step 1 of 3</span>
              <h1 className="mt-3 text-3xl font-bold text-[var(--tm-text)] md:text-4xl">Job Description</h1>
              <p className="mt-2 leading-7 text-[var(--tm-muted)]">Define the role, expectations, and why someone should join your team.</p>
            </header>

            <div className="space-y-7">
              <label className="block">
                <span className="tm-label mb-2 block">Job Title</span>
                <input
                  className="tm-input px-4 py-4"
                  value={jobTitle}
                  onChange={(event) => {
                    setJobTitle(event.target.value)
                    setError("")
                  }}
                  placeholder="Senior Full-Stack AI Engineer"
                />
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="tm-label flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[var(--tm-primary)]" /> Detailed Description
                  </span>
                  <span className="rounded-full border border-[var(--tm-border)] bg-white/70 px-3 py-1 text-xs font-semibold text-[var(--tm-muted)]">
                    {wordCount} words / {jobDescription.length.toLocaleString()} chars
                  </span>
                </div>
                <textarea
                  id="job-description"
                  className="tm-input min-h-[390px] resize-none p-5 leading-7"
                  value={jobDescription}
                  onChange={(event) => {
                    setJobDescription(event.target.value)
                    setError("")
                  }}
                  placeholder="Paste the complete job description..."
                  maxLength={10000}
                />
              </label>

              {error && (
                <div className="rounded-xl border border-[var(--tm-error)]/20 bg-[var(--tm-error-soft)] px-4 py-3 text-sm font-semibold text-[var(--tm-error)]">
                  {error}
                </div>
              )}

              <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-3">
                  <button onClick={handlePreFill} className="tm-secondary-btn flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold">
                    <Sparkles className="h-4 w-4" /> Generate Sample
                  </button>
                  <button className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[var(--tm-secondary)] transition hover:bg-[var(--tm-surface-low)]">
                    <Save className="h-4 w-4" /> Save Draft
                  </button>
                </div>
                <button onClick={handleContinue} className="tm-primary-btn flex items-center justify-center gap-2 rounded-full px-8 py-3 font-bold">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <p className="max-w-xl text-center text-sm italic leading-6 text-[var(--tm-muted)] opacity-75">
            "The way you describe the role is the first step in the candidate experience. Make it count."
          </p>
        </section>
      </main>
    </div>
  )
}

function TopBar() {
  const navigate = useNavigate()
  return (
    <header className="tm-topbar">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 transition hover:bg-[var(--tm-surface-low)]" aria-label="Menu">
            <Menu className="h-5 w-5 text-[var(--tm-primary)]" />
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <Network className="h-6 w-6 text-[var(--tm-primary)]" />
            <span className="text-xl font-extrabold text-[var(--tm-primary)]">TalentMind AI</span>
          </button>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-[var(--tm-primary-soft)] px-4 py-2 text-sm font-bold text-[var(--tm-primary)] sm:flex">
          <Users className="h-4 w-4" /> Recruiter Workspace
        </div>
      </div>
    </header>
  )
}

function Tip({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-[var(--tm-surface-high)]">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--tm-primary)]" />
      <div>
        <p className="font-bold text-[var(--tm-text)]">{title}</p>
        <p className="text-sm text-[var(--tm-muted)]">{text}</p>
      </div>
    </div>
  )
}
