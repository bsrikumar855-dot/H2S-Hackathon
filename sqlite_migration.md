# SQLite Migration

## Architecture Changes

The backend now uses SQLite as the primary and only database. FastAPI, SQLAlchemy, LangGraph, the AI agents, ranking logic, explainability, behavioral intelligence, REST APIs, and the React frontend remain unchanged in behavior.

## Configuration Changes

- Removed the legacy server database URL setting.
- Added `DATABASE_URL`.
- Default database URL: `sqlite:///backend/database/h2s_recruiter.db`.
- Updated `backend/.env.example` and `backend/.env`.

## SQLAlchemy Changes

`backend/database/database.py` now creates the engine with:

```python
create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False}
)
```

`SessionLocal`, the declarative `Base`, and the `get_db` dependency remain in place.

## SQLite Schema

`Base.metadata.create_all(bind=engine)` creates the schema automatically at startup.

Tables created from the current models:

- `jobs`
- `job_embeddings`
- `candidates`
- `candidate_experiences`
- `candidate_skills`
- `candidate_embeddings`
- `rankings`

## Model Type Replacements

- Legacy dialect UUID -> SQLAlchemy portable `Uuid`
- Legacy binary JSON -> SQLAlchemy `JSON`
- Legacy array columns -> JSON list columns
- Legacy vector-extension columns -> JSON list columns

## CRUD Verification

Added `scripts/test_database.py`.

The script:

- Connects to SQLite
- Creates tables
- Inserts a sample job
- Inserts a sample candidate
- Inserts a sample ranking
- Commits data
- Reads data
- Updates data
- Deletes data
- Exits successfully when CRUD works

Verified with:

```powershell
python scripts\test_database.py
```

Result: CRUD verification succeeded against `backend/database/h2s_recruiter.db`.

## API Verification

The health endpoint returns:

```json
{
  "status": "ok",
  "database": "connected"
}
```

`POST /api/v1/rankings/run` continues to execute the existing LangGraph ranking workflow.

Verified with a live Uvicorn server on `127.0.0.1:8001`:

- `GET /health`: HTTP 200, `{"status":"ok","database":"connected"}`
- `POST /api/v1/rankings/run`: HTTP 200
- Ranking response included rank, score, confidence, explanation, and behavior score.

## Frontend Verification

The frontend API contract was not changed. Existing frontend calls to the ranking API continue to target the same endpoint and response shape.

Verified with:

```powershell
npm.cmd run build
```

Result: production build succeeded. The CSS minifier emitted existing warnings for Tailwind/shadcn-style at-rules, but the command exited successfully.

Verified dev server availability:

- Vite served `http://127.0.0.1:5173/`
- HTTP 200 response
- `frontend.err.log` was empty

## Known Limitations

- Embeddings are stored as JSON arrays in SQLite. This preserves application compatibility but does not provide database-side vector indexes.
- The current ranking endpoint uses the existing in-process LangGraph workflow and does not depend on database vector search.

## Automated Tests

Verified with:

```powershell
python -m pytest
```

Result: 6 passed.
