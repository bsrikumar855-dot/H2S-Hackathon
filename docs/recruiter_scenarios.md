# Recruiter Assessment Scenarios - AI Demo Dataset

This document details realistic recruiter screening scenarios designed to test and demonstrate the evaluation quality of the AI-powered Candidate Suitability Ranking Engine. 

The dataset is generated at `demo_jobs.json` and `demo_candidates.json`, and copied to the frontend's public folder at `frontend/public/`. It contains **10 AI/ML Job Descriptions** and **50 Candidate Profiles** with diverse attributes.

---

## Scenario 1: Sourcing for Core Stack Alignment
*   **Job Description:** Job #1 - **Senior AI Platform Engineer**
    *   *Prerequisites:* Python, FastAPI, PostgreSQL, pgvector, LangGraph, Docker, Kubernetes.
*   **Candidate Test Group:**
    *   *Sophia Chen* (Strong Match): Has 5+ years exp, exact match for React/FastAPI/pgvector/LangGraph, and very high GitHub activity (22 commits).
    *   *Elena Rostova* (Medium Match): Seasoned Java/Spring Boot enterprise dev (6 years exp). Strong system concepts but lacks Python/LangGraph/vector experience.
    *   *Devon Miller* (Weak Match): Ruby on Rails developer (3 years exp) with low alignment to modern AI platforms and low outreach intent.
*   **Expected AI Evaluation:**
    *   **Sophia Chen** should rank **#1** (Score: ~90-95%) due to exact stack overlap, LangGraph orchestrations experience, and a positive behavior bonus.
    *   **Elena Rostova** should rank **#2** (Score: ~65-75%). The engine identifies her as a mature engineer, but calls out a significant skill gap in modern frontend/Python stacks.
    *   **Devon Miller** should rank **#3** (Score: ~30-45%) with substantial technical gaps and low engagement metrics.

---

## Scenario 2: Sifting the Research Talent Pool
*   **Job Description:** Job #2 - **NLP Research Scientist**
    *   *Prerequisites:* PyTorch, HuggingFace, Transformers, PhD/MS, SentencePiece.
*   **Candidate Test Group:**
    *   *Dr. Aris Thorne* (Strong Match): PhD in NLP from CMU, BERT/Transformers expertise, and high active seeker intent.
    *   *Alice Wonderland* (Fresh Graduate): BS in AI from CMU, high GPA, PyTorch fine-tuning academic projects, but zero industrial experience.
    *   *Yuki Tanaka* (Mismatched Domain): Vision specialist. Strong DL credentials but focus is on YOLOv8/C++/OpenCV rather than NLP.
*   **Expected AI Evaluation:**
    *   **Dr. Aris Thorne** is positioned as **#1** (Score: ~90%+). He meets the advanced degree requirement and has deep model training background.
    *   **Alice Wonderland** is flagged as a high-potential **Junior Match** (Score: ~70-75%). She has zero industry experience (affecting experience alignment), but her core NLP skills and high behavioral activity (12 applications) elevate her potential.
    *   **Yuki Tanaka** ranks lower (Score: ~50-60%) due to domain mismatch (Computer Vision vs. NLP), though her PyTorch fundamentals are recognized as transferable.

---

## Scenario 3: Evaluating Career Changers (Math to AI)
*   **Job Description:** Job #6 - **Junior Data Scientist**
    *   *Prerequisites:* Python, Pandas, Scikit-Learn, SQL, Jupyter.
*   **Candidate Test Group:**
    *   *Dr. Katherine Johnson* (Career Changer): Deep mathematical background, calculus, space computations, but transitioning to Python/data analysis.
    *   *Alice Wonderland* (Fresh Graduate): Strong stats, Pandas, SQL classwork.
    *   *Robert Oppenheimer* (Career Changer): Quantitative physics researcher, NumPy, Fortran.
*   **Expected AI Evaluation:**
    *   The engine evaluates **Alice Wonderland** highly (Score: ~80-85%) due to direct skill alignment (Pandas, SQL, Scikit-Learn) and high job-seeker activity.
    *   The engine ranks **Dr. Katherine Johnson** and **Robert Oppenheimer** as **Moderate Fits** (Score: ~60-70%). Although they lack industry Python Data Science experience, their transferable calculus, matrix algebra, and NumPy skills are highlighted as high-potential math baselines, prompting the AI to advise the recruiter to explore them for analytical roles.

---

## Scenario 4: The Impact of Behavioral Signals
*   **Job Description:** General screening for roles requiring rapid hiring.
*   **Candidate Test Group:** Two candidates with nearly identical technical resumes:
    *   *Linus Torvalds* (High Activity): 10 years experience, 50 GitHub commits, active daily logins (15).
    *   *Dr. Ken Thompson* (Low Activity): 9 years experience, 20 commits, but very low recent activity (4 logins) and passive seeker intent.
*   **Expected AI Evaluation:**
    *   When behavioral metrics weight shifts are active (which impacts 20% of the overall score), **Linus Torvalds** gains a substantial suitability boost. The recruiter Copilot highlights Linus as a **high-priority outreach target** due to a 99% responsiveness likelihood, while Ken Thompson is flagged as a passive candidate to keep in the pipeline.
