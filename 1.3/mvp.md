# InternScout AI – MVP Product Requirements Document (PRD)

## 1. Product Overview

InternScout AI is a **student‑first autonomous agent** that helps higher‑education students discover relevant internships, draft personalized outreach, and manage follow‑ups and schedules in a legally compliant way. The MVP focuses on India‑first use cases with a roadmap to global markets.

The system is designed to work **on top of existing job portals and employer channels**, not to replace them. It automates the most painful, manual steps of internship search and outreach while keeping **career offices and compliance considerations** at the center.

---

## 2. Product Vision & Objectives

### 2.1 Vision

> Build a **student‑first autonomous agent** that:
> - Discovers high‑fit internship opportunities across platforms,
> - Drafts tailored, compliant outreach messages and screening prep,
> - Manages responses, follow‑ups, and schedules,
> - While giving students and institutions full visibility and control.

### 2.2 Primary Objectives (MVP)

- **Outcome uplift:** Increase response and interview rates for internship‑seeking students (starting with engineering/CS and business streams).
- **Effort reduction:** Reduce time students and career offices spend manually searching, tracking, and emailing employers.
- **Compliance‑first:** Ensure every automated outreach respects GDPR, CAN‑SPAM, India’s DPDP, and platform‑specific terms, with **built‑in safety checks** before any message is sent.
- **Institution‑friendly:** Provide career offices with a clear view into ongoing outreach, responses, and outcomes.

### 2.3 Target Users

- **Primary:** Individual students (late undergrad/postgrad) actively looking for internships.
- **Secondary:** College/university career/placement offices using the system to support batches of students.

---

## 3. Core User Journeys

### 3.1 Student – “Guided Autonomous Search”

1. Student signs up and authenticates via email/SSO.
2. Student uploads a resume and fills a short preference form (location, roles, skills, constraints).
3. System parses and summarizes the resume into a structured profile.
4. System continuously discovers and ranks opportunities that match the student’s profile and preferences.
5. Student reviews recommended opportunities in a dashboard, with explanations of “why this match.”
6. Student approves or edits outreach drafts for selected opportunities.
7. System sends emails and prepares for any potential voice/phone screening steps.
8. Student sees live outreach status, responses, and recommended next actions on the dashboard.

### 3.2 Career Office – “Batch Support Copilot” (MVP scope: light)

1. Career officer onboards a cohort (e.g., uploads a list of students or invites them).
2. Officer views aggregate stats: number of active students, opportunities discovered, outreach sent, responses, interviews.
3. Officer can define institution‑level constraints (e.g., no outreach to certain companies; constraints on channels; compliance settings).
4. Officer can monitor and export outreach logs for audits.

---

## 4. Feature Breakdown

### 4.1 Frontend – Student Web App & Dashboard

#### 4.1.1 Student Authentication & Onboarding

- **Features**
	- Email/password sign‑up and sign‑in (with password reset).
	- Optional OAuth/SSO (e.g., Google) for faster onboarding.
	- Basic profile creation (name, institution, degree, graduation year).
- **Requirements**
	- Secure session handling and token‑based auth.
	- Support for multi‑tenant institutions (tagging students to colleges).

#### 4.1.2 Resume Upload & Management

- **Features**
	- Upload resume in PDF/DOCX format.
	- View current active resume and upload updated versions.
	- Show “resume parsing status” (pending, complete, failed).
- **Requirements**
	- Client‑side validation of file formats and size.
	- Clear consent text explaining how resumes are processed and used.
	- Error handling for failed parsing with manual retry.

#### 4.1.3 Preference Setting & Update

- **Features**
	- Guided preference form:
		- Desired roles and domains.
		- Preferred locations (on‑site/remote/hybrid).
		- Skill tags (tech stack, languages, tools).
		- Constraints (stipend minimum, full‑time vs part‑time, time zone, etc.).
	- Ability to update preferences anytime.
- **Requirements**
	- Form UI optimized for mobile and low bandwidth.
	- Autosave of partially filled forms.
	- Clear indication of how preferences influence recommendations.

#### 4.1.4 Student Dashboard – Opportunities & Outreach Status

- **Features**
	- Personalized feed of recommended opportunities:
		- Basic job details (title, company, location, stipend if available, source platform).
		- Match score and “why this is recommended” explanation.
	- Outreach status per opportunity:
		- Not contacted / Draft ready / Sent / Awaiting response / Responded / Interview scheduled / Closed.
	- Timeline of system actions:
		- Discovery events, outreach attempts, responses received, follow‑up reminders.
	- Ability to:
		- Approve or edit email drafts before sending.
		- Opt‑in/opt‑out of voice outreach preparation features.
		- Snooze or discard opportunities.
