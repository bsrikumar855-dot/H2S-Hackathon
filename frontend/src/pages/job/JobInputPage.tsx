import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecruitment } from "../../context/RecruitmentContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Textarea } from "../../components/ui/Textarea"

export default function JobInputPage() {
  const navigate = useNavigate()
  const { jobTitle, setJobTitle, jobDescription, setJobDescription } = useRecruitment()
  const [error, setError] = useState("")

  const mockJobTitle = "Senior Full-Stack AI Engineer"
  const mockJobDesc = `Position: Senior Full-Stack AI Engineer
Core Stack: React, TypeScript, Tailwind CSS, Python, FastAPI, PostgreSQL, LangGraph

Responsibilities:
- Build state-of-the-art interactive recruiter workflows and dashboards using React and TypeScript.
- Design and integrate multi-agent backend orchestrations using LangGraph and Gemini.
- Implement vector database schemas with pgvector and optimize similarity searches.
- Ensure 100% test coverage for complex agent state transitions and scoring heuristics.

Prerequisites:
- 4+ years of professional full-stack development experience.
- Deep expertise in state management and web application architectures.
- Experience with AI model integration, prompt engineering, or vector spaces.`

  const handlePreFill = () => {
    setJobTitle(mockJobTitle)
    setJobDescription(mockJobDesc)
    setError("")
  }

  const handleAnalyze = () => {
    if (!jobTitle.trim()) {
      setError("Please specify a Job Title before proceeding.")
      return
    }
    if (!jobDescription.trim()) {
      setError("Please fill out the Job Description before proceeding.")
      return
    }
    setError("")
    navigate("/candidates")
  }

  return (
    <div className="min-h-screen bg-[#030014] text-gray-200 antialiased font-sans relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_55%)] pointer-events-none z-0" />

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-2xl">
          
          {/* Back Action */}
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-gray-300 mb-6 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>

          {/* Centered Glass Card */}
          <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md shadow-2xl relative">
            
            {/* Absolute accent border glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent rounded-t-xl" />

            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl sm:text-2xl text-white">Define Job Requirements</CardTitle>
                  <CardDescription>Specify the role parameters for semantic model evaluation.</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePreFill}
                  className="text-xs font-mono"
                >
                  Prefill Mock JD
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              
              {/* Error block */}
              {error && (
                <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Job Title Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">Job Title</label>
                <Input 
                  placeholder="e.g. Senior Full-Stack AI Engineer"
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value)
                    if (error) setError("")
                  }}
                />
              </div>

              {/* Job Description Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">Job Description</label>
                <Textarea 
                  placeholder="Paste complete Job Description text here including stacks, responsibilities, and prerequisites..."
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value)
                    if (error) setError("")
                  }}
                  className="min-h-[220px] font-sans leading-relaxed text-sm"
                />
              </div>

            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-white/5">
              <Button 
                variant="secondary"
                size="md"
                onClick={() => alert("Upload Job Description PDF/DOCX (Simulated mockup file action)")}
                className="w-full sm:w-auto text-sm"
              >
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload JD File
              </Button>
              <Button 
                variant="primary"
                size="md"
                onClick={handleAnalyze}
                className="w-full sm:w-auto text-sm shadow-md shadow-violet-900/20"
              >
                Analyze Job & Continue
              </Button>
            </CardFooter>

          </Card>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="w-full border-t border-white/5 py-4 text-center text-xs text-gray-500 font-mono relative z-10">
        AI Candidate Ranking Engine. Phase B Demo.
      </footer>

    </div>
  )
}
