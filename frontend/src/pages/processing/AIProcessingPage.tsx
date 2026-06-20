import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecruitment } from "../../context/RecruitmentContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card"
import { ProgressBar } from "../../components/ui/ProgressBar"
import { Button } from "../../components/ui/Button"

interface ProcessStep {
  label: string
  status: "pending" | "active" | "completed"
}

export default function AIProcessingPage() {
  const navigate = useNavigate()
  const { executeRanking, apiError } = useRecruitment()
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [steps, setSteps] = useState<ProcessStep[]>([
    { label: "Understanding Job Requirements", status: "active" },
    { label: "Parsing Candidate Profiles", status: "pending" },
    { label: "Generating Embeddings", status: "pending" },
    { label: "Semantic Matching", status: "pending" },
    { label: "Behavioral Analysis", status: "pending" },
    { label: "Ranking Candidates", status: "pending" },
    { label: "Generating Explanations", status: "pending" }
  ])

  const triggerRankingApi = () => {
    setErrorMessage("")
    setProgress(0)
    setSteps([
      { label: "Understanding Job Requirements", status: "active" },
      { label: "Parsing Candidate Profiles", status: "pending" },
      { label: "Generating Embeddings", status: "pending" },
      { label: "Semantic Matching", status: "pending" },
      { label: "Behavioral Analysis", status: "pending" },
      { label: "Ranking Candidates", status: "pending" },
      { label: "Generating Explanations", status: "pending" }
    ])

    let currentStep = 0
    
    // Smoothly tick through the first few steps
    const stepInterval = setInterval(() => {
      setSteps((prevSteps) => {
        return prevSteps.map((step, idx) => {
          if (idx < currentStep) {
            return { ...step, status: "completed" }
          } else if (idx === currentStep) {
            return { ...step, status: "active" }
          } else {
            return { ...step, status: "pending" }
          }
        })
      })

      setProgress((prev) => Math.min(prev + 12, 80))
      currentStep++
      
      // Pause at step index 5 ("Ranking Candidates") to await actual API completion
      if (currentStep >= 5) {
        clearInterval(stepInterval)
      }
    }, 400)

    executeRanking()
      .then(() => {
        clearInterval(stepInterval)
        // Set all steps to completed and progress to 100%
        setSteps(prevSteps => prevSteps.map(step => ({ ...step, status: "completed" })))
        setProgress(100)
        
        setTimeout(() => {
          navigate("/dashboard")
        }, 800)
      })
      .catch((err: any) => {
        clearInterval(stepInterval)
        setErrorMessage(err.message || apiError || "An unexpected error occurred during backend agent orchestration.")
      })
  }

  useEffect(() => {
    triggerRankingApi()
  }, [])

  return (
    <div className="min-h-screen bg-[#030014] text-gray-200 antialiased font-sans relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Decorative center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_45%)] pointer-events-none z-0" />

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-xl">
          
          <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md shadow-2xl relative p-2">
            
            {/* Absolute accent border glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent rounded-t-xl" />

            {!errorMessage ? (
              <>
                <CardHeader className="text-center pt-8">
                  {/* Spinner halo logo */}
                  <div className="relative h-16 w-16 mx-auto mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-t-violet-500 border-r-violet-500/20 border-b-violet-500/10 border-l-violet-500/30 animate-spin duration-1000" />
                    <div className="absolute h-10 w-10 rounded-full bg-violet-600/15 animate-ping duration-1500" />
                    <span className="h-3 w-3 rounded-full bg-violet-400" />
                  </div>

                  <CardTitle className="text-xl sm:text-2xl text-white">AI Suitability Engine Processing</CardTitle>
                  <CardDescription>Evaluating semantic vectors and scoring active recruiter metrics...</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 px-6 pb-8">
                  
                  {/* Main Progress Bar */}
                  <div className="pt-2">
                    <ProgressBar value={progress} label="Model Execution Progress" variant="primary" animate={true} />
                  </div>

                  {/* Progress checklist */}
                  <div className="space-y-3.5 bg-black/30 rounded-xl p-5 border border-white/5 mt-4">
                    {steps.map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 text-sm">
                        <span className={`transition-colors duration-200 ${
                          step.status === "completed" ? "text-gray-300" : 
                          step.status === "active" ? "text-violet-400 font-semibold animate-pulse" : 
                          "text-gray-600 font-mono"
                        }`}>
                          {step.label}
                        </span>
                        
                        <div className="shrink-0">
                          {step.status === "completed" && (
                            <span className="h-5 w-5 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs animate-in zoom-in-50 duration-200">
                              ✓
                            </span>
                          )}
                          {step.status === "active" && (
                            <div className="h-4 w-4 rounded-full border border-t-violet-400 border-r-transparent border-b-transparent border-l-transparent animate-spin duration-700" />
                          )}
                          {step.status === "pending" && (
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-700 block mr-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </>
            ) : (
              // Beautiful Glassmorphic Error/Retry State Panel
              <>
                <CardHeader className="text-center pt-8">
                  <div className="relative h-16 w-16 mx-auto mb-6 flex items-center justify-center">
                    <span className="h-14 w-14 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold text-2xl animate-bounce">
                      ⚠
                    </span>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-rose-400">Pipeline Execution Error</CardTitle>
                  <CardDescription>The multi-agent orchestration workflow encountered an issue.</CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-6 mt-2">
                  <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-xl text-xs text-rose-300 font-mono leading-relaxed whitespace-pre-wrap max-h-[180px] overflow-y-auto">
                    {errorMessage}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed text-center">
                    Please ensure the PostgreSQL vector database and FastAPI server are running locally, and that you loaded candidate files with readable text.
                  </p>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5 px-6 pb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/candidates")} 
                    className="w-full sm:w-1/2 text-xs font-mono"
                  >
                    ← Back to Uploads
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={triggerRankingApi} 
                    className="w-full sm:w-1/2 text-xs font-mono shadow-md shadow-violet-900/20"
                  >
                    Retry Analysis
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="w-full border-t border-white/5 py-4 text-center text-xs text-gray-500 font-mono relative z-10">
        AI Candidate Ranking Engine. Phase C Backend Integration.
      </footer>

    </div>
  )
}
