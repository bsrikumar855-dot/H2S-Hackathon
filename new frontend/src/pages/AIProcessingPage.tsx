import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecruitmentContext } from "../context/RecruitmentContext"
import { rankingService } from "../services/apiClient"

export default function AIProcessingPage() {
  const navigate = useNavigate()
  const { jobDetails, uploadedFiles, setRankingResults } = useRecruitmentContext()
  const [progress, setProgress] = useState(0)
  
  // Pipeline Step States
  const [step1, setStep1] = useState<"pending" | "active" | "complete">("pending")
  const [step2, setStep2] = useState<"pending" | "active" | "complete">("pending")
  const [step3, setStep3] = useState<"pending" | "active" | "complete">("pending")
  const [step4, setStep4] = useState<"pending" | "active" | "complete">("pending")

  useEffect(() => {
    // If no context, go back
    if (!jobDetails || uploadedFiles.length === 0) {
      navigate("/")
      return
    }

    let mounted = true
    
    // Simulate real pipeline loading UI for API waiting
    const runPipeline = async () => {
      setStep1("active")
      await new Promise(r => setTimeout(r, 1000))
      if (!mounted) return
      setStep1("complete")
      setStep2("active")
      setProgress(25)
      
      await new Promise(r => setTimeout(r, 1000))
      if (!mounted) return
      setStep2("complete")
      setStep3("active")
      setProgress(50)
      
      try {
        // Execute real ranking!
        const requestPayload = {
          job_description: jobDetails.description,
          candidates: uploadedFiles.map(f => f.content)
        }
        
        // This takes a while
        const results = await rankingService.executeRanking(requestPayload)
        
        if (!mounted) return
        setStep3("complete")
        setStep4("active")
        setProgress(75)
        
        setRankingResults(results)
        
        await new Promise(r => setTimeout(r, 800))
        if (!mounted) return
        setStep4("complete")
        setProgress(100)
        
        await new Promise(r => setTimeout(r, 500))
        if (!mounted) return
        navigate("/dashboard")
      } catch (e) {
        console.error("Ranking pipeline error:", e)
        if (mounted) {
          navigate("/error")
        }
      }
    }
    
    runPipeline()

    return () => { mounted = false }
  }, [jobDetails, uploadedFiles, navigate, setRankingResults])

  return (
    <div className="max-w-container-max mx-auto px-2xl pt-2xl pb-3xl flex flex-col animate-in-view visible">
      {/* Header Section */}
      <section className="mb-2xl animate-in slide-in-from-bottom-2 fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <h1 className="text-[28px] font-bold text-[#111827] mb-xs">AI Pipeline Active</h1>
            <p className="text-[16px] text-[#4B5563]">Real-time analysis of candidate profiles against job requirements.</p>
          </div>
        </div>
      </section>

      {/* Status Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2xl">
        {/* Left Column: Pipeline visualization */}
        <div className="lg:col-span-8">
          <div className="pipeline-track space-y-xl relative">
            {/* Step 1 */}
            <div className={`flex items-start gap-lg relative z-10 ${step1 === 'pending' ? 'opacity-40' : ''}`}>
              <div className={`step-icon w-10 h-10 rounded-full flex items-center justify-center transition-all-300 
                ${step1 === 'complete' ? 'bg-[#D1FAE5] text-[#059669]' : 
                  step1 === 'active' ? 'bg-[#EEF2FF] text-[#4338CA] animate-pulse shadow-[0_0_0_4px_#E0E7FF]' : 'bg-[#F3F4F6] text-[#9CA3AF]'}`}>
                <span className="material-symbols-outlined text-[20px]">{step1 === 'complete' ? 'check' : 'description'}</span>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-[16px] ${step1 === 'active' ? 'text-[#111827]' : 'text-[#111827]'}`}>Document Parsing</h3>
                  {step1 === 'complete' && <span className="text-[#059669] font-bold text-[12px] tracking-wider">COMPLETED</span>}
                  {step1 === 'active' && <span className="text-[#4338CA] font-bold text-[12px] tracking-wider animate-pulse">IN PROGRESS</span>}
                  {step1 === 'pending' && <span className="text-[#9CA3AF] font-bold text-[12px] tracking-wider">PENDING</span>}
                </div>
                <p className="text-[14px] text-[#4B5563]">Extracting text and structure from {uploadedFiles.length} resumes...</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`flex items-start gap-lg relative z-10 ${step2 === 'pending' ? 'opacity-40' : ''}`}>
              <div className={`step-icon w-10 h-10 rounded-full flex items-center justify-center transition-all-300 
                ${step2 === 'complete' ? 'bg-[#D1FAE5] text-[#059669]' : 
                  step2 === 'active' ? 'bg-[#EEF2FF] text-[#4338CA] animate-pulse shadow-[0_0_0_4px_#E0E7FF]' : 'bg-[#F3F4F6] text-[#9CA3AF]'}`}>
                <span className="material-symbols-outlined text-[20px]">{step2 === 'complete' ? 'check' : 'account_tree'}</span>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-[16px] ${step2 === 'active' ? 'text-[#111827]' : 'text-[#111827]'}`}>Semantic Analysis</h3>
                  {step2 === 'complete' && <span className="text-[#059669] font-bold text-[12px] tracking-wider">COMPLETED</span>}
                  {step2 === 'active' && <span className="text-[#4338CA] font-bold text-[12px] tracking-wider animate-pulse">IN PROGRESS</span>}
                  {step2 === 'pending' && <span className="text-[#9CA3AF] font-bold text-[12px] tracking-wider">PENDING</span>}
                </div>
                <p className="text-[14px] text-[#4B5563]">Mapping experience and skills to the knowledge graph...</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`flex items-start gap-lg relative z-10 ${step3 === 'pending' ? 'opacity-40' : ''}`}>
              <div className={`step-icon w-10 h-10 rounded-full flex items-center justify-center transition-all-300 
                ${step3 === 'complete' ? 'bg-[#D1FAE5] text-[#059669]' : 
                  step3 === 'active' ? 'bg-[#EEF2FF] text-[#4338CA] animate-pulse shadow-[0_0_0_4px_#E0E7FF]' : 'bg-[#F3F4F6] text-[#9CA3AF]'}`}>
                {step3 === 'active' ? (
                  <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                ) : (
                  <span className="material-symbols-outlined text-[20px]">{step3 === 'complete' ? 'check' : 'psychology'}</span>
                )}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-[16px] ${step3 === 'active' ? 'text-[#111827]' : 'text-[#111827]'}`}>Behavioral Profiling</h3>
                  {step3 === 'complete' && <span className="text-[#059669] font-bold text-[12px] tracking-wider">COMPLETED</span>}
                  {step3 === 'active' && <span className="text-[#4338CA] font-bold text-[12px] tracking-wider animate-pulse">IN PROGRESS</span>}
                  {step3 === 'pending' && <span className="text-[#9CA3AF] font-bold text-[12px] tracking-wider">PENDING</span>}
                </div>
                <p className="text-[14px] text-[#4B5563]">Analyzing soft skills and team fit indicators...</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`flex items-start gap-lg relative z-10 ${step4 === 'pending' ? 'opacity-40' : ''}`}>
              <div className={`step-icon w-10 h-10 rounded-full flex items-center justify-center transition-all-300 
                ${step4 === 'complete' ? 'bg-[#D1FAE5] text-[#059669]' : 
                  step4 === 'active' ? 'bg-[#EEF2FF] text-[#4338CA] animate-pulse shadow-[0_0_0_4px_#E0E7FF]' : 'bg-[#F3F4F6] text-[#9CA3AF]'}`}>
                <span className="material-symbols-outlined text-[20px]">{step4 === 'complete' ? 'check' : 'format_list_numbered'}</span>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-[16px] ${step4 === 'active' ? 'text-[#111827]' : 'text-[#111827]'}`}>Final Ranking</h3>
                  {step4 === 'complete' && <span className="text-[#059669] font-bold text-[12px] tracking-wider">COMPLETED</span>}
                  {step4 === 'active' && <span className="text-[#4338CA] font-bold text-[12px] tracking-wider animate-pulse">IN PROGRESS</span>}
                  {step4 === 'pending' && <span className="text-[#9CA3AF] font-bold text-[12px] tracking-wider">PENDING</span>}
                </div>
                <p className="text-[14px] text-[#4B5563]">Calculating match scores and generating insights...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Processing Status */}
        <div className="lg:col-span-4 space-y-lg">
          <div className="bg-white p-xl rounded-2xl border border-outline-variant shadow-sm flex flex-col items-center text-center">
            <h3 className="font-bold text-[18px] text-[#111827] mb-xl">Processing Status</h3>
            
            {/* Circular Progress */}
            <div className="relative w-40 h-40 mb-xl flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#4338CA" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * progress) / 100} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[32px] font-bold text-[#111827]">{progress}%</span>
                <span className="text-[12px] text-[#6B7280]">Complete</span>
              </div>
            </div>

            <p className="text-[16px] font-bold text-[#4338CA] mb-2">{uploadedFiles.length > 0 ? `${Math.max(1, uploadedFiles.length - Math.floor(uploadedFiles.length * (progress/100)))} files remaining...` : 'Analyzing...'}</p>
          </div>
          
          {/* Action Guard */}
          <div className="bg-[#EEF2FF] p-md rounded-xl border border-[#C7D2FE] flex gap-md items-start">
            <span className="material-symbols-outlined text-[#4338CA]">info</span>
            <p className="text-[14px] text-[#4338CA]">Navigating away from this page will pause the current analysis batch. Reports will be saved automatically upon completion.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