- **Requirements**
	- Real‑time sync of status updates (or near‑real‑time with polling).
	- Transparent view of which channels (email/voice) are being used.
	- Clear labels when messages are being sent on behalf of an institution vs the student personally.

---

## 5. Multi‑Agent System Requirements

The MVP explicitly uses a **multi‑agent system** to break down responsibilities, improve safety, and make behavior auditable. At minimum, the following agents and capabilities are required.

> Note: These are *logical* agents; physical deployment may share runtimes where appropriate.

### 5.1 Discovery Agent

**Purpose:** Continuously discover relevant internship opportunities for each student.

- **Key Responsibilities**
	- Periodically query external internship/job sources (e.g., portals, public listings, company career pages) via allowed APIs or compliant scraping techniques.
	- Filter opportunities by:
		- Student preferences (role, location, stipend, skills).
		- Institution‑level constraints (e.g., blacklisted companies).
	- Normalize and enrich opportunity data (title, company, description, link, tags).
	- Compute preliminary relevance scores using:
		- Parsed resume profile.
		- Preference metadata.
		- Historical interactions (e.g., past positive responses).
	- Write candidate opportunities into the system for further matching and ranking.

- **Non‑Functional Requirements**
	- Must be rate‑limited and respect robots.txt / platform ToS where applicable.
	- Must tag each opportunity with its source and collection method (for compliance audit).
	- Operates on a scheduled basis (e.g., cron‑style triggers) and on‑demand for newly onboarded students.

### 5.2 Contact Extraction Agent

**Purpose:** Identify appropriate, legally permissible employer contacts for outreach.

- **Key Responsibilities**
	- Given an opportunity/company, search permitted public sources for:
		- HR/recruitment emails,
		- Internship or campus relations contacts,
		- Generic but valid recruiting addresses (e.g., careers@company.com).
	- Restrict itself to **publicly available, professional contact information intended for business/recruitment use**.
	- Classify contact types (HR, recruiter, generic careers alias, etc.).
	- Store extracted contacts along with:
		- Source URL,
		- Evidence snippet (e.g., page title),
		- Timestamp and extraction method.

- **Compliance‑Related Requirements**
	- Must **not** extract personal, non‑professional emails (e.g., scraped from social networks) unless clearly designated for hiring.
	- Must flag ambiguous contacts for human review instead of automatic use.
	- Must integrate with the Safety/Compliance Agent before contacts are used in any outreach.

### 5.3 Outreach Agent (Email & Voice/Phone Prep)

**Purpose:** Coordinate and execute outreach to employers using multiple channels, with student‑visible drafts and controls.

- **Key Responsibilities – Email**
	- Draft personalized email templates that:
		- Reference the specific role and company.
		- Highlight relevant student skills, projects, and motivations.
		- Reflect student and institution constraints (e.g., preferred start date).
	- Incorporate:
		- One‑click opt‑out or unsubscribe instructions where jurisdictionally required.
		- Clear sender identity (student and/or institution).
	- Allow students (and optionally career officers) to:
		- Review and edit drafts.
		- Approve/reject drafts before sending.
	- Trigger actual sending via a backend email‑delivery integration.

- **Key Responsibilities – Voice/Phone Screening Prep**
	- Generate:
		- Suggested call scripts or talking points for students for potential HR screening calls.
		- FAQs and tailored answers based on the student’s resume and the role description.
	- Optionally, prepare voice notes or prompts that can be used with downstream voice APIs (future‑proofing).

- **Coordination Requirements**
	- Must coordinate with:
		- Contact Extraction Agent (for correct contacts),
		- Matching logic (for relevance),
		- Safety/Compliance Agent (mandatory pre‑send checks),
		- Response tracking pipeline (for logging outcomes).

### 5.4 Safety & Compliance Agent (Critical)

**Purpose:** Enforce legal, ethical, and institutional compliance before any message (email or voice‑related preparation that could lead to calls) is finalized or sent.

- **Key Responsibilities**
	- **Pre‑Send Review (Mandatory Gate)**
		- Validate that each email draft:
			- Contains accurate sender identity and contact details.
			- Includes appropriate unsubscribe or opt‑out mechanisms where applicable.
			- Does not misrepresent the student, institution, or purpose.
			- Complies with jurisdiction‑specific rules (e.g., CAN‑SPAM where applicable).
		- For outbound campaigns:
			- Enforce frequency caps per recipient to avoid spam‑like behavior.
			- Ensure lists are de‑duplicated and honor prior opt‑outs.
	- **Contact Legitimacy Check**
		- Confirm that each recipient contact:
			- Is a professional or organizational address obtained from a legitimate, documented source.
			- Is relevant to recruiting/career/internship contexts.
	- **Jurisdiction & Policy Enforcement**
		- Apply rulesets based on:
			- Student location,
			- Employer location (if available),
			- Institution policies (e.g., no voice outreach without explicit opt‑in).
		- Keep a rule engine or configuration layer that can be updated as regulations evolve.

