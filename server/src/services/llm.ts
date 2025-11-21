import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateEmbedding = async (text: string): Promise<number[]> => {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
};

export const generateCompletion = async (prompt: string, systemPrompt: string = "You are a helpful assistant."): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chatModel = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: systemPrompt
    });

    const result = await chatModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
};
