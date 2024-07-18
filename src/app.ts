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

// Define CORS options to allow requests from your frontend
const corsOptions = {
  origin: 'http://34.207.105.195', // Replace with your frontend URL
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json());

app.use('/api', routes);

app.get('/api', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

startWebSocketServer(server);
