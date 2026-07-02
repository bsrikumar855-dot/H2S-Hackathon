import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useRecruitmentContext } from "../context/RecruitmentContext"
import { rankingService } from "../services/apiClient"

export default function JobInputPage() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { setJobDetails } = useRecruitmentContext()
  const navigate = useNavigate()

  const wordCount = useMemo(() => {
    return desc.trim() === "" ? 0 : desc.trim().split(/\s+/).length
  }, [desc])

  const charCount = desc.length

  const handleNext = async () => {
    if (!title || !desc) {
      setError("Please fill out both job title and description.")
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // Create job in the backend
      const jobResp = await rankingService.createJob({ title, raw_description: desc })
      
      // Store in context for the workflow
      setJobDetails(jobResp.title, jobResp.raw_description)
      
      // Optionally could store job_id in context, but for now we proceed
      navigate("/candidates")
    } catch (e: any) {
      setError(e.message || "Failed to create job.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-container-max mx-auto px-2xl flex flex-col lg:flex-row gap-2xl animate-in-view visible pt-xl pb-3xl items-start">
      {/* Sidebar Navigation / Guidance */}
      <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-lg mt-md">
        <div className="space-y-md">
          <h3 className="font-display text-[24px] font-bold text-[#111827]">Writing Guide</h3>
          <p className="font-body-sm text-[14px] text-[#4B5563]">Effective job descriptions attract 40% more qualified candidates.</p>
          <div className="space-y-sm mt-md">
            <div className="flex items-start gap-md py-sm">
              <span className="material-symbols-outlined text-[#0D47A1] mt-0.5">check_circle</span>
              <div>
                <p className="font-bold text-[14px] text-[#111827]">Be Specific</p>
                <p className="text-[14px] text-[#4B5563] mt-1">Outline day-to-day tasks clearly.</p>
              </div>
            </div>
            <div className="flex items-start gap-md py-sm">
              <span className="material-symbols-outlined text-[#0D47A1] mt-0.5">check_circle</span>
              <div>
                <p className="font-bold text-[14px] text-[#111827]">Culture Matters</p>
                <p className="text-[14px] text-[#4B5563] mt-1">Mention your company values.</p>
              </div>
            </div>
            <div className="flex items-start gap-md py-sm">
              <span className="material-symbols-outlined text-[#0D47A1] mt-0.5">check_circle</span>
              <div>
                <p className="font-bold text-[14px] text-[#111827]">Inclusion</p>
                <p className="text-[14px] text-[#4B5563] mt-1">Use gender-neutral language.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-xl p-lg rounded-xl bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] border border-[#C7D2FE]">
          <div className="flex items-center gap-sm mb-sm text-[#4338CA]">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            <span className="font-bold text-[14px]">Need inspiration?</span>
          </div>
          <p className="text-[14px] text-[#4B5563] mb-md leading-relaxed">Use our AI generator for a head start on drafting the perfect role requirements.</p>
          <button className="w-full bg-white text-[#4338CA] font-bold text-[14px] py-2 rounded-lg border border-[#C7D2FE] hover:bg-surface-container transition-colors shadow-sm">
            Generate Draft
          </button>
        </div>
      </aside>

      {/* Central Workspace */}
      <section className="flex-grow flex flex-col gap-lg items-center w-full max-w-4xl">
        <div className="w-full bg-white rounded-2xl p-2xl shadow-sm border border-outline-variant">
          <header className="mb-xl">
            <h2 className="text-[28px] font-bold text-[#111827] mb-xs">Job Description</h2>
            <p className="text-[16px] text-[#4B5563]">Define the role, expectations, and why someone should join your team.</p>
          </header>
          
          {error && (
            <div className="mb-md p-sm bg-error-container text-on-error-container rounded border border-error">
              {error}
            </div>
          )}

          <div className="space-y-xl">
            {/* Title Input */}
            <div className="relative">
              <label className="block text-[14px] font-bold text-[#374151] mb-xs" htmlFor="job-title">Job Title</label>
              <input 
                className="w-full bg-white border border-[#D1D5DB] rounded-lg px-md py-md text-[16px] text-[#111827] outline-none focus:border-[#0D47A1] focus:ring-1 focus:ring-[#0D47A1] transition-all" 
                id="job-title" 
                placeholder="e.g. Senior Frontend Engineer" 
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            
            {/* Description Textarea */}
            <div className="relative">
              <label className="block text-[14px] font-bold text-[#374151] mb-xs" htmlFor="job-description">Detailed Description</label>
              <div className="relative">
                <textarea 
                  className="w-full bg-white border border-[#D1D5DB] rounded-lg px-md py-md text-[16px] text-[#111827] outline-none focus:border-[#0D47A1] focus:ring-1 focus:ring-[#0D47A1] transition-all resize-none" 
                  id="job-description" 
                  placeholder="Describe the responsibilities, requirements, and benefits..." 
                  rows={14}
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                ></textarea>
                
                {/* Counters */}
                <div className="absolute bottom-4 right-4 flex items-center gap-md text-[12px] text-[#6B7280] bg-white/90 backdrop-blur-sm px-sm py-xs rounded-full border border-[#E5E7EB]">
                  <span>{wordCount} words</span>
                  <span className="w-px h-3 bg-[#E5E7EB]"></span>
                  <span className={charCount > 2000 ? "text-error" : ""}>{charCount} / 2000 chars</span>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between pt-lg border-t border-outline-variant">
              <button 
                className="text-[#4B5563] font-bold text-[14px] hover:text-[#111827] transition-colors"
              >
                Save Draft
              </button>
              <button 
                className="bg-[#0D47A1] text-white px-xl py-sm rounded-lg font-bold text-[14px] shadow-sm hover:bg-[#1565C0] active:scale-95 transition-all disabled:opacity-50"
                onClick={handleNext}
                disabled={loading}
              >
                {loading ? "Saving..." : "Continue"}
              </button>
            </div>
          </div>
        </div>

        {/* Quote Block */}
        <div className="w-full px-xl py-lg flex gap-lg items-start text-[#4B5563]">
          <span className="material-symbols-outlined text-[40px] text-[#D1D5DB] rotate-180">format_quote</span>
          <div>
            <p className="text-[16px] italic leading-relaxed mb-md">"The way you describe the role is the first step in screening candidates. Focus on what success looks like, not just a checklist of skills."</p>
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
                <img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="text-[14px] font-bold text-[#111827]">Sarah Jenkins, Head of Talent</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
