import json
import re
import google.generativeai as genai
from backend.graph.state import RecruitmentState
from backend.settings import settings

class CandidateIntelligenceAgent:
    """
    Agent responsible for parsing raw candidate resume text and structuring it using Gemini.
    """
    def run(self, state: RecruitmentState) -> RecruitmentState:
        print("[Candidate Intelligence Agent] Parsing candidate profiles...")
        candidates_raw = state.get("candidates")
        if not candidates_raw:
            state["errors"].append({
                "agent": "CandidateIntelligenceAgent",
                "error": "No candidates data list found in execution state."
            })
            return state

        parsed_candidates = []
        api_key = settings.GEMINI_API_KEY
        use_mock = not api_key or api_key.startswith("mock")

        for cand in candidates_raw:
            # Check if input candidate is raw string, or is dict containing raw text
            if isinstance(cand, str):
                raw_text = cand
            elif isinstance(cand, dict):
                raw_text = cand.get("raw_resume_text") or cand.get("description") or json.dumps(cand)
            else:
                continue

            if use_mock:
                print("[Candidate Intelligence Agent] Using mock heuristic parser.")
                structured = self._mock_parse(raw_text)
            else:
                try:
                    genai.configure(api_key=api_key)
                    model = genai.GenerativeModel("models/gemini-2.5-flash")
                    prompt = (
                        "You are a technical recruiter. Parse the raw candidate resume text provided and extract profile fields. "
                        "You must output a single JSON object matching this schema exactly:\n"
                        "{\n"
                        '  "candidate_name": "The full name of the candidate (string)",\n'
                        '  "skills": ["List of technical skills, languages, tools (array of strings)"],\n'
                        '  "experience": Number representing total years of technical experience (float),\n'
                        '  "projects": ["List of key projects described in work history (array of strings)"],\n'
                        '  "education": ["List of degrees and certifications completed (array of strings)"],\n'
                        '  "summary": "Short 2-sentence summary summarizing candidate background and key competencies (string)"\n'
                        "}\n\n"
                        f"Resume Content:\n{raw_text}"
                    )
                    response = model.generate_content(
                        prompt,
                        generation_config={"response_mime_type": "application/json"}
                    )
                    structured = json.loads(response.text)
                except Exception as e:
                    print(f"[Candidate Intelligence Agent] Gemini call failed, falling back to mock: {e}")
                    structured = self._mock_parse(raw_text)

            parsed_candidates.append(structured)

        # Write parsed profiles back to state
        state["candidates"] = parsed_candidates
        return state

    def _mock_parse(self, text: str) -> dict:
        """
        Regex heuristic fallback to parse candidate resumes when API is unreachable.
        """
        # Parse Name (heuristic: first non-empty line of text or "Jane Doe" fallback)
        name = "Unknown Candidate"
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        if lines:
            # If the first line is very long, it's not a name. Keep it clean.
            if len(lines[0]) < 50:
                name = lines[0]
            else:
                name_match = re.search(r"^[a-zA-Z\s]+", lines[0])
                if name_match:
                    name = name_match.group(0).strip()

        # Parse experience duration
        years = 2.0
        exp_match = re.search(r"(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?experience", text, re.IGNORECASE)
        if exp_match:
            years = float(exp_match.group(1))

        # Check for typical languages/frameworks
        known_skills = ["python", "fastapi", "django", "postgres", "postgresql", "docker", "kubernetes", "react", "typescript", "javascript", "go", "golang", "aws", "gcp"]
        found_skills = []
        for skill in known_skills:
            if re.search(rf"\b{skill}\b", text, re.IGNORECASE):
                name_skill = skill.capitalize()
                if skill == "postgresql":
                    name_skill = "PostgreSQL"
                elif skill == "fastapi":
                    name_skill = "FastAPI"
                elif skill == "gcp":
                    name_skill = "GCP"
                elif skill == "aws":
                    name_skill = "AWS"
                found_skills.append(name_skill)

        # Parse projects
        projects = []
        for line in lines:
            if "project:" in line.lower() or "built" in line.lower() or "designed" in line.lower() or "developed" in line.lower():
                if len(line) < 150:
                    projects.append(line.replace("-", "").strip())
        if not projects:
            projects = ["Led key development projects in previous roles."]

        # Parse education
        education = []
        for line in lines:
            if "degree" in line.lower() or "university" in line.lower() or "college" in line.lower() or "bs" in line.lower() or "ms" in line.lower() or "phd" in line.lower():
                if len(line) < 100:
                    education.append(line.strip())
        if not education:
            education = ["B.S. in Computer Science"]

        return {
            "candidate_name": name,
            "skills": found_skills if found_skills else ["Python"],
            "experience": years,
            "projects": projects[:3],
            "education": education[:2],
            "summary": f"Professional candidate with {years} years of experience specializing in software development, architecture, and team deliveries."
        }

# Instantiated runner helper
_agent = CandidateIntelligenceAgent()
def run(state: RecruitmentState) -> RecruitmentState:
    return _agent.run(state)
