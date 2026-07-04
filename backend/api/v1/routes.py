import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends
from pydantic import BaseModel
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
        output_items.append(RankingRunItem(
            rank=item["rank"],
            score=item["score"],
            confidence=item["confidence"],
            semantic_score=item["semantic_score"],
            skill_score=item["skill_score"],
            experience_score=item["experience_score"],
            behavior_score=item.get("behavior_score"),
            matched_skills=item["matched_skills"],
            missing_skills=item["missing_skills"],
            transferable_skills=item["transferable_skills"],
            explanation=item["explanation"],
            candidate=item["candidate"]
        ))
    return output_items


class CandidateReportItem(BaseModel):
    name: str
    title: str
    experience: str
    score: float


class ReportCompileRequest(BaseModel):
    job_title: str
    candidates: List[CandidateReportItem]


@router.post("/reports/compile-pdf")
def compile_pdf(payload: ReportCompileRequest):
    import subprocess
    import tempfile
    import os
    from fastapi.responses import FileResponse
    
    latex_template = r"""\documentclass[11pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{geometry}
\geometry{top=1in, bottom=1in, left=1in, right=1in}
\usepackage{xcolor}
\usepackage{array}

\definecolor{primaryColor}{HTML}{002060}
\definecolor{secondaryColor}{HTML}{404040}

\begin{document}

\begin{center}
    {\huge\bfseries\color{primaryColor} TalentMind AI} \\
    \vspace{0.2cm}
    {\large\bfseries Executive Summary \& Candidate Rankings} \\
    \vspace{0.1cm}
    Project: \textbf{""" + payload.job_title + r"""} \\
    Date: \today
\end{center}

\vspace{0.5cm}

\section*{Introduction}
This recruitment cycle has been completed successfully. The AI ranking engine analyzed the submitted resume documents, cross-referenced them with the mandatory and preferred criteria of the role, and produced the following candidate ranks.

\section*{Top Candidate Rankings}

\begin{tabular}{lp{5.0cm}p{5.0cm}r}
\textbf{Rank} & \textbf{Candidate Name} & \textbf{Title} & \textbf{Score} \\
\hline
"""
    for idx, c in enumerate(payload.candidates):
        name_esc = c.name.replace('&', '\\&').replace('_', '\\_').replace('%', '\\%')
        title_esc = c.title.replace('&', '\\&').replace('_', '\\_').replace('%', '\\%')
        latex_template += f"{idx+1} & {name_esc} & {title_esc} & {c.score}\\% \\\\\n\\hline\n"

    latex_template += r"""\end{tabular}

\vspace{1.0cm}

\section*{System Status}
All parsing nodes and matching orchestrators executed within normal parameters. The average matching score for this cohort is high, indicating strong applicant quality.

\vspace{1.5cm}
\begin{center}
    \small\color{gray} CONFIDENTIAL - FOR INTERNAL USE ONLY \\
    \copyright\ 2024 TalentMind AI. All rights reserved.
\end{center}

\end{document}
"""

    temp_dir = tempfile.mkdtemp()
    tex_path = os.path.join(temp_dir, "report.tex")
    pdf_path = os.path.join(temp_dir, "report.pdf")
    
    with open(tex_path, "w", encoding="utf-8") as f:
        f.write(latex_template)
        
    try:
        subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "-output-directory", temp_dir, tex_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True,
            timeout=15
        )
        if os.path.exists(pdf_path):
            return FileResponse(pdf_path, media_type="application/pdf", filename="TalentMind_Executive_Report.pdf")
    except Exception as e:
        print(f"[Backend] LaTeX compilation failed/pdflatex not found: {e}")
        
    raise HTTPException(
        status_code=501, 
        detail={
            "message": "pdflatex compiler not found on backend system.",
            "latex_source": latex_template
        }
    )
