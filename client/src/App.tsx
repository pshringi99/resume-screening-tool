import { useState } from 'react';
import { UploadSection } from './components/UploadSection';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { ChatInterface } from './components/ChatInterface';
import { uploadFiles } from './api';
import './index.css';

interface AnalysisData {
  matchScore: number;
  strengths: string[];
  gaps: string[];
  summary: string;
}

function App() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (resume: File, jd: File) => {
    setIsLoading(true);
    try {
      const data = await uploadFiles(resume, jd);
      setAnalysisData(data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to analyze files. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ResumeAI <span className="highlight">Screener</span></h1>
        <p>AI-Powered Candidate Matching & Analysis</p>
      </header>

      <main className="main-content">
        {!analysisData ? (
          <UploadSection onUpload={handleUpload} isLoading={isLoading} />
        ) : (
          <div className="results-view">
            <button className="back-btn" onClick={() => setAnalysisData(null)}>
              ← Upload New
            </button>
            <div className="dashboard-layout">
              <AnalysisDashboard data={analysisData} />
              <ChatInterface />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
