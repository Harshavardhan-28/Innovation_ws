# Project Development Blueprint using AI

This repository demonstrates how entrepreneurs can use AI tools end-to-end for **ideation → design → prototyping**, illustrated by a focused case study covering the **Ideation Phase** only.  
We gather research, structure insights, and validate an agentic product idea using the workflow: **Perplexity → Notion AI → Gemini**.

![InternScout AI](https://img.shields.io/badge/InternScout--AI-v0.1.0-blue)

> ⚠️ **WARNING**
>
> All project outputs (prompts, research summaries, designs, agent specs) were **generated with AI assistance** and may contain **inaccuracies, omissions, vulnerabilities, or biases**.  
> This blueprint is for demonstration and learning — outputs require **human validation** before real-world use.

---

## Table of Contents

- [InternScout AI — Autonomous Internship Matchmaker](#internscout-ai--autonomous-internship-matchmaker)
	- [Case Study Overview](#case-study-overview)
	- [Phase 1.1 — Problem Identification / Market Research](#phase-11--problem-identification--market-research)
	- [Phase 1.2 — Opportunity Scoring & Validation](#phase-12--opportunity-scoring--validation)
	- [Phase 1.3 — MVP Specification with GitHub Copilot](#phase-13--mvp-specification-with-github-copilot)
- [Phase 2 — Design, UX, and Business Model](#phase-2--design-ux-and-business-model)
	- [2.1 — AI‑Driven Solution Architecture](#21--ai-driven-solution-architecture)
	- [2.2 — UXUI Wireframe Generation](#22--uxui-wireframe-generation)
	- [2.3 — Business Model & Strategy with GitHub Copilot](#23--business-model--strategy-with-github-copilot)

---

# InternScout AI — Autonomous Internship Matchmaker

## Case Study Overview

This case study shows how AI tools can support **problem discovery → opportunity validation** for a startup concept: **InternScout AI — an autonomous internship matchmaker for students**.

We use Perplexity AI in two phases and save all artifacts so students can inspect both prompts and outputs as they follow along.

---

### Key Features (Across Phases 1 & 2)
- Student problem discovery and market validation using **Perplexity**.
- Structured opportunity scoring and TAM/SAM/SOM estimation.
- **MVP PRD generation** with GitHub Copilot (multi‑agent, compliance‑first design).
- AI‑assisted **system architecture diagrams** (ChatGPT + Mermaid, Nano Banana).
- AI‑generated **UX/UI wireframes** (Uizard AI).
- AI‑supported **business model, pricing, and GTM strategy** (GitHub Copilot).

---

## Phase 1.1 — Problem Identification / Market Research

**Files:**
- [perplexity_GH_prompt.txt](1.1/perplexity_GH_prompt.txt)
- [perplexity_GH_output.md](1.1/perplexity_GH_output.md)

**What we did:**
- Asked Perplexity to map the **broad space of student problems** (India + global).
- Identified themes like mental health, academic pressure, financial stress, **career uncertainty/NEET**, digital divide, and support gaps.

**Key takeaway for the case study:**
- There is a large, systemic problem around **career uncertainty and student‑to‑work transitions**, with internships as a critical leverage point.

**Problem statement (for InternScout):**

> Students, especially in India, struggle to move from education to meaningful work because internship discovery and employer outreach are fragmented, manual, and capacity‑constrained.

---

## Phase 1.2 — Opportunity Scoring & Validation

**Files:**
- [perplexity_1_2_prompt.txt](1.2/perplexity_1_2_prompt.txt)
- [perplexity_1_2_output.md](1.2/perplexity_1_2_output.md)

**What we did:**
- Evaluated InternScout AI as a startup idea using Perplexity.
- Looked at **TAM / SAM / SOM**, competitor landscape, risks, and a weighted opportunity score.

**Highlights:**
- Market for internship placement / early‑careers tools is already in the **low‑single‑digit billions (USD)** globally.
- An execution‑focused startup could realistically aim for **tens of millions in ARR** if it finds product‑market fit.
- Strong existing players (Handshake, Internshala, LinkedIn), but most are **listings‑centric**, not autonomous agents.
- Main constraints are **legal/compliance risk** and **platform dependency**, not core AI feasibility.

**Viability verdict (short):**

> Attractive but execution‑sensitive: InternScout AI looks viable if built as a **compliance‑first copilot on top of existing platforms**, not as a generic scraper marketplace.

---

## Idea Snapshot — What Is InternScout AI?

- A **student‑first autonomous copilot** that discovers relevant internships, drafts outreach, and tracks responses.
- Helps **students** and **career/placement offices** run smarter, more scalable outreach.
- Works **on top of existing job boards and career pages**, instead of trying to replace them.
- Focuses on **quality, personalized, and compliant outreach**, not just more applications.
- Uses AI and embeddings to match **resumes + preferences → high‑fit opportunities**.

---

## Why Phase 1.1 → 1.2 Justifies Building InternScout

- **From 1.1:** We learned that career uncertainty and weak internship pathways are a major, high‑impact student problem.
- **From 1.2:** We confirmed that the **market is sizable**, existing tools leave a gap around **autonomous, compliant outreach**, and legal design is the key constraint.

Together, these phases justify moving into **ideation and system design** for a **multi‑agent, compliance‑first internship matching copilot**.

---

## Phase 1.3 — MVP Specification with GitHub Copilot

**Files:**
- [mvp.md](1.3/mvp.md)

**What we did:**
- Used **GitHub Copilot** as an AI pair‑writer to turn the validated idea from 1.1 and 1.2 into a **clear MVP Product Requirements Document (PRD)**.
- Defined a **student‑first autonomous agent** that discovers internships, drafts outreach, and manages follow‑ups.
- Captured requirements for a **multi‑agent system** (discovery, contact extraction, outreach, safety/compliance) and a **resume → embedding → matching → action** pipeline.

**Brief MVP description:**

The MVP is a web app where students sign in, upload a resume, set preferences, and then see a dashboard of **recommended internships plus outreach status**. Behind the scenes, specialized agents parse resumes, generate vector embeddings, match students to roles, find appropriate HR contacts, draft **compliant outreach emails**, and track responses—while a safety/compliance layer checks every message before it is sent.

**Why this matters for the workshop:**
- Students see how an AI assistant (GitHub Copilot) can help move from **research → concrete specs**, not just code.
- The PRD in `1.3/mvp.md` becomes the bridge from **idea** to **architecture & implementation** in later phases.

---

# Phase 2 — Design, UX, and Business Model

After validating the problem and opportunity (Phase 1) and defining an MVP (1.3), Phase 2 shows how different AI tools can support **architecture design, UX/UI, and business strategy**.

## 2.1 — AI‑Driven Solution Architecture

**Blueprint objective:** Use AI to define how the product will work technically.

**What we planned to do:**
- Architecture brainstorming.
- Feature mapping and prioritization.
- Tech stack recommendation with AI support.

**Tools used in this repo:**
- **ChatGPT** → Generated the **Mermaid system architecture diagram** from the prompt in [`2.1/chatgpt/chatgpt_prompt.txt`](2.1/chatgpt/chatgpt_prompt.txt). The resulting Mermaid code is saved in [`2.1/chatgpt/mermaid code.txt`](2.1/chatgpt/mermaid%20code.txt) and rendered into the architecture diagram during the workshop.
- **Nano Banana** (diagram tool) → Took the user‑flow prompt in [`2.1/Nano Banana/prompt.txt`](2.1/Nano%20Banana/prompt.txt) and produced the user‑flow architecture image saved as [`2.1/Nano Banana/output.png`](2.1/Nano%20Banana/output.png).

**Outputs:**
- High‑level **system architecture diagram** (Mermaid).
- Visual **user‑flow diagram** showing how students move through InternScout AI end‑to‑end.

## 2.2 — UX/UI Wireframe Generation

**Blueprint objective:** Use AI design tools to draft product screens and flows.

**What we planned to do:**
- Sketch rough wireframes for key student screens.
- Refine layouts with AI assistance.
- Map user flows across authentication, dashboard, opportunities, outreach, and tracking.

**Tools used in this repo:**
- **Uizard AI** → Using the brief in [`2.2/Uizard AI/promot.txt`](2.2/Uizard%20AI/promot.txt), Uizard generated **mock wireframes** for the student‑facing web app (see all artifacts under [`2.2/Uizard AI/`](2.2/Uizard%20AI/)).

**Outputs:**
- Low‑fidelity wireframes for core screens (auth, onboarding, dashboard, opportunity details, outreach, tracking, settings).
- Early design direction suitable for later translation into Figma or production UI.

## 2.3 — Business Model & Strategy with GitHub Copilot

**Blueprint objective:** Convert the product into a viable business model.

**What we planned to do:**
- Generate AI‑assisted business models and pricing options.
- Outline a go‑to‑market (GTM) plan.
- Capture a pitch‑ready structure (narrative + slides).

**Tools used in this repo:**
- **GitHub Copilot** → Starting from the detailed brief in [`2.3/GitHub Copilot/prompt.txt`](2.3/GitHub%20Copilot/prompt.txt), Copilot helps draft (see outputs under [`2.3/GitHub Copilot/`](2.3/GitHub%20Copilot/)):
	- A **Business Model Canvas** (customer segments, value prop, key activities/resources, channels, revenue, costs, partners).
	- A **pricing strategy** (freemium, Pro subscription, enterprise/university licensing).
	- An **AI‑supported GTM plan**, competitive landscape, strategy docs, and a **pitch deck outline**.

**Outputs:**
- Business model and strategy notes under `2.3/GitHub Copilot/` (used as source material for slides and discussions).
- A repeatable pattern for using GitHub Copilot as a **business co‑designer**, not just a coding assistant.


