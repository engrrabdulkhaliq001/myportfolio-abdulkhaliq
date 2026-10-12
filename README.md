# ⚡ Abdul Khaliq — AI & Backend Systems Engineer Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-Vercel-06b6d4?style=for-the-badge&logo=vercel&logoColor=white)](https://myportfolio-abdulkhaliq.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-engrrabdulkhaliq001-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/engrrabdulkhaliq001)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-abdul--khaliq-0077b5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdul-khaliq-5a48a53ab)
[![Email](https://img.shields.io/badge/Email-engrrabdulkhaliq%40gmail.com-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:engrrabdulkhaliq@gmail.com)

> **"Building end-to-end AI applications, scalable RAG architectures, real-time data pipelines, and production APIs."**

Live Production Deployment: **[https://myportfolio-abdulkhaliq.vercel.app/](https://myportfolio-abdulkhaliq.vercel.app/)**

---

## 🚀 Key Metrics

| Metric | Measurement | Impact / Benchmark |
| :--- | :--- | :--- |
| **Production Apps** | **`5+`** | Deployed across Vercel, Streamlit, and OCI A1 VMs |
| **Candidate Matching** | **`87%`** | NLP & Semantic similarity screening accuracy |
| **RAG Query Latency** | **`< 2s`** | Sub-2-second retrieval & generation with Groq LPU |
| **Local Model Execution** | **`100%`** | Zero-cloud-cost inference using ONNX Runtime |

---

## 🎨 UI/UX & Design System

The portfolio is crafted around modern developer aesthetic, technical minimalism, and high-performance design principles:
- **Palette Signature:** Midnight Navy (`#080E18`) + Slate Blue (`#111B2B`) + Electric Cyan (`#22D3EE`) + Soft White (`#F1F5F9`) + Muted Slate (`#94A3B8`) + Soft Violet (`#8B7CFF`).
- **Surfaces & Borders:** Slate Blue card surfaces with 1px subtle borders (`rgba(148, 163, 184, 0.15)`) and restrained cyan hover borders (`rgba(34, 211, 238, 0.45)`).
- **Typography:** **Inter** for clean visual hierarchy, comfortable reading width, and crisp technical badges.
- **Visual Style:** Subtle dark navy background gradient with faint low-contrast grid lines, soft ambient cyan glow behind the authentic profile card, and generous whitespace.
- **Interactions:** Subtle 180–220ms hover transitions, accessible focus rings, animated metrics counters, interactive category filter tabs, and architecture modal dialogs with reduced-motion support.

---

## 💼 Featured Engineering Projects

### 1. [Iconspire — AI Icon Generator & Background Remover](https://github.com/engrrabdulkhaliq001)
* **Tech Stack:** `Node.js` • `Express` • `ONNX Runtime` • `Paddle API` • `Lemon Squeezy`
* **Architecture Highlights:**
  - Built local background removal pipelines using Node.js/Express and ISNet ONNX models for image segmentation with zero third-party API costs.
  - Integrated payment webhooks and sandbox checkouts via Paddle and Lemon Squeezy to handle subscription workflows.
  - Managed asynchronous image buffers and optimized asset delivery pipelines.

### 2. [ClearWay / Squerly — Real-Time Traffic Alert & Navigation Pipeline](https://github.com/engrrabdulkhaliq001)
* **Tech Stack:** `Python` • `FastAPI` • `Supabase` • `OCI A1 VM` • `Automated Scrapers`
* **Architecture Highlights:**
  - Configured automated scrapers running on an Oracle Cloud Infrastructure (OCI) virtual machine to continuously aggregate live municipal traffic incidents.
  - Implemented incident deduplication algorithms, commute window alert filtering, and live routing integration.
  - Designed database schemas and real-time state synchronization using Supabase (PostgreSQL).

### 3. [Sigma RAG — Video Q&A AI Teaching Assistant](https://github.com/engrrabdulkhaliq001)
* **Tech Stack:** `Python` • `LangChain` • `FAISS` • `Groq API (LLaMA 3)` • `FastAPI`
* **Architecture Highlights:**
  - Built video transcript ingestion and vector embeddings for context-aware Q&A with sub-2-second retrieval speed.
  - Mapped generated responses directly to exact video timestamps (`MM:SS`) for precise student navigation.
  - Utilized Groq LPU inference for high-speed token generation over indexed chunks.

### 4. [AI Resume Screening & Candidate Ranker](https://github.com/engrrabdulkhaliq001)
* **Tech Stack:** `Python` • `NLP` • `Scikit-Learn` • `Streamlit` • `Vector Search`
* **Architecture Highlights:**
  - Built NLP matching and skill extraction algorithms achieving 87% candidate screening accuracy, reducing evaluation time by 75%.
  - Implemented candidate ranking mechanisms, skill extraction, and bias detection filters.
  - Deployed an interactive Streamlit analytics dashboard for recruiters to analyze applicant distributions.

### 5. [Student Performance Predictor & Model Explainability](https://student-perfomance-predictor.streamlit.app/)
* **Tech Stack:** `Python` • `Machine Learning` • `XGBoost` • `SHAP` • `Pandas`
* **Architecture Highlights:**
  - Trained classification models on historical academic data to predict pass/fail risk with 84% accuracy.
  - Integrated SHAP explainability visualizations to provide transparent feature-importance insights.
  - Deployed live interactive application on Streamlit Cloud: [Live Demo](https://student-perfomance-predictor.streamlit.app/).

---

## 🛠️ Technical Skills Matrix

| Category | Technologies & Tools |
| :--- | :--- |
| **AI & RAG** | LangChain, RAG Architecture, Vector Search (FAISS, ChromaDB), Groq API (LLaMA 3), ONNX Runtime, Embeddings, Prompt Engineering |
| **Backend & APIs** | FastAPI, Flask, Node.js, Express, RESTful APIs, Webhooks, Data Scrapers, Stream Buffers |
| **Databases & Cloud** | Supabase (PostgreSQL), Oracle Cloud Infrastructure (OCI A1 VM), Docker, Vercel, Railway, Row Level Security (RLS) |
| **Data Science & ML** | Python, Pandas, NumPy, Scikit-learn, XGBoost, SHAP (Explainable AI), NLP |

---

## 🗄️ Supabase Contact Form Setup

The portfolio integrates `@supabase/supabase-js` to store incoming contact messages securely in PostgreSQL.

### 1. Database Schema & RLS Policy

Run the following SQL in your **Supabase SQL Editor**:

```sql
-- 1. Create table for contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anonymous users to submit messages (Insert only)
CREATE POLICY "Allow public submissions to contact_messages"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Policy: Allow authenticated admin to view messages
CREATE POLICY "Allow authenticated read contact_messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);
```

### 2. Configure Credentials in `script.js`

In `script.js`, replace the placeholder credentials with your project details:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_ID.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  tableName: 'contact_messages'
};
```

*(Alternatively, you can expose `window.SUPABASE_URL` and `window.SUPABASE_ANON_KEY` before `script.js` loads.)*

---

## 💻 Local Development Setup

No complex build pipeline is required. The portfolio runs cleanly on standard HTTP servers:

```bash
# Clone the repository
git clone https://github.com/engrrabdulkhaliq001/myportfolio-abdulkhaliq.git

# Navigate to project folder
cd myportfolio-abdulkhaliq

# Option 1: Python 3
python -m http.server 3000

# Option 2: Node.js (npx serve)
npx serve .

# Option 3: VS Code Live Server
# Right click index.html -> "Open with Live Server"
```

Then visit `http://localhost:3000` in your browser.

---

## 🚀 Deployment to Vercel

```bash
# Deploy instantly with Vercel CLI
npm i -g vercel
vercel
```

Or connect the repository directly in the [Vercel Dashboard](https://vercel.com/new).

---

## 📬 Contact & Connect

- **Engineer:** Abdul Khaliq
- **Email:** [engrrabdulkhaliq@gmail.com](mailto:engrrabdulkhaliq@gmail.com)
- **LinkedIn:** [linkedin.com/in/abdul-khaliq-5a48a53ab](https://www.linkedin.com/in/abdul-khaliq-5a48a53ab)
- **GitHub:** [github.com/engrrabdulkhaliq001](https://github.com/engrrabdulkhaliq001)
- **Portfolio:** [https://myportfolio-abdulkhaliq.vercel.app/](https://myportfolio-abdulkhaliq.vercel.app/)

---
*Crafted with precision, high performance, and modern developer aesthetics.*
