import { v4 as uuidv4 } from 'uuid';

interface Document {
    id: string;
    text: string;
    metadata: any;
    embedding: number[];
}

export class VectorStore {
    private documents: Document[] = [];

    addDocument(text: string, embedding: number[], metadata: any = {}) {
        const doc: Document = {
            id: uuidv4(),
            text,
            embedding,
            metadata,
        };
        this.documents.push(doc);
    }

    search(queryEmbedding: number[], topK: number = 3): Document[] {
        const scoredDocs = this.documents.map((doc) => ({
            doc,
            score: this.cosineSimilarity(queryEmbedding, doc.embedding),
        }));

        scoredDocs.sort((a, b) => b.score - a.score);

        return scoredDocs.slice(0, topK).map((item) => item.doc);
    }

    private cosineSimilarity(vecA: number[], vecB: number[]): number {
        const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
        const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
        const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }

    clear() {
        this.documents = [];
    }
}

export const vectorStore = new VectorStore();
