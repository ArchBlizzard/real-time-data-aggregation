import express, { Application } from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { tokenRouter } from './routes/tokens';
import { fetchAndCacheTokens, getCachedTokens } from './services/aggregator';
import cors from 'cors';

const app: Application = express();
const httpServer = createServer(app);

app.use(cors({ origin: '*' }));

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use('/api/tokens', tokenRouter);

// --- WebSocket logic ---
let lastTokenData: any[] = [];

io.on('connection', (socket) => {
  console.log('Client connected');
  // Send initial data on connect
  getCachedTokens().then(tokens => socket.emit('token_update', tokens));
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// --- Periodically fetch and broadcast updates ---
setInterval(async () => {
  try {
    const newTokenData = await fetchAndCacheTokens();
    // Compare with last sent data
    if (hasSignificantChange(lastTokenData, newTokenData)) {
      io.emit('token_update', newTokenData);
      lastTokenData = newTokenData;
      console.log('Emitted token_update to clients');
    }
  } catch (err) {
    console.error('Error in periodic update:', err);
  }
}, 10000); // every 10 seconds

function hasSignificantChange(oldData: any[], newData: any[]) {
  if (oldData.length !== newData.length) return true;
  for (let i = 0; i < newData.length; i++) {
    if (
      !oldData[i] ||
      oldData[i].price_sol !== newData[i].price_sol ||
      oldData[i].volume_sol !== newData[i].volume_sol
    ) {
      return true;
    }
  }
  return false;
}

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});