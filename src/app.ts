import { startWebSocketServer } from './websocket';
import express from 'express';
import cors from 'cors'; // Import cors middleware
import http from 'http';
import routes from './routes';
import { getPort } from './config';
import logger from './utils/logger';

const port = getPort();

const app = express();
const server = http.createServer(app);


// Set up CORS middleware
app.use(cors({
  origin: 'http://34.207.105.195:3000', // Replace with your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
}));

app.use(express.json());

app.use('/api', routes);

app.get('/api', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

startWebSocketServer(server);
