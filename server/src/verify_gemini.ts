import { generateEmbedding, generateCompletion } from './services/llm';
import dotenv from 'dotenv';

dotenv.config();

const verify = async () => {
    try {
        console.log('Verifying Gemini Integration...');

        if (!process.env.GEMINI_API_KEY) {
            console.error('Error: GEMINI_API_KEY is not set in .env');
            return;
        }

        console.log('Testing Embedding Generation...');
        const embedding = await generateEmbedding('This is a test sentence.');
        if (embedding && embedding.length > 0) {
            console.log('Embedding generated successfully. Length:', embedding.length);
        } else {
            console.error('Failed to generate embedding.');
        }

        console.log('Testing Completion Generation...');
        const completion = await generateCompletion('Say hello to Gemini.');
        console.log('Completion received:', completion);

        console.log('Verification Complete.');
    } catch (error) {
        console.error('Verification Failed:', error);
    }
};

verify();
