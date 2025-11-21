import { parseDocument } from './services/parser';

const run = async () => {
    try {
        const buffer = Buffer.from('This is a test resume.', 'utf-8');
        const text = await parseDocument(buffer, 'text/plain');
        console.log('Parsed text:', text);
    } catch (error) {
        console.error('Error:', error);
    }
};

run();
