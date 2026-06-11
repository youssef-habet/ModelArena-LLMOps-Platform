# ModelArena — LLMOps Evaluation Platform

ModelArena is a platform for engineers and data scientists to evaluate, compare, and monitor Large Language Models. It centralizes model management, dataset handling, custom metrics, and multi-model experimentation in a single interface.

---

## Features

- **Model Registry** — Register Cloud (Gemini, OpenAI) and local (Ollama) models with full parameter configuration
- **Dataset Manager** — Upload CSV/JSON test files with ground truth validation and secure Supabase storage
- **Metrics Engine** — Define deterministic metrics (Exact Match, BLEU, ROUGE-L) and AI metrics (LLM-as-a-Judge)
- **Evaluation Runs** — Run async evaluations linking a model, a dataset, and a set of metrics
- **Experimentation Arena** — Compare multiple models side by side with Row-by-Row analysis and Win Rate scoring
- **Dashboard** — KPI overview, activity feed, and best experiment highlight

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + TailwindCSS |
| Backend | Python + FastAPI (async/await) |
| Database | Supabase (PostgreSQL + Storage) |
| Auth | JWT + OAuth2 |
| LLM Engine | Ollama (local) · Gemini · OpenAI |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.10
- Supabase account
- Ollama (optional, for local models)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ModelArena.git
cd ModelArena
```

### 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

`.env` variables:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-key
OPENAI_API_KEY=your-openai-key
OLLAMA_BASE_URL=http://localhost:11434
```

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

`.env.local` variables:

```
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Supabase

Run the SQL migrations in `supabase/migrations/` and create a Storage Bucket named `datasets`.

### 5. Ollama (optional)

```bash
ollama pull llama3
ollama serve
```

---

## Running with Docker

This is the recommended way to run ModelArena in production or for a quick local setup.

### Prerequisites

- Docker >= 24
- Docker Compose >= 2

### 1. Configure the backend environment

```bash
cp llmops-backend/.env.example llmops-backend/.env
```

Edit `llmops-backend/.env` with your values:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-key
OPENAI_API_KEY=your-openai-key
OLLAMA_BASE_URL=http://localhost:11434
```

### 2. Build and start the containers

```bash
docker compose up --build
```

The first run will build both images. Subsequent runs can skip the build step:

```bash
docker compose up
```

### 3. Access the application

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |

### Useful commands

```bash
# Run in detached mode (background)
docker compose up -d

# Stop all containers
docker compose down

# View logs
docker compose logs -f

# View logs for a specific service
docker compose logs -f backend
docker compose logs -f frontend

# Rebuild a single service after code changes
docker compose up --build backend
```

### Pull pre-built images from Docker Hub

If you don't want to build locally, you can pull the published images directly:

```bash
docker pull youssefhabet/modelarena-backend:latest
docker pull youssefhabet/modelarena-frontend:latest
docker compose up
```

---

## Dataset Format

Datasets must be CSV or JSON with at minimum an `input` column and an `expected` column.

```csv
input,expected
"What is the capital of France?","Paris"
"Explain async/await in one sentence.","Async/await allows writing asynchronous code in a synchronous style."
```

---

## Supported Metrics

| Metric | Type | Description |
|---|---|---|
| Exact Match | Deterministic | Strict character comparison |
| Contains | Deterministic | Keyword presence check |
| BLEU | NLP | N-gram precision score |
| ROUGE-L | NLP | Longest common subsequence |
| Valid JSON | Reliability | Checks if output is parseable JSON |
| LLM-as-a-Judge | AI | Uses an LLM to score tone, accuracy, or coherence |

---

## API

Once the backend is running, the full API documentation is available at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## Project Structure

```
ModelArena/
├── backend/
│   ├── main.py
│   ├── routers/          # auth, models, datasets, metrics, evaluations, experiments
│   ├── services/         # llm_service, metric_engine, storage_service
│   ├── models/           # Pydantic schemas
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/        # Dashboard, Models, Datasets, Metrics, Evaluations, Experiments
│   │   └── components/
│   └── package.json
└── supabase/
    └── migrations/
```

---

## Roadmap

- [ ] Extended metrics: AnswerRelevancy, Faithfulness, Coherence
- [x] Docker + Docker Compose deployment
- [ ] Kubernetes deployment
- [ ] Radar charts for multi-axis model comparison
- [ ] Support for Anthropic, Mistral, Cohere providers
- [ ] CI/CD pipeline with evaluation regression tests

---

## Authors

**Youssef HABET** & **Mohamed ERROUH**
Supervised by Prof. Tarik FISSAA — INPT
Cycle Ingénieur d'État — 2025/2026
