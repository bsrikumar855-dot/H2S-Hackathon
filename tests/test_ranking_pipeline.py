import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_end_to_end_ranking_pipeline():
    """
    Verifies that the entire pipeline:
    Job Description -> Candidate Parsing -> Embeddings -> Cosine Similarity -> v1 Weighted Ranking
    works correctly and scores/ranks candidates logically.
    """
    # 1. Define a raw job description requiring FastAPI/Docker and 5+ years of experience
    job_desc = (
        "We are looking for a Senior Python Developer with 5+ years of experience. "
        "Required skills: Python, FastAPI, Docker. "
        "The ideal candidate will design, build, and maintain scalable API microservices."
    )

    # 2. Define 3 candidates representing diverse matching profiles
    candidates = [
        # Candidate A: Perfect match (experience and skills align)
        "Jane Doe\nSenior Backend Engineer\n6 years of experience\n"
        "Skills: Python, FastAPI, Docker, Kubernetes\n"
        "Summary: Experienced developer focused on building scalable FastAPI microservices with Docker containers.",

        # Candidate B: Moderate match (3 years, lacks FastAPI/Docker but has Python/Django)
        "John Smith\nSoftware Developer\n3 years of experience\n"
        "Skills: Python, Django, PostgreSQL\n"
        "Summary: Software developer experienced in building Python Django web applications and relational databases.",

        # Candidate C: Weak match (1 year, frontend focus, no Python)
        "Bob Johnson\nFrontend Developer\n1 year of experience\n"
        "Skills: React, HTML, CSS, JavaScript\n"
        "Summary: Junior frontend developer building interactive web interfaces using React."
    ]

    payload = {
        "job_description": job_desc,
        "candidates": candidates
    }

    # 3. Call the API rankings run endpoint
    response = client.post("/api/v1/rankings/run", json=payload)
    assert response.status_code == 200, f"API failed with output: {response.text}"

    shortlist = response.json()
    assert len(shortlist) == 3, f"Expected 3 candidates, got {len(shortlist)}"

    # 4. Assert that Jane Doe is ranked #1 (Perfect Fit)
    first = shortlist[0]
    assert first["rank"] == 1
    assert "Jane Doe" in first["candidate"]["candidate_name"]
    
    # 5. Assert that Bob Johnson is ranked #3 (Weak Fit)
    last = shortlist[2]
    assert last["rank"] == 3
    assert "Bob Johnson" in last["candidate"]["candidate_name"]

    # 6. Assert scores are descending logically
    score_1 = first["score"]
    score_2 = shortlist[1]["score"]
    score_3 = last["score"]

    print(f"\n[Test Output] Scores: Jane={score_1}, John={score_2}, Bob={score_3}")
    assert score_1 > score_2, "Jane (perfect match) must outscore John (moderate match)"
    assert score_2 > score_3, "John (moderate match) must outscore Bob (weak match)"
