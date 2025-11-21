import express from 'express';
import multer from 'multer';
import { parseDocument, chunkText } from '../services/parser';
import { vectorStore } from '../services/vectorStore';
import { generateEmbedding, generateCompletion } from '../services/llm';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

let currentResumeText = "";
let currentJobDescriptionText = "";

router.post('/upload', upload.fields([{ name: 'resume' }, { name: 'jobDescription' }]), async (req, res) => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (!files.resume || !files.jobDescription) {
            return res.status(400).json({ error: 'Both resume and job description are required' });
        }

        const resumeBuffer = files.resume[0].buffer;
        const jdBuffer = files.jobDescription[0].buffer;
        console.log("Resume Buffer", resumeBuffer);
        console.log("Job Description Buffer", jdBuffer);

        const getMimeType = (file: Express.Multer.File) => {
            if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
                return 'application/pdf';
            }
            if (file.mimetype === 'text/plain' || file.originalname.toLowerCase().endsWith('.txt')) {
                return 'text/plain';
            }
            return file.mimetype;
        };

        currentResumeText = await parseDocument(files.resume[0].buffer, getMimeType(files.resume[0]));
        currentJobDescriptionText = await parseDocument(files.jobDescription[0].buffer, getMimeType(files.jobDescription[0]));
        console.log("Resume Text", currentResumeText);
        console.log("Job Description Text", currentJobDescriptionText);
        vectorStore.clear();

        const chunks = chunkText(currentResumeText);

        await Promise.all(chunks.map(async (chunk) => {
            const embedding = await generateEmbedding(chunk);
            vectorStore.addDocument(chunk, embedding, { type: 'resume_chunk' });
        }));

        const truncatedResume = currentResumeText.slice(0, 20000);
        const truncatedJD = currentJobDescriptionText.slice(0, 20000);
        console.log("truncatedjd", truncatedJD, "truncatedResume", truncatedResume);

        const analysisPrompt = `
      You are an expert HR Recruiter. Analyze the following Resume against the Job Description.
      
      Job Description:
      ${truncatedJD}
      
      Resume:
      ${truncatedResume}
      
      Provide a JSON response with the following structure:
      {
        "matchScore": number (0-100),
        "strengths": string[] (list of 3-5 key strengths),
        "gaps": string[] (list of 3-5 missing skills or gaps),
        "summary": string (brief overall assessment)
      }
      Return ONLY valid JSON.
    `;

        const analysisResponse = await generateCompletion(analysisPrompt, "You are a helpful assistant that outputs JSON.");

        let analysisData;
        try {

            const cleanJson = analysisResponse.replace(/```json\n?|\n?```/g, '');
            analysisData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse LLM response", analysisResponse);
            analysisData = { matchScore: 0, strengths: [], gaps: [], summary: "Error analyzing match." };
        }

        res.json(analysisData);

    } catch (error) {
        console.error('Error in /upload:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/chat', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }


        const questionEmbedding = await generateEmbedding(question);


        const relevantDocs = vectorStore.search(questionEmbedding, 3);
        const context = relevantDocs.map(doc => doc.text).join('\n\n');


        const prompt = `
      Context from Candidate's Resume:
      ${context}
      
      User Question: ${question}
      
      Answer the question based ONLY on the provided context. If the information is not in the context, say "I cannot find this information in the resume."
    `;

        const answer = await generateCompletion(prompt);

        res.json({ answer, context: relevantDocs });

    } catch (error) {
        console.error('Error in /chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
