import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadSectionProps {
    onUpload: (resume: File, jd: File) => void;
    isLoading: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onUpload, isLoading }) => {
    const [resume, setResume] = React.useState<File | null>(null);
    const [jd, setJd] = React.useState<File | null>(null);

    const onDropResume = useCallback((acceptedFiles: File[]) => {
        setResume(acceptedFiles[0]);
    }, []);

    const onDropJd = useCallback((acceptedFiles: File[]) => {
        setJd(acceptedFiles[0]);
    }, []);

    const { getRootProps: getResumeProps, getInputProps: getResumeInputProps } = useDropzone({
        onDrop: onDropResume,
        accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'] },
        maxFiles: 1,
    });

    const { getRootProps: getJdProps, getInputProps: getJdInputProps } = useDropzone({
        onDrop: onDropJd,
        accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'] },
        maxFiles: 1,
    });

    const handleAnalyze = () => {
        if (resume && jd) {
            onUpload(resume, jd);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-grid">
                <motion.div
                    className={`dropzone ${resume ? 'active' : ''}`}
                    {...getResumeProps() as any}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <input {...getResumeInputProps()} />
                    {resume ? (
                        <div className="file-info">
                            <CheckCircle size={40} color="#4ade80" />
                            <p>{resume.name}</p>
                        </div>
                    ) : (
                        <div className="placeholder">
                            <Upload size={40} />
                            <p>Upload Resume (PDF/TXT)</p>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    className={`dropzone ${jd ? 'active' : ''}`}
                    {...getJdProps() as any}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <input {...getJdInputProps()} />
                    {jd ? (
                        <div className="file-info">
                            <CheckCircle size={40} color="#4ade80" />
                            <p>{jd.name}</p>
                        </div>
                    ) : (
                        <div className="placeholder">
                            <FileText size={40} />
                            <p>Upload Job Description (PDF/TXT)</p>
                        </div>
                    )}
                </motion.div>
            </div>

            <motion.button
                className="analyze-btn"
                onClick={handleAnalyze}
                disabled={!resume || !jd || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isLoading ? 'Analyzing...' : 'Analyze Match'}
            </motion.button>
        </div>
    );
};
