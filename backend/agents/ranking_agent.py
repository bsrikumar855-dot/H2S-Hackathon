from backend.graph.state import RecruitmentState

class RankingAgent:
    """
    Agent responsible for scoring and ranking parsed candidates against a job description.
    """
    def run(self, state: RecruitmentState) -> RecruitmentState:
        print("[Ranking Agent] Scoring and sorting candidate shortlist...")
        job = state.get("job")
        candidates = state.get("candidates")
        scores = state.get("scores")

        if not job or not candidates or not scores:
            state["errors"].append({
                "agent": "RankingAgent",
                "error": "Missing job structure, candidate profiles, or match scores in execution state."
            })
            return state

        ranked_shortlist = []
        req_skills_raw = job.get("required_skills", [])
        experience_req = float(job.get("experience_required", 0.0))

        for cand in candidates:
            name = cand.get("candidate_name", "Unknown")
            match_data = scores.get(name)

            if not match_data:
                match_data = {
                    "semantic_score": 50.0,
                    "matched_skills": [],
                    "missing_skills": [],
                    "transferable_skills": []
                }

            # 1. Semantic Similarity (normalized to [0, 100])
            semantic_score = float(match_data.get("semantic_score", 0.0))

            # 2. Skill Overlap (percentage of required skills matching)
            matched_skills_count = len(match_data.get("matched_skills", []))
            total_skills_count = len(req_skills_raw)
            if total_skills_count > 0:
                skill_overlap = (matched_skills_count / total_skills_count) * 100.0
            else:
                skill_overlap = 100.0

            # 3. Experience Match
            cand_exp = float(cand.get("experience", 0.0))
            if experience_req > 0.0:
                if cand_exp >= experience_req:
                    experience_match = 100.0
                else:
                    experience_match = (cand_exp / experience_req) * 100.0
            else:
                experience_match = 100.0

            # 3b. Profile Completeness scoring (0-100)
            completeness = 0.0
            if cand.get("candidate_name") and str(cand.get("candidate_name")).strip() not in ["Unknown", "Unknown Candidate"]:
                completeness += 20.0
            if cand.get("skills"):
                completeness += 20.0
            if cand.get("experience") is not None and float(cand.get("experience", -1.0)) >= 0.0:
                completeness += 20.0
            if cand.get("projects") and len(cand.get("projects", [])) > 0:
                completeness += 20.0
            if cand.get("education") and len(cand.get("education", [])) > 0:
                completeness += 20.0

            # 3c. Confidence Score calculation
            confidence = (0.40 * semantic_score) + (0.30 * skill_overlap) + (0.20 * experience_match) + (0.10 * completeness)

            # 3d. Check for behavioral signals and score
            behavior_score = None
            has_behavior = False
            if match_data and "behavior" in match_data:
                b_info = match_data["behavior"]
                has_behavior = b_info.get("has_data", False)
                if has_behavior:
                    behavior_score = float(b_info.get("score", 0.0))

            # 4. Formula selection depending on behavioral availability
            if has_behavior and behavior_score is not None:
                final_score = (0.55 * semantic_score) + (0.15 * skill_overlap) + (0.10 * experience_match) + (0.20 * behavior_score)
            else:
                final_score = (0.70 * semantic_score) + (0.20 * skill_overlap) + (0.10 * experience_match)

            ranked_shortlist.append({
                "candidate": cand,
                "score": round(final_score, 2),
                "confidence": round(confidence, 2),
                "semantic_score": round(semantic_score, 2),
                "skill_score": round(skill_overlap, 2),
                "experience_score": round(experience_match, 2),
                "behavior_score": round(behavior_score, 2) if behavior_score is not None else None,
                "matched_skills": match_data.get("matched_skills", []),
                "missing_skills": match_data.get("missing_skills", []),
                "transferable_skills": match_data.get("transferable_skills", [])
            })

        # Sort descending by final score
        ranked_shortlist.sort(key=lambda x: x["score"], reverse=True)

        # Inject rank numerical values
        for idx, item in enumerate(ranked_shortlist):
            item["rank"] = idx + 1

        state["rankings"] = ranked_shortlist
        return state

# Instantiated runner helper
_agent = RankingAgent()
def run(state: RecruitmentState) -> RecruitmentState:
    return _agent.run(state)
