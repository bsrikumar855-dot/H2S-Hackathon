from datetime import UTC, datetime
from decimal import Decimal
from pathlib import Path
import sys

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from backend.database.base import Base
from backend.database.database import SessionLocal, engine
from backend.database.models import CandidateModel, JobModel, RankingModel


def main():
    print("Connecting to database...")
    Base.metadata.create_all(bind=engine)
    print("Tables created.")

    db = SessionLocal()
    try:
        job = JobModel(
            title="SQLite Test Engineer",
            raw_description="Build and verify SQLite-backed FastAPI workflows.",
            structured_data={"role": "Engineer", "skills": ["Python", "SQLAlchemy"]},
        )
        candidate = CandidateModel(
            full_name="SQLite Candidate",
            email="sqlite.candidate@example.com",
            total_years_experience=Decimal("5.50"),
            raw_resume_text="Python, FastAPI, SQLAlchemy",
            external_links={"github": "https://example.com/sqlite-candidate"},
            meta_attributes={"source": "scripts/test_database.py"},
        )
        db.add_all([job, candidate])
        db.flush()

        ranking = RankingModel(
            job_id=job.id,
            candidate_id=candidate.id,
            total_score=Decimal("91.25"),
            score_breakdown={"semantic": 90, "skill": 92},
            confidence_score=Decimal("0.95"),
            explanation_summary="Strong SQLite migration test match.",
            key_differentiators=["FastAPI", "SQLAlchemy"],
            perceived_risks=[],
            interview_guidance=["Discuss SQLite transaction handling."],
            ranking_run_id=job.id,
            created_at=datetime.now(UTC),
        )
        db.add(ranking)
        db.commit()
        print(f"Inserted job={job.id}, candidate={candidate.id}, ranking={ranking.id}")

        saved = db.query(RankingModel).filter(RankingModel.id == ranking.id).one()
        print(f"Read ranking score={saved.total_score}, candidate={saved.candidate.full_name}")

        saved.explanation_summary = "Updated CRUD verification summary."
        db.commit()
        print("Updated ranking explanation.")

        db.delete(saved)
        db.delete(candidate)
        db.delete(job)
        db.commit()
        print("Deleted sample rows.")

        rollback_job = JobModel(
            title="Rollback Verification",
            raw_description="This row should not persist.",
            structured_data={"rollback": True},
        )
        db.add(rollback_job)
        db.flush()
        rollback_id = rollback_job.id
        db.rollback()
        rolled_back = db.query(JobModel).filter(JobModel.id == rollback_id).first()
        assert rolled_back is None, "Rollback verification row unexpectedly persisted."
        print("Rollback verification succeeded.")

        print("CRUD verification succeeded.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
