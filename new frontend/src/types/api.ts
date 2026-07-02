// ─── Backend API Types ────────────────────────────────────────────────────────

export interface HealthResponse {
  status: string
  database: string
}

export interface JobCreate {
  title: string
  raw_description: string
}

export interface TechnicalSkillsSchema {
  mandatory: string[]
  preferred: string[]
}

export interface StructuredJobData {
  role_title: string
  seniority_level: string
  technical_skills: TechnicalSkillsSchema
  minimum_years_experience: number
  status: string
  reasoning: string
}

export interface JobResponse {
  job_id: string
  title: string
  raw_description: string
  structured_data: StructuredJobData
  created_at: string
  updated_at: string
}

export interface RankingRequest {
  job_description: string
  candidates: string[]
}

export interface ScoreBreakdown {
  semantic_similarity: number
  experience_alignment: number
  skill_match: number
  trajectory_bonus: number
}

export interface ExplanationResponse {
  matching_summary: string
  key_differentiators: string[]
  perceived_risks: string[]
  interview_guidance_questions: string[]
}

export interface ShortlistItem {
  rank: number
  candidate_id: string
  full_name: string
  total_score: number
  confidence_score: number
  score_breakdown: ScoreBreakdown
  explanation: ExplanationResponse
}

export interface RankingResponse {
  ranking_run_id: string
  job_id: string
  shortlist: ShortlistItem[]
}

export interface BehavioralSignals {
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
  behavioral_signals?: Record<string, BehavioralSignals> | null
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

export interface UploadedFile {
  id: string
  name: string
  size: number
  content: string
  type: string
}
