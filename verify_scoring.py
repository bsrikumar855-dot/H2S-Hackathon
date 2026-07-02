import requests
import json

url = "http://localhost:8000/api/v1/rankings/run"

payload = {
    "job_description": "We are looking for a Senior Python Engineer with 5+ years of experience. Must be an expert in Python, FastAPI, Docker, and Kubernetes. Building cloud-native applications.",
    "candidates": [
        "Jane Doe. Senior Backend Engineer with 8 years of experience. Expert in Python, FastAPI, Docker, Kubernetes, AWS. Projects: Built highly scalable microservices. Education: BS Computer Science, MS Computer Science. Certifications: AWS Certified Solutions Architect. Led a team of 5 engineers.",
        "John Smith. Backend Developer with 4 years of experience. Strong in Python, Django, Docker, SQL. Education: BS in Computer Engineering. Projects: Developed REST APIs for an e-commerce platform.",
        "Alice Johnson. Data Scientist. 2 years of experience. Knows Python, Pandas, Scikit-learn, SQL. Education: MS Data Science. Projects: Built a predictive model for customer churn. No backend experience.",
        "Bob Brown. Recent graduate. 0 years experience. Knows Java, C++, Python. Education: BS Computer Science. Projects: Built a simple calculator."
    ]
}

response = requests.post(url, json=payload)

if response.status_code != 200:
    print(f"Error: {response.status_code}")
    print(response.text)
    exit(1)

data = response.json()

print("=========================================================")
print("VALIDATION OUTPUT")
print("=========================================================")

for item in data:
    cand_name = item["candidate"]["candidate_name"]
    print(f"\n{cand_name} Resume")
    print(f"Semantic Similarity: {item['semantic_score']}")
    print(f"Skill Match: {item['skill_score']}")
    print(f"Experience: {item['experience_score']}")
    print(f"Education: {item['education_score']}")
    print(f"Projects: {item['project_score']}")
    print(f"Behavior: {item['behavior_score']}")
    print(f"Confidence: {item['confidence']}")
    print(f"Overall Score: {item['score']}")
    print(f"Recommendation:\n{item['recommendation']}")
    print("---------------------------------------------------------")
