# Demo Guide

Welcome to the Resume Screening Tool! This guide will walk you through the features and usage of the application.

## Video Demo
[Watch the Demo Video](https://youtu.be/sY9fHie8jQM)

## Prerequisites
- Ensure the server is running on port 3000.
- Ensure the client is running (typically port 5173).
- Ensure you have a valid `GEMINI_API_KEY` in your server `.env` file.

## Walkthrough

### 1. Landing Page
When you open the application, you will see the **ResumeAI Screener** landing page.
- **Action**: You will see two dropzones.
    - Left: Upload Resume (PDF or TXT).
    - Right: Upload Job Description (PDF or TXT).

### 2. Uploading Files
- **Step 1**: Drag and drop a Resume file into the left box. A green checkmark will appear with the filename.
- **Step 2**: Drag and drop a Job Description file into the right box.
- **Step 3**: Click the **"Analyze Match"** button.
- **Note**: The system supports both PDF and plain text files.

### 3. Analysis Dashboard
Once the analysis is complete, the view will switch to the Dashboard.
- **Match Score**: A percentage score indicating how well the candidate fits the role.
    - Green (>80%): High match.
    - Yellow (60-79%): Moderate match.
    - Red (<60%): Low match.
- **Summary**: A brief overview of the candidate's suitability.
- **Strengths**: A list of key skills or experiences the candidate possesses that align with the job.
- **Gaps**: A list of missing skills or areas for improvement.

### 4. Interactive Chat (RAG)
Below the dashboard is the **Candidate Q&A** section.
- **Feature**: You can ask specific questions about the candidate's resume. The AI uses Retrieval-Augmented Generation (RAG) to find the exact answer from the resume text.
- **Example Questions**:
    - "Does this candidate have experience with React?"
    - "What was their role at their last company?"
    - "Do they have a computer science degree?"
- **Response**: The AI will answer based *only* on the information present in the resume.

### 5. Reset
- Click the **"← Upload New"** button at the top left to clear the current session and analyze a new pair of documents.

## Troubleshooting
- **Upload Failed**: Ensure your files are valid PDFs or Text files.
- **Analysis Error**: Check the server console for API key issues or rate limits.
