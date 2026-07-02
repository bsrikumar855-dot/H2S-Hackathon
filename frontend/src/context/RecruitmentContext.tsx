import { createContext, useContext, useState, type ReactNode } from "react"
import { rankingService } from "../services/rankingService"
import { type RankingRunItem, type BehavioralSignalsModel, type RankingRunRequest } from "../services/api"

export interface UploadedFileItem {
  name: string
  size: number
  content: string
}

interface RecruitmentContextType {
  jobTitle: string
  setJobTitle: (title: string) => void
  jobDescription: string
  setJobDescription: (desc: string) => void
  uploadedFiles: UploadedFileItem[]
  addUploadedFile: (file: File) => Promise<void>
  removeUploadedFile: (name: string) => void
  clearAll: () => void
  apiRankings: RankingRunItem[]
  isLoading: boolean
  apiError: string
  executeRanking: () => Promise<void>
  loadMockFiles: () => void
}

const RecruitmentContext = createContext<RecruitmentContextType | undefined>(undefined)

export const useRecruitment = () => {
  const context = useContext(RecruitmentContext)
  if (!context) {
    throw new Error("useRecruitment must be used within a RecruitmentContextProvider")
  }
  return context
}

// Preset mock profiles for easy dry-runs
const mockProfileFiles: UploadedFileItem[] = [
  {
    name: "Sophia_Chen_Resume.pdf",
    size: 204800,
    content: `Sophia Chen
Senior Frontend Engineer
Experience: 5 years

Summary:
Highly skilled frontend engineer with expertise in structuring state-driven single page applications. Proficient in React, TypeScript, Next.js, and Tailwind CSS.

Technical Skills:
React, TypeScript, Next.js, Tailwind CSS, Redux Toolkit, Node.js.

Projects:
- Interactive Core UI: Maintained large-scale corporate design libraries using CSS custom properties.
- State Optimizations: Managed state-driven workflows reducing client overhead by 40%.`
  },
  {
    name: "Marcus_Vance_Resume.docx",
    size: 153600,
    content: `Marcus Vance
Backend Engineer
Experience: 4 years

Summary:
Backend developer specializing in AI pipelines and graph-based workflow architectures. Experienced with FastAPI, SQLite, and LangGraph orchestrations.

Technical Skills:
Python, FastAPI, SQLite, OpenAI API, Docker.

Projects:
- Multi-Agent Orchestration: Constructed LangGraph pipelines integrating multi-agent processing systems.
- Vector Core: Configured similarity searches using SQLite JSON vectors.`
  },
  {
    name: "Elena_Rostova_Resume.pdf",
    size: 307200,
    content: `Elena Rostova
Senior System Developer
Experience: 6 years

Summary:
Experienced enterprise backend engineer looking to transition into fullstack developer roles. Strong Java and Spring Boot foundations.

Technical Skills:
Microservices, Spring Boot, SQL Server, AWS, Jira, Docker, Java.

Projects:
- Distributed Ledger: Maintained distributed Spring Boot microservices handling transactional flows.`
  },
  {
    name: "Devon_Miller_Resume.txt",
    size: 81920,
    content: `Devon Miller
Fullstack Developer
Experience: 3 years

Summary:
Full-stack generalist with background in rapid startup prototyping and legacy MVC codebases.

Technical Skills:
Ruby on Rails, SQLite, HTML5, Git, Ruby, JavaScript.

Projects:
- Prototyping Gateways: Deployed rapid startup client tools on Heroku using monolithic Rails.`
  }
]

