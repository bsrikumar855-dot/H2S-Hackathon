import uuid
from sqlalchemy import Column, String, Text, Integer, Numeric, Boolean, DateTime, ForeignKey, Table, ARRAY
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from pgvector.sqlalchemy import Vector

from backend.database.base import Base

class JobModel(Base):
    __tablename__ = "jobs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    raw_description = Column(Text, nullable=False)
    structured_data = Column(JSONB, nullable=False, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    embeddings = relationship("JobEmbeddingModel", back_populates="job", cascade="all, delete-orphan")
    rankings = relationship("RankingModel", back_populates="job", cascade="all, delete-orphan")


class JobEmbeddingModel(Base):
    __tablename__ = "job_embeddings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_id = Column(UUID(as_uuid=True), ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    embedding = Column(Vector(768), nullable=False)
    chunk_text = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)  # 'summary', 'mandatory_skills', 'optional_skills'
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    job = relationship("JobModel", back_populates="embeddings")


class CandidateModel(Base):
    __tablename__ = "candidates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=True)
    phone = Column(String(50), nullable=True)
    total_years_experience = Column(Numeric(4, 2), nullable=True)
    location = Column(String(255), nullable=True)
    raw_resume_text = Column(Text, nullable=True)
    external_links = Column(JSONB, nullable=False, default={})
    meta_attributes = Column(JSONB, nullable=False, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    experiences = relationship("CandidateExperienceModel", back_populates="candidate", cascade="all, delete-orphan")
    skills = relationship("CandidateSkillModel", back_populates="candidate", cascade="all, delete-orphan")
    embeddings = relationship("CandidateEmbeddingModel", back_populates="candidate", cascade="all, delete-orphan")
    rankings = relationship("RankingModel", back_populates="candidate", cascade="all, delete-orphan")


class CandidateExperienceModel(Base):
    __tablename__ = "candidate_experiences"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    candidate_id = Column(UUID(as_uuid=True), ForeignKey("candidates.id", ondelete="CASCADE"), nullable=False)
    company = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=True)  # NULL indicates "Present"
    duration_months = Column(Integer, nullable=False)
    description = Column(Text, nullable=True)
    quantified_impact = Column(ARRAY(Text), nullable=True)
    skills_applied = Column(ARRAY(String(100)), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    candidate = relationship("CandidateModel", back_populates="experiences")


class CandidateSkillModel(Base):
    __tablename__ = "candidate_skills"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    candidate_id = Column(UUID(as_uuid=True), ForeignKey("candidates.id", ondelete="CASCADE"), nullable=False)
    skill_name = Column(String(150), nullable=False)
    normalized_skill = Column(String(150), nullable=False)
    years_experience = Column(Numeric(4, 2), nullable=True)
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    candidate = relationship("CandidateModel", back_populates="skills")


class CandidateEmbeddingModel(Base):
    __tablename__ = "candidate_embeddings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    candidate_id = Column(UUID(as_uuid=True), ForeignKey("candidates.id", ondelete="CASCADE"), nullable=False)
    embedding = Column(Vector(768), nullable=False)
    chunk_text = Column(Text, nullable=False)
    context_source = Column(String(100), nullable=False)  # e.g., 'resume_summary', 'experience_1', etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    candidate = relationship("CandidateModel", back_populates="embeddings")


class RankingModel(Base):
    __tablename__ = "rankings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_id = Column(UUID(as_uuid=True), ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    candidate_id = Column(UUID(as_uuid=True), ForeignKey("candidates.id", ondelete="CASCADE"), nullable=False)
    total_score = Column(Numeric(5, 2), nullable=False)
    score_breakdown = Column(JSONB, nullable=False, default={})
    confidence_score = Column(Numeric(3, 2), nullable=False)
    explanation_summary = Column(Text, nullable=True)
    key_differentiators = Column(ARRAY(Text), nullable=True)
    perceived_risks = Column(ARRAY(Text), nullable=True)
    interview_guidance = Column(ARRAY(Text), nullable=True)
    ranking_run_id = Column(UUID(as_uuid=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    job = relationship("JobModel", back_populates="rankings")
    candidate = relationship("CandidateModel", back_populates="rankings")
