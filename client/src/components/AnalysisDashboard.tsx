import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface AnalysisDashboardProps {
    data: {
        matchScore: number;
        strengths: string[];
        gaps: string[];
        summary: string;
    };
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ data }) => {
    const { matchScore, strengths, gaps, summary } = data;

    const scoreColor = matchScore >= 80 ? '#4ade80' : matchScore >= 60 ? '#facc15' : '#f87171';

    return (
        <div className="dashboard-container">
            <div className="score-section">
                <div className="score-circle" style={{ borderColor: scoreColor }}>
                    <span className="score-text" style={{ color: scoreColor }}>{matchScore}%</span>
                    <span className="score-label">Match</span>
                </div>
                <p className="summary-text">{summary}</p>
            </div>

            <div className="insights-grid">
                <motion.div
                    className="insight-card strengths"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3><CheckCircle size={20} /> Strengths</h3>
                    <ul>
                        {strengths.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="insight-card gaps"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3><XCircle size={20} /> Gaps</h3>
                    <ul>
                        {gaps.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};
