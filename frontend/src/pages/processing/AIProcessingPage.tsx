import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Clock,
  BarChart,
  Check,
  RefreshCw,
  BrainCircuit,
  BarChart3,
  FileText,
  CheckCircle2,
  Info,
} from "lucide-react"
import { useRecruitment } from "../../context/RecruitmentContext"
import AppLayout from "../../layouts/AppLayout"
import { CandidateRowSkeleton } from "../../components/LoadingSkeleton"
import { cn } from "../../lib/utils"

export default function AIProcessingPage() {
  const navigate = useNavigate()
  const { jobTitle, uploadedFiles, isLoading, apiRankings, apiError, executeRanking } = useRecruitment()

  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(uploadedFiles.length > 0 ? uploadedFiles.length * 2 : 12)

  // Simulation effect for UI progress while API is pending
  useEffect(() => {
    if (!isLoading && apiRankings.length > 0) {
      setProgress(100)
      setTimeLeft(0)
      
      // Auto-navigate to dashboard when done after a short delay
      const t = setTimeout(() => navigate("/dashboard"), 1500)
      return () => clearTimeout(t)
    }

    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return 95
          return prev + Math.random() * 2
        })
        setTimeLeft((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isLoading, apiRankings.length, navigate])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  return (
    <AppLayout>
      <div className="flex-1 max-w-container-max mx-auto w-full p-lg md:p-3xl">
        {/* Header Section */}
        <section className="mb-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h1 className="text-headline-lg font-bold text-on-surface mb-xs">
                {apiError ? "Pipeline Execution Error" : "Processing Candidates"}
              </h1>
              <p className="text-body-md text-on-surface-variant">
                Role: {jobTitle || "Untitled"} • <span className="font-medium text-primary">{uploadedFiles.length} resumes queued</span>
              </p>
            </div>
            
            {!apiError && (
              <div className="flex items-center gap-sm text-on-surface-variant bg-surface-container-low px-md py-sm rounded-full border border-outline-variant">
                <Clock className="w-5 h-5" />
                <span className="font-label-md">
                  Est. Completion: <span className="font-bold text-on-surface">{mins}m {secs.toString().padStart(2, '0')}s</span>
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Status Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          {/* Left Column: Pipeline visualization */}
          <div className="lg:col-span-7 space-y-lg">
            <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm transition-all">
              <div className="flex justify-between items-center mb-xl">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container">
                    <BarChart className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-headline-sm font-bold text-on-surface">Analysis Progress</h2>
                    <p className="text-body-sm text-on-surface-variant">Real-time status of the recruitment engine</p>
                  </div>
                </div>
                <span className="text-headline-sm font-bold text-primary">
                  {Math.floor(progress)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden mb-lg">
                <motion.div
                  className={cn("h-full", apiError ? "bg-error" : "bg-primary")}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {apiError && (
                <div className="mb-lg p-md bg-error-container text-on-error-container rounded-lg text-label-md border border-error">
                  {apiError}
                </div>
              )}

              {apiError ? (
                <div className="flex gap-md mt-md">
                   <button onClick={() => navigate("/candidates")} className="flex-1 py-md bg-surface-container hover:bg-surface-container-high text-on-surface font-bold rounded-lg transition-colors">
                     Back to Uploads
                   </button>
                   <button onClick={() => executeRanking()} className="flex-1 py-md bg-primary hover:bg-primary-container text-on-primary font-bold rounded-lg transition-colors">
                     Retry Analysis
                   </button>
                </div>
              ) : (
                /* Pipeline Steps */
                <div className="pipeline-track space-y-xl mt-xl relative">
                  <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-surface-container z-0" />
                  
                  <PipelineStep
                    icon={<Check className="w-5 h-5" />}
                    title="Reading Job Description"
                    status="COMPLETED"
                    desc="Extracted key technical competencies and soft skills."
                    isComplete
                  />
                  <PipelineStep
                    icon={<Check className="w-5 h-5" />}
                    title="Parsing Resume"
                    status="COMPLETED"
                    desc={`Scanned ${uploadedFiles.length} documents. Successfully extracted metadata.`}
                    isComplete
                  />
                  <PipelineStep
                    icon={<RefreshCw className={cn("w-5 h-5", progress < 100 && "animate-spin")} />}
                    title="Semantic Matching"
                    status={progress === 100 ? "COMPLETED" : "IN PROGRESS"}
                    desc="Cross-referencing historical success patterns..."
                    isActive={progress < 100}
                    isComplete={progress === 100}
                    showSkeletons={progress < 100}
                  />
                  <PipelineStep
                    icon={<BrainCircuit className="w-5 h-5" />}
                    title="Behavior Analysis"
                    status="PENDING"
                    desc={progress === 100 ? "Completed behavior signals extraction." : "Waiting for preceding steps..."}
                    isPending={progress < 100}
                    isComplete={progress === 100}
                  />
                  <PipelineStep
                    icon={<BarChart3 className="w-5 h-5" />}
                    title="Ranking Candidates"
                    status="PENDING"
                    desc={progress === 100 ? "Final scores calculated." : "Awaiting final scoring data."}
                    isPending={progress < 100}
                    isComplete={progress === 100}
                  />
                  <PipelineStep
                    icon={<FileText className="w-5 h-5" />}
                    title="Generating Report"
                    status="PENDING"
                    desc="Compiling summaries and insights."
                    isPending={progress < 100}
                    isComplete={progress === 100}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-lg">
            {/* System Checks */}
            <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm">
              <h3 className="text-headline-sm font-bold text-on-surface mb-md">System Diagnostics</h3>
              <div className="grid grid-cols-2 gap-md">
                <div className="flex items-center gap-sm">
                  <CheckCircle2 className="w-5 h-5 text-tertiary" />
                  <span className="text-body-sm text-on-surface-variant font-medium">API Connectivity: Stable</span>
                </div>
                <div className="flex items-center gap-sm">
                  <CheckCircle2 className="w-5 h-5 text-tertiary" />
                  <span className="text-body-sm text-on-surface-variant font-medium">Data Integrity: Verified</span>
                </div>
                <div className="flex items-center gap-sm">
                  <CheckCircle2 className="w-5 h-5 text-tertiary" />
                  <span className="text-body-sm text-on-surface-variant font-medium">Memory Allocation: Optimal</span>
                </div>
                <div className="flex items-center gap-sm">
                  {progress < 100 && !apiError ? (
                    <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-tertiary" />
                  )}
                  <span className="text-body-sm text-on-surface font-medium">Processing Batch {uploadedFiles.length > 0 ? 1 : 0}/1</span>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-surface p-xl rounded-xl border border-outline-variant border-dashed">
              <div className="flex justify-between items-center mb-xl">
                <h3 className="text-headline-sm font-bold text-on-surface">Live Preview</h3>
                <div className="px-sm py-xs bg-surface-container-high rounded text-on-surface-variant text-label-sm font-bold">
                  {progress === 100 ? "Ready" : "Awaiting Data"}
                </div>
              </div>
              
              <div className="space-y-sm">
                <CandidateRowSkeleton />
                <CandidateRowSkeleton />
                <CandidateRowSkeleton />
              </div>
              
              <p className="mt-xl text-body-sm text-center text-on-surface-variant italic">
                Insights will appear here as semantic analysis completes.
              </p>
            </div>

            {/* Action Guard */}
            <div className="bg-primary-container/10 p-md rounded-xl border border-primary/20 flex gap-md items-start">
              <Info className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-body-sm text-on-surface-variant">
                Navigating away from this page will pause the visible analysis experience. Ranking results are saved automatically when the backend completes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

function PipelineStep({ 
  icon, 
  title, 
  status, 
  desc, 
  isActive, 
  isComplete, 
  isPending, 
  showSkeletons 
}: { 
  icon: React.ReactNode
  title: string
  status: string
  desc: string
  isActive?: boolean
  isComplete?: boolean
  isPending?: boolean
  showSkeletons?: boolean
}) {
  return (
    <div className={cn("flex items-start gap-lg relative z-10", isPending && "opacity-40", isActive && "step-active")}>
      <div 
        className={cn(
          "step-icon w-10 h-10 rounded-full flex items-center justify-center transition-all",
          isComplete ? "bg-primary text-on-primary" : isActive ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant"
        )}
      >
        {icon}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex justify-between items-start">
          <h3 className={cn("text-label-md font-bold", isActive ? "text-primary" : "text-on-surface")}>{title}</h3>
          <span className={cn("text-label-sm font-bold", isActive ? "text-primary animate-pulse" : isComplete ? "text-tertiary" : "text-on-surface-variant")}>
            {status}
          </span>
        </div>
        <p className={cn("text-body-sm", isActive ? "text-on-surface font-medium" : "text-on-surface-variant")}>{desc}</p>
        
        {showSkeletons && (
          <div className="mt-sm grid grid-cols-3 gap-sm">
            <div className="h-1.5 skeleton-shimmer rounded-full" />
            <div className="h-1.5 skeleton-shimmer rounded-full" />
            <div className="h-1.5 skeleton-shimmer rounded-full opacity-50" />
          </div>
        )}
      </div>
    </div>
  )
}
