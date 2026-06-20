import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_behavioral_intelligence_pipeline():
    """
    Validates behavioral intelligence evaluation:
    1. Proves behavior scores calculate correctly.
    2. Proves that behavioral activity breaks ties and shifts rankings for identical profiles.
    3. Proves explainability outputs capture high job-seeking intent justifications.
    """
    job_desc = (
        "We are looking for a Senior Developer with 5 years experience. "
        "Required skills: Python, FastAPI. "
        "Key duties: Design API endpoints."
    )

    # Two identical candidate profiles (same skills, tenure, education)
    candidates = [
        "Jane Doe\nSoftware Engineer\n5 years experience\n"
        "Skills: Python, FastAPI\n"
        "Summary: Build scalable web frameworks.",

        "Alex Rivera\nSoftware Engineer\n5 years experience\n"
        "Skills: Python, FastAPI\n"
        "Summary: Build scalable web frameworks."
    ]

    # Alex Rivera has high activity; Jane Doe has none
    behavioral_signals = {
        "Alex Rivera": {
            "profile_updates_last_30_days": 3,
            "login_frequency": 20,
            "response_rate": 1.0,
            "application_count": 8,
            "certification_activity": 2,
            "github_activity": 12
        },
        "Jane Doe": {
            "profile_updates_last_30_days": 0,
            "login_frequency": 0,
            "response_rate": 0.0,
            "application_count": 0,
            "certification_activity": 0,
            "github_activity": 0
        }
    }

    payload = {
        "job_description": job_desc,
        "candidates": candidates,
        "behavioral_signals": behavioral_signals
    }

    # Execute end-to-end endpoint run
    response = client.post("/api/v1/rankings/run", json=payload)
    assert response.status_code == 200, f"API failed with output: {response.text}"

    shortlist = response.json()
    assert len(shortlist) == 2

    # 1. Proves ranking impact: Alex Rivera must be ranked #1 due to the 20% behavior weighting
    assert shortlist[0]["rank"] == 1
    assert "Alex Rivera" in shortlist[0]["candidate"]["candidate_name"]
    assert shortlist[1]["rank"] == 2
    assert "Jane Doe" in shortlist[1]["candidate"]["candidate_name"]

    # Assert score divergence due to behavior
    alex_score = shortlist[0]["score"]
    jane_score = shortlist[1]["score"]
    assert alex_score > jane_score, f"Expected Alex ({alex_score}) to outscore Jane ({jane_score})"

    # 2. Proves behavior scoring calculations
    assert shortlist[0]["behavior_score"] is not None
    assert shortlist[0]["behavior_score"] > 50.0

    # 3. Proves explainability updates
    alex_explanation = shortlist[0]["explanation"]
    assert any("intent" in strength.lower() for strength in alex_explanation["strengths"]), "Strengths should call out intent"
    assert "indicating high job-seeking intent" in alex_explanation["explanation"]
