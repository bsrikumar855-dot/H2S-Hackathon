from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.settings import settings

# Create engine with connection pooling enabled
engine = create_engine(
    settings.POSTGRES_URL,
    pool_pre_ping=True,  # Verifies connectivity before executing queries
    pool_size=10,
    max_overflow=20
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