- **Audit & Logging Requirements**
	- Log for each outbound message:
		- Student and institution identifiers (pseudonymized as needed),
		- Message content hash or reference,
		- Recipient contact and source,
		- Compliance checklist result (pass/fail, with reasons),
		- Timestamp and channel.
	- Provide interfaces for:
		- Career offices to view outreach logs and compliance decisions.
		- External auditors/legal teams to sample and review logs if needed.

- **Failure Modes**
	- If compliance checks fail:
		- Block the message from being sent.
		- Provide a clear explanation and remediation suggestion to the student/career office (e.g., “missing physical address” or “contact not clearly for hiring”).

---

## 6. Data Strategy & Storage Requirements

### 6.1 Primary Operational Database

**Purpose:** Store structured application data for users, resumes, preferences, opportunities, outreach logs, and agent state.

- **Data Entities (Illustrative)**
	- `User` (student, role, institution, auth linkage).
	- `Institution` (college, configuration, policies).
	- `Resume` (metadata, storage path, parse status).
	- `StudentProfile` (parsed skills, education, experience).
	- `Preference` (role/location/constraints).
	- `Opportunity` (normalized job listing, sources, metadata).
	- `Contact` (employer contact details, source, type).
	- `Outreach` (message drafts, approvals, send status, channel).
	- `Response` (employer replies, interview status, timestamps).
	- `ComplianceLog` (checks, decisions, rule versions).

- **Requirements**
	- Multi‑tenant support for institutions.
	- Real‑time or near real‑time read/write performance for dashboard interactions.
	- Fine‑grained access control (students see only their own data; institutions see cohort aggregates).
	- Basic analytics queries (e.g., number of outreaches, response rates).

### 6.2 Vector Store for Matching & Retrieval

**Purpose:** Enable high‑quality semantic matching between student profiles and opportunities, and support retrieval‑augmented reasoning for agents.

- **Stored Vectors**
	- Embeddings of:
		- Parsed resumes and student profiles.
		- Opportunity descriptions and company context.
		- Optionally, past successful outreach examples (for improved ranking).

- **Use Cases**
	- Compute similarity scores between:
		- A student profile and open opportunities.
		- A new opportunity and the pool of students (for institution use cases).
	- Support “why this match” explanations by retrieving key overlapping skills and keywords from high‑similarity vectors.

- **Requirements**
	- Efficient nearest‑neighbor search (within student cohorts and across global pool).
	- Ability to filter by metadata (location, role type, institution, etc.).
	- Support for periodic re‑indexing as resumes or jobs change.

### 6.3 Object Storage for Resumes & Artifacts

**Purpose:** Store original user resumes and any derived artifacts (e.g., parsed text, outreach attachments).

- **Requirements**
	- Secure bucket‑based storage with:
		- Access control tied to auth system.
		- Server‑side encryption.
	- Lifecycle policies for retention and deletion (e.g., “right to be forgotten”).
	- Clear mapping between stored files and database references.

---

## 7. Processing Pipelines & System Flow

The MVP system flow is organized as a set of **processing pipelines** that operate on student data and opportunities. This section defines the **resume → embedding → matching → agent action** lifecycle.

### 7.1 Resume Parsing Pipeline

- **Trigger**
	- Student uploads or updates a resume.
- **Steps**
	1. Ingest file from storage.
	2. Extract text and structure (education, experience, skills, projects).
	3. Normalize entities (skills, tools, locations, degree names).
	4. Persist parsed profile to the primary database (`StudentProfile`).
	5. Emit an event or task for embedding generation.

- **Error Handling**
	- If parsing fails:
		- Mark parse status as failed.
		- Notify student with options to re‑upload or do basic manual entry.

### 7.2 Embedding Generation Pipeline

- **Trigger**
	- Resume parsing completed (or updated).
	- New or updated opportunity ingested by Discovery Agent.
- **Steps**
	1. Convert the structured `StudentProfile` or `Opportunity` into a text representation suitable for embedding.
	2. Generate vector embeddings via a chosen model.
	3. Store embeddings and associated metadata in the vector store.
