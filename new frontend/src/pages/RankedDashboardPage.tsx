import { useRecruitmentContext } from "../context/RecruitmentContext"
import { useNavigate } from "react-router-dom"
import * as XLSX from "xlsx"

export default function RankedDashboardPage() {
  const { rankingResults, jobDetails } = useRecruitmentContext()
  const navigate = useNavigate()

  // Helper for exporting
  const handleExportXlsx = () => {
    if (!rankingResults) return
    const exportData = rankingResults.map(item => ({
      Rank: item.rank,
      Candidate_Name: item.candidate.candidate_name,
      Score: item.score,
      Confidence: item.confidence,
      Semantic_Score: item.semantic_score,
      Skill_Score: item.skill_score,
      Experience_Score: item.experience_score,
      Explanation: item.explanation.explanation
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates")
    XLSX.writeFile(workbook, "TalentMind_Submission.xlsx")
  }

  if (!rankingResults || rankingResults.length === 0) {
    return (
      <div className="max-w-container-max mx-auto px-lg pt-xl pb-3xl flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-headline-md font-bold mb-md">No Results Found</h2>
        <p className="mb-lg">Run an analysis first to see results here.</p>
        <button onClick={() => navigate("/job")} className="bg-[#0D47A1] text-white px-lg py-sm rounded-lg font-bold">Go to Analysis</button>
      </div>
    )
  }

  const topScore = Math.max(...rankingResults.map(r => r.score))
  const avgScore = Math.round((rankingResults.reduce((acc, r) => acc + r.score, 0) / rankingResults.length) * 10) / 10

  return (
    <div className="max-w-container-max mx-auto px-2xl pt-2xl pb-3xl animate-slide-up">
      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
        <div className="bg-white border border-outline-variant p-lg rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div>
              <p className="text-[14px] font-bold text-[#6B7280] uppercase tracking-wider mb-xs">Match Rate</p>
              <div className="flex items-baseline gap-xs">
                <h3 className="text-[32px] font-bold text-[#111827]">{avgScore}%</h3>
                <span className="text-[14px] text-[#6B7280] font-bold">Avg.</span>
              </div>
            </div>
            <div className="p-sm bg-[#EEF2FF] rounded-lg">
              <span className="material-symbols-outlined text-[#4338CA]">analytics</span>
            </div>
          </div>
          <p className="text-[14px] text-[#059669] font-bold flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            +2.4% vs last batch
          </p>
        </div>
        
        <div className="bg-white border border-outline-variant p-lg rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div>
              <p className="text-[14px] font-bold text-[#6B7280] uppercase tracking-wider mb-xs">Top Score</p>
              <div className="flex items-baseline gap-xs">
                <h3 className="text-[32px] font-bold text-[#111827]">{topScore.toFixed(1)}%</h3>
              </div>
            </div>
            <div className="p-sm bg-[#FFF7ED] rounded-lg">
              <span className="material-symbols-outlined text-[#EA580C]">star</span>
            </div>
          </div>
          <p className="text-[14px] text-[#4B5563] truncate">For: {jobDetails?.title || "Senior Frontend Engineer"}</p>
        </div>
        
        <div className="bg-white border border-outline-variant p-lg rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div>
              <p className="text-[14px] font-bold text-[#6B7280] uppercase tracking-wider mb-xs">Total Applicants</p>
              <div className="flex items-baseline gap-xs">
                <h3 className="text-[32px] font-bold text-[#111827]">{rankingResults.length}</h3>
              </div>
            </div>
            <div className="p-sm bg-[#F3F4F6] rounded-lg">
              <span className="material-symbols-outlined text-[#4B5563]">group</span>
            </div>
          </div>
          <p className="text-[14px] text-[#4B5563]">3 new this week</p>
        </div>
      </div>

      {/* Tabs and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-outline-variant mb-xl pb-sm">
        <div className="flex gap-xl">
          <button className="text-[#0D47A1] font-bold text-[14px] border-b-2 border-[#0D47A1] pb-sm px-xs">All Candidates</button>
          <button className="text-[#6B7280] font-bold text-[14px] pb-sm px-xs hover:text-[#111827] transition-colors">Shortlisted</button>
          <button className="text-[#6B7280] font-bold text-[14px] pb-sm px-xs hover:text-[#111827] transition-colors">Interviewing</button>
          <button className="text-[#6B7280] font-bold text-[14px] pb-sm px-xs hover:text-[#111827] transition-colors">Rejected</button>
        </div>
        <div className="flex items-center gap-md">
          <button onClick={handleExportXlsx} className="flex items-center gap-xs px-md py-sm text-[#4B5563] hover:text-[#111827] font-bold text-[14px] transition-colors">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export
          </button>
          <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg hover:bg-surface-container-low font-bold text-[14px] text-[#374151] transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Filters
          </button>
        </div>
      </div>

      {/* Candidate List */}
      <div className="space-y-md">
        {rankingResults.map((item, idx) => {
          // Extract initials for the avatar
          const initials = item.candidate.candidate_name
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase() || 'JD';
            
          return (
            <div key={idx} className="group bg-white border border-outline-variant p-xl rounded-2xl flex items-start md:items-center justify-between gap-lg hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-lg flex-1">
                <div className="w-14 h-14 rounded-full bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center font-bold text-[20px] flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <div className="flex items-center gap-sm mb-1">
                    <h5 className="text-[18px] font-bold text-[#111827]">{item.candidate.candidate_name}</h5>
                  </div>
                  <p className="text-[14px] text-[#4B5563] mb-md">{jobDetails?.title || "Frontend Engineer"} • San Francisco, CA</p>
                  <div className="flex flex-wrap gap-sm">
                    {item.matched_skills.slice(0, 4).map((skill, i) => (
                      <span key={i} className="px-md py-1 bg-[#F3F4F6] text-[#4B5563] text-[12px] font-bold rounded-md">{skill}</span>
                    ))}
                    {item.matched_skills.length > 4 && (
                      <span className="px-md py-1 bg-[#F3F4F6] text-[#4B5563] text-[12px] font-bold rounded-md">+{item.matched_skills.length - 4}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right flex flex-col items-end gap-md flex-shrink-0">
                <div className="text-right">
                  <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">Match Score</p>
                  <p className="text-[24px] font-bold text-[#059669]">{item.score.toFixed(0)}%</p>
                </div>
                <button className="px-xl py-sm bg-white border border-[#D1D5DB] text-[#374151] font-bold text-[14px] rounded-lg hover:bg-[#F9FAFB] transition-colors whitespace-nowrap">
                  View Profile
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
