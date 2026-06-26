# Database Audit

## Files Inspected

- `backend/settings.py`
- `backend/database/database.py`
- `backend/database/base.py`
- `backend/database/models.py`
- `backend/main.py`
- `backend/requirements.txt`
- `backend/.env`
- `backend/.env.example`

## Legacy Database Items Found

- Settings used a legacy server database URL field and DSN default.
- The SQLAlchemy engine used that legacy URL plus server-style pool settings.
- Models used server-specific UUID and binary JSON dialect types.
- Models used a server-specific array column type.
- Embedding columns used an external vector extension package.
- Requirements included legacy server database client packages.
- No external hosted database client package, import, or environment variable was found.

## Migration Decisions

- Replaced the legacy database URL setting with `DATABASE_URL`.
- Defaulted `DATABASE_URL` to `sqlite:///backend/database/h2s_recruiter.db`.
- Replaced dialect-specific UUID with SQLAlchemy's portable `Uuid`.
- Replaced binary JSON columns with SQLAlchemy `JSON`.
- Replaced array columns with JSON list columns.
- Replaced vector-extension columns with JSON list columns for MVP compatibility.
- Kept SQLAlchemy, relationships, primary keys, foreign keys, and automatic `Base.metadata.create_all(bind=engine)` initialization.
