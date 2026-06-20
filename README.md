# AI-Powered Candidate Ranking Engine (H2S Hackathon)

This project contains the implementation-ready foundation for the AI Recruiter Candidate Ranking Engine. It integrates a stateful multi-agent orchestrator utilizing **LangGraph** with a **FastAPI** web layer and a **PostgreSQL** database powered by `pgvector`.

---

## 1. Project Directory Structure

```
H2S-Hackathon/
├── backend/
│   ├── agents/                     # LLM Agents implementations
│   │   ├── job_intelligence_agent.py
│   │   ├── candidate_intelligence_agent.py
│   │   ├── semantic_matching_agent.py
│   │   ├── ranking_agent.py
│   │   ├── explainability_agent.py
│   │   └── recruiter_copilot_agent.py
│   ├── api/                        # REST API routing
│   │   └── v1/
│   │       └── routes.py
│   ├── database/                   # SQLAlchemy ORM and pgvector models
│   │   ├── base.py
│   │   ├── database.py
│   │   └── models.py
│   ├── graph/                      # LangGraph orchestrator state & workflows
│   │   ├── state.py
│   │   └── workflow.py
│   ├── schemas/                    # Pydantic data schemas
│   │   ├── candidate.py
│   │   ├── explanation.py
│   │   ├── job.py
│   │   ├── ranking.py
│   │   └── skill_gap.py
│   ├── .env                        # Local Environment configurations
│   ├── main.py                     # FastAPI entrypoint
│   ├── requirements.txt            # Python library dependencies
│   └── settings.py                 # Configuration settings loader
├── docs/                           # Solution Architecture designs
│   ├── system_architecture.md
│   ├── agent_contracts.md
│   ├── database_schema.md
│   ├── ranking_design.md
│   └── api_contracts.md
├── tests/                          # Integrity testing suites
│   └── test_foundation.py
└── README.md                       # This instruction file
```

---

## 2. Prerequisites

* **Python 3.10+** (Tested on Python 3.14.2)
* **PostgreSQL 14+** (with the `pgvector` extension installed)

---

## 3. Local Development Instructions

### Step 1: Install Dependencies
From the repository root, install the required packages:
```bash
python -m pip install -r backend/requirements.txt
```

### Step 2: Configure Environment Variables
Create a local `.env` configuration file inside the `backend/` directory by copying the template file:
```bash
cp backend/.env.example backend/.env
```
Update the connection string and credentials inside `backend/.env` as per your local Postgres setup:
```ini
POSTGRES_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

### Step 3: Initialize Database & Tables
The database tables are set to self-initialize on server startup. Ensure that your PostgreSQL server is active, the database exists, and the `vector` extension is enabled on it:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### Step 4: Run Tests
Validate that the configuration parser, Pydantic data schemas, and LangGraph workflow stubs are operational:
```bash
python -m pytest
```

### Step 5: Start the Development Server
Launch the FastAPI server locally:
```bash
python -m uvicorn backend.main:app --reload
```
The server will run at `http://localhost:8000`.

---

## 4. REST API Endpoint Catalog

* **Health Status:** Check application health.
  * `GET http://localhost:8000/health`
* **Job Insertion:** Submit a job description to structure.
  * `POST http://localhost:8000/api/v1/jobs`
* **Resume Upload:** Submit a candidate resume for indexing.
  * `POST http://localhost:8000/api/v1/candidates`
* **Ranking Execution:** Score and shortlist candidates.
  * `POST http://localhost:8000/api/v1/jobs/{job_id}/rank`

Swagger API documentation is auto-generated and interactive at: `http://localhost:8000/docs`.
