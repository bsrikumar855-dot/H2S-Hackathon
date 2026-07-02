import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart3, Bell, BriefcaseBusiness, CalendarDays, ChevronDown, Download, FileText, HelpCircle, MessageCircle, Network, Plus, Search, Settings, Share2, TrendingUp, User, Users, X } from "lucide-react"
import { useRecruitment } from "../../context/RecruitmentContext"
import { type RankingRunItem } from "../../services/api"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const exportPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, { 
      scale: 2, 
      useCORS: true,
      backgroundColor: '#f9f9ff',
      onclone: (clonedDoc) => {
        const style = clonedDoc.createElement('style')
        style.innerHTML = '* { animation: none !important; transition: none !important; }'
        clonedDoc.head.appendChild(style)
        
        const title = clonedDoc.getElementById('pdf-title')
        if (title) title.style.display = 'block'
      }
    })
    const imgData = canvas.toDataURL("image/png")
    
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    let heightLeft = pdfHeight
    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
    heightLeft -= pdf.internal.pageSize.getHeight()

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
      heightLeft -= pdf.internal.pageSize.getHeight()
    }

    pdf.save(filename)
  } catch (err) {
    console.error("Failed to generate PDF", err)
  }
}

export default function RankedDashboardPage() {
  const navigate = useNavigate()
  const { apiRankings, jobTitle, clearAll } = useRecruitment()
  const [selectedCandidate, setSelectedCandidate] = useState<RankingRunItem | null>(null)
  const [query, setQuery] = useState("")

  const candidates = useMemo(() => {
    const sorted = [...apiRankings].sort((a, b) => b.score - a.score)
    if (!query.trim()) return sorted
    const q = query.toLowerCase()
    return sorted.filter((candidate) =>
      [
        candidate.candidate.candidate_name,
        candidate.candidate.summary,
        ...candidate.candidate.skills,
        ...candidate.matched_skills,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
  }, [apiRankings, query])

  const total = candidates.length
  const average = total ? Math.round(candidates.reduce((sum, item) => sum + pct(item.score), 0) / total) : 0
  const highest = total ? Math.max(...candidates.map((item) => pct(item.score))) : 0
  const confidence = total ? Math.round(candidates.reduce((sum, item) => sum + pct(item.confidence), 0) / total) : 0
  const topSkills = useMemo(() => getTopSkills(candidates), [candidates])

  if (apiRankings.length === 0) {
    return (
      <div className="tm-page flex min-h-screen items-center justify-center px-4">
        <div className="tm-card max-w-md rounded-2xl bg-white p-8 text-center">
          <Network className="mx-auto mb-4 h-10 w-10 text-[var(--tm-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--tm-text)]">No Evaluation Results</h1>
          <p className="mt-3 leading-6 text-[var(--tm-muted)]">Run a job and candidate analysis to generate the TalentMind dashboard.</p>
          <button onClick={() => navigate("/")} className="tm-primary-btn mt-6 w-full rounded-lg px-5 py-3 font-bold">
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  const handleRestart = () => {
    clearAll()
    navigate("/")
  }

  return (
    <div className="tm-page">
      <SideNav />
      <header className="fixed right-0 top-0 z-40 hidden h-16 items-center justify-between border-b border-[var(--tm-border)] bg-white px-6 md:flex md:left-[280px]">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--tm-muted)]" />
          <input
            className="tm-input rounded-full bg-[var(--tm-surface-low)] py-2 pl-12 pr-4"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search candidates or skills..."
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden text-right lg:block">
            <p className="text-sm font-bold">Alexander Reed</p>
            <p className="text-xs text-[var(--tm-muted)]">Lead Recruiter</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--tm-border)] bg-[var(--tm-primary-soft)] font-bold text-[var(--tm-primary)]">A</div>
        </div>
      </header>

      <main id="dashboard-report" className="tm-content-with-sidebar min-h-screen px-4 pb-12 pt-8 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <section className="tm-slide-up mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="mb-2 block text-sm font-bold text-[var(--tm-primary)]">Welcome back, Alexander</span>
              <h1 className="text-3xl font-bold text-[var(--tm-text)] md:text-4xl">Recruitment Dashboard</h1>
              <p className="mt-2 text-[var(--tm-muted)]">Monitoring {jobTitle || "your active role analysis"}.</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[var(--tm-border)] bg-[var(--tm-surface-mid)] p-3">
              <CalendarDays className="h-5 w-5 text-[var(--tm-primary)]" />
              <span className="text-sm font-bold">Live Ranking Session</span>
              <ChevronDown className="h-5 w-5 text-[var(--tm-muted)]" />
            </div>
          </section>

          <div id="pdf-stats-report" className="-mx-4 p-4 lg:-mx-8 lg:p-8">
            <h1 id="pdf-title" style={{ display: 'none' }} className="mb-10 text-center text-4xl font-extrabold tracking-tight text-[var(--tm-primary)]">TalentMind AI</h1>
            <section className="mb-10 grid gap-6 md:grid-cols-3">
              <Kpi icon={<TrendingUp />} label="Average Match" value={`${average}%`} detail={`${total} candidates analyzed`} />
            <Kpi icon={<Users />} label="Applicants" value={String(total)} detail="Processed by agent workflow" />
            <Kpi icon={<BarChart3 />} label="AI Confidence" value={`${confidence}%`} detail={`Highest score ${highest}%`} />
          </section>

          <section className="mb-10 grid gap-6 lg:grid-cols-12">
            <div className="tm-card tm-slide-up rounded-2xl bg-white p-6 lg:col-span-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Top Skill Coverage</h2>
                  <p className="text-sm text-[var(--tm-muted)]">Live skills extracted from ranked candidates</p>
                </div>
                <span className="tm-label text-[var(--tm-primary)]">Live Data</span>
              </div>
              <div className="flex h-[260px] items-end gap-4">
                {topSkills.map((skill, index) => (
                  <div key={skill.name} className="flex flex-1 flex-col items-center gap-3">
                    <div className="relative flex w-full items-end overflow-hidden rounded-t-xl bg-[var(--tm-primary-soft)]" style={{ height: "220px" }}>
                      <div className="w-full rounded-t-xl bg-[var(--tm-primary)] transition-all duration-700" style={{ height: `${skill.percent}%`, animationDelay: `${index * 80}ms` }} />
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-[var(--tm-primary)]">{skill.percent}%</span>
                    </div>
                    <span className="max-w-[120px] truncate text-center text-xs font-bold uppercase tracking-[0.05em] text-[var(--tm-muted)]">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tm-card tm-slide-up rounded-2xl bg-white p-6 lg:col-span-4" style={{ animationDelay: "120ms" }}>
              <h2 className="text-xl font-bold">Match Radar</h2>
              <p className="mt-1 text-sm text-[var(--tm-muted)]">Pipeline signal integrity</p>
              <div className="mt-8 flex justify-center">
                <svg className="h-60 w-60" viewBox="0 0 200 200" aria-hidden="true">
                  <polygon fill="none" points="100,20 180,75 150,165 50,165 20,75" stroke="rgba(115,118,134,.35)" />
                  <polygon fill="none" points="100,50 150,85 130,145 70,145 50,85" stroke="rgba(115,118,134,.35)" />
                  <polygon fill="rgba(37,99,235,.18)" points="100,36 158,82 138,148 76,140 42,92" stroke="#004ac6" strokeWidth="2" />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-[var(--tm-muted)]">
                <span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--tm-primary)]" />Technical</span>
                <span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--tm-tertiary)]" />Behavioral</span>
              </div>
            </div>
          </section>
          </div>

          <section id="candidates-report">
            <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-2xl font-bold text-[var(--tm-text)]">Top Candidates</h2>
                <p className="text-sm text-[var(--tm-muted)]">Click a candidate to open the detailed AI profile.</p>
              </div>
              <div data-html2canvas-ignore className="flex flex-wrap gap-3">
                <button onClick={() => exportPDF("pdf-stats-report", "TalentMind_Stats.pdf")} className="tm-primary-btn flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"><Download className="h-4 w-4" /> Export Report</button>
                <button onClick={handleRestart} className="tm-secondary-btn rounded-xl px-5 py-3 text-sm font-bold">New Analysis</button>
              </div>
            </div>
            <div className="space-y-4">
              {candidates.map((candidate, index) => (
                <CandidateCard key={`${candidate.candidate.candidate_name}-${index}`} candidate={candidate} index={index} onSelect={() => setSelectedCandidate(candidate)} />
              ))}
            </div>
          </section>

        </div>
      </main>

      <CandidateDrawer candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
    </div>
  )
}

