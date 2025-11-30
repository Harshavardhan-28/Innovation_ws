# InternScout AI MVP

> 🎓 **Workshop Implementation** - A minimal but functional MVP for students to learn and extend.

InternScout AI is an AI-powered internship matching platform that helps college students find relevant internship opportunities based on their skills and preferences.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Navigate to the MVP directory
cd mvp

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Account
- **Email:** demo@student.edu
- **Password:** demo123

## 📁 Project Structure

```
mvp/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── match/         # Matching engine endpoint
│   │   │   ├── resume/        # Resume parsing endpoint
│   │   │   ├── outreach/      # Email generation endpoints
│   │   │   └── internships/   # Internship data endpoints
│   │   ├── dashboard/         # Main dashboard page
│   │   ├── login/             # Login page
│   │   ├── signup/            # Signup page
│   │   ├── onboarding/        # Resume upload & preferences
│   │   ├── internship/[id]/   # Internship detail page
│   │   ├── layout.tsx         # Root layout with AuthProvider
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   │
│   ├── context/               # React contexts
│   │   └── AuthContext.tsx    # Authentication state management
│   │
│   ├── data/                  # Mock data & storage
│   │   ├── internships.ts     # 15 mock internship listings
│   │   └── userStore.ts       # In-memory user storage
│   │
│   ├── lib/                   # Core business logic
│   │   ├── matchingEngine.ts  # Weighted scoring matcher
│   │   ├── resumeParser.ts    # Keyword-based skill extraction
│   │   ├── outreachGenerator.ts # Template-based email generator
│   │   └── safetyCheck.ts     # Compliance checking
│   │
│   └── types/                 # TypeScript definitions
│       └── index.ts           # All type interfaces
│
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🔧 Core Features

### 1. Student Authentication
- Mock auth with email/password
- Session persistence via localStorage
- Easily replaceable with Firebase Auth or NextAuth.js

### 2. Resume Parsing
- Paste resume text to extract skills
- Keyword-based matching against 60+ known skills
- **Workshop Extension:** Replace with OpenAI for semantic extraction

### 3. AI-Powered Matching
- Weighted scoring system (0-100 points):
  - Skills overlap: 50 points
  - Role match: 20 points
  - Location match: 15 points
  - Internship type match: 15 points
- **Workshop Extension:** Add vector embeddings for semantic matching

### 4. Outreach Email Generation
- Template-based personalized emails
- Includes student skills and internship requirements
- **Workshop Extension:** Replace with GPT-4/Claude for AI-generated emails

### 5. Safety & Compliance
- Blacklisted word filtering
- Length validation
- Automatic disclaimer footer
- **Workshop Extension:** Add AI-powered content moderation

## 🎯 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | Authenticate user |
| `/api/auth/signup` | POST | Create new account |
| `/api/auth/session` | GET | Check session status |
| `/api/auth/update` | POST | Update user profile |
| `/api/resume/parse` | POST | Parse resume and extract skills |
| `/api/match` | POST | Get personalized matches |
| `/api/match` | GET | Get all internships |
| `/api/outreach/generate` | POST | Generate outreach email |
| `/api/outreach/generate` | GET | Get user's emails |
| `/api/internships/[id]` | GET | Get internship details |

## 🛠 Workshop Extension Ideas

### Beginner Level
1. Add more internships to the mock dataset
2. Add additional skill keywords to the parser
3. Customize the email templates
4. Add new preference options (e.g., remote-only filter)

### Intermediate Level
1. Replace in-memory storage with Firebase Firestore
2. Add real authentication with NextAuth.js
3. Implement email sending with Resend or SendGrid
4. Add a favorites/saved internships feature
5. Add filtering and search on the dashboard

### Advanced Level
1. Implement vector embeddings with OpenAI
2. Use GPT-4 for resume parsing and skill extraction
3. Generate personalized emails with Claude/GPT-4
4. Add AI-powered content moderation
5. Implement collaborative filtering for recommendations
6. Deploy to Vercel with proper environment variables

## 📚 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS (no framework for simplicity)
- **State:** React Context
- **Storage:** In-memory (development only)

## 🔐 Security Notes

This MVP uses simplified authentication for learning purposes. In production:

1. **Never store plain-text passwords** - Use bcrypt or similar
2. **Use proper session tokens** - JWT with httpOnly cookies
3. **Add rate limiting** - Prevent brute force attacks
4. **Validate all inputs** - Server-side validation
5. **Use HTTPS** - Secure data in transit
6. **Add CORS protection** - Restrict API access

## 📄 License

This is a workshop project for educational purposes.

---

Built with ❤️ for the Innovation Workshop - Phase 1.3 MVP
