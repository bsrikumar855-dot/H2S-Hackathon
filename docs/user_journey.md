# user_journey.md

This document maps the user journey for a recruiter using the AI Recruiter Candidate Ranking Engine.

---

## 1. Persona Profile: The Technical Recruiter

* **Name:** Sarah
* **Role:** Senior Tech Recruiter
* **Primary Objective:** Identify a relevant, high-fidelity shortlist of 5 candidates from a pool of 50-100 resumes for a Senior Backend role in under 15 minutes.
* **Core Pain Point:** Sorting through candidates who use the right keywords but lack the depth or scale experience required, and defending selection decisions to strict hiring managers.

---

## 2. Journey Phase Mapping

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  1. Landing  ├───►│  2. Ingest   ├───►│ 3. Processing├───►│  4. Analyze  ├───►│ 5. Deep Dive │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

| Phase | User Goal | Actions Taken | System Touchpoints | User Emotion / State |
| :--- | :--- | :--- | :--- | :--- |
| **1. Landing & Intro** | Understand capabilities and start immediately. | <ul><li>Reads value proposition.</li><li>Clicks Main CTA.</li></ul> | Landing Page hero section and "Start Ranking Candidates" button. | **Curious:** Open to a better way than boolean search strings. |
| **2. Job Definition** | Input role requirements with context. | <ul><li>Pastes raw JD text.</li><li>Optionally uploads JD doc file.</li><li>Clicks "Analyze JD".</li></ul> | Text area, file drag-and-drop, and validation checks. | **Focused:** Hopes the parser extracts the right seniority and scale requirements. |
| **3. Pool Ingestion** | Upload candidate pool without formatting friction. | <ul><li>Uploads multiple PDF/Docx resumes.</li><li>Monitors candidate count and parser confirmations.</li></ul> | Multi-file uploader, validation checklist, and count badge. | **Anxious:** Wants validation that all files are parsed successfully. |
| **4. AI Orchestration** | Trust the AI logic during computation. | <ul><li>Watches the multi-agent pipeline progress.</li><li>Monitors active agent nodes.</li></ul> | Live visual workflow state loader (stepper showing active agent node). | **Intrigued:** Seeing the pipeline work builds trust and transparency. |
| **5. Shortlist Analysis** | Fast, reliable top candidates review. | <ul><li>Scans the ranking table list.</li><li>Compares scores, confidence levels, and behavior.</li></ul> | Ranked candidates table with sorting and filtering options. | **Relieved:** The list matches expectations; scores and ranks are clear. |
| **6. Profile Deep-Dive** | Understand candidate details and gaps. | <ul><li>Clicks candidate to open drawer.</li><li>Inspects strengths, weaknesses, and transferable skills.</li></ul> | Slide-out drawer with tabs for Skills, Projects, and Explanations. | **Confident:** Equipped with reasons and targeted interview questions. |
| **7. Metric Auditing** | Verify search health. | <ul><li>Switches to Analytics tab.</li><li>Audits skill coverage and candidate distributions.</li></ul> | Distribution charts and skill heatmaps. | **Satisfied:** Ready to share the clean shortlist and insights. |
