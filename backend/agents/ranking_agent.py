from backend.graph.state import RecruitmentState

class RankingAgent:
    """
    Agent responsible for scoring and ranking parsed candidates against a job description
    using a strictly deterministic ATS engine.
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

            # 1. Semantic Similarity (30%)
            semantic_score = float(match_data.get("semantic_score", 0.0))

            # 2. Skill Match (25%)
            matched_skills_count = len(match_data.get("matched_skills", []))
            total_skills_count = len(req_skills_raw)
            if total_skills_count > 0:
                skill_overlap = (matched_skills_count / total_skills_count) * 100.0
            else:
                skill_overlap = 100.0

            # 3. Experience Match (15%)
            cand_exp = float(cand.get("experience", 0.0))
            if experience_req > 0.0:
                if cand_exp >= experience_req:
                    experience_match = 100.0
                else:
                    experience_match = (cand_exp / experience_req) * 100.0
            else:
                experience_match = 100.0

            # 4. Education Match (10%) & 6. Certifications (5%)
            education_list = cand.get("education", [])
            education_score = 0.0
            certification_score = 0.0
            for item in education_list:
                item_lower = item.lower()
                if any(x in item_lower for x in ["bachelor", "bs", "master", "ms", "phd", "degree", "university", "college"]):
                    education_score += 50.0
                if any(x in item_lower for x in ["cert", "aws", "google", "azure", "coursera", "udemy"]):
                    certification_score += 100.0
            
            education_score = min(100.0, education_score if education_list else 40.0)
            certification_score = min(100.0, certification_score if education_list else 0.0)

            # 5. Project Relevance (8%)
            projects_list = cand.get("projects", [])
            project_score = 0.0
            if projects_list:
                # Reward based on project count/depth
                project_score = min(100.0, len(projects_list) * 33.33)
            else:
                project_score = 20.0

            # 8. Resume Quality (3%)
            completeness = 0.0
            if cand.get("candidate_name") and str(cand.get("candidate_name")).strip() not in ["Unknown", "Unknown Candidate"]:
                completeness += 20.0
            if cand.get("skills"):
                completeness += 20.0
            if cand.get("experience") is not None and cand_exp >= 0.0:
                completeness += 20.0
            if projects_list:
                completeness += 20.0
            if education_list:
                completeness += 20.0
            resume_quality_score = completeness

            # 7. Behavioral Signals (4%)
            behavior_score = 75.0 # default assuming decent baseline
            if match_data and "behavior" in match_data:
                b_info = match_data["behavior"]
                if b_info.get("has_data", False):
                    behavior_score = float(b_info.get("score", behavior_score))

            # --- Compute Final Score ---
            final_score = (
                (0.30 * semantic_score) +
                (0.25 * skill_overlap) +
                (0.15 * experience_match) +
                (0.10 * education_score) +
                (0.08 * project_score) +
                (0.05 * certification_score) +
                (0.04 * behavior_score) +
                (0.03 * resume_quality_score)
            )
            
            # Add small deterministic tie-breaker based on name hash to ensure unique scores
            name_hash = sum(ord(c) for c in name)
            tie_breaker = (name_hash % 100) / 100.0  # 0.0 to 0.99
            final_score += tie_breaker
            
            final_score = min(100.0, round(final_score, 2))

            # --- Confidence Score Calculation ---
            confidence = round((semantic_score + skill_overlap + resume_quality_score + experience_match) / 4.0, 2)

            # --- Recommendation Engine ---
            if final_score >= 95.0:
                recommendation = "Outstanding Match"
            elif final_score >= 90.0:
                recommendation = "Strong Hire"
            elif final_score >= 80.0:
                recommendation = "Recommended"
            elif final_score >= 70.0:
                recommendation = "Interview"
            elif final_score >= 60.0:
                recommendation = "Potential Fit"
            else:
                recommendation = "Backup Candidate"

            ranked_shortlist.append({
                "candidate": cand,
                "score": final_score,
                "confidence": confidence,
                "semantic_score": round(semantic_score, 2),
                "skill_score": round(skill_overlap, 2),
                "experience_score": round(experience_match, 2),
                "education_score": round(education_score, 2),
                "project_score": round(project_score, 2),
                "certification_score": round(certification_score, 2),
                "resume_quality_score": round(resume_quality_score, 2),
                "behavior_score": round(behavior_score, 2),
                "recommendation": recommendation,
                "matched_skills": match_data.get("matched_skills", []),
                "missing_skills": match_data.get("missing_skills", []),
                "transferable_skills": match_data.get("transferable_skills", [])
            })

        # Sort descending by final overall score
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
