# Resume Analyzer

An AI-powered Resume Analyzer that compares your CV against job descriptions using Google Gemini AI. Get instant match scores, skill gap analysis, and personalized improvement suggestions.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Golang with Gin framework, REST API
- **AI**: Groq API (llama-3.3-70b-versatile model)
- **PDF Parsing**: ledongthuc/pdf library for extracting text from PDF files

## Features

- **Match Score**: Get an instant percentage score showing how well your CV matches the job requirements
- **Skill Analysis**: Identify matched and missing skills with specific recommendations
- **Structure Feedback**: Receive detailed feedback on each section of your CV
- **Improvement Suggestions**: Prioritized actionable suggestions to improve your CV
- **ATS Tips**: Optimization tips for Applicant Tracking Systems used by employers
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Drag & Drop Upload**: Easy PDF upload with drag and drop support

## Project Structure

```
resume-analyzer/
├── frontend/              # Next.js app
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── upload-section.tsx
│   │   ├── score-display.tsx
│   │   ├── skill-analysis.tsx
│   │   ├── structure-feedback.tsx
│   │   ├── improvement-list.tsx
│   │   ├── ats-tips.tsx
│   │   └── results-display.tsx
│   └── lib/               # Utilities and API
│       ├── api.ts
│       └── utils.ts
├── backend/               # Golang API
│   ├── main.go            # Entry point
│   ├── handlers/          # HTTP handlers
│   │   ├── health.go
│   │   └── analyze.go
│   ├── services/          # Business logic
│   │   ├── pdf_service.go
│   │   └── gemini_service.go
│   ├── models/            # Data models
│   │   └ analysis.go
│   ├── go.mod
│   ├── go.sum
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Go 1.21 or later
- Node.js 18 or later
- Groq API key ([Get one here](https://console.groq.com/keys))
- Docker (optional, for containerized deployment)

## Environment Variables

### Backend (.env)

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=8080
MAX_FILE_SIZE=5242880
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd resume-analyzer
```

### 2. Set up the backend

```bash
# Navigate to backend directory
cd backend

# Create .env file with your Groq API key
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Install Go dependencies
go mod download

# Run the backend
go run main.go
```

The backend will start on `http://localhost:8080`.

### 3. Set up the frontend

```bash
# Navigate to frontend directory
cd frontend

# Create .env.local file
cp .env.example .env.local

# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will start on `http://localhost:3000`.

### 4. Open the application

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Deployment

### 1. Set environment variables

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 2. Build and run with Docker Compose

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

### 3. Stop the containers

```bash
docker-compose down
```

## API Endpoints

### POST /api/analyze

Analyzes a CV against a job description.

**Request (multipart/form-data)**:
- `cv_file`: PDF file (max 5MB)
- `job_title`: Job title string
- `job_description`: Full job description or requirements

**Response (JSON)**:
```json
{
  "match_score": 85,
  "match_summary": "Your CV is a strong match...",
  "skill_analysis": {
    "matched_skills": ["Go", "PostgreSQL", "REST API"],
    "missing_skills": ["Kubernetes", "gRPC"],
    "recommendations": ["Add Redis experience..."]
  },
  "structure_feedback": {
    "overall_score": 78,
    "sections": [
      {
        "name": "Work Experience",
        "score": 90,
        "feedback": "Well structured...",
        "suggestions": []
      }
    ]
  },
  "improvement_suggestions": [
    {
      "priority": "high",
      "section": "Skills",
      "suggestion": "Add missing technologies..."
    }
  ],
  "ats_tips": [
    "Use keywords from the job description...",
    "Avoid tables and columns..."
  ]
}
```

### GET /api/health

Health check endpoint.

**Response (JSON)**:
```json
{
  "status": "healthy",
  "message": "Resume Analyzer API is running"
}
```

## Usage

1. **Upload your CV**: Drag and drop a PDF file or click to browse
2. **Enter job details**: Provide the job title and full job description
3. **Click "Analyze My CV"**: Wait for the AI analysis (typically 10-30 seconds)
4. **Review results**: Check your match score, skill analysis, and improvement suggestions
5. **Apply improvements**: Use the suggestions to enhance your CV

## File Requirements

- **Format**: PDF only
- **Size**: Maximum 5MB
- **Content**: Text-based PDFs work best (scanned documents may not parse correctly)

## Troubleshooting

### Backend won't start

- Ensure `GROQ_API_KEY` is set in the environment
- Check that Go 1.21+ is installed
- Verify port 8080 is not already in use

### Frontend won't connect to backend

- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check that the backend is running
- Ensure CORS is configured properly

### PDF parsing fails

- Ensure the PDF is text-based, not a scanned image
- Check file size is under 5MB
- Verify the file is a valid PDF (not corrupted)

### Groq API errors

- Verify your API key is valid and has quota available
- Check the Groq API status page for any issues
- Ensure you're using the correct model name (llama-3.3-70b-versatile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Groq API for providing fast AI inference capabilities
- shadcn/ui for the beautiful UI components
- The Go and Next.js communities for excellent documentation