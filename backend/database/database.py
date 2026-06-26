from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.settings import settings

# SQLite is the primary database for the MVP.
engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Session factory for local transaction sessions
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)

def get_db():
    """
    Dependency helper to provide a scoped database session.
    Closes the session automatically upon request completion.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