- **Requirements**
	- Idempotent: repeated runs should safely overwrite earlier embeddings.
	- Support for model versioning (record which model created which embedding).

### 7.3 Matching Engine

- **Trigger**
	- New or updated student profile embedding.
	- New or updated opportunity embedding.
- **Steps**
	1. For a given student:
		 - Query the vector store for top‑N similar opportunities, filtered by preferences and policies.
	2. Compute final match scores combining:
		 - Embedding similarity,
		 - Preference hard filters,
		 - Simple business rules (e.g., stipend threshold).
	3. Store candidate matches in the operational database, with:
		 - Match scores,
		 - Explanation fields (overlapping skills, keywords).
- **Outputs**
	- Ranked list of matches surfaced on the Student Dashboard.
	- Structured input for downstream outreach automation.

### 7.4 Outreach Automation Pipeline

- **Trigger**
	- Student or institution selects one or more matched opportunities for outreach.
- **Steps**
	1. Fetch student profile, resume, and opportunity details.
	2. Invoke Contact Extraction Agent to obtain valid recipient contacts (if not already present).
	3. Generate email draft(s) and voice screening prep via Outreach Agent.
	4. Run all drafts and contacts through Safety & Compliance Agent for validation.
	5. Present drafts to the student for review/approval.
	6. On approval:
		 - Send email via email‑delivery integration.
		 - Update `Outreach` and `ComplianceLog`.
- **Requirements**
	- Respect channel and frequency caps configured at user or institution level.
	- Ensure clear mapping between each outreach and its underlying match and opportunity.

### 7.5 Response Tracking & Status Updates

- **Trigger**
	- Employer responses received (via email replies or manually logged).
- **Steps**
	1. Ingest responses, associate them with the relevant outreach.
	2. Classify responses (positive/neutral/negative, interview invite, request for more info, etc.).
	3. Update `Response` and `Outreach` status.
	4. Surface updated statuses and recommendations (e.g., “prepare for interview”, “send follow‑up”) on the Student Dashboard.
	5. Feed outcome data back into:
		 - Matching logic (to learn from successful patterns).
		 - Analytics for institutions.

---

## 8. Non‑Functional Requirements

- **Security & Privacy**
	- All personal data encrypted in transit and at rest.
	- Role‑based access control for students vs career offices vs admins.
	- Data export and deletion options for users (to support “right to be forgotten”).
- **Compliance**
	- Configurable rule sets for different jurisdictions (starting with India and major global regions).
	- System‑wide logging of automated decisions affecting outreach.
- **Reliability & Performance**
	- High availability for student dashboard actions.
	- Reasonable SLAs for asynchronous pipelines (e.g., resume parsed and matched within a few minutes).
- **Scalability**
	- Design to handle at least:
		- Tens of thousands of students,
		- Hundreds of thousands of opportunities and outreach events in initial deployments.
- **Observability**
	- Basic metrics:
		- Pipeline throughput and error rates.
		- Outreach volume and response rates.
		- Compliance check pass/fail counts.

---

## 9. Recommended Tech Stack (MVP)

The recommended stack should support fast iteration, strong compliance posture, and alignment with the above requirements.

- **Frontend**
	- `Next.js` for the Student Web App and Dashboard.
	- Integration with a managed auth provider for secure authentication (e.g., Firebase Auth or OAuth provider).

- **Backend / API Layer**
	- Backend services implemented in **Python and/or Node.js**:
		- REST/GraphQL API gateway for frontend communication.
		- Background workers for pipelines (resume parsing, embeddings, matching, outreach).
	- Use of serverless or containerized runtimes for scalable execution.

- **Primary Database**
	- Managed **Firebase** or **Supabase** for:
		- Authentication integration,
		- Core relational or document data (users, profiles, opportunities, outreach, logs),
		- Real‑time sync to the dashboard where helpful.

- **Vector Embeddings & Store**
	- An embedding model (e.g., hosted LLM embeddings) for:
		- Student profile, resume, and job description embeddings.
	- A compatible vector store (managed or self‑hosted) for:
		- Storing embeddings,
		- Fast similarity search with metadata filters.

- **Object Storage**
	- Cloud storage buckets for:
		- Resume files and related artifacts,
		- With integration to the backend and data‑protection controls.

- **External Integrations (MVP)**
	- Email‑sending service (e.g., transactional email API).
	- Optional integration hooks for voice/telephony platforms for future phases of voice‑related features.

---

This MVP PRD is structured to be directly actionable by engineering teams while keeping the **student‑first, multi‑agent, compliance‑centric** vision clear.

