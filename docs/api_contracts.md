# api_contracts.md

This document defines the REST API endpoints, requests, responses, and error structures for the candidate ranking engine.

---

## 1. Job Management API

### POST `/api/v1/jobs`
Submit a raw job description for parsing and semantic analysis.

#### Request Header
```http
Content-Type: application/json
```

#### Request Payload
```json
{
  "title": "Senior Backend Engineer",
  "raw_description": "We are looking for a Senior Backend Engineer with 5+ years of experience in Python and FastAPI. Experience with Postgres, Docker, and Kubernetes is preferred. You will design scalability architectures..."
}
```

#### Response (201 Created)
```json
{
  "job_id": "4a82fb8d-29e8-4682-8409-56b19a16f240",
  "title": "Senior Backend Engineer",
  "status": "VALID",
  "structured_data": {
    "role_title": "Senior Backend Engineer",
    "seniority_level": "SENIOR",
    "technical_skills": {
      "mandatory": ["Python", "FastAPI"],
      "preferred": ["PostgreSQL", "Docker", "Kubernetes"]
    },
    "business_domain": "SaaS",
    "architecture_patterns": ["Microservices", "Scalability Architecture"],
    "minimum_years_experience": 5,
    "soft_skills": [],
    "reasoning": "Successfully parsed 5+ years requirement and isolated core frameworks."
  },
  "created_at": "2026-06-20T08:00:00Z"
}
```

---

### GET `/api/v1/jobs/{job_id}`
Retrieve structured details of an existing job.

#### Response (200 OK)
```json
{
  "job_id": "4a82fb8d-29e8-4682-8409-56b19a16f240",
  "title": "Senior Backend Engineer",
  "structured_data": {
    "role_title": "Senior Backend Engineer",
    "seniority_level": "SENIOR",
    "technical_skills": {
      "mandatory": ["Python", "FastAPI"],
      "preferred": ["PostgreSQL", "Docker", "Kubernetes"]
    },
    "minimum_years_experience": 5
  },
  "created_at": "2026-06-20T08:00:00Z"
}
```

---

## 2. Candidate Management API

### POST `/api/v1/candidates`
Upload candidate resumes for parsing and indexing.

#### Request Header
```http
Content-Type: multipart/form-data
```

#### Multipart Fields
* **`file`** (binary): Resume file (PDF or Docx).
* **`github_url`** (string, optional): External link profile.
* **`linkedin_url`** (string, optional): External link profile.

#### Response (202 Accepted)
```json
{
  "task_id": "8f82f23b-5512-4cf3-a5c9-58b29f0412e0",
  "status": "PROCESSING",
  "message": "Resume upload received. Parsing and semantic indexing scheduled in background."
}
```

---

### GET `/api/v1/candidates/{candidate_id}`
Retrieve fully parsed candidate profile data.

#### Response (200 OK)
```json
{
  "candidate_id": "3b29c910-410a-42cc-a068-07e8ef2882a1",
  "full_name": "Jane Doe",
  "current_title": "Backend Engineer",
  "total_years_experience": 6.5,
  "skills_declared": ["Python", "FastAPI", "Docker", "AWS"],
  "experience_history": [
    {
      "company": "Tech Corp",
      "title": "Backend Engineer",
      "duration_months": 36,
      "description": "Led backend microservices deployment using FastAPI and PostgreSQL.",
      "quantified_impact": ["Decreased API response time by 30%"]
    }
  ],
  "created_at": "2026-06-20T08:05:00Z"
}
```

---

## 3. Candidate Ranking API

### POST `/api/v1/jobs/{job_id}/rank`
Trigger candidate ranking run against a specific job description.

#### Request Header
```http
Content-Type: application/json
```

#### Request Payload
```json
{
  "candidate_ids": [
    "3b29c910-410a-42cc-a068-07e8ef2882a1"
  ],
  "override_weights": {
    "semantic_similarity": 0.50,
    "experience_alignment": 0.10,
    "skill_match": 0.30,
    "trajectory_bonus": 0.10
  }
}
```
*Note: If `candidate_ids` list is empty, the ranking engine searches the entire database index.*

#### Response (200 OK)
```json
{
  "ranking_run_id": "b3e94cd0-0fc1-460d-862d-986ffbe03b22",
  "job_id": "4a82fb8d-29e8-4682-8409-56b19a16f240",
  "shortlist": [
    {
      "rank": 1,
      "candidate_id": "3b29c910-410a-42cc-a068-07e8ef2882a1",
      "full_name": "Jane Doe",
      "total_score": 94.20,
      "confidence_score": 0.95,
      "score_breakdown": {
        "semantic_similarity": 92.50,
        "experience_alignment": 100.00,
        "skill_match": 95.00,
        "trajectory_bonus": 90.00
      },
      "explanation": {
        "matching_summary": "Jane is an exceptional fit, offering over 6 years of backend experience specializing in FastAPI, directly aligning with the core requirements.",
        "key_differentiators": [
          "Demonstrated microservices scale experience at Tech Corp",
          "FastAPI skill depth matches top 5% of candidate pool"
        ],
        "perceived_risks": [],
        "interview_guidance_questions": [
          "Explain the API scaling strategies you used at Tech Corp that led to the 30% speedup."
        ]
      }
    }
  ]
}
```

---

## 4. Recruiter Copilot / Feedback API

### POST `/api/v1/jobs/{job_id}/copilot`
Post conversational queries to refine search results.

#### Request Payload
```json
{
  "ranking_run_id": "b3e94cd0-0fc1-460d-862d-986ffbe03b22",
  "recruiter_query": "Prioritize Docker and Kubernetes experience even if they have slightly less total years of experience."
}
```

#### Response (200 OK)
```json
{
  "copilot_action": "RE_WEIGHT",
  "action_description": "Boosted weight of infrastructure skills (Docker, Kubernetes) and lowered weight of chronological experience.",
  "new_weights": {
    "semantic_similarity": 0.40,
    "experience_alignment": 0.10,
    "skill_match": 0.45,
    "trajectory_bonus": 0.05
  },
  "updated_shortlist_preview": [
    {
      "rank": 1,
      "candidate_id": "3b29c910-410a-42cc-a068-07e8ef2882a1",
      "new_score": 96.10,
      "previous_score": 94.20
    }
  ]
}
```

---

## 5. API Error Payloads

All error responses return a standardized validation schema.

#### 400 Bad Request (Validation Failure)
```json
{
  "error": "BAD_REQUEST",
  "message": "Validation failed for request parameters.",
  "details": [
    {
      "field": "override_weights.semantic_similarity",
      "issue": "Weights must sum to 1.0. Current sum is 1.15"
    }
  ]
}
```

#### 404 Not Found
```json
{
  "error": "RESOURCE_NOT_FOUND",
  "message": "Job with ID 4a82fb8d-29e8-4682-8409-56b19a16f240 was not found."
}
```

#### 503 Service Unavailable
```json
{
  "error": "LLM_TIMEOUT",
  "message": "The LLM parsing service took too long to respond. Please retry your request."
}
```
