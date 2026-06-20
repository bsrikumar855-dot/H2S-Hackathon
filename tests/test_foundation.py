import os
import uuid
import pytest
from backend.settings import settings
from backend.schemas.job import JobCreate, StructuredJobData, TechnicalSkillsSchema
from backend.graph.workflow import recruitment_graph

def test_settings_load():
    """
    Verify configuration parses environment variables.
    """
    assert settings.ENVIRONMENT == "development"
    assert settings.PORT == 8000
    assert settings.HOST == "0.0.0.0"

def test_pydantic_schema_validation():
    """
    Ensure Job structures serialize and validate correctly.
    """
    job_input = JobCreate(
        title="Test Backend Engineer",
        raw_description="Looking for Python engineers."
    )
    assert job_input.title == "Test Backend Engineer"
    
    structured_data = StructuredJobData(
        role_title="Backend Engineer",
        seniority_level="MID",
        technical_skills=TechnicalSkillsSchema(mandatory=["Python"], preferred=[]),
        minimum_years_experience=3,
        status="VALID",
        reasoning="Test"
    )
    assert structured_data.role_title == "Backend Engineer"
    assert "Python" in structured_data.technical_skills.mandatory

def test_langgraph_workflow_skeleton():
    """
    Verify the compiled LangGraph workflow compiles and executes 
    through its node skeletons successfully.
    """
    # Create clean initial state
    initial_state = {
        "raw_job_description": "We need a Senior Software Engineer with 5 years experience.",
        "job": {},
        "candidates": ["Jane Doe\n5 years experience\nSkills: Python"],
        "scores": {},
        "rankings": [],
        "explanations": [],
        "errors": [],
        "override_weights": None,
        "copilot_query": None
    }
    
    # Run the compiled state graph
    final_state = recruitment_graph.invoke(initial_state)
    
    # Verify State updates from agent skeleton runs
    assert "role" in final_state["job"]
    assert isinstance(final_state["candidates"], list)
    assert isinstance(final_state["scores"], dict)
    assert isinstance(final_state["rankings"], list)
    assert isinstance(final_state["explanations"], list)
    assert len(final_state["errors"]) == 0
