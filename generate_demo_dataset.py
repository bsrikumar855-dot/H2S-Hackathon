import json
import uuid

# 10 AI/ML Job Descriptions
jobs = [
    {
        "id": "job-1",
        "title": "Senior AI Platform Engineer",
        "description": (
            "Role: Senior AI Platform Engineer\n"
            "Core Stack: Python, FastAPI, PostgreSQL, pgvector, LangGraph, Docker, Kubernetes\n"
            "Experience Required: 5+ years\n\n"
            "Responsibilities:\n"
            "- Build and maintain core multi-agent recruitment backend pipelines and service platforms.\n"
            "- Optimize pgvector similarity search metrics and semantic search queries.\n"
            "- Orchestrate agent workflows using LangGraph and integrate LLM models (Gemini/OpenAI).\n\n"
            "Prerequisites:\n"
            "- Strong experience in software architectures and microservices.\n"
            "- Hands-on vector database experience and prompt engineering."
        )
    },
    {
        "id": "job-2",
        "title": "NLP Research Scientist",
        "description": (
            "Role: NLP Research Scientist\n"
            "Core Stack: PyTorch, HuggingFace, Transformers, Python, SentencePiece, AWS\n"
            "Experience Required: 3+ years\n\n"
            "Responsibilities:\n"
            "- Train and fine-tune large language models and representation embeddings.\n"
            "- Research tokenizer adaptations and prefix-tuning modifications.\n"
            "- Deploy NLP model gateways on cloud environments.\n\n"
            "Prerequisites:\n"
            "- M.S. or Ph.D. in Computer Science, Linguistics, or related mathematics field.\n"
            "- Strong track record of deep learning research publications."
        )
    },
    {
        "id": "job-3",
        "title": "Computer Vision Engineer",
        "description": (
            "Role: Computer Vision Engineer\n"
            "Core Stack: C++, Python, OpenCV, TensorFlow, CUDA, YOLOv8, PyTorch\n"
            "Experience Required: 4+ years\n\n"
            "Responsibilities:\n"
            "- Build edge detection, object segmentation, and tracking algorithms for real-time cameras.\n"
            "- Optimize inference speeds using CUDA bindings and TensorRT compilation.\n"
            "- Manage visual datasets pipelines.\n\n"
            "Prerequisites:\n"
            "- 4+ years developing low-latency vision algorithms.\n"
            "- Experience in C++ optimizations and deep learning models."
        )
    },
    {
        "id": "job-4",
        "title": "MLOps Architect",
        "description": (
            "Role: MLOps Architect\n"
            "Core Stack: Python, MLflow, Kubernetes, KubeFlow, Triton Server, AWS, Terraform\n"
            "Experience Required: 5+ years\n\n"
            "Responsibilities:\n"
            "- Design candidate feature stores and automate model CI/CD pipelines.\n"
            "- Oversee model serving layers using Triton Inference Server on Kubernetes cluster hubs.\n"
            "- Standardize monitoring systems for model drift and input feature anomaly detection.\n\n"
            "Prerequisites:\n"
            "- Experience with infrastructure-as-code (Terraform) and Kubernetes deployments.\n"
            "- Strong Python skills and familiarity with machine learning workflows."
        )
    },
    {
        "id": "job-5",
        "title": "LLM Application Developer",
        "description": (
            "Role: LLM Application Developer\n"
            "Core Stack: TypeScript, React, Node.js, Python, LangChain, Pinecone, LlamaIndex\n"
            "Experience Required: 2+ years\n\n"
            "Responsibilities:\n"
            "- Build responsive web wrappers and AI agent copilot UI layouts.\n"
            "- Connect Pinecone similarity vectors index contexts to prompt payloads.\n"
            "- Design chain-of-thought system prompts for conversational assistants.\n\n"
            "Prerequisites:\n"
            "- 2+ years building JavaScript/TypeScript frontend systems.\n"
            "- Familiarity with LangChain/LlamaIndex and prompt patterns."
        )
    },
    {
        "id": "job-6",
        "title": "Junior Data Scientist",
        "description": (
            "Role: Junior Data Scientist\n"
            "Core Stack: Python, Pandas, Scikit-Learn, SQL, Jupyter, Tableau\n"
            "Experience Required: 1+ years\n\n"
            "Responsibilities:\n"
            "- Clean candidate features datasets, handle null parameters, and extract statistical metrics.\n"
            "- Formulate basic regression and clustering classifiers to identify candidate categories.\n"
            "- Construct dashboard reports outlining candidate behavior profiles.\n\n"
            "Prerequisites:\n"
            "- Degree in Data Science, Statistics, or Math.\n"
            "- Solid Python Pandas and SQL query skills."
        )
    },
    {
        "id": "job-7",
        "title": "Embedded AI Engineer (TinyML)",
        "description": (
            "Role: Embedded AI Engineer\n"
            "Core Stack: C, C++, ARM Cortex, TensorFlow Lite, Keil, STM32\n"
            "Experience Required: 4+ years\n\n"
            "Responsibilities:\n"
            "- Port compressed neural network weights to low-power microcontrollers.\n"
            "- Implement post-training 8-bit integer quantization.\n"
            "- Conduct hardware-in-the-loop latency tests on ARM microcontrollers.\n\n"
            "Prerequisites:\n"
            "- 4+ years in firmware development or low-level C programming.\n"
            "- Knowledge of TFLite Micro or model compression techniques."
        )
    },
    {
        "id": "job-8",
        "title": "AI Product Manager",
        "description": (
            "Role: AI Product Manager\n"
            "Core Focus: Agile, Roadmap planning, LLM evaluations, Recruiter UX, Analytics\n"
            "Experience Required: 4+ years\n\n"
            "Responsibilities:\n"
            "- Lead system design definitions for automated AI resume sourcing tools.\n"
            "- Benchmark accuracy metrics across GPT and Gemini model outputs.\n"
            "- Collaborate with engineering teams to define data schema variables and analytics tabs.\n\n"
            "Prerequisites:\n"
            "- 4+ years in product management.\n"
            "- Basic understanding of AI models, APIs, and recruiter user journeys."
        )
    },
    {
        "id": "job-9",
        "title": "Deep Learning Solutions Architect",
        "description": (
            "Role: Deep Learning Solutions Architect\n"
            "Core Stack: PyTorch, AWS SageMaker, GCP Vertex AI, Docker, Python, ONNX\n"
            "Experience Required: 6+ years\n\n"
            "Responsibilities:\n"
            "- Advise enterprise clients on transitioning legacy backend servers to deep learning cloud pipelines.\n"
            "- Create standard deployment templates for SageMaker training jobs.\n"
            "- Set up low-latency model inference pipelines with ONNX bindings.\n\n"
            "Prerequisites:\n"
            "- 6+ years building enterprise architectures.\n"
            "- Strong technical skills in PyTorch, Docker, and Cloud platforms (AWS/GCP)."
        )
    },
    {
        "id": "job-10",
        "title": "Reinforcement Learning Engineer",
        "description": (
            "Role: Reinforcement Learning Engineer\n"
            "Core Stack: Python, PyTorch, Ray/RLlib, OpenAI Gym, Mujoco, C++\n"
            "Experience Required: 3+ years\n\n"
            "Responsibilities:\n"
            "- Design reward shaping algorithms and policy training graphs for control tasks.\n"
            "- Scale parallel environments training pipelines using Ray cluster hubs.\n"
            "- Integrate physics constraints into simulator environments.\n\n"
            "Prerequisites:\n"
            "- Deep knowledge of RL algorithms (PPO, SAC, DDPG).\n"
            "- Strong math foundations in Markov Decision Processes and calculus."
        )
    }
]

