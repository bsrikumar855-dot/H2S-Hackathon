from pydantic import BaseModel, Field
from typing import List

class ExplanationResponse(BaseModel):
    matching_summary: str = Field(..., description="High-level 2-sentence summary of candidate suitability.")
    key_differentiators: List[str] = Field(default_factory=list, description="Top positive callouts for candidate's rank.")
    perceived_risks: List[str] = Field(default_factory=list, description="Risk elements or missing dependencies identified.")
    interview_guidance_questions: List[str] = Field(default_factory=list, description="Targeted vetting questions.")
