from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Optional
from uuid import UUID
from datetime import datetime

class TechnicalSkillsSchema(BaseModel):
    mandatory: List[str] = Field(default_factory=list)
    preferred: List[str] = Field(default_factory=list)

class StructuredJobData(BaseModel):
    role_title: str
    seniority_level: str  # JUNIOR, MID, SENIOR, LEAD, PRINCIPAL
    technical_skills: TechnicalSkillsSchema
    business_domain: Optional[str] = None
    architecture_patterns: List[str] = Field(default_factory=list)
    minimum_years_experience: int
    soft_skills: List[str] = Field(default_factory=list)
    status: str = "VALID"  # VALID, INVALID, AMBIGUOUS
    reasoning: Optional[str] = None

class JobCreate(BaseModel):
    title: str = Field(..., max_length=255)
    raw_description: str

class JobUpdate(BaseModel):
    title: Optional[str] = None
    raw_description: Optional[str] = None
    structured_data: Optional[StructuredJobData] = None

class JobResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    job_id: UUID
    title: str
    raw_description: str
    structured_data: StructuredJobData
    created_at: datetime
    updated_at: datetime
