import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.schemas.job import JobCreate, JobResponse, StructuredJobData, TechnicalSkillsSchema
from backend.schemas.candidate import CandidateResponse
from backend.schemas.ranking import RankingRequest, RankingResponse, ShortlistItem, ScoreBreakdown, RankingRunRequest, RankingRunItem
from backend.schemas.explanation import ExplanationResponse
from backend.graph.workflow import recruitment_graph

router = APIRouter(prefix="/v1")

@router.post("/jobs", response_model=JobResponse, status_code=201)
def create_job(payload: JobCreate, db: Session = Depends(get_db)):
    """
    Submit a raw job description for parsing and structure extraction.
    """
    # Mocking standard successful Job Intelligence Agent parsing logic
    mock_id = uuid.uuid4()
    structured = StructuredJobData(
        role_title=payload.title,
        seniority_level="SENIOR",
        technical_skills=TechnicalSkillsSchema(mandatory=["Python", "FastAPI"], preferred=[]),
        minimum_years_experience=5,
        status="VALID",
        reasoning="Successfully initialized mockup structured job details."
    )
    return JobResponse(
        job_id=mock_id,
        title=payload.title,
        raw_description=payload.raw_description,
        structured_data=structured,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )


@router.post("/candidates", status_code=202)
def upload_candidate(
    file: UploadFile = File(...),
    github_url: Optional[str] = Form(None),
    linkedin_url: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Upload resume file (PDF/Docx) and queue candidate parsing task.
    """
    return {
        "task_id": str(uuid.uuid4()),
        "status": "PROCESSING",
        "message": f"Successfully received resume: {file.filename}. Extraction scheduled."
    }


@router.post("/jobs/{job_id}/rank", response_model=RankingResponse)
def rank_candidates(job_id: uuid.UUID, payload: RankingRequest, db: Session = Depends(get_db)):
    """
    Trigger candidate ranking pipeline using LangGraph orchestrations.
    """
    # Mocking single shortlist entry response
    mock_candidate_id = uuid.uuid4()
    shortlist_item = ShortlistItem(
        rank=1,
        candidate_id=mock_candidate_id,
        full_name="Jane Doe (Mock)",
        total_score=95.0,
        confidence_score=0.98,
        score_breakdown=ScoreBreakdown(
            semantic_similarity=90.0,
            experience_alignment=100.0,
            skill_match=95.0,
            trajectory_bonus=90.0
        ),
        explanation=ExplanationResponse(
            matching_summary="Strong match with FastAPI and Python expertise.",
            key_differentiators=["Demonstrated microservices alignment"],
            perceived_risks=[],
            interview_guidance_questions=[]
        )
    )
    return RankingResponse(
        ranking_run_id=uuid.uuid4(),
        job_id=job_id,
        shortlist=[shortlist_item]
    )


@router.post("/rankings/run", response_model=List[RankingRunItem])
def run_end_to_end_ranking(payload: RankingRunRequest):
    """
    Executes the entire intelligence pipeline end-to-end:
    JD parsing -> Candidate parsing -> Semantic Matching -> Ranking.
    """
    # 1. Build initial state for the LangGraph workflow
    initial_state = {
        "raw_job_description": payload.job_description,
        "candidates": payload.candidates,
        "behavioral_signals": {
            k: v.model_dump() for k, v in payload.behavioral_signals.items()
        } if payload.behavioral_signals else {},
        "scores": {},
        "rankings": [],
        "explanations": [],
        "errors": [],
        "override_weights": None,
        "copilot_query": None
    }
    
    # 2. Invoke the compiled graph
    try:
        final_state = recruitment_graph.invoke(initial_state)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline execution error: {e}")
        
    # Check for execution errors recorded by agents
    if final_state.get("errors"):
        raise HTTPException(status_code=400, detail=f"Pipeline validation error: {final_state['errors']}")
        
    # 3. Retrieve final rankings
    rankings = final_state.get("rankings", [])
    
    # 4. Map back to output schema
    output_items = []
    for item in rankings:
        cand_dict = item.get("candidate", {})
        if not cand_dict.get("candidate_name"):
            cand_dict["candidate_name"] = "Unknown Candidate"
            
        output_items.append(RankingRunItem(
            rank=item["rank"],
            score=item["score"],
            confidence=item["confidence"],
            semantic_score=item["semantic_score"],
            skill_score=item["skill_score"],
            experience_score=item["experience_score"],
            education_score=item.get("education_score", 0.0),
            project_score=item.get("project_score", 0.0),
            certification_score=item.get("certification_score", 0.0),
            behavior_score=item.get("behavior_score"),
            resume_quality_score=item.get("resume_quality_score", 0.0),
            recommendation=item.get("recommendation", "Unknown"),
            matched_skills=item["matched_skills"],
            missing_skills=item["missing_skills"],
            transferable_skills=item["transferable_skills"],
            explanation=item["explanation"],
            candidate=cand_dict
        ))
    return output_items
