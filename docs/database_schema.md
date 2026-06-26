# database_schema.md

This document defines the SQLite database schema used by the AI Recruiter MVP. SQLAlchemy creates these tables automatically with `Base.metadata.create_all(bind=engine)`.

---

## 1. Database Location

The local database file is:

```text
backend/database/h2s_recruiter.db
```

The default connection string is:

```env
DATABASE_URL=sqlite:///backend/database/h2s_recruiter.db
```

---

## 2. Table Relationships

```mermaid
erDiagram
    JOBS ||--o{ JOB_EMBEDDINGS : has
    CANDIDATES ||--o{ CANDIDATE_EXPERIENCES : has
    CANDIDATES ||--o{ CANDIDATE_SKILLS : has
    CANDIDATES ||--o{ CANDIDATE_EMBEDDINGS : has
    JOBS ||--o{ RANKINGS : has
    CANDIDATES ||--o{ RANKINGS : evaluated_in
```

---

## 3. Tables

### `jobs`

- `id`: portable UUID primary key
- `title`: job title
- `raw_description`: original job text
- `structured_data`: JSON parsed job payload
- `created_at`, `updated_at`: timestamps

### `job_embeddings`

- `id`: portable UUID primary key
- `job_id`: foreign key to `jobs.id`
- `embedding`: JSON array for embedding values
- `chunk_text`: source text for the embedding
- `category`: source category
- `created_at`: timestamp

### `candidates`

- `id`: portable UUID primary key
- `full_name`, `email`, `phone`, `location`: profile fields
- `total_years_experience`: numeric experience value
- `raw_resume_text`: original resume text
- `external_links`: JSON object
- `meta_attributes`: JSON object
- `created_at`, `updated_at`: timestamps

### `candidate_experiences`

- `id`: portable UUID primary key
- `candidate_id`: foreign key to `candidates.id`
- `company`, `title`: experience fields
- `start_date`, `end_date`: timeline dates
- `duration_months`: integer duration
- `description`: role summary
- `quantified_impact`: JSON list
- `skills_applied`: JSON list
- `created_at`: timestamp

### `candidate_skills`

- `id`: portable UUID primary key
- `candidate_id`: foreign key to `candidates.id`
- `skill_name`: original skill label
- `normalized_skill`: normalized skill label
- `years_experience`: numeric experience value
- `verified`: boolean
- `created_at`: timestamp

### `candidate_embeddings`

- `id`: portable UUID primary key
- `candidate_id`: foreign key to `candidates.id`
- `embedding`: JSON array for embedding values
- `chunk_text`: source text for the embedding
- `context_source`: resume context label
- `created_at`: timestamp

### `rankings`

- `id`: portable UUID primary key
- `job_id`: foreign key to `jobs.id`
- `candidate_id`: foreign key to `candidates.id`
- `total_score`: numeric ranking score
- `score_breakdown`: JSON object
- `confidence_score`: numeric confidence value
- `explanation_summary`: text explanation
- `key_differentiators`: JSON list
- `perceived_risks`: JSON list
- `interview_guidance`: JSON list
- `ranking_run_id`: portable UUID linking a batch run
- `created_at`: timestamp

---

## 4. SQLite Notes

- JSON columns are stored with SQLAlchemy's portable `JSON` type.
- Embeddings are persisted as JSON arrays for MVP compatibility.
- The ranking endpoint currently computes semantic similarity in the application workflow and does not require database-side vector indexes.
