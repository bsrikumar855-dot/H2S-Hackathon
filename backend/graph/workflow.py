from langgraph.graph import StateGraph, END
from backend.graph.state import RecruitmentState
from backend.agents import (
    run_job_intelligence,
    run_candidate_intelligence,
    run_semantic_matching,
    run_ranking,
    run_behavioral_signal,
    run_explainability,
    run_recruiter_copilot
)

def create_workflow() -> StateGraph:
    """
    Constructs and compiles the multi-agent execution graph.
    """
    workflow = StateGraph(RecruitmentState)

    # 1. Register agents as Graph nodes
    workflow.add_node("job_intelligence", run_job_intelligence)
    workflow.add_node("candidate_intelligence", run_candidate_intelligence)
    workflow.add_node("semantic_matching", run_semantic_matching)
    workflow.add_node("behavioral_signal", run_behavioral_signal)
    workflow.add_node("ranking", run_ranking)
    workflow.add_node("explainability", run_explainability)
    workflow.add_node("recruiter_copilot", run_recruiter_copilot)

    # 2. Set pipeline Entrypoint
    workflow.set_entry_point("job_intelligence")

    # 3. Add flow mapping logic
    # After parsing JD, decide whether to parse incoming resumes or go to matching directly
    workflow.add_conditional_edges(
        "job_intelligence",
        lambda state: "candidate_intelligence" if len(state.get("candidates", [])) > 0 else "semantic_matching",
        {
            "candidate_intelligence": "candidate_intelligence",
            "semantic_matching": "semantic_matching"
        }
    )

    workflow.add_edge("candidate_intelligence", "semantic_matching")
    workflow.add_edge("semantic_matching", "behavioral_signal")
    workflow.add_edge("behavioral_signal", "ranking")
    workflow.add_edge("ranking", "explainability")

    # For the interactive MVP: Explainability routes to END, 
    # and Recruiter Copilot (triggered on query feedback) routes back to matching.
    workflow.add_edge("explainability", END)
    workflow.add_edge("recruiter_copilot", "semantic_matching")

    # Compile workflow executable
    return workflow.compile()

# Instantiated graph runtime engine
recruitment_graph = create_workflow()
