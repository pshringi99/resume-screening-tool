import { PDFParse } from 'pdf-parse';

export const parseDocument = async (buffer: Buffer, mimetype: string): Promise<string> => {
    console.log('Parsing document with mimetype:', mimetype);

    if (mimetype === 'text/plain') {
        console.log('Parsing as text file');
        return buffer.toString('utf-8');
    }

    if (mimetype === 'application/pdf') {
        console.log('Parsing as PDF file');
        try {
            const parser = new PDFParse({ data: buffer });
            const data = await parser.getText();
            return data.text;
        } catch (error) {
            console.error('Error parsing PDF:', error);
            throw new Error('Failed to parse PDF file. Please ensure the file is a valid PDF.');
        }
    }

    throw new Error(`Unsupported file type: ${mimetype}. Please upload a PDF or TXT file.`);
};

export const chunkText = (text: string, chunkSize: number = 500, overlap: number = 50): string[] => {
    const chunks: string[] = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        const endIndex = Math.min(startIndex + chunkSize, text.length);
        const chunk = text.slice(startIndex, endIndex);
        chunks.push(chunk);
        startIndex += chunkSize - overlap;
    }

    return chunks;
};
