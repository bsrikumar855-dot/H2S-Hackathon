import numpy as np
from backend.graph.state import RecruitmentState
from backend.services.embedding_service import embedding_service

class SemanticMatchingAgent:
    """
    Agent responsible for computing vector cosine similarities and skill overlaps.
    """
    def run(self, state: RecruitmentState) -> RecruitmentState:
        print("[Semantic Matching Agent] Running matching logic...")
        job = state.get("job")
        candidates = state.get("candidates")

        if not job or not candidates:
            state["errors"].append({
                "agent": "SemanticMatchingAgent",
                "error": "Missing job structure or candidates list in state."
            })
            return state

        # Initialize scores structure in state
        if not state.get("scores"):
            state["scores"] = {}

        # 1. Fetch embedding vector for Job summary
        job_summary = job.get("summary", "")
        job_vector = embedding_service.get_embedding(job_summary)
        job_vector_np = np.array(job_vector)

        # 2. Extract job skills for comparison
        req_skills_raw = job.get("required_skills", [])
        # Lowercase mapping for case-insensitive matching
        req_skills_set = {s.lower().strip() for s in req_skills_raw}

        for cand in candidates:
            cand_name = cand.get("candidate_name", "Unknown")
            cand_summary = cand.get("summary", "")
            
            # 3. Generate candidate summary embedding
            cand_vector = embedding_service.get_embedding(cand_summary)
            cand_vector_np = np.array(cand_vector)

            # 4. Calculate cosine similarity
            norm_job = np.linalg.norm(job_vector_np)
            norm_cand = np.linalg.norm(cand_vector_np)
            if norm_job == 0 or norm_cand == 0:
                cosine_sim = 0.0
            else:
                cosine_sim = float(np.dot(job_vector_np, cand_vector_np) / (norm_job * norm_cand))
            
            # Normalize to [0.0, 100.0] range
            semantic_score = max(0.0, cosine_sim) * 100.0

            # 5. Compute skills overlap
            cand_skills_raw = cand.get("skills", [])
            cand_skills_set = {s.lower().strip() for s in cand_skills_raw}

            # Map matching skills back to job description's casing
            matched_skills = [
                skill for skill in req_skills_raw
                if skill.lower().strip() in cand_skills_set
            ]
            missing_skills = [
                skill for skill in req_skills_raw
                if skill.lower().strip() not in cand_skills_set
            ]

            # 5b. Resolve transferable skills
            transferable_skills = []
            TRANSFERABLE_GROUPS = [
                {"fastapi", "django", "flask", "tornado"},
                {"postgresql", "postgres", "mysql", "mariadb", "sqlite"},
                {"aws", "gcp", "azure", "cloud"},
                {"kubernetes", "docker swarm", "ecs", "nomad"},
                {"react", "vue", "angular", "svelte", "nextjs"},
                {"docker", "podman", "containerd"},
                {"typescript", "javascript"}
            ]
            for m_skill in missing_skills:
                m_skill_lower = m_skill.lower().strip()
                for group in TRANSFERABLE_GROUPS:
                    if m_skill_lower in group:
                        other_skills = group - {m_skill_lower}
                        overlapping_cand_skills = other_skills.intersection(cand_skills_set)
                        for o_skill in overlapping_cand_skills:
                            orig_cand_skill = next(
                                (s for s in cand_skills_raw if s.lower().strip() == o_skill),
                                o_skill.title()
                            )
                            transferable_skills.append(f"{orig_cand_skill} (transferable for {m_skill})")

            # 6. Save computed matches to scores dictionary
            state["scores"][cand_name] = {
                "semantic_score": semantic_score,
                "matched_skills": matched_skills,
                "missing_skills": missing_skills,
                "transferable_skills": list(set(transferable_skills))
            }

        return state

# Instantiated runner helper
_agent = SemanticMatchingAgent()
def run(state: RecruitmentState) -> RecruitmentState:
    return _agent.run(state)
