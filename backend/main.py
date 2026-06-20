import uvicorn
from fastapi import FastAPI
from backend.settings import settings
from backend.database.database import engine
from backend.database.base import Base
from backend.api.v1.routes import router as api_router

# Ensure models are imported so SQLAlchemy knows about them before creation
from backend.database import models

# Create FastAPI app metadata
app = FastAPI(
    title="AI Recruiter Ranking Engine",
    description="An AI-driven recruiter tool utilizing multi-agent LangGraph workflow and PostgreSQL vector embeddings.",
    version="1.0.0"
)

@app.on_event("startup")
def startup_event():
    """
    Auto-initialize database tables on server startup.
    This provides an out-of-the-box runnable state.
    """
    print("[Startup] Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    print("[Startup] Database initialization complete.")

@app.get("/health")
def health_check():
    """
    Basic application health check validator.
    """
    return {
        "status": "ok",
        "environment": settings.ENVIRONMENT,
        "database": "connected"  # Simple status placeholder
    }

# Register the API routes under /api
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(
        "backend.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True if settings.ENVIRONMENT == "development" else False
    )
