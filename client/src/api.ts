import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const uploadFiles = async (resume: File, jobDescription: File) => {
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);

    const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const sendChatQuestion = async (question: string) => {
    const response = await axios.post(`${API_URL}/chat`, { question });
    return response.data;
};
