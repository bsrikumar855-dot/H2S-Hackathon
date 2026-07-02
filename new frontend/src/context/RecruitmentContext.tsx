import { createContext, useState, ReactNode, useContext } from "react"
import type { UploadedFile, RankingRunItem } from "../types/api"

interface JobDetails {
  title: string
  description: string
}

interface RecruitmentContextState {
  jobDetails: JobDetails | null
  setJobDetails: (title: string, desc: string) => void
  uploadedFiles: UploadedFile[]
  setUploadedFiles: (files: UploadedFile[]) => void
  rankingResults: RankingRunItem[]
  setRankingResults: (results: RankingRunItem[]) => void
}

const RecruitmentContext = createContext<RecruitmentContextState | undefined>(undefined)

export function RecruitmentContextProvider({ children }: { children: ReactNode }) {
  const [jobDetails, setJobDetailsState] = useState<JobDetails | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [rankingResults, setRankingResults] = useState<RankingRunItem[]>([])

  const setJobDetails = (title: string, desc: string) => {
    setJobDetailsState({ title, description: desc })
  }

  return (
    <RecruitmentContext.Provider
      value={{
        jobDetails,
        setJobDetails,
        uploadedFiles,
        setUploadedFiles,
        rankingResults,
        setRankingResults,
      }}
    >
      {children}
    </RecruitmentContext.Provider>
  )
}

export function useRecruitmentContext() {
  const context = useContext(RecruitmentContext)
  if (!context) {
    throw new Error("useRecruitmentContext must be used within RecruitmentContextProvider")
  }
  return context
}