# Helper to generate candidates programmatic metadata
candidates = []

# List of 50 candidates
candidate_profiles_raw = [
    # --- STRONG MATCHES FOR JOB 1 (Senior AI Platform Engineer) ---
    {
        "name": "Sophia Chen",
        "experience": 6.5,
        "skills": ["Python", "FastAPI", "PostgreSQL", "pgvector", "LangGraph", "Docker", "Kubernetes", "TypeScript"],
        "education": "M.S. in Computer Science - Stanford University",
        "domain": "AI Platform Engineering",
        "behavior": {"updates": 3, "logins": 14, "rate": 0.95, "apps": 5, "certs": 1, "github": 22},
        "projects": ["Vector Hub: Built search gateway using pgvector.", "Agent Flow: Built LangGraph routing workflow."]
    },
    {
        "name": "Marcus Vance",
        "experience": 5.0,
        "skills": ["Python", "FastAPI", "PostgreSQL", "pgvector", "LangGraph", "Docker", "AWS", "LangChain"],
        "education": "B.S. in Software Engineering - UT Austin",
        "domain": "AI Systems Development",
        "behavior": {"updates": 2, "logins": 11, "rate": 0.90, "apps": 4, "certs": 2, "github": 18},
        "projects": ["Doc Classifier: Extracted structured candidate schemas.", "Graph Orchestrator: Built microservices pipelines."]
    },
    {
        "name": "Vikram Malhotra",
        "experience": 7.0,
        "skills": ["Python", "FastAPI", "Kubernetes", "Docker", "pgvector", "PostgreSQL", "Redis", "LangChain", "GCP"],
        "education": "B. Tech in CS - IIT Bombay",
        "domain": "Platform Infrastructures",
        "behavior": {"updates": 4, "logins": 15, "rate": 0.98, "apps": 6, "certs": 0, "github": 30},
        "projects": ["Search Scale: Handled 10M vector queries.", "Infra Deployment: Setup Kubernetes serving networks."]
    },
    {
        "name": "Clara Dupont",
        "experience": 5.5,
        "skills": ["Python", "FastAPI", "LangGraph", "pgvector", "Docker", "SQLAlchemy", "TypeScript", "React"],
        "education": "M.S. in Software Systems - Sorbonne",
        "domain": "Fullstack AI Integrations",
        "behavior": {"updates": 1, "logins": 9, "rate": 0.85, "apps": 3, "certs": 1, "github": 14},
        "projects": ["Client UI Portal: Interactive recruiter dashboard.", "AI Workflow: LangGraph agent orchestrations."]
    },

    # --- STRONG MATCHES FOR OTHER ROLES ---
    {
        "name": "Dr. Aris Thorne",
        "experience": 8.0,
        "skills": ["Python", "PyTorch", "HuggingFace", "Transformers", "BERT", "AWS", "C++", "CUDA"],
        "education": "Ph.D. in NLP - Carnegie Mellon University",
        "domain": "NLP Research",
        "behavior": {"updates": 1, "logins": 12, "rate": 0.92, "apps": 2, "certs": 0, "github": 25},
        "projects": ["Custom Transformer: Pretrained a 7B parameter domain model.", "Inference Acceleration: Compiling tokenizers in CUDA."]
    },
    {
        "name": "Yuki Tanaka",
        "experience": 5.0,
        "skills": ["C++", "Python", "OpenCV", "CUDA", "TensorRT", "YOLOv8", "PyTorch", "Docker"],
        "education": "M.S. in Robotics - Tokyo University",
        "domain": "Computer Vision",
        "behavior": {"updates": 2, "logins": 10, "rate": 0.88, "apps": 3, "certs": 1, "github": 19},
        "projects": ["Obstacle Detection: Real-time YOLOv8 processing on embedded boards.", "CUDA segmentation: Accelerated visual filter algorithms."]
    },
    {
        "name": "Sarah Jenkins",
        "experience": 6.0,
        "skills": ["Python", "MLflow", "Kubernetes", "KubeFlow", "Triton Server", "AWS", "Terraform", "Docker"],
        "education": "B.S. in Computer Science - Georgia Tech",
        "domain": "MLOps",
        "behavior": {"updates": 3, "logins": 13, "rate": 0.91, "apps": 5, "certs": 3, "github": 16},
        "projects": ["Feature Gateway: Standardized tabular pipelines.", "Model CD: automated Triton Server deployment scripts."]
    },
    {
        "name": "Li Wei",
        "experience": 4.5,
        "skills": ["TypeScript", "React", "Node.js", "Python", "LangChain", "Pinecone", "Tailwind CSS", "Next.js"],
        "education": "B.S. in Computer Science - Tsinghua University",
        "domain": "LLM Applications",
        "behavior": {"updates": 4, "logins": 14, "rate": 0.96, "apps": 6, "certs": 2, "github": 21},
        "projects": ["Recruiter Copilot: Built AI agent interactive chat box.", "Context Injector: LangChain Pinecone search mapping."]
    },
    {
        "name": "Niels Bohr",
        "experience": 5.0,
        "skills": ["C", "C++", "ARM Cortex", "TensorFlow Lite", "STM32", "Model Compression", "Keil"],
        "education": "M.S. in Electrical Engineering - Copenhagen",
        "domain": "Embedded AI",
        "behavior": {"updates": 2, "logins": 8, "rate": 0.80, "apps": 4, "certs": 0, "github": 12},
        "projects": ["Tiny Keyword Spotter: Quantized audio network to ARM Cortex.", "Integer Optimizations: HIL testing of TFLite weights."]
    },
    {
        "name": "Patricia Hernandez",
        "experience": 7.0,
        "skills": ["Python", "SageMaker", "Vertex AI", "Docker", "ONNX", "PyTorch", "AWS", "Kubernetes"],
        "education": "B.S. in Systems Engineering - UNAM",
        "domain": "Solutions Architecture",
        "behavior": {"updates": 1, "logins": 11, "rate": 0.89, "apps": 3, "certs": 2, "github": 15},
        "projects": ["SageMaker Template: Distributed training configurations.", "ONNX Inference: Accelerated model response to 12ms."]
    },

    # --- MEDIUM MATCHES (Strong engineering skills, missing modern AI stacks) ---
    {
        "name": "Elena Rostova",
        "experience": 6.0,
        "skills": ["Java", "Spring Boot", "Microservices", "Docker", "SQL Server", "AWS", "Jira", "Git"],
        "education": "B.S. in Informatics - Saint Petersburg University",
        "domain": "Enterprise Backend",
        "behavior": {"updates": 1, "logins": 6, "rate": 0.70, "apps": 2, "certs": 1, "github": 5},
        "projects": ["Order Router: Microservices ledger orchestration.", "Data Sync: AWS SQS integration for relational syncing."]
    },
    {
        "name": "James O'Connor",
        "experience": 4.0,
        "skills": ["Python", "Django", "PostgreSQL", "Docker", "AWS", "Celery", "REST APIs", "Redis"],
        "education": "B.S. in CS - University College Dublin",
        "domain": "Web Development",
        "behavior": {"updates": 2, "logins": 8, "rate": 0.82, "apps": 4, "certs": 0, "github": 11},
        "projects": ["Web API: Built high-load Django SaaS API portals.", "Async Workflows: Integrated Celery Redis queue workers."]
    },
    {
        "name": "David Alaba",
        "experience": 5.0,
        "skills": ["Python", "SQL", "Pandas", "Scikit-Learn", "Tableau", "Git", "Jupyter", "Docker"],
        "education": "M.S. in Business Analytics - Vienna University",
        "domain": "Data Analytics",
        "behavior": {"updates": 1, "logins": 7, "rate": 0.75, "apps": 3, "certs": 1, "github": 8},
        "projects": ["Retention Analytics: Segmented candidate pools using Scikit-Learn.", "Data Reports: Deployed visual reports dashboard."]
    },
    {
        "name": "Amina Diop",
        "experience": 4.5,
        "skills": ["C++", "C#", "SQL Server", "Windows Forms", "Algorithms", "Git", "Python"],
        "education": "B.S. in Systems Science - UCAD",
        "domain": "Desktop Softwares",
        "behavior": {"updates": 0, "logins": 5, "rate": 0.60, "apps": 2, "certs": 0, "github": 3},
        "projects": ["Desktop Sync: Maintained multi-threaded C++ file loaders.", "Query optimizer: SQL execution tree optimizations."]
    },
    {
        "name": "Thomas Mueller",
        "experience": 5.5,
        "skills": ["Python", "R", "SQL", "Statsmodels", "Jupyter", "Scikit-Learn", "Matplotlib"],
        "education": "B.S. in Mathematics - Munich University",
        "domain": "Applied Mathematics",
        "behavior": {"updates": 2, "logins": 9, "rate": 0.80, "apps": 4, "certs": 1, "github": 7},
        "projects": ["Risk Matrix: Designed time-series forecasting scripts.", "A/B Hub: Segmented data profiles using Pandas."]
    },
    {
        "name": "Renata Silva",
        "experience": 6.5,
        "skills": ["C#", "ASP.NET Core", "SQL Server", "Azure", "Docker", "Angular", "Git", "TypeScript"],
        "education": "B.S. in Computer Engineering - USP",
        "domain": "Fullstack Enterprise",
        "behavior": {"updates": 1, "logins": 8, "rate": 0.85, "apps": 3, "certs": 1, "github": 6},
        "projects": ["Client CRM: Built Azure hosted fullstack interfaces.", "Angular Forms: Structured input validation wrappers."]
    },
    {
        "name": "Gabriel Dubois",
        "experience": 4.0,
        "skills": ["Python", "Flask", "PostgreSQL", "Docker", "AWS", "HTML5", "CSS3", "JavaScript"],
        "education": "B.S. in CS - University of Lyon",
        "domain": "Fullstack Web",
        "behavior": {"updates": 3, "logins": 11, "rate": 0.90, "apps": 5, "certs": 1, "github": 14},
        "projects": ["Portal MVP: Scaled Flask web templates.", "Database Migrations: Optimized slow lookup join structures."]
    },
    {
        "name": "Amelia Earhart",
        "experience": 5.0,
        "skills": ["Python", "C++", "Embedded Systems", "Linux", "Raspberry Pi", "Git", "Sensors Interface"],
        "education": "B.S. in Aerospace Engineering - Purdue",
        "domain": "Systems Software",
        "behavior": {"updates": 2, "logins": 7, "rate": 0.78, "apps": 3, "certs": 0, "github": 9},
        "projects": ["Telemetry Logger: Custom telemetry processor.", "Sensor Driver: Implemented SPI protocols in C++."]
    },
    {
        "name": "Dr. Ken Thompson",
        "experience": 9.0,
        "skills": ["Go", "C", "Unix", "Bash", "Docker", "SQL", "Git", "Networking"],
        "education": "B.S. in CS - UC Berkeley",
        "domain": "Systems Architectures",
        "behavior": {"updates": 0, "logins": 4, "rate": 0.50, "apps": 1, "certs": 0, "github": 20},
        "projects": ["Network Gateways: Custom TCP proxy routing in Go.", "Docker Clusters: Configured container networks."]
    },
    {
        "name": "Grace Hopper",
        "experience": 8.0,
        "skills": ["Cobol", "Python", "SQL", "Assembly", "Compiler Design", "Algorithms", "Git"],
        "education": "Ph.D. in Mathematics - Yale",
        "domain": "Core Computing",
        "behavior": {"updates": 1, "logins": 5, "rate": 0.65, "apps": 2, "certs": 0, "github": 10},
        "projects": ["Compiler Parser: Custom parsing grammar algorithms.", "SQL Migration: Translated legacy systems to PostgreSQL."]
    },
    {
        "name": "Linus Torvalds",
        "experience": 10.0,
        "skills": ["C", "Git", "Bash", "Linux Kernel", "Assembly", "Makefile", "GDB"],
        "education": "M.S. in Computer Science - Helsinki University",
        "domain": "Kernel Architectures",
        "behavior": {"updates": 0, "logins": 15, "rate": 0.99, "apps": 1, "certs": 0, "github": 50},
        "projects": ["Kernel Schedulers: Optimized low-level CPU scheduler structures.", "Git Core: Implemented DAG index hashing."]
    },
    {
        "name": "Ada Lovelace",
        "experience": 7.0,
        "skills": ["Python", "Algorithms", "Math", "LaTeX", "Jupyter", "Scikit-Learn", "Statsmodels"],
        "education": "B.S. in Mathematics - London University",
        "domain": "Mathematical Sciences",
        "behavior": {"updates": 2, "logins": 9, "rate": 0.88, "apps": 4, "certs": 0, "github": 15},
        "projects": ["Algorithm Proofing: Analyzed recursion sequences.", "Statistical Matrix: Handled multi-regression plotting."]
    },
    {
        "name": "Margaret Hamilton",
        "experience": 8.0,
        "skills": ["Systems Engineering", "C++", "C", "Reliability Testing", "Fortran", "Assembly"],
        "education": "B.A. in Mathematics - Earlham College",
        "domain": "Systems Software",
        "behavior": {"updates": 1, "logins": 6, "rate": 0.70, "apps": 2, "certs": 1, "github": 12},
        "projects": ["Autopilot logic: Handled fault-tolerant async execution trees.", "Test Frameworks: Standardized mock systems testing."]
    },
    {
        "name": "Claude Shannon",
        "experience": 9.0,
        "skills": ["Information Theory", "Python", "Cryptography", "C++", "Algorithms", "Signal Processing"],
        "education": "Ph.D. in Mathematics - MIT",
        "domain": "Communication Sciences",
        "behavior": {"updates": 0, "logins": 5, "rate": 0.60, "apps": 1, "certs": 0, "github": 22},
        "projects": ["Data Compression: Designed entropy hashing limits.", "Logic Gate Sync: Mapped switching states dynamically."]
    },
    {
        "name": "Alan Turing",
        "experience": 10.0,
        "skills": ["Theory of CS", "Algorithms", "Logic", "Math", "Python", "LISP", "Cryptography"],
        "education": "Ph.D. in Math - Princeton",
        "domain": "Theoretical CS",
        "behavior": {"updates": 1, "logins": 10, "rate": 0.90, "apps": 2, "certs": 0, "github": 40},
        "projects": ["Decipher Modules: Automated complex permutation searches.", "Computing Logic: Conceptualized state transition machines."]
    },

    # --- WEAK MATCHES (Mismatched stacks / very low alignment) ---
    {
        "name": "Devon Miller",
        "experience": 3.0,
        "skills": ["Ruby on Rails", "PostgreSQL", "HTML5", "Git", "Ruby", "CSS3", "JavaScript"],
        "education": "B.A. in History - NYU",
        "domain": "Legacy Rails Apps",
        "behavior": {"updates": 0, "logins": 4, "rate": 0.40, "apps": 2, "certs": 0, "github": 4},
        "projects": ["Blog Hub: Legacy monolithic Rails blog app.", "Cart Service: Deployed basic checkout workflows."]
    },
    {
        "name": "Samantha Jenkins",
        "experience": 2.0,
        "skills": ["PHP", "Laravel", "MySQL", "HTML", "CSS", "jQuery", "Bootstrap"],
        "education": "Self-taught Developer",
        "domain": "WordPress/SaaS Web",
        "behavior": {"updates": 1, "logins": 3, "rate": 0.50, "apps": 3, "certs": 0, "github": 2},
        "projects": ["Admin Desk: Maintained legacy Laravel backend tables.", "Form Handler: Simple client forms parsing script."]
    },
    {
        "name": "John Doe",
        "experience": 1.5,
        "skills": ["HTML", "CSS", "JavaScript", "jQuery", "WordPress", "Web QA"],
        "education": "A.S. in Web Technologies - Community College",
        "domain": "Basic Website Slices",
        "behavior": {"updates": 0, "logins": 2, "rate": 0.30, "apps": 1, "certs": 0, "github": 1},
        "projects": ["Landing sites: Styled basic CSS landing pages.", "Plugin setup: Mocked WordPress setups."]
    },
    {
        "name": "Jane Smith",
        "experience": 2.5,
        "skills": ["QA Testing", "Manual Testing", "Selenium", "Jira", "Excel", "SQL"],
        "education": "B.A. in Psychology - Rutgers",
        "domain": "Quality Assurance",
        "behavior": {"updates": 0, "logins": 5, "rate": 0.70, "apps": 6, "certs": 1, "github": 0},
        "projects": ["Manual Test Suite: Verified client login UI redirects.", "Ticket audits: Logged UI layout regression tickets."]
    },
    {
        "name": "Richard Feynman",
        "experience": 1.0,
        "skills": ["Physics", "LaTeX", "Fortran", "Calculation", "Quantum Mechanics"],
        "education": "Ph.D. in Physics - Princeton",
        "domain": "Theoretical Physics",
        "behavior": {"updates": 1, "logins": 3, "rate": 0.40, "apps": 1, "certs": 0, "github": 5},
        "projects": ["Quantum Path Integrals: Formula validations.", "Thermodynamics Tables: Structured numeric approximations."]
    },
    {
        "name": "Michael Jordan",
        "experience": 0.5,
        "skills": ["Data Analyst", "Excel", "PowerBI", "SQL", "Public Speaking"],
        "education": "B.A. in Geography - UNC Chapel Hill",
        "domain": "General Sourcing",
        "behavior": {"updates": 3, "logins": 12, "rate": 0.90, "apps": 10, "certs": 0, "github": 0},
        "projects": ["Metric reports: Excel formula transformations for monthly metrics.", "Data dashboard: Visual dashboard mapping."]
    },
    {
        "name": "Marie Curie",
        "experience": 2.0,
        "skills": ["Lab Testing", "X-Ray Systems", "Chemistry", "Research writing", "French"],
        "education": "Ph.D. in Physics - Paris",
        "domain": "Chemical Analytics",
        "behavior": {"updates": 0, "logins": 2, "rate": 0.20, "apps": 1, "certs": 0, "github": 0},
        "projects": ["Isotope isolation: Standardized lab purification routines.", "X-ray safety: Conducted radiation shielding tests."]
    },
    {
        "name": "Sherlock Holmes",
        "experience": 3.0,
        "skills": ["Investigation", "Logic", "Observation", "Chemistry", "SQL", "Python"],
        "education": "Self-taught Detective",
        "domain": "Forensic Sourcing",
        "behavior": {"updates": 4, "logins": 14, "rate": 0.99, "apps": 2, "certs": 1, "github": 12},
        "projects": ["Clue Correlation: Mapped crime data indexes in SQL.", "Text Search: Built basic regex text parsers."]
    },
    {
        "name": "Winston Churchill",
        "experience": 1.5,
        "skills": ["Strategy", "Speech Writing", "Historian", "Excel", "Coordination"],
        "education": "Royal Military Academy Sandhurst",
        "domain": "Operations Management",
        "behavior": {"updates": 1, "logins": 4, "rate": 0.60, "apps": 3, "certs": 0, "github": 1},
        "projects": ["Logistics Flowchart: Visual representations of operations.", "Text audits: Drafted summary reports."]
    },
    {
        "name": "Leonardo da Vinci",
        "experience": 2.0,
        "skills": ["Drafting", "Anatomy", "Geometry", "Italian", "Design", "Physics"],
        "education": "Apprenticeship in Florence",
        "domain": "Mechanical Design",
        "behavior": {"updates": 2, "logins": 5, "rate": 0.80, "apps": 1, "certs": 0, "github": 3},
        "projects": ["Gear Mechanisms: Sketched friction-driven vector systems.", "Anatomical mapping: Standardized measurement tables."]
    },

    # --- CAREER CHANGERS (Transferable Math/Engineering, transitioning to AI/ML) ---
    {
        "name": "Robert Oppenheimer",
        "experience": 5.0,
        "skills": ["Python", "NumPy", "Physics", "differential equations", "Bash", "Fortran", "Math"],
        "education": "Ph.D. in Physics - Goettingen",
        "domain": "Quantitative Analysis",
        "behavior": {"updates": 3, "logins": 11, "rate": 0.85, "apps": 6, "certs": 2, "github": 16},
        "projects": ["Simulation compute: Programmed numeric integrations in NumPy.", "Fluid dynamics: Custom computational frameworks."]
    },
    {
        "name": "Dr. Katherine Johnson",
        "experience": 6.5,
        "skills": ["Mathematics", "Calculus", "Python", "Fortran", "Astrodynamics", "Matrix Algebra"],
        "education": "B.S. in Mathematics - West Virginia State",
        "domain": "Astrodynamics Computing",
        "behavior": {"updates": 2, "logins": 10, "rate": 0.90, "apps": 4, "certs": 1, "github": 11},
        "projects": ["Orbit trajectories: Solved complex vector geometry algorithms.", "Fortran migration: Ported manual computations to early systems."]
    },
    {
        "name": "Nikola Tesla",
        "experience": 5.5,
        "skills": ["Python", "MATLAB", "Electrical Engineering", "Signal Processing", "Fourier Transform", "Electromagnetism"],
        "education": "Technical University of Graz",
        "domain": "Power Systems Research",
        "behavior": {"updates": 2, "logins": 8, "rate": 0.75, "apps": 3, "certs": 2, "github": 9},
        "projects": ["Alternating Waves: Simulating wave distributions in MATLAB.", "Fourier filters: Custom signal denoising scripts in Python."]
    },
    {
        "name": "Charles Babbage",
        "experience": 6.0,
        "skills": ["Python", "Mechanical Design", "Algorithms", "Calculus", "Excel", "Data Tables"],
        "education": "M.A. in Mathematics - Cambridge",
        "domain": "Difference Engines",
        "behavior": {"updates": 1, "logins": 6, "rate": 0.70, "apps": 3, "certs": 1, "github": 7},
        "projects": ["Mechanical computations: Programmed custom calculations in Python.", "Polynomial Matrix: Evaluated computational tables."]
    },
    {
        "name": "Steve Wozniak",
        "experience": 4.5,
        "skills": ["Hardware Logic", "Assembly", "C", "Python", "Circuit Design", "Firmware", "Verilog"],
        "education": "UC Berkeley (EE & CS)",
        "domain": "Hardware Engineering",
        "behavior": {"updates": 4, "logins": 13, "rate": 0.96, "apps": 5, "certs": 1, "github": 20},
        "projects": ["Video Shifters: Programmed low-level clock signals in Assembly.", "Firmware bridge: C-based serial interface drivers."]
    },

    # --- FRESH GRADUATES (Solid CS/AI/ML background, zero industry exp) ---
    {
        "name": "Alice Wonderland",
        "experience": 0.0,
        "skills": ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Git", "Pandas", "SQL", "C++"],
        "education": "B.S. in AI - Carnegie Mellon University (GPA 3.9)",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 5, "logins": 15, "rate": 0.99, "apps": 12, "certs": 3, "github": 25},
        "projects": ["Thesis: Fine-tuning transformers for sentiment.", "Academic search: Custom tf-idf index in Python."]
    },
    {
        "name": "Bob Builder",
        "experience": 0.0,
        "skills": ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "Git", "Tailwind CSS"],
        "education": "B.S. in Computer Science - Stanford (GPA 3.8)",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 4, "logins": 14, "rate": 0.95, "apps": 10, "certs": 2, "github": 22},
        "projects": ["SaaS MVP: Designed microservice gateway with FastAPI React.", "Cloud deploy: Deployed containerized applications using Docker."]
    },
    {
        "name": "Charlie Chaplin",
        "experience": 0.0,
        "skills": ["Python", "Pandas", "Matplotlib", "SQL", "Excel", "R", "Git"],
        "education": "B.S. in Data Science - UC Berkeley",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 3, "logins": 11, "rate": 0.88, "apps": 8, "certs": 1, "github": 14},
        "projects": ["Predictive modeling: Used Pandas/Scikit-learn on kaggle data.", "Database class: Designed SQL indexing benchmarks."]
    },
    {
        "name": "Diana Prince",
        "experience": 0.0,
        "skills": ["Python", "PyTorch", "OpenCV", "TensorFlow", "C++", "CUDA", "Git"],
        "education": "M.S. in Computer Vision - MIT (GPA 4.0)",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 4, "logins": 15, "rate": 0.97, "apps": 7, "certs": 2, "github": 18},
        "projects": ["Optical Flow Model: Implemented flow segments in PyTorch.", "Inference check: Tested CUDA memory bounds on GPUs."]
    },
    {
        "name": "Evan Wright",
        "experience": 0.0,
        "skills": ["Python", "HuggingFace", "PyTorch", "Transformers", "SQL", "Docker", "Git"],
        "education": "B.S. in CS - Georgia Tech",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 3, "logins": 12, "rate": 0.90, "apps": 9, "certs": 1, "github": 16},
        "projects": ["LLM interface: Connected HuggingFace pipeline to web servers.", "Vector indexing: Configured local FAISS embeddings query."]
    },
    {
        "name": "Fiona Gallagher",
        "experience": 0.0,
        "skills": ["Python", "Scikit-Learn", "Pandas", "SQL", "Tableau", "Git"],
        "education": "B.S. in Statistics - UIUC",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 4, "logins": 13, "rate": 0.92, "apps": 11, "certs": 2, "github": 10},
        "projects": ["Customer Churn: Random Forest classifications in Jupyter.", "Stats Lab: Linear regressions models."]
    },
    {
        "name": "George Weasley",
        "experience": 0.0,
        "skills": ["JavaScript", "React", "HTML5", "CSS3", "Git", "Node.js", "Express"],
        "education": "Coding Bootcamp Graduate",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 5, "logins": 14, "rate": 0.94, "apps": 15, "certs": 1, "github": 32},
        "projects": ["Storefront site: Interactive checkout page in React.", "Express API: CRUD backend servers."]
    },
    {
        "name": "Harry Potter",
        "experience": 0.0,
        "skills": ["Python", "Algorithms", "C++", "Java", "SQL", "Git"],
        "education": "B.S. in CS - Oxford University",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 3, "logins": 10, "rate": 0.85, "apps": 6, "certs": 0, "github": 15},
        "projects": ["Pathfinding Viz: Visualized Dijkstra algorithms in Python.", "Data Structures: Custom memory-efficient binary trees."]
    },
    {
        "name": "Iris West",
        "experience": 0.0,
        "skills": ["Python", "Django", "SQL", "HTML", "CSS", "Git", "REST APIs"],
        "education": "B.S. in CS - University of Maryland",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 4, "logins": 12, "rate": 0.93, "apps": 8, "certs": 1, "github": 11},
        "projects": ["Ticket tracker: Built bug logging platform in Django.", "API calls: Integrated client weather api requests."]
    },
    {
        "name": "Jack Ryan",
        "experience": 0.0,
        "skills": ["Python", "SQL", "Pandas", "Excel", "Data Security", "Git"],
        "education": "B.S. in Information Systems - Georgetown",
        "domain": "Fresh Graduate",
        "behavior": {"updates": 5, "logins": 15, "rate": 0.98, "apps": 14, "certs": 3, "github": 8},
        "projects": ["Threat audit: Scripted anomaly audits in Pandas.", "SQL Class: Structured school register database schemas."]
    }
]

