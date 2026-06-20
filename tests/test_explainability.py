import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_explainability_scoring_and_gaps():
    """
    Vets the explainability engine:
    1. Validates that confidence scores are generated in range [0, 100].
    2. Validates that skill gaps map transferable skills (e.g. Django -> FastAPI).
    3. Validates that candidate justifications (strengths, weaknesses, summaries) are returned.
    """
    job_desc = (
        "We are looking for a Senior Developer with 5 years experience. "
        "Required skills: FastAPI, Docker, GCP. "
        "Key duties: Design high-performance APIs."
    )

    # Candidate has Django (transferable for FastAPI) and AWS (transferable for GCP)
    candidates = [
        "Alex Rivera\nSoftware Engineer\n6 years experience\n"
        "Skills: Python, Django, AWS\n"
        "Summary: Build scalable web frameworks and deploy microservices on AWS cloud."
    ]

    payload = {
        "job_description": job_desc,
        "candidates": candidates
    }

    # Execute rankings API run
    response = client.post("/api/v1/rankings/run", json=payload)
    assert response.status_code == 200, f"API failed with output: {response.text}"

    shortlist = response.json()
    assert len(shortlist) == 1

    candidate_item = shortlist[0]

    # 1. Validate Scoring Metrics
    assert "score" in candidate_item
    assert "confidence" in candidate_item
    assert 0.0 <= candidate_item["confidence"] <= 100.0, "Confidence must be within [0, 100]"
    
    # 2. Validate Skill Gap and Transferable matches
    assert "FastAPI" in candidate_item["missing_skills"]
    assert "GCP" in candidate_item["missing_skills"]
    
    transferable_skills = candidate_item["transferable_skills"]
    # Check that AWS maps to GCP and Django maps to FastAPI transferability descriptions
    django_transferable = any("Django" in t and "FastAPI" in t for t in transferable_skills)
    aws_transferable = any("AWS" in t and "GCP" in t for t in transferable_skills)
    
    assert django_transferable, f"Expected Django to be marked transferable for FastAPI: {transferable_skills}"
    assert aws_transferable, f"Expected AWS to be marked transferable for GCP: {transferable_skills}"

    # 3. Validate Explanation structures
    explanation = candidate_item["explanation"]
    assert "strengths" in explanation
    assert "weaknesses" in explanation
    assert "explanation" in explanation
    
    assert len(explanation["strengths"]) > 0
    assert len(explanation["weaknesses"]) > 0
    assert len(explanation["explanation"]) > 0
