from pydantic import BaseModel, Field
from typing import List, Dict

class TransferableAlternative(BaseModel):
    required: str
    candidate_has: str
    confidence: float = Field(..., ge=0.0, le=1.0)

class SkillGapDetails(BaseModel):
    matched_mandatory: List[str] = Field(default_factory=list)
    matched_preferred: List[str] = Field(default_factory=list)
    transferable_alternatives: List[TransferableAlternative] = Field(default_factory=list)
    hard_gaps: List[str] = Field(default_factory=list)
    soft_gaps: List[str] = Field(default_factory=list)
