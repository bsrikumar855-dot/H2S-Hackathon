import json
import re
import google.generativeai as genai
from backend.graph.state import RecruitmentState
from backend.settings import settings

class JobIntelligenceAgent:
    """
    Agent responsible for parsing raw job descriptions into structured schema inputs using Gemini.
    """
    def run(self, state: RecruitmentState) -> RecruitmentState:
        print("[Job Intelligence Agent] Parsing job description...")
        raw_jd = state.get("raw_job_description")
        if not raw_jd and state.get("job"):
            raw_jd = state["job"].get("raw_description")

        if not raw_jd:
            state["errors"].append({
                "agent": "JobIntelligenceAgent",
                "error": "No raw job description found in execution state."
            })
            return state

        api_key = settings.GEMINI_API_KEY
        if not api_key or api_key.startswith("mock"):
            print("[Job Intelligence Agent] Using mock heuristic parser.")
            structured = self._mock_parse(raw_jd)
        else:
            try:
                genai.configure(api_key=api_key)
                model = genai.GenerativeModel("models/gemini-2.5-flash")
                prompt = (
                    "You are a technical recruiter. Analyze the raw job description text provided and extract requirements. "
                    "You must output a single JSON object matching this schema exactly:\n"
                    "{\n"
                    '  "role": "The job role title (string)",\n'
                    '  "required_skills": ["List of mandatory technical skills/tools (array of strings)"],\n'
                    '  "preferred_skills": ["List of optional or nice-to-have skills/tools (array of strings)"],\n'
                    '  "experience_required": Number representing minimum years of experience required (float),\n'
                    '  "summary": "Clear 2-sentence summary of the job context and role responsibilities (string)"\n'
                    "}\n\n"
                    f"Job Description:\n{raw_jd}"
                )
                response = model.generate_content(
                    prompt,
                    generation_config={"response_mime_type": "application/json"}
                )
                structured = json.loads(response.text)
            except Exception as e:
                print(f"[Job Intelligence Agent] Gemini call failed, falling back to mock: {e}")
                structured = self._mock_parse(raw_jd)

        # Write result back to graph state
        state["job"] = structured
        return state

    def _mock_parse(self, text: str) -> dict:
        """
        Regex heuristic fallback to parse text features when API is unreachable.
        """
        # Search for years of experience (e.g., "5+ years", "3 years")
        years = 3.0
        exp_match = re.search(r"(\d+)\+?\s*(?:years?|yrs?)", text, re.IGNORECASE)
        if exp_match:
            years = float(exp_match.group(1))

        # Check for typical languages/frameworks
        known_skills = ["python", "fastapi", "django", "postgres", "postgresql", "docker", "kubernetes", "react", "typescript", "javascript", "go", "golang", "aws", "gcp"]
        found_skills = []
        for skill in known_skills:
            if re.search(rf"\b{skill}\b", text, re.IGNORECASE):
                name = skill.capitalize()
                if skill == "postgresql":
                    name = "PostgreSQL"
                elif skill == "fastapi":
                    name = "FastAPI"
                elif skill == "gcp":
                    name = "GCP"
                elif skill == "aws":
                    name = "AWS"
                found_skills.append(name)

        role = "Software Engineer"
        role_match = re.search(r"(senior|lead|junior|principal)?\s*(software|backend|frontend|fullstack|devops)?\s*engineer", text, re.IGNORECASE)
        if role_match:
            role = role_match.group(0).strip().title()

        return {
            "role": role,
            "required_skills": found_skills[:3] if found_skills else ["Python", "FastAPI"],
            "preferred_skills": found_skills[3:5] if len(found_skills) > 3 else [],
            "experience_required": years,
            "summary": f"Role is for a {role} requiring proficiency in key development environments. The focus is to design and develop production software pipelines."
        }

# Instantiated runner helper
_agent = JobIntelligenceAgent()
def run(state: RecruitmentState) -> RecruitmentState:
    return _agent.run(state)
