# AI Recruiter suitability Engine Architecture

This document provides a detailed overview of the system architecture, state transitions, pipelines, and data flow of the AI-powered Candidate Suitability Ranking Engine.

---

## 1. System Architecture

The application is built using a modern decoupled client-server architecture:
*   **Frontend Client:** React 19 web application built with Vite and TypeScript, styled using Tailwind CSS and custom glassmorphism parameters.
*   **Backend Server:** FastAPI server orchestrating database connections and LangGraph pipeline operations.
*   **Vector Database:** PostgreSQL configured with the `pgvector` extension for storing and querying high-dimensional embedding vectors.
*   **AI Orchestration:** LangGraph coordinate flow mapping multi-agent activities using Gemini 2.5 Flash models for text extraction and recruiter reasoning.

```mermaid
graph TD
    subgraph "Frontend Client (Vite + React + TS)"
        UI["Recruiter Dashboard Dashboard UI"]
        Axios["Axios API Client"]
    end

    subgraph "Backend FastAPI Server (Python)"
        API["FastAPI Routes Gateway"]
        ORM["SQLAlchemy Database Layer"]
        LGraph["LangGraph Workflow Orchestrator"]
    end

    subgraph "Vector Database"
        Postgres["PostgreSQL + pgvector"]
    end

    subgraph "AI Services Layer"
        Gemini["Gemini 2.5 Flash API"]
    end

    UI -->|User Interactions| Axios
    Axios -->|HTTP POST Request| API
    API -->|Read/Write Records| ORM
    API -->|Invoke Suite Pipeline| LGraph
    ORM -->|Vector & Tabular SQL| Postgres
    LGraph -->|Embeddings & Justifications| Gemini
    LGraph -->|Read Similarity Data| ORM
```

---

## 2. Agent Workflow

The recruitment evaluation pipeline is orchestrated as a state-driven LangGraph workflow. It passes a shared `RecruitmentState` through six specialized agents to transform raw job and candidate inputs into suitability scores.

```mermaid
stateDiagram-v2
    [*] --> RecruitmentState_Init : Job Description + Resumes

    state RecruitmentState_Init {
        state "Job Intelligence Agent" as JobAgent
        state "Candidate Intelligence Agent" as CandAgent
        state "Semantic Matching Agent" as SemAgent
        state "Behavioral Signal Agent" as BehavAgent
        state "Ranking Agent" as RankAgent
        state "Explainability Agent" as ExplAgent

        [*] --> JobAgent : Raw JD text
        JobAgent --> CandAgent : Structured Job Requirements
        CandAgent --> SemAgent : Structured Candidate Profiles
        SemAgent --> BehavAgent : Semantic Match Vectors
        BehavAgent --> RankAgent : Intent & Engagement Scores
        RankAgent --> ExplAgent : Suitability Ordered Queue
        ExplAgent --> [*] : Shortlist + Text Justifications
    }

    RecruitmentState_Init --> [*] : Final Ranking Shortlist Output
```

---

## 3. Suitability Ranking Pipeline

The final suitability score (0-100) integrates technical matching, job trajectory experience, and behavioral engagement velocity:

$$\text{Final Score} = 0.55 \times \text{Semantic similarity} + 0.15 \times \text{Skill Overlap} + 0.10 \times \text{Experience Match} + 0.20 \times \text{Behavioral score}$$

Where the **Behavioral Score** is calculated as:
$$\text{Behavioral Score} = 0.40 \times \text{Job-Seeker Intent} + 0.30 \times \text{Engagement Frequency} + 0.30 \times \text{Activity Velocity}$$

```mermaid
graph TD
    JD["Raw Job Description Text"] -->|Job Agent| ParsedJD["Parsed Job Requirements"]
    Resume["Raw Resumes Text"] -->|Candidate Agent| ParsedCand["Parsed Candidate Profile"]
    BehaviorData["Recruiter Activity Signals"] -->|Behavioral Agent| BehaviorScore["Behavioral Score (20% Weight)"]

    ParsedJD & ParsedCand -->|Embedding Service| Vectors["Similarity Cosine Math"]
    Vectors -->|Semantic Agent| SemanticScore["Semantic Match (55% Weight)"]

    ParsedJD & ParsedCand -->|Compare Skill Lists| SkillScore["Skill Overlap (15% Weight)"]
    ParsedJD & ParsedCand -->|Compare Exp Years| ExpScore["Experience Match (10% Weight)"]

    SemanticScore & SkillScore & ExpScore & BehaviorScore -->|Ranking Formula| FinalScore["Final Suitability Score (0-100)"]
```

---

## 4. Frontend Router Routing Flow

The frontend application uses a clean, progressive page routing sequence mapping to the recruit's assessment stages.

```mermaid
graph LR
    Landing["/ (Landing Page)"] -->|Clicks Sourcing CTA| JobInput["/job (Job Description Input)"]
    JobInput -->|Analyze Job Title/Desc| Upload["/candidates (Resumes Upload Queue)"]
    Upload -->|Upload Files & Click Analyze| Processing["/processing (AI Processing Checklist)"]
    Processing -->|Fetch API Call Completes| Dashboard["/dashboard (Ranked Shortlist Dashboard)"]
    Dashboard -->|Click Table Row| Drawer["Inspect Drawer (Detailed Assessment Profiles)"]
```

---

## 5. System Data Flow

Data flows dynamically from raw parameter inputs to parsed embeddings, similarity metrics evaluation, and recruiter shortlist outputs.

```mermaid
sequenceDiagram
    autonumber
    actor Recruiter as Recruiter Dashboard User
    participant App as React Frontend Client
    participant API as FastAPI Router Gateway
    participant Graph as LangGraph Orchestrator
    participant Gemini as Gemini 2.5 Flash
    participant DB as PostgreSQL + pgvector

    Recruiter->>App: Submits Job Description + Resumes
    App->>API: POST /api/v1/rankings/run (Payload parameters)
    API->>Graph: Invoke Graph Workflow State
    Graph->>Gemini: Parse Job text to Structured JSON requirements
    Gemini-->>Graph: Returns structured requirements
    Graph->>Gemini: Parse Candidate resumes to Structured JSON profiles
    Gemini-->>Graph: Returns structured profiles
    Graph->>Gemini: Generate text embeddings vectors
    Gemini-->>Graph: Returns embedding vectors
    Graph->>DB: Query vector comparisons (pgvector similarity calculations)
    DB-->>Graph: Returns cosine similarity distance metrics
    Graph->>Graph: Calculate suitability ranking weights scores
    Graph->>Gemini: Generate natural language explainability reasoning
    Gemini-->>Graph: Returns strengths, weaknesses, and texts
    Graph-->>API: Returns final execution state
    API-->>App: Return list of Ranked Candidates shortlist
    App->>Recruiter: Renders Interactive table, details drawer, and SVG charts
```
