import json
import google.generativeai as genai
from backend.graph.state import RecruitmentState
from backend.settings import settings

class ExplainabilityAgent:
    """
    Agent responsible for generating candidate-level recruiter justifications,
    including strengths, weaknesses, and matching summaries.
    """
    def run(self, state: RecruitmentState) -> RecruitmentState:
        print("[Explainability Agent] Generating justifications...")
        job = state.get("job")
        rankings = state.get("rankings")

        if not job or not rankings:
            state["errors"].append({
                "agent": "ExplainabilityAgent",
                "error": "Missing job structure or rankings list in execution state."
            })
            return state

        # If explanations container is not initialized
        if not state.get("explanations"):
            state["explanations"] = []

        api_key = settings.GEMINI_API_KEY
        use_mock = not api_key or api_key.startswith("mock")

        for item in rankings:
            cand = item["candidate"]
            cand_name = cand.get("candidate_name", "Unknown")

            # Extract behavior context if present in scores
            scores = state.get("scores") or {}
            cand_scores = scores.get(cand_name) or {}
            behavior_info = cand_scores.get("behavior") or {}
            has_behavior = behavior_info.get("has_data", False)
            behavior_context = ""
            if has_behavior:
                behavior_context = (
                    f"Candidate Behavioral Scores: Intent={behavior_info.get('intent')}, "
                    f"Engagement={behavior_info.get('engagement')}, Activity={behavior_info.get('activity')}. "
                    f"Raw signals: {json.dumps(behavior_info.get('raw_signals'))}\n"
                )

            if use_mock:
                print(f"[Explainability Agent] Using mock template explainer for {cand_name}.")
                explanation = self._mock_explanation(state, job, item)
            else:
                try:
                    genai.configure(api_key=api_key)
                    model = genai.GenerativeModel("models/gemini-2.5-flash")
                    prompt = (
                        "You are an expert technical recruiter auditing deterministic ATS compatibility scores. "
                        "Given the job description details, candidate profile, and the computed suitability metrics, "
                        "produce a recruiter-friendly justification. Do NOT generate new numerical scores. "
                        "You must return a single JSON object matching this schema exactly:\n"
                        "{\n"
                        '  "strengths": ["List of 2-3 key technical/experience/intent strengths (array of strings)"],\n'
                        '  "weaknesses": ["List of identified gaps, missing skills, or low activity indicators (array of strings)"],\n'
                        '  "explanation": "A clear, professional 2-sentence summary explaining why this candidate was given their specific score based on the categories. (string)"\n'
                        "}\n\n"
                        f"Job Profile: {json.dumps(job)}\n"
                        f"Candidate Profile: {json.dumps(cand)}\n"
                        f"{behavior_context}"
                        f"Computed Match Metrics:\n"
                        f"Overall Score: {item['score']}\n"
                        f"Confidence: {item['confidence']}\n"
                        f"Semantic Score: {item['semantic_score']}\n"
                        f"Skill Score: {item['skill_score']}\n"
                        f"Experience Score: {item['experience_score']}\n"
                        f"Education Score: {item.get('education_score', 0)}\n"
                        f"Project Score: {item.get('project_score', 0)}\n"
                        f"Certification Score: {item.get('certification_score', 0)}\n"
                        f"Resume Quality Score: {item.get('resume_quality_score', 0)}\n"
                        f"Recommendation: {item.get('recommendation', 'Unknown')}\n"
                        f"Matched Skills: {item['matched_skills']}\n"
                        f"Missing Skills: {item['missing_skills']}\n"
                    )
                    response = model.generate_content(
                        prompt,
                        generation_config={"response_mime_type": "application/json"}
                    )
                    explanation_json = json.loads(response.text)
                    
                    # Map the JSON output to the ExplanationModel schema expected by the frontend
                    explanation = {
                        "strengths": explanation_json.get("strengths", []),
                        "weaknesses": explanation_json.get("weaknesses", []),
                        "explanation": explanation_json.get("explanation", "")
                    }
                except Exception as e:
                    print(f"[Explainability Agent] Gemini call failed, falling back to templates: {e}")
                    explanation = self._mock_explanation(state, job, item)

            # Enrich the ranking item directly in the state
            item["explanation"] = explanation
            # Also append to the explanations list in state for consistency
            state["explanations"].append({
                "candidate_name": cand_name,
                "explanation": explanation
            })

        return state

    def _mock_explanation(self, state: dict, job: dict, item: dict) -> dict:
        """
        Generate detailed templated explanations when LLM APIs are unreachable.
        """
        cand = item["candidate"]
        cand_name = cand.get("candidate_name", "Unknown")
        cand_exp = float(cand.get("experience", 0.0))
        job_exp = float(job.get("experience_required", 0.0))
        
        matched_skills = item.get("matched_skills", [])
        missing_skills = item.get("missing_skills", [])
        transferable = item.get("transferable_skills", [])
        
        # Read behavioral signals from state
        scores = state.get("scores") or {}
        cand_scores = scores.get(cand_name) or {}
        behavior_info = cand_scores.get("behavior") or {}
        has_behavior = behavior_info.get("has_data", False)
        intent_score = behavior_info.get("intent", 0.0)
        
        strengths = []
        weaknesses = []

        # 1. Experience alignment strengths/weaknesses
        if cand_exp >= job_exp:
            strengths.append(f"Exceeds experience requirements: Has {cand_exp} years (required: {job_exp} years).")
        else:
            weaknesses.append(f"Experience deficit: Has only {cand_exp} of the required {job_exp} years.")

        # 2. Skill matches/gaps
        if matched_skills:
            strengths.append(f"Demonstrates capability in required skills: {', '.join(matched_skills[:3])}.")
        else:
            weaknesses.append("Has no exact matches for required core skills.")

        # 3. Transferable skills
        if transferable:
            strengths.append(f"Possesses adjacent transferable skills: {', '.join(transferable[:2])}.")

        # 4. Behavioral intent checks
        if has_behavior and intent_score > 60.0:
            strengths.append("Candidate recently updated profile and completed certifications, indicating high job-seeking intent.")

        if missing_skills:
            weaknesses.append(f"Missing core technical requirements: {', '.join(missing_skills[:3])}.")

        # Fallbacks to keep lengths consistent
        if not strengths:
            strengths = ["Technical background aligns with generic developer profile."]
        if not weaknesses:
            weaknesses = ["No critical technical gaps or experience deficits identified."]

        if has_behavior and intent_score > 60.0:
            summary_text = (
                f"{cand_name} is ranked with a suitability score of {item['score']}% and confidence of {item['confidence']}%. "
                "Candidate recently updated profile and completed certifications, indicating high job-seeking intent."
            )
        else:
            summary_text = (
                f"{cand_name} is ranked with a suitability score of {item['score']}% and confidence of {item['confidence']}%. "
                f"They show strong capability in {', '.join(matched_skills[:2]) or 'basic requirements'} but "
                f"have gaps in {', '.join(missing_skills[:2]) or 'niche competencies'}."
            )

        return {
            "strengths": strengths[:3],
            "weaknesses": weaknesses[:3],
            "explanation": summary_text
        }

# Instantiated runner helper
_agent = ExplainabilityAgent()
def run(state: RecruitmentState) -> RecruitmentState:
    return _agent.run(state)
