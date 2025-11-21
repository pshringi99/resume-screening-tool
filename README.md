# Resume Screening Tool with RAG

A simple AI-powered Resume Screening Tool where recruiters can upload a resume and job description, get an instant match score, and ask questions about the candidate via chat.

## Features
- **Resume Parsing**: Extracts text from PDF resumes.
- **Match Analysis**: Generates a match score, strengths, and gaps using LLM.
- **RAG Chat**: Ask questions about the candidate with context-aware responses.
- **In-Memory Vector Store**: Simple, self-contained vector search.

## Tech Stack
- **Backend**: Node.js, Express, TypeScript, OpenAI API, pdf-parse.
- **Frontend**: React, Vite, TypeScript, Framer Motion, Lucide React.

## Setup

### Prerequisites
- Node.js 18+
- OpenAI API Key

### Installation

1. **Clone the repository** (if applicable) or navigate to the project root.

2. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**:
   - Create a `.env` file in the `server` directory.
   - Add your OpenAI API Key:
     ```
     PORT=3000
     OPENAI_API_KEY=sk-your-api-key-here
     ```

## Running the Application

1. **Start the Backend**:
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:3000`.

2. **Start the Frontend**:
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

3. **Open the App**:
   Navigate to `http://localhost:5173` in your browser.

## Usage
1. **Upload**: Drag and drop a Resume (PDF) and Job Description (PDF/TXT).
2. **Analyze**: Click "Analyze Match" to see the score and insights.
3. **Chat**: Use the chat interface to ask specific questions about the candidate (e.g., "Does he have React experience?").
