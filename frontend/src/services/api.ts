import axios from "axios"

// API client instance pointing to the FastAPI backend API
export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export interface BehavioralSignalsModel {
  profile_updates_last_30_days: number
  login_frequency: number
  response_rate: number
  application_count: number
  certification_activity: number
  github_activity: number
}

export interface RankingRunRequest {
  job_description: string
  candidates: string[]
  behavioral_signals?: Record<string, BehavioralSignalsModel> | null
}

export interface ParsedCandidate {
  candidate_name: string
  skills: string[]
  experience: number
  projects: string[]
  education: string[]
  summary: string
}

export interface ExplanationModel {
  strengths: string[]
  weaknesses: string[]
  explanation: string
}

export interface RankingRunItem {
  rank: number
  score: number
  confidence: number
  semantic_score: number
  skill_score: number
  experience_score: number
  behavior_score: number | null
  matched_skills: string[]
  missing_skills: string[]
  transferable_skills: string[]
  explanation: ExplanationModel
  candidate: ParsedCandidate
}
