from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from uuid import UUID
from backend.schemas.explanation import ExplanationResponse

class ScoreBreakdown(BaseModel):
    semantic_similarity: float
    experience_alignment: float
    skill_match: float
    trajectory_bonus: float

class ShortlistItem(BaseModel):
    rank: int
    candidate_id: UUID
    full_name: str
    total_score: float
    confidence_score: float
    score_breakdown: ScoreBreakdown
    explanation: ExplanationResponse

class RankingRequest(BaseModel):
    candidate_ids: Optional[List[UUID]] = Field(default_factory=list)
    override_weights: Optional[Dict[str, float]] = None

class RankingResponse(BaseModel):
    ranking_run_id: UUID
    job_id: UUID
    shortlist: List[ShortlistItem]

class BehavioralSignalsModel(BaseModel):
    profile_updates_last_30_days: int = 0
    login_frequency: int = 0
    response_rate: float = 0.0
    application_count: int = 0
    certification_activity: int = 0
    github_activity: int = 0

class RankingRunRequest(BaseModel):
    job_description: str
    candidates: List[str]
    behavioral_signals: Optional[Dict[str, BehavioralSignalsModel]] = None

class ParsedCandidate(BaseModel):
    candidate_name: str
    skills: List[str]
    experience: float
    projects: List[str]
    education: List[str]
    summary: str

class ExplanationModel(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    explanation: str

class RankingRunItem(BaseModel):
    rank: int
    score: float
    confidence: float
    semantic_score: float
    skill_score: float
    experience_score: float
    education_score: float
    project_score: float
    certification_score: float
    behavior_score: Optional[float] = None
    resume_quality_score: float
    recommendation: str
    matched_skills: List[str]
    missing_skills: List[str]
    transferable_skills: List[str]
    explanation: ExplanationModel
    candidate: ParsedCandidate
