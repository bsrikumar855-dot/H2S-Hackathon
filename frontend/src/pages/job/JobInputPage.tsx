import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, FileText, Lightbulb, Network, Sparkles } from "lucide-react"
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
    <div className="tm-shell">
      <TopBar />
      <SideNav active="job" />
      <main className="tm-content-with-sidebar tm-topbar-offset min-h-screen px-4 py-8 md:px-12">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => navigate("/")}
            className="mb-8 flex items-center gap-2 text-sm text-[var(--tm-muted)] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>

          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-md border border-indigo-300/20 bg-indigo-400/10 px-3 py-1 tm-label text-[var(--tm-primary)]">
                Step 1 of 3
              </span>
              <div className="h-px flex-1 bg-white/10">
                <div className="h-px w-1/3 bg-[var(--tm-primary)]" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Define Job Requirements</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-[var(--tm-muted)]">
              Paste the position description. The engine extracts competencies, cultural markers, and technical
              requirements automatically.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <section className="tm-card rounded-xl p-6 lg:col-span-8">
              <div className="mb-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <label>
                  <span className="tm-label mb-2 block">Job Title</span>
                  <input
                    className="tm-input px-4 py-3"
                    value={jobTitle}
                    onChange={(event) => {
                      setJobTitle(event.target.value)
                      setError("")
                    }}
                    placeholder="e.g. Senior Full-Stack AI Engineer"
                  />
                </label>
                <button onClick={handlePreFill} className="tm-secondary-btn rounded-lg px-4 py-3 text-sm font-bold">
                  Generate Sample
                </button>
              </div>

              <div className="mb-3 flex items-center justify-between gap-4">
                <label className="tm-label flex items-center gap-2" htmlFor="job-description">
                  <FileText className="h-4 w-4 text-[var(--tm-primary)]" /> Job Description Input
                </label>
                <span className="tm-mono text-xs text-[var(--tm-muted)]">
                  {jobDescription.length.toLocaleString()} / 10,000 characters
                </span>
              </div>
              <textarea
                id="job-description"
                className="tm-input min-h-[380px] resize-none p-5 leading-7"
                value={jobDescription}
                onChange={(event) => {
                  setJobDescription(event.target.value)
                  setError("")
                }}
                placeholder="Paste the complete job description..."
                maxLength={10000}
              />

              {error && (
                <div className="mt-4 rounded-lg border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <button onClick={handlePreFill} className="flex items-center gap-2 text-sm text-[var(--tm-muted)] hover:text-white">
                  <Sparkles className="h-4 w-4" /> Use template
                </button>
                <button onClick={handleContinue} className="tm-primary-btn flex items-center justify-center gap-2 rounded-lg px-7 py-3 font-bold">
                  Continue to Upload <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </section>

            <aside className="space-y-6 lg:col-span-4">
              <div className="tm-card rounded-xl p-6">
                <h2 className="mb-5 flex items-center gap-2 font-bold text-[var(--tm-primary)]">
                  <Lightbulb className="h-5 w-5" /> Extraction Tips
                </h2>
                <ul className="space-y-4 text-sm leading-6 text-[var(--tm-muted)]">
                  {[
                    "Include the technical stack and specific tool requirements.",
                    "Mention soft skills and cultural markers for fit scoring.",
                    "State experience expectations when seniority matters.",
                  ].map((tip) => (
                    <li key={tip} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-indigo-300/20 bg-indigo-400/10 text-[var(--tm-primary)]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tm-card relative min-h-[260px] overflow-hidden rounded-xl p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_20rem)]" />
                <div className="relative mt-24">
                  <p className="tm-label text-[var(--tm-primary)]">AI Insight</p>
                  <p className="mt-2 text-sm italic leading-6 text-white">
                    Well-structured JDs increase resume match accuracy by 42%.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function TopBar() {
  return (
    <header className="tm-topbar">
      <div className="flex h-full items-center justify-between px-4 md:px-12">
        <div className="flex items-center gap-3">
          <Network className="h-7 w-7 text-[var(--tm-primary)]" />
          <span className="tm-gradient-text text-2xl font-bold">TalentMind AI</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2">
          <span className="tm-status-dot" />
          <span className="tm-label text-[var(--tm-tertiary)]">System Online</span>
        </div>
      </div>
    </header>
  )
}

function SideNav({ active }: { active: "job" | "upload" | "dashboard" }) {
  const navigate = useNavigate()
  const itemClass = (key: string) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
      active === key ? "border-r-2 border-[var(--tm-primary)] bg-indigo-400/10 text-[var(--tm-primary)]" : "text-[var(--tm-muted)] hover:bg-white/5 hover:text-white"
    }`

  return (
    <aside className="tm-sidebar px-4 py-6 pt-24">
      <nav className="flex flex-col gap-2">
        <button onClick={() => navigate("/dashboard")} className={itemClass("dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/job")} className={itemClass("job")}>Job Analysis</button>
        <button onClick={() => navigate("/candidates")} className={itemClass("upload")}>Resume Parser</button>
        <span className="rounded-lg px-3 py-3 text-sm text-[var(--tm-muted)]">Talent Pipeline</span>
        <span className="rounded-lg px-3 py-3 text-sm text-[var(--tm-muted)]">Settings</span>
      </nav>
    </aside>
  )
}
