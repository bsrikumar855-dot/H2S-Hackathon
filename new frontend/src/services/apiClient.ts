import axios from "axios"
import type { 
  RankingRunRequest, RankingRunItem, HealthResponse, 
  JobCreate, JobResponse, RankingRequest, RankingResponse
} from "../types/api"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

export const rankingService = {
  checkHealth: async (): Promise<HealthResponse> => {
    const { data } = await api.get<HealthResponse>("/health")
    return data
  },
  
  createJob: async (request: JobCreate): Promise<JobResponse> => {
    const { data } = await api.post<JobResponse>("/api/v1/jobs", request)
    return data
  },

  uploadCandidate: async (file: File): Promise<{ task_id: string, status: string, message: string }> => {
    const formData = new FormData()
    formData.append("file", file)
    const { data } = await api.post("/api/v1/candidates", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    return data
  },

  rankJobCandidates: async (jobId: string, request: RankingRequest): Promise<RankingResponse> => {
    const { data } = await api.post<RankingResponse>(`/api/v1/jobs/${jobId}/rank`, request)
    return data
  },
  
  // Legacy all-in-one endpoint
  executeRanking: async (request: RankingRunRequest): Promise<RankingRunItem[]> => {
    const { data } = await api.post<RankingRunItem[]>("/api/v1/rankings/run", request)
    return data
  },
}
