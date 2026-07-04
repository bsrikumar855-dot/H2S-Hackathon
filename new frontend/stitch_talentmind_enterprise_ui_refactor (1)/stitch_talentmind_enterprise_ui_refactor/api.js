/**
 * TalentMind AI - Shared API Configuration & Helpers
 * Centralizes backend connectivity for all frontend pages.
 */

const API_BASE_URL = 'http://localhost:8000';
const API_V1 = `${API_BASE_URL}/api/v1`;

const TalentMindAPI = {
    baseUrl: API_BASE_URL,
    v1: API_V1,

    /**
     * Health check - GET /health
     */
    async checkHealth() {
        const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(5000) });
        if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
        return res.json();
    },

    /**
     * Create a job - POST /api/v1/jobs
     */
    async createJob(title, rawDescription) {
        const res = await fetch(`${API_V1}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, raw_description: rawDescription })
        });
        if (!res.ok) throw new Error(`Create job failed: ${res.status}`);
        return res.json();
    },

    /**
     * Upload candidate resume - POST /api/v1/candidates
     */
    async uploadCandidate(file, githubUrl = null, linkedinUrl = null) {
        const formData = new FormData();
        formData.append('file', file);
        if (githubUrl) formData.append('github_url', githubUrl);
        if (linkedinUrl) formData.append('linkedin_url', linkedinUrl);

        const res = await fetch(`${API_V1}/candidates`, {
            method: 'POST',
            body: formData
        });
        if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
        return res.json();
    },

    /**
     * Rank candidates for a job - POST /api/v1/jobs/{jobId}/rank
     */
    async rankCandidates(jobId, candidateIds) {
        const res = await fetch(`${API_V1}/jobs/${jobId}/rank`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ candidate_ids: candidateIds })
        });
        if (!res.ok) throw new Error(`Ranking failed: ${res.status}`);
        return res.json();
    },

    /**
     * Run end-to-end ranking pipeline - POST /api/v1/rankings/run
     */
    async runPipeline(jobDescription, candidates, behavioralSignals = {}) {
        const res = await fetch(`${API_V1}/rankings/run`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                job_description: jobDescription,
                candidates: candidates,
                behavioral_signals: behavioralSignals
            })
        });
        if (!res.ok) throw new Error(`Pipeline failed: ${res.status}`);
        return res.json();
    },

    /**
     * Compile LaTeX to PDF - POST /api/v1/reports/compile-pdf
     */
    async compileReportPDF(jobTitle, candidates) {
        const res = await fetch(`${API_V1}/reports/compile-pdf`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                job_title: jobTitle,
                candidates: candidates.map(c => ({
                    name: c.name,
                    title: c.title,
                    experience: c.experience,
                    score: c.score
                }))
            })
        });
        return res;
    }
};

// Page navigation routes (relative paths for Vite static serving)
const PAGES = {
    home: '/home_talentmind_ai/code.html',
    upload: '/upload_resumes_talentmind_ai/code.html',
    jobAnalysis: '/job_analysis_talentmind_ai/code.html',
    aiProcessing: '/ai_processing_talentmind_ai/code.html',
    results: '/results_dashboard_talentmind_ai/code.html',
    candidateDetail: '/candidate_detail_talentmind_ai/code.html',
    executiveReport: '/executive_report_talentmind_ai/code.html',
    systemOffline: '/system_offline_talentmind_ai/code.html'
};

const DEMO_CANDIDATES = [
    {
        id: "marcus-holloway",
        name: "Marcus Holloway",
        title: "Principal Backend Engineer",
        experience: "10+ Years Experience",
        score: 94.2,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBisNLDAm5hFmZ4IUgTGTLATf1Io3cAB-6RCxD7Q6cLQdivwIpR3YZHq1VhHzVrNqzsJVk6PxBTq6Er1KREFzH_dNuUVs3pmKWzL0XrZsWa7qDiQOl9nKRtEaktv9sNERKyaIhcrOD1GwzuyotjZvfz3PeTVrwbWmrUdsdgUT3toH4p6FO044gAmqypVTZ6IQqHqgw-M4F9ZLG5XtPVFqj2V9ac0lqGCUxVYLG54paxIW2m_BiSn8hqzWEMfdFzpWF2YNjBgboYZO3B",
        location: "London, UK",
        salary: "£140k - £160k",
        availability: "Immediate",
        summary: "Staff Software Engineer with deep expertise in distributed systems, asynchronous event-driven pipelines, and high-performance databases. Marcus has designed orchestration graphs processing over 100k requests/sec.",
        skills: ["Kubernetes", "Go", "Distributed Systems", "PostgreSQL", "FastAPI", "Docker"],
        competencies: {
            "API Design": 96,
            "System Architecture": 98,
            "Database Optimization": 94,
            "Team Mentorship": 88
        },
        strengths: [
            "Architected distributed pub/sub pipeline reducing processing latency by 42%.",
            "Strong competency in database partitioning and indexing optimizations.",
            "Demonstrated leadership, mentoring a team of 8 backend engineers."
        ],
        risks: [
            "Limited frontend experience; focused primarily on high-throughput backend services."
        ],
        questions: [
            "Describe a scenario where you resolved a database deadlock under heavy traffic.",
            "How do you approach API versioning for microservices with distinct deployment cadences?"
        ],
        history: [
            { role: "Principal Backend Engineer", company: "Nexa Systems", duration: "2021 — Present", desc: "Designed high-throughput distributed systems using Go, Kubernetes, and Kafka. Led microservices migration." },
            { role: "Senior Backend Developer", company: "TechScale Solutions", duration: "2018 — 2021", desc: "Built scalable REST and gRPC APIs. Optimized PostgreSQL database schemas and queries." }
        ]
    },
    {
        id: "elena-rodriguez",
        name: "Elena Rodriguez",
        title: "Senior Cloud Architect",
        experience: "8+ Years Experience",
        score: 89.5,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR09MKYyRIOZh4rVhwDOGcenxPekVDsNhmD9f6yAxUFg0ogsCuqCLuW0s981HkltIPsTTDNpQUv-PBD9MTgD337F2hOexI4RC91Bq4ZlgBXV9ovXoJrNAnC6O76lzxhWcgpuPzs3WnAm6x9iKm5-io-0BZFIBGbcdREg-a-kAP0tyGaDE3-7_kzzR1aYt40iYW63gtKHUkcOX4eDIU8x6aHh4QKFn4tUDQbJIkbLtV9ecJHiE9yyguLsVmN1Oj47_M5m-bTZ2HLJi4",
        location: "Madrid, Spain",
        salary: "€95k - €110k",
        availability: "4 Weeks",
        summary: "Cloud infrastructure expert specializing in automated provisioning, infrastructure-as-code, and cloud migrations. Elena holds active AWS Solutions Architect Professional certifications.",
        skills: ["AWS", "Terraform", "Python", "Docker", "CI/CD", "Security"],
        competencies: {
            "Infrastructure as Code": 95,
            "Cloud Security": 90,
            "CI/CD Pipeline Design": 88,
            "Cost Optimization": 85
        },
        strengths: [
            "Reduced AWS infrastructure costs by 35% through resource consolidation.",
            "Designed multi-region failover cluster with zero-data-loss RPO.",
            "Built standard secure Terraform templates used company-wide."
        ],
        risks: [
            "Less experience with on-premises configurations; cloud-native focus."
        ],
        questions: [
            "How do you manage secrets security within your Terraform pipelines?",
            "Explain your strategy for migrating a legacy monolithic database to AWS RDS."
        ],
        history: [
            { role: "Senior Cloud Architect", company: "GlobalOne Industries", duration: "2020 — Present", desc: "Spearheaded cloud architecture design and AWS migration. Automated provisioning via Terraform and Ansible." },
            { role: "DevOps Engineer", company: "CloudFlow Systems", duration: "2017 — 2020", desc: "Built and maintained CI/CD pipelines. Managed Kubernetes clusters and monitored uptime metrics." }
        ]
    },
    {
        id: "jordan-smith",
        name: "Jordan Smith",
        title: "Staff Engineer",
        experience: "9+ Years Experience",
        score: 88.2,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqNNU7g62qX5NgpiX2oS5MmGyGDjA0FtiCkupinwuZHm5RCot86sSczwApDoRTVRvKAmPbguWCGRlAlOw26x1K0jPMH-IArlF274cR9EsdF0pJJY3xehOsvTt625uic8MFzZF8u4b7brddVLlG2_99o7BJHqsneH2-VNiwBGOdNA_hb8gzI6oDqrEGOL9daU_fK_2ZRExNiV3SzNcA0A0aB8M0PnuPMOzhsaoqX4FThCGh8eK01x_9rjU8ANIlzmjXzQi9SGopKDt9",
        location: "New York, USA",
        salary: "$190k - $210k",
        availability: "2 Weeks",
        summary: "Versatile engineer with strong capabilities across the entire software stack. Jordan excels in modern JavaScript/TypeScript architectures and distributed web services.",
        skills: ["React", "Node.js", "Redis", "TypeScript", "Python", "GraphQL"],
        competencies: {
            "System Integration": 92,
            "Performance Tuning": 88,
            "Frontend Systems": 90,
            "Caching Strategy": 86
        },
        strengths: [
            "Improved page load performance by 50% via SSR and Redis caching.",
            "Led development of real-time collaboration canvas with WebSockets.",
            "Strong fullstack alignment with both backend services and React frontends."
        ],
        risks: [
            "Strong focus on web environments; less systems/kernel programming experience."
        ],
        questions: [
            "When should you choose WebSockets over Server-Sent Events (SSE)?",
            "Detail how you handle state synchronization across multiple client nodes."
        ],
        history: [
            { role: "Staff Engineer", company: "InnovateHQ", duration: "2019 — Present", desc: "Designed fullstack architectures using React, Node.js, and Redis. Optimized front-to-back latency." },
            { role: "Senior Developer", company: "WebFlow Inc", duration: "2016 — 2019", desc: "Built interactive web applications. Designed GraphQL schemas and automated testing suites." }
        ]
    }
];

/**
 * Get the list of ranked candidates (reads from localStorage or falls back to defaults)
 */
function getRankedCandidates() {
    const data = localStorage.getItem('tm_ranked_candidates');
    if (data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error('[TalentMind] Error parsing candidates from localStorage:', e);
        }
    }
    // Initialize defaults if not present
    localStorage.setItem('tm_ranked_candidates', JSON.stringify(DEMO_CANDIDATES));
    return DEMO_CANDIDATES;
}

/**
 * Save candidate ID to local storage then navigate
 */
function viewCandidateProfile(id) {
    localStorage.setItem('tm_selected_candidate_id', id);
    navigateTo('candidateDetail');
}

/**
 * Get selected candidate detailed profile
 */
function getSelectedCandidate() {
    const candidates = getRankedCandidates();
    const id = localStorage.getItem('tm_selected_candidate_id') || 'marcus-holloway';
    return candidates.find(c => c.id === id) || candidates[0];
}

/**
 * Navigate to a page
 */
function navigateTo(page) {
    if (PAGES[page]) {
        window.location.href = PAGES[page];
    }
}

/**
 * Show a toast notification
 */
function showToast(message, type = 'info') {
    const colors = {
        info: 'bg-inverse-surface text-inverse-on-surface',
        success: 'bg-tertiary-container text-on-tertiary-container',
        error: 'bg-error-container text-on-error-container',
        warning: 'bg-secondary-container text-on-secondary-container'
    };
    const icons = {
        info: 'info',
        success: 'check_circle',
        error: 'error',
        warning: 'warning'
    };

    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 right-6 ${colors[type]} px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-[9999] transition-all duration-300 transform translate-y-4 opacity-0`;
    toast.innerHTML = `
        <span class="material-symbols-outlined">${icons[type]}</span>
        <span class="font-label-md">${message}</span>
    `;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateY(4px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
