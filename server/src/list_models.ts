import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const listModels = async () => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            console.error('Error: GEMINI_API_KEY is not set in .env');
            return;
        }

        const apiKey = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log('Available Models:');
            data.models.forEach((model: any) => {
                console.log(`- ${model.name} (${model.displayName})`);
                console.log(`  Supported methods: ${model.supportedGenerationMethods.join(', ')}`);
            });
        } else {
            console.log('No models found or error:', data);
        }

    } catch (error) {
        console.error('Failed to list models:', error);
    }
};

listModels();
