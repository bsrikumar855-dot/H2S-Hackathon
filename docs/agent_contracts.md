# agent_contracts.md

This document defines the functional contracts, inputs, outputs, internal workflows, failure handling strategies, and dependencies for the six core agents in the candidate ranking system.

---

## 1. Job Intelligence Agent

### Purpose
Extract and structure requirements from unstructured job descriptions (JDs), standardizing them into a structured schema containing role metadata, prioritized skills, target experience levels, and architectural contexts.

### Inputs
* **`raw_job_description`** (string): Raw text input provided by the recruiter.
* **`custom_metadata`** (object, optional): Explicit filters (e.g., location, salary cap).

### Outputs
* **`structured_job`** (JSON object):
  ```json
  {
    "role_title": "string",
    "seniority_level": "JUNIOR | MID | SENIOR | LEAD | PRINCIPAL",
    "technical_skills": {
      "mandatory": ["string"],
      "preferred": ["string"]
    },
    "business_domain": "string",
    "architecture_patterns": ["string"],
    "minimum_years_experience": 5,
    "soft_skills": ["string"],
    "status": "VALID | INVALID | AMBIGUOUS",
    "reasoning": "string"
  }
  ```

### Internal Workflow
1. **Sanitize & Clean:** Strip boilerplate text (e.g., "Equal Opportunity Employer...").
2. **Contextual Classification:** Classify the role title and seniority tier based on keywords and scope phrases.
3. **Requirement Extraction:** Query the LLM using a structured schema to isolate mandatory vs. optional technical requirements.
4. **Domain & Pattern Mapping:** Infer domain (e.g., FinTech, SaaS) and architectural complexity indicators (e.g., Microservices, Event Sourcing).
5. **Consistency Check:** Run an internal check comparing years of experience to seniority tier. If contradictions exist (e.g., "Senior Engineer with 0-1 years of experience"), mark as `AMBIGUOUS`.

### Failure Handling
* **Vague JDs:** If the text lacks technical indicators, return `status: "INVALID"` with a clean list of clarification questions inside `reasoning`.
* **LLM Output Corruption:** Fall back to a regex-based parser to retrieve minimal required text blocks and flag for manual correction.

### Dependencies
* LLM Engine (`gemini-1.5-flash`).

---

## 2. Candidate Intelligence Agent

### Purpose
Parse heterogeneous resumes (PDF/Docx) and web profiles, standardizing them into an enriched, structural JSON representation. It extracts timeline chronology, computes experience durations, maps skills, and fetches external markers where available.

### Inputs
* **`raw_resume_bytes`** (binary): Base64 encoded file stream.
* **`profile_urls`** (array of strings, optional): Public profile URLs.

### Outputs
* **`enriched_candidate`** (JSON object):
  ```json
  {
    "candidate_id": "UUID",
    "full_name": "string",
    "current_title": "string",
    "years_experience": 7.2,
    "experience_history": [
      {
        "company": "string",
        "title": "string",
        "start_date": "YYYY-MM",
        "end_date": "YYYY-MM | Present",
        "duration_months": 24,
        "description": "string",
        "quantified_impact": ["string"],
        "skills_applied": ["string"]
      }
    ],
    "skills_declared": ["string"],
    "education": [
      {
        "institution": "string",
        "degree": "string",
        "year": "integer"
      }
    ],
    "open_source_contributions": {
      "repository_count": 0,
      "primary_languages": ["string"],
      "stars_count": 0
    }
  }
  ```

### Internal Workflow
1. **Document Processing:** Extract raw text from files using standard PDF/Docx text extraction helper libraries.
2. **Structural Chunking:** Pass raw text to the parsing model to segment into personal details, work history, skills, and academic background.
3. **Chronology Resolution:** Parse and convert all start/end dates into absolute timestamps; calculate tenure periods per position and verify the sum against total years of experience.
4. **Impact Metric Filtering:** Scan work histories using regex and LLM pattern matchers to extract quantified impact statements (e.g., budgets managed, speed-ups achieved).
5. **Metadata Enrichment:** Fetch public metadata stats using integration workers if URLs are attached, adding external context to the profile representation.

### Failure Handling
* **Parsing Errors:** If file layout is unreadable, fallback to OCR processing. If OCR fails, write error state to database and set `enriched_candidate.full_name` to "Manual Review Required".
* **Invalid Timelines:** If dates overlap inexplicably (excluding concurrent jobs), compute the absolute difference and tag the profile for manual review.

### Dependencies
* PDF/Docx extraction library.
* LLM Engine (`gemini-1.5-flash`).

---

## 3. Semantic Matching Agent

### Purpose
Generate vector representations of the JD requirements and candidate profiles, retrieve potential matches using database vector similarity searches, and identify overlaps and skill gaps.

### Inputs
* **`structured_job`** (JSON object from Job Intelligence Agent).
* **`candidate_pool_filter`** (object): Target parameters (e.g., location boundaries, active search status).

### Outputs
* **`vector_match_results`** (array of objects):
  ```json
  [
    {
      "candidate_id": "UUID",
      "cosine_similarity_score": 0.892,
      "skill_overlap": ["string"],
      "missing_skills": ["string"],
      "domain_fit": true
    }
  ]
  ```

### Internal Workflow
1. **Vector Preparation:** Create query texts by combining structural elements of the JD (role title + business domain + mandatory skills).
2. **Embedding Generation:** Call the embedding model to convert query text into a 768-dimension vector.
3. **Vector Database Retrieval:** Run a cosine similarity query against the candidate resume embeddings in SQLite JSON embeddings using an HNSW index, returning the top $N$ matching profiles.
4. **Overlap Analysis:** Compare the candidate's extracted skills against the JD's mandatory and preferred skills lists. Compute exact matching, synonym matching, and track gaps.

