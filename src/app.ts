import { startWebSocketServer } from './websocket';
import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes';
import { getPort } from './config';
import logger from './utils/logger';

const port = getPort();

const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: 'http://34.207.105.195', // Replace with your frontend URL or '*'
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with specified options
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api', routes); // Mount API routes
app.get('/api', (_, res) => {
  res.status(200).json({ status: 'ok' }); // Example endpoint response
});

// Start server
server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Start WebSocket server
startWebSocketServer(server);
