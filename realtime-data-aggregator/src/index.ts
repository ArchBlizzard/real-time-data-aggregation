import express, { Application } from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { tokenRouter } from './routes/tokens';

const app: Application = express();
const httpServer = createServer(app);

// Enable CORS for Express (REST API)
import cors from 'cors';
app.use(cors({ origin: '*' }));

// Enable CORS for Socket.io
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Use tokens router
app.use('/api/tokens', tokenRouter);

// WebSocket logic
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});