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

- [Case Study](#case-study)  
  - [Key Features](#key-features)  
- [Phase - 0 : Planning (Ideation)](#phase---0--planning-ideation)  
  - [Tool: Perplexity](#tool-perplexity)  
  - [Tool: Notion AI](#tool-notion-ai)  
  - [Tool: Gemini (Google AI Studio)](#tool-gemini-google-ai-studio)  
- [What’s Next](#whats-next)  
- [Contributions](#contributions)

---

# Case Study

> ## **InternScout AI — Autonomous Internship Matchmaker for Students**
> **Concept**: InternScout AI is an agentic platform that automates internship discovery and outreach for students.  
> It continuously scans opportunities, identifies HR/Talent Acquisition contacts, personalizes cold emails/voice calls, and manages interview scheduling — reducing the time students spend manually applying.

### Key Features (Ideation Stage)
- Student preference + resume analysis  
- Continuous internship opportunity discovery  
- HR contact extraction (ethical + public data only)  
- Personalized cold email outreach  
- Optional AI voice-based HR calling  
- Response tracking + interview scheduling  
- Safety and compliance agents (GDPR, CAN-SPAM)

---

# Phase - 0 : Planning (Ideation)

This phase outlines the **discovery → synthesis → validation** process.  
We used three tools **in strict sequence** to replicate how entrepreneurs ideate using AI:

**Perplexity** → **Notion AI** → **Gemini**

---

## Tool: Perplexity  
_Perplexity was used for **market research and problem discovery**._

### **Why Perplexity?**
- Best for **real-time, citation-backed** research  
- Can aggregate 2024–2025 data from verified sources  
- Ideal for discovering **high-impact student problems**

### **Outputs**
- Prompt: [`prompts/perplexity_prompt.txt`](prompts/perplexity_prompt.txt)  
- Raw Output: [`output/perplexity_output.md`](output/perplexity_output.md)  
- Images:  
  - [`Images/perplexity_output.png`](Images/perplexity_output.png)  

### **Findings from Perplexity**
Perplexity produced a comprehensive list of **7 major student problem clusters**, including:
- Internship scarcity (“Experience Trap”)  
- Skills mismatch crisis  
- Mental health surge  
- Financial insecurity  
- Administrative friction  
- High-stress exam prep  
- Campus safety issues  

This became the raw input for Notion AI.

---

## Tool: Notion AI  
_Notion AI was used for **insight organization, clustering, and opportunity prioritization**._

### **Why Notion AI?**
- Ideal for turning **long text → structured insight maps**  
- Built-in databases & AI scoring tools support prioritization  
- Provides an ICE (Impact–Confidence–Ease) framework for selecting the best idea

### **Outputs**
- Prompt: [`prompts/notionai_prompt.txt`](prompts/notionai_prompt.txt)  
- Output: (Not included in repository - generated during Notion AI workflow)

### **What Notion AI Did**
- Clustered problems into 7 categories  
- Summarized each with evidence and gaps  
- Applied ICE scoring → **Internship Scarcity scored highest**  
- Produced a **product opportunity brief** recommending:  
  - Agentic HR outreach automation  
  - Verified project portfolios  
  - Personalized opportunity matching

This output was fed into Gemini for deep system design.

---

## Tool: Gemini (Google AI Studio)  
_Gemini was used for **solution design, agent specification, tool comparison, and MVP planning**._

### **Why Gemini?**
- Strong reasoning for **multi-agent architectures**  
- Great at comparing tools (scrapers, email APIs, voice AI, databases)  
- Produces detailed system-level outputs (roles, inputs/outputs, flows)

### **Outputs**
- Prompt: [`prompts/gemini_prompt.txt`](prompts/gemini_prompt.txt)  
- Output: [`output/gemini_output.md`](output/gemini_output.md)

### **What Gemini Produced**
- Defined all core agents:  
  - Preference Intake Agent  
  - Research & Opportunity Discovery Agent  
  - Scraper / Contact Extraction Agent  
  - Email Outreach Agent  
  - Voice Call Agent  
  - Scheduler Agent  
  - CRM/Tracking Agent  
  - Safety/Compliance Agent  
- Compared tools: Apify vs Browserless; Resend vs Mailgun; Vapi vs ElevenLabs; Firebase vs Supabase; Cloud Run vs Vercel  
- Recommended the best choices based on:  
  - Cost  
  - Usability  
  - Accuracy  
  - Compliance  
- Delivered a clean **MVP Roadmap**:
  - Phase 1: Student onboarding + mock opportunities  
  - Phase 2: Email outreach + tracking  
  - Phase 3: Contact extraction agent  
  - Phase 4: Voice agent (optional)

---

# What’s Next

This repository currently includes **Phase 0 – Ideation** only.

Next planned phases:

- **Phase 1 – Requirements Analysis** (SRS generation using Bohrium AI or Gemini)  
- **Phase 2 – Design** (wireframes, architecture diagrams using Uizard, Galileo, Eraser, Mermaid)  
- **Phase 3 – Prototyping** (GitHub Copilot scaffold)  
- **Phase 4 – Documentation & Deployment**

Tell me when you want to move to the Design phase — I can generate the full templates and prompts.

---

# Contributions

Harsh Khamkar