# programmatically assemble 50 candidate objects containing structured text resumes and behavioral parameters
demo_candidates = []

for item in candidate_profiles_raw:
    # Build a clean realistic resume text block based on their properties
    resume_text = (
        f"{item['name']}\n"
        f"Domain focus: {item['domain']}\n"
        f"Education: {item['education']}\n"
        f"Experience: {item['experience']} years\n\n"
        "Technical Skills:\n"
        f"{', '.join(item['skills'])}\n\n"
        "Selected Projects:\n"
    )
    for proj in item["projects"]:
        resume_text += f"- {proj}\n"
    
    resume_text += (
        "\nProfessional Summary:\n"
        f"Competent IT professional specializing in {item['domain']} with {item['experience']} years of practical focus. "
        f"Expertise covers: {', '.join(item['skills'][:4])}."
    )
    
    # Map behavioral signals
    behavioral_signals = {
        "profile_updates_last_30_days": item["behavior"]["updates"],
        "login_frequency": item["behavior"]["logins"],
        "response_rate": item["behavior"]["rate"],
        "application_count": item["behavior"]["apps"],
        "certification_activity": item["behavior"]["certs"],
        "github_activity": item["behavior"]["github"]
    }
    
    demo_candidates.append({
        "name": item["name"],
        "resume_text": resume_text,
        "behavioral_signals": behavioral_signals
    })

# Export to JSON
with open("demo_jobs.json", "w") as f:
    json.dump(jobs, f, indent=2)

with open("demo_candidates.json", "w") as f:
    json.dump(demo_candidates, f, indent=2)

print(f"Successfully generated demo_jobs.json with {len(jobs)} jobs.")
print(f"Successfully generated demo_candidates.json with {len(demo_candidates)} candidates.")