### Failure Handling
* **Empty Results:** If similarity scores are lower than 0.4, expand the search query by removing optional skills and re-executing.
* **Embedding API Timeout:** Implement retry logic with exponential backoff. If failures persist, fall back to DB-level fuzzy and full-text keyword indexing query matches.

### Dependencies
* Embedding API (`text-embedding-004`).
* SQLite vector database context.

---

## 4. Ranking Agent

### Purpose
Combine semantic similarity scores, calculated career trajectory metrics, tenure profiles, and role alignment metrics to compute a final relevance score and generate a ranked list.

### Inputs
* **`vector_match_results`** (array of objects).
* **`structured_job`** (JSON object).
* **`override_weights`** (object, optional).

### Outputs
* **`ranked_shortlist`** (array of objects):
  ```json
  [
    {
      "rank": 1,
      "candidate_id": "UUID",
      "total_score": 92.4,
      "score_dimensions": {
        "semantic_similarity": 89.2,
        "experience_alignment": 95.0,
        "trajectory_bonus": 10.0,
        "skill_match_rate": 88.0
      },
      "confidence_score": 0.95
    }
  ]
  ```

### Internal Workflow
1. **Calculate Baseline Similarity:** Normalize semantic cosine similarity scores to a 0-100 scale.
2. **Calculate Experience Alignment:** Evaluate candidate's experience duration against the requirements. Apply dynamic scaling curves (no penalty for exceeding, fractional penalty for under-experience).
3. **Evaluate Trajectory:** Analyze advancement speed, company transitions, and role growth patterns to compute a progression metric.
4. **Compute Unified Score:** Apply weight formulas to integrate scores. Apply user-defined weight overrides if present.
5. **Calculate Confidence Metric:** Measure data density and verify that dates and skills are complete. Output a confidence percentage.
6. **Sort:** Order list descending by `total_score`.

### Failure Handling
* **Weight Balance Failure:** If a candidate's score drops to zero, log the calculation parameters and use default balanced weights.
* **Index Collisions:** If scores are identical down to two decimals, rank candidates using chronological duration of most recent technical role as tiebreaker.

### Dependencies
* Ranking Engine Rules (defined in `ranking_design.md`).

---

## 5. Explainability Agent

### Purpose
Translate score distributions, skill match rates, and profile details into structured, clear, and actionable natural language explanations for recruiters and hiring managers.

### Inputs
* **`ranked_shortlist`** (array of objects).
* **`structured_job`** (JSON object).
* **`candidates_data`** (array of objects).

### Outputs
* **`explanations_payload`** (array of objects):
  ```json
  [
    {
      "candidate_id": "UUID",
      "matching_summary": "string",
      "key_differentiators": ["string"],
      "perceived_risks": ["string"],
      "interview_guidance_questions": ["string"]
    }
  ]
  ```

### Internal Workflow
1. **Context Assembly:** Build a prompt containing candidate work experience, skill overlaps, and the target role details.
2. **Identify Differentiators:** Highlight specific achievements that match the JD's complex requirements (e.g., "Led migration from Python monolithic code to Go microservices").
3. **Identify Gaps & Risks:** Highlight missing requirements, high frequency of job changes, or lack of scale experience.
4. **Draft Interview Questions:** Formulate 2-3 target interview questions addressing identified gaps or validating claims.
5. **Format Check:** Ensure response matches schema requirements, excluding generic buzzwords and focusing on concrete actions.

### Failure Handling
* **Context Overload:** If profiles are too long, pass only the last 3 roles and skill matches to the model.
* **LLM Generation Failures:** Output fallback templated text containing bulleted skill matches and tenure summaries.

### Dependencies
* LLM Engine (`gemini-1.5-pro` for reasoning quality).

---

## 6. Recruiter Copilot Agent

### Purpose
Parse natural language queries and feedback from recruiters to dynamically adjust weight configurations, apply search filters, and tune the ranking results.

### Inputs
* **`recruiter_query`** (string): Natural language input (e.g., "Focus on candidates with scale experience, even if they have fewer total years of coding").
* **`current_weights`** (JSON object): Active configuration parameters.

### Outputs
* **`copilot_action`** (JSON object):
  ```json
  {
    "action_type": "RE_WEIGHT | FILTER | CLARIFY",
    "updated_weights": {
      "semantic_similarity": 0.4,
      "experience_alignment": 0.2,
      "scale_and_complexity": 0.4
    },
    "applied_filters": {
      "minimum_seniority": "string",
      "required_skills_override": ["string"]
    },
    "clarification_message": "string"
  }
  ```

### Internal Workflow
1. **Analyze Query Intent:** Detect whether the recruiter wants to change matching priorities (RE_WEIGHT), narrow down candidates (FILTER), or ask questions about the candidates.
2. **Translate Weights:** Map natural language descriptors to quantitative weight variations (e.g., "prioritize scalability" increases the scale metric weight while scaling down basic years of experience).
3. **Extract Filter Gaps:** Identify explicit criteria (e.g., location, programming languages) to apply as hard constraints in SQL.
4. **Validate Change Logic:** Ensure the sum of matching weights scales to 1.0. If changes are extreme, normalize the values.

### Failure Handling
* **Ambiguous Inputs:** If query intent is unclear, return `action_type: "CLARIFY"` with a message describing options to focus search.
* **Extreme Overrides:** Cap maximum weight variations at 0.8 for any single dimension to preserve baseline match stability.

### Dependencies
* LLM Engine (`gemini-1.5-flash`).
