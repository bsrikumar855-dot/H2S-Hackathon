import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Bell, Download, Filter, Network, Search, Share2, X } from "lucide-react"
import { useRecruitment } from "../../context/RecruitmentContext"
import { type RankingRunItem } from "../../services/api"

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
        <div className="tm-card max-w-md rounded-xl p-8 text-center">
          <Network className="mx-auto mb-4 h-10 w-10 text-[var(--tm-primary)]" />
          <h1 className="text-2xl font-bold text-white">No Evaluation Results</h1>
          <p className="mt-3 text-[var(--tm-muted)]">Run a job and candidate analysis to generate the TalentMind dashboard.</p>
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
    <div className="tm-shell">
      <SideNav />
      <main className="tm-content-with-sidebar min-h-screen">
        <header className="fixed left-[240px] right-0 top-0 z-50 flex h-[72px] items-center justify-between border-b border-white/10 bg-[rgba(9,9,11,0.82)] px-4 backdrop-blur-xl md:px-12">
          <div>
            <h1 className="tm-gradient-text text-2xl font-bold">Results Dashboard</h1>
            <p className="text-xs text-[var(--tm-muted)]">{jobTitle || "Active role analysis"}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 md:flex">
              <span className="tm-status-dot" />
              <span className="tm-label">System Online</span>
            </span>
            <button className="tm-icon-btn flex h-10 w-10 items-center justify-center rounded-full" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="px-4 pb-12 pt-28 md:px-12">
          <section className="grid gap-6 md:grid-cols-4">
            <Kpi label="Total Candidates" value={String(total)} detail="Processed by agent pipeline" />
            <Kpi label="Average Score" value={`${average}`} detail="Semantic and skills weighted" accent="primary" />
            <Kpi label="Highest Score" value={`${highest}`} detail={candidates[0]?.candidate.candidate_name || "N/A"} />
            <Kpi label="Avg Confidence" value={`${confidence}%`} detail="AI precision indicator" accent="success" />
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="tm-card rounded-xl p-6 lg:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Top Skill Coverage</h2>
                <span className="tm-label">Live Data</span>
              </div>
              <div className="flex h-[270px] items-end justify-between gap-4 px-2">
                {topSkills.map((skill) => (
                  <div key={skill.name} className="flex flex-1 flex-col items-center gap-3">
                    <div className="relative flex w-full items-end rounded-t-lg bg-indigo-400/10" style={{ height: "230px" }}>
                      <div className="w-full rounded-t-lg bg-indigo-400/35 transition-all" style={{ height: `${skill.percent}%` }} />
                      <span className="tm-mono absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-[var(--tm-primary)]">{skill.percent}</span>
                    </div>
                    <span className="tm-label max-w-[100px] truncate text-center">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tm-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-white">Skill Match</h2>
              <p className="mt-1 text-sm text-[var(--tm-muted)]">Overall pipeline integrity</p>
              <div className="mt-8 flex justify-center">
                <svg className="h-64 w-64" viewBox="0 0 200 200">
                  <polygon fill="none" points="100,20 180,75 150,165 50,165 20,75" stroke="rgba(255,255,255,.14)" />
                  <polygon fill="none" points="100,50 150,85 130,145 70,145 50,85" stroke="rgba(255,255,255,.14)" />
                  <polygon fill="rgba(99,102,241,.23)" points="100,38 158,82 138,148 76,140 42,92" stroke="#6366F1" strokeWidth="2" />
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[var(--tm-muted)]">
                <span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--tm-primary)]" />Technical</span>
                <span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--tm-tertiary)]" />Behavioral</span>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="relative min-w-[280px] flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--tm-muted)]" />
                <input
                  className="tm-input py-3 pl-11 pr-4"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search candidates by name or skill..."
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="tm-secondary-btn flex items-center gap-2 rounded-lg px-4 py-3 text-sm"><Filter className="h-4 w-4" /> Filter</button>
                <button className="tm-primary-btn flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold"><Download className="h-4 w-4" /> Export Report</button>
                <button onClick={handleRestart} className="tm-secondary-btn rounded-lg px-4 py-3 text-sm">New Analysis</button>
              </div>
            </div>

            <div className="tm-card overflow-hidden rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] text-left">
                  <thead className="border-b border-white/10 bg-white/[0.03]">
                    <tr>
                      {["Rank", "Candidate", "Overall", "Semantic", "Skills", "Experience", "Behavior", "Status"].map((head) => (
                        <th key={head} className="px-6 py-4 tm-label">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {candidates.map((candidate, index) => (
                      <tr
                        key={`${candidate.candidate.candidate_name}-${index}`}
                        onClick={() => setSelectedCandidate(candidate)}
                        className="cursor-pointer transition hover:bg-white/[0.04]"
                      >
                        <td className="px-6 py-4 tm-mono text-sm">#{String(index + 1).padStart(2, "0")}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-400/15 text-sm font-bold text-[var(--tm-primary)]">
                              {initials(candidate.candidate.candidate_name)}
                            </span>
                            <div>
                              <p className="font-bold text-white">{candidate.candidate.candidate_name}</p>
                              <p className="text-xs text-[var(--tm-muted)]">{candidate.candidate.skills.slice(0, 2).join(" / ") || "Candidate"}</p>
                            </div>
                          </div>
                        </td>
                        <ScoreCell value={candidate.score} />
                        <td className="px-6 py-4 tm-mono text-sm text-[var(--tm-muted)]">{pct(candidate.semantic_score)}</td>
                        <td className="px-6 py-4 tm-mono text-sm text-[var(--tm-muted)]">{pct(candidate.skill_score)}</td>
                        <td className="px-6 py-4 tm-mono text-sm text-[var(--tm-muted)]">{pct(candidate.experience_score)}</td>
                        <td className="px-6 py-4 tm-mono text-sm text-[var(--tm-muted)]">{candidate.behavior_score == null ? "N/A" : pct(candidate.behavior_score)}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full border border-emerald-300/30 px-2 py-1 tm-label text-[var(--tm-tertiary)]">
                            {pct(candidate.score) >= 80 ? "Interview" : "Review"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>

      <CandidateDrawer candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
    </div>
  )
}

function Kpi({ label, value, detail, accent }: { label: string; value: string; detail: string; accent?: "primary" | "success" }) {
  return (
    <div className="tm-card rounded-xl p-6">
      <p className="tm-label mb-1">{label}</p>
      <h2 className={`text-4xl font-bold ${accent === "primary" ? "text-[var(--tm-primary)]" : accent === "success" ? "text-[var(--tm-tertiary)]" : "text-white"}`}>{value}</h2>
      <p className="mt-4 truncate text-sm text-[var(--tm-muted)]">{detail}</p>
    </div>
  )
}

function ScoreCell({ value }: { value: number }) {
  return (
    <td className="px-6 py-4">
      <span className="tm-mono rounded-md bg-indigo-400/10 px-2 py-1 font-bold text-[var(--tm-primary)]">{pct(value)}</span>
    </td>
  )
}

function CandidateDrawer({ candidate, onClose }: { candidate: RankingRunItem | null; onClose: () => void }) {
  if (!candidate) return null
  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <aside className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[620px] flex-col border-l border-white/10 bg-[var(--tm-surface)] shadow-2xl">
        <header className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-300/25 bg-indigo-400/10 text-2xl font-bold text-[var(--tm-primary)]">
              {initials(candidate.candidate.candidate_name)}
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white">{candidate.candidate.candidate_name}</h2>
              <p className="text-sm text-[var(--tm-muted)]">{Math.round(candidate.candidate.experience)} years experience</p>
            </div>
          </div>
          <button onClick={onClose} className="tm-icon-btn flex h-10 w-10 items-center justify-center rounded-full">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-8 overflow-y-auto p-6">
          <section className="rounded-xl border border-indigo-300/20 bg-indigo-400/10 p-5">
            <p className="tm-label mb-3 text-[var(--tm-primary)]">TalentMind AI Insight</p>
            <p className="italic leading-7 text-white">{candidate.explanation.explanation || candidate.candidate.summary}</p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <Metric label="Semantic Alignment" value={pct(candidate.semantic_score)} />
            <Metric label="Skill Match" value={pct(candidate.skill_score)} />
            <Metric label="Experience" value={pct(candidate.experience_score)} />
            <Metric label="Behavior" value={candidate.behavior_score == null ? 0 : pct(candidate.behavior_score)} />
          </section>

          <SkillSection title="Matched Skills" skills={candidate.matched_skills.length ? candidate.matched_skills : candidate.candidate.skills.slice(0, 8)} />
          <SkillSection title="Transferable Skills" skills={candidate.transferable_skills} />
          <SkillSection title="Areas to Explore" skills={candidate.missing_skills} muted />

          <section className="grid gap-4 sm:grid-cols-2">
            <ListPanel title="Strengths" items={candidate.explanation.strengths} />
            <ListPanel title="Weaknesses" items={candidate.explanation.weaknesses} />
          </section>
        </div>

        <footer className="flex gap-3 border-t border-white/10 bg-black/20 p-6">
          <button className="tm-primary-btn flex-1 rounded-xl px-5 py-4 font-bold">Schedule Interview</button>
          <button className="tm-secondary-btn rounded-xl px-5 py-4"><Share2 className="h-5 w-5" /></button>
        </footer>
      </aside>
    </>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="tm-card rounded-xl p-5">
      <p className="tm-label mb-4">{label}</p>
      <div className="flex items-end gap-4">
        <span className="text-3xl font-bold text-white">{value}%</span>
        <div className="tm-progress mb-2 flex-1">
          <span style={{ width: `${value}%` }} />
        </div>
      </div>
    </div>
  )
}

function SkillSection({ title, skills, muted = false }: { title: string; skills: string[]; muted?: boolean }) {
  return (
    <section>
      <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.length ? (
          skills.map((skill) => (
            <span key={skill} className={`rounded-md border px-3 py-1 tm-mono text-xs ${muted ? "border-red-300/20 bg-red-400/10 text-red-200" : "border-white/15 bg-white/5 text-white"}`}>
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

function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="tm-card rounded-xl p-5">
      <h3 className="tm-label mb-3 text-[var(--tm-primary)]">{title}</h3>
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
    <aside className="tm-sidebar px-4 py-6">
      <div className="mb-8 flex items-center gap-3 px-2">
        <Network className="h-7 w-7 text-[var(--tm-primary)]" />
        <span className="tm-gradient-text text-2xl font-bold">TalentMind</span>
      </div>
      <nav className="flex flex-col gap-2">
        <button className="border-r-2 border-[var(--tm-primary)] bg-indigo-400/10 text-[var(--tm-primary)] rounded-lg px-3 py-3 text-left text-sm">Dashboard</button>
        <button onClick={() => navigate("/job")} className="rounded-lg px-3 py-3 text-left text-sm text-[var(--tm-muted)] hover:bg-white/5 hover:text-white">Job Analysis</button>
        <button onClick={() => navigate("/candidates")} className="rounded-lg px-3 py-3 text-left text-sm text-[var(--tm-muted)] hover:bg-white/5 hover:text-white">Resume Parser</button>
        <span className="rounded-lg px-3 py-3 text-sm text-[var(--tm-muted)]">Talent Pipeline</span>
        <span className="rounded-lg px-3 py-3 text-sm text-[var(--tm-muted)]">Settings</span>
      </nav>
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