export const RecruitmentContextProvider = ({ children }: { children: ReactNode }) => {
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([])
  const [apiRankings, setApiRankings] = useState<RankingRunItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const addUploadedFile = (file: File): Promise<void> => {
    return new Promise((resolve) => {
      if (file.name.endsWith(".txt")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target?.result as string
          setUploadedFiles((prev) => {
            // Avoid duplicates by name
            if (prev.some((f) => f.name === file.name)) return prev
            return [...prev, { name: file.name, size: file.size, content: text }]
          })
          resolve()
        }
        reader.readAsText(file)
      } else {
        // PDF or DOCX file text simulation helper
        const cleanedName = file.name
          .replace(/\.(pdf|docx)/i, "")
          .replace(/[_-]/g, " ")
          .trim()

        const simulatedText = `${cleanedName}
Senior Systems Developer
Experience: 5 years

Summary:
Dynamic software engineer with expertise in building responsive applications and database integration.

Technical Skills:
Python, FastAPI, SQLite, React, TypeScript, Docker, Git.

Projects:
- Application Refactoring: Successfully migrated monolithic services to FastAPI.
- Database Integration: Configured SQLite JSON vectors schema configurations.`

        setUploadedFiles((prev) => {
          if (prev.some((f) => f.name === file.name)) return prev
          return [...prev, { name: file.name, size: file.size, content: simulatedText }]
        })
        resolve()
      }
    })
  }

  const removeUploadedFile = (name: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== name))
  }

  const loadMockFiles = () => {
    setUploadedFiles(mockProfileFiles)
    if (!jobTitle) setJobTitle("Senior Full-Stack AI Engineer")
    if (!jobDescription) {
      setJobDescription(`Position: Senior Full-Stack AI Engineer
Core Stack: React, TypeScript, Tailwind CSS, Python, FastAPI, SQLite, LangGraph

Responsibilities:
- Build state-of-the-art interactive recruiter workflows and dashboards using React and TypeScript.
- Design and integrate multi-agent backend orchestrations using LangGraph and Gemini.
- Implement vector database schemas with SQLite JSON vectors and optimize similarity searches.
- Ensure 100% test coverage for complex agent state transitions and scoring heuristics.

Prerequisites:
- 4+ years of professional full-stack development experience.
- Deep expertise in state management and web application architectures.
- Experience with AI model integration, prompt engineering, or vector spaces.`)
    }
  }

  const clearAll = () => {
    setJobTitle("")
    setJobDescription("")
    setUploadedFiles([])
    setApiRankings([])
    setIsLoading(false)
    setApiError("")
  }

  const executeRanking = async () => {
    if (uploadedFiles.length === 0) return

    if (!jobDescription.trim()) {
      const errorMsg = "Job description is missing. Please return to the Jobs page to define the role before analyzing candidates."
      setApiError(errorMsg)
      throw new Error(errorMsg)
    }

    setIsLoading(true)
    setApiError("")

    try {
      const candidateTexts = uploadedFiles.map((file) => file.content)
      const signals: Record<string, BehavioralSignalsModel> = {}

      uploadedFiles.forEach((file) => {
        const firstLine = file.content.split("\n")[0].trim()
        const guessName = firstLine.length < 40 ? firstLine : file.name.replace(/\.(pdf|docx|txt)/i, "").replace(/[_-]/g, " ").trim()

        // Deterministic hash based on candidate name for realistic behavioral signals
        const hash = guessName.length
        signals[guessName] = {
          profile_updates_last_30_days: (hash % 4) + 1,
          login_frequency: (hash % 15) + 3,
          response_rate: Number((0.7 + (hash % 3) * 0.1).toFixed(2)),
          application_count: (hash % 6) + 2,
          certification_activity: hash % 2,
          github_activity: (hash % 20) + 5,
        }
      })

      const payload: RankingRunRequest = {
        job_description: jobDescription,
        candidates: candidateTexts,
        behavioral_signals: signals,
      }

      const results = await rankingService.runRanking(payload)
      setApiRankings(results)
    } catch (err: any) {
      console.error("[RecruitmentContext] Ranking run error:", err)
      const errorMsg =
        err.response?.data?.detail ||
        err.message ||
        "Failed to connect to the backend agent pipeline. Ensure your database is running."
      setApiError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RecruitmentContext.Provider
      value={{
        jobTitle,
        setJobTitle,
        jobDescription,
        setJobDescription,
        uploadedFiles,
        addUploadedFile,
        removeUploadedFile,
        clearAll,
        apiRankings,
        isLoading,
        apiError,
        executeRanking,
        loadMockFiles,
      }}
    >
      {children}
    </RecruitmentContext.Provider>
  )
}
