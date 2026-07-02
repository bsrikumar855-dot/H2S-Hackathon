import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  CalendarDays,
  ChevronDown,
  List,
  Grid as GridIcon,
  Filter,
  Zap,
  Star,
  Users,
  ChevronRight
} from "lucide-react"
import { useRecruitment } from "../../context/RecruitmentContext"
import AppLayout from "../../layouts/AppLayout"
import MetricCard from "../../components/MetricCard"
import SkillBadge from "../../components/SkillBadge"
import { cn } from "../../lib/utils"

export default function RankedDashboardPage() {
  const navigate = useNavigate()
  const { jobTitle, apiRankings, isLoading } = useRecruitment()
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const avgMatch = apiRankings.length > 0
    ? (apiRankings.reduce((sum, r) => sum + r.score, 0) / apiRankings.length).toFixed(1)
    : "0.0"
  
  const topScore = apiRankings.length > 0
    ? Math.max(...apiRankings.map(r => r.score)).toFixed(1)
    : "0.0"

  return (
    <AppLayout>
      <div className="flex-1 max-w-container-max mx-auto w-full p-lg md:p-3xl">
        {/* Header Section */}
        <div className="mb-2xl flex flex-col md:flex-row md:items-end justify-between gap-lg">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-label-md font-bold text-primary mb-base block">
              Analysis Complete
            </span>
            <h2 className="text-headline-lg font-bold text-on-surface">Recruitment Dashboard</h2>
            <p className="text-body-md text-on-surface-variant">
              Monitoring your high-priority {jobTitle || "Untitled"} role.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-sm bg-surface-container p-sm rounded-lg border border-outline-variant"
          >
            <CalendarDays className="w-5 h-5 text-primary" />
            <span className="text-label-md font-bold text-on-surface">Oct 24, 2024 - Oct 31, 2024</span>
            <ChevronDown className="w-5 h-5 text-on-surface-variant cursor-pointer" />
          </motion.div>
        </div>

        {/* KPI Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-3xl">
          <MetricCard
            label="Avg Match Rate"
            value={parseFloat(avgMatch)}
            suffix="%"
            icon={<Zap className="w-5 h-5 text-primary" />}
            iconBgClass="bg-primary-fixed"
            trend={{ value: "+2.4%", positive: true }}
            progressValue={parseFloat(avgMatch)}
          />
          <MetricCard
            label="Top Score"
            value={parseFloat(topScore)}
            isFloat
            icon={<Star className="w-5 h-5 text-secondary" />}
            iconBgClass="bg-secondary-container"
            trend={{ value: "Steady", positive: true }}
            footerText="From current pipeline candidates"
          />
          <MetricCard
            label="Total Applicants"
            value={apiRankings.length}
            icon={<Users className="w-5 h-5 text-tertiary" />}
            iconBgClass="bg-tertiary-fixed-dim"
            trend={{ value: "-12%", positive: false }}
            footerText={`Active for ${jobTitle || "role"}`}
          />
        </div>

        {/* Candidate Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-lg">
          <h4 className="text-headline-sm font-bold text-on-surface">Top Candidates</h4>
          <div className="flex items-center gap-sm">
            <div className="flex border border-outline-variant rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-md py-sm flex items-center gap-xs transition-colors",
                  viewMode === "list" ? "bg-surface-container-high text-primary font-bold" : "bg-surface text-on-surface-variant hover:bg-surface-container-low"
                )}
              >
                <List className="w-4 h-4" />
                <span className="text-label-md">List</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "px-md py-sm flex items-center gap-xs transition-colors",
                  viewMode === "grid" ? "bg-surface-container-high text-primary font-bold" : "bg-surface text-on-surface-variant hover:bg-surface-container-low"
                )}
              >
                <GridIcon className="w-4 h-4" />
                <span className="text-label-md">Grid</span>
              </button>
            </div>
            <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors text-on-surface">
              <Filter className="w-4 h-4" />
              <span className="text-label-md">Filters</span>
            </button>
          </div>
        </div>

        {/* Candidate List */}
        <div className={cn(
          viewMode === "list" ? "space-y-md" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md"
        )}>
          {apiRankings.length === 0 && !isLoading && (
            <div className="col-span-full py-3xl text-center text-on-surface-variant border-2 border-dashed border-outline-variant rounded-xl">
              <p className="text-body-lg">No candidates found. Upload resumes to see rankings.</p>
              <button onClick={() => navigate("/candidates")} className="mt-md px-lg py-sm bg-primary text-on-primary rounded-lg font-bold">
                Go to Upload
              </button>
            </div>
          )}

          {apiRankings.map((result, i) => (
            <motion.div
              key={result.candidate.candidate_name + i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group bg-surface border border-outline-variant p-lg rounded-xl transition-all duration-300 hover:bg-surface-container-low hover:border-primary hover:shadow-md cursor-pointer",
                viewMode === "list" ? "flex flex-col md:flex-row md:items-center gap-lg" : "flex flex-col gap-md"
              )}
              onClick={() => navigate(`/report/${encodeURIComponent(result.candidate.candidate_name)}`)}
            >
              <div className="flex items-center gap-md">
                <div className={cn(
                  "w-16 h-16 rounded-full overflow-hidden border-2",
                  i === 0 ? "border-primary ring-4 ring-primary-fixed" : "border-outline-variant"
                )}>
                  <img
                    src={`https://i.pravatar.cc/150?u=${encodeURIComponent(result.candidate.candidate_name)}`}
                    alt={result.candidate.candidate_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={viewMode === "list" ? "hidden" : "block"}>
                  <div className="flex items-center gap-sm mb-xs">
                    <h5 className="text-headline-sm font-bold text-on-surface">{result.candidate.candidate_name}</h5>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">Candidate • {result.candidate.experience} years</p>
                </div>
              </div>

              <div className="flex-1">
                <div className={cn("items-center gap-sm mb-xs", viewMode === "list" ? "flex" : "hidden")}>
                  <h5 className="text-headline-sm font-bold text-on-surface">{result.candidate.candidate_name}</h5>
                  {i === 0 && (
                    <span className="px-sm py-0.5 bg-primary-fixed text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                      Top Talent
                    </span>
                  )}
                  {i === 2 && (
                    <span className="px-sm py-0.5 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold rounded uppercase tracking-wider">
                      Fast Track
                    </span>
                  )}
                </div>
                <p className={cn("text-body-md text-on-surface-variant mb-sm", viewMode === "list" ? "block" : "hidden")}>
                  Candidate • {result.candidate.experience} years
                </p>
                
                <div className="flex flex-wrap gap-xs">
                  {result.candidate.skills.slice(0, 3).map((skill: string) => (
                    <SkillBadge key={skill} label={skill} />
                  ))}
                  {result.candidate.skills.length > 3 && (
                    <span className="px-md py-1 bg-surface-container text-on-surface-variant text-label-sm rounded-full">
                      +{result.candidate.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className={cn(
                "flex justify-between items-center",
                viewMode === "list" ? "md:flex-col md:items-end md:justify-center border-t border-outline-variant pt-md md:pt-0 md:border-t-0" : "border-t border-outline-variant pt-md mt-sm"
              )}>
                <div className={cn("mb-0", viewMode === "list" && "md:mb-sm text-left md:text-right")}>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Match Score</p>
                  <p className={cn("text-headline-md font-bold", i === 0 ? "text-primary" : "text-on-surface")}>
                    {result.score.toFixed(1)}%
                  </p>
                </div>
                <button
                  className="px-lg py-sm bg-surface-container-highest text-on-surface font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/report/${encodeURIComponent(result.candidate.candidate_name)}`)
                  }}
                >
                  View Profile <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {apiRankings.length > 0 && (
          <div className="mt-2xl text-center">
            <button className="px-2xl py-md border border-outline text-on-surface font-bold rounded-full hover:bg-surface-container transition-colors inline-flex items-center gap-md">
              Load More Candidates
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
