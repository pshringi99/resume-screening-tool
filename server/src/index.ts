import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Serve static files from the client dist directory
import path from 'path';

// Adjust the path to point to client/dist from server/src (or server/dist)
// When running from server/dist/index.js, client is at ../../client/dist
// When running from server/src/index.ts, client is at ../../client/dist
const clientDistPath = path.join(__dirname, '../../client/dist');

app.use(express.static(clientDistPath));

// Handle client-side routing by returning index.html for all non-API routes
app.get(/.*/, (req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
