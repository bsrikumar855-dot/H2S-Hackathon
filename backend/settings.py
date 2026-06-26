import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(__file__), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

    DATABASE_URL: str = "sqlite:///backend/database/h2s_recruiter.db"
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    ENVIRONMENT: str = "development"
    PORT: int = 8000
    HOST: str = "0.0.0.0"

# Instantiated single settings instance for import across the app
settings = Settings()
