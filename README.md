# AI Recruiter: Multi-Agent Candidate Suitability Ranking Engine

AI Recruiter is a premium, decoupled web application and multi-agent backend orchestrator designed to find and rank candidates. Rather than relying on rigid keyword search tags, AI Recruiter parses candidates' resume profiles semantically, maps skill overlaps and gaps, and measures active job-seeker behavioral intent signals.

---

## 1. Problem Statement

Recruiters are tasked with finding the perfect fit from oceans of candidate profiles, but traditional keyword filters simply do not cut it. They miss the hidden gems—the candidates whose true potential, transferable skills, and subtle activity signals are lost in the noise. 

AI Recruiter solves this by going **beyond keywords**:
*   **Semantic Matching:** Evaluates candidates based on contextual concepts rather than exact syntax strings.
*   **Behavioral Intelligence:** Integrates candidate activity signals (login frequencies, commit histories, certification updates) into suitability rankings.
*   **Explainable Decisions:** Generates transparent natural language recruiter justifications mapping candidate strengths and weaknesses.

---

## 2. System Architecture

The application is structured into two main layers:
1.  **Frontend SPA Client:** Built with React 19, TypeScript, and Vite. Styled with custom glassmorphic panels and responsive grids using Tailwind CSS. Features dynamic SVG charts trace skill densities, candidate score brackets, and behavioral spreads.
2.  **FastAPI Backend Server:** Python backend exposing FastAPI endpoints, managing SQLAlchemy models connected to a PostgreSQL vector database (`pgvector`), and running the multi-agent LangGraph workflow.

```
+------------------------------------------------------------+
|                React 19 Frontend Web SPA                   |
|  (Landing Page -> Job Input -> Upload -> Processing -> DB) |
+-----------------------------+------------------------------+
                              |
                       Axios API Requests
                              v
+------------------------------------------------------------+
|                 FastAPI Backend API Server                 |
|             (Endpoint: /api/v1/rankings/run)               |
+-----------------------------+------------------------------+
                              |
                     Invokes Orchestration
                              v
+------------------------------------------------------------+
|                  LangGraph Orchestrator                    |
|             (Coordinates 6-Agent Execution State)          |
+-------+-------------+---------------+---------------+------+
        |             |               |               |
        v             v               v               v
    [Gemini API]  [pgvector DB]  [Heuristics]  [Explainers]
```

---

## 3. Agent Design

The system coordinates **six specialized AI agents** inside a LangGraph state graph. The agents read and mutate a global shared execution state (`RecruitmentState`):

1.  **Job Intelligence Agent:** Extracts structured prerequisites (mandatory skills, preferred stacks, minimum experience) from raw Job Descriptions.
2.  **Candidate Intelligence Agent:** Parses raw candidate resume strings into structured entities (skills, projects, education, experience years) using Gemini.
3.  **Semantic Matching Agent:** Generates text embeddings and queries the PostgreSQL `pgvector` database to compute cosine similarity math.
4.  **Behavioral Signal Agent:** Computes engagement intent metrics from candidate profile activity (commits, updates, responses).
5.  **Ranking Agent:** Applies a weighted suitability algorithm:
    $$\text{Score} = 0.55 \times \text{Semantic} + 0.15 \times \text{Skills} + 0.10 \times \text{Experience} + 0.20 \times \text{Behavior}$$
6.  **Explainability Agent:** Summarizes fits, calling out key strengths, areas to explore (weaknesses), and natural language outreach guides.

---

## 4. Features & Screen Walkthrough

*   **Screen 1 — Landing Page (`/`):** Cyberpunk dark-mode introduction outlining the system features and CTA button.
*   **Screen 2 — Job Description (`/job`):** Job details form with a **Prefill Mock JD** helper for quick testing.
*   **Screen 3 — Candidate Upload (`/candidates`):** HTML5 Drag-and-Drop resume queue. Accepts `.txt` files (read via `FileReader`) and simulated `.pdf`/`.docx` profiles.
*   **Screen 4 — AI Processing (`/processing`):** Live step-by-step progress checklist showing backend execution stages with a retry handler for connection resilience.
*   **Screen 5 — Ranked Dashboard (`/dashboard`):** Main workspace displaying suitability scores, average metrics, and a dynamic table.
    *   *Inspector Drawer:* Detailed slide-out sheet showcasing strengths, weaknesses, and recruiter explanations.
    *   *SVG Analytics:* Interactive Skill Coverage bar charts, bracket distribution donuts, and behavior intent line charts.

---

## 5. Local Setup

### Prerequisites
*   Python 3.10+
*   Node.js 18+
*   PostgreSQL configured with the `pgvector` extension

### 5.1 Backend Setup
1.  Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Configure environment variables in a `.env` file at the root of `backend/`:
    ```env
    POSTGRES_URL=postgresql://username:password@localhost:5432/h2s_recruiter
    GEMINI_API_KEY=your_gemini_api_key_here
    ENVIRONMENT=development
    PORT=8000
    HOST=0.0.0.0
    ```
4.  Launch the FastAPI server:
    ```bash
    python main.py
    ```
    The backend will run at `http://localhost:8000`. Database tables are auto-initialized on startup.

### 5.2 Frontend Setup
1.  Navigate to the `frontend/` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Launch the Vite development server:
    ```bash
    npm run dev
    ```
    The client interface will run at `http://localhost:5173`.

---

## 6. Core API Documentation

### POST `/api/v1/rankings/run`
Triggers the end-to-end multi-agent pipeline.

#### Request Body Schema
```json
{
  "job_description": "String representation of the complete JD Stack...",
  "candidates": [
    "Candidate 1 raw resume text content...",
    "Candidate 2 raw resume text content..."
  ],
  "behavioral_signals": {
    "Jane Doe": {
      "profile_updates_last_30_days": 2,
      "login_frequency": 12,
      "response_rate": 0.95,
      "application_count": 4,
      "certification_activity": 1,
      "github_activity": 15
    }
  }
}
```

#### Response Item Schema (List)
```json
[
  {
    "rank": 1,
    "score": 94.0,
    "confidence": 91.0,
    "semantic_score": 93.0,
    "skill_score": 95.0,
    "experience_score": 100.0,
    "behavior_score": 88.0,
    "matched_skills": ["React", "TypeScript", "FastAPI"],
    "missing_skills": ["GraphQL"],
    "transferable_skills": ["Svelte"],
    "explanation": {
      "strengths": ["Deep experience in React and TypeScript", "Strong backend API fundamentals"],
      "weaknesses": ["Lacks production GraphQL experience"],
      "explanation": "Sophia is an exceptional fit for the Senior Engineer role..."
    },
    "candidate": {
      "candidate_name": "Sophia Chen",
      "skills": ["React", "TypeScript", "FastAPI", "Docker"],
      "experience": 5.0,
      "projects": ["Built vector indexes search gateways"],
      "education": ["B.S. in Computer Science"],
      "summary": "Senior frontend engineer with 5 years experience..."
    }
  }
]
```

---

## 7. Future Work

*   **Recruiter Copilot Chatbot:** Enable recruiters to conversational-query the LangGraph workflow (e.g. "Show me candidates with Kubernetes experience willing to relocate").
*   **Wasm-Based Document Extractor:** Integrate lightweight browser WebAssembly modules to extract text from PDF and DOCX documents on the client-side.
*   **One-Click Outreach:** Auto-draft customized outreach emails based on the Explainability Agent's guide.
*   **Active Interviews Scheduler:** Integrate Google Calendar APIs directly into the dashboard drawer to schedule screens with top-ranked matches.
