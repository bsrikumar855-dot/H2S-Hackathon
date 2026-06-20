from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Dict, Optional, Any
from uuid import UUID
from datetime import datetime, date

class CandidateSkillBase(BaseModel):
    skill_name: str
    normalized_skill: str
    years_experience: Optional[float] = None
    verified: bool = False

class CandidateSkillCreate(CandidateSkillBase):
    pass

class CandidateSkillResponse(CandidateSkillBase):
    id: UUID
    candidate_id: UUID

    model_config = ConfigDict(from_attributes=True)


class ExperienceHistoryBase(BaseModel):
    company: str
    title: str
    start_date: date
    end_date: Optional[date] = None  # None for "Present"
    duration_months: int
    description: Optional[str] = None
    quantified_impact: Optional[List[str]] = Field(default_factory=list)
    skills_applied: Optional[List[str]] = Field(default_factory=list)

class ExperienceHistoryCreate(ExperienceHistoryBase):
    pass

class ExperienceHistoryResponse(ExperienceHistoryBase):
    id: UUID
    candidate_id: UUID

    model_config = ConfigDict(from_attributes=True)


class CandidateCreate(BaseModel):
    full_name: str = Field(..., max_length=255)
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    total_years_experience: Optional[float] = None
    location: Optional[str] = None
    raw_resume_text: Optional[str] = None
    external_links: Optional[Dict[str, str]] = Field(default_factory=dict)
    meta_attributes: Optional[Dict[str, Any]] = Field(default_factory=dict)

class CandidateResponse(BaseModel):
    id: UUID
    full_name: str
    email: Optional[EmailStr]
    phone: Optional[str]
    total_years_experience: Optional[float]
    location: Optional[str]
    external_links: Dict[str, str]
    meta_attributes: Dict[str, Any]
    experiences: List[ExperienceHistoryResponse] = Field(default_factory=list)
    skills: List[CandidateSkillResponse] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
