import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecruitment } from "../../context/RecruitmentContext"
import { type RankingRunItem } from "../../services/api"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/ui/Table"
import { Drawer } from "../../components/ui/Drawer"
import { ProgressBar } from "../../components/ui/ProgressBar"

export default function RankedDashboardPage() {
  const navigate = useNavigate()
  const { apiRankings, jobTitle, clearAll } = useRecruitment()
  const [selectedCandidate, setSelectedCandidate] = useState<RankingRunItem | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Use the live API rankings list
  const displayCandidates = [...apiRankings]
  
  // Sort candidates by score descending
  displayCandidates.sort((a, b) => b.score - a.score)

  const handleRowClick = (candidate: RankingRunItem) => {
    setSelectedCandidate(candidate)
    setIsDrawerOpen(true)
  }

  const handleRestart = () => {
    clearAll()
    navigate("/")
  }

  // Format decimal values (like 0.95 -> 95) or use directly if already percentage
  const formatPercentage = (val: number | null | undefined): number => {
    if (val === null || val === undefined) return 0
    if (val <= 1.0 && val > 0) return Math.round(val * 100)
    return Math.round(val)
  }

  // Calculations for KPIs
  const totalProcessed = displayCandidates.length
  
  if (totalProcessed === 0) {
    return (
      <div className="min-h-screen bg-[#030014] text-gray-200 antialiased font-sans flex flex-col justify-between">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_55%)] pointer-events-none" />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="max-w-md w-full border border-white/5 bg-[#0a0720]/60 backdrop-blur-md p-6 text-center space-y-6">
            <div className="text-4xl">📭</div>
            <div className="space-y-2">
              <CardTitle className="text-xl text-white">No Evaluation Results</CardTitle>
              <CardDescription>You must input job requirements and upload candidate resumes to generate rankings.</CardDescription>
            </div>
            <Button variant="primary" onClick={() => navigate("/")} className="w-full">
              Go to Home Screen
            </Button>
          </Card>
        </main>
        <footer className="w-full border-t border-white/5 py-4 text-center text-xs text-gray-500 font-mono">
          AI Candidate Ranking Engine.
        </footer>
      </div>
    )
  }

  const avgMatchScore = Math.round(
    displayCandidates.reduce((acc, c) => acc + formatPercentage(c.score), 0) / totalProcessed
  )
  const topCandidateScore = Math.max(...displayCandidates.map((c) => formatPercentage(c.score)))
  const topCandidateName = displayCandidates[0]?.candidate?.candidate_name || "N/A"
  
  const behaviorCount = displayCandidates.filter((c) => c.behavior_score !== null).length
  const avgBehaviorScore = behaviorCount > 0 
    ? Math.round(displayCandidates.reduce((acc, c) => acc + formatPercentage(c.behavior_score), 0) / behaviorCount)
    : 0

  // 1. DYNAMIC CHART: Skill Coverage Frequencies
  const skillCounts: Record<string, number> = {}
  displayCandidates.forEach((c) => {
    c.candidate.skills.forEach((s) => {
      const cleanSkill = s.trim()
      if (cleanSkill) {
        skillCounts[cleanSkill] = (skillCounts[cleanSkill] || 0) + 1
      }
    })
  })
  const dynamicSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([skill, count]) => ({
      skill,
      percentage: Math.round((count / totalProcessed) * 100),
    }))

  // 2. DYNAMIC CHART: Suitability Distribution Donut Chart Segments
  const highFitCount = displayCandidates.filter((c) => formatPercentage(c.score) >= 80).length
  const modFitCount = displayCandidates.filter((c) => formatPercentage(c.score) >= 60 && formatPercentage(c.score) < 80).length
  const lowFitCount = displayCandidates.filter((c) => formatPercentage(c.score) < 60).length

  const highPercent = Math.round((highFitCount / totalProcessed) * 100)
  const modPercent = Math.round((modFitCount / totalProcessed) * 100)
  const lowPercent = Math.round((lowFitCount / totalProcessed) * 100)

  // 3. DYNAMIC CHART: Seeker Engagement Line coordinates
  const sortedByBehavior = [...displayCandidates].sort((a, b) => {
    const scoreA = a.behavior_score !== null ? formatPercentage(a.behavior_score) : 0
    const scoreB = b.behavior_score !== null ? formatPercentage(b.behavior_score) : 0
    return scoreA - scoreB
  })
  
  const linePoints = sortedByBehavior.map((c, idx) => {
    const x = Math.round((idx / Math.max(1, sortedByBehavior.length - 1)) * 100)
    const scoreVal = c.behavior_score !== null ? formatPercentage(c.behavior_score) : 0
    const y = Math.round(35 - (scoreVal / 100) * 30) // scale to Y height bounds 5 to 35
    return { x, y }
  })

  let pathD = ""
  if (linePoints.length > 0) {
    pathD = `M ${linePoints[0].x} ${linePoints[0].y} `
    for (let i = 1; i < linePoints.length; i++) {
      pathD += `L ${linePoints[i].x} ${linePoints[i].y} `
    }
  }
  const areaD = pathD ? `${pathD} L 100 40 L 0 40 Z` : ""

  return (
    <div className="min-h-screen bg-[#030014] text-gray-200 antialiased font-sans relative overflow-x-hidden pb-16">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_55%)] pointer-events-none z-0" />
      <div className="absolute bottom-[300px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 space-y-10">
        
        {/* Dashboard Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">Simulated Results Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Recruiter Candidate Rankings
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Evaluating suitability for: <span className="text-violet-400 font-semibold">{jobTitle || "Senior AI Engineer"}</span>
            </p>
          </div>
          <div>
            <Button variant="secondary" size="sm" onClick={handleRestart} className="font-mono text-xs">
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19" />
              </svg>
              Analyze New Job
            </Button>
          </div>
        </header>

        {/* KPI Cards Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1 */}
          <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-violet-600" />
            <span className="text-xs text-gray-500 font-mono block">Candidates Evaluated</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block font-mono">{totalProcessed}</span>
            <span className="text-[10px] text-gray-400 mt-2 block">100% processing rate</span>
          </Card>

          {/* KPI 2 */}
          <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-blue-600" />
            <span className="text-xs text-gray-500 font-mono block">Average Match Score</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block font-mono">{avgMatchScore}%</span>
            <span className="text-[10px] text-emerald-400 mt-2 block">Semantic + Skills suitability</span>
          </Card>

          {/* KPI 3 */}
          <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-emerald-600" />
            <span className="text-xs text-gray-500 font-mono block">Top Suitability Score</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block font-mono">{topCandidateScore}%</span>
            <span className="text-[10px] text-violet-400 mt-2 block font-semibold truncate">{topCandidateName}</span>
          </Card>

          {/* KPI 4 */}
          <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-cyan-600" />
            <span className="text-xs text-gray-500 font-mono block">Avg Behavioral Engagement</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block font-mono">{avgBehaviorScore}/100</span>
            <span className="text-[10px] text-gray-400 mt-2 block">Active job seeker velocity</span>
          </Card>
        </section>

        {/* Candidate Table Section */}
        <section className="space-y-4">
          <Card className="overflow-hidden border border-white/5 bg-[#0a0720]/60 backdrop-blur-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Ranked Candidate Shortlist</CardTitle>
              <CardDescription>Click a candidate row to inspect their matching profile, skill gap tags, and explainability reasoning.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16 text-center">Rank</TableHead>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Primary Focus</TableHead>
                    <TableHead className="text-right">Match Rate</TableHead>
                    <TableHead className="text-right">Confidence</TableHead>
                    <TableHead className="text-right">Behavior Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayCandidates.map((cand, index) => {
                    const rank = index + 1
                    return (
                      <TableRow 
                        key={cand.candidate.candidate_name} 
                        onClick={() => handleRowClick(cand)}
                        className="cursor-pointer hover:bg-white/5 transition-colors duration-200"
                      >
                        <TableCell className="text-center font-mono font-bold text-gray-400">
                          {rank === 1 ? (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 text-xs">
                              👑
                            </span>
                          ) : (
                            `#${rank}`
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-white text-sm">{cand.candidate.candidate_name}</div>
                          <div className="text-xs text-gray-500 font-mono">{Math.round(cand.candidate.experience)} years experience</div>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/10 bg-white/5 text-gray-300 truncate max-w-[160px] inline-block">
                            {cand.candidate.skills.slice(0, 2).join(" / ") || "Developer"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-emerald-400 text-sm">
                          {formatPercentage(cand.score)}%
                        </TableCell>
                        <TableCell className="text-right font-mono text-cyan-400 text-sm">
                          {formatPercentage(cand.confidence)}%
                        </TableCell>
                        <TableCell className="text-right font-mono text-gray-300 text-sm">
                          {cand.behavior_score !== null ? `${formatPercentage(cand.behavior_score)}/100` : "N/A"}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Analytics Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Talent Pool Analytics</h2>
            <span className="text-xs font-mono text-gray-500">Live Dynamic Distributions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Chart 1: Skill Coverage */}
            <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Prerequisite Skill Coverage</h3>
                <p className="text-xs text-gray-500">Frequency of technical matches in queue</p>
              </div>
              <div className="space-y-3">
                {dynamicSkills.length > 0 ? (
                  dynamicSkills.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400 truncate max-w-[150px]">{item.skill}</span>
                        <span className="text-gray-200">{item.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-blue-500" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-500 py-6 text-center">No skills detected</div>
                )}
              </div>
            </Card>

            {/* Chart 2: Candidate Distribution Donut */}
            <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Suitability Distribution</h3>
                <p className="text-xs text-gray-500">Fit brackets grouping</p>
              </div>

              <div className="flex items-center justify-center my-4 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  
                  {/* High Fit segment */}
                  {highPercent > 0 && (
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3" 
                            strokeDasharray={`${highPercent} 100`} strokeDashoffset="0" strokeLinecap="round" />
                  )}
                  
                  {/* Moderate Fit segment */}
                  {modPercent > 0 && (
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3" 
                            strokeDasharray={`${modPercent} 100`} strokeDashoffset={`-${highPercent}`} strokeLinecap="round" />
                  )}

                  {/* Low Fit segment */}
                  {lowPercent > 0 && (
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f43f5e" strokeWidth="3" 
                            strokeDasharray={`${lowPercent} 100`} strokeDashoffset={`-${highPercent + modPercent}`} strokeLinecap="round" />
                  )}
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-bold font-mono text-white">{totalProcessed}</span>
                  <span className="text-[10px] text-gray-500 font-mono">Evaluations</span>
                </div>
              </div>

              {/* Legends */}
              <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-center">
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />
                  <span className="text-gray-400">High ({highPercent}%)</span>
                </div>
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1" />
                  <span className="text-gray-400">Mod ({modPercent}%)</span>
                </div>
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mr-1" />
                  <span className="text-gray-400">Low ({lowPercent}%)</span>
                </div>
              </div>
            </Card>

            {/* Chart 3: Behavior Score Line */}
            <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Engagement Intent Spread</h3>
                <p className="text-xs text-gray-500">Engagement scores mapped dynamically</p>
              </div>

              <div className="h-32 w-full pt-2">
                {linePoints.length > 0 ? (
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    <path d={areaD} fill="url(#chartGlow)" />
                    <path d={pathD} fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />

                    {linePoints.map((pt, idx) => (
                      <circle key={idx} cx={pt.x} cy={pt.y} r="1.5" fill="#a78bfa" />
                    ))}
                  </svg>
                ) : (
                  <div className="text-xs text-gray-500 h-full flex items-center justify-center">No behavior data</div>
                )}
              </div>

              <div className="flex justify-between text-[10px] font-mono text-gray-500 px-1 pt-1">
                <span>Low intent</span>
                <span>Active</span>
                <span>Exceptional</span>
              </div>
            </Card>
          </div>
        </section>

      </div>

      {/* Candidate Inspector Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedCandidate ? `${selectedCandidate.candidate.candidate_name} — Fit Assessment` : "Candidate Assessment Details"}
      >
        {selectedCandidate && (
          <div className="space-y-6 pt-2 pb-6">
            
            {/* Header / Meta */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="primary" className="font-mono text-xs">
                  {Math.round(selectedCandidate.candidate.experience)} Years Exp
                </Badge>
                <Badge variant="success" className="font-mono text-xs">
                  Suitability: {formatPercentage(selectedCandidate.score)}%
                </Badge>
                <Badge variant="secondary" className="font-mono text-xs">
                  Focus: {selectedCandidate.candidate.skills[0] || "Backend"}
                </Badge>
              </div>
              <p className="text-sm text-gray-400 italic bg-white/5 p-3 rounded-lg border border-white/5 mt-3">
                "{selectedCandidate.candidate.summary}"
              </p>
            </div>

            {/* Score Indicators Gauges */}
            <div className="space-y-4 bg-black/30 p-4 rounded-xl border border-white/5">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Suitability Score Breakdown</h3>
              
              <div className="space-y-3">
                <ProgressBar value={formatPercentage(selectedCandidate.score)} label="Overall Score (Semantic + Skills + Exp + Behavior)" variant="primary" />
                <ProgressBar value={formatPercentage(selectedCandidate.semantic_score)} label="Semantic Similarity Score" variant="primary" />
                <ProgressBar value={formatPercentage(selectedCandidate.skill_score)} label="Technical Skill Match Score" variant="success" />
                <ProgressBar value={formatPercentage(selectedCandidate.experience_score)} label="Experience Alignment Score" variant="success" />
                {selectedCandidate.behavior_score !== null && (
                  <ProgressBar value={formatPercentage(selectedCandidate.behavior_score)} label="Behavior / Outreach Intent Score" variant="warning" />
                )}
              </div>
            </div>

            {/* Strengths & Weaknesses checklists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="bg-emerald-950/20 border border-emerald-500/15 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">Strengths</h4>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc pl-4 leading-relaxed">
                  {selectedCandidate.explanation.strengths.length > 0 ? (
                    selectedCandidate.explanation.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))
                  ) : (
                    <li>Displays competent domain matching profile attributes</li>
                  )}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-rose-950/20 border border-rose-500/15 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">Areas to Explore</h4>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc pl-4 leading-relaxed">
                  {selectedCandidate.explanation.weaknesses.length > 0 ? (
                    selectedCandidate.explanation.weaknesses.map((weak, idx) => (
                      <li key={idx}>{weak}</li>
                    ))
                  ) : (
                    <li>No severe technical blockers detected</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Visual Skills Alignment list */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Skills Mapping</h3>
              
              <div className="space-y-2">
                <span className="text-xs text-gray-500 font-semibold block">Matched Stack Requirements:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.matched_skills.length > 0 ? (
                    selectedCandidate.matched_skills.map((skill, index) => (
                      <Badge key={index} variant="success">{skill}</Badge>
                    ))
                  ) : (
                    <span className="text-xs text-gray-600 italic">None matched</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-gray-500 font-semibold block">Transferable Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.transferable_skills.length > 0 ? (
                    selectedCandidate.transferable_skills.map((skill, index) => (
                      <Badge key={index} variant="warning">{skill}</Badge>
                    ))
                  ) : (
                    <span className="text-xs text-gray-600 italic">None detected</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-gray-500 font-semibold block">Identified Technical Gaps:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.missing_skills.length > 0 ? (
                    selectedCandidate.missing_skills.map((skill, index) => (
                      <Badge key={index} variant="danger">{skill}</Badge>
                    ))
                  ) : (
                    <span className="text-xs text-emerald-400 italic">Core requirements completely aligned</span>
                  )}
                </div>
              </div>
            </div>

            {/* Natural Language Justification */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">AI Recruiter Explanation</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans bg-white/5 p-3 rounded-lg border border-white/5">
                {selectedCandidate.explanation.explanation}
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex gap-3">
              <Button 
                variant="primary" 
                className="flex-1 text-xs" 
                onClick={() => alert(`Outreach draft initiated for ${selectedCandidate.candidate.candidate_name}`)}
              >
                Draft Outreach Message
              </Button>
              <Button 
                variant="secondary" 
                className="text-xs"
                onClick={() => setIsDrawerOpen(false)}
              >
                Close Profile
              </Button>
            </div>

          </div>
        )}
      </Drawer>

    </div>
  )
}