function Kpi({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return (
    <div className="tm-card tm-slide-up rounded-2xl bg-white p-6">
      <div className="mb-5 flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--tm-primary-soft)] text-[var(--tm-primary)] [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        <span className="rounded-full bg-[var(--tm-tertiary-soft)] px-3 py-1 text-xs font-bold text-[var(--tm-tertiary)]">Live</span>
      </div>
      <p className="tm-label">{label}</p>
      <h2 className="tm-count-pop mt-1 text-4xl font-extrabold text-[var(--tm-primary)]">{value}</h2>
      <p className="mt-4 truncate text-sm text-[var(--tm-muted)]">{detail}</p>
    </div>
  )
}

function CandidateCard({ candidate, index, onSelect }: { candidate: RankingRunItem; index: number; onSelect: () => void }) {
  const score = pct(candidate.score)
  return (
    <article onClick={onSelect} className="tm-card tm-slide-up group flex cursor-pointer flex-col gap-5 rounded-2xl bg-white p-5 transition hover:bg-[var(--tm-surface-low)] md:flex-row md:items-center" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[var(--tm-border)] bg-[var(--tm-primary-soft)] text-xl font-bold text-[var(--tm-primary)]">
        {initials(candidate.candidate.candidate_name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-bold">{candidate.candidate.candidate_name}</h3>
          {index === 0 && <span className="rounded bg-[var(--tm-primary-soft)] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.05em] text-[var(--tm-primary)]">Top Talent</span>}
          {score >= 85 && index !== 0 && <span className="rounded bg-[var(--tm-tertiary-soft)] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.05em] text-[var(--tm-tertiary)]">Fast Track</span>}
        </div>
        <p className="mb-3 text-sm leading-6 text-[var(--tm-muted)]">{candidate.candidate.summary || `${Math.round(candidate.candidate.experience)} years experience`}</p>
        <div className="flex flex-wrap gap-2">
          {(candidate.matched_skills.length ? candidate.matched_skills : candidate.candidate.skills).slice(0, 4).map((skill) => (
            <span key={skill} className="rounded-full bg-[var(--tm-surface-mid)] px-3 py-1 text-xs font-semibold text-[var(--tm-muted)]">{skill}</span>
          ))}
        </div>
      </div>
      <div className="text-left md:text-right">
        <p className="tm-label">Match Score</p>
        <p className="text-3xl font-extrabold text-[var(--tm-primary)]">{score}%</p>
        <button className="tm-secondary-btn mt-3 rounded-lg px-5 py-2 text-sm font-bold group-hover:bg-[var(--tm-primary)] group-hover:text-white">View Profile</button>
      </div>
    </article>
  )
}

function CandidateDrawer({ candidate, onClose }: { candidate: RankingRunItem | null; onClose: () => void }) {
  if (!candidate) return null
  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-[rgba(20,27,43,0.42)] backdrop-blur-sm" onClick={onClose} />
      <aside id="candidate-profile" className="tm-drawer absolute right-0 top-0 flex h-full w-full max-w-[760px] flex-col overflow-hidden border-l border-[var(--tm-border)] bg-white shadow-2xl">
        <header className="flex items-start justify-between border-b border-[var(--tm-border)] p-6">
          <div className="flex gap-4">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[var(--tm-primary-soft)] text-2xl font-bold text-[var(--tm-primary)]">
              {initials(candidate.candidate.candidate_name)}
            </span>
            <div>
              <div className="mb-2 inline-flex rounded-full bg-[var(--tm-tertiary-soft)] px-3 py-1 text-xs font-extrabold text-[var(--tm-tertiary)]">
                {pct(candidate.score)}% Match
              </div>
              <h2 className="text-3xl font-bold">{candidate.candidate.candidate_name}</h2>
              <p className="mt-1 text-[var(--tm-muted)]">{Math.round(candidate.candidate.experience)} years experience</p>
            </div>
          </div>
          <button onClick={onClose} className="tm-icon-btn flex h-10 w-10 items-center justify-center rounded-full" aria-label="Close candidate drawer">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <section className="mb-8 rounded-2xl bg-[var(--tm-primary-soft)]/55 p-5">
            <p className="tm-label mb-3 text-[var(--tm-primary)]">AI-Driven Insight</p>
            <p className="leading-7 text-[var(--tm-text)]">{candidate.explanation.explanation || candidate.candidate.summary}</p>
          </section>

          <section className="mb-8 grid gap-4 sm:grid-cols-2">
            <Metric label="Semantic Alignment" value={pct(candidate.semantic_score)} />
            <Metric label="Skill Match" value={pct(candidate.skill_score)} />
            <Metric label="Experience" value={pct(candidate.experience_score)} />
            <Metric label="Behavior" value={candidate.behavior_score == null ? 0 : pct(candidate.behavior_score)} />
          </section>

          <SkillSection title="Matched Skills" skills={candidate.matched_skills.length ? candidate.matched_skills : candidate.candidate.skills.slice(0, 8)} />
          <SkillSection title="Transferable Skills" skills={candidate.transferable_skills} />
          <SkillSection title="Areas to Explore" skills={candidate.missing_skills} muted />

          <section className="mt-8 grid gap-4 md:grid-cols-2">
            <ListPanel title="Core Strengths" items={candidate.explanation.strengths} />
            <ListPanel title="Growth Areas" items={candidate.explanation.weaknesses} muted />
          </section>

          <section className="mt-8">
            <h3 className="tm-label mb-4">Experience Timeline</h3>
            <div className="ml-4 space-y-6 border-l-2 border-[var(--tm-border)] pl-8">
              {candidate.candidate.projects.slice(0, 3).map((project, index) => (
                <div key={project} className="relative">
                  <span className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white ${index === 0 ? "bg-[var(--tm-primary)]" : "bg-[var(--tm-border)]"}`} />
                  <h4 className="font-bold">Project Evidence {index + 1}</h4>
                  <p className="mt-1 text-sm leading-6 text-[var(--tm-muted)]">{project}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="flex flex-col justify-between gap-4 border-t border-[var(--tm-border)] bg-[var(--tm-surface-low)] p-6 sm:flex-row sm:items-center">
          <div className="flex gap-5">
            <button onClick={() => exportPDF("candidate-profile", `${candidate.candidate.candidate_name.replace(/\s+/g, "_")}_Profile.pdf`)} className="flex items-center gap-2 text-sm font-bold text-[var(--tm-muted)] transition hover:text-[var(--tm-primary)]"><Download className="h-4 w-4" /> Download Profile</button>
            <button className="flex items-center gap-2 text-sm font-bold text-[var(--tm-muted)] transition hover:text-[var(--tm-primary)]"><Share2 className="h-4 w-4" /> Share Profile</button>
          </div>
          <button className="tm-primary-btn rounded-xl px-6 py-3 font-bold">Schedule Interview</button>
        </footer>
      </aside>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[var(--tm-border)] bg-white p-5">
      <div className="mb-3 flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="tm-progress">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function SkillSection({ title, skills, muted = false }: { title: string; skills: string[]; muted?: boolean }) {
  return (
    <section className="mb-6">
      <h3 className="tm-label mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.length ? (
          skills.map((skill) => (
            <span key={skill} className={`rounded-full px-3 py-1 text-xs font-bold ${muted ? "bg-[var(--tm-error-soft)] text-[var(--tm-error)]" : "bg-[var(--tm-surface-mid)] text-[var(--tm-muted)]"}`}>
              {skill}
            </span>
          ))
        ) : (
          <span className="text-sm text-[var(--tm-muted)]">None detected</span>
        )}
      </div>
    </section>
  )
}

function ListPanel({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${muted ? "border-[var(--tm-error-soft)] bg-[var(--tm-error-soft)]/35" : "border-[var(--tm-tertiary-soft)] bg-[var(--tm-tertiary-soft)]/20"}`}>
      <h3 className={`mb-3 font-bold ${muted ? "text-[var(--tm-error)]" : "text-[var(--tm-tertiary)]"}`}>{title}</h3>
      <ul className="space-y-2 text-sm leading-6 text-[var(--tm-muted)]">
        {(items.length ? items : ["No major notes detected."]).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function SideNav() {
  const navigate = useNavigate()
  return (
    <aside className="tm-sidebar hidden flex-col p-6 md:flex">
      <div className="mb-12">
        <button onClick={() => navigate("/")} className="transition-opacity hover:opacity-80 text-left">
          <h1 className="text-2xl font-extrabold text-[var(--tm-primary)]">TalentMind AI</h1>
        </button>
        <p className="text-sm font-semibold text-[var(--tm-muted)]">Enterprise Recruitment</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        <button className="tm-shell-link tm-shell-link-active"><BarChart3 className="h-5 w-5" /> Dashboard</button>
        <button onClick={() => navigate("/job")} className="tm-shell-link"><BriefcaseBusiness className="h-5 w-5" /> Job Analysis</button>
        <button onClick={() => navigate("/candidates")} className="tm-shell-link"><FileText className="h-5 w-5" /> Resumes</button>
        <button onClick={() => navigate("/profile")} className="tm-shell-link"><User className="h-5 w-5" /> Profile</button>
      </nav>
      <button onClick={() => navigate("/job")} className="tm-primary-btn mb-6 flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold">
        <Plus className="h-5 w-5" /> New Job Post
      </button>
    </aside>
  )
}

function pct(value: number | null | undefined) {
  if (value == null) return 0
  if (value > 0 && value <= 1) return Math.round(value * 100)
  return Math.round(value)
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function getTopSkills(candidates: RankingRunItem[]) {
  const counts: Record<string, number> = {}
  candidates.forEach((candidate) => {
    candidate.candidate.skills.forEach((skill) => {
      const clean = skill.trim()
      if (clean) counts[clean] = (counts[clean] || 0) + 1
    })
  })
  const total = Math.max(1, candidates.length)
  const entries = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, percent: Math.max(12, Math.round((count / total) * 100)) }))
  return entries.length ? entries : [{ name: "React", percent: 85 }, { name: "Python", percent: 78 }, { name: "FastAPI", percent: 66 }]
}
