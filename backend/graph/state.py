from typing import TypedDict, List, Dict, Any, Optional

class RecruitmentState(TypedDict):
    """
    State container passed between all agents in the LangGraph workflow.
    """
    job: Dict[str, Any]  # Stores raw and structured job description details
    raw_job_description: Optional[str]  # Stores raw job description text input
    candidates: List[Dict[str, Any]]  # List of candidate profiles being processed
    scores: Dict[str, Any]  # Computed score matrices/raw weights
    rankings: List[Dict[str, Any]]  # Final sorted relevance rankings list
    explanations: List[Dict[str, Any]]  # Explanations generated per candidate
    errors: List[Dict[str, Any]]  # Logs and validation errors tracked during executions
    behavioral_signals: Optional[Dict[str, Any]]  # Map of candidate names to activity metrics
    override_weights: Optional[Dict[str, float]]  # Dynamic recruiter weighting inputs
    copilot_query: Optional[str]  # Active conversational feedback text
